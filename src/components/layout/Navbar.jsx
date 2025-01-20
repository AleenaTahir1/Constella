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
              <div className="absolute inset-0 bg-constellation-accent rounded-full opacity-50 blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-r from-constellation-accent to-purple-500 rounded-full" />
              <div className="absolute inset-1 bg-constellation-dark rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-1 h-1 bg-constellation-accent rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
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
