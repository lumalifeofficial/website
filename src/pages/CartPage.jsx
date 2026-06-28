import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import LanguageSelector from '../components/LanguageSelector'
import productsData from '../data/products'

export default function CartPage() {
  const { t } = useLanguage()
  const phoneNumber = '60198688608'
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 })

  // Simulated cart with some initial items
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('luma-cart')
    if (saved) return JSON.parse(saved)
    return []
  })

  const saveCart = (items) => {
    setCartItems(items)
    localStorage.setItem('luma-cart', JSON.stringify(items))
  }

  const updateQuantity = (productId, delta) => {
    const updated = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
    saveCart(updated)
  }

  const removeItem = (productId) => {
    saveCart(cartItems.filter((item) => item.id !== productId))
  }

  const clearCart = () => saveCart([])

  const subtotal = cartItems.reduce((sum, item) => {
    const product = productsData.find((p) => p.id === item.id)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)

  const handleCheckout = () => {
    const itemsList = cartItems
      .map((item) => {
        const product = productsData.find((p) => p.id === item.id)
        if (!product) return ''
        const name = t(`shopPage.products.${product.nameKey}`)
        return `• ${name} (x${item.quantity}) - RM${(product.price * item.quantity).toFixed(2)}`
      })
      .join('\n')

    const message = `Hi! I'd like to order:\n\n${itemsList}\n\nTotal: RM${subtotal.toFixed(2)}`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-peach/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-ribbon-red transition-colors">
              <FiChevronLeft size={20} />
              <span className="hidden sm:inline font-medium text-sm">{t('cartPage.backToHome')}</span>
            </Link>
            <h1 className="font-bold text-primary text-lg">{t('cartPage.title')}</h1>
            <LanguageSelector />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div
            ref={heroRef}
            className={`text-center py-20 bg-white rounded-2xl border border-peach/30 scroll-fade-up ${heroVisible ? 'visible' : ''}`}
          >
            <FiShoppingBag className="mx-auto text-peach mb-4" size={60} />
            <h2 className="text-2xl font-bold text-primary mb-2">{t('cartPage.emptyTitle')}</h2>
            <p className="text-warm-brown/60 mb-6">{t('cartPage.emptyDescription')}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-ribbon-red hover:bg-ribbon-red/90 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              {t('cartPage.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = productsData.find((p) => p.id === item.id)
                if (!product) return null
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-peach/30 p-4 hover:shadow-md transition-shadow"
                  >
                    {/* Mobile layout: stacked */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cream to-soft-pink/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl sm:text-3xl">{product.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-primary text-sm truncate">
                          {t(`shopPage.products.${product.nameKey}`)}
                        </h3>
                        <p className="text-ribbon-red font-bold text-sm">RM{product.price}</p>
                      </div>
                      {/* Desktop: inline delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="hidden sm:block p-2 text-warm-brown/40 hover:text-ribbon-red transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    {/* Quantity & total row */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-peach/20 sm:border-0 sm:pt-0 sm:mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full border border-peach/50 flex items-center justify-center text-warm-brown/60 hover:border-ribbon-red hover:text-ribbon-red transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full border border-peach/50 flex items-center justify-center text-warm-brown/60 hover:border-ribbon-red hover:text-ribbon-red transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-bold text-primary text-sm">
                          RM{(product.price * item.quantity).toFixed(2)}
                        </p>
                        {/* Mobile: delete button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="sm:hidden p-2 text-warm-brown/40 hover:text-ribbon-red transition-colors"
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
              <button
                onClick={clearCart}
                className="text-sm text-warm-brown/60 hover:text-ribbon-red transition-colors underline"
              >
                {t('cartPage.clearCart')}
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-peach/30 p-6 sticky top-24">
                <h3 className="font-bold text-primary text-lg mb-4">{t('cartPage.orderSummary')}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-brown/60">{t('cartPage.subtotal')}</span>
                    <span className="text-primary font-medium">RM{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-brown/60">{t('cartPage.shipping')}</span>
                    <span className="text-green-600 font-medium">{t('cartPage.free')}</span>
                  </div>
                  <div className="border-t border-peach/30 pt-3 flex justify-between">
                    <span className="font-bold text-primary">{t('cartPage.total')}</span>
                    <span className="font-bold text-ribbon-red text-lg">RM{subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-3 rounded-full font-semibold transition-colors"
                >
                  <FaWhatsapp size={18} />
                  {t('cartPage.checkoutWhatsApp')}
                </button>
                <Link
                  to="/products"
                  className="block text-center mt-3 text-sm text-warm-brown/60 hover:text-ribbon-red transition-colors"
                >
                  {t('cartPage.continueShopping')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
