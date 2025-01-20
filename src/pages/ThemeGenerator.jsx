import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateThemeImage, applyTheme } from '../services/themeGeneratorService'

function ThemeGenerator() {
  const [prompt, setPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    try {
      setLoading(true)
      setError(null)
      setGeneratedImage(null)
      
      const imageUrl = await generateThemeImage(prompt)
      setGeneratedImage(imageUrl)
    } catch (error) {
      setError('Failed to generate theme. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleApplyTheme = () => {
    if (generatedImage) {
      applyTheme(generatedImage)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-constellation-dark via-constellation-dark/95 to-constellation-dark py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-constellation-accent to-purple-400 bg-clip-text text-transparent">
            Cosmic Theme Generator
          </h1>
          <p className="text-constellation-light text-lg">
            Describe your perfect celestial theme and watch the magic happen ✨
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., mystical forest under starry night"
              className="flex-1 px-6 py-3 rounded-full bg-constellation-dark/50 border border-constellation-accent/20 text-constellation-light placeholder-constellation-light/50 focus:outline-none focus:border-constellation-accent"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-full bg-constellation-accent text-white font-semibold hover:bg-constellation-accent/90 transition-colors disabled:opacity-50"
            >
              Generate Theme
            </motion.button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-block w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full border-4 border-constellation-accent border-t-transparent animate-spin"></div>
                <div className="absolute inset-3 rounded-full border-4 border-purple-400 border-b-transparent animate-spin-reverse"></div>
              </div>
              <p className="text-constellation-light mt-4">Crafting your cosmic theme...</p>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-center py-8"
            >
              {error}
            </motion.div>
          )}

          {generatedImage && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-constellation-accent/20">
                <img
                  src={generatedImage}
                  alt="Generated theme"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApplyTheme}
                  className="px-8 py-3 rounded-full bg-constellation-accent text-white font-semibold hover:bg-constellation-accent/90 transition-colors"
                >
                  Apply Theme
                </motion.button>
              </div>
            </motion.div>
          )}

          {showSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
            >
              Theme applied successfully! ✨
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ThemeGenerator
