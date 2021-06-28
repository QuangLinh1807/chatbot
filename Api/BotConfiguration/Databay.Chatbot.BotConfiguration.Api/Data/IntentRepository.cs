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
	public class IntentRepository : IIntentRepository
	{
		private readonly BotContext _context = null;
		private readonly IBotRepository _botRepository;
		private readonly IMapper _mapper;
		private readonly IMongoDbHelperService _mongoDbHelperService;

		public IntentRepository(IOptions<Settings> settings, IBotRepository botRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_botRepository = botRepository;
			_mapper = mapper;
			_mongoDbHelperService = mongoDbHelperService;
			_context = new BotContext(settings);
		}

		public async Task<IEnumerable<Intent>> GetAllIntents(string botId)
        {
            try
            {
                //return await _context.Intents.Find(_ => true).ToListAsync();

                var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
                    Project(b => new Bot()
                    {
                        Intents = b.Intents.ToList()
                    }).
                    SingleOrDefaultAsync();

                var intent = findFluent.Intents.ToList();
                return intent;
            }
            catch (Exception ex)
            {
                // log or manage the exception
                throw ex;
            }
            //return null;
        }

		public async Task<Intent> GetIntent(string botId, string intentId)
		{
			try
			{
				var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
					Project(b => new Bot()
					{
						Intents = b.Intents.Where(i => i.InternalId == _mongoDbHelperService.GetInternalId(intentId)).ToList()
					}).
					SingleOrDefaultAsync();

				var intent = findFluent.Intents.FirstOrDefault();
				return intent;
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				throw;
			}
		}

		public async Task<(bool, ObjectId)> AddIntent(IntentViewModel intent)
		{
			try
			{
                var newIntent = new Intent()
                {
                    InternalId = ObjectId.GenerateNewId(),
                    //InternalId = ObjectId.Parse(intent.InternalId),
                    Name = intent.Name,
                    Description = intent.Description,
                    CreatedBy = intent.CreatedBy
                };

                UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(intent.BotId),
					Builders<Bot>.Update.Push("Intents", newIntent),
					new UpdateOptions
					{
						IsUpsert = true
					});

				return (actionResult.IsAcknowledged
					   && actionResult.ModifiedCount > 0, newIntent.InternalId);
			}
			catch (Exception ex)
			{
                // log or manage the exception
                return (false, ObjectId.Empty);
            }
		}

		public async Task<bool> UpdateIntent(IntentViewModel intent)
		{
			try
			{
				UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(intent.BotId),
				Builders<Bot>.Update.
					Set("Intents.$[g].Name", intent.Name).
					Set("Intents.$[g].Description", intent.Description).
					Set("Intents.$[g].ModifiedBy", intent.ModifiedBy).
					Set("Intents.$[g].ModifiedDate", DateTime.Now),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("g._id", _mongoDbHelperService.GetInternalId(intent.InternalId))),
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

		public async Task<bool> RemoveIntent(string botId, string intentId)
		{
			var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
				Project(b => new Bot()
				{
					InternalId = b.InternalId,
					Intents = b.Intents.Where(i => i.InternalId == _mongoDbHelperService.GetInternalId(intentId)).ToList()
				}).
				SingleOrDefaultAsync();

			var intent = findFluent.Intents.FirstOrDefault();

			UpdateResult actionResult = await _context.Bots.UpdateOneAsync((x => x.InternalId == findFluent.InternalId),
				Builders<Bot>.Update.Pull("Intents", intent));

			return actionResult.IsAcknowledged
				   && actionResult.ModifiedCount > 0;
		}

		public async Task<(List<IntentViewModel>, int)> GetIntentsAsync(string botId, string keyword, string orderColumn, string sortColumnDirection, int pageIndex, int pageSize)
		{
			var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
				Project(b => new Bot()
				{
					InternalId = b.InternalId,
					Intents = b.Intents.Where(i => string.IsNullOrWhiteSpace(keyword) || (i.Name.Contains(keyword) || i.Description.Contains(keyword))).ToList()
				}).
				SingleOrDefaultAsync();

			var intent = findFluent.Intents.ToList();

			// order and filter
			var propertyInfo = typeof(Intent).GetProperty(orderColumn, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
			List<Intent> orderIntents;
			if (string.Equals(sortColumnDirection, "desc", StringComparison.CurrentCultureIgnoreCase))
			{
				orderIntents = intent.OrderByDescending(x => propertyInfo.GetValue(x, null)).Skip((pageIndex - 1) * pageSize)
					.Take(pageSize).ToList();
			}
			else
			{
				orderIntents = intent.OrderBy(x => propertyInfo.GetValue(x, null)).Skip((pageIndex - 1) * pageSize)
					.Take(pageSize).ToList();
			}
			
			// map model
			var map = _mapper.Map<List<Intent>, List<IntentViewModel>>(orderIntents);

			foreach (var orderIntent in map)
			{
				orderIntent.CountPattern = orderIntent.Patterns.Count;
				orderIntent.CountResponse = orderIntent.Responses.Count;
				orderIntent.Responses = null;

			}
			return (map.ToList(), intent.Count);
		}
	}
}
