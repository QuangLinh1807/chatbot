using System;
using MongoDB.Bson;

namespace Databay.Chatbot.BotConfiguration.Api.ViewModel
{
	public class ViewModel
	{
		public ObjectId CreatedBy { get; set; }

		public ObjectId ModifiedBy { get; set; }

		public DateTime CreatedDate { get; set; }

		public DateTime ModifiedDate { get; set; }
	}
}
