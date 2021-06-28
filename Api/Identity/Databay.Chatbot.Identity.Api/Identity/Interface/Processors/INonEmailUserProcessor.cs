using System.Threading.Tasks;
using IdentityServer4.Validation;
using Newtonsoft.Json.Linq;

namespace Databay.Chatbot.Identity.Api.Identity.Interface.Processors
{
    public interface INonEmailUserProcessor
    {
        Task<GrantValidationResult> ProcessAsync(JObject userInfo,string provider);
    }
}
