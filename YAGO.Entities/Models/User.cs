using Microsoft.AspNetCore.Identity;
using System;

namespace YAGO.Entities.Models
{
	public class User : IdentityUser
	{
		public DateTimeOffset Registration { get; set; }
		public DateTimeOffset LastActivity { get; set; }
	}
}
