import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiHeart, FiShoppingCart, FiTrash2, FiStar } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import productsData from '../data/products'

export default function WishlistPage() {
  const { t } = useLanguage()
  const phoneNumber = '60198688608'
  const [emptyRef, emptyVisible] = useScrollAnimation({ threshold: 0.1 })
  const [gridRef, gridVisible] = useStaggerAnimation({ threshold: 0.1 })

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('luma-wishlist')
    if (saved) return JSON.parse(saved)
    return []
  })

  const saveWishlist = (items) => {
    setWishlist(items)
    localStorage.setItem('luma-wishlist', JSON.stringify(items))
  }

  const removeFromWishlist = (productId) => {
    saveWishlist(wishlist.filter((id) => id !== productId))
  }

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('luma-cart') || '[]')
    const existing = cart.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ id: product.id, quantity: 1 })
    }
    localStorage.setItem('luma-cart', JSON.stringify(cart))
    alert(t('wishlistPage.addedToCart'))
  }

  const handleOrder = (product) => {
    const name = t(`shopPage.products.${product.nameKey}`)
    const message = `Hi, I'm interested in:\n\nProduct: ${name}\nPrice: RM${product.price}`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const wishlistProducts = productsData.filter((p) => wishlist.includes(p.id))

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-peach/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-ribbon-red transition-colors">
              <FiChevronLeft size={20} />
              <span className="font-medium text-sm">{t('wishlistPage.backToHome')}</span>
            </Link>
            <h1 className="font-bold text-primary text-lg">
              {t('wishlistPage.title')} ({wishlistProducts.length})
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {wishlistProducts.length === 0 ? (
          <div
            ref={emptyRef}
            className={`text-center py-20 bg-white rounded-2xl border border-peach/30 scroll-fade-up ${emptyVisible ? 'visible' : ''}`}
          >
            <FiHeart className="mx-auto text-peach mb-4" size={60} />
            <h2 className="text-2xl font-bold text-primary mb-2">{t('wishlistPage.emptyTitle')}</h2>
            <p className="text-warm-brown/60 mb-6">{t('wishlistPage.emptyDescription')}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-ribbon-red hover:bg-ribbon-red/90 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              {t('wishlistPage.browseProducts')}
            </Link>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group bg-white rounded-xl border border-peach/30 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 scroll-zoom-in stagger-delay-${Math.min(index + 1, 6)} ${gridVisible ? 'visible' : ''}`}
              >
                <div className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-6 flex items-center justify-center h-40">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {product.emoji}
                  </span>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 w-7 h-7 bg-ribbon-red text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-primary text-sm mb-1 line-clamp-2">
                    {t(`shopPage.products.${product.nameKey}`)}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <FiStar className="text-gold fill-current" size={11} />
                    <span className="text-xs text-warm-brown/60">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-bold text-ribbon-red">RM{product.price}</span>
                    <span className="text-[10px] text-warm-brown/40 line-through">RM{product.originalPrice}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 flex items-center justify-center gap-1 bg-ribbon-red hover:bg-ribbon-red/90 text-white py-1.5 rounded-lg text-xs font-medium transition-colors"
                    >
                      <FiShoppingCart size={11} />
                      {t('wishlistPage.addToCart')}
                    </button>
                    <button
                      onClick={() => handleOrder(product)}
                      className="px-2 py-1.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg transition-colors"
                      aria-label="Order via WhatsApp"
                    >
                      <FiShoppingCart size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
