using System.Security.Claims;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Authorization.Models;

namespace YAGO.WebsiteWithAuthorization.Application.Authorization.Interfaces
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
		/// <returns>Данные авторизации</returns>
		Task<AuthorizationData> GetCurrentUser(ClaimsPrincipal claimsPrincipal);

		/// <summary>
		/// Регистрация пользователя
		/// </summary>
		/// <param name="request">Запрос регистрации</param>
		/// <returns>Данные авторизации</returns>
		Task<AuthorizationData> RegisterAsync(RegisterRequest request);

		/// <summary>
		/// Авторизация пользователя
		/// </summary>
		/// <param name="request">Запрос авторизации</param>
		/// <returns>Данные авторизации</returns>
		Task<AuthorizationData> LoginAsync(LoginRequest request);

		/// <summary>
		/// Выход пользователя из системы
		/// </summary>
		/// <param name="claimsPrincipal">Ифнормация о пользователе запроса</param>
		Task LogoutAsync(ClaimsPrincipal claimsPrincipal);
	}
}
