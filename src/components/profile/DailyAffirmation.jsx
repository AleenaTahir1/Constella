import { useState, useEffect } from 'react'

function DailyAffirmation({ sign }) {
  const [affirmation, setAffirmation] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would come from an API
    const affirmations = {
      aries: [
        "I am confident and capable of achieving anything I set my mind to.",
        "My energy and enthusiasm inspire others.",
        "I embrace new beginnings with courage and determination."
      ],
      taurus: [
        "I am grounded and connected to my inner strength.",
        "I attract abundance and prosperity.",
        "I appreciate life's simple pleasures."
      ],
      gemini: [
        "My adaptability is my greatest strength.",
        "I express myself clearly and confidently.",
        "My curiosity leads me to exciting discoveries."
      ],
      cancer: [
        "I nurture myself and others with compassion.",
        "My intuition guides me in the right direction.",
        "I create a safe and loving space wherever I go."
      ],
      leo: [
        "I radiate confidence and inspire others.",
        "My creativity knows no bounds.",
        "I am worthy of love and admiration."
      ],
      virgo: [
        "I trust in my ability to create positive change.",
        "My attention to detail brings excellence to all I do.",
        "I embrace growth and continuous improvement."
      ],
      libra: [
        "I create harmony in my life and relationships.",
        "I make decisions with confidence and grace.",
        "I attract beauty and balance into my life."
      ],
      scorpio: [
        "I embrace transformation and personal growth.",
        "My passion drives me to achieve greatness.",
        "I trust my intuition and inner wisdom."
      ],
      sagittarius: [
        "I embrace adventure and new opportunities.",
        "My optimism lights the way forward.",
        "I learn and grow from every experience."
      ],
      capricorn: [
        "I am capable of achieving all my goals.",
        "My determination knows no bounds.",
        "I create my own success through hard work."
      ],
      aquarius: [
        "My uniqueness is my greatest strength.",
        "I innovate and inspire positive change.",
        "I connect deeply with others while staying true to myself."
      ],
      pisces: [
        "I trust in my creative vision.",
        "My sensitivity is a gift that enriches my life.",
        "I flow gracefully with life's changes."
      ]
    }

    const getRandomAffirmation = () => {
      const signAffirmations = affirmations[sign] || []
      const randomIndex = Math.floor(Math.random() * signAffirmations.length)
      return signAffirmations[randomIndex]
    }

    setAffirmation(getRandomAffirmation())
    setIsLoading(false)
  }, [sign])

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-constellation-secondary/20 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-constellation-secondary/20 rounded w-1/2"></div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <p className="text-xl text-constellation-accent italic">"{affirmation}"</p>
      <button
        className="mt-4 btn btn-primary"
        onClick={() => {
          // In a real app, this would share to social media
          alert('Sharing functionality coming soon!')
        }}
      >
        Share ✨
      </button>
    </div>
  )
}

export default DailyAffirmation
