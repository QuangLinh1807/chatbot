using System.Collections.Generic;
using System.Threading.Tasks;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;

namespace Databay.Chatbot.BotConfiguration.Api.Interfaces
{
	public interface IEntityRepository
	{
		Task<IEnumerable<Entity>> GetAllEntities();

		Task<Entity> GetEntity(string botId, string intentId, string entityId, string entityId1);

		// add new Entity document
		Task<bool> AddEntity(EntityViewModel item);

		// full document update
		Task<bool> UpdateEntity(EntityViewModel entity);

		Task<bool> RemoveEntity(string botId, string intentId, string entityId, string entityId1);
		Task<List<EntityViewModel>> GetAllByPatternId(string botId, string intentId, string patternId);
	}
}
