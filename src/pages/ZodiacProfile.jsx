import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useZodiac } from '../context/ZodiacContext'
import { getHoroscope } from '../services/horoscopeService'
import { zodiacTraits } from '../data/zodiacTraits'
import { motion } from 'framer-motion'

function ZodiacProfile() {
  const navigate = useNavigate()
  const { userZodiac, birthDate } = useZodiac()
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfileData() {
      try {
        if (!userZodiac) {
          navigate('/')
          return
        }

        const sign = userZodiac.toLowerCase()
        if (!zodiacTraits[sign]) {
          console.error('Invalid zodiac sign:', sign)
          navigate('/')
          return
        }

        setLoading(true)
        const horoscopeData = await getHoroscope(sign, birthDate)
        setProfileData({
          ...horoscopeData,
          traits: zodiacTraits[sign]
        })
      } catch (error) {
        console.error('Error fetching profile data:', error)
        // Set some default data in case the calculations fail
        if (userZodiac) {
          const sign = userZodiac.toLowerCase()
          setProfileData({
            description: "Unable to calculate your horoscope at this time. Please try again later.",
            compatibility: "N/A",
            mood: "Contemplative",
            color: "Blue",
            lucky_number: "7",
            lucky_time: "12:00 PM",
            traits: zodiacTraits[sign]
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [userZodiac, birthDate, navigate])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="w-12 h-12 border-2 border-constellation-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!profileData) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-constellation-dark via-constellation-dark/95 to-constellation-dark">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-constellation-accent/20"></div>
              <div className="relative z-10 text-8xl">{profileData.traits.symbol}</div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 capitalize bg-gradient-to-r from-constellation-accent to-purple-400 bg-clip-text text-transparent">
            {userZodiac}
          </h1>
          <p className="text-xl text-constellation-light/80 max-w-2xl mx-auto">
            {profileData.traits.element_traits}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personality */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10"
            >
              <h2 className="text-2xl font-semibold mb-6">Strengths</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.traits.strengths.map((strength, index) => (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    key={strength}
                    className="px-4 py-2 rounded-full bg-green-500/10 text-green-300 border border-green-500/20"
                  >
                    {strength}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10"
            >
              <h2 className="text-2xl font-semibold mb-6">Weaknesses</h2>
              <div className="flex flex-wrap gap-2">
                {profileData.traits.weaknesses.map((weakness, index) => (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    key={weakness}
                    className="px-4 py-2 rounded-full bg-red-500/10 text-red-300 border border-red-500/20"
                  >
                    {weakness}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Daily Horoscope */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-8 border border-constellation-accent/10">
              <h2 className="text-2xl font-semibold mb-6">Today's Celestial Insights</h2>
              <p className="text-lg leading-relaxed mb-8 text-constellation-light/90">
                {profileData.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-constellation-dark/40 rounded-lg p-4">
                  <h3 className="text-constellation-accent mb-2">Today's Mood</h3>
                  <p className="text-lg capitalize">{profileData.mood}</p>
                </div>
                <div className="bg-constellation-dark/40 rounded-lg p-4">
                  <h3 className="text-constellation-accent mb-2">Lucky Color</h3>
                  <p className="text-lg capitalize">{profileData.color}</p>
                </div>
                <div className="bg-constellation-dark/40 rounded-lg p-4">
                  <h3 className="text-constellation-accent mb-2">Best Match Today</h3>
                  <p className="text-lg capitalize">
                    {profileData.compatibility === "N/A" ? "N/A" : `${profileData.compatibility} (${profileData.compatibility_percentage}%)`}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-constellation-dark/40 rounded-lg p-4">
                  <h3 className="text-constellation-accent mb-2">Lucky Number</h3>
                  <p className="text-lg">{profileData.lucky_number}</p>
                </div>
                <div className="bg-constellation-dark/40 rounded-lg p-4">
                  <h3 className="text-constellation-accent mb-2">Lucky Time</h3>
                  <p className="text-lg">{profileData.lucky_time}</p>
                </div>
                <div className="bg-constellation-dark/40 rounded-lg p-4">
                  <h3 className="text-constellation-accent mb-2">Date Range</h3>
                  <p className="text-lg">{profileData.date_range}</p>
                </div>
                <div className="bg-constellation-dark/40 rounded-lg p-4">
                  <h3 className="text-constellation-accent mb-2">Current Date</h3>
                  <p className="text-lg">{new Date(profileData.current_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                <h2 className="text-2xl font-semibold mb-6">Likes</h2>
                <ul className="space-y-3">
                  {profileData.traits.likes.map((like, index) => (
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={like}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-constellation-accent">•</span>
                      <span>{like}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                <h2 className="text-2xl font-semibold mb-6">Dislikes</h2>
                <ul className="space-y-3">
                  {profileData.traits.dislikes.map((dislike, index) => (
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={dislike}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-red-400">•</span>
                      <span>{dislike}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Celestial Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-8 border border-constellation-accent/10"
        >
          <h2 className="text-2xl font-semibold mb-6">Celestial Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-constellation-accent mb-2">Ruling Planet</h3>
              <p className="text-lg">{profileData.traits.ruling_planet}</p>
            </div>
            <div>
              <h3 className="text-constellation-accent mb-2">Quality</h3>
              <p className="text-lg">{profileData.traits.quality}</p>
            </div>
            <div>
              <h3 className="text-constellation-accent mb-2">Lucky Number</h3>
              <p className="text-lg">{profileData.lucky_number}</p>
            </div>
            <div>
              <h3 className="text-constellation-accent mb-2">Lucky Time</h3>
              <p className="text-lg">{profileData.lucky_time}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ZodiacProfile
