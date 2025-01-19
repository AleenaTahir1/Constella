import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ZodiacProvider } from './context/ZodiacContext'

// Make sure the root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Constella">
      <ZodiacProvider>
        <App />
      </ZodiacProvider>
    </BrowserRouter>
  </React.StrictMode>
)
