using System.Collections.Generic;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Newtonsoft.Json;

namespace Databay.Chatbot.BotConfiguration.Api.ViewModel
{
    public class IntentViewModel : ViewModel
	{
		public string BotId { get; set; }

	    public string InternalId { get; set; } 

		public string Name { get; set; }

		public string Description { get; set; }

		[JsonIgnore]
		public List<Pattern> Patterns { get; set; }

		//[JsonIgnore]
		public List<Response> Responses { get; set; }

		public int CountPattern { get; set; }

		public int CountResponse { get; set; }
	}
}
