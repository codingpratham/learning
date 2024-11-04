
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Home from './Pages/Home'

const App = () => {
  return (
    <div>
        <BrowserRouter>
        
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/home" element={<Home/>}/>
            </Routes>
        
        </BrowserRouter>
    </div>
  )
}

export default App