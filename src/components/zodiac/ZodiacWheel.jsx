import { motion } from 'framer-motion'
import { useZodiac } from '../../context/ZodiacContext'

function ZodiacWheel() {
  const { zodiacSigns, userZodiac, setUserZodiac } = useZodiac()

  const wheelVariants = {
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        duration: 0.3,
      },
    },
  }

  const signVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, filter: 'brightness(1.2)' },
    selected: { scale: 1.3, filter: 'brightness(1.5)' },
  }

  return (
    <motion.div
      className="relative w-[500px] h-[500px]"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 200,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {Object.entries(zodiacSigns).map(([sign, data], index) => {
        const angle = (index * 360) / 12
        const radius = 200
        const x = radius * Math.cos((angle * Math.PI) / 180)
        const y = radius * Math.sin((angle * Math.PI) / 180)

        return (
          <motion.div
            key={sign}
            className="absolute"
            style={{
              transform: `translate(${x + 250}px, ${y + 250}px)`,
            }}
            variants={signVariants}
            initial="initial"
            whileHover="hover"
            animate={userZodiac === sign ? 'selected' : 'initial'}
            onClick={() => setUserZodiac(sign)}
          >
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-constellation-accent rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-constellation-primary rounded-full p-4 border border-constellation-accent">
                <span className="text-2xl">{data.symbol}</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-sm font-medium capitalize">{sign}</span>
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Center piece */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        variants={wheelVariants}
        whileHover="hover"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-constellation-accent rounded-full blur-lg opacity-30" />
          <div className="relative bg-constellation-primary rounded-full p-8 border-2 border-constellation-accent">
            <span className="text-4xl">✨</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ZodiacWheel
