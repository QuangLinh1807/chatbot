// ***********************************************************************
// Assembly         : FrederickNguyen.DomainCore
// Author           : thangnd
// Created          : 06-20-2018
//
// Last Modified By : thangnd
// Last Modified On : 06-20-2018
// ***********************************************************************
// <copyright file="IRepository.cs" company="FrederickNguyen.DomainCore">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.Collections.Generic;
using Databay.Chatbot.BotConfiguration.Domain.Core.Models;
using Databay.Chatbot.BotConfiguration.Domain.Core.Specification;

namespace Databay.Chatbot.BotConfiguration.Domain.Core.Repository
{
    /// <summary>
    /// Interface IRepository
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T> where T : Entity 
    {
        /// <summary>
        /// Finds the single by spec.
        /// </summary>
        /// <param name="spec">The spec.</param>
        /// <returns>T.</returns>
        T FindSingleBySpec(ISpecification<T> spec);

        /// <summary>
        /// Finds this instance.
        /// </summary>
        /// <returns>IEnumerable&lt;T&gt;.</returns>
        IEnumerable<T> Find();

        /// <summary>
        /// Finds the specified spec.
        /// </summary>
        /// <param name="spec">The spec.</param>
        /// <returns>IEnumerable&lt;T&gt;.</returns>
        IEnumerable<T> Find(ISpecification<T> spec);

        /// <summary>
        /// Adds the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        /// <returns>T.</returns>
        T Add(T entity);

        /// <summary>
        /// Updates the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        void Update(T entity);

        /// <summary>
        /// Deletes the specified entity.
        /// </summary>
        /// <param name="entity">The entity.</param>
        void Delete(T entity);
    }
}