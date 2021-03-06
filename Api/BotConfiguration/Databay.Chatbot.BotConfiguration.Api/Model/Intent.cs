using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Databay.Chatbot.BotConfiguration.Api.Model
{
	public class Intent
	{
		[BsonId]
		// standard BSonId generated by MongoDb
		public ObjectId InternalId { get; set; }

		public string Name { get; set; }

		[JsonIgnore]
		public List<Pattern> Patterns { get; set; } = new List<Pattern>();

		public string Description { get; set; }

		//[JsonIgnore]
		public List<Response> Responses { get; set; } = new List<Response>();

		public ObjectId CreatedBy { get; set; }

		[BsonDateTimeOptions]
		public DateTime CreatedDate { get; set; } = DateTime.Now;

		public ObjectId ModifiedBy { get; set; } = new ObjectId();

		[BsonDateTimeOptions]
		public DateTime ModifiedDate { get; set; } = DateTime.MinValue;
	}
}
