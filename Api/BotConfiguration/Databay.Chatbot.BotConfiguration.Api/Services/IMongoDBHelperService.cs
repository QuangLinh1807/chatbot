using MongoDB.Bson;

namespace Databay.Chatbot.BotConfiguration.Api.Services
{
	public interface IMongoDbHelperService
	{
		// Try to convert the Id to a BSonId value
		ObjectId GetInternalId(string id);
	}
}
