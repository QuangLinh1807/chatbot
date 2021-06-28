namespace Databay.Chatbot.BotConfiguration.Api.ViewModel
{
	public class PatternViewModel : ViewModel
	{

		public string BotId { get; set; }

		public string IntentId { get; set; }

		public string InternalId { get; set; }

		public string TemplateSentence { get; set; }

		public string Description { get; set; }

		public bool IsCreated { get; set; }
	}
}