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
	public class EntitiesController : ApiController
	{
		private readonly IEntityRepository _entityRepository;

		public EntitiesController(IEntityRepository entityRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_entityRepository = entityRepository;
		}

		[NoCache]
		[HttpGet(template: "{botId}/{intentId}/{patternId}")]
		public async Task<IActionResult> Get(string botId, string intentId, string patternId)
		{
			var entities = await _entityRepository.GetAllByPatternId(botId, intentId, patternId);
			return Response(entities);
		}

		[HttpGet(template: "{botId}/{intentId}/{patternId}/{entityId}")]
		public async Task<IActionResult> Get(string botId, string intentId, string patternId, string entityId)
		{
			var entity = await _entityRepository.GetEntity(botId, intentId, patternId, entityId);

			return Response(entity);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] EntityViewModel newEntity)
		{
			newEntity.CreatedBy = UserId;
			var result = await _entityRepository.AddEntity(newEntity);
			return Response(result);
		}

		[HttpPut]
		public async Task<IActionResult> Put([FromBody] EntityViewModel entity)
		{
			entity.ModifiedBy = UserId;
			var result = await _entityRepository.UpdateEntity(entity);
			return Response(result);
		}

		[HttpDelete(template: "{botId}/{intentId}/{patternId}/{entityId}")]
		public async Task<IActionResult> Delete(string botId, string intentId, string patternId, string entityId)
		{
			var result = await _entityRepository.RemoveEntity(botId, intentId, patternId, entityId);
			return Response(result);
		}
	}
}