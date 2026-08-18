import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import productsData from '../data/products'
import { ProductImage, getProductName } from '../utils/productImage.jsx'
import { animateAddToCart, notifyCartUpdated } from '../utils/cartAnimation'

export default function Products() {
  const { t, language } = useLanguage()
  const navigate = useNavigate()
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 })
  const [gridRef, gridVisible] = useStaggerAnimation({ threshold: 0.05 })
  const [btnRef, btnVisible] = useScrollAnimation({ threshold: 0.5 })

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem('luma-wishlist') || '[]')
  })

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
      localStorage.setItem('luma-wishlist', JSON.stringify(updated))
      return updated
    })
  }

  const handleAddToCart = (product, event) => {
    const cart = JSON.parse(localStorage.getItem('luma-cart') || '[]')
    const existing = cart.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ id: product.id, quantity: 1 })
    }
    localStorage.setItem('luma-cart', JSON.stringify(cart))
    notifyCartUpdated()
    animateAddToCart({ product, language, triggerElement: event.currentTarget })
  }

  const openProductDetail = (productId) => {
    navigate(`/product/${productId}`)
  }

  const handleCardKeyDown = (event, productId) => {
    if (event.target !== event.currentTarget) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openProductDetail(productId)
    }
  }

  const products = productsData.slice(0, 6).map((product) => ({
    ...product,
    name: getProductName(product, language),
    badge: t(`products.${product.badgeKey}`),
  }))

  return (
    <section id="shop" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - flip in from top */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-flip-up ${headerVisible ? 'visible' : ''}`}
        >
          <span className="text-ribbon-red font-semibold text-sm uppercase tracking-wider">{t('products.sectionLabel')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            {t('products.title')}
          </h2>
          <p className="text-warm-brown/60 max-w-2xl mx-auto">
            {t('products.description')}
          </p>
        </div>

        {/* Product Grid - staggered rotate-in */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-product-card
              role="link"
              tabIndex={0}
              onClick={() => openProductDetail(product.id)}
              onKeyDown={(event) => handleCardKeyDown(event, product.id)}
              aria-label={`View details for ${product.name}`}
              className={`group bg-white rounded-2xl border border-peach/30 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-peach/20 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-ribbon-red/30 focus:outline-none focus:ring-2 focus:ring-ribbon-red/60 focus:ring-offset-2 scroll-rotate-in ${
                gridVisible ? 'visible' : ''
              }`}
              style={{
                transitionDelay: gridVisible ? `${index * 120}ms` : '0ms',
              }}
            >
              {/* Product Image Area */}
              <div data-cart-image className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center h-72">
                <ProductImage
                  product={product}
                  className="group-hover:scale-110 transition-transform duration-500 ease-out"
                  emojiClassName="text-6xl group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500 ease-out"
                />
                {/* Badge */}
                <span className="absolute top-4 left-4 bg-ribbon-red text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
                {/* Wishlist */}
                <button
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleWishlist(product.id)
                  }}
                  className={`absolute top-4 right-4 w-9 h-9 rounded-full shadow flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    wishlist.includes(product.id)
                      ? 'bg-ribbon-red text-white'
                      : 'bg-white text-primary hover:bg-ribbon-red hover:text-white opacity-0 group-hover:opacity-100'
                  }`}
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <FiHeart size={16} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <span className="text-xs font-mono text-warm-brown/50 bg-cream px-2 py-0.5 rounded">{product.code}</span>
                <h3 className="font-semibold text-primary text-lg mb-1 mt-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <FiStar className="text-gold fill-current" size={14} />
                  <span className="text-sm text-warm-brown/60">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">RM{product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-warm-brown/40 line-through">RM{product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      handleAddToCart(product, event)
                    }}
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <FiShoppingCart size={14} />
                    {t('products.addToCart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button - pop in */}
        <div
          ref={btnRef}
          className={`text-center mt-12 scroll-pop-in ${btnVisible ? 'visible' : ''}`}
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
          >
            {t('products.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
