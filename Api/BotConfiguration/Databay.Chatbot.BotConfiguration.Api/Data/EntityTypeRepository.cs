using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
	public class EntityTypeRepository : IEntityTypeRepository
	{
		private readonly BotContext _context = null;
		private readonly IBotRepository _botRepository;
		private readonly IMapper _mapper;
		private readonly IMongoDbHelperService _mongoDbHelperService;

		public EntityTypeRepository(IOptions<Settings> settings, IBotRepository botRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_botRepository = botRepository;
			_mapper = mapper;
			_mongoDbHelperService = mongoDbHelperService;
			_context = new BotContext(settings);
		}

		public async Task<IEnumerable<EntityType>> GetAllEntityTypes(string botId)
        {
            try
            {
                //return await _context.EntityTypes.Find(_ => true).ToListAsync();

                var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
                    Project(b => new Bot()
                    {
                        EntityTypes = b.EntityTypes.ToList()
                    }).
                    SingleOrDefaultAsync();

                var entityType = findFluent.EntityTypes;
                return entityType;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
            //return null;
		}

		public async Task<EntityType> GetEntityType(string botId, string entityTypeId)
		{
			try
			{
				var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
					Project(b => new Bot()
					{
						EntityTypes = b.EntityTypes.Where(i => i.InternalId == _mongoDbHelperService.GetInternalId(entityTypeId)).ToList()
					}).
					SingleOrDefaultAsync();

				var entityType = findFluent.EntityTypes.FirstOrDefault();
				return entityType;
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				throw;
			}
		}

		public async Task<(bool, ObjectId)> AddEntityType(EntityTypeViewModel entityType)
		{
			try
			{
                var newEntityType = new EntityType()
                {
                    InternalId = ObjectId.GenerateNewId(),
                    ExtractionMethod = entityType.ExtractionMethod,
                    Name = entityType.Name,
                    Description = entityType.Description,
                    CreatedBy = entityType.CreatedBy

                };
                UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(entityType.BotId),
					Builders<Bot>.Update.Push("EntityTypes", newEntityType),
					new UpdateOptions
					{
						IsUpsert = true
					});

				return (actionResult.IsAcknowledged
					   && actionResult.ModifiedCount > 0, newEntityType.InternalId);
			}
			catch (Exception ex)
			{
				// log or manage the exception
				return (false, ObjectId.Empty);
            }
		}

		public async Task<bool> UpdateEntityType(EntityTypeViewModel entityType)
		{
			try
			{
				UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(entityType.BotId),
				Builders<Bot>.Update.
					Set("EntityTypes.$[e].Name", entityType.Name).
					Set("EntityTypes.$[e].ExtractionMethod", entityType.ExtractionMethod).
					Set("EntityTypes.$[e].Description", entityType.Description).
					Set("EntityTypes.$[e].ModifiedBy", entityType.ModifiedBy).
					Set("EntityTypes.$[e].ModifiedDate", DateTime.Now),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("e._id", _mongoDbHelperService.GetInternalId(entityType.InternalId))),
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

		public async Task<bool> RemoveEntityType(string botId, string entityTypeId)
		{
			var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
				Project(b => new Bot()
				{
					InternalId = b.InternalId,
					EntityTypes = b.EntityTypes.Where(i => i.InternalId == _mongoDbHelperService.GetInternalId(entityTypeId)).ToList()
				}).
				SingleOrDefaultAsync();

			var entityType = findFluent.EntityTypes.FirstOrDefault();

			UpdateResult actionResult = await _context.Bots.UpdateOneAsync((x => x.InternalId == findFluent.InternalId),
				Builders<Bot>.Update.Pull("EntityTypes", entityType));

			return actionResult.IsAcknowledged
				   && actionResult.ModifiedCount > 0;
		}

		public async Task<(List<EntityTypeViewModel>, int)> GetEntityTypesAsync(string botId, string keyword, string orderColumn, int pageIndex,
			int pageSize)
		{
			var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
				Project(b => new Bot()
				{
					InternalId = b.InternalId,
					Intents = b.Intents,
					EntityTypes = b.EntityTypes.Where(i => string.IsNullOrWhiteSpace(keyword) || (i.Name.Contains(keyword) || i.Description.Contains(keyword))).ToList()
				}).
				SingleOrDefaultAsync();

			var entityType = findFluent.EntityTypes.ToList();

			// order and filter
			var propertyInfo = typeof(EntityType).GetProperty(orderColumn, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
			var orderEntityTypes = entityType.OrderBy(x => propertyInfo.GetValue(x, null)).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();

			var map = _mapper.Map<List<EntityType>, List<EntityTypeViewModel>>(orderEntityTypes);

			var patterns = findFluent.Intents.SelectMany(c => c.Patterns).ToList();
			foreach (var entityTypeViewModel in map)
			{
				// count pattern use this entityType
				
				foreach (var pattern in patterns)
				{
					if (pattern.Entities.Any(x => x.EntityTypeId == _mongoDbHelperService.GetInternalId(entityTypeViewModel.InternalId)))
					{
						entityTypeViewModel.CountPattern++;
					}
				}
			}
			return (map, entityType.Count);
		}
	}
}
