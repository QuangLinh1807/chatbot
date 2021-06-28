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
    public class PatternRepository : IPatternRepository
    {
        private readonly BotContext _context = null;
        private readonly IBotRepository _botRepository;
        private readonly IMapper _mapper;
        private readonly IMongoDbHelperService _mongoDbHelperService;

        public PatternRepository(IOptions<Settings> settings, IBotRepository botRepository, IMapper mapper, IMongoDbHelperService mongoDbHelperService)
        {
            _botRepository = botRepository;
            _mapper = mapper;
            _mongoDbHelperService = mongoDbHelperService;
            _context = new BotContext(settings);
        }

        public async Task<IEnumerable<Pattern>> GetAllPatterns()
        {
            //try
            //{
            //	return await _context.Patterns.Find(_ => true).ToListAsync();
            //}
            //catch (Exception ex)
            //{
            //	// log or manage the exception
            //	throw ex;
            //}
            return null;
        }

        public async Task<Pattern> GetPattern(string botId, string intentId, string patternId)
        {
            try
            {
                var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
                    Project(b => new Bot()
                    {
                        Intents = b.Intents.Where(c => c.InternalId == _mongoDbHelperService.GetInternalId(intentId)).ToList()
                    }).
                    FirstOrDefaultAsync();

                var pattern = findFluent.Intents.FirstOrDefault()?.Patterns.FirstOrDefault(x => x.InternalId == _mongoDbHelperService.GetInternalId(patternId));
                return pattern;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<(bool, ObjectId)> AddPattern(PatternViewModel pattern)
        {
            try
            {
                var newPattern = new Pattern
                {
                    InternalId = ObjectId.GenerateNewId(),
                    TemplateSentence = pattern.TemplateSentence,
                    Description = pattern.Description,
                    IsCreated = pattern.IsCreated,
                    CreatedBy = pattern.CreatedBy
                };

                UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(pattern.BotId),
                    Builders<Bot>.Update.Push("Intents.$[i].Patterns", newPattern),
                    new UpdateOptions
                    {
                        ArrayFilters = new List<ArrayFilterDefinition>
                        {
                            new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(pattern.IntentId))),
                        },
                        IsUpsert = true
                    });
                return (actionResult.IsAcknowledged
                       && actionResult.ModifiedCount > 0, newPattern.InternalId);
            }
            catch (Exception ex)
            {
                // log or manage the exception
                return (false, ObjectId.Empty);
            }
        }

        public async Task<bool> UpdatePattern(PatternViewModel pattern)
        {
            try
            {
                UpdateResult actionResult = await _context.Bots.UpdateOneAsync(x => x.InternalId == _mongoDbHelperService.GetInternalId(pattern.BotId),
                Builders<Bot>.Update.
                    Set("Intents.$[i].Patterns.$[p].TemplateSentence", pattern.TemplateSentence).
                    Set("Intents.$[i].Patterns.$[p].Description", pattern.Description).
                    Set("Intents.$[i].Patterns.$[p].IsCreated", pattern.IsCreated).
                    Set("Intents.$[i].Patterns.$[p].ModifiedBy", pattern.ModifiedBy).
                    Set("Intents.$[i].Patterns.$[p].ModifiedDate", DateTime.Now),
                    new UpdateOptions
                    {
                        ArrayFilters = new List<ArrayFilterDefinition>
                        {
                            new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("i._id", _mongoDbHelperService.GetInternalId(pattern.IntentId))),
                            new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("p._id", _mongoDbHelperService.GetInternalId(pattern.InternalId))),
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

        public async Task<bool> RemovePattern(string botId, string intentId, string patternId)
        {
            try
            {
                var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
                    Project(b => new Bot()
                    {
                        Intents = b.Intents.Where(c => c.InternalId == _mongoDbHelperService.GetInternalId(intentId)).ToList()
                    }).
                    FirstOrDefaultAsync();

                var pattern = findFluent.Intents.FirstOrDefault()?.Patterns.FirstOrDefault(x => x.InternalId == _mongoDbHelperService.GetInternalId(patternId));

                UpdateResult actionResult = await _context.Bots.UpdateOneAsync((x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)),
                    Builders<Bot>.Update.Pull("Intents.$[i].Patterns", pattern),
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

        public async Task<(List<PatternViewModel>, int)> GetPatternsAsync(string botId, string keyword, string orderColumn, string sortColumnDirection, int pageIndex, int pageSize, bool isCreated)
        {
            var findFluent = await _context.Bots.Find(x => x.InternalId == _mongoDbHelperService.GetInternalId(botId)).
                Project(b => new Bot()
                {
                    InternalId = b.InternalId,
                    Intents = b.Intents.Where(i => i.Patterns.Any(p => p.IsCreated == isCreated && string.IsNullOrWhiteSpace(keyword) || (p.TemplateSentence.Contains(keyword) || p.Description.Contains(keyword)))).ToList()
                }).
                SingleOrDefaultAsync();

            var patterns = new List<Pattern>();
            foreach (var intent in findFluent.Intents)
            {
                var filterPatterns = intent.Patterns.Where(p => p.IsCreated == isCreated && string.IsNullOrWhiteSpace(keyword) || (p.TemplateSentence.Contains(keyword) || p.Description.Contains(keyword)));
                patterns.AddRange(filterPatterns);
            }

            // order and filter
            var propertyInfo = typeof(Pattern).GetProperty(orderColumn, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            List<Pattern> orderPatterns;
            if (string.Equals(sortColumnDirection, "desc", StringComparison.CurrentCultureIgnoreCase))
            {
                orderPatterns = patterns.OrderByDescending(x => propertyInfo.GetValue(x, null)).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            }
            else
            {
                orderPatterns = patterns.OrderBy(x => propertyInfo.GetValue(x, null)).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            }

            // map model
            var mapData = _mapper.Map<List<Pattern>, List<PatternViewModel>>(orderPatterns);
            foreach (var data in mapData)
            {
                var internalId = findFluent.Intents.FirstOrDefault(x => x.Patterns.Any(p => p.InternalId == _mongoDbHelperService.GetInternalId(data.InternalId)))?.InternalId;
                if (internalId != null)
                {
                    data.IntentId = internalId.ToString();
                }

                data.BotId = botId;
            }

            return (mapData.ToList(), patterns.Count);
        }
    }
}
