import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DatePicker from '../components/inputs/DatePicker'

export default function Home() {
  const [birthDate, setBirthDate] = useState('')
  const navigate = useNavigate()

  const handleDateSubmit = (date) => {
    if (date) {
      navigate('/profile', { state: { birthDate: date } })
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 max-w-xl mx-auto"
      >
        {/* Title with subtle glow */}
        <h1 className="text-6xl font-bold relative">
          <span className="text-[#b8a6ff] relative inline-block">
            Constella
            <div 
              className="absolute inset-0 blur-[2px] text-[#b8a6ff]/50"
              aria-hidden="true"
            >
              Constella
            </div>
          </span>
        </h1>

        <p className="text-[#e2dcff] text-lg">
          Discover your celestial identity by entering your birth date below.
        </p>

        <div className="w-full max-w-md mx-auto mt-8">
          <div className="space-y-4">
            <label className="block text-[#d4ccff] text-sm">
              Enter your birth date
            </label>
            <DatePicker
              value={birthDate}
              onChange={setBirthDate}
              onSubmit={handleDateSubmit}
              className="w-full bg-[#2a1f4d]/50 border border-[#8b7ff9]/20 text-[#e2dcff] px-4 py-2 rounded-lg focus:outline-none focus:border-[#8b7ff9]/40 transition-colors"
              placeholder="dd/mm/yyyy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
