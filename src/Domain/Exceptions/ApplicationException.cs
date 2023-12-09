using System;

namespace YAGO.WebsiteWithAuthorization.Domain.Exceptions
{
	public class ApplicationException : Exception
	{
		public ApplicationException(string message, int errorCode = 500)
			: base(message)
		{
			ErrorCode = errorCode;
		}

		public int ErrorCode { get; }
	}
}
