import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function HoroscopeWheel({ sign }) {
  const [selectedAspect, setSelectedAspect] = useState('love')
  const [prediction, setPrediction] = useState('')

  const aspects = [
    { id: 'love', name: 'Love', icon: '❤️' },
    { id: 'career', name: 'Career', icon: '💼' },
    { id: 'health', name: 'Health', icon: '🌟' },
    { id: 'fortune', name: 'Fortune', icon: '🎯' }
  ]

  useEffect(() => {
    // In a real app, this would fetch from an API
    const predictions = {
      love: {
        aries: "Romance is in the air! Your passionate nature attracts admirers.",
        taurus: "A stable and loving relationship brings joy to your life.",
        // Add predictions for other signs
      },
      career: {
        aries: "Your leadership skills shine bright in upcoming projects.",
        taurus: "Financial opportunities arise through careful planning.",
        // Add predictions for other signs
      },
      health: {
        aries: "Channel your energy into new fitness goals.",
        taurus: "Focus on balance between work and rest.",
        // Add predictions for other signs
      },
      fortune: {
        aries: "Lucky numbers bring unexpected opportunities.",
        taurus: "Your patience will be rewarded abundantly.",
        // Add predictions for other signs
      }
    }

    setPrediction(predictions[selectedAspect]?.[sign] || "The stars are aligning for something special...")
  }, [selectedAspect, sign])

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {aspects.map((aspect) => (
          <motion.button
            key={aspect.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-lg transition-all ${
              selectedAspect === aspect.id
                ? 'bg-constellation-accent text-white'
                : 'bg-constellation-secondary/20 hover:bg-constellation-secondary/30'
            }`}
            onClick={() => setSelectedAspect(aspect.id)}
          >
            <span className="text-2xl block mb-2">{aspect.icon}</span>
            <span className="block">{aspect.name}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        key={selectedAspect}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center p-4 rounded-lg bg-constellation-secondary/20"
      >
        <p className="text-lg">{prediction}</p>
      </motion.div>
    </div>
  )
}

export default HoroscopeWheel
