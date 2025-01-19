import { useZodiac } from '../../context/ZodiacContext'

function ZodiacAvatar({ sign, className = '' }) {
  const { zodiacSigns } = useZodiac()

  const getAvatarBackground = (sign) => {
    const elementColors = {
      fire: 'from-red-500 to-orange-500',
      earth: 'from-green-500 to-emerald-500',
      air: 'from-blue-400 to-indigo-500',
      water: 'from-blue-500 to-purple-500'
    }

    return elementColors[zodiacSigns[sign]?.element] || 'from-gray-500 to-gray-600'
  }

  return (
    <div
      className={`relative rounded-full bg-gradient-to-br ${getAvatarBackground(
        sign
      )} p-1 ${className}`}
    >
      <div className="absolute inset-0 rounded-full animate-spin-slow opacity-50 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      <div className="relative bg-constellation-dark rounded-full w-full h-full flex items-center justify-center">
        <span className="text-4xl">{zodiacSigns[sign]?.symbol}</span>
      </div>
    </div>
  )
}

export default ZodiacAvatar
