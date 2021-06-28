// ***********************************************************************
// Assembly         : FrederickNguyen.Infrastructure
// Author           : thangnd
// Created          : 06-21-2018
//
// Last Modified By : thangnd
// Last Modified On : 06-21-2018
// ***********************************************************************
// <copyright file="UnitOfWork.cs" company="FrederickNguyen.Infrastructure">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System;
using System.Threading;
using System.Threading.Tasks;
using Databay.Chatbot.BotConfiguration.Domain.Core.UnitOfWork;
using Databay.Chatbot.BotConfiguration.Infrastructure.Data.Context;
using Databay.Chatbot.BotConfiguration.Infrastructure.Data.Extensions;
using MediatR;

namespace Databay.Chatbot.BotConfiguration.Infrastructure.Data.UoW
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ChatboxContext _chatboxContext;
        private bool _disposed;
        private readonly IMediator _mediator;

        /// <summary>
        /// Initializes a new instance of the <see cref="UnitOfWork" /> class.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="mediator">The mediator.</param>
        public UnitOfWork(ChatboxContext context, IMediator mediator)
        {
            _chatboxContext = context;
            _mediator = mediator;
        }

        /// <summary>
        /// Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
        /// </summary>
        /// <exception cref="System.NotImplementedException"></exception>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (_disposed) return;
            if (disposing) _chatboxContext?.Dispose();

            _disposed = true;
        }

        /// <summary>
        /// Commits this instance.
        /// </summary>
        /// <exception cref="System.NotImplementedException"></exception>
        public int Commit()
        {
            if (_disposed) throw new ObjectDisposedException(GetType().FullName);
            return _chatboxContext.SaveChanges();
        }

        /// <summary>
        /// Commits the asynchronous.
        /// </summary>
        /// <param name="cancellationToken">The cancellation token.</param>
        /// <returns>Task&lt;System.Boolean&gt;.</returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<bool> CommitAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            // Dispatch Domain Events collection. 
            // Choices:
            // A) Right BEFORE committing data (EF SaveChanges) into the DB will make a single transaction including  
            // side effects from the domain event handlers which are using the same DbContext with "InstancePerLifetimeScope" or "scoped" lifetime
            // B) Right AFTER committing data (EF SaveChanges) into the DB will make multiple transactions. 
            // You will need to handle eventual consistency and compensatory actions in case of failures in any of the Handlers. 
            await _mediator.DispatchDomainEventsAsync(_chatboxContext);

            // After executing this line all the changes (from the Command Handler and Domain Event Handlers) 
            // performed throught the DbContext will be commited
            var result = await _chatboxContext.SaveChangesAsync(cancellationToken);

            return result >= 1;
        }

        /// <summary>
        /// Rollbacks this instance.
        /// </summary>
        /// <exception cref="System.NotImplementedException"></exception>
        public void Rollback()
        {
            Dispose();
        }
    }
}
