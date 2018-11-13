import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import Screen from './src/Screen';

import Player from './src/Player';
import Puck from './src/Puck';

const app = express();
const server = http.createServer(app);
const io = socketio(server, { origins: '*:*'});

let sockets = {};
let puck = new Puck();
let msgs = [];

const playersAsArray = () => {
    return Object.keys(Player.list).map(key => {
        let player = Player.list[key];
        return {
            x: player.x,
            y: player.y,
            color: player.color,
            radius: player.radius
        }
    });
}

const userConnected = socket => {
    sockets[socket.id] = socket;
    new Player({ 
        id: socket.id,
        x: Math.random() * Screen.WIDTH,
        y: Math.random() * Screen.HEIGHT,
    });
    console.log('Socket conectado ' + socket.id);
}

const userDisconnected = socket=> {
    delete Player.list[socket.id];
    delete sockets[socket.id];
    console.log("Deleted " + socket.id)
}

const playerMoved = (socket, moveData) => {
    let player = Player.list[socket.id];
    player.move(moveData.direction, moveData.state);
}

const generateGameState = () => ({
    players: playersAsArray(),
    pucks: [ puck ],
})

const UPS = 60;
const gameLoop = setInterval(() => {
    for(let key in Player.list){
        let player = Player.list[key];
        player.tick();
    }
    puck.tick();
    io.emit("update", generateGameState());
}, 1000/UPS)

// TODO: Remove this and get user nickname
let idCount = 0;

io.on('connection', socket => {
    userConnected(socket);
    socket.userId = idCount++;
    socket.on("send_msg", msg => {
        if(msg.content && msg.content.length > 0) {
            msg.sender = "User #" + socket.userId;
            msgs.push(msg);
            socket.broadcast.emit("new_msg", msg);
            socket.emit("update_msgs", msgs);
        }
    });
    socket.emit("update_msgs", msgs);
    socket.on("disconnect", () => userDisconnected(socket));
    socket.on("move", moveData => playerMoved(socket, moveData));
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));