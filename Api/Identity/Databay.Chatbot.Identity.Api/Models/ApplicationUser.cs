using Microsoft.AspNetCore.Identity.MongoDB;

namespace Databay.Chatbot.Identity.Api.Models
{
	public class ApplicationUser : IdentityUser
	{
		public int? BusinessField { get; set; }
		public int? Purpose { get; set; }
		public string DisplayName { get; set; }
		public string Token { get; set; }
	} 
}
