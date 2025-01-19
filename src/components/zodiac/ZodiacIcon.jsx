import { useZodiac } from '../../context/ZodiacContext'

function ZodiacIcon({ sign, className = '' }) {
  const { zodiacSigns } = useZodiac()

  return (
    <div className={`text-4xl ${className}`}>
      {zodiacSigns[sign]?.symbol}
    </div>
  )
}

export default ZodiacIcon
