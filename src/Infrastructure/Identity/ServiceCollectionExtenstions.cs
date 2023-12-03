using Microsoft.Extensions.DependencyInjection;
using YAGO.WebsiteWithAuthorization.Application.Authorization.Interfaces;

namespace YAGO.WebsiteWithAuthorization.Infrastructure.Identity
{
	public static partial class ServiceCollectionExtenstions
	{
		public static IServiceCollection AddIdentity(this IServiceCollection services)
		{
			services.AddScoped<IAuthorizationService, IdentityService>();

			return services;
		}
	}
}
