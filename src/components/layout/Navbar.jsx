import { Link, useLocation } from 'react-router-dom'
import { useZodiac } from '../../context/ZodiacContext'

function Navbar() {
  const { userZodiac } = useZodiac()
  const location = useLocation()

  return (
    <nav className="bg-constellation-dark/50 backdrop-blur-lg border-b border-constellation-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="3" fill="currentColor" className="text-constellation-accent" />
              <path
                d="M12 2L14.5 9.5M12 2L9.5 9.5M12 22L14.5 14.5M12 22L9.5 14.5M2 12L9.5 14.5M2 12L9.5 9.5M22 12L14.5 14.5M22 12L14.5 9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-constellation-accent"
              />
            </svg>
            <span className="text-xl font-semibold tracking-wider text-constellation-light">
              Constella
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {userZodiac && (
              <>
                <Link
                  to="/profile"
                  className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
                >
                  Profile
                </Link>
                <Link
                  to="/compatibility"
                  className={`nav-link ${location.pathname === '/compatibility' ? 'active' : ''}`}
                >
                  Compatibility
                </Link>
                <Link
                  to="/horoscope"
                  className="px-3 py-2 rounded-lg text-constellation-light hover:bg-constellation-accent/10 transition-colors"
                >
                  Horoscope
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
