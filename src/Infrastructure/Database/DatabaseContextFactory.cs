using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace YAGO.WebsiteWithAuthorization.Infrastructure.Database
{
	public class DatabaseContextFactory : IDesignTimeDbContextFactory<DatabaseContext>
	{
		private const string CONNECTION_STRING = "Server=(localdb)\\mssqllocaldb;Database=YAGO.WebsiteWithAuthorization;Trusted_Connection=True;";

		public DatabaseContext CreateDbContext(string[] args)
		{
			var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>()
				.UseSqlServer(CONNECTION_STRING);

			return new DatabaseContext(optionsBuilder.Options);
		}
	}
}
