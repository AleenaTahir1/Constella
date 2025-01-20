import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useZodiac } from '../context/ZodiacContext'
import { motion } from 'framer-motion'
import FloatingCard from '../components/ui/FloatingCard'

function Home() {
  const navigate = useNavigate()
  const { setUserZodiac, setBirthDate } = useZodiac()
  const [birthDate, setBirthDateLocal] = useState('')
  const [zodiacInfo, setZodiacInfo] = useState(null)

  const getZodiacSign = (date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()

    const zodiacSigns = [
      { sign: 'capricorn', element: 'earth', startDate: [12, 22], endDate: [1, 19] },
      { sign: 'aquarius', element: 'air', startDate: [1, 20], endDate: [2, 18] },
      { sign: 'pisces', element: 'water', startDate: [2, 19], endDate: [3, 20] },
      { sign: 'aries', element: 'fire', startDate: [3, 21], endDate: [4, 19] },
      { sign: 'taurus', element: 'earth', startDate: [4, 20], endDate: [5, 20] },
      { sign: 'gemini', element: 'air', startDate: [5, 21], endDate: [6, 20] },
      { sign: 'cancer', element: 'water', startDate: [6, 21], endDate: [7, 22] },
      { sign: 'leo', element: 'fire', startDate: [7, 23], endDate: [8, 22] },
      { sign: 'virgo', element: 'earth', startDate: [8, 23], endDate: [9, 22] },
      { sign: 'libra', element: 'air', startDate: [9, 23], endDate: [10, 22] },
      { sign: 'scorpio', element: 'water', startDate: [10, 23], endDate: [11, 21] },
      { sign: 'sagittarius', element: 'fire', startDate: [11, 22], endDate: [12, 21] }
    ]

    const getDateValue = (month, day) => month * 100 + day
    const dateValue = getDateValue(month, day)

    for (const zodiac of zodiacSigns) {
      const start = getDateValue(...zodiac.startDate)
      const end = getDateValue(...zodiac.endDate)

      // Handle Capricorn's case separately as it spans across year end
      if (zodiac.sign === 'capricorn') {
        if (dateValue >= start || dateValue <= end) {
          return zodiac
        }
      } else if (dateValue >= start && dateValue <= end) {
        return zodiac
      }
    }

    return zodiacSigns[0] // Default to Capricorn if something goes wrong
  }

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    setBirthDateLocal(e.target.value)
    const zodiacData = getZodiacSign(selectedDate)
    setZodiacInfo(zodiacData)
  }

  const handleContinue = () => {
    if (zodiacInfo) {
      setUserZodiac(zodiacInfo.sign)
      setBirthDate(new Date(birthDate)) // Save birth date to context
      navigate('/profile')
    }
  }

  const getElementColor = (element) => {
    const colors = {
      fire: 'from-red-500 to-orange-500',
      water: 'from-blue-500 to-cyan-500',
      air: 'from-purple-500 to-indigo-500',
      earth: 'from-green-500 to-emerald-500'
    }
    return colors[element] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-12 max-w-2xl w-full"
      >
        {/* Title with gradient and glow effect */}
        <h1 className="text-6xl font-bold relative">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent 
            filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            Constella
          </span>
        </h1>

        {/* Subtitle with different gradient */}
        <p className="text-xl bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
          Discover your celestial identity by entering your birth date below.
        </p>

        {/* Form with enhanced styling */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-pink-200 text-lg">
              Enter your birth date
            </label>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <input
                type="date"
                value={birthDate}
                onChange={handleDateChange}
                className="w-full px-6 py-4 bg-indigo-900/40 border-2 border-purple-400/30 rounded-lg
                  text-white placeholder-purple-300 focus:outline-none focus:border-purple-400
                  transition-all duration-300 backdrop-blur-sm
                  group-hover:border-purple-400/50 group-hover:bg-indigo-900/50"
                required
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          </div>

          {zodiacInfo && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg bg-gradient-to-r ${getElementColor(zodiacInfo.element)} bg-opacity-20`}>
                <h2 className="text-2xl font-bold capitalize mb-2">
                  {zodiacInfo.sign}
                </h2>
                <p className="text-lg capitalize">
                  Element: <span className="font-semibold">{zodiacInfo.element}</span>
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                  text-white font-semibold rounded-lg shadow-lg
                  hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
                onClick={handleContinue}
              >
                Continue to Your Profile
              </motion.button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  )
}

export default Home
