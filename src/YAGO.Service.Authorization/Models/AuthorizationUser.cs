using System;

namespace YAGO.Service.Authorization.Models
{
	public class AuthorizationUser
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public DateTimeOffset Registration { get; set; }
		public DateTimeOffset LastActivity { get; set; }
	}
}
