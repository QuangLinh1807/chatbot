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
	public class IntentsController : ApiController
	{
		private readonly IIntentRepository _intentRepository;

		public IntentsController(IIntentRepository intentRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_intentRepository = intentRepository;
		}

		//[NoCache]
		//[HttpGet]
		//public async Task<IActionResult> Get()
		//{
		//	var intents = await _intentRepository.GetAllIntents();
		//	return Response(intents);
		//}

		[NoCache]
		[HttpGet]
		public async Task<IActionResult> Get(string botId, string keyword = null, string orderColumn = null, string sortColumnDirection = null, int pageIndex = 0, int pageSize = 0)
        {
            if (pageSize == 0)
            {
                var intents = await _intentRepository.GetAllIntents(botId);
                return Response(intents);
            }
            var result = await _intentRepository.GetIntentsAsync(botId, keyword, orderColumn, sortColumnDirection, pageIndex, pageSize);
			return Response(result.Item1,false,result.Item2);
		}

		[HttpGet(template: "{botId}/{intentId}")]
		public async Task<IActionResult> Get(string botId, string intentId)
		{
			var intent = await _intentRepository.GetIntent(botId, intentId);
			return Response(intent);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] IntentViewModel newIntent)
		{
            newIntent.CreatedBy = UserId;
			var result = await _intentRepository.AddIntent(newIntent);
			return Response(result);
		}

		[HttpPut]
		public async Task<IActionResult> Put([FromBody] IntentViewModel intent)
		{
			intent.ModifiedBy = UserId;
			var result = await _intentRepository.UpdateIntent(intent);
			return Response(result);
		}

		[HttpDelete(template: "{botId}/{intentId}")]
		public async Task<IActionResult> Delete(string botId, string intentId)
		{
			var result = await _intentRepository.RemoveIntent(botId, intentId);
			return Response(result);
		}
	}
}