using Databay.Chatbot.Identity.Api.Identity.Providers;
using Databay.Chatbot.Identity.Api.Models;

namespace Databay.Chatbot.Identity.Api.Identity.Interface
{
    public interface IGoogleAuthProvider:IExternalAuthProvider
    {
        Provider Provider { get; }
    }
}
