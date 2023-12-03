using System.Security.Claims;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Authorization.Models;

namespace YAGO.WebsiteWithAuthorization.Application.Authorization.Interfaces
{
	public interface IIdentityService
	{
		Task<AuthorizationData> GetCurrentUser(ClaimsPrincipal claimsPrincipal);

		Task<AuthorizationData> RegisterAsync(RegisterRequest request);

		Task<AuthorizationData> LoginAsync(LoginRequest request);

		Task LogoutAsync(ClaimsPrincipal claimsPrincipal);
	}
}
