using AutoMapper;
using Databay.Chatbot.BotConfiguration.Api.Model;
using Databay.Chatbot.BotConfiguration.Api.ViewModel;

namespace Databay.Chatbot.BotConfiguration.Api.Mapper
{
	public class Mapper: Profile
	{
		public Mapper()
		{
			CreateMap<IntentViewModel, Intent>();
			CreateMap<BotViewModel, Bot>();

			CreateMap<Intent, IntentViewModel>();
			CreateMap<Bot, BotViewModel>();
			CreateMap<EntityType, EntityTypeViewModel>();
			CreateMap<Pattern, PatternViewModel>();
			CreateMap<Entity, EntityViewModel>();
			CreateMap<Response, ResponseViewModel>();
		}
	}
}
