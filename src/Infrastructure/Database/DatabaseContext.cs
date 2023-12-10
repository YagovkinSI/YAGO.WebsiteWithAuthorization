using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using YAGO.WebsiteWithAuthorization.Infrastructure.Database.Models;

namespace YAGO.WebsiteWithAuthorization.Infrastructure.Database
{
	public partial class DatabaseContext : IdentityDbContext<User>
	{
		public DatabaseContext(DbContextOptions<DatabaseContext> options)
			   : base(options)
		{
			Database.Migrate();
		}
	}
}
