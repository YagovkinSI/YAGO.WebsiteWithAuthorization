using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Users.Interfaces;
using YAGO.WebsiteWithAuthorization.Application.Users.Models;

namespace YAGO.WebsiteWithAuthorization.Application.Users
{
	public class UserAuthorizationService
	{
		private readonly IAuthorizationService _authorizationService;
		private readonly UserLastActivityService _userLastActivityService;

		public UserAuthorizationService(
			IAuthorizationService authorizationService,
			UserLastActivityService userLastActivityService)
		{
			_authorizationService = authorizationService;
			_userLastActivityService = userLastActivityService;
		}

		/// <summary>
		/// Получение текущего пользователя
		/// </summary>
		/// <param name="claimsPrincipal">Ифнормация о пользователе запроса</param>
		/// <param name="cancellationToken">Токен отмены</param>
		/// <returns>Данные авторизации</returns>
		public async Task<AuthorizationData> GetCurrentUser(ClaimsPrincipal claimsPrincipal, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var authorizationData = await _authorizationService.GetCurrentUser(claimsPrincipal, cancellationToken);
			if (!authorizationData.IsAuthorized)
				return authorizationData;

			cancellationToken.ThrowIfCancellationRequested();
			await _userLastActivityService.UpdateUserLastActivity(authorizationData.User, cancellationToken);
			return authorizationData;
		}

		/// <summary>
		/// Регистрация пользователя
		/// </summary>
		/// <param name="request">Запрос регистрации</param>
		/// <param name="cancellationToken">Токен отмены</param>
		/// <returns>Данные авторизации</returns>
		public async Task<AuthorizationData> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var authorizationData = await _authorizationService.RegisterAsync(request, cancellationToken);
			if (!authorizationData.IsAuthorized)
				return authorizationData;

			cancellationToken.ThrowIfCancellationRequested();
			await _userLastActivityService.UpdateUserLastActivity(authorizationData.User, cancellationToken);
			return authorizationData;
		}

		/// <summary>
		/// Авторизация пользователя
		/// </summary>
		/// <param name="request">Запрос авторизации</param>
		/// <param name="cancellationToken">Токен отмены</param>
		/// <returns>Данные авторизации</returns>
		public async Task<AuthorizationData> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var authorizationData = await _authorizationService.LoginAsync(request, cancellationToken);
			if (!authorizationData.IsAuthorized)
				return authorizationData;

			cancellationToken.ThrowIfCancellationRequested();
			await _userLastActivityService.UpdateUserLastActivity(authorizationData.User, cancellationToken);
			return authorizationData;
		}

		/// <summary>
		/// Выход пользователя из системы
		/// </summary>
		/// <param name="cancellationToken">Токен отмены</param>
		/// <param name="claimsPrincipal">Ифнормация о пользователе запроса</param>
		public async Task LogoutAsync(ClaimsPrincipal claimsPrincipal, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var authorizationData = await _authorizationService.GetCurrentUser(claimsPrincipal, cancellationToken);
			if (!authorizationData.IsAuthorized)
				return;

			var tasks = new Task[2];
			tasks[0] = _userLastActivityService.UpdateUserLastActivity(authorizationData.User, cancellationToken);
			tasks[1] = _authorizationService.LogoutAsync(claimsPrincipal, cancellationToken);
			Task.WaitAll(tasks, cancellationToken);
		}
	}
}
