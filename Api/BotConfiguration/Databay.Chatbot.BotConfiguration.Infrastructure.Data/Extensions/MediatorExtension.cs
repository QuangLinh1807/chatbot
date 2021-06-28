// ***********************************************************************
// Assembly         : Databay.Chatbot.BotConfiguration.Infrastructure.Data
// Author           : thangnd
// Created          : 05-29-2019
//
// Last Modified By : thangnd
// Last Modified On : 05-29-2019
// ***********************************************************************
// <copyright file="MediatorExtension.cs" company="Databay.Chatbot.BotConfiguration.Infrastructure.Data">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.Linq;
using System.Threading.Tasks;
using Databay.Chatbot.BotConfiguration.Domain.Core.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Databay.Chatbot.BotConfiguration.Infrastructure.Data.Extensions
{
    /// <summary>
    /// Class MediatorExtension.
    /// </summary>
    static class MediatorExtension
    {
        /// <summary>
        /// dispatch domain events as an asynchronous operation.
        /// </summary>
        /// <param name="mediator">The mediator.</param>
        /// <param name="ctx">The CTX.</param>
        /// <returns>Task.</returns>
        public static async Task DispatchDomainEventsAsync(this IMediator mediator, DbContext ctx)
        {
            var domainEntities = ctx.ChangeTracker
                  .Entries<Entity>()
                  .Where(x => x.Entity.DomainEvents != null && x.Entity.DomainEvents.Any());

            var domainEvents = domainEntities.SelectMany(x => x.Entity.DomainEvents).ToList();
            domainEntities.ToList().ForEach(entity => entity.Entity.DomainEvents.Clear());

            var tasks = domainEvents.Select(async (domainEvent) =>
            {
                await mediator.Publish(domainEvent);
            });

            await Task.WhenAll(tasks);
        }
    }
}
