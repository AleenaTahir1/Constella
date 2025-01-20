import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useZodiac } from '../context/ZodiacContext'
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
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-7xl font-bold mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-constellation-accent via-purple-500 to-pink-500">
          Constella
        </span>
      </h1>

      <p className="text-xl mb-12 max-w-2xl text-constellation-light/90">
        Discover your celestial identity by entering your birth date below.
      </p>

      <FloatingCard className="w-full max-w-md p-8 mb-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="birthdate" className="block text-lg mb-2">
              Enter your birth date
            </label>
            <input
              type="date"
              id="birthdate"
              value={birthDate}
              onChange={handleDateChange}
              className="w-full px-4 py-2 rounded-lg bg-constellation-dark/50 border border-constellation-accent/30 focus:border-constellation-accent focus:outline-none"
            />
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

              <button
                onClick={handleContinue}
                className="w-full px-6 py-3 rounded-lg bg-constellation-accent hover:bg-constellation-accent/80 transition-colors text-white font-semibold"
              >
                Continue to Your Profile
              </button>
            </div>
          )}
        </div>
      </FloatingCard>
    </div>
  )
}

export default Home
