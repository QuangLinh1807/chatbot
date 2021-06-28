// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.Collections.Generic;
using System.Linq;

namespace Databay.Chatbot.Identity.Api.Identity.Account
{
    public class LoginViewModel : LoginInputModel
    {
	    public string Scope { get; set; }
	    public string ClientId { get; set; }
	    public string ClientSecret { get; set; }
    }
}