// ***********************************************************************
// Assembly         : Buca.SocialSecurity.Catalog.Api
// Author           : thangnd
// Created          : 09-13-2018
//
// Last Modified By : thangnd
// Last Modified On : 09-13-2018
// ***********************************************************************
// <copyright file="RedisRepository.cs" company="Buca.SocialSecurity.Catalog.Api">
//     Copyright (c) by adguard. All rights reserved.
// </copyright>
// <summary></summary>
// ***********************************************************************

using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace Databay.Chatbot.BotConfiguration.Domain.Core.Repository
{
    /// <summary>
    /// Class RedisRepository.
    /// </summary>
    /// <typeparam name="TValue">The type of the t value.</typeparam>
    public class RedisRepository<TValue>
    {
        #region props
        private string Id { get; set; }
        private string KeyId { get; set; }

        //[NonSerialized]
        //ConcurrentDictionary<string, TValue> _data;

        readonly object _lock = new object();

        public ConnectionMultiplexer _redis { get; }

        private readonly IDatabase _database;

        #endregion

        /// <summary>
        /// Initializes a new instance of the <see cref="RedisRepository{TValue}"/> class.
        /// </summary>
        /// <param name="redis">The redis.</param>
        /// <param name="id">The identifier.</param>
        public RedisRepository(ConnectionMultiplexer redis, string id = null)
        {
            Id = id ?? typeof(TValue).Name;
            KeyId = Id + ":key";
            _redis = redis;
            _database = redis.GetDatabase();
        }

        /// <summary>
        /// Initializes the data.
        /// </summary>
        /// <returns>ConcurrentDictionary&lt;System.String, TValue&gt;.</returns>
        private ConcurrentDictionary<string, TValue> InitData()
        {
            var data = new ConcurrentDictionary<string, TValue>();
            lock (_lock)
            {
                var keys = _database.SetScan(KeyId);
                foreach (var item in keys)
                {
                    data.TryAdd(item, GetByKeyAsync(Id + ":" + item).Result);
                }
                //Console.WriteLine("Init data of " + Id + " success!");
            }
            return data;
        }

        /// <summary>
        /// Valueses this instance.
        /// </summary>
        /// <returns>IEnumerable&lt;TValue&gt;.</returns>
        public IEnumerable<TValue> Values()
        {
            var data = InitData();
            return data.Values;
        }

        /// <summary>
        /// get by key as an asynchronous operation.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns>Task&lt;TValue&gt;.</returns>
        private async Task<TValue> GetByKeyAsync(string key)
        {
            var data = await _database.StringGetAsync(key);
            return string.IsNullOrEmpty(data) ? default(TValue) : Deserialize<TValue>(data);
        }

        /// <summary>
        /// Deserializes the specified serialized.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="serialized">The serialized.</param>
        /// <returns>T.</returns>
        private static T Deserialize<T>(string serialized)
        {
            return JsonConvert.DeserializeObject<T>(serialized);
        }
    }
}
