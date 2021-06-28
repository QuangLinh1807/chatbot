﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Databay.Chatbot.BotConfiguration.Api.Model
{
    public class User
    {
        [BsonId]
        // standard BSonId generated by MongoDb
        public ObjectId InternalId { get; set; }

        public string Role { get; set; }
    }
}
