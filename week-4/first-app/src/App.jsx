import React, { useState } from 'react'

const App = () => {
  const [count,setCount]=useState(0)

  const Increment=()=>{
    setCount(count+1)
  }

  const Decrement=()=>{
    setCount(count-1)
  }
  return (
    <>
    <h1>counter:{count}</h1>
    <button onClick={Increment}>Increment</button>
    <br />
    <button onClick={Decrement}>Decrement</button>
    </>
  )
}

export default App