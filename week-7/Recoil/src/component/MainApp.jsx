import React, { useMemo } from 'react'
import Btn from './Btn'
import { useRecoilState, useRecoilValue } from 'recoil'
import { networkAtom ,jobsAtom,messagingAtom,notificationAtom, totalcountSelector} from '../store/atom/atoms'

const MainApp = () => {

  const networkCount=useRecoilValue(networkAtom)

  const jobCount=useRecoilValue(jobsAtom)

  const [messagingCount,setMessageStatus]=useRecoilState(messagingAtom)

  const notificationCount=useRecoilValue(notificationAtom)

  const totalCount=useRecoilValue(totalcountSelector)

  console.log(totalCount);
  
  return (
    <div>
    <Btn name={`Home(${networkCount})`}/>
      <Btn name={`MyNetwork(${networkCount})`}/>
      <Btn name={`Jobs(${jobCount})`}/>
      <Btn name={`Messages(${messagingCount})`}/>
      <Btn name={`Notifications(${notificationCount})`}/> 

      <button onClick={()=>{
        setMessageStatus(messagingCount+1)
      }}>
        Me{totalCount}
      </button>
    </div>
  )
}

export default MainApp