const socket = io();

function sendMessage() {
    const message = document.getElementById('message').value;
    socket.emit('message', message);
    document.getElementById('message').value = '';
}

socket.on('message', (msg) => {
    const messages = document.getElementById('messages');
    const li = document.createElement('li');
    li.textContent = msg;
    messages.appendChild(li);
});
