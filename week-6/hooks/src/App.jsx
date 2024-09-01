import React from 'react'
import { useState } from 'react'

const App = () => {
  const [counter,setCounter]=useState(0)
  const [input,setInput]=useState(0)

  let count=0

  for(let i=0;i<=input;i++){
    count+=i
  }

  return (
    <div>

      <input type="text"value={input}
      onChange={(e)=>{setInput(e.target.value)}} />

      <h1>sum from 1 to {input} is {count}</h1>

      <button onClick={()=>{
        setCounter(counter+1)
      }}>Counter({counter})</button>
    </div>
  )
}

export default App