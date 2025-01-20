import { calculateLuckyProperties } from './astrologicalCalculations'

// Horoscope descriptions for different days
const horoscopeDescriptions = {
  aries: {
    yesterday: "Yesterday was about reflection. Your pioneering spirit helped you overcome challenges.",
    today: "Your natural leadership abilities are shining through today. Take initiative on projects you've been hesitating about.",
    tomorrow: "Tomorrow brings exciting opportunities. Your courage will help you seize the moment."
  },
  taurus: {
    yesterday: "Your practical approach yesterday led to tangible results. Stability was your strength.",
    today: "Focus on growth and material success today. Your determination will help you achieve your goals.",
    tomorrow: "New opportunities for financial growth appear tomorrow. Trust your instincts about resources."
  },
  gemini: {
    yesterday: "Your adaptability served you well yesterday. Communication brought unexpected benefits.",
    today: "Your quick wit and versatility are your greatest assets today. Express your ideas freely.",
    tomorrow: "Tomorrow brings interesting conversations and connections. Stay open to different perspectives."
  },
  cancer: {
    yesterday: "Your intuition guided you well yesterday. Emotional connections were strengthened.",
    today: "Trust your feelings today. Your emotional intelligence will help navigate important decisions.",
    tomorrow: "Tomorrow brings emotional clarity. Family connections will be especially important."
  },
  leo: {
    yesterday: "Your confidence illuminated the path for others yesterday. Leadership came naturally.",
    today: "Your creative energy is at its peak. Express yourself boldly and inspire others.",
    tomorrow: "Tomorrow brings opportunities to shine. Your natural charisma will attract positive attention."
  },
  virgo: {
    yesterday: "Your attention to detail made a difference yesterday. Precision led to success.",
    today: "Focus on organizing and planning. Your analytical skills will prove invaluable.",
    tomorrow: "Tomorrow brings chances to perfect your methods. Pay attention to the small details."
  },
  libra: {
    yesterday: "Your diplomatic skills resolved tensions yesterday. Harmony was restored through your efforts.",
    today: "Seek balance in all things today. Your charm will help smooth over any conflicts.",
    tomorrow: "Tomorrow brings opportunities for collaboration. Your diplomatic nature will be appreciated."
  },
  scorpio: {
    yesterday: "Your intensity brought transformation yesterday. Hidden truths came to light.",
    today: "Trust your instincts today. Your determination will lead to meaningful discoveries.",
    tomorrow: "Tomorrow brings powerful revelations. Your investigative nature will uncover opportunities."
  },
  sagittarius: {
    yesterday: "Your optimism opened doors yesterday. Adventure brought valuable lessons.",
    today: "Expand your horizons today. Your adventurous spirit will lead to exciting discoveries.",
    tomorrow: "Tomorrow brings new adventures. Your optimistic outlook will create opportunities."
  },
  capricorn: {
    yesterday: "Your discipline paid off yesterday. Structure brought success.",
    today: "Focus on your long-term goals today. Your practical approach will yield results.",
    tomorrow: "Tomorrow brings progress in your ambitions. Stay focused on your objectives."
  },
  aquarius: {
    yesterday: "Your innovative ideas sparked change yesterday. Uniqueness was your strength.",
    today: "Think outside the box today. Your unique perspective will bring fresh solutions.",
    tomorrow: "Tomorrow brings revolutionary ideas. Your humanitarian spirit will inspire others."
  },
  pisces: {
    yesterday: "Your compassion made a difference yesterday. Intuition guided you well.",
    today: "Trust your inner voice today. Your creative inspiration will flow naturally.",
    tomorrow: "Tomorrow brings spiritual insights. Your empathic nature will help others."
  }
}

export async function getDailyHoroscope(sign, day = 'today', birthDate) {
  try {
    const signLower = sign.toLowerCase()
    const luckyProps = calculateLuckyProperties(new Date(birthDate), signLower)
    
    // Get the appropriate description based on day
    const description = horoscopeDescriptions[signLower][day]
    
    // Format date based on the selected day
    const date = new Date()
    if (day === 'yesterday') date.setDate(date.getDate() - 1)
    if (day === 'tomorrow') date.setDate(date.getDate() + 1)
    
    return {
      description,
      date: date.toLocaleDateString('en-US', {
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
  } catch (error) {
    console.error('Error generating horoscope:', error)
    throw new Error('Failed to generate horoscope')
  }
}

// Cache horoscope data
const horoscopeCache = new Map()

export async function getCachedHoroscope(sign, day = 'today', birthDate) {
  const cacheKey = `${sign}-${day}-${new Date().toDateString()}`
  
  if (horoscopeCache.has(cacheKey)) {
    return horoscopeCache.get(cacheKey)
  }
  
  const data = await getDailyHoroscope(sign, day, birthDate)
  horoscopeCache.set(cacheKey, data)
  
  return data
}
