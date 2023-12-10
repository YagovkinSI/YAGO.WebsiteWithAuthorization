using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Authorization.Interfaces;
using YAGO.WebsiteWithAuthorization.Application.Authorization.Models;

namespace YAGO.WebsiteWithAuthorization.Host.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class AuthorizationController : ControllerBase
	{
		private readonly IAuthorizationService _identityService;

		public AuthorizationController(IAuthorizationService identityService)
		{
			_identityService = identityService;
		}

		[HttpGet]
		[Route("getCurrentUser")]
		public Task<AuthorizationData> GetCurrentUser(CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			return _identityService.GetCurrentUser(HttpContext.User, cancellationToken);
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
			return _identityService.RegisterAsync(request, cancellationToken);
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
			return _identityService.LoginAsync(request, cancellationToken);
		}

		[HttpPost]
		[Route("logout")]
		public async Task<AuthorizationData> Logout(CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			await _identityService.LogoutAsync(HttpContext.User, cancellationToken);
			return AuthorizationData.NotAuthorized;
		}
	}
}
