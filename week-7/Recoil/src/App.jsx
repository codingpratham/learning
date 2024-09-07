import React from 'react'
import Btn from './component/Btn'
import { useRecoilValue } from 'recoil'
import { networkAtom ,jobsAtom,messagingAtom,notificationAtom} from './store/atom/atoms'

const App = () => {

  const networkCount=useRecoilValue(networkAtom)

  const jobCount=useRecoilValue(jobsAtom)

  const messagingCount=useRecoilValue(messagingAtom)

  const notificationCount=useRecoilValue(notificationAtom)

  return (
    <div>
    <Btn name={`Home(${networkCount})`}/>
      <Btn name={`MyNetwork(${})`}/>
      <Btn name={`Jobs(${jobCount})`}/>
      <Btn name={`Messages(${messagingCount})`}/>
      <Btn name={`Notifications(${notificationCount})`}/> 
    </div>
  )
}

export default App