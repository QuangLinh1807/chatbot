using System.Collections.Generic;
using Databay.Chatbot.Identity.Api.Identity.Providers;
using Databay.Chatbot.Identity.Api.Models;

namespace Databay.Chatbot.Identity.Api.Identity.Helpers
{
    public class ProviderDataSource
    {
        public static IEnumerable<Provider> GetProviders()
        {
            return new List<Provider>
            {
                new Provider
                {
                    ProviderId = 1,
                    Name = "Facebook",
                    UserInfoEndPoint = "https://graph.facebook.com/v2.8/me"
                },
                new Provider
                {
                    ProviderId = 2,
                    Name = "Google",
                    UserInfoEndPoint = "https://www.googleapis.com/oauth2/v2/userinfo"
                },
                 new Provider
                {
                    ProviderId = 3,
                    Name = "Twitter",
                    UserInfoEndPoint = "https://api.twitter.com/1.1/account/verify_credentials.json"
                },
                 new Provider
                 {
                     ProviderId = 4,
                     Name="LinkedIn",
                     UserInfoEndPoint = "https://api.linkedin.com/v1/people/~:(id,email-address,first-name,last-name,location,industry,picture-url)?"
                 },
                 new Provider
                 {
                     ProviderId = 5,
                     Name = "GitHub",
                     UserInfoEndPoint = "https://api.github.com/user"
                 }
            };
        }
    }
}
