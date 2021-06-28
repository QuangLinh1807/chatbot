using System.Collections.Generic;
using System.Threading.Tasks;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;
using MongoDB.Bson;

namespace Databay.Chatbot.BotConfiguration.Api.Interfaces
{
    public interface IBotRepository
    {
        Task<IEnumerable<Bot>> GetAllBots();

        Task<Bot> GetBot(string id);

        // add new Bot document
        Task AddBot(Bot item);

        // remove a single document / Bot
        Task<bool> RemoveBot(ObjectId id);

        // full document update
        Task<bool> UpdateBot(BotViewModel bot);

	    // creates a sample index
		Task<string> CreateIndex();
	    Task<IEnumerable<Bot>> GetAllByUserId(ObjectId userId);
    }
}
