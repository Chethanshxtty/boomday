import { useState, useRef, useEffect } from "react"
import { MapPin, Navigation, Search } from "lucide-react"

const ALL_CITIES = [
  "Bangalore", "Mangalore", "Mumbai", "Pune", "Delhi",
  "Hyderabad", "Mysore", "Chennai", "Kolkata", "Ahmedabad",
  "Surat", "Jaipur", "Lucknow", "Kochi", "Chandigarh",
  "Bhopal", "Nagpur", "Indore", "Coimbatore", "Vizag"
]

export default function CitySearch({ value, onChange }) {
  const [query, setQuery] = useState(value || "")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [locError, setLocError] = useState("")
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const filtered = query.length > 0
    ? ALL_CITIES.filter(c =>
        c.toLowerCase().startsWith(query.toLowerCase()) ||
        c.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_CITIES.slice(0, 6)

  // Update query if value prop changes
  useEffect(() => {
    if (value) {
      setQuery(value)
    }
  }, [value])

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  function handleSelect(city) {
    setQuery(city)
    onChange(city)
    setOpen(false)
  }

  function handleDetectLocation() {
    setLoading(true)
    setLocError("")
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported")
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await res.json()
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            "Your location"
          // Match to known cities or use detected name
          const matched = ALL_CITIES.find(c =>
            c.toLowerCase() === city.toLowerCase()
          ) || city
          handleSelect(matched)
        } catch {
          setLocError("Could not detect city")
        }
        setLoading(false)
      },
      () => {
        setLocError("Location access denied")
        setLoading(false)
      }
    )
  }

  return (
    <div className="relative w-48" ref={dropdownRef}>
      {/* Input */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            onChange("")
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          className="w-full bg-[#1A1A1C] border border-white/10 text-white 
            rounded-2xl pl-9 pr-4 py-3 text-sm outline-none 
            focus:border-violet-500 transition-all placeholder-gray-600"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-64 
          bg-[#1A1A1C] border border-white/10 rounded-2xl 
          overflow-hidden z-50 shadow-2xl shadow-black/60">

          {/* Use current location row */}
          <button
            onClick={handleDetectLocation}
            className="w-full flex items-center gap-3 px-4 py-3 
              text-sm text-violet-400 hover:bg-white/5 
              transition-all border-b border-white/5 cursor-pointer bg-transparent border-none"
          >
            <Navigation size={14} className={loading ? "animate-spin" : ""} />
            <span>{loading ? "Detecting..." : "Use current location"}</span>
          </button>

          {/* Error */}
          {locError && (
            <p className="text-red-400 text-xs px-4 py-2">{locError}</p>
          )}

          {/* City list */}
          <div className="max-h-52 overflow-y-auto scrollbar-hide">
            {filtered.length === 0 ? (
              <p className="text-gray-500 text-xs px-4 py-3">No cities found</p>
            ) : (
              filtered.map(city => (
                <button
                  key={city}
                  onClick={() => handleSelect(city)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 
                    text-sm text-gray-300 hover:bg-white/5 
                    hover:text-white transition-all cursor-pointer text-left bg-transparent border-none"
                >
                  <MapPin size={12} className="text-gray-600 shrink-0" />
                  {city}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

