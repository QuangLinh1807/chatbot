﻿using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Databay.Chatbot.BotConfiguration.Api.Model
{
	public class ResponseDetail
	{
		[BsonId]
		// standard BSonId generated by MongoDb
		public ObjectId InternalId { get; set; }

		public string Text { get; set; }

		public string ImageUrl { get; set; }

		public string Type { get; set; }
		
		public ObjectId CreatedBy { get; set; }

		[BsonDateTimeOptions]
		public DateTime CreatedDate { get; set; } = DateTime.Now;

		public ObjectId ModifiedBy { get; set; } = new ObjectId();

		[BsonDateTimeOptions]
		public DateTime ModifiedDate { get; set; } = DateTime.MinValue;
	}
}