using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Authorization.Interfaces;
using YAGO.WebsiteWithAuthorization.Application.Authorization.Models;
using YAGO.WebsiteWithAuthorization.Domain.User;

namespace YAGO.WebsiteWithAuthorization.Host.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class AuthorizationController : ControllerBase
	{
		private readonly IAuthorizationService _identityService;
		private readonly ILogger<AuthorizationController> _logger;

		public AuthorizationController(IAuthorizationService identityService,
			ILogger<AuthorizationController> logger)
		{
			_identityService = identityService;
			_logger = logger;
		}

		[HttpGet]
		[Route("getCurrentUser")]
		public async Task<ActionResult<User>> GetCurrentUser()
		{
			try
			{
				var userPrivate = await _identityService.GetCurrentUser(HttpContext.User);
				return Ok(userPrivate);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message, ex);
				return StatusCode(500, ex.Message);
			}
		}

		[HttpPost]
		[Route("register")]
		public async Task<ActionResult<User>> Register(RegisterRequest request)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					var stateErrors = ModelState.SelectMany(s => s.Value.Errors.Select(e => e.ErrorMessage));
					return BadRequest(string.Join(". ", stateErrors));
				}

				var userPrivate = await _identityService.RegisterAsync(request);
				return Ok(userPrivate);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message, ex);
				return StatusCode(500, ex.Message);
			}
		}


		[HttpPost]
		[Route("login")]
		public async Task<ActionResult<User>> Login(LoginRequest request)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					var stateErrors = ModelState.SelectMany(s => s.Value.Errors.Select(e => e.ErrorMessage));
					return BadRequest(string.Join(". ", stateErrors));
				}

				var userPrivate = await _identityService.LoginAsync(request);
				return Ok(userPrivate);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message, ex);
				return StatusCode(500, ex.Message);
			}
		}

		[HttpPost]
		[Route("logout")]
		public async Task<ActionResult<User>> Logout()
		{
			try
			{
				await _identityService.LogoutAsync(HttpContext.User);
				return Ok(AuthorizationData.NotAuthorized);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.Message, ex);
				return StatusCode(500, ex.Message);
			}
		}
	}
}
