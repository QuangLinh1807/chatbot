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
	public class ResponseDetailRepository : IResponseDetailRepository
	{
		private readonly BotContext _context = null;
		private readonly IBotRepository _botRepository;
		private readonly IMapper _mapper;
		private readonly IMongoDbHelperService _mongoDbHelperService;

		public ResponseDetailRepository(IOptions<Settings> settings, IBotRepository botRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
		{
			_botRepository = botRepository;
			_mapper = mapper;
			_mongoDbHelperService = mongoDbHelperService;
			_context = new BotContext(settings);
		}

		public async Task<ResponseDetail> GetResponseDetail(string botId, string intentId, string responseId, string responseDetailId)
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

				var response = findFluent.Intents.FirstOrDefault()?.Responses.FirstOrDefault(p => p.InternalId == _mongoDbHelperService.GetInternalId(responseId));
				var responseDetail = response?.ResponseDetails.FirstOrDefault(p => p.InternalId== _mongoDbHelperService.GetInternalId(responseDetailId));
				return responseDetail;
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				throw;
			}
		}

		public async Task<bool> AddResponseDetail(ResponseDetailViewModel responseDetail)
		{
			try
			{
				UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(responseDetail.BotId),
					Builders<Bot>.Update.Push("Intents.$[i].Responses.$[r].ResponseDetails", new ResponseDetail()
					{
						InternalId = ObjectId.GenerateNewId(),
						Text = responseDetail.Text,
						ImageUrl =  responseDetail.ImageUrl,
						Type = responseDetail.Type,
						CreatedBy = responseDetail.CreatedBy
					}),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(responseDetail.IntentId))),
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("r._id", _mongoDbHelperService.GetInternalId(responseDetail.ResponseId))),
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

		public async Task<bool> UpdateResponseDetail(ResponseDetailViewModel responseDetail)
		{
			try
			{
				UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(responseDetail.BotId),
				Builders<Bot>.Update.
					Set("Intents.$[i].Responses.$[r].ResponseDetails.$[d].Type", responseDetail.Type).
					Set("Intents.$[i].Responses.$[r].ResponseDetails.$[d].Text", responseDetail.Text).
					Set("Intents.$[i].Responses.$[r].ResponseDetails.$[d].ImageUrl", responseDetail.ImageUrl).
					Set("Intents.$[i].Responses.$[r].ResponseDetails.$[d].ModifiedBy", responseDetail.ModifiedBy).
					Set("Intents.$[i].Responses.$[r].ResponseDetails.$[d].ModifiedDate", DateTime.Now),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(responseDetail.IntentId))),
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("r._id", _mongoDbHelperService.GetInternalId(responseDetail.ResponseId))),
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("d._id", _mongoDbHelperService.GetInternalId(responseDetail.InternalId)))
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

		public async Task<bool> RemoveResponseDetail(string botId, string intentId, string responseId, string responseDetailId)
		{
			try
			{
				var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
					Project(b => new Bot()
					{
						Intents = b.Intents.Where(c => c.InternalId == _mongoDbHelperService.GetInternalId(intentId)).ToList()
					}).
					FirstOrDefaultAsync();

				var response = findFluent.Intents.FirstOrDefault()?.Responses.FirstOrDefault(p => p.InternalId == _mongoDbHelperService.GetInternalId(responseId));
				var responseDetail = response?.ResponseDetails.FirstOrDefault(p => p.InternalId == _mongoDbHelperService.GetInternalId(responseDetailId));

				UpdateResult actionResult = await _context.Bots.UpdateOneAsync((x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)),
					Builders<Bot>.Update.Pull("Intents.$[i].Responses.$[r].ResponseDetails", responseDetail),
					new UpdateOptions
					{
						ArrayFilters = new List<ArrayFilterDefinition>
						{
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(intentId))),
							new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("r._id", _mongoDbHelperService.GetInternalId(responseId))),
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

		public Task<ResponseDetailViewModel> GetAllByResponseId(string botId, string intentId, string responseId)
		{
			return null;
		}
	}
}
