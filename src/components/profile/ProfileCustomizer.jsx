import { useState } from 'react'
import { useZodiac } from '../../context/ZodiacContext'

function ProfileCustomizer() {
  const { userZodiac, customizations, setCustomizations } = useZodiac()
  const [activeTab, setActiveTab] = useState('background')

  const backgrounds = [
    { id: 'stars', name: 'Starry Night', preview: '🌠' },
    { id: 'nebula', name: 'Cosmic Nebula', preview: '🌌' },
    { id: 'aurora', name: 'Aurora', preview: '🌈' },
    { id: 'galaxy', name: 'Galaxy', preview: '🌍' },
  ]

  const fonts = [
    { id: 'mystical', name: 'Mystical', preview: 'Aa' },
    { id: 'elegant', name: 'Elegant', preview: 'Bb' },
    { id: 'cosmic', name: 'Cosmic', preview: 'Cc' },
    { id: 'celestial', name: 'Celestial', preview: 'Dd' },
  ]

  const colorSchemes = [
    { id: 'cosmic-purple', name: 'Cosmic Purple', colors: ['#8C7AE6', '#9B59B6'] },
    { id: 'starlight-blue', name: 'Starlight Blue', colors: ['#3498DB', '#2980B9'] },
    { id: 'nebula-pink', name: 'Nebula Pink', colors: ['#E84393', '#D81B60'] },
    { id: 'galaxy-green', name: 'Galaxy Green', colors: ['#00B894', '#00897B'] },
  ]

  const handleBackgroundChange = (backgroundId) => {
    setCustomizations(prev => ({
      ...prev,
      background: backgroundId
    }))
  }

  const handleFontChange = (fontId) => {
    setCustomizations(prev => ({
      ...prev,
      fontStyle: fontId
    }))
  }

  const handleColorSchemeChange = (schemeId) => {
    setCustomizations(prev => ({
      ...prev,
      colorScheme: schemeId
    }))
  }

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button
          className={`btn ${
            activeTab === 'background'
              ? 'btn-primary'
              : 'bg-constellation-secondary/20'
          }`}
          onClick={() => setActiveTab('background')}
        >
          Background
        </button>
        <button
          className={`btn ${
            activeTab === 'font'
              ? 'btn-primary'
              : 'bg-constellation-secondary/20'
          }`}
          onClick={() => setActiveTab('font')}
        >
          Font
        </button>
        <button
          className={`btn ${
            activeTab === 'colors'
              ? 'btn-primary'
              : 'bg-constellation-secondary/20'
          }`}
          onClick={() => setActiveTab('colors')}
        >
          Colors
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {activeTab === 'background' &&
          backgrounds.map((bg) => (
            <button
              key={bg.id}
              className={`p-4 rounded-lg transition-all ${
                customizations.background === bg.id
                  ? 'bg-constellation-accent/30 scale-105'
                  : 'bg-constellation-secondary/20 hover:bg-constellation-secondary/30'
              }`}
              onClick={() => handleBackgroundChange(bg.id)}
            >
              <span className="text-2xl mb-2 block">{bg.preview}</span>
              <span className="block">{bg.name}</span>
            </button>
          ))}

        {activeTab === 'font' &&
          fonts.map((font) => (
            <button
              key={font.id}
              className={`p-4 rounded-lg transition-all ${
                customizations.fontStyle === font.id
                  ? 'bg-constellation-accent/30 scale-105'
                  : 'bg-constellation-secondary/20 hover:bg-constellation-secondary/30'
              }`}
              onClick={() => handleFontChange(font.id)}
            >
              <span className="text-2xl mb-2 block">{font.preview}</span>
              <span className="block">{font.name}</span>
            </button>
          ))}

        {activeTab === 'colors' &&
          colorSchemes.map((scheme) => (
            <button
              key={scheme.id}
              className={`p-4 rounded-lg transition-all ${
                customizations.colorScheme === scheme.id
                  ? 'bg-constellation-accent/30 scale-105'
                  : 'bg-constellation-secondary/20 hover:bg-constellation-secondary/30'
              }`}
              onClick={() => handleColorSchemeChange(scheme.id)}
            >
              <div className="flex space-x-2 justify-center mb-2">
                {scheme.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="block">{scheme.name}</span>
            </button>
          ))}
      </div>
    </div>
  )
}

export default ProfileCustomizer
