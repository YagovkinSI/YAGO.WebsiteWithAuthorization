using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Database;
using YAGO.WebsiteWithAuthorization.Domain.User;

namespace YAGO.WebsiteWithAuthorization.Infrastructure.Database
{
	public partial class DatabaseContext : IDatabaseService
	{
		public async Task<User> Find(string userId, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var user = await Users.FindAsync(new object[] { userId }, cancellationToken: cancellationToken);
			return ToDomain(user);
		}

		public async Task<User> FindByUserName(string userName, CancellationToken cancellationToken)
		{
			var user = await Users.FirstOrDefaultAsync(u => u.UserName == userName, cancellationToken: cancellationToken);
			return ToDomain(user);
		}

		public async Task UpdateLastActivity(string userId, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			var user = await Users.FindAsync(new object[] { userId }, cancellationToken: cancellationToken);
			if (user == null)
				return;

			user.LastActivity = DateTimeOffset.Now;
			Update(user);
			await SaveChangesAsync();
		}

		private static User ToDomain(Models.User user)
		{
			return user == null
				? null
				: new User
				(
					user.Id,
					user.UserName,
					user.Registration,
					user.LastActivity
				);
		}
	}
}
