import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

function FloatingCard({ children, className = '' }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * 10
    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * 10

    setRotateX(-rotateXValue)
    setRotateY(rotateYValue)
    setScale(1.02)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-constellation-primary/30 to-constellation-secondary/30 backdrop-blur-lg shadow-xl ${className}`}
      animate={{
        rotateX,
        rotateY,
        scale,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Gradient border effect */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(45deg, rgba(140, 122, 230, 0.3), rgba(74, 78, 140, 0.3))',
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      {/* Content */}
      <div className="relative p-6">
        {children}
      </div>

      {/* Shine effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: 'translateY(100%) rotate(25deg)',
          animation: 'shine 3s infinite',
        }}
      />
    </motion.div>
  )
}

export default FloatingCard
