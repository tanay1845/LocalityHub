import { BrowserRouter as Router, Routes, Route } from "react-router"
import Home from "./components/Home"
import LoginPage from "./components/Login"
import SignupPage from "./components/Signup"
import "./index.css"
import Navbar from "./components/Navbar"
import ServiceList from "./components/ServiceList"
import Profile from "./components/Profile"
import CreateService from "./components/CreateService"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services/:serviceType" element={<ServiceList />} />
        <Route path="/create-new-service" element={<CreateService />} />
      </Routes>
    </Router>
  )
}

export default App
