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

function App() {
  // Load saved theme on startup
  useEffect(() => {
    const savedTheme = localStorage.getItem('constella-theme-background')
    if (savedTheme) {
      document.documentElement.style.setProperty('--theme-background', `url(${savedTheme})`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-constellation-dark text-white relative">
      <div className="theme-background" />
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
  )
}

export default App
