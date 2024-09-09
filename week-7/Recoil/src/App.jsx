import React from 'react'
import { RecoilRoot } from 'recoil'
import Todo from './component/Todo'

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Todo id={1}/>
      </RecoilRoot>
    </div>
  )
}

export default App