import express  from "express";
import { WebSocketServer ,WebSocket} from "ws";
const app = express()

const httpServer= app.listen(8080,()=>{
    console.log("8080");
})

let userCount = 0 ;
let allSocket : WebSocket[]= []

const wss = new WebSocketServer({server : httpServer})

wss.on('connection',(socket)=>{
    allSocket.push(socket)

    userCount=userCount+1
    console.log("user connection" , userCount);

    socket.on('message',(message)=>{
        for(let i=0 ; i<allSocket.length;i++){
            const s=allSocket[i]
            s.send(message.toString())
        }
    })

})
