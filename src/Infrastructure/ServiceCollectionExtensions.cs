using Microsoft.Extensions.DependencyInjection;
using YAGO.WebsiteWithAuthorization.Infrastructure.Identity;

namespace YAGO.WebsiteWithAuthorization.Infrastructure
{
	public static partial class ServiceCollectionExtensions
	{
		public static IServiceCollection AddInfrastructure(this IServiceCollection services)
		{
			services.AddIdentity();

			return services;
		}
	}
}
