const zodiacProperties = {
  aries: {
    element: 'fire',
    quality: 'cardinal',
    polarity: 'yang',
    ruler: 'mars',
    house: 1
  },
  taurus: {
    element: 'earth',
    quality: 'fixed',
    polarity: 'yin',
    ruler: 'venus',
    house: 2
  },
  gemini: {
    element: 'air',
    quality: 'mutable',
    polarity: 'yang',
    ruler: 'mercury',
    house: 3
  },
  cancer: {
    element: 'water',
    quality: 'cardinal',
    polarity: 'yin',
    ruler: 'moon',
    house: 4
  },
  leo: {
    element: 'fire',
    quality: 'fixed',
    polarity: 'yang',
    ruler: 'sun',
    house: 5
  },
  virgo: {
    element: 'earth',
    quality: 'mutable',
    polarity: 'yin',
    ruler: 'mercury',
    house: 6
  },
  libra: {
    element: 'air',
    quality: 'cardinal',
    polarity: 'yang',
    ruler: 'venus',
    house: 7
  },
  scorpio: {
    element: 'water',
    quality: 'fixed',
    polarity: 'yin',
    ruler: 'pluto',
    house: 8
  },
  sagittarius: {
    element: 'fire',
    quality: 'mutable',
    polarity: 'yang',
    ruler: 'jupiter',
    house: 9
  },
  capricorn: {
    element: 'earth',
    quality: 'cardinal',
    polarity: 'yin',
    ruler: 'saturn',
    house: 10
  },
  aquarius: {
    element: 'air',
    quality: 'fixed',
    polarity: 'yang',
    ruler: 'uranus',
    house: 11
  },
  pisces: {
    element: 'water',
    quality: 'mutable',
    polarity: 'yin',
    ruler: 'neptune',
    house: 12
  }
}

// Element compatibility scores
const elementalCompatibility = {
  fire: { fire: 95, air: 90, earth: 65, water: 70 },
  earth: { earth: 95, water: 90, fire: 65, air: 60 },
  air: { air: 90, fire: 90, earth: 60, water: 70 },
  water: { water: 95, earth: 90, fire: 70, air: 65 }
}

// Quality compatibility scores
const qualityCompatibility = {
  cardinal: { cardinal: 85, fixed: 75, mutable: 80 },
  fixed: { fixed: 90, cardinal: 75, mutable: 70 },
  mutable: { mutable: 85, cardinal: 80, fixed: 70 }
}

// Polarity compatibility
const polarityCompatibility = {
  yin: { yin: 85, yang: 90 },
  yang: { yang: 85, yin: 90 }
}

// House harmony scores
function calculateHouseHarmony(house1, house2) {
  const distance = Math.abs(house1 - house2)
  const harmonicAngles = {
    0: 95,  // Conjunction
    4: 90,  // Trine
    3: 85,  // Square
    6: 80,  // Opposition
    2: 75,  // Sextile
    5: 70   // Quincunx
  }
  return harmonicAngles[distance] || 65
}

// Planetary compatibility
const planetaryCompatibility = {
  sun: { moon: 95, venus: 90, mars: 85, mercury: 80 },
  moon: { venus: 90, sun: 95, jupiter: 85, mercury: 80 },
  mercury: { venus: 90, moon: 80, sun: 80, jupiter: 75 },
  venus: { mars: 95, sun: 90, moon: 90, mercury: 90 },
  mars: { venus: 95, sun: 85, jupiter: 80, saturn: 70 },
  jupiter: { sun: 85, moon: 85, venus: 80, saturn: 75 },
  saturn: { jupiter: 75, sun: 70, mars: 70, uranus: 70 },
  uranus: { mercury: 80, jupiter: 75, saturn: 70, neptune: 75 },
  neptune: { venus: 85, moon: 85, uranus: 75, pluto: 80 },
  pluto: { mars: 85, sun: 80, neptune: 80, uranus: 75 }
}

export function calculateCompatibility(sign1, sign2) {
  const sign1Lower = sign1.toLowerCase()
  const sign2Lower = sign2.toLowerCase()
  
  const props1 = zodiacProperties[sign1Lower]
  const props2 = zodiacProperties[sign2Lower]

  if (!props1 || !props2) {
    throw new Error('Invalid zodiac signs')
  }

  // Calculate various compatibility scores
  const elementScore = elementalCompatibility[props1.element][props2.element]
  const qualityScore = qualityCompatibility[props1.quality][props2.quality]
  const polarityScore = polarityCompatibility[props1.polarity][props2.polarity]
  const houseScore = calculateHouseHarmony(props1.house, props2.house)
  
  // Calculate planetary compatibility
  const planetaryScore = planetaryCompatibility[props1.ruler]?.[props2.ruler] || 75

  // Weight the different factors
  const weights = {
    element: 0.35,    // Element harmony is most important
    quality: 0.20,    // Quality compatibility
    polarity: 0.15,   // Yin/Yang balance
    house: 0.15,      // House harmony
    planetary: 0.15   // Planetary rulers
  }

  // Calculate final weighted score
  const totalScore = Math.round(
    elementScore * weights.element +
    qualityScore * weights.quality +
    polarityScore * weights.polarity +
    houseScore * weights.house +
    planetaryScore * weights.planetary
  )

  // Generate detailed compatibility analysis
  const analysis = {
    overallScore: totalScore,
    elementalHarmony: {
      score: elementScore,
      description: getElementalDescription(props1.element, props2.element)
    },
    qualityDynamics: {
      score: qualityScore,
      description: getQualityDescription(props1.quality, props2.quality)
    },
    polarityBalance: {
      score: polarityScore,
      description: getPolarityDescription(props1.polarity, props2.polarity)
    },
    planetaryInfluence: {
      score: planetaryScore,
      description: getPlanetaryDescription(props1.ruler, props2.ruler)
    },
    compatibility: getOverallCompatibilityMessage(totalScore)
  }

  return analysis
}

function getElementalDescription(element1, element2) {
  const descriptions = {
    'fire-fire': 'Passionate and energetic connection with shared enthusiasm',
    'fire-air': 'Dynamic and intellectually stimulating relationship',
    'fire-earth': 'Can help each other grow through differences',
    'fire-water': 'Intense emotional connection with some challenges',
    'earth-earth': 'Strong foundation with shared practical values',
    'earth-water': 'Nurturing and supportive relationship',
    'earth-air': 'Balance between practical and intellectual approaches',
    'air-air': 'Strong mental connection and communication',
    'water-water': 'Deep emotional understanding and intuitive bond'
  }
  
  const key = [element1, element2].sort().join('-')
  return descriptions[key] || 'Unique blend of elemental energies'
}

function getQualityDescription(quality1, quality2) {
  const descriptions = {
    'cardinal-cardinal': 'Both initiate action, may need to compromise on leadership',
    'fixed-fixed': 'Strong stability but may be resistant to change',
    'mutable-mutable': 'Highly adaptable but may lack direction',
    'cardinal-fixed': 'Balance between initiation and stabilization',
    'cardinal-mutable': 'Dynamic relationship with good adaptability',
    'fixed-mutable': 'Combines stability with flexibility'
  }
  
  const key = [quality1, quality2].sort().join('-')
  return descriptions[key]
}

function getPolarityDescription(polarity1, polarity2) {
  if (polarity1 === polarity2) {
    return polarity1 === 'yin' 
      ? 'Shared receptive and introspective energies'
      : 'Shared active and expressive energies'
  }
  return 'Complementary balance of active and receptive energies'
}

function getPlanetaryDescription(planet1, planet2) {
  const score = planetaryCompatibility[planet1]?.[planet2] || 75
  if (score >= 90) return 'Highly harmonious planetary influences'
  if (score >= 80) return 'Supportive planetary energies'
  if (score >= 70) return 'Challenging but growth-promoting planetary aspects'
  return 'Complex planetary dynamics requiring understanding'
}

function getOverallCompatibilityMessage(score) {
  if (score >= 90) {
    return 'Exceptional Match! Your energies naturally harmonize and complement each other perfectly.'
  } else if (score >= 80) {
    return 'Strong Connection! You have great potential for a harmonious and fulfilling relationship.'
  } else if (score >= 70) {
    return 'Good Compatibility! With understanding and communication, you can build a strong bond.'
  } else if (score >= 60) {
    return 'Moderate Compatibility! Your differences can lead to growth and learning.'
  } else {
    return 'Challenging Match! This relationship may require extra effort and understanding.'
  }
}
