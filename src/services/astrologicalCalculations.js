// Planetary hours for each day
const planetaryHours = {
  sunday: ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'],
  monday: ['Moon', 'Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury'],
  tuesday: ['Mars', 'Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter'],
  wednesday: ['Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus'],
  thursday: ['Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon', 'Saturn'],
  friday: ['Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars', 'Sun'],
  saturday: ['Saturn', 'Jupiter', 'Mars', 'Sun', 'Venus', 'Mercury', 'Moon']
}

// Zodiac elements and their corresponding colors and numbers
const elementProperties = {
  fire: {
    colors: ['Red', 'Orange', 'Gold', 'Yellow', 'Purple'],
    numbers: [1, 4, 9],
    timeRanges: ['Dawn', 'Noon', 'Sunset']
  },
  earth: {
    colors: ['Green', 'Brown', 'Black', 'Dark Blue'],
    numbers: [2, 5, 8],
    timeRanges: ['Mid-morning', 'Late afternoon', 'Midnight']
  },
  air: {
    colors: ['Light Blue', 'White', 'Gray', 'Silver'],
    numbers: [3, 6, 11],
    timeRanges: ['Early morning', 'Dusk', 'Late night']
  },
  water: {
    colors: ['Blue', 'Aqua', 'Turquoise', 'Sea Green'],
    numbers: [7, 10, 12],
    timeRanges: ['Morning', 'Evening', 'Night']
  }
}

// Zodiac compatibility based on elements
const elementalCompatibility = {
  fire: {
    matches: [
      { sign: 'aries', compatibility: 'Perfect match - fellow fire sign' },
      { sign: 'leo', compatibility: 'Dynamic duo - fire harmony' },
      { sign: 'sagittarius', compatibility: 'Adventurous pair - fire spirits' },
      { sign: 'libra', compatibility: 'Balanced connection - air feeds fire' },
      { sign: 'aquarius', compatibility: 'Innovative pair - air enhances fire' },
      { sign: 'gemini', compatibility: 'Exciting match - air sparks fire' }
    ]
  },
  earth: {
    matches: [
      { sign: 'taurus', compatibility: 'Perfect match - fellow earth sign' },
      { sign: 'virgo', compatibility: 'Practical pair - earth harmony' },
      { sign: 'capricorn', compatibility: 'Power couple - earth stability' },
      { sign: 'cancer', compatibility: 'Nurturing bond - water nourishes earth' },
      { sign: 'scorpio', compatibility: 'Deep connection - water enriches earth' },
      { sign: 'pisces', compatibility: 'Soulful match - water grounds earth' }
    ]
  },
  air: {
    matches: [
      { sign: 'gemini', compatibility: 'Perfect match - fellow air sign' },
      { sign: 'libra', compatibility: 'Harmonious pair - air flow' },
      { sign: 'aquarius', compatibility: 'Intellectual duo - air synergy' },
      { sign: 'aries', compatibility: 'Dynamic spark - fire energizes air' },
      { sign: 'leo', compatibility: 'Creative pair - fire inspires air' },
      { sign: 'sagittarius', compatibility: 'Adventurous match - fire lifts air' }
    ]
  },
  water: {
    matches: [
      { sign: 'cancer', compatibility: 'Perfect match - fellow water sign' },
      { sign: 'scorpio', compatibility: 'Deep bond - water flow' },
      { sign: 'pisces', compatibility: 'Spiritual pair - water harmony' },
      { sign: 'taurus', compatibility: 'Grounding match - earth contains water' },
      { sign: 'virgo', compatibility: 'Supportive duo - earth channels water' },
      { sign: 'capricorn', compatibility: 'Powerful pair - earth stabilizes water' }
    ]
  }
}

// Calculate numerological number based on birth date
function calculateLifePathNumber(birthDate) {
  const dateString = birthDate.toISOString().split('T')[0].replace(/-/g, '')
  let sum = 0
  for (let digit of dateString) {
    sum += parseInt(digit)
  }
  while (sum > 9) {
    let newSum = 0
    while (sum > 0) {
      newSum += sum % 10
      sum = Math.floor(sum / 10)
    }
    sum = newSum
  }
  return sum
}

// Get zodiac element
function getZodiacElement(sign) {
  const elements = {
    aries: 'fire',
    leo: 'fire',
    sagittarius: 'fire',
    taurus: 'earth',
    virgo: 'earth',
    capricorn: 'earth',
    gemini: 'air',
    libra: 'air',
    aquarius: 'air',
    cancer: 'water',
    scorpio: 'water',
    pisces: 'water'
  }
  return elements[sign.toLowerCase()]
}

// Calculate lucky properties based on birth date and zodiac sign
export function calculateLuckyProperties(birthDate, zodiacSign) {
  const element = getZodiacElement(zodiacSign)
  const lifePathNumber = calculateLifePathNumber(birthDate)
  
  // Get element-based properties
  const elementProps = elementProperties[element]
  
  // Calculate lucky number based on life path and element
  const baseNumber = elementProps.numbers[lifePathNumber % elementProps.numbers.length]
  const luckyNumber = (baseNumber + lifePathNumber) % 12 || 12
  
  // Get lucky color based on life path and element
  const luckyColor = elementProps.colors[lifePathNumber % elementProps.colors.length]
  
  // Get lucky time based on element
  const luckyTime = elementProps.timeRanges[lifePathNumber % elementProps.timeRanges.length]
  
  // Calculate best match based on elemental compatibility
  const compatibleMatches = elementalCompatibility[element].matches
  const matchIndex = (lifePathNumber + new Date().getDate()) % compatibleMatches.length
  const bestMatch = compatibleMatches[matchIndex]

  // Calculate mood based on birth date and zodiac
  const moods = [
    'Focused', 'Energetic', 'Creative', 'Peaceful',
    'Ambitious', 'Intuitive', 'Analytical', 'Passionate',
    'Balanced', 'Inspired', 'Determined', 'Harmonious'
  ]
  const moodIndex = (lifePathNumber + elementProps.numbers[0]) % moods.length
  const mood = moods[moodIndex]

  return {
    lucky_number: luckyNumber,
    color: luckyColor,
    lucky_time: luckyTime,
    compatibility: bestMatch.compatibility,
    mood: mood,
    element: element
  }
}
