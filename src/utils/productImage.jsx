import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export function getProductName(product, language = 'en') {
  if (product.name && typeof product.name === 'object') {
    return product.name[language] || product.name.en || product.name.zh || product.code
  }

  return product.name || product.nameKey || product.code
}

export function getProductImages(product, language = 'en') {
  const languageImages = product.imagesByLanguage?.[language] || product.imagesByLanguage?.en
  const images = languageImages || product.images || (product.image ? [product.image] : [])
  return images.map((image) => image.replace(/^\/public\//, '/'))
}

export function ProductImage({ product, className = '', emojiClassName = '' }) {
  const { language } = useLanguage()
  const [image] = getProductImages(product, language)

  if (image) {
    return (
      <img
        src={image}
        alt={getProductName(product, language)}
        className={`h-full w-full object-contain ${className}`}
        loading="lazy"
      />
    )
  }

  return <span className={emojiClassName}>{product.emoji}</span>
}

export function ProductGallery({ product }) {
  const { language } = useLanguage()
  const images = getProductImages(product, language)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeImage = images[Math.min(selectedIndex, Math.max(images.length - 1, 0))]

  if (!activeImage) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="text-[120px] block animate-float">{product.emoji}</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div data-cart-image className="h-[420px] w-full">
        <img
          src={activeImage}
          alt={getProductName(product, language)}
          className="h-full w-full object-contain animate-float"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setSelectedIndex(index)}
              className={`aspect-square overflow-hidden rounded-lg border bg-cream p-1 transition-colors ${
                selectedIndex === index ? 'border-ribbon-red' : 'border-peach/40 hover:border-ribbon-red/60'
              }`}
              aria-label={`View product image ${index + 1}`}
            >
              <img src={image} alt="" className="h-full w-full object-contain" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
