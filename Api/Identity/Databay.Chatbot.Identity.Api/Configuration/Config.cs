// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace Databay.Chatbot.Identity.Api.Configuration
{
    /// <summary>
    /// Create Sample / dummy resources, clients and users to enable test
    /// </summary>
    public class Config
    {
        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        /// <summary>
        /// List of Sample APIs
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
	            new ApiResource("chatbot.api.profile", "Chatbot service"),
	            new ApiResource("chatbot.api.configuration", "Chat bot configuration")
			};
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // client credentials client
            return new List<Client>
            {
                // resource owner password grant client
                new Client
                {
                    ClientId = "ro.client",
	                AllowedGrantTypes = new[] {GrantType.ResourceOwnerPassword},

					ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes = { "chatbot.api.profile", "chatbot.api.configuration" },
	                AllowOfflineAccess = true,
	                AllowAccessTokensViaBrowser = true,
	                AccessTokenType = AccessTokenType.Jwt,
	                AlwaysIncludeUserClaimsInIdToken = true,
	                AccessTokenLifetime = 86400,
	                //AllowOfflineAccess = true,
	                IdentityTokenLifetime = 86400,
	                AlwaysSendClientClaims = true,
	                Enabled = true,
				}
            };
        }

	    public static List<TestUser> GetSampleUsers()
	    {
		    return new List<TestUser>
		    {
			    new TestUser
			    {
				    SubjectId = "818728",
				    Username = "dangtohai1510@gmail.com",
				    Password = "Dunghoi1@",
				    Claims = new List<Claim>
				    {
				    }
			    }
		    };
	    }
	}
}