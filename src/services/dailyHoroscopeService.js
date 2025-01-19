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

export async function getDailyHoroscope(sign, day = 'today') {
  try {
    // First try the Aztro API
    const response = await fetch(
      `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('API request failed')
    }
    
    const data = await response.json()
    return {
      description: data.description,
      date: data.current_date,
      compatibility: data.compatibility,
      mood: data.mood,
      color: data.color,
      lucky_number: data.lucky_number,
      lucky_time: data.lucky_time
    }
  } catch (error) {
    console.error('Error fetching from Aztro API:', error)
    
    // Use fallback data if API fails
    const signLower = sign.toLowerCase()
    if (fallbackHoroscopes[signLower]) {
      const today = new Date()
      return {
        ...fallbackHoroscopes[signLower],
        date: today.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    }
    
    throw new Error('Failed to get horoscope data')
  }
}

// Cache horoscope data to avoid too many API calls
const horoscopeCache = new Map()

export async function getCachedHoroscope(sign, day = 'today') {
  const cacheKey = `${sign}-${day}`
  
  // Check if we have cached data and it's from today
  if (horoscopeCache.has(cacheKey)) {
    const cachedData = horoscopeCache.get(cacheKey)
    const cacheDate = new Date(cachedData.timestamp)
    const now = new Date()
    
    // Use cache if it's from the same day
    if (
      cacheDate.getDate() === now.getDate() &&
      cacheDate.getMonth() === now.getMonth() &&
      cacheDate.getFullYear() === now.getFullYear()
    ) {
      return cachedData.data
    }
  }
  
  // Fetch fresh data
  const data = await getDailyHoroscope(sign, day)
  
  // Cache the data with timestamp
  horoscopeCache.set(cacheKey, {
    data,
    timestamp: new Date()
  })
  
  return data
}
