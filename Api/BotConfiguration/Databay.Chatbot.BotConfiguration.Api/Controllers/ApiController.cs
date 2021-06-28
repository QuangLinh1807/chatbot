using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Databay.Chatbot.BotConfiguration.Api.Controllers
{
	public class ApiController : ControllerBase
	{

		public ApiController()
		{

		}

		protected ObjectId UserId => new ObjectId(User.Claims.FirstOrDefault(x => x.Type == "sub")?.Value.ToString());

		protected new IActionResult Response(object result = null, bool ignoreJsonAttributes = false, int totalRecords = 0)
		{
			if (ModelState.Values.SelectMany(v => v.Errors).FirstOrDefault() == null)
			{
				var obj = (new
				{
					isSuccess = true,
					data = result,
					totalRecords = totalRecords
				});
				var serializeData = Serialize(obj, ignoreJsonAttributes);
				return Content(serializeData, "application/json");
			}

			return BadRequest(new
			{
				isSuccess = false,
				errors = ModelState.Values.SelectMany(v => v.Errors).FirstOrDefault()?.ErrorMessage
			});
		}

		public static string Serialize(object obj, bool includeEverything)
		{
			JsonSerializerSettings settings = new JsonSerializerSettings
			{
				Formatting = Formatting.Indented,
				ContractResolver = new CamelCasePropertyNamesContractResolver()
			};
			return JsonConvert.SerializeObject(obj, settings);
		}
	}
}