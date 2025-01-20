import { useState } from 'react'
import { motion } from 'framer-motion'

export default function DatePicker({ value, onChange, onSubmit, className, placeholder }) {
  const [focused, setFocused] = useState(false)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && value) {
      onSubmit(value)
    }
  }

  return (
    <div className="relative">
      <motion.input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${className} ${
          focused ? 'ring-1 ring-constellation-accent/30' : ''
        }`}
        placeholder={placeholder}
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => onSubmit(value)}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-constellation-accent/20 hover:bg-constellation-accent/30 text-constellation-accent text-sm transition-colors"
        >
          Continue
        </motion.button>
      )}
    </div>
  )
}
