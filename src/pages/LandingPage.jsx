import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { MapPin } from "lucide-react"
import CitySearch from "../components/CitySearch"

const FESTIVALS = [
  { name: "Ganesh Chaturthi", emoji: "🐘", city: "Mumbai / Pune", days: 73 },
  { name: "Onam", emoji: "🌸", city: "Kerala / Mangalore", days: 76 },
  { name: "Navratri", emoji: "💃", city: "Bangalore / Mangalore", days: 121 },
  { name: "Diwali", emoji: "🪔", city: "All Cities", days: 148 },
  { name: "Christmas", emoji: "🎄", city: "All Cities", days: 195 },
  { name: "Pongal", emoji: "🎑", city: "Chennai / Bangalore", days: 218 },
  { name: "Holi", emoji: "🎨", city: "Delhi / Mumbai", days: 275 },
  { name: "Ugadi", emoji: "🌿", city: "Bangalore / Mangalore", days: 310 },
]

const CITIES = [
  "Bangalore",
  "Mangalore",
  "Mumbai",
  "Pune",
  "Delhi",
  "Hyderabad",
  "Mysore",
  "Chennai",
  "Kolkata"
]

export default function LandingPage() {
  const navigate = useNavigate()
  const todayStr = new Date().toISOString().split("T")[0]

  const [city, setCity] = useState("")
  const [date, setDate] = useState(todayStr)

  const handleFindDeals = () => {
    navigate("/deals", { state: { city, date } })
  }

  const handleFestivalClick = (fest) => {
    // Determine which city to use based on festival cities
    let targetCity = "Bangalore"
    if (fest.city !== "All Cities") {
      const parts = fest.city.split("/").map(c => c.trim())
      // Check if any part matches one of our CITIES
      const matched = parts.find(p => CITIES.some(c => c.toLowerCase() === p.toLowerCase()))
      if (matched) {
        targetCity = CITIES.find(c => c.toLowerCase() === matched.toLowerCase())
      } else if (parts.includes("Kerala")) {
        targetCity = "Mangalore" // close enough
      } else {
        targetCity = parts[0]
      }
    }
    navigate("/deals", { state: { city: targetCity, date, activeTab: "festival" } })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 text-center overflow-hidden">
        {/* Background radial glow */}
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 350, borderRadius: '50%',
          background: 'linear-gradient(137deg, #7C3AED44, #FF6B6B33)',
          filter: 'blur(90px)', pointerEvents: 'none'
        }} />

        {/* Floating animated deal preview cards (decorative) */}
        <div 
          className="absolute top-[20%] left-[5%] md:left-[15%] opacity-30 blur-[0.5px] pointer-events-none animate-float select-none w-32 rounded-2xl bg-[#1A1A1C] border border-white/10 p-3 text-[11px] text-left"
          style={{ animationDuration: '5s' }}
        >
          <div className="text-gray-400 font-bold mb-1">Zomato</div>
          <div className="text-white font-extrabold text-sm">FREE Dessert</div>
          <div className="text-gray-500 mt-1">Birthday Deal</div>
        </div>

        <div 
          className="absolute bottom-[20%] left-[8%] md:left-[22%] opacity-30 blur-[0.5px] pointer-events-none animate-float select-none w-32 rounded-2xl bg-[#1A1A1C] border border-white/10 p-3 text-[11px] text-left"
          style={{ animationDuration: '6s', animationDelay: '1.5s' }}
        >
          <div className="text-gray-400 font-bold mb-1">H&M</div>
          <div className="text-white font-extrabold text-sm">15% OFF</div>
          <div className="text-gray-500 mt-1">In-store + Online</div>
        </div>

        <div 
          className="absolute top-[35%] right-[5%] md:right-[15%] opacity-30 blur-[0.5px] pointer-events-none animate-float select-none w-32 rounded-2xl bg-[#1A1A1C] border border-white/10 p-3 text-[11px] text-left"
          style={{ animationDuration: '5.5s', animationDelay: '0.8s' }}
        >
          <div className="text-gray-400 font-bold mb-1">Myntra</div>
          <div className="text-white font-extrabold text-sm">30% OFF</div>
          <div className="text-gray-500 mt-1">Use: BDAY30</div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          {/* Pill Tag */}
          <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-gray-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
              Birthday + Festival deals in one place
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{opacity:0,y:20}} 
            animate={{opacity:1,y:0}} 
            transition={{duration:0.8, delay:0.1}}
            className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1] mb-4"
          >
            Your day.<br/>
            <span style={{
              background: 'linear-gradient(137deg,#FF3D77,#FFB1CE,#FF9D3C)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Your deals.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            transition={{delay:0.3}}
            className="text-gray-400 text-base md:text-lg max-w-md mx-auto mb-10"
          >
            Birthday offers + local festival deals in your city.
          </motion.p>

          {/* Input Row */}
          <motion.div 
            initial={{opacity:0,y:20}} 
            animate={{opacity:1,y:0}} 
            transition={{delay:0.4}}
            className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-4 w-full px-4"
          >
            <CitySearch value={city} onChange={setCity} />

            {/* Date input */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#1A1A1C] border border-white/10 text-white rounded-2xl px-5 py-3 text-sm w-48 outline-none focus:border-violet-500 transition-all [color-scheme:dark]"
            />

            {/* CTA Button */}
            <button
              onClick={handleFindDeals}
              className="rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3 transition-all hover:scale-105 active:scale-95 cursor-pointer border-none shadow-lg shadow-violet-600/20"
            >
              Find my deals →
            </button>
          </motion.div>
        </div>
      </section>

      {/* FESTIVAL STRIP SECTION */}
      <section className="w-full border-t border-white/5 py-10 bg-[#0A0A0B]">
        <div className="max-w-[936px] mx-auto px-4 mb-6">
          <h2 className="text-white font-bold text-2xl tracking-tight text-left">
            Upcoming festivals 
            <span className="text-gray-500 font-normal text-base ml-2">in your city</span>
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 max-w-[936px] mx-auto pb-2">
          {FESTIVALS.map((fest, index) => (
            <div
              key={index}
              onClick={() => handleFestivalClick(fest)}
              className="bg-[#1A1A1C] border border-white/10 rounded-2xl p-4 min-w-[180px] shrink-0 flex flex-col gap-3 hover:border-violet-500/50 transition-all cursor-pointer text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl" role="img" aria-label={fest.name}>{fest.emoji}</span>
                <span className="rounded-full bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 whitespace-nowrap">
                  {fest.days} days left
                </span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm line-clamp-1">{fest.name}</h3>
                <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                  <MapPin className="text-gray-500 shrink-0" size={10} />
                  <span className="line-clamp-1">{fest.city}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

