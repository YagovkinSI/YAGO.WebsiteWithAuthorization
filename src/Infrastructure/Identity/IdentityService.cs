using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Users.Interfaces;
using YAGO.WebsiteWithAuthorization.Application.Users.Models;
using YAGO.WebsiteWithAuthorization.Infrastructure.Database.Models;

namespace YAGO.WebsiteWithAuthorization.Infrastructure.Identity
{
	internal class IdentityService : IAuthorizationService
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly IUserDatabaseService _userDatabaseService;
		private readonly ILogger<IdentityService> _logger;

		private readonly Dictionary<string, Domain.Exceptions.ApplicationException> KNOWN_IDENTITY_ERROR_CODES = new()
		{
			{ "DuplicateUserName", new Domain.Exceptions.ApplicationException("Ошибка регистрации. Такой логин уже занят.", 409) }
		};

		public IdentityService(
			UserManager<User> userManager,
			SignInManager<User> signInManager,
			IUserDatabaseService userDatabaseService,
			ILogger<IdentityService> logger)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_userDatabaseService = userDatabaseService;
			_logger = logger;
		}

		public async Task<AuthorizationData> GetCurrentUser(ClaimsPrincipal claimsPrincipal, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var user = await _userManager.GetUserAsync(claimsPrincipal);
			return ToAuthorizationData(user);
		}

		public async Task<AuthorizationData> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var user = new User
			{
				Email = string.Empty,
				UserName = request.UserName,
				Registration = DateTimeOffset.Now,
				LastActivity = DateTimeOffset.Now
			};
			var result = await _userManager.CreateAsync(user, request.Password);

			cancellationToken.ThrowIfCancellationRequested();
			if (!result.Succeeded)
				throw GetRegisterExeption(result.Errors);
			await _signInManager.SignInAsync(user, true);
			return ToAuthorizationData(user);
		}

		public async Task<AuthorizationData> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var result = await _signInManager.PasswordSignInAsync(request.UserName, request.Password, true, false);
			if (!result.Succeeded)
				throw new Domain.Exceptions.ApplicationException("Ошибка авторизации. Проверьте логин и пароль.");

			cancellationToken.ThrowIfCancellationRequested();
			var user = await _userDatabaseService.FindByUserName(request.UserName, cancellationToken);

			cancellationToken.ThrowIfCancellationRequested();
			return GetAuthorizationDataAsync(user);
		}

		public async Task LogoutAsync(ClaimsPrincipal claimsPrincipal, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var user = await _userManager.GetUserAsync(claimsPrincipal);
			if (user == null)
				return;

			cancellationToken.ThrowIfCancellationRequested();
			await _signInManager.SignOutAsync();
		}

		private static AuthorizationData ToAuthorizationData(User user)
		{
			if (user == null)
				return AuthorizationData.NotAuthorized;

			var domainUser = new Domain.User.User
			(
				user.Id,
				user.UserName,
				user.Registration,
				user.LastActivity
			);

			return GetAuthorizationDataAsync(domainUser);
		}

		private static AuthorizationData GetAuthorizationDataAsync(Domain.User.User user)
		{
			return user == null
				? AuthorizationData.NotAuthorized
				: new AuthorizationData
				{
					IsAuthorized = true,
					User = user
				};
		}

		private Exception GetRegisterExeption(IEnumerable<IdentityError> errors)
		{
			var error = errors.FirstOrDefault(e => KNOWN_IDENTITY_ERROR_CODES.ContainsKey(e.Code));
			if (error == null)
			{
				_logger.LogError($"Ошибка регистрации. {string.Join(" .", errors.Select(e => $"{e.Code}: {e.Description}"))}");
				return new Domain.Exceptions.ApplicationException("Ошибка регистрации. Неизвестная ошибка.");
			}
			return KNOWN_IDENTITY_ERROR_CODES[error.Code];
		}
	}
}
