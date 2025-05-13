import express  from "express";
import { WebSocketServer ,WebSocket} from "ws";
const app = express()

const httpServer= app.listen(8080,()=>{
    console.log("8080");
})

interface User{
    socket : WebSocket
    room:String
}

let userCount = 0 ;
let allSocket : User[]= []

const wss = new WebSocketServer({server : httpServer})

wss.on('connection',(socket)=>{

   socket.on('message',(message)=>{
    //@ts-ignore
     const parsedMessage = JSON.parse(message)

     if(parsedMessage.type === "join"){
        allSocket.push({
            socket,
            room:parsedMessage.payload.roomId
        })
     }

     if(parsedMessage.type === "chat"){
        let currentUserRoom= null
        for(let i=0 ; i<allSocket.length ; i++){
            if(allSocket[i].socket==socket){
                currentUserRoom=allSocket[i].room
            }
        }

        for(let i=0 ; i<allSocket.length ; i++){
            if(allSocket[i].room == currentUserRoom){
                allSocket[i].socket.send(parsedMessage.payload.message)
            }
        }

     }
   })
})
