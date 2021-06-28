using System.Threading.Tasks;
using IdentityServer4.Validation;
using Newtonsoft.Json.Linq;

namespace Databay.Chatbot.Identity.Api.Identity.Interface.Processors
{
    public interface IEmailUserProcessor
    {
        Task<GrantValidationResult> ProcessAsync(JObject userInfo,string email, string provider);
    }
}
