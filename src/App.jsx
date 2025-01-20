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
  // Load saved theme or default theme on startup
  useEffect(() => {
    loadSavedTheme()
  }, [])

  return (
    <>
      {/* Theme Background */}
      <div className="fixed inset-0 w-full h-full">
        <div className="theme-background" />
        <div className="theme-overlay" />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen">
        <ParticleField />
        <div className="relative z-10">
          <Navbar />
          <main>
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
    </>
  )
}

export default App
