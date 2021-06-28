using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Databay.Chatbot.SignalR.ServerChat.Code
{
    public class AppSettings
    {
        public string RabbitMQ_HostName { get; set; }
        public string RabbitMQ_UserName { get; set; }
        public string RabbitMQ_Password { get; set; }
        public string RabbitMQ_VirtualHost { get; set; }
        public int RabbitMQ_Port { get; set; }
        public string RabbitMQ_RoutingKey { get; set; }
    }
}
