import { useState, useEffect } from 'react'
import { useZodiac } from '../context/ZodiacContext'
import { getCachedHoroscope } from '../services/dailyHoroscopeService'
import { motion, AnimatePresence } from 'framer-motion'

function Horoscope() {
  const { userZodiac, birthDate } = useZodiac()
  const [selectedDay, setSelectedDay] = useState('today')
  const [horoscope, setHoroscope] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchHoroscope() {
      console.log('Fetching horoscope with:', { userZodiac, birthDate, selectedDay })
      
      if (!userZodiac) {
        console.log('No zodiac sign found')
        setError('Please set your zodiac sign in your profile first')
        setLoading(false)
        return
      }

      if (!birthDate) {
        console.log('No birth date found')
        setError('Please set your birth date in your profile first')
        setLoading(false)
        return
      }
      
      try {
        setLoading(true)
        setError(null)
        const data = await getCachedHoroscope(userZodiac, selectedDay, birthDate)
        console.log('Horoscope data received:', data)
        setHoroscope(data)
      } catch (error) {
        console.error('Failed to fetch horoscope:', error)
        setError('Unable to load your horoscope. Please make sure your zodiac sign and birth date are set correctly.')
      } finally {
        setLoading(false)
      }
    }

    fetchHoroscope()
  }, [userZodiac, selectedDay, birthDate])

  if (!userZodiac || !birthDate) {
    return (
      <div className="min-h-screen bg-constellation-dark flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-constellation-light text-lg mb-4">
            {!userZodiac && !birthDate 
              ? "Please set your birth date and zodiac sign in your profile"
              : !userZodiac 
                ? "Please set your zodiac sign in your profile"
                : "Please set your birth date in your profile"}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/profile'}
            className="px-6 py-2 bg-constellation-accent text-white rounded-full hover:bg-constellation-accent/90 transition-colors"
          >
            Go to Profile
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-constellation-dark via-constellation-dark/95 to-constellation-dark">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-constellation-accent to-purple-400 bg-clip-text text-transparent"
        >
          Your {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} Horoscope
        </motion.h1>

        {/* Day Selection */}
        <div className="flex justify-center space-x-4 mb-12">
          {['yesterday', 'today', 'tomorrow'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedDay === day
                  ? 'bg-constellation-accent text-white'
                  : 'text-constellation-light hover:bg-constellation-accent/20'
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-12"
            >
              <div className="w-12 h-12 border-4 border-constellation-accent border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-center py-8"
            >
              <p className="mb-4">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/profile'}
                className="px-6 py-2 bg-constellation-accent text-white rounded-full hover:bg-constellation-accent/90 transition-colors"
              >
                Update Profile
              </motion.button>
            </motion.div>
          ) : horoscope ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Main Prediction */}
              <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-8 border border-constellation-accent/10">
                <h2 className="text-2xl font-semibold mb-4 text-constellation-accent">
                  Daily Prediction for {userZodiac}
                </h2>
                <p className="text-lg leading-relaxed text-constellation-light">
                  {horoscope.description}
                </p>
                <p className="mt-4 text-constellation-light/70">
                  {horoscope.date}
                </p>
              </div>

              {/* Lucky Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                  <h3 className="text-xl font-semibold mb-3 text-constellation-accent">
                    Mood
                  </h3>
                  <p className="text-lg text-constellation-light">
                    {horoscope.mood}
                  </p>
                </div>

                <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                  <h3 className="text-xl font-semibold mb-3 text-constellation-accent">
                    Lucky Color
                  </h3>
                  <p className="text-lg text-constellation-light">
                    {horoscope.color}
                  </p>
                </div>

                <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                  <h3 className="text-xl font-semibold mb-3 text-constellation-accent">
                    Compatible With
                  </h3>
                  <p className="text-lg text-constellation-light">
                    {horoscope.compatibility}
                  </p>
                </div>

                <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                  <h3 className="text-xl font-semibold mb-3 text-constellation-accent">
                    Lucky Number
                  </h3>
                  <p className="text-lg text-constellation-light">
                    {horoscope.lucky_number}
                  </p>
                </div>

                <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                  <h3 className="text-xl font-semibold mb-3 text-constellation-accent">
                    Lucky Time
                  </h3>
                  <p className="text-lg text-constellation-light">
                    {horoscope.lucky_time}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Horoscope
