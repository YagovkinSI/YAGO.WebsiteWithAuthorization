using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Authorization.Interfaces;
using YAGO.WebsiteWithAuthorization.Application.Authorization.Models;
using YAGO.WebsiteWithAuthorization.Infrastructure.Database;
using YAGO.WebsiteWithAuthorization.Infrastructure.Database.Extensions;
using YAGO.WebsiteWithAuthorization.Infrastructure.Database.Models;

namespace YAGO.WebsiteWithAuthorization.Infrastructure.Identity
{
	internal class IdentityService : IAuthorizationService
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly DatabaseContext _context;
		private readonly ILogger<IdentityService> _logger;

		private readonly Dictionary<string, Domain.Exceptions.ApplicationException> KNOWN_IDENTITY_ERROR_CODES = new()
		{
			{ "DuplicateUserName", new Domain.Exceptions.ApplicationException("Ошибка регистрации. Такой логин уже занят.", 409) }
		};

		public IdentityService(
			UserManager<User> userManager,
			SignInManager<User> signInManager,
			DatabaseContext context,
			ILogger<IdentityService> logger)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_context = context;
			_logger = logger;
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
			{
				var error = result.Errors.FirstOrDefault(e => KNOWN_IDENTITY_ERROR_CODES.ContainsKey(e.Code));
				if (error == null)
				{
					_logger.LogError($"Ошибка регистрации. {string.Join(" .", result.Errors.Select(e => $"{e.Code}: {e.Description}"))}");
					throw new Domain.Exceptions.ApplicationException("Ошибка регистрации. Неизвестная ошибка.");
				}

				throw KNOWN_IDENTITY_ERROR_CODES[error.Code];
			}

			await _signInManager.SignInAsync(user, true);

			return await GetAuthorizationDataAsync(_context, user.Id);
		}

		public async Task<AuthorizationData> LoginAsync(LoginRequest request)
		{
			var result = await _signInManager.PasswordSignInAsync(request.UserName, request.Password, true, false);
			if (!result.Succeeded)
				throw new Domain.Exceptions.ApplicationException("Ошибка авторизации. Проверьте логин и пароль.");

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
				: new Domain.User.User
					(
						user.Id,
						user.UserName,
						user.Registration,
						user.LastActivity
					)
			};
		}
	}
}
