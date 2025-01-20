import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ZodiacProfile from './pages/ZodiacProfile'
import Compatibility from './pages/Compatibility'
import Horoscope from './pages/Horoscope'
import ThemeGenerator from './pages/ThemeGenerator'
import NotFound from './pages/NotFound'
import ParticleField from './components/effects/ParticleField'
import Navbar from './components/layout/Navbar'
import { useEffect, useState, useCallback } from 'react'
import { loadSavedTheme, DEFAULT_THEMES } from './services/themeGeneratorService'

function App() {
  const [background, setBackground] = useState(DEFAULT_THEMES.cosmic)
  const [opacity, setOpacity] = useState(0.7)

  const handleThemeChange = useCallback((event) => {
    console.log('Theme change event received:', event.detail)
    setBackground(event.detail.background)
    setOpacity(event.detail.opacity)
  }, [])

  useEffect(() => {
    // Load saved theme on startup
    loadSavedTheme()

    // Listen for theme changes
    window.addEventListener('themeChanged', handleThemeChange)

    // Cleanup
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange)
    }
  }, [handleThemeChange])

  // Force background image preload
  useEffect(() => {
    if (background) {
      const img = new Image()
      img.src = background
    }
  }, [background])

  return (
    <div className="min-h-screen flex flex-col bg-constellation-dark">
      {/* Theme Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ 
          backgroundImage: `url('${background}')`,
          opacity: opacity,
          transform: 'scale(1.1)', // Slight zoom for better coverage
          filter: 'brightness(1.1) contrast(1.1)', // Enhanced visuals
          willChange: 'opacity, background-image' // Performance optimization
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-constellation-dark/50 to-constellation-dark/70 pointer-events-none" />
      
      {/* Particle Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <ParticleField />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ZodiacProfile />} />
            <Route path="/compatibility" element={<Compatibility />} />
            <Route path="/horoscope" element={<Horoscope />} />
            <Route path="/theme" element={<ThemeGenerator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
