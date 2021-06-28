using System.Collections.Generic;
using Databay.Chatbot.Identity.Api.Identity.Helpers;
using Databay.Chatbot.Identity.Api.Identity.Providers;
using Databay.Chatbot.Identity.Api.Identity.Repository.Interfaces;
using Databay.Chatbot.Identity.Api.Models;

namespace Databay.Chatbot.Identity.Api.Identity.Repository
{
    public class ProviderRepository : IProviderRepository
    {

        public  IEnumerable<Provider> Get()
        {
            return ProviderDataSource.GetProviders();
        }
    }
}
