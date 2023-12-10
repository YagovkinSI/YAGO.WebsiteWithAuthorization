﻿using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Users.Models;

namespace YAGO.WebsiteWithAuthorization.Application.Users.Interfaces
{
	/// <summary>
	/// Сервис авторизации пользователей
	/// </summary>
	public interface IAuthorizationService
	{
		/// <summary>
		/// Получение текущего пользователя
		/// </summary>
		/// <param name="claimsPrincipal">Ифнормация о пользователе запроса</param>
		/// <param name="cancellationToken">Токен отмены</param>
		/// <returns>Данные авторизации</returns>
		Task<AuthorizationData> GetCurrentUser(ClaimsPrincipal claimsPrincipal, CancellationToken cancellationToken);

		/// <summary>
		/// Регистрация пользователя
		/// </summary>
		/// <param name="request">Запрос регистрации</param>
		/// <param name="cancellationToken">Токен отмены</param>
		/// <returns>Данные авторизации</returns>
		Task<AuthorizationData> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken);

		/// <summary>
		/// Авторизация пользователя
		/// </summary>
		/// <param name="request">Запрос авторизации</param>
		/// <param name="cancellationToken">Токен отмены</param>
		/// <returns>Данные авторизации</returns>
		Task<AuthorizationData> LoginAsync(LoginRequest request, CancellationToken cancellationToken);

		/// <summary>
		/// Выход пользователя из системы
		/// </summary>
		/// <param name="cancellationToken">Токен отмены</param>
		/// <param name="claimsPrincipal">Ифнормация о пользователе запроса</param>
		Task LogoutAsync(ClaimsPrincipal claimsPrincipal, CancellationToken cancellationToken);
	}
}
