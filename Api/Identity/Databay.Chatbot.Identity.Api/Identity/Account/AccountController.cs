using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Databay.Chatbot.Identity.Api.Base;
using Databay.Chatbot.Identity.Api.Configuration;
using Databay.Chatbot.Identity.Api.Extenstions;
using Databay.Chatbot.Identity.Api.Models;
using Databay.Chatbot.Identity.Api.Services;
using IdentityModel;
using IdentityModel.Client;
using IdentityServer4;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.MongoDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Databay.Chatbot.Identity.Api.Identity.Account
{
    /// <summary>
    /// This sample controller implements a typical login/logout/provision workflow for local and external accounts.
    /// The login service encapsulates the interactions with the user data store. This data store is in-memory only and cannot be used for production!
    /// The interaction service provides a way for the UI to communicate with identityserver for validation and context retrieval
    /// </summary>
    [SecurityHeaders]
    [Produces("application/json")]
    [Route("api/Account")]
	public class AccountController : ApiController
    {
        private readonly IIdentityServerInteractionService _interaction;

        //Asp Identity Classes
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
	    private readonly IOptions<ConfigurationOptions> _optionsAccessor;
	    private readonly IEmailSender _emailSender;

        public AccountController(
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IHttpContextAccessor httpContextAccessor,
            UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ConfigurationOptions> optionsAccessor, IEmailSender emailSender)
        {
            // if the TestUserStore is not in DI, then we'll just use the global users collection
            _signInManager = signInManager;
	        _optionsAccessor = optionsAccessor;
	        _emailSender = emailSender;
	        _userManager = userManager;

            _interaction = interaction;
        }

		/// <summary>
		/// Logins the specified model.
		/// </summary>
		/// <param name="model">The model.</param>
		/// <returns>Task&lt;IActionResult&gt;.</returns>
		[HttpPost("Login")]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody] LoginViewModel model)
		{
			if (!ModelState.IsValid) return Response();

			var result =
				await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberLogin,
					false);

			if (result.IsLockedOut)
			{
				ModelState.AddModelError("AccountLocked", "User account locked out");
			}

			if (result.IsNotAllowed)
			{
				ModelState.AddModelError("ConfirmedEmail", "User cannot sign in without a confirmed email");
			}

			if (!result.Succeeded)
			{
				ModelState.AddModelError("InvalidLogin", "Invalid login attempt");
			}

			var user = await _userManager.FindByNameAsync(model.Email);

			// request token
			var identityUrl = _optionsAccessor.Value.IdentityUrl;
			var client = new DiscoveryClient(identityUrl) { Policy = { RequireHttps = false } };
			var disco = await client.GetAsync();
			var tokenClient = new TokenClient(disco.TokenEndpoint, model.ClientId, model.ClientSecret);
			var response = await tokenClient.RequestResourceOwnerPasswordAsync(model.Email, model.Password, model.Scope);
			user.Token = response.AccessToken;

			// return user
			return Response(user);
		}

		/// <summary>
		/// Registers the specified model.
		/// </summary>
		/// <param name="model">The model.</param>
		/// <returns>Task&lt;IActionResult&gt;.</returns>
		[HttpPost("Register")]
		[AllowAnonymous]
        //[EnableCors("CorsPolicy")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
		{
			if (!ModelState.IsValid) return BadRequest(new { IsSuccessStatusCode = false, Errors = ModelState });

			var user = new ApplicationUser()
			{
				UserName = model.Email,
				LockoutEnabled = false,
				EmailConfirmed = false,
				Email = model.Email,
				NormalizedEmail = model.Email,
				PhoneNumber = model.PhoneNumber,
				BusinessField = model.BusinessField,
				Purpose = model.Purpose,
				DisplayName = model.DisplayName
			};

			var result = await _userManager.CreateAsync(user, model.Password);
			//create user success and email to new user
			if (!result.Succeeded)
			{
				// If we got an error, Make sure to drop all collections from Mongo before trying again. Otherwise sample users will NO5T be populated
				AddErrors(result);
				return Response();
			}
            //user.LockoutEnabled = false;
            //_logger.LogInformation("User created a new account with password.");
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
            await _emailSender.SendEmailConfirmationAsync(model.Email, model.DisplayName, callbackUrl);

            return Response(model);
		}

        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<IActionResult> ConfirmEmail(string userId, string code)
        //{
        //    if (userId == null || code == null)
        //    {
        //        //return RedirectToAction(nameof(HomeController.Index), "Home");
        //        return Redirect(_optionsAccessor.Value.BackendUrl);
        //    }
        //    var user = await _userManager.FindByIdAsync(userId);
        //    if (user == null)
        //    {
        //        //throw new ApplicationException($"Unable to load user with ID '{userId}'.");
        //    }
        //    var result = await _userManager.ConfirmEmailAsync(user, code);
        //    if (result.Succeeded)
        //        return Redirect(_optionsAccessor.Value.BackendUrl);
        //    return View("Error");
        //}


        /// <summary>
        /// Adds the errors.
        /// </summary>
        /// <param name="result">The result.</param>
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
        }
    }
}