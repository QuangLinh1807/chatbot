// ***********************************************************************
// Assembly         : Buca.Golf.Api.Authentication
// Author           : thangnd
// Created          : 05-16-2018
//
// Last Modified By : thangnd
// Last Modified On : 05-16-2018
// ***********************************************************************
// <copyright file="ManageController.cs" company="Buca.Golf.Api.Authentication">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;
using System.Threading.Tasks;
using Databay.Chatbot.Identity.Api.Configuration;
//using Buca.Golf.Api.Authentication.Extensions;
//using Buca.Golf.Api.Authentication.Models;
//using Buca.Golf.Api.Authentication.Models.AccountViewModels;
//using Buca.Golf.Api.Authentication.Services;
using Databay.Chatbot.Identity.Api.Extenstions;
using Databay.Chatbot.Identity.Api.Identity.Home;
using Databay.Chatbot.Identity.Api.Models;
using Databay.Chatbot.Identity.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Databay.Chatbot.Identity.Api.Identity.Manage
{
    /// <summary>
    /// Class ManageController.
    /// </summary>
    [Route("[controller]/[action]")]
    public class ManageController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly IOptions<ConfigurationOptions> _optionsAccessor;

        /// <summary>
        /// Initializes a new instance of the <see cref="ManageController" /> class.
        /// </summary>
        /// <param name="userManager">The user manager.</param>
        public ManageController(UserManager<ApplicationUser> userManager, IEmailSender emailSender, IOptions<ConfigurationOptions> optionsAccessor)
        {
            _userManager = userManager;
            _emailSender = emailSender;
            _optionsAccessor = optionsAccessor;
        }

        /// <summary>
        /// Confirms the email.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="code">The code.</param>
        /// <returns>Task&lt;IActionResult&gt;.</returns>
        /// <exception cref="ApplicationException"></exception>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            //if (userId == null || code == null)
            //{
            //    return RedirectToAction(nameof(HomeController.Index), "Home");
            //}
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                //throw new ApplicationException($"Unable to load user with ID '{userId}'.");
                throw new InvalidOperationException($"Unable to load user with ID '{userId}'.");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            //if (!result.Succeeded)
            //{
            //    AddErrors(result);
            //    return Response();
            //}

            // send mail welcome to user
            //await _emailSender.SendMailWelcome(user.Email, user.DisplayName);

            //return View(result.Succeeded ? "ConfirmEmail" : "Error");

            return new RedirectResult(_optionsAccessor.Value.HomepageUrl);
        }

        ///// <summary>
        ///// Resets the password.
        ///// </summary>
        ///// <param name="code">The code.</param>
        ///// <returns>IActionResult.</returns>
        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult ResetPassword(string code = null)
        //{
        //    return code == null ? View("Error") : View();
        //}

        ///// <summary>
        ///// Resets the password.
        ///// </summary>
        ///// <param name="model">The model.</param>
        ///// <returns>Task&lt;IActionResult&gt;.</returns>
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View(model);
        //    }
        //    var user = await _userManager.FindByNameAsync(model.Email);
        //    if (user == null)
        //    {
        //        // Don't reveal that the user does not exist
        //        return RedirectToAction(nameof(ResetPasswordConfirmation), "Manage");
        //    }
        //    var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
        //    if (result.Succeeded)
        //    {
        //        return RedirectToAction(nameof(ResetPasswordConfirmation), "Manage");
        //    }
        //    AddErrors(result);
        //    return View();
        //}

        ///// <summary>
        ///// Resets the password confirmation.
        ///// </summary>
        ///// <returns>IActionResult.</returns>
        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult ResetPasswordConfirmation()
        //{
        //    return View();
        //}

        ///// <summary>
        ///// Resets the password.
        ///// </summary>
        ///// <param name="code">The code.</param>
        ///// <returns>IActionResult.</returns>
        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult ChangeEmail(string oldEmail, string code)
        //{
        //    return code == null ? View("Error") : View();
        //}

        ///// <summary>
        ///// Resets the password.
        ///// </summary>
        ///// <param name="model">The model.</param>
        ///// <returns>Task&lt;IActionResult&gt;.</returns>
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> ChangeEmail(ChangeEmailViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View(model);
        //    }
        //    var user = await _userManager.FindByNameAsync(model.OldEmail);
        //    if (user == null)
        //    {
        //        // Don't reveal that the user does not exist
        //        return RedirectToAction(nameof(ChangeEmailConfirmation), "Manage");
        //    }

        //    user.UserName = model.NewEmail;

        //    var resultChangeEmail = await _userManager.ChangeEmailAsync(user, model.NewEmail, model.Code);
        //    if (resultChangeEmail.Succeeded)
        //    {
        //        var resultChangeUserName = await _userManager.UpdateAsync(user);
        //        if (resultChangeUserName.Succeeded)
        //        {
        //            return RedirectToAction(nameof(ChangeEmailConfirmation), "Manage");
        //        }
        //        AddErrors(resultChangeEmail);
        //        AddErrors(resultChangeUserName);
        //    }

        //    return View();
        //}

        ///// <summary>
        ///// Resets the password confirmation.
        ///// </summary>
        ///// <returns>IActionResult.</returns>
        //[HttpGet]
        //[AllowAnonymous]
        //public IActionResult ChangeEmailConfirmation()
        //{
        //    return View();
        //}

        #region Helpers

        /// <summary>
        /// Adds the errors.
        /// </summary>
        /// <param name="result">The result.</param>
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        #endregion
    }
}