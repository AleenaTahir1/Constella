import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ZodiacProfile from './pages/ZodiacProfile'
import Compatibility from './pages/Compatibility'
import Horoscope from './pages/Horoscope'
import ThemeGenerator from './pages/ThemeGenerator'
import NotFound from './pages/NotFound'
import ParticleField from './components/effects/ParticleField'
import Navbar from './components/layout/Navbar'
import { useEffect } from 'react'
import { loadSavedTheme } from './services/themeGeneratorService'

function App() {
  useEffect(() => {
    loadSavedTheme()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Theme Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ 
          backgroundImage: 'var(--theme-background)',
          opacity: 'var(--theme-opacity, 0.25)'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-constellation-dark/90 to-constellation-dark/95" />
      
      {/* Particle Effects */}
      <div className="fixed inset-0">
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
