import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5005

app.use(cors())
app.use(express.json())

const API_KEY = "AIzaSyBM3GKB0XdfHESGlPib62kA0JIDW9bUda0"

app.get('/api/deals', async (req, res) => {
  try {
    const prompt = `
Generate a JSON object containing the lists of birthday and festival deals in Indian cities.
The format must be exactly:
{
  "birthdayDeals": [
     { "title": "Myntra", "category": "clothing", "description": "30% off on any order on your birthday.", "validity": "Valid on birthday · Use code BDAY30", "badge": "NEW" },
     { "title": "BookMyShow", "category": "movies", "description": "Buy 1 Get 1 free movie ticket on your birthday.", "validity": "Valid on birthday only", "badge": null },
     { "title": "Zomato", "category": "food", "description": "Free dessert on orders above ₹299 on your birthday.", "validity": "Valid on birthday · Auto-applied", "badge": "NEW" },
     { "title": "Westside", "category": "clothing", "description": "20% off — show your birthday ID at billing.", "validity": "In-store · Bangalore / Mumbai", "badge": null },
     { "title": "Naturals Salon", "category": "salon", "description": "Free hair spa with any service on your birthday.", "validity": "In-salon · All cities", "badge": "NEW" },
     { "title": "Max Fashion", "category": "clothing", "description": "Buy 2 Get 1 free on purchases above ₹999.", "validity": "In-store · Birthday week", "badge": null },
     { "title": "INOX", "category": "movies", "description": "15% off on tickets + free popcorn on your birthday.", "validity": "Valid on birthday · App only", "badge": null },
     { "title": "H&M", "category": "clothing", "description": "15% off — valid 3 days before and after birthday.", "validity": "In-store + Online", "badge": "NEW" },
     { "title": "CCD", "category": "food", "description": "Buy 1 Get 1 on any drink on your birthday.", "validity": "In-cafe · Show b'day on app", "badge": null },
     { "title": "Lenskart", "category": "salon", "description": "25% off on eyewear on your birthday.", "validity": "Online + In-store · Code BDAY25", "badge": "NEW" },
     { "title": "Barbeque Nation", "category": "food", "description": "Free birthday cake + complimentary dessert.", "validity": "Dine-in · Advance booking needed", "badge": null },
     { "title": "Timezone", "category": "party", "description": "Free 1-hour gaming on your birthday.", "validity": "In-venue · All cities", "badge": "NEW" }
  ],
  "festivalDeals": [
     { "title": "Fastrack", "category": "clothing", "description": "25% off on all accessories during Diwali.", "validity": "Diwali · Delhi / Mumbai", "badge": "NEW" },
     { "title": "Kalyan Jewellers", "category": "festival", "description": "5% off making charges during Diwali festival.", "validity": "Diwali · All cities", "badge": null },
     { "title": "INOX", "category": "movies", "description": "15% off on tickets during Navratri festival week.", "validity": "Navratri · Bangalore / Mangalore", "badge": "NEW" },
     { "title": "Swiggy", "category": "food", "description": "Free delivery + ₹100 off during Ganesh Chaturthi.", "validity": "Ganesh Chaturthi · Mumbai / Pune", "badge": null },
     { "title": "Lifestyle", "category": "clothing", "description": "Flat 30% off on ethnic wear during Onam.", "validity": "Onam · Kerala / Mangalore", "badge": "NEW" },
     { "title": "PVR Cinemas", "category": "movies", "description": "BOGO tickets on Christmas day shows.", "validity": "Christmas · All cities", "badge": null },
     { "title": "Celebration Halls", "category": "party", "description": "20% off on hall booking during Navratri week.", "validity": "Navratri · Bangalore / Mangalore", "badge": "NEW" },
     { "title": "Nykaa", "category": "salon", "description": "30% off on beauty products during Diwali sale.", "validity": "Diwali · Online only", "badge": null }
  ]
}
Return ONLY valid JSON. No markdown formatting.
`
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    )
    const data = await response.json()
    let text = data.candidates[0].content.parts[0].text
    // Strip markdown formatting if any
    if (text.includes("```json")) {
      text = text.split("```json")[1].split("```")[0].trim()
    } else if (text.includes("```")) {
      text = text.split("```")[1].split("```")[0].trim()
    }
    const deals = JSON.parse(text)
    res.json(deals)
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    // Return standard offline fallback if API request fails
    res.status(500).json({ error: "Failed to fetch deals from Gemini" })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Festly Backend server running on http://localhost:${PORT}`)
})

