// Default cosmic themes
export const DEFAULT_THEMES = {
  cosmic: 'https://image.pollinations.ai/prompt/cosmic-night-sky-with-colorful-nebulas-and-shining-stars-high-quality-4k-resolution',
  mystical: 'https://image.pollinations.ai/prompt/mystical-zodiac-constellation-pattern-with-golden-stars-high-quality-4k-resolution',
  galaxy: 'https://image.pollinations.ai/prompt/deep-space-galaxy-with-purple-and-blue-cosmic-clouds-high-quality-4k-resolution'
}

export async function generateThemeImage(prompt) {
  try {
    // Add quality parameters to the prompt
    const enhancedPrompt = `${prompt.toLowerCase().replace(/\s+/g, '-')}-high-quality-4k-resolution-detailed-cosmic-theme`
    const imageUrl = `https://image.pollinations.ai/prompt/${enhancedPrompt}?width=1920&height=1080&nologo=true&seed=${Math.floor(Math.random() * 1000)}`
    
    // First check if the image is available
    const response = await fetch(imageUrl, { method: 'HEAD' })
    if (!response.ok) {
      throw new Error('Failed to generate theme image')
    }
    
    return imageUrl
  } catch (error) {
    console.error('Error generating theme:', error)
    throw error
  }
}

export function applyTheme(imageUrl, opacity = 0.25) {
  // Apply the theme with a backdrop filter for better text readability
  document.documentElement.style.setProperty('--theme-background', `url("${imageUrl}")`)
  document.documentElement.style.setProperty('--theme-opacity', opacity.toString())
  
  // Save theme preferences
  localStorage.setItem('constella-theme-background', imageUrl)
  localStorage.setItem('constella-theme-opacity', opacity.toString())
  
  // Force a repaint to ensure the theme is applied
  document.body.style.display = 'none'
  document.body.offsetHeight // Force repaint
  document.body.style.display = ''
}

export function loadSavedTheme() {
  const savedTheme = localStorage.getItem('constella-theme-background')
  const savedOpacity = parseFloat(localStorage.getItem('constella-theme-opacity')) || 0.25
  
  if (savedTheme) {
    applyTheme(savedTheme, savedOpacity)
  } else {
    // Apply default theme if no theme is saved
    applyTheme(DEFAULT_THEMES.cosmic)
  }
}
