namespace Databay.Chatbot.BotConfiguration.Api.ViewModel
{
	public class EntityTypeViewModel : ViewModel
	{
		public string InternalId { get; set; }

		public string BotId { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public int ExtractionMethod { get; set; }

		public int CountPattern { get; set; }
	}
}