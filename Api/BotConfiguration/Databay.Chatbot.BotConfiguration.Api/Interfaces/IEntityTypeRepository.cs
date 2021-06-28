using System.Collections.Generic;
using System.Threading.Tasks;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;
using MongoDB.Bson;

namespace Databay.Chatbot.BotConfiguration.Api.Interfaces
{
	public interface IEntityTypeRepository
	{
		Task<IEnumerable<EntityType>> GetAllEntityTypes(string botId);

		Task<EntityType> GetEntityType(string botId, string entityTypeId);

		// add new EntityType document
		Task<(bool, ObjectId)> AddEntityType(EntityTypeViewModel item);

		// full document update
		Task<bool> UpdateEntityType(EntityTypeViewModel entityType);

		Task<bool> RemoveEntityType(string botId, string entityTypeId);

		Task<(List<EntityTypeViewModel>, int)> GetEntityTypesAsync(string botId, string keyword, string orderColumn, int pageIndex,
			int pageSize);
	}
}
