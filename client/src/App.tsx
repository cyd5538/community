import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Myprofile from "./pages/Myprofile"
import Sidebar from "./components/sidebar/sidebar"
import Container from "./components/ui/Container"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoute } from "./components/ProtectedRoute"
import useAuth from "./store/useAuth"
import Search from "./pages/Search"

function App() {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar />
      <Container>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/Register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/me" element={<ProtectedRoute user={user}>
            <Myprofile />
          </ProtectedRoute>} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
