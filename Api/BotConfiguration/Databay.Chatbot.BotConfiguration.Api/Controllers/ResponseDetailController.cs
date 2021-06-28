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
	public class ResponseDetailsController : ApiController
	{
		private readonly IResponseDetailRepository _responseDetailRepository;

		public ResponseDetailsController(IResponseDetailRepository responseDetailRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_responseDetailRepository = responseDetailRepository;
		}

		[NoCache]
		[HttpGet(template: "{botId}/{intentId}/{responseId}")]
		public async Task<IActionResult> Get(string botId, string intentId, string responseId)
		{
			var responseDetails = await _responseDetailRepository.GetAllByResponseId(botId, intentId, responseId);
			return Response(responseDetails);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] ResponseDetailViewModel newResponseDetail)
		{
			newResponseDetail.CreatedBy = UserId;
			var result = await _responseDetailRepository.AddResponseDetail(newResponseDetail);
			return Response(result);
		}

		[HttpPut]
		public async Task<IActionResult> Put([FromBody] ResponseDetailViewModel responseDetail)
		{
			responseDetail.ModifiedBy = UserId;
			var result = await _responseDetailRepository.UpdateResponseDetail(responseDetail);
			return Response(result);
		}

		[HttpDelete(template: "{botId}/{intentId}/{responseId}/{ResponseDetailId}")]
		public async Task<IActionResult> Delete(string botId, string intentId, string responseId, string responseDetailId)
		{
			var result = await _responseDetailRepository.RemoveResponseDetail(botId, intentId, responseId, responseDetailId);
			return Response(result);
		}
	}
}