import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/login"
import Register from "./pages/register"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
      </Routes>
    </>
  )
}

export default App
