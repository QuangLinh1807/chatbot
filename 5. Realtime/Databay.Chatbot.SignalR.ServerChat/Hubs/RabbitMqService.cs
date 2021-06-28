using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using Newtonsoft.Json.Linq;
using Databay.Chatbot.SignalR.ServerChat.Code;

namespace Databay.Chatbot.SignalR.ServerChat.Hubs
{
    public class RabbitMqService
    {
        private readonly IConnection connection;
        private readonly IModel channel;
        private readonly string replyQueueName;
        private readonly EventingBasicConsumer consumer;
        private readonly BlockingCollection<dynamic> respQueue = new BlockingCollection<dynamic>();
        private readonly IBasicProperties props;
        private AppSettings _appSettings { get; set; }

        public RabbitMqService(AppSettings appSettings)
        {
            _appSettings = appSettings;
            var factory = new ConnectionFactory()
            {
                HostName = appSettings.RabbitMQ_HostName,
                UserName = appSettings.RabbitMQ_UserName,
                Password = appSettings.RabbitMQ_Password,
                VirtualHost = appSettings.RabbitMQ_VirtualHost,
                Port = appSettings.RabbitMQ_Port
            };
            connection = factory.CreateConnection();
            channel = connection.CreateModel();
            replyQueueName = channel.QueueDeclare().QueueName;
            consumer = new EventingBasicConsumer(channel);

            props = channel.CreateBasicProperties();
            var correlationId = Guid.NewGuid().ToString();
            props.CorrelationId = correlationId;
            props.ReplyTo = replyQueueName;

            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var response = Encoding.UTF8.GetString(body);
                if (ea.BasicProperties.CorrelationId == correlationId)
                {
                    dynamic responseObj;
                    try
                    {
                        responseObj = JObject.Parse(response).ToString();
                    }
                    catch
                    {
                        responseObj = response;
                    }

                    respQueue.Add(responseObj);
                }
            };
        }

        public string Call(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);
            channel.BasicPublish(exchange: "", routingKey: _appSettings.RabbitMQ_RoutingKey, basicProperties: props, body: messageBytes);

            channel.BasicConsume(consumer: consumer, queue: replyQueueName, autoAck: true);

            return respQueue.Take();
        }

        public void Close()
        {
            connection.Close();
        }
    }
}