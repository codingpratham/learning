import express from "express";
import { WebSocketServer } from "ws";

const app = express()

const server = app.listen(3000,()=>{
  console.log("port is listining on 8080");
})

const wss = new WebSocketServer({server:server})

wss.on('connection',function connection(ws){
  ws.on('error',console.error)

  ws.on('message',function message(data,isBinary){
    wss.clients.forEach(function each(client){
      if(client.readyState === WebSocket.OPEN){
        client.send(data,{binary:isBinary})
      }
    })
  })

  ws.send('Hello Message from server')
})
