using Databay.Chatbot.SignalR.ServerChat.Code;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Databay.Chatbot.SignalR.ServerChat.Hubs
{
    public class ChatHub : Hub
    {
        private AppSettings AppSettings { get; set; }
        public ChatHub(IOptions<AppSettings> settings)
        {
            AppSettings = settings.Value;
        }
        public Task SendMessageToGroup(string groupName, string message, string botId)
        {
            //send to rabbitmq in order to recieve message
            var rabbitMq = new RabbitMqService(AppSettings);
            // thêm bot id vào message
            var response = rabbitMq.Call(botId + "_" + message);
            rabbitMq.Close();

            return Clients.Group(groupName).SendAsync("Send", response);
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            //await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }

        public Task SendPrivateMessage(string user, string message)
        {
            return Clients.User(user).SendAsync("ReceiveMessage", message);
        }
    }
}
