using System.Collections.Generic;
using System.Threading.Tasks;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;
using MongoDB.Bson;

namespace Databay.Chatbot.BotConfiguration.Api.Interfaces
{
	public interface IResponseRepository
	{
		Task<Response> GetResponse(string botId, string intentId, string responseId);

		// add new Response document
		Task<(bool, ObjectId)> AddResponse(ResponseViewModel item);

		// full document update
		Task<bool> UpdateResponse(ResponseViewModel response);

		Task<bool> RemoveResponse(string botId, string intentId, string responseId);

		Task<List<ResponseViewModel>> GetResponseByIntentId(string botId, string intentId);
	}
}
