using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Microsoft.Extensions.Configuration;

namespace Databay.Chatbot.SignalR.ChatServer.Hubs
{
    public class RabbitMqService
    {
        private readonly IConnection connection;
        private readonly IModel channel;
        private readonly string replyQueueName;
        private readonly EventingBasicConsumer consumer;
        private readonly BlockingCollection<string> respQueue = new BlockingCollection<string>();
        private readonly IBasicProperties props;
        private readonly IConfiguration _config;

        //public RabbitMqService(IConfiguration config)
        //{
        //    _config = config;
        //}

        public RabbitMqService()
        {
            //var factory = new ConnectionFactory() {
            //    HostName = _config.GetValue<string>("RabbitMQServer"),
            //    UserName = _config.GetValue<string>("UserName"),
            //    Password = _config.GetValue<string>("Password"),
            //    VirtualHost = _config.GetValue<string>("VirtualHost"),
            //    Port = _config.GetValue<int>("Port")
            //};
            var factory = new ConnectionFactory() { HostName = "10.0.0.243", UserName = "dungtulam", Password = "dungtulam", VirtualHost = "/", Port = 5672 };
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
                    respQueue.Add(response);
                }
            };
        }

        public string Call(string message)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);
            channel.BasicPublish(exchange: "", routingKey: "rpc_queue", basicProperties: props, body: messageBytes);

            channel.BasicConsume(consumer: consumer, queue: replyQueueName, autoAck: true);

            return respQueue.Take();
        }

        public void Close()
        {
            connection.Close();
        }
    }
}
