using System.Threading.Tasks;
using AutoMapper;
using Databay.Chatbot.BotConfiguration.Api.Infrastructure;
using Databay.Chatbot.BotConfiguration.Api.Interfaces;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.Services;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Databay.Chatbot.BotConfiguration.Api.Controllers
{
	[Authorize]
	[Produces("application/json")]
	[Route("api/v1/[controller]")]
	public class BotsController : ApiController
	{
		private readonly IBotRepository _botRepository;
		private readonly IMapper _mapper;
		private readonly IMongoDbHelperService _mongoDbHelperService;

		public BotsController(IBotRepository botRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_mapper = mapper;
			_mongoDbHelperService = mongoDbHelperService;
			_botRepository = botRepository;
		}

		[NoCache]
		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var bots = await _botRepository.GetAllByUserId(UserId);
			return Response(bots);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(string id)
		{
			var bot = await _botRepository.GetBot(id);
			return Response(bot);
		}

		// POST api/Bots
		[HttpPost]
		public IActionResult Post([FromBody] BotViewModel botParam)
		{
			if (!ModelState.IsValid) return Response();
            var internalId = ObjectId.GenerateNewId();
            _botRepository.AddBot(new Bot
			{
                InternalId = internalId,
                Name = botParam.Name,
				Description = botParam.Description,
				CreatedBy = UserId,
			});
			return Response(internalId);
		}

		[HttpPut]
		public async Task<IActionResult> Put([FromBody] BotViewModel botParam)
		{
			if (!ModelState.IsValid) return Response();

			botParam.ModifiedBy = UserId;
			var result = await _botRepository.UpdateBot(botParam);
			return Response(result);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(string id)
		{
			var result = await _botRepository.RemoveBot(_mongoDbHelperService.GetInternalId(id));
			return Response(result);
		}
	}
}