using System.ComponentModel.DataAnnotations;

namespace YAGO.WebsiteWithAuthorization.Application.Authorization.Models
{
	public class RegisterRequest
	{
		[Required(ErrorMessage = "Требуется логин")]
		public string UserName { get; set; }

		[Required(ErrorMessage = "Требуется пароль")]
		public string Password { get; set; }

		[Required(ErrorMessage = "Требуется повторить пароль")]
		[Compare("Password", ErrorMessage = "Пароли не совпадают")]
		public string PasswordConfirm { get; set; }
	}
}
