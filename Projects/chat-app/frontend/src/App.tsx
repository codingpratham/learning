import { useEffect, useRef, useState } from "react"

const App = () => {

  const [msg, setMsg] = useState<string[]>([])
  const wsRef=useRef<WebSocket | null
  >(null)

  useEffect(()=>{
    const ws = new WebSocket('http://localhost:8080')
    ws.onmessage=(event)=>{
      setMsg(m=>[...m,event.data])
    }
    wsRef.current=ws

    ws.onopen=()=>{

      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"123"
        }
      }))
    }
    return ()=>{
      ws.close()
      wsRef.current=null
    }
  },[])
  return (
    <>
    <div className="h-screen bg-black ">
      <br></br>
    <div className="h-[84vh]">
      {msg.map(msgs=> <div className="m-10"><span className="bg-white text-black rounded p-4 ">{msgs}</span></div>)}
    </div>
    <div className="w-full bg-white flex p-4">
      <input type="text " className=" flex-1 " id="message"/>
      <button className=" bg-purple-600 text-white p-4" onClick={()=>{
        const message=document.getElementById('message').value
        wsRef.current.send(JSON.stringify({
          type:"chat",
          payload:{
            message:message
          }
        }))
      }}>Send Message</button>
    </div>
    </div>
    </>
  )
}

export default App