namespace Databay.Chatbot.BotConfiguration.Api.ViewModel
{
	public class ResponseDetailViewModel : ViewModel
	{
		public string BotId { get; set; }

		public string IntentId { get; set; }

		public string ResponseId { get; set; }

		public string InternalId { get; set; }

		public string Text { get; set; }

		public string ImageUrl { get; set; }

		public string Type { get; set; }
	}
}