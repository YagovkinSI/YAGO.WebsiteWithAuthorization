using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
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
		public Task<AuthorizationData> GetCurrentUser()
		{
			return _identityService.GetCurrentUser(HttpContext.User);
		}

		[HttpPost]
		[Route("register")]
		public Task<AuthorizationData> Register(RegisterRequest request)
		{
			if (!ModelState.IsValid)
			{
				var stateErrors = ModelState.SelectMany(s => s.Value.Errors.Select(e => e.ErrorMessage));
				throw new BadHttpRequestException(string.Join(". ", stateErrors));
			}

			return _identityService.RegisterAsync(request);
		}


		[HttpPost]
		[Route("login")]
		public Task<AuthorizationData> Login(LoginRequest request)
		{
			if (!ModelState.IsValid)
			{
				var stateErrors = ModelState.SelectMany(s => s.Value.Errors.Select(e => e.ErrorMessage));
				throw new BadHttpRequestException(string.Join(". ", stateErrors));
			}

			return _identityService.LoginAsync(request);
		}

		[HttpPost]
		[Route("logout")]
		public async Task<AuthorizationData> Logout()
		{
			await _identityService.LogoutAsync(HttpContext.User);
			return AuthorizationData.NotAuthorized;
		}
	}
}
