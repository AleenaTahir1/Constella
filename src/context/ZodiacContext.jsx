import { createContext, useContext, useState } from 'react'

const ZodiacContext = createContext()

export const useZodiac = () => {
  const context = useContext(ZodiacContext)
  if (!context) {
    throw new Error('useZodiac must be used within a ZodiacProvider')
  }
  return context
}

export function ZodiacProvider({ children }) {
  const [userZodiac, setUserZodiac] = useState(null)
  const [birthDate, setBirthDate] = useState(null)
  const [theme, setTheme] = useState('dark')
  const [customizations, setCustomizations] = useState({
    background: null,
    fontStyle: 'default',
    colorScheme: 'default'
  })

  const zodiacSigns = {
    aries: { element: 'fire', symbol: '♈', dates: 'March 21 - April 19' },
    taurus: { element: 'earth', symbol: '♉', dates: 'April 20 - May 20' },
    gemini: { element: 'air', symbol: '♊', dates: 'May 21 - June 20' },
    cancer: { element: 'water', symbol: '♋', dates: 'June 21 - July 22' },
    leo: { element: 'fire', symbol: '♌', dates: 'July 23 - August 22' },
    virgo: { element: 'earth', symbol: '♍', dates: 'August 23 - September 22' },
    libra: { element: 'air', symbol: '♎', dates: 'September 23 - October 22' },
    scorpio: { element: 'water', symbol: '♏', dates: 'October 23 - November 21' },
    sagittarius: { element: 'fire', symbol: '♐', dates: 'November 22 - December 21' },
    capricorn: { element: 'earth', symbol: '♑', dates: 'December 22 - January 19' },
    aquarius: { element: 'air', symbol: '♒', dates: 'January 20 - February 18' },
    pisces: { element: 'water', symbol: '♓', dates: 'February 19 - March 20' }
  }

  const getZodiacByDate = (date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    
    // Logic to determine zodiac sign based on date
    // This is a simplified version - you might want to add more precise calculations
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries'
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus'
    // ... add other zodiac sign calculations
  }

  const value = {
    userZodiac,
    setUserZodiac,
    birthDate,
    setBirthDate,
    theme,
    setTheme,
    customizations,
    setCustomizations,
    zodiacSigns,
    getZodiacByDate
  }

  return (
    <ZodiacContext.Provider value={value}>
      {children}
    </ZodiacContext.Provider>
  )
}
