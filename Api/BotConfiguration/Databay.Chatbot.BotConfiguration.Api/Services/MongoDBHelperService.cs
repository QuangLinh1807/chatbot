using MongoDB.Bson;

namespace Databay.Chatbot.BotConfiguration.Api.Services
{
	public class MongoDbHelperService : IMongoDbHelperService
	{
		ObjectId IMongoDbHelperService.GetInternalId(string id)
		{
			if (!ObjectId.TryParse(id, out ObjectId internalId))
				internalId = ObjectId.Empty;

			return internalId;
		}
	}
}
