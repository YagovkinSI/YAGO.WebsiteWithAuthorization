using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Infrastructure.Database.Models;

namespace YAGO.WebsiteWithAuthorization.Infrastructure.Database.Extensions
{
	public static class UserExtensions
	{
		public static async Task<User> FindByUserNameAsync(this DbSet<User> set, string userName)
		{
			return await set
				.FirstOrDefaultAsync(u => u.UserName == userName);
		}
	}
}
