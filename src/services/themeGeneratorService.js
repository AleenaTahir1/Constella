// Default cosmic themes
export const DEFAULT_THEMES = {
  cosmic: 'https://image.pollinations.ai/prompt/cosmic-night-sky-with-colorful-nebulas-and-shining-stars-high-quality-4k-resolution?width=3840&height=2160&nologo=true',
  mystical: 'https://image.pollinations.ai/prompt/mystical-zodiac-constellation-pattern-with-golden-stars-high-quality-4k-resolution?width=3840&height=2160&nologo=true',
  galaxy: 'https://image.pollinations.ai/prompt/deep-space-galaxy-with-purple-and-blue-cosmic-clouds-high-quality-4k-resolution?width=3840&height=2160&nologo=true'
}

export async function generateThemeImage(prompt) {
  try {
    // Add quality parameters to the prompt
    const enhancedPrompt = `${prompt.toLowerCase().replace(/\s+/g, '-')}-ultra-high-quality-4k-resolution-detailed-cosmic-theme-professional-photography-high-detail`
    const imageUrl = `https://image.pollinations.ai/prompt/${enhancedPrompt}?width=3840&height=2160&nologo=true&seed=${Math.floor(Math.random() * 1000)}&quality=100`
    
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

export function applyTheme(imageUrl, opacity = 0.7) {
  try {
    // Ensure we have a valid image URL
    if (!imageUrl) {
      console.error('No image URL provided')
      return
    }

    // Clean up the URL
    const cleanUrl = imageUrl.trim()
    
    // Save to localStorage
    localStorage.setItem('constella-theme-background', cleanUrl)
    localStorage.setItem('constella-theme-opacity', opacity.toString())
    
    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', {
      detail: {
        background: cleanUrl,
        opacity: opacity
      }
    }))
    
    console.log('Theme applied successfully:', {
      background: cleanUrl,
      opacity: opacity
    })
  } catch (error) {
    console.error('Error applying theme:', error)
  }
}

export function loadSavedTheme() {
  try {
    // Get saved theme or use default
    const savedTheme = localStorage.getItem('constella-theme-background')
    const savedOpacity = parseFloat(localStorage.getItem('constella-theme-opacity')) || 0.7
    
    if (savedTheme) {
      console.log('Loading saved theme:', savedTheme)
      applyTheme(savedTheme, savedOpacity)
    } else {
      console.log('No saved theme found, applying default cosmic theme')
      applyTheme(DEFAULT_THEMES.cosmic, 0.7)
    }
  } catch (error) {
    console.error('Error loading theme:', error)
    // Fallback to default theme
    applyTheme(DEFAULT_THEMES.cosmic, 0.7)
  }
}
