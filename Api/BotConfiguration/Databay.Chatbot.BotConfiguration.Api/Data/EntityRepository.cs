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
	public class EntityRepository : IEntityRepository
	{
		private readonly BotContext _context = null;
		private readonly IBotRepository _botRepository;
		private readonly IMapper _mapper;
		private readonly IMongoDbHelperService _mongoDbHelperService;

		public EntityRepository(IOptions<Settings> settings, IBotRepository botRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_botRepository = botRepository;
			_mapper = mapper;
			_mongoDbHelperService = mongoDbHelperService;
			_context = new BotContext(settings);
		}

		public async Task<IEnumerable<Entity>> GetAllEntities()
		{
			//try
			//{
			//	return await _context.Entities.Find(_ => true).ToListAsync();
			//}
			//catch (Exception ex)
			//{
			//	// log or manage the exception
			//	throw ex;
			//}
			return null;
		}

		public async Task<Entity> GetEntity(string botId, string intentId, string patternId, string entityId)
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

				var pattern = findFluent.Intents.FirstOrDefault()?.Patterns.FirstOrDefault(p => p.InternalId == _mongoDbHelperService.GetInternalId(patternId));
				var entity = pattern?.Entities.FirstOrDefault(p => p.InternalId == _mongoDbHelperService.GetInternalId(entityId));
				return entity;
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				throw;
			}
		}

		public async Task<bool> AddEntity(EntityViewModel entity)
		{
			try
			{
				UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(entity.BotId),
					Builders<Bot>.Update.Push("Intents.$[i].Patterns.$[p].Entities", new Entity()
					{
						InternalId = ObjectId.GenerateNewId(),
						Name = entity.Name,
						Description = entity.Description,
						EntityTypeId = _mongoDbHelperService.GetInternalId(entity.EntityTypeId),
						CreatedBy = entity.CreatedBy
					}),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(entity.IntentId))),
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("p._id", _mongoDbHelperService.GetInternalId(entity.PatternId))),
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

		public async Task<bool> UpdateEntity(EntityViewModel entity)
		{
			try
			{
				UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(entity.BotId),
				Builders<Bot>.Update.
					Set("Intents.$[i].Patterns.$[p].Entities.$[e].Name", entity.Name).
					Set("Intents.$[i].Patterns.$[p].Entities.$[e].Description", entity.Description).
					Set("Intents.$[i].Patterns.$[p].Entities.$[e].EntityTypeId", _mongoDbHelperService.GetInternalId(entity.EntityTypeId)).
					Set("Intents.$[i].Patterns.$[p].Entities.$[e].ModifiedBy", entity.ModifiedBy).
					Set("Intents.$[i].Patterns.$[p].Entities.$[e].ModifiedDate", DateTime.Now),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(entity.IntentId))),
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("p._id", _mongoDbHelperService.GetInternalId(entity.PatternId))),
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("e._id", _mongoDbHelperService.GetInternalId(entity.InternalId)))
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

		public async Task<bool> RemoveEntity(string botId, string intentId, string patternId, string entityId)
		{
			try
			{
				var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
					Project(b => new Bot()
					{
						Intents = b.Intents.Where(c => c.InternalId == _mongoDbHelperService.GetInternalId(intentId)).ToList()
					}).
					FirstOrDefaultAsync();

				var pattern = findFluent.Intents.FirstOrDefault()?.Patterns.FirstOrDefault(p => p.InternalId == _mongoDbHelperService.GetInternalId(patternId));
				var entity = pattern?.Entities.FirstOrDefault(p => p.InternalId == _mongoDbHelperService.GetInternalId(entityId));

				UpdateResult actionResult = await _context.Bots.UpdateOneAsync((x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)),
					Builders<Bot>.Update.Pull("Intents.$[i].Patterns.$[p].Entities", entity),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(intentId))),
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("p._id", _mongoDbHelperService.GetInternalId(patternId))),
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

		public async Task<List<EntityViewModel>> GetAllByPatternId(string botId, string intentId, string patternId)
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

				var pattern = findFluent.Intents.FirstOrDefault()?.Patterns.FirstOrDefault(p => p.InternalId == _mongoDbHelperService.GetInternalId(patternId));
				return _mapper.Map<List<Entity>, List<EntityViewModel>>(pattern.Entities);
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				throw;
			}
		}
	}
}
