using System.Threading.Tasks;
using AutoMapper;
using Databay.Chatbot.BotConfiguration.Api.Infrastructure;
using Databay.Chatbot.BotConfiguration.Api.Interfaces;
using Databay.Chatbot.BotConfiguration.Api.Services;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Databay.Chatbot.BotConfiguration.Api.Controllers
{
	[Authorize]
	[Produces("application/json")]
	[Route("api/v1/[controller]")]
	public class ResponsesController : ApiController
	{
		private readonly IResponseRepository _responseRepository;

		public ResponsesController(IResponseRepository responseRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_responseRepository = responseRepository;
		}

		[NoCache]
		[HttpGet]
		public async Task<IActionResult> Get(string botId, string intentId)
		{
			var result = await _responseRepository.GetResponseByIntentId(botId, intentId);
			return Response(result);
		}

		[HttpGet(template: "{botId}/{intentId}/{ResponseId}")]
		public async Task<IActionResult> Get(string botId, string intentId, string responseId)
		{
			var response = await _responseRepository.GetResponse(botId, intentId, responseId);

			return Response(response);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] ResponseViewModel newResponse)
		{
			newResponse.CreatedBy = UserId;
			var result = await _responseRepository.AddResponse(newResponse);
			return Response(result);
		}

		[HttpPut]
		public async Task<IActionResult> Put([FromBody] ResponseViewModel response)
		{
			response.ModifiedBy = UserId;
			var result = await _responseRepository.UpdateResponse(response);
			return Response(result);
		}

		[HttpDelete(template: "{botId}/{intentId}/{ResponseId}")]
		public async Task<IActionResult> Delete(string botId, string intentId, string responseId)
		{
		 var result = await	_responseRepository.RemoveResponse(botId, intentId, responseId);
			return Response(result);
		}
	}
}