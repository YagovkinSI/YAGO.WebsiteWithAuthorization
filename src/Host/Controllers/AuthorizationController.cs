using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;
using System;
using YAGO.Service.Authorization.Models;
using YAGO.Service.Authorization;
using YAGO.WebsiteWithAuthorization.Domain.User;

namespace YAGO.WebsiteWithAuthorization.Web.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class AuthorizationController : ControllerBase
	{
		private readonly AuthorizationService _authorizationService;
		private readonly ILogger<AuthorizationController> _logger;

		public AuthorizationController(AuthorizationService authorizationService,
			ILogger<AuthorizationController> logger)
		{
			_authorizationService = authorizationService;
			_logger = logger;
		}

		[HttpGet]
		[Route("getCurrentUser")]
		public async Task<ActionResult<User>> GetCurrentUser()
		{
			try
			{
				var userPrivate = await _authorizationService.GetCurrentUser(HttpContext.User);
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

				var userPrivate = await _authorizationService.RegisterAsync(request);
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

				var userPrivate = await _authorizationService.LoginAsync(request);
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
				await _authorizationService.LogoutAsync(HttpContext.User);
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
