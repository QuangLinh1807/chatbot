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
	public class PatternsController : ApiController
	{
		private readonly IPatternRepository _patternRepository;

		public PatternsController(IPatternRepository patternRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_patternRepository = patternRepository;
		}

		[NoCache]
		[HttpGet]
		public async Task<IActionResult> Get(string botId, string keyword, string orderColumn, string sortColumnDirection, int pageIndex, int pageSize, bool isCreated)
		{
			var result = await _patternRepository.GetPatternsAsync(botId, keyword, orderColumn, sortColumnDirection, pageIndex, pageSize, isCreated);
			return Response(result.Item1, false, result.Item2);
		}

		[HttpGet(template: "{botId}/{intentId}/{patternId}")]
		public async Task<IActionResult> Get(string botId, string intentId, string patternId)
		{
			var pattern = await _patternRepository.GetPattern(botId, intentId, patternId);

			return Response(pattern);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] PatternViewModel newPattern)
		{
			newPattern.CreatedBy = UserId;
			var result = await _patternRepository.AddPattern(newPattern);
			return Response(result);
		}

		[HttpPut]
		public async Task<IActionResult> Put([FromBody] PatternViewModel pattern)
		{
			pattern.ModifiedBy = UserId;
			var result = await _patternRepository.UpdatePattern(pattern);
			return Response(result);
		}

		[HttpDelete(template: "{botId}/{intentId}/{patternId}")]
		public async Task<IActionResult> Delete(string botId, string intentId, string patternId)
		{
		 var result = await	_patternRepository.RemovePattern(botId, intentId, patternId);
			return Response(result);
		}
	}
}