import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage"
import DealsPage from "./pages/DealsPage"
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/deals" element={<DealsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
