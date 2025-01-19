import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Oops! Looks like this star has wandered off...</p>
        <Link
          to="/"
          className="btn btn-primary inline-flex items-center space-x-2"
        >
          <span>Return to Constellation</span>
          <span>✨</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
