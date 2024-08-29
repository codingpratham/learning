import React, { useEffect } from 'react'
import Card from './Component/Card'

const App = () => {

  useEffect(()=>{
    alert('hii')
  },[])
  return (
    <div>
      <Card>
        Hii
      </Card>

    </div>
  )
}

export default App