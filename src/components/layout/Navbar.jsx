import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const location = useLocation()

  const navItems = [
    { path: '/profile', label: 'Profile' },
    { path: '/compatibility', label: 'Compatibility' },
    { path: '/horoscope', label: 'Horoscope' },
    { path: '/theme', label: 'Theme', isNew: true }
  ]

  return (
    <nav className="bg-constellation-dark/80 backdrop-blur-lg border-b border-constellation-accent/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <g>
                  {/* Main constellation points */}
                  <circle cx="12" cy="6" r="1.5" className="fill-constellation-accent" />
                  <circle cx="6" cy="12" r="1.5" className="fill-constellation-accent" />
                  <circle cx="18" cy="12" r="1.5" className="fill-constellation-accent" />
                  <circle cx="12" cy="18" r="1.5" className="fill-constellation-accent" />
                  
                  {/* Connecting lines */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    d="M12 6L6 12L12 18L18 12L12 6"
                    className="stroke-constellation-accent"
                    fill="none"
                    strokeWidth="0.5"
                  />
                  
                  {/* Glowing effect */}
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="8"
                    className="stroke-constellation-accent/30"
                    fill="none"
                    strokeWidth="0.5"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </g>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-constellation-accent to-purple-400 bg-clip-text text-transparent">
              Constella
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-colors relative ${
                  location.pathname === item.path
                    ? 'bg-constellation-accent text-white'
                    : 'text-constellation-light hover:bg-constellation-accent/10'
                }`}
              >
                {item.label}
                {item.isNew && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-constellation-light hover:bg-constellation-accent/10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-constellation-accent text-white'
                    : 'text-constellation-light hover:bg-constellation-accent/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
