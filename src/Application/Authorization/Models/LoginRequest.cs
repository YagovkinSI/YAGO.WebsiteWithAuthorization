using System.ComponentModel.DataAnnotations;

namespace YAGO.WebsiteWithAuthorization.Application.Authorization.Models
{
	public class LoginRequest
	{
		[Required(ErrorMessage = "Требуется логин")]
		public string UserName { get; set; }

		[Required(ErrorMessage = "Требуется пароль")]
		public string Password { get; set; }
	}
}
