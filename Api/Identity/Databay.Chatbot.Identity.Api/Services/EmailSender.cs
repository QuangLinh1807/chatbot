// ***********************************************************************
// Assembly         : Buca.Golfy.Api.Identity
// Author           : thangnd
// Created          : 05-14-2018
//
// Last Modified By : thangnd
// Last Modified On : 05-14-2018
// ***********************************************************************
// <copyright file="EmailSender.cs" company="Buca.Golfy.Api.Identity">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Databay.Chatbot.Identity.Api.Services
{
    /// <summary>
    /// Class EmailSender.
    /// </summary>
    public class EmailSender : IEmailSender
    {
        /// <summary>
        /// Gets the options.
        /// </summary>
        /// <value>The options.</value>
        public AppSettings Options { get; } //set only via Secret Manager

        /// <summary>
        /// Initializes a new instance of the <see cref="EmailSender"/> class.
        /// </summary>
        /// <param name="optionsAccessor">The options accessor.</param>
        public EmailSender(IOptions<AppSettings> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }

        /// <summary>
        /// Sends the email asynchronous.
        /// </summary>
        /// <param name="email">The email.</param>
        /// <param name="subject">The subject.</param>
        /// <param name="message">The message.</param>
        /// <returns>Task.</returns>
        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Execute(Options.SendGridKey, subject, message, email);
        }

		/// <summary>
		/// Executes the specified API key.
		/// </summary>
		/// <param name="apiKey">The API key.</param>
		/// <param name="subject">The subject.</param>
		/// <param name="message">The message.</param>
		/// <param name="email">The email.</param>
		/// <returns>Task.</returns>
		public Task Execute(string apiKey, string subject, string message, string email)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                // should be a domain other than yahoo.com, outlook.com, hotmail.com, gmail.com
                From = new EmailAddress(Options.EmailSender, Options.EmailName),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message,
                TemplateId = Options.SendGridTemplate
            };
            msg.AddTo(new EmailAddress(email));
            //var response = await client.SendEmailAsync(msg);
            return client.SendEmailAsync(msg);
        }
    }
}