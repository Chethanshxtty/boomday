import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { Shirt, Film, Utensils, Building2, Sparkles, Tag, Gift } from "lucide-react"
import FeatureCard from "../components/FeatureCard"
import CountdownBanner from "../components/CountdownBanner"

const GRADIENTS = {
  clothing:  "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
  movies:    "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
  food:      "linear-gradient(137deg, #F59E0B 0%, #FDE68A 45%, #10B981 100%)",
  party:     "linear-gradient(137deg, #7C3AED 0%, #C4B5FD 45%, #EC4899 100%)",
  salon:     "linear-gradient(137deg, #06B6D4 0%, #7DD3FC 45%, #FFFFFF 100%)",
  festival:  "linear-gradient(137deg, #F97316 0%, #FCD34D 45%, #EF4444 100%)",
  birthday:  "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
}

const BIRTHDAY_DEALS = [
  { title: "Myntra", category: "clothing", 
    description: "30% off on any order on your birthday.", 
    validity: "Valid on birthday · Use code BDAY30", badge: "NEW", delay: 0.1 },
  { title: "BookMyShow", category: "movies", 
    description: "Buy 1 Get 1 free movie ticket on your birthday.", 
    validity: "Valid on birthday only", badge: null, delay: 0.2 },
  { title: "Zomato", category: "food", 
    description: "Free dessert on orders above ₹299 on your birthday.", 
    validity: "Valid on birthday · Auto-applied", badge: "NEW", delay: 0.3 },
  { title: "Westside", category: "clothing", 
    description: "20% off — show your birthday ID at billing.", 
    validity: "In-store · Bangalore / Mumbai", badge: null, delay: 0.4 },
  { title: "Naturals Salon", category: "salon", 
    description: "Free hair spa with any service on your birthday.", 
    validity: "In-salon · All cities", badge: "NEW", delay: 0.5 },
  { title: "Max Fashion", category: "clothing", 
    description: "Buy 2 Get 1 free on purchases above ₹999.", 
    validity: "In-store · Birthday week", badge: null, delay: 0.6 },
  { title: "INOX", category: "movies", 
    description: "15% off on tickets + free popcorn on your birthday.", 
    validity: "Valid on birthday · App only", badge: null, delay: 0.7 },
  { title: "H&M", category: "clothing", 
    description: "15% off — valid 3 days before and after birthday.", 
    validity: "In-store + Online", badge: "NEW", delay: 0.8 },
  { title: "CCD", category: "food", 
    description: "Buy 1 Get 1 on any drink on your birthday.", 
    validity: "In-cafe · Show b'day on app", badge: null, delay: 0.9 },
  { title: "Lenskart", category: "salon", 
    description: "25% off on eyewear on your birthday.", 
    validity: "Online + In-store · Code BDAY25", badge: "NEW", delay: 1.0 },
  { title: "Barbeque Nation", category: "food", 
    description: "Free birthday cake + complimentary dessert.", 
    validity: "Dine-in · Advance booking needed", badge: null, delay: 1.1 },
  { title: "Timezone", category: "party", 
    description: "Free 1-hour gaming on your birthday.", 
    validity: "In-venue · All cities", badge: "NEW", delay: 1.2 },
]

const FESTIVAL_DEALS = [
  { title: "Fastrack", category: "clothing", 
    description: "25% off on all accessories during Diwali.", 
    validity: "Diwali · Delhi / Mumbai", badge: "NEW", delay: 0.1 },
  { title: "Kalyan Jewellers", category: "festival", 
    description: "5% off making charges during Diwali festival.", 
    validity: "Diwali · All cities", badge: null, delay: 0.2 },
  { title: "INOX", category: "movies", 
    description: "15% off on tickets during Navratri festival week.", 
    validity: "Navratri · Bangalore / Mangalore", badge: "NEW", delay: 0.3 },
  { title: "Swiggy", category: "food", 
    description: "Free delivery + ₹100 off during Ganesh Chaturthi.", 
    validity: "Ganesh Chaturthi · Mumbai / Pune", badge: null, delay: 0.4 },
  { title: "Lifestyle", category: "clothing", 
    description: "Flat 30% off on ethnic wear during Onam.", 
    validity: "Onam · Kerala / Mangalore", badge: "NEW", delay: 0.5 },
  { title: "PVR Cinemas", category: "movies", 
    description: "BOGO tickets on Christmas day shows.", 
    validity: "Christmas · All cities", badge: null, delay: 0.6 },
  { title: "Celebration Halls", category: "party", 
    description: "20% off on hall booking during Navratri week.", 
    validity: "Navratri · Bangalore / Mangalore", badge: "NEW", delay: 0.7 },
  { title: "Nykaa", category: "salon", 
    description: "30% off on beauty products during Diwali sale.", 
    validity: "Diwali · Online only", badge: null, delay: 0.8 },
]

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Clothing", value: "clothing" },
  { label: "Movies", value: "movies" },
  { label: "Food", value: "food" },
  { label: "Party Halls", value: "party" },
  { label: "Salon & Spa", value: "salon" }
]

const getIcon = (category) => {
  const props = { size: 32, strokeWidth: 2.5 }
  switch (category) {
    case "clothing":
      return <Shirt {...props} />
    case "movies":
      return <Film {...props} />
    case "food":
      return <Utensils {...props} />
    case "party":
      return <Building2 {...props} />
    case "salon":
      return <Sparkles {...props} />
    case "festival":
      return <Tag {...props} />
    default:
      return <Gift {...props} />
  }
}

// Calculate days until birthday based on local date
const getDaysUntilBirthday = (bdayStr) => {
  if (!bdayStr) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const bday = new Date(bdayStr)
  const bdayMonth = bday.getMonth()
  const bdayDay = bday.getDate()

  let bdayThisYear = new Date(today.getFullYear(), bdayMonth, bdayDay)
  bdayThisYear.setHours(0, 0, 0, 0)

  if (bdayThisYear.getTime() === today.getTime()) {
    return 0
  }

  if (bdayThisYear < today) {
    bdayThisYear.setFullYear(today.getFullYear() + 1)
  }

  const diffTime = bdayThisYear.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export default function DealsPage() {
  const location = useLocation()
  const todayStr = new Date().toISOString().split("T")[0]

  const { city = "Bangalore", date = todayStr, activeTab: initialTab = "birthday" } = location.state || {}

  const [activeTab, setActiveTab] = useState(initialTab)
  const [activeCategory, setActiveCategory] = useState("all")
  const [birthdayDeals, setBirthdayDeals] = useState(BIRTHDAY_DEALS)
  const [festivalDeals, setFestivalDeals] = useState(FESTIVAL_DEALS)

  useEffect(() => {
    fetch("http://localhost:5005/api/deals")
      .then((res) => res.json())
      .then((data) => {
        if (data.birthdayDeals && data.festivalDeals) {
          setBirthdayDeals(data.birthdayDeals)
          setFestivalDeals(data.festivalDeals)
        }
      })
      .catch((err) => console.error("Error fetching deals from backend:", err))
  }, [])

  const daysUntilBirthday = getDaysUntilBirthday(date)

  const dealsList = activeTab === "birthday" ? birthdayDeals : festivalDeals

  const filteredDeals = dealsList.filter((deal) => {
    if (activeCategory === "all") return true
    return deal.category === activeCategory
  })

  return (
    <div className="min-h-screen bg-[#0A0A0B] pb-16">
      {/* COUNTDOWN BANNER */}
      <CountdownBanner daysUntilBirthday={daysUntilBirthday} />

      {/* PAGE HEADER */}
      <header className="max-w-[936px] mx-auto px-4 pt-10 pb-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-black text-4xl tracking-tight mb-2"
        >
          Deals for {city}
        </motion.h2>
        <p className="text-gray-400 text-sm">
          Showing birthday + festival offers · {city}
        </p>
      </header>

      {/* TAB SWITCHER */}
      <div className="max-w-[936px] mx-auto px-4 mb-6 flex gap-2 justify-center">
        <button
          onClick={() => {
            setActiveTab("birthday")
            setActiveCategory("all") // Reset category filter on tab switch
          }}
          className={`${
            activeTab === "birthday"
              ? "bg-violet-600 text-white font-semibold"
              : "bg-[#1A1A1C] border border-white/10 text-gray-400 hover:border-violet-500 hover:text-white"
          } rounded-full px-6 py-2 text-sm transition-all cursor-pointer border-none`}
        >
          🎂 Birthday Deals
        </button>
        <button
          onClick={() => {
            setActiveTab("festival")
            setActiveCategory("all") // Reset category filter on tab switch
          }}
          className={`${
            activeTab === "festival"
              ? "bg-violet-600 text-white font-semibold"
              : "bg-[#1A1A1C] border border-white/10 text-gray-400 hover:border-violet-500 hover:text-white"
          } rounded-full px-6 py-2 text-sm transition-all cursor-pointer border-none`}
        >
          🎉 Festival Deals
        </button>
      </div>

      {/* CATEGORY FILTER */}
      <div className="max-w-[936px] mx-auto px-4 mb-10 flex gap-2 flex-wrap justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`${
              activeCategory === cat.value
                ? "bg-violet-600 text-white font-semibold"
                : "border border-white/10 text-gray-400 hover:border-violet-500"
            } rounded-full px-4 py-1.5 text-xs transition-all cursor-pointer bg-transparent`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* DEALS GRID */}
      <div className="max-w-[936px] mx-auto px-4 pb-16">
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 place-items-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredDeals.map((deal, index) => (
              <motion.div
                layout
                key={`${activeTab}-${deal.title}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex justify-center"
              >
                <FeatureCard
                  title={deal.title}
                  description={deal.description}
                  icon={getIcon(deal.category)}
                  gradient={GRADIENTS[deal.category] || GRADIENTS.birthday}
                  delay={0} // Handled by grid entry transition
                  badge={deal.badge}
                  validity={deal.validity}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">
            No deals found for this category.
          </div>
        )}
      </div>
    </div>
  )
}

