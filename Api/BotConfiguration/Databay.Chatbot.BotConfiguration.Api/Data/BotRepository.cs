using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
	public class BotRepository : IBotRepository
	{
		private readonly BotContext _context = null;
		private readonly IMongoDbHelperService _mongoDbHelperService;
		public BotRepository(IOptions<Settings> settings, IMongoDbHelperService mongoDbHelperService)
		{
			_mongoDbHelperService = mongoDbHelperService;
			_context = new BotContext(settings);
		}

		public async Task<IEnumerable<Bot>> GetAllBots()
		{
			try
			{
				return await _context.Bots.Find(_ => true).ToListAsync();
			}
			catch (Exception ex)
			{
				// log or manage the exception
				throw ex;
			}
		}

		public async Task<Bot> GetBot(string id)
		{
			try
			{
				return await _context.Bots
								.Find(bot => bot.InternalId == _mongoDbHelperService.GetInternalId(id))
								.FirstOrDefaultAsync();
			}
			catch (Exception ex)
			{
				// log or manage the exception
				throw ex;
			}
		}

		// Try to convert the Id to a BSonId value
		private ObjectId GetInternalId(string id)
		{
			if (!ObjectId.TryParse(id, out ObjectId internalId))
				internalId = ObjectId.Empty;

			return internalId;
		}

		public async Task AddBot(Bot item)
		{
			try
			{
				await _context.Bots.InsertOneAsync(item);
			}
			catch (Exception ex)
			{
				// log or manage the exception
				throw ex;
			}
		}

		public async Task<bool> RemoveBot(ObjectId id)
		{
			try
			{
				DeleteResult actionResult = await _context.Bots.DeleteOneAsync(Builders<Bot>.Filter.Eq("_id", id));
				return actionResult.IsAcknowledged
					&& actionResult.DeletedCount > 0;
			}
			catch (Exception ex)
			{
				// log or manage the exception
				throw ex;
			}
		}

		// Demo function - full document update
		public async Task<bool> UpdateBot(BotViewModel bot)
		{
			try
			{
				var currentBot = await GetBot(bot.InternalId) ?? new Bot()
				{
					InternalId = ObjectId.GenerateNewId(),
					CreatedDate = DateTime.Now,
					CreatedBy = bot.ModifiedBy
				};
				currentBot.Name = bot.Name;
				currentBot.Description = bot.Description;
				currentBot.ModifiedBy = bot.ModifiedBy;
				currentBot.ModifiedDate = DateTime.Now;

				ReplaceOneResult actionResult = await _context.Bots.ReplaceOneAsync(n => n.InternalId == currentBot.InternalId, currentBot, new UpdateOptions { IsUpsert = true });
				return actionResult.IsAcknowledged && actionResult.ModifiedCount > 0;
			}
			catch (Exception ex)
			{
				// log or manage the exception
				throw ex;
			}
		}

		// it creates a sample compound index (first using UserId, and then Body)
		// 
		// MongoDb automatically detects if the index already exists - in this case it just returns the index details
		public async Task<string> CreateIndex()
		{
			try
			{
				IndexKeysDefinition<Bot> keys = Builders<Bot>
													.IndexKeys
													.Ascending(item => item.Name);

				return await _context.Bots
								.Indexes.CreateOneAsync(new CreateIndexModel<Bot>(keys));
			}
			catch (Exception ex)
			{
				// log or manage the exception
				throw ex;
			}
		}

		public async Task<IEnumerable<Bot>> GetAllByUserId(ObjectId userId)
		{
			try
			{
				return await _context.Bots.Find(x => x.CreatedBy == userId).ToListAsync();
			}
			catch (Exception ex)
			{
				// log or manage the exception
				throw ex;
			}
		}
	}
}
