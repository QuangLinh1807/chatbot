using System.Collections.Generic;
using System.Threading.Tasks;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;
using MongoDB.Bson;

namespace Databay.Chatbot.BotConfiguration.Api.Interfaces
{
	public interface IIntentRepository
	{
		Task<IEnumerable<Intent>> GetAllIntents(string botId);

		Task<Intent> GetIntent(string botId, string intentId);

		// add new Intent document
		Task<(bool, ObjectId)> AddIntent(IntentViewModel item);

		// full document update
		Task<bool> UpdateIntent(IntentViewModel intent);

		Task<bool> RemoveIntent(string botId, string intentId);

		Task<(List<IntentViewModel>, int)> GetIntentsAsync(string botId, string keyword, string orderColumn, string sortColumnDirection, int pageIndex,
			int pageSize);
	}
}
