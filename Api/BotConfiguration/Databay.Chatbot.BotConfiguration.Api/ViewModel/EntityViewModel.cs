namespace Databay.Chatbot.BotConfiguration.Api.ViewModel
{
	public class EntityViewModel : ViewModel
	{
		public string BotId { get; set; }

		public string IntentId { get; set; }

		public string PatternId { get; set; }

		public string InternalId { get; set; }
		
		public string Name { get; set; }

		public string EntityTypeId { get; set; }

		public string Description { get; set; }
	}
}