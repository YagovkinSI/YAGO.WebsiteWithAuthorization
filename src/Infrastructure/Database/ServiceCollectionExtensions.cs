using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace YAGO.WebsiteWithAuthorization.Infrastructure.Database
{
	public static partial class ServiceCollectionExtensions
	{
		public static IServiceCollection AddDatabase(
			this IServiceCollection services,
			IConfiguration configuration)
		{
			services.AddDbContext<DatabaseContext>(options =>
				options.UseSqlServer(
					configuration.GetConnectionString("DefaultConnection")
				));

			return services;
		}
	}
}
