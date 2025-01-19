import { useEffect, useRef } from 'react'
import { useZodiac } from '../../context/ZodiacContext'

function ConstellationBackground() {
  const canvasRef = useRef(null)
  const { userZodiac } = useZodiac()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let stars = []
    let connections = []

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    // Initialize stars
    const initStars = () => {
      stars = []
      connections = []
      const numStars = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.2 + 0.1,
          brightness: Math.random() * 0.5 + 0.5,
        })
      }

      // Create constellation connections
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const distance = Math.hypot(
            stars[i].x - stars[j].x,
            stars[i].y - stars[j].y
          )
          if (distance < 150) {
            connections.push({
              start: stars[i],
              end: stars[j],
              distance,
            })
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach((connection) => {
        const opacity = (150 - connection.distance) / 150
        ctx.beginPath()
        ctx.moveTo(connection.start.x, connection.start.y)
        ctx.lineTo(connection.end.x, connection.end.y)
        ctx.strokeStyle = `rgba(140, 122, 230, ${opacity * 0.2})`
        ctx.stroke()
      })

      // Draw and update stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`
        ctx.fill()

        // Twinkle effect
        star.brightness += Math.random() * 0.1 - 0.05
        star.brightness = Math.max(0.3, Math.min(1, star.brightness))

        // Move stars
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [userZodiac])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  )
}

export default ConstellationBackground
