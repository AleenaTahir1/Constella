import { useState } from 'react'
import { motion } from 'framer-motion'
import { generateThemeImage, applyTheme, DEFAULT_THEMES } from '../services/themeGeneratorService'

export default function ThemeGenerator() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState(null)
  const [opacity, setOpacity] = useState(0.7)
  const [loading, setLoading] = useState(false)

  const handleGenerateTheme = async () => {
    try {
      setLoading(true)
      const imageUrl = await generateThemeImage(prompt || 'cosmic night sky with stars')
      setGeneratedImage(imageUrl)
      // Apply theme immediately when generated
      applyTheme(imageUrl, opacity)
    } catch (error) {
      console.error('Error generating theme:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyTheme = () => {
    if (generatedImage) {
      applyTheme(generatedImage, opacity)
    }
  }

  const handleDefaultTheme = (themeUrl) => {
    setGeneratedImage(themeUrl)
    // Apply theme immediately when selected
    applyTheme(themeUrl, opacity)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-center mb-8">Theme Generator</h1>
          
          {/* Default Themes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(DEFAULT_THEMES).map(([name, url]) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleDefaultTheme(url)}
              >
                <img
                  src={url}
                  alt={name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-semibold capitalize">{name}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Theme Generator */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your theme (e.g., cosmic night sky with stars)"
                className="flex-1 px-4 py-2 rounded-lg bg-constellation-dark border border-constellation-accent/30 text-white"
              />
              <button
                onClick={handleGenerateTheme}
                disabled={loading}
                className="px-6 py-2 bg-constellation-accent text-white rounded-lg hover:bg-constellation-accent/80 transition-colors disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>

            {/* Theme Preview */}
            {generatedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={generatedImage}
                    alt="Generated theme"
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0"
                    style={{ backgroundColor: `rgba(0,0,0,${1 - opacity})` }}
                  />
                </div>

                {/* Opacity Control */}
                <div className="space-y-2">
                  <label className="block text-sm">
                    Background Opacity: {Math.round(opacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={opacity}
                    onChange={(e) => {
                      const newOpacity = parseFloat(e.target.value)
                      setOpacity(newOpacity)
                      // Apply opacity change immediately
                      if (generatedImage) {
                        applyTheme(generatedImage, newOpacity)
                      }
                    }}
                    className="w-full accent-constellation-accent"
                  />
                </div>

                {/* Apply Theme Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApplyTheme}
                  className="w-full py-3 bg-constellation-accent text-white rounded-lg hover:bg-constellation-accent/80 transition-colors"
                >
                  Apply Theme
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
