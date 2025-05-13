"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(8080, () => {
    console.log("8080");
});
let userCount = 0;
let allSocket = [];
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', (socket) => {
    socket.on('message', (message) => {
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            let currentUserRoom = null;
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].socket == socket) {
                    currentUserRoom = allSocket[i].room;
                }
            }
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].room == currentUserRoom) {
                    allSocket[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
