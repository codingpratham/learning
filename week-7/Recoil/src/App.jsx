import React from 'react'
import { RecoilRoot } from 'recoil'
import MainApp from './component/MainApp'

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <MainApp/>
      </RecoilRoot>
    </div>
  )
}

export default App