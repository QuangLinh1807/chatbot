$(document).ready(function () {
    //$('head').append('<link rel="stylesheet" href="http://10.0.0.243:5811/Content/chat.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="https://localhost:44342/Content/chat.css" type="text/css" />');
    $('head').append('<script src="https://kit.fontawesome.com/6f12f0c71d.js"></script> />');
    ////$('head').append('<script src="https://localhost:44342/Content/signalr/signalr.js"></script> />');
    ////$('head').append('<script src="https://wzrd.in/standalone/uuid%2Fv1@latest"></script> />');
    ////$('head').append('<link rel="stylesheet" href="http://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">');
    var $div = $('<a id="btnShowChat" class="btnChatBox">\
                    <i class="far fa-comments"></i></a>\
                <div id="live-chat">\
                    <header class="clearfix">\
                        <a href="#" class="chat-close">x</a>\
                        <h4>Chatbot 1</h4>\
                    </header>\
                    <div class="chat">\
                        <div class="chat-history"></div>\
                        <div class="chat-input-box">\
                            <input type="text" id="chatMessage" placeholder="Nhập tin nhắn..." autocomplete="off" autofocus>\
                            <button type="button" id="btnSendMessage" class="btn"><i class="fa fa-paper-plane-o" aria-hidden="true"></i> Gửi</button>\
                        </div>\
                    </div>\
                </div>');
    $div.appendTo('body');

    $('#btnShowChat').click(function (e) {
        e.preventDefault();
        $('#live-chat').slideToggle(300);
    });

    $('.chat-close.chat').on('click', function (e) {
        e.preventDefault();
        $('#live-chat').slideToggle(300);
    });

    var groupName = uuidv1();
    var botId = document.getElementById("chatbot_botid").value;

    const connection = new signalR.HubConnectionBuilder()
        //.withUrl("http://10.0.0.243:5811/chatHub")
        .withUrl("https://localhost:44342/chatHub")
        .build();

    function checkJsonObject(str) {
        try {
            var json = JSON.parse(str);
            return json;
        } catch (e) {
            return false;
        }
    }

    function getTextMessage(msg) {
        var item = '<div class="chat-message clearfix">' +
            '<img src="http://gravatar.com/avatar?s=32" alt = "" width="32" height="32" >' +
            '<div class="chat-message-content clearfix">' +
            '<span class="chat-time">Chatbot</span>' +
            '<span>' + msg + '</span>' +
            '</div>' +
            '</div >';

        $('.chat-history').append(item);
        $(".chat-history").stop().animate({ scrollTop: $(".chat-history")[0].scrollHeight }, 300);
    }

    connection.on("Send", function (message) {
        var obj = checkJsonObject(message);
        console.log(obj);
        if (obj !== false) {
            if (obj.listResponse !== undefined) {
                for (var i = 0; i < obj.listResponse.length; i++) {
                    getTextMessage(obj.listResponse[i].Text);
                }
            } else {
                getTextMessage(obj.Text);
            }
        } else {
            getTextMessage(message);
        }
    });

    async function chatBot() {
        var message = $('#chatMessage').val().trim();
        if (message === "") {
            return;
        }
        var item = '<div class="chat-message user-msg clearfix">' +
            '<div class="chat-message-content clearfix">' +
            '<span class="chat-time">User</span>' +
            '<span>' + message + '</span>' +
            '</div>' +
            '</div >';
        $('.chat-history').append(item);
        $(".chat-history").stop().animate({ scrollTop: $(".chat-history")[0].scrollHeight }, 300);

        try {
            var groupMsg = document.getElementById("chatMessage").value;
            $('#chatMessage').val('');
            await connection.invoke("SendMessageToGroup", groupName, groupMsg, botId);
        }
        catch (e) {
            console.error(e.toString());
        }
    }

    // handle enter event
    document.getElementById('chatMessage').addEventListener('keypress', async (event) => {
        var key = event.which;
        if (key === 13) {
            chatBot();
        }
    });

    // handle 
    document.getElementById('btnSendMessage').addEventListener('click', async (event) => {
        chatBot();
    });

    (async () => {
        try {
            await connection.start();
            await connection.invoke("AddToGroup", groupName);
        }
        catch (e) {
            console.error(e.toString());
        }
    })();

});