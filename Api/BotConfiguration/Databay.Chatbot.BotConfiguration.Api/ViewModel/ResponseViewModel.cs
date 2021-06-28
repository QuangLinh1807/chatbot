using System.Collections.Generic;
using Databay.Chatbot.BotConfiguration.Api.Model;

namespace Databay.Chatbot.BotConfiguration.Api.ViewModel
{
	public class ResponseViewModel : ViewModel
	{
		public string BotId { get; set; }

		public string IntentId { get; set; }

		public string InternalId { get; set; }

		public List<ResponseDetail> ResponseDetails { get; set; } = new List<ResponseDetail>();

		public bool IsCreated { get; set; }
	}
}