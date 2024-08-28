import React, { useState } from 'react'
import Header from './Header'
const HeaderBtn = () => {
    const [title,setTitle]=useState("or bhai")

    const update=()=>{
        setTitle(`or ${Math.random()}`)
    }
  return (
    <div>
        <button onClick={update}>Update</button>
        <Header title={title}/>
    </div>
  )
}

export default HeaderBtn