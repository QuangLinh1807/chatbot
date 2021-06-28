﻿using System;
using System.Threading.Tasks;
using Databay.Chatbot.Identity.Api.Identity.Interface.Processors;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.MongoDB;
using Newtonsoft.Json.Linq;

namespace Databay.Chatbot.Identity.Api.Identity.Processors
{
    public class EmailUserProcessor<TUser> : IEmailUserProcessor where TUser: IdentityUser,new()
    {        
        private readonly UserManager<TUser> _userManager;
        public EmailUserProcessor(            
            UserManager<TUser> userManager
            )
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }
        public async Task<GrantValidationResult> ProcessAsync(JObject userInfo,string email,string provider)
        {
            var userEmail = email;
            var userExternalId = userInfo.Value<string>("id");

           

            if (string.IsNullOrWhiteSpace(userExternalId))
            {
                return new GrantValidationResult(TokenRequestErrors.InvalidRequest, "could not retrieve user Id from the token provided");
            }

            var existingUser = _userManager.FindByEmailAsync(userEmail).Result;
            if(existingUser != null)
            {
                return new GrantValidationResult(TokenRequestErrors.InvalidRequest, "User with specified email already exists");

            }

            var newUser = new TUser { Email = userEmail ,UserName = userEmail};
            var result =  _userManager.CreateAsync(newUser).Result;
            if (result.Succeeded)
            {                
                await _userManager.AddLoginAsync(newUser, new UserLoginInfo(provider, userExternalId, provider));
                var userClaims = _userManager.GetClaimsAsync(newUser).Result;
                return new GrantValidationResult(newUser.Id, provider, userClaims, provider, null);
            }
            return new GrantValidationResult(TokenRequestErrors.InvalidRequest, "could not create user , please try again.");
        }
    }
}
