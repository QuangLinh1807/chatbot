using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Databay.Chatbot.Identity.Api.Base
{
    //[EnableCors("CorsPolicy")]
    public class ApiController : Controller
	{
		protected new IActionResult Response(object result = null, bool ignoreJsonAttributes = false)
		{
			if (ModelState.IsValid)
			{
				var obj = (new
				{
					isSuccess = true,
					data = result,
				});
				var serializeData = Serialize(obj, ignoreJsonAttributes);
				return Content(serializeData, "application/json");
			}

			return BadRequest(new
			{
				isSuccess = false,
				errors = ModelState.Keys
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