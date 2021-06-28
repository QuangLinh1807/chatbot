// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.ComponentModel.DataAnnotations;

namespace Databay.Chatbot.Identity.Api.Identity.Account
{
	public class RegisterViewModel
	{
		/// <summary>
		/// Gets or sets the email.
		/// </summary>
		/// <value>The email.</value>
		[Required]
		[EmailAddress]
		[Display(Name = "Email")]
		public string Email { get; set; }

		/// <summary>
		/// Gets or sets the password.
		/// </summary>
		/// <value>The password.</value>
		[Required]
		[DataType(DataType.Password)]
		[Display(Name = "Password")]
		public string Password { get; set; }

		/// <summary>
		/// Gets or sets the phone number.
		/// </summary>
		/// <value>The phone number.</value>
		[Display(Name = "PhoneNumber")]
		[DataType(DataType.PhoneNumber)]
		[Required]
		public string PhoneNumber { get; set; }

		public int? BusinessField { get; set; }
		public int? Purpose { get; set; }
		public string DisplayName { get; set; }
	}
}