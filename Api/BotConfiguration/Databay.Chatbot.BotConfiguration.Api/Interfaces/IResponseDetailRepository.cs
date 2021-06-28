using System.Threading.Tasks;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;

namespace Databay.Chatbot.BotConfiguration.Api.Interfaces
{
	public interface IResponseDetailRepository
	{
		// add new ResponseDetail document
		Task<bool> AddResponseDetail(ResponseDetailViewModel item);

		// full document update
		Task<bool> UpdateResponseDetail(ResponseDetailViewModel responseDetail);

		Task<bool> RemoveResponseDetail(string botId, string intentId, string responseId, string responseDetailId);

		Task<ResponseDetailViewModel> GetAllByResponseId(string botId, string intentId, string responseId);
	}
}
