namespace YAGO.Service.Authorization.Models
{
	public class AuthorizationData
	{
		public bool IsAuthorized { get; set; }
		public AuthorizationUser User { get; set; }

		public static AuthorizationData NotAuthorized => new() { IsAuthorized = false, User = null };
	}
}
