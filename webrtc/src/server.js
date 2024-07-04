import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';
// built in
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
const handleListen = () => console.log(`✅ Listening on http://localhost:${PORT}`);

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const webSocketServer = new WebSocketServer({ server: httpServer });

const sockets = [];

webSocketServer.on('connection', (socket) => {
    console.log('Connected to Browser ✅');

    sockets.push(socket);
    socket['nick'] = 'Anonymous';

    socket.on('message', (message) => {
        const msg = JSON.parse(message);
        switch (msg.type) {
            case 'msg':
                sockets.forEach((aBrowserSocket) => aBrowserSocket.send(`${socket.nick}: ${msg.payload}`));
            case 'nick':
                socket['nick'] = msg.payload; // socket에 정보를 저장할 수 있음.
        }
    });

    socket.on('close', () => console.log('Disconnected from the Browser ❗️'));

    socket.on('error', (err) => console.log(err));
    socket.send("I'm the data 🌝");
});

httpServer.listen(PORT, handleListen);
