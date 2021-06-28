// ***********************************************************************
// Assembly         : Buca.SocialSecurity.Vocational.Domain.Core
// Author           : thangnd
// Created          : 08-25-2018
//
// Last Modified By : thangnd
// Last Modified On : 08-28-2018
// ***********************************************************************
// <copyright file="DomainEventRecord.cs" company="Buca.SocialSecurity.Vocational.Domain.Core">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;

namespace Databay.Chatbot.BotConfiguration.Domain.Core.Events
{
    /// <summary>
    /// Class DomainEventRecord.
    /// </summary>
    public class DomainEventRecord 
    {
        /// <summary>
        /// Gets or sets the created.
        /// </summary>
        /// <value>The created.</value>
        public DateTime Created { get; set; }

        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        /// <value>The type.</value>
        public string Type { get; set; }

        /// <summary>
        /// Gets or sets the correlation identifier.
        /// </summary>
        /// <value>The correlation identifier.</value>
        public Guid CorrelationId { get; set; }

        /// <summary>
        /// Gets or sets the content.
        /// </summary>
        /// <value>The content.</value>
        public string Content { get; set; }
    }
}
