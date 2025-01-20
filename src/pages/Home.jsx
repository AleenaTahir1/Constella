import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DatePicker from '../components/inputs/DatePicker'
import { useZodiac } from '../context/ZodiacContext'

export default function Home() {
  const [birthDate, setBirthDate] = useState('')
  const navigate = useNavigate()
  const { setZodiacInfo } = useZodiac()

  const getZodiacSign = (date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    
    const zodiacSigns = [
      { name: 'Capricorn', start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
      { name: 'Aquarius', start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
      { name: 'Pisces', start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
      { name: 'Aries', start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
      { name: 'Taurus', start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
      { name: 'Gemini', start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
      { name: 'Cancer', start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
      { name: 'Leo', start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
      { name: 'Virgo', start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
      { name: 'Libra', start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
      { name: 'Scorpio', start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
      { name: 'Sagittarius', start: { month: 11, day: 22 }, end: { month: 12, day: 21 } },
      { name: 'Capricorn', start: { month: 12, day: 22 }, end: { month: 1, day: 19 } } // Repeated for easier comparison
    ]

    const zodiacSign = zodiacSigns.find(sign => {
      if (sign.start.month <= sign.end.month) {
        return (month === sign.start.month && day >= sign.start.day) || 
               (month === sign.end.month && day <= sign.end.day) ||
               (month > sign.start.month && month < sign.end.month)
      } else {
        return (month === sign.start.month && day >= sign.start.day) || 
               (month === sign.end.month && day <= sign.end.day) ||
               (month > sign.start.month || month < sign.end.month)
      }
    })

    return zodiacSign || zodiacSigns[0]
  }

  const handleDateChange = (date) => {
    setBirthDate(date)
    if (date) {
      const zodiacData = getZodiacSign(new Date(date))
      setZodiacInfo(zodiacData)
      navigate('/profile')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 max-w-xl w-full"
      >
        {/* Title with glow effect */}
        <motion.h1 
          className="text-6xl font-bold text-white relative"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(167, 139, 250, 0.3)",
              "0 0 30px rgba(167, 139, 250, 0.5)",
              "0 0 20px rgba(167, 139, 250, 0.3)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Constella
        </motion.h1>

        {/* Subtitle with improved visibility */}
        <p className="text-gray-100 text-lg font-medium tracking-wide">
          Discover your celestial identity by entering your birth date below.
        </p>

        {/* Date picker container with subtle depth */}
        <div className="bg-constellation-dark/40 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5">
          <div className="space-y-4">
            <label className="block text-gray-100 text-sm font-medium mb-2">
              Enter your birth date
            </label>
            <DatePicker
              value={birthDate}
              onChange={handleDateChange}
              className="w-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
