import { calculateLuckyProperties } from './astrologicalCalculations'

// Horoscope descriptions that don't change daily
const horoscopeDescriptions = {
  aries: "As an Aries, you possess natural leadership abilities and a pioneering spirit. Your dynamic energy and enthusiasm inspire others. Focus on channeling your passion into meaningful pursuits while practicing patience.",
  taurus: "Your grounded nature and appreciation for life's pleasures make you reliable and resourceful. As a Taurus, you excel in building lasting foundations. Remember to stay flexible while maintaining your steady course.",
  gemini: "With your quick wit and adaptable nature, you bring versatility to any situation. Your intellectual curiosity drives you to explore various interests. Balance your dual nature by focusing on depth alongside breadth.",
  cancer: "Your intuitive and nurturing spirit creates deep emotional connections. As a Cancer, you have a unique ability to understand others' feelings. Use your protective nature wisely while allowing yourself to grow.",
  leo: "Natural charisma and creative energy make you stand out in any crowd. Your generous spirit and warm heart draw people to you. Channel your leadership abilities while remaining mindful of others' needs.",
  virgo: "Your analytical mind and attention to detail make you an excellent problem-solver. As a Virgo, you have a gift for improvement and refinement. Balance your perfectionist tendencies with self-acceptance.",
  libra: "Harmony and balance are your guiding principles. Your diplomatic nature and sense of justice make you an excellent mediator. While seeking harmony, remember to honor your own needs.",
  scorpio: "Your intensity and determination give you unmatched focus and depth. As a Scorpio, you have powerful intuition and emotional intelligence. Use your transformative energy wisely.",
  sagittarius: "Adventure and philosophical pursuit drive your spirit. Your optimistic outlook and love of learning make you an inspiring presence. Balance your quest for expansion with practical grounding.",
  capricorn: "Ambition and discipline are your natural strengths. As a Capricorn, you excel in building lasting achievements. While climbing your mountain of success, remember to enjoy the journey.",
  aquarius: "Your innovative mind and humanitarian spirit make you a natural visionary. As an Aquarius, you bring unique perspectives and solutions. Balance your idealism with practical application.",
  pisces: "Artistic sensitivity and emotional depth give you profound creative potential. Your compassionate nature connects deeply with others. Ground your intuitive gifts while maintaining healthy boundaries."
}

export async function getHoroscope(sign, birthDate = new Date()) {
  try {
    const signLower = sign.toLowerCase()
    const luckyProps = calculateLuckyProperties(birthDate, signLower)
    
    // Format the current date
    const today = new Date()
    const formattedDate = today.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    // Capitalize the best match
    const bestMatch = luckyProps.compatibility
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    return {
      description: horoscopeDescriptions[signLower],
      ...luckyProps,
      compatibility: bestMatch,
      current_date: formattedDate,
      date_range: getDateRange(signLower)
    }
  } catch (error) {
    console.error('Error calculating horoscope:', error)
    throw error
  }
}

function getDateRange(sign) {
  const dateRanges = {
    aries: 'March 21 - April 19',
    taurus: 'April 20 - May 20',
    gemini: 'May 21 - June 20',
    cancer: 'June 21 - July 22',
    leo: 'July 23 - August 22',
    virgo: 'August 23 - September 22',
    libra: 'September 23 - October 22',
    scorpio: 'October 23 - November 21',
    sagittarius: 'November 22 - December 21',
    capricorn: 'December 22 - January 19',
    aquarius: 'January 20 - February 18',
    pisces: 'February 19 - March 20'
  }
  return dateRanges[sign]
}
