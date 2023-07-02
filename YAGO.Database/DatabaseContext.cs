using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using YAGO.Entities.Models;

namespace YAGO.Database
{
	public class DatabaseContext : IdentityDbContext<User>
	{
		public DatabaseContext(DbContextOptions<DatabaseContext> options)
			   : base(options)
		{
			Database.Migrate();
		}
	}
}
