import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [socket,setSocket]=useState<WebSocket| null>(null)
  const [message , setMessage]=useState("")
  const [Lmessage , setLMessage]=useState("")

  useEffect(()=>{
    const socket =  new WebSocket('http://localhost:3000')

    socket.onopen=()=>{
      console.log("Connection established");
      setSocket(socket)
    }
    socket.onmessage=(message)=>{
      console.log("message recieved:",message.data);
      setMessage(message.data)
    }

    setSocket(socket)

    return ()=>{
      socket.close()
    }
  },[])
  return (
    <>
    <input type="text" value={Lmessage} onChange={e=>{
      setLMessage(e.target.value)
    }}/>

    <button onClick={()=>{
      socket?.send(Lmessage)
      setLMessage(Lmessage)
      
    }}>Send</button>
    {message}
    </>
  )
}

export default App