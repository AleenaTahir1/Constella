import { useState } from 'react'
import { useZodiac } from '../context/ZodiacContext'
import { calculateCompatibility } from '../services/compatibilityService'
import { motion } from 'framer-motion'

function Compatibility() {
  const { userZodiac } = useZodiac()
  const [selectedSign, setSelectedSign] = useState(null)
  const [compatibility, setCompatibility] = useState(null)

  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ]

  const handleSignSelect = (sign) => {
    setSelectedSign(sign)
    if (userZodiac) {
      const analysis = calculateCompatibility(userZodiac, sign)
      setCompatibility(analysis)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 80) return 'text-blue-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-constellation-dark via-constellation-dark/95 to-constellation-dark">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-constellation-accent to-purple-400 bg-clip-text text-transparent"
        >
          Zodiac Compatibility Analysis
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sign Selection */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
              <h2 className="text-2xl font-semibold mb-6">Choose a Sign</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                {zodiacSigns.map((sign) => (
                  <button
                    key={sign}
                    onClick={() => handleSignSelect(sign)}
                    className={`p-4 rounded-lg text-center transition-all ${
                      selectedSign === sign
                        ? 'bg-constellation-accent text-white'
                        : 'bg-constellation-dark/40 hover:bg-constellation-accent/20'
                    }`}
                  >
                    <span className="capitalize">{sign}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Compatibility Results */}
          {compatibility && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Overall Score */}
              <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-8 border border-constellation-accent/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Overall Compatibility</h2>
                  <span className={`text-4xl font-bold ${getScoreColor(compatibility.overallScore)}`}>
                    {compatibility.overallScore}%
                  </span>
                </div>
                <p className="text-lg text-constellation-light/90">
                  {compatibility.compatibility}
                </p>
              </div>

              {/* Detailed Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Elemental Harmony */}
                <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Elemental Harmony</h3>
                    <span className={`text-2xl font-bold ${getScoreColor(compatibility.elementalHarmony.score)}`}>
                      {compatibility.elementalHarmony.score}%
                    </span>
                  </div>
                  <p className="text-constellation-light/90">
                    {compatibility.elementalHarmony.description}
                  </p>
                </div>

                {/* Quality Dynamics */}
                <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Quality Dynamics</h3>
                    <span className={`text-2xl font-bold ${getScoreColor(compatibility.qualityDynamics.score)}`}>
                      {compatibility.qualityDynamics.score}%
                    </span>
                  </div>
                  <p className="text-constellation-light/90">
                    {compatibility.qualityDynamics.description}
                  </p>
                </div>

                {/* Polarity Balance */}
                <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Polarity Balance</h3>
                    <span className={`text-2xl font-bold ${getScoreColor(compatibility.polarityBalance.score)}`}>
                      {compatibility.polarityBalance.score}%
                    </span>
                  </div>
                  <p className="text-constellation-light/90">
                    {compatibility.polarityBalance.description}
                  </p>
                </div>

                {/* Planetary Influence */}
                <div className="bg-constellation-dark/40 backdrop-blur-xl rounded-xl p-6 border border-constellation-accent/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Planetary Influence</h3>
                    <span className={`text-2xl font-bold ${getScoreColor(compatibility.planetaryInfluence.score)}`}>
                      {compatibility.planetaryInfluence.score}%
                    </span>
                  </div>
                  <p className="text-constellation-light/90">
                    {compatibility.planetaryInfluence.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Compatibility
