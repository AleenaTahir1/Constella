export async function generateThemeImage(prompt) {
  try {
    const formattedPrompt = `a-Zodiac-Theme-${prompt.toLowerCase().replace(/\s+/g, '-')}`
    const imageUrl = `https://image.pollinations.ai/prompt/${formattedPrompt}`
    
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

export function applyTheme(imageUrl) {
  document.documentElement.style.setProperty('--theme-background', `url(${imageUrl})`)
  localStorage.setItem('constella-theme-background', imageUrl)
}
