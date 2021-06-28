// ***********************************************************************
// Assembly         : Buca.Golfy.Api.Identity
// Author           : thangnd
// Created          : 05-14-2018
//
// Last Modified By : thangnd
// Last Modified On : 05-14-2018
// ***********************************************************************
// <copyright file="UrlHelperExtensions.cs" company="Buca.Golfy.Api.Identity">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using Microsoft.AspNetCore.Mvc;
using Databay.Chatbot.Identity.Api.Identity.Manage;
using Microsoft.AspNetCore.Cors;

namespace Databay.Chatbot.Identity.Api.Extenstions
{
    /// <summary>
    /// Class UrlHelperExtensions.
    /// </summary>
    //[EnableCors("CorsPolicy")]
    public static class UrlHelperExtensions
    {
        /// <summary>
        /// Emails the confirmation link.
        /// </summary>
        /// <param name="urlHelper">The URL helper.</param>
        /// <param name="userId">The user identifier.</param>
        /// <param name="code">The code.</param>
        /// <param name="scheme">The scheme.</param>
        /// <returns>System.String.</returns>
        public static string EmailConfirmationLink(this IUrlHelper urlHelper, string userId, string code, string scheme)
        {
            return urlHelper.Action(
               action: nameof(ManageController.ConfirmEmail),
               controller: "Manage",
               values: new { userId, code },
               protocol: scheme);
	        //return null;
        }

    }
}
