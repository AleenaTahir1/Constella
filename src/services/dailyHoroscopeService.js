// Fallback horoscope data in case API fails
const fallbackHoroscopes = {
  aries: {
    description: "Today is a powerful day for taking initiative. Your natural leadership abilities are heightened, making it an excellent time for starting new projects or inspiring others.",
    mood: "Energetic",
    color: "Red",
    lucky_number: "9",
    lucky_time: "8:00 AM",
    compatibility: "Leo"
  },
  taurus: {
    description: "Focus on practical matters today. Your natural ability to create comfort and stability will help you make important decisions about your resources and relationships.",
    mood: "Determined",
    color: "Green",
    lucky_number: "6",
    lucky_time: "5:30 PM",
    compatibility: "Virgo"
  },
  gemini: {
    description: "Your communication skills are particularly sharp today. Use this time to express your ideas and connect with others. Learning opportunities are abundant.",
    mood: "Curious",
    color: "Yellow",
    lucky_number: "5",
    lucky_time: "3:00 PM",
    compatibility: "Libra"
  },
  cancer: {
    description: "Trust your intuition today. Your emotional intelligence will guide you through important decisions. Focus on home and family matters.",
    mood: "Intuitive",
    color: "Silver",
    lucky_number: "2",
    lucky_time: "10:00 PM",
    compatibility: "Scorpio"
  },
  leo: {
    description: "Your natural charisma is magnified today. Use this energy to inspire others and pursue your creative passions. Leadership opportunities may arise.",
    mood: "Confident",
    color: "Gold",
    lucky_number: "1",
    lucky_time: "12:00 PM",
    compatibility: "Aries"
  },
  virgo: {
    description: "Your analytical skills are heightened today. Perfect time for organizing, planning, and paying attention to details. Health and wellness are in focus.",
    mood: "Analytical",
    color: "Navy",
    lucky_number: "4",
    lucky_time: "7:00 AM",
    compatibility: "Taurus"
  },
  libra: {
    description: "Harmony and balance are key themes today. Your diplomatic skills will help resolve conflicts and strengthen relationships. Focus on partnerships.",
    mood: "Harmonious",
    color: "Pink",
    lucky_number: "7",
    lucky_time: "6:30 PM",
    compatibility: "Gemini"
  },
  scorpio: {
    description: "Your investigative nature is enhanced today. Perfect for solving mysteries or diving deep into research. Transformation is possible in key areas of life.",
    mood: "Mysterious",
    color: "Maroon",
    lucky_number: "8",
    lucky_time: "9:00 PM",
    compatibility: "Cancer"
  },
  sagittarius: {
    description: "Adventure calls today! Your optimistic outlook will open new doors. Perfect time for travel, learning, or exploring philosophical ideas.",
    mood: "Adventurous",
    color: "Purple",
    lucky_number: "3",
    lucky_time: "4:00 PM",
    compatibility: "Aquarius"
  },
  capricorn: {
    description: "Focus on your goals today. Your disciplined approach will help you make significant progress in your career or long-term projects.",
    mood: "Ambitious",
    color: "Brown",
    lucky_number: "8",
    lucky_time: "8:00 AM",
    compatibility: "Taurus"
  },
  aquarius: {
    description: "Your innovative ideas are flowing today. Perfect time for brainstorming or connecting with like-minded individuals. Embrace your uniqueness.",
    mood: "Inventive",
    color: "Electric Blue",
    lucky_number: "11",
    lucky_time: "2:00 PM",
    compatibility: "Gemini"
  },
  pisces: {
    description: "Your creativity and intuition are heightened today. Perfect for artistic pursuits or spiritual practices. Pay attention to your dreams.",
    mood: "Creative",
    color: "Sea Green",
    lucky_number: "7",
    lucky_time: "11:00 PM",
    compatibility: "Scorpio"
  }
}

import { calculateLuckyProperties } from './astrologicalCalculations'

// Fallback data in case API fails
const fallbackDescriptions = {
  aries: "Today is a day of new beginnings. Your natural leadership abilities will shine through.",
  taurus: "Focus on stability and growth today. Your practical nature will help you achieve your goals.",
  gemini: "Communication is key today. Your adaptable nature will help you navigate challenges.",
  cancer: "Trust your intuition today. Your emotional intelligence will guide you well.",
  leo: "Your creative energy is at its peak. Express yourself boldly and confidently.",
  virgo: "Pay attention to details today. Your analytical skills will prove valuable.",
  libra: "Seek balance in all things today. Your diplomatic nature will help resolve conflicts.",
  scorpio: "Trust your instincts today. Your determination will lead to success.",
  sagittarius: "Adventure calls today. Your optimistic outlook will open new doors.",
  capricorn: "Focus on your goals today. Your disciplined approach will yield results.",
  aquarius: "Innovation is key today. Your unique perspective will bring fresh solutions.",
  pisces: "Listen to your inner voice today. Your intuitive nature will guide you well."
}

export async function getDailyHoroscope(sign, day = 'today', birthDate) {
  try {
    // Get the description from Aztro API
    const response = await fetch(
      `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`,
      {
        method: 'POST'
      }
    )
    
    if (!response.ok) {
      throw new Error('API request failed')
    }
    
    const aztroData = await response.json()
    
    // Get consistent lucky properties from profile calculations
    const luckyProps = calculateLuckyProperties(new Date(birthDate), sign.toLowerCase())
    
    return {
      description: aztroData.description,
      date: aztroData.current_date,
      compatibility: luckyProps.compatibility,
      mood: luckyProps.mood,
      color: luckyProps.color,
      lucky_number: luckyProps.lucky_number,
      lucky_time: luckyProps.lucky_time
    }
  } catch (error) {
    console.error('Error fetching horoscope:', error)
    
    // Use fallback data if API fails
    const signLower = sign.toLowerCase()
    const luckyProps = calculateLuckyProperties(new Date(birthDate), signLower)
    
    return {
      description: fallbackDescriptions[signLower] || "Take time to reflect and plan your next steps wisely.",
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      compatibility: luckyProps.compatibility,
      mood: luckyProps.mood,
      color: luckyProps.color,
      lucky_number: luckyProps.lucky_number,
      lucky_time: luckyProps.lucky_time
    }
  }
}

// Cache horoscope data to avoid too many API calls
const horoscopeCache = new Map()

export async function getCachedHoroscope(sign, day = 'today', birthDate) {
  const cacheKey = `${sign}-${day}-${new Date().toDateString()}`
  
  // Check if we have cached data and it's from today
  if (horoscopeCache.has(cacheKey)) {
    return horoscopeCache.get(cacheKey)
  }
  
  // Fetch fresh data
  const data = await getDailyHoroscope(sign, day, birthDate)
  
  // Cache the data
  horoscopeCache.set(cacheKey, data)
  
  return data
}
