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
    
    // Preload the image
    const img = new Image()
    img.src = imageUrl
    
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = () => reject(new Error('Failed to load image'))
    })
    
    return imageUrl
  } catch (error) {
    console.error('Error generating theme:', error)
    throw error
  }
}

export function applyTheme(imageUrl, opacity = 0.7) {
  try {
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
    const event = new CustomEvent('themeChanged', {
      detail: {
        background: cleanUrl,
        opacity: opacity
      }
    })
    
    window.dispatchEvent(event)
    
    // Force a repaint to ensure the theme is applied
    document.body.style.display = 'none'
    document.body.offsetHeight // Force repaint
    document.body.style.display = ''
    
    console.log('Theme applied successfully:', {
      background: cleanUrl,
      opacity: opacity
    })
    
    return true
  } catch (error) {
    console.error('Error applying theme:', error)
    return false
  }
}

export function loadSavedTheme() {
  try {
    // Get saved theme or use default
    const savedTheme = localStorage.getItem('constella-theme-background')
    const savedOpacity = parseFloat(localStorage.getItem('constella-theme-opacity')) || 0.7
    
    if (savedTheme) {
      console.log('Loading saved theme:', savedTheme)
      return applyTheme(savedTheme, savedOpacity)
    } else {
      console.log('No saved theme found, applying default cosmic theme')
      return applyTheme(DEFAULT_THEMES.cosmic, 0.7)
    }
  } catch (error) {
    console.error('Error loading theme:', error)
    // Fallback to default theme
    return applyTheme(DEFAULT_THEMES.cosmic, 0.7)
  }
}
