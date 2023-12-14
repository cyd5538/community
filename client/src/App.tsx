import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Myprofile from "./pages/Myprofile"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/me" element={<Myprofile />}/>
      </Routes>
    </>
  )
}

export default App
