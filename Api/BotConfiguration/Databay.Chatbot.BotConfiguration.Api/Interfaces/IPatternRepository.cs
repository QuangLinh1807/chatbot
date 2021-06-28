using System.Collections.Generic;
using System.Threading.Tasks;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;
using MongoDB.Bson;

namespace Databay.Chatbot.BotConfiguration.Api.Interfaces
{
	public interface IPatternRepository
	{
		Task<IEnumerable<Pattern>> GetAllPatterns();

		Task<Pattern> GetPattern(string botId, string intentId, string patternId);

		// add new Pattern document
		Task<(bool, ObjectId)> AddPattern(PatternViewModel item);

		// full document update
		Task<bool> UpdatePattern(PatternViewModel pattern);

		Task<bool> RemovePattern(string botId, string intentId, string patternId);
		Task<(List<PatternViewModel>, int)> GetPatternsAsync(string botId, string keyword, string orderColumn, string sortColumnDirection, int pageIndex, int pageSize, bool isCreated);
	}
}
