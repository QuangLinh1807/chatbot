using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Databay.Chatbot.Identity.Api.Identity.Helpers;
using Databay.Chatbot.Identity.Api.Identity.Interface;
using Databay.Chatbot.Identity.Api.Identity.Repository.Interfaces;
using Databay.Chatbot.Identity.Api.Models;
using Microsoft.AspNetCore.Identity.MongoDB;
using Newtonsoft.Json.Linq;

namespace Databay.Chatbot.Identity.Api.Identity.Providers
{
    public class FacebookAuthProvider<TUser> : IFacebookAuthProvider where TUser:IdentityUser , new()
    {
 
        private readonly IProviderRepository _providerRepository;
        private readonly HttpClient _httpClient;
        public FacebookAuthProvider(         
            IProviderRepository providerRepository,
            HttpClient httpClient
            )
        {        
            _providerRepository = providerRepository;
            _httpClient = httpClient;
        }

        public Provider Provider => _providerRepository.Get()
                                    .FirstOrDefault(x => x.Name.ToLower() == ProviderType.Facebook.ToString().ToLower());

        public JObject GetUserInfo(string accessToken)
        {
            if(Provider == null)
            {
                throw new ArgumentNullException(nameof(Provider));
            }

            var request = new Dictionary<string, string>();

            request.Add("fields", "id,email,name,gender,birthday");
            request.Add("access_token", accessToken);

            var result = _httpClient.GetAsync(Provider.UserInfoEndPoint + QueryBuilder.GetQuery(request, ProviderType.Facebook)).Result;
            if (result.IsSuccessStatusCode)
            {
                var infoObject = JObject.Parse(result.Content.ReadAsStringAsync().Result);
                return infoObject;
            }
            return null;
        }
    }
}