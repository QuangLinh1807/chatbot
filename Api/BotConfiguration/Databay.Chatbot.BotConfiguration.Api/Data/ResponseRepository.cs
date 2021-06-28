using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Databay.Chatbot.BotConfiguration.Api.Context;
using Databay.Chatbot.BotConfiguration.Api.Interfaces;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.Services;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Databay.Chatbot.BotConfiguration.Api.Data
{
	public class ResponseRepository : IResponseRepository
	{
		private readonly BotContext _context = null;
		private readonly IBotRepository _botRepository;
		private readonly IMapper _mapper;
		private readonly IMongoDbHelperService _mongoDbHelperService;

		public ResponseRepository(IOptions<Settings> settings, IBotRepository botRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_botRepository = botRepository;
			_mapper = mapper;
			_mongoDbHelperService = mongoDbHelperService;
			_context = new BotContext(settings);
		}

		public async Task<IEnumerable<Response>> GetAllResponses()
		{
			//try
			//{
			//	return await _context.Responses.Find(_ => true).ToListAsync();
			//}
			//catch (Exception ex)
			//{
			//	// log or manage the exception
			//	throw ex;
			//}
			return null;
		}

		public async Task<Response> GetResponse(string botId, string intentId, string responseId)
		{
			try
			{
				var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
					Project(b => new Bot()
					{
						InternalId = b.InternalId,
						Intents = b.Intents.Where(i => i.InternalId == _mongoDbHelperService.GetInternalId(intentId)).ToList()
					}).
					FirstOrDefaultAsync();

				var response = findFluent.Intents.FirstOrDefault()?.Responses.FirstOrDefault(r => r.InternalId == _mongoDbHelperService.GetInternalId(responseId));
				return response;
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				throw;
			}
		}

		public async Task<(bool, ObjectId)> AddResponse(ResponseViewModel response)
		{
			try
			{
				var newResponse = new Response()
				{
					InternalId = ObjectId.GenerateNewId(),
					CreatedBy = response.CreatedBy,
					IsCreated = response.IsCreated,
				};
				UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(response.BotId),
					Builders<Bot>.Update.Push("Intents.$[i].Responses", newResponse),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(response.IntentId))),
						},
						IsUpsert = true
					});
				return (actionResult.IsAcknowledged
					   && actionResult.ModifiedCount > 0, newResponse.InternalId);
			}
			catch (Exception ex)
			{
				// log or manage the exception
				return (false, ObjectId.Empty);
			}
		}

		public async Task<bool> UpdateResponse(ResponseViewModel response)
		{
			try
			{
				UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(response.BotId),
				Builders<Bot>.Update.
					Set("Intents.$[i].Responses.$[p].IsCreated", response.IsCreated).
					Set("Intents.$[i].Responses.$[p].ModifiedBy", response.ModifiedBy).
					Set("Intents.$[i].Responses.$[p].ModifiedDate", DateTime.Now),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(response.IntentId))),
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("p._id", _mongoDbHelperService.GetInternalId(response.InternalId))),
						},
						IsUpsert = true
					});
				return actionResult.IsAcknowledged
					   && actionResult.ModifiedCount > 0;
			}
			catch (Exception ex)
			{
				// log or manage the exception
				return false;
			}
		}

		public async Task<bool> RemoveResponse(string botId, string intentId, string responseId)
		{
			try
			{
				var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
					Project(b => new Bot()
					{
						Intents = b.Intents.Where(c => c.InternalId == _mongoDbHelperService.GetInternalId(intentId)).ToList()
					}).
					FirstOrDefaultAsync();

				var response = findFluent.Intents.FirstOrDefault()?.Responses.FirstOrDefault(x => x.InternalId == _mongoDbHelperService.GetInternalId(responseId));

				UpdateResult actionResult = await _context.Bots.UpdateOneAsync((x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)),
					Builders<Bot>.Update.Pull("Intents.$[i].Responses", response),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(intentId))),
						},
						IsUpsert = true
					});

				return actionResult.IsAcknowledged
					   && actionResult.ModifiedCount > 0;
			}
			catch (Exception e)
			{
				return false;
			}
		}

		public async Task<List<ResponseViewModel>> GetResponseByIntentId(string botId, string intentId)
		{
			var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
				Project(b => new Bot()
				{
					Intents = b.Intents.Where(c => c.InternalId == _mongoDbHelperService.GetInternalId(intentId)).ToList()
				}).
				FirstOrDefaultAsync();

			return _mapper.Map<List<Response>, List<ResponseViewModel>>(findFluent.Intents.FirstOrDefault()?.Responses);
		}
	}
}
