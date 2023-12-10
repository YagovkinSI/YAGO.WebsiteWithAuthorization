using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using YAGO.WebsiteWithAuthorization.Application.Users.Interfaces;
using YAGO.WebsiteWithAuthorization.Infrastructure.Database;
using YAGO.WebsiteWithAuthorization.Infrastructure.Database.Models;

namespace YAGO.WebsiteWithAuthorization.Infrastructure.Identity
{
	public static partial class ServiceCollectionExtenstions
	{
		public static IServiceCollection AddIdentity(this IServiceCollection services)
		{
			services
				.AddIdentity<User, IdentityRole>(options =>
				{
					options.Password.RequireNonAlphanumeric = false;
					options.User.AllowedUserNameCharacters =
						"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
				})
				.AddEntityFrameworkStores<DatabaseContext>();

			services
				.AddScoped<IAuthorizationService, IdentityService>();

			return services;
		}
	}
}
