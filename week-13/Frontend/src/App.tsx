import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import Blog from "./Pages/Blog"


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/blog" element={<Blog/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App