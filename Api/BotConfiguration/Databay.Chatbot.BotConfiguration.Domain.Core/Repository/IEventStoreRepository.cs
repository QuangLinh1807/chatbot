// ***********************************************************************
// Assembly         : FrederickNguyen.DomainLayer
// Author           : thangnd
// Created          : 07-11-2018
//
// Last Modified By : thangnd
// Last Modified On : 07-11-2018
// ***********************************************************************
// <copyright file="IDomainEventRepository.cs" company="FrederickNguyen.DomainLayer">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using Databay.Chatbot.BotConfiguration.Domain.Core.Events;

namespace Databay.Chatbot.BotConfiguration.Domain.Core.Repository
{
    /// <summary>
    /// Interface IDomainEventRepository
    /// </summary>
    public interface IEventStoreRepository
    {
        /// <summary>
        /// Adds the specified domain event.
        /// </summary>
        /// <typeparam name="TDomainEvent">The type of the t domain event.</typeparam>
        /// <param name="domainEvent">The domain event.</param>
        void Add<TDomainEvent>(TDomainEvent domainEvent) where TDomainEvent : DomainEvent;

        //IEnumerable<DomainEventRecord> FindAll();
    }
}
