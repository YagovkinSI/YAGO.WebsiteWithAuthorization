using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using YAGO.Entities.Models;

namespace YAGO.Entities.Extensions
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
