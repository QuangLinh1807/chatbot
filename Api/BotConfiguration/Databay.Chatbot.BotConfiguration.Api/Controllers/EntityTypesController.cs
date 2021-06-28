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
	public class EntityTypesController : ApiController
	{
		private readonly IEntityTypeRepository _entityTypeRepository;

		public EntityTypesController(IEntityTypeRepository entityTypeRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_entityTypeRepository = entityTypeRepository;
		}

		//[NoCache]
		//[HttpGet]
		//public async Task<IActionResult> Get()
		//{
		//	var EntityTypes = await _EntityTypeRepository.GetAllEntityTypes();
		//	return Response(EntityTypes);
		//}

		[NoCache]
		[HttpGet]
        public async Task<IActionResult> Get(string botId, string keyword = null, string orderColumn = null, int pageIndex = 0, int pageSize = 0)
        {
            if (pageSize == 0)
            {
                var entityTypes = await _entityTypeRepository.GetAllEntityTypes(botId);
                return Response(entityTypes);
            }
            var result = await _entityTypeRepository.GetEntityTypesAsync(botId, keyword, orderColumn, pageIndex, pageSize);
			return Response(result.Item1, false, result.Item2);
		}

		[HttpGet(template: "{botId}/{entityTypeId}")]
		public async Task<IActionResult> Get(string botId, string entityTypeId)
		{
			var entityType = await _entityTypeRepository.GetEntityType(botId, entityTypeId);
			return Response(entityType);
		}

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] EntityTypeViewModel newEntityType)
		{
			newEntityType.CreatedBy = UserId;
			var result = await _entityTypeRepository.AddEntityType(newEntityType);
			return Response(result);
		}

		[HttpPut]
		public async Task<IActionResult> Put([FromBody] EntityTypeViewModel entityType)
		{
			entityType.ModifiedBy = UserId;
			var result = await _entityTypeRepository.UpdateEntityType(entityType);
			return Response(result);
		}

		[HttpDelete(template: "{botId}/{EntityTypeId}")]
		public async Task<IActionResult> Delete(string botId, string entityTypeId)
		{
			var result = await _entityTypeRepository.RemoveEntityType(botId, entityTypeId);
			return Response(result);
		}
	}
}