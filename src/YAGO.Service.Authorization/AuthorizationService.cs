using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using YAGO.Database;
using YAGO.Entities.Extensions;
using YAGO.Entities.Models;
using YAGO.Service.Authorization.Models;

namespace YAGO.Service.Authorization
{
	public class AuthorizationService
	{
		private readonly DatabaseContext _context;
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;

		public AuthorizationService(DatabaseContext context,
			UserManager<User> userManager,
			SignInManager<User> signInManager)
		{
			_context = context;
			_userManager = userManager;
			_signInManager = signInManager;
		}

		public async Task<AuthorizationData> GetCurrentUser(ClaimsPrincipal claimsPrincipal)
		{
			var user = await _userManager.GetUserAsync(claimsPrincipal);
			if (user == null)
				return AuthorizationData.NotAuthorized;

			await UpdateUserLastActivity(user.Id);

			return await GetAuthorizationDataAsync(_context, user.Id);
		}

		public async Task<AuthorizationData> RegisterAsync(RegisterRequest request)
		{
			var user = new User
			{
				Email = string.Empty,
				UserName = request.UserName,
				Registration = DateTimeOffset.Now,
				LastActivity = DateTimeOffset.Now
			};

			var result = await _userManager.CreateAsync(user, request.Password);
			if (!result.Succeeded)
				throw new Exception(string.Join(". ", result.Errors.Select(e => e.Description)));

			await _signInManager.SignInAsync(user, true);

			return await GetAuthorizationDataAsync(_context, user.Id);
		}

		public async Task<AuthorizationData> LoginAsync(LoginRequest request)
		{
			var result = await _signInManager.PasswordSignInAsync(request.UserName, request.Password, true, false);
			if (!result.Succeeded)
				throw new Exception("Неверный логин или пароль");

			var user = await _context.Users.FindByUserNameAsync(request.UserName);

			await UpdateUserLastActivity(user.Id);

			return await GetAuthorizationDataAsync(_context, user.Id);
		}

		public async Task LogoutAsync(ClaimsPrincipal claimsPrincipal)
		{
			var user = await _userManager.GetUserAsync(claimsPrincipal);
			if (user == null)
				return;

			await UpdateUserLastActivity(user.Id);

			await _signInManager.SignOutAsync();
		}

		private async Task UpdateUserLastActivity(string userId)
		{
			var user = _context.Users.Find(userId);
			if (user == null)
				return;

			user.LastActivity = DateTimeOffset.Now;
			_context.Update(user);
			await _context.SaveChangesAsync();
		}

		private static async Task<AuthorizationData> GetAuthorizationDataAsync(DatabaseContext context, string userId)
		{
			var user = await context.Users.FindAsync(userId);

			return new AuthorizationData
			{
				IsAuthorized = user != null,
				User = user == null
				? null
				: new AuthorizationUser
				{
					Id = user.Id,
					Name = user.UserName,
					Registration = user.Registration,
					LastActivity = user.LastActivity
				}
			};
		}
	}
}
