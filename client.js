const socket = io()

var username;
do {
    username = prompt("Please enter your name : ");
     // make first word of user name in capital.
    const firstWord = username.charAt(0);
    const firstCapitalLetter = firstWord.toUpperCase();
    const reaminingWord = username.slice(1);
    username = firstCapitalLetter + reaminingWord;

} while (!username)
socket.emit("new-user-joined", username)
var chat = document.querySelector(".chat_user_name_box")
var btn = document.querySelector("#btn")
var typing_bar = document.querySelector("#typing_bar")
var chats = document.querySelector("#chats")
console.log(chat)
socket.on("user-connected", (socket_name) => {
    userJoinLeft(socket_name);
})


function userJoinLeft(name) {
    document.getElementById('user_name_to_chat').innerHTML = name;
    document.getElementById('sender_name').innerHTML = name;
}

socket.on('user-disconnected', (user) => {
    userLeft(user);
});

function userLeft(user) {
    console.log(user + "left");
}

btn.addEventListener('click', () => {
    let data = {
        user: username,
        msg: typing_bar.value
    };

    console.log(data);

    if (typing_bar.value != '') {
        appendMessage(data, 'outgoing');
        socket.emit('message', data);
        typing_bar.value = '';
    }
})

function appendMessage(data, status) {

    let div = document.createElement("div");
    div.classList.add("msg", status);
    div.classList.add("chats");
    let content = `<h5>${data.user}</h5>
    <p>${data.msg}</p>`;
    div.innerHTML = content;
    chats.appendChild(div);
    
}

socket.on("message", (data) => {
    appendMessage(data, "incoming");
});