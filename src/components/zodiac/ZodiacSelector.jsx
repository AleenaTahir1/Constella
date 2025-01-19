import { useState } from 'react'
import { useZodiac } from '../../context/ZodiacContext'
import ZodiacIcon from './ZodiacIcon'

function ZodiacSelector() {
  const { zodiacSigns, setUserZodiac } = useZodiac()
  const [selectedDate, setSelectedDate] = useState('')
  const [hoverSign, setHoverSign] = useState(null)

  const handleDateChange = (e) => {
    const date = new Date(e.target.value)
    setSelectedDate(e.target.value)
    const sign = getZodiacByDate(date)
    setHoverSign(sign)
  }

  const handleSignSelect = (sign) => {
    setUserZodiac(sign)
  }

  return (
    <div className="card w-full max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Choose Your Zodiac Sign</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.entries(zodiacSigns).map(([sign, data]) => (
            <button
              key={sign}
              className={`p-4 rounded-lg transition-all duration-300 ${
                hoverSign === sign
                  ? 'bg-constellation-accent/30 scale-105'
                  : 'hover:bg-constellation-secondary/20'
              }`}
              onMouseEnter={() => setHoverSign(sign)}
              onMouseLeave={() => setHoverSign(null)}
              onClick={() => handleSignSelect(sign)}
            >
              <ZodiacIcon sign={sign} className="w-12 h-12 mx-auto mb-2" />
              <div className="text-center">
                <h3 className="font-medium capitalize">{sign}</h3>
                <p className="text-sm text-constellation-light/70">{data.dates}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="mb-4">Or enter your birth date:</p>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="input w-full max-w-xs mx-auto"
        />
      </div>

      {hoverSign && (
        <div className="mt-8 text-center animate-fade-in">
          <h3 className="text-xl font-medium capitalize mb-2">{hoverSign}</h3>
          <p className="text-constellation-light/70">
            Element: {zodiacSigns[hoverSign].element}
          </p>
        </div>
      )}
    </div>
  )
}

export default ZodiacSelector
