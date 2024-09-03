import { useMemo } from 'react';
import { useEffect, useState ,useCallback} from 'react'

function App() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  console.log("hii");
  

  useEffect(() => {
    // Some operation to get the data
    setExchange1Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setExchange2Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setTimeout(() => {
      setBankData({
        income: 100
      });
    },1000)
  }, [])

  const cryptoReturns = useCallback(()=>{
   return exchange1Data.returns + exchange2Data.returns;
  },[exchange1Data,exchange2Data]) 
  

  return (
    <div>
        <h1>Crypto Returns: {cryptoReturns()}</h1>
        <h1>Bank Income: {bankData.income}</h1>
  
    </div>
  )
}

export default App