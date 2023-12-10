using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using YAGO.WebsiteWithAuthorization.Infrastructure.Database;
using YAGO.WebsiteWithAuthorization.Infrastructure.Identity;

namespace YAGO.WebsiteWithAuthorization.Infrastructure
{
	public static partial class ServiceCollectionExtensions
	{
		public static IServiceCollection AddInfrastructure(
			this IServiceCollection services,
			IConfiguration configuration)
		{
			services
				.AddDatabase(configuration)
				.AddIdentity();

			return services;
		}
	}
}
