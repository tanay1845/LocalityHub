import { BrowserRouter as Router, Routes, Route } from "react-router"
import Home from "./components/Home"
import LoginPage from "./components/Login"
import SignupPage from "./components/Signup"
import "./index.css"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"
import CreateService from "./components/CreateService"
import AllServices from "./components/AllServices"
import ServiceProvider from "./components/ServiceProvider"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services/:serviceId" element={<ServiceProvider />} />
        <Route path="/create-new-service" element={<CreateService />} />
        <Route path="/services" element={<AllServices />} />
      </Routes>
    </Router>
  )
}

export default App
