using YAGO.WebsiteWithAuthorization.Domain.User;

namespace YAGO.WebsiteWithAuthorization.Application.Authorization.Models
{
	public class AuthorizationData
	{
		public bool IsAuthorized { get; set; }
		public User User { get; set; }

		public static AuthorizationData NotAuthorized => new() { IsAuthorized = false, User = null };
	}
}
