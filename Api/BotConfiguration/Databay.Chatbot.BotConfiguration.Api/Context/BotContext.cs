using Databay.Chatbot.BotConfiguration.Api.Model;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Databay.Chatbot.BotConfiguration.Api.Context
{
    public class BotContext
    {
        private readonly IMongoDatabase _database = null;

        public BotContext(IOptions<Settings> settings)
        {
	        var client = new MongoClient(settings.Value.ConnectionString);
	        _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<Bot> Bots => _database.GetCollection<Bot>("Bot");
    }
}
