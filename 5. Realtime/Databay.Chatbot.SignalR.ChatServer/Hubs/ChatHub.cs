using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;

namespace Databay.Chatbot.SignalR.ChatServer.Hubs
{
    public class ChatHub : Hub
    {
        public Task SendMessageToGroup(string groupName, string message)
        {
            //send to rabbitmq in order to recieve message
            var rabbitMq = new RabbitMqService();
            var response = rabbitMq.Call(message);
            rabbitMq.Close();

            return Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId}: {response}");
        }

        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
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
