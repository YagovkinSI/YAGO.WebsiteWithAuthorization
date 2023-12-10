using System;
using System.Threading;
using System.Threading.Tasks;
using YAGO.WebsiteWithAuthorization.Application.Users.Interfaces;
using YAGO.WebsiteWithAuthorization.Domain.User;

namespace YAGO.WebsiteWithAuthorization.Application.Users
{
	public class UserLastActivityService
	{
		private readonly IUserDatabaseService _userDatabaseService;

		public UserLastActivityService(IUserDatabaseService userDatabaseService)
		{
			_userDatabaseService = userDatabaseService;
		}

		public async Task UpdateUserLastActivity(User user, CancellationToken cancellationToken)
		{
			cancellationToken.ThrowIfCancellationRequested();
			if (user == null || user.LastActivity > DateTimeOffset.Now - TimeSpan.FromSeconds(5))
				return;

			await _userDatabaseService.UpdateLastActivity(user.Id, cancellationToken);
		}
	}
}
