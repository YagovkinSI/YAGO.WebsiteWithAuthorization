using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Users;
using YAGO.WebsiteWithAuthorization.Application.Users.Models;

namespace YAGO.WebsiteWithAuthorization.Host.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class AuthorizationController : ControllerBase
	{
		private readonly UserAuthorizationService _userAuthorizationService;

		public AuthorizationController(UserAuthorizationService userAuthorizationService)
		{
			_userAuthorizationService = userAuthorizationService;
		}

		[HttpGet]
		[Route("getCurrentUser")]
		public Task<AuthorizationData> GetCurrentUser(CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			return _userAuthorizationService.GetCurrentUser(HttpContext.User, cancellationToken);
		}

		[HttpPost]
		[Route("register")]
		public Task<AuthorizationData> Register(RegisterRequest request, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			if (!ModelState.IsValid)
			{
				var stateErrors = ModelState.SelectMany(s => s.Value.Errors.Select(e => e.ErrorMessage));
				throw new BadHttpRequestException(string.Join(". ", stateErrors));
			}

			cancellationToken.ThrowIfCancellationRequested();
			return _userAuthorizationService.RegisterAsync(request, cancellationToken);
		}


		[HttpPost]
		[Route("login")]
		public Task<AuthorizationData> Login(LoginRequest request, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			if (!ModelState.IsValid)
			{
				var stateErrors = ModelState.SelectMany(s => s.Value.Errors.Select(e => e.ErrorMessage));
				throw new BadHttpRequestException(string.Join(". ", stateErrors));
			}

			cancellationToken.ThrowIfCancellationRequested();
			return _userAuthorizationService.LoginAsync(request, cancellationToken);
		}

		[HttpPost]
		[Route("logout")]
		public async Task<AuthorizationData> Logout(CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			await _userAuthorizationService.LogoutAsync(HttpContext.User, cancellationToken);
			return AuthorizationData.NotAuthorized;
		}
	}
}
