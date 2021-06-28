using System.Collections.Generic;
using Databay.Chatbot.Identity.Api.Identity.Providers;
using Databay.Chatbot.Identity.Api.Models;

namespace Databay.Chatbot.Identity.Api.Identity.Repository.Interfaces
{
    public interface IProviderRepository
    {
        IEnumerable<Provider> Get();
    }
}
