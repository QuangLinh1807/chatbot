using Newtonsoft.Json.Linq;

namespace Databay.Chatbot.Identity.Api.Identity.Interface
{
    public interface IExternalAuthProvider
    {
        JObject GetUserInfo(string accessToken);
    }
}
