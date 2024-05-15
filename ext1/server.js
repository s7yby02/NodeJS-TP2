const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

// const server = http.createServer((req, res) => {
//     fs.readFile(__dirname + '/index.html', (err, data) => {
//         res.writeHead(200);
//         res.end(data);
//     });
// });
const server = http.createServer((req, res) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
            console.error('Error reading index.html:', err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal server error');
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('message', (msg) => {
        console.log('Message received: ' + msg);
        io.emit('message', msg);
    });
});

server.listen(8888, () => {
    console.log('Server running at http://localhost:8888/');
});
