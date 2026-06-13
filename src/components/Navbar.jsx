import { useLocation, useNavigate } from "react-router-dom"

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isDealsPage = location.pathname === "/deals"

  const handleButtonClick = () => {
    if (isDealsPage) {
      navigate("/")
    } else {
      // Default to Bangalore and today's date if navigating directly
      const today = new Date().toISOString().split('T')[0]
      navigate("/deals", { state: { city: "Bangalore", date: today } })
    }
  }

  return (
    <nav className="sticky top-0 w-full bg-[#0A0A0B] border-b border-white/5 z-50">
      <div className="max-w-[936px] mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div 
          className="text-white font-bold text-xl cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          Festly<span className="text-violet-500">.</span>
        </div>

        {/* Right: Toggle Button */}
        <button
          onClick={handleButtonClick}
          className="rounded-full border border-white/10 text-gray-400 text-sm px-4 py-1.5 hover:border-violet-500 hover:text-white transition-all cursor-pointer bg-transparent"
        >
          {isDealsPage ? "← Back" : "Deals Feed →"}
        </button>
      </div>
    </nav>
  )
}

