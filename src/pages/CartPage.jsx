import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import LanguageSelector from '../components/LanguageSelector'
import productsData from '../data/products'
import { ProductImage, getProductName } from '../utils/productImage.jsx'
import { contactLinks } from '../config/contactLinks'
import { getShippingEstimateText } from '../config/shipping'

export default function CartPage() {
  const { t, language } = useLanguage()
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
  const shippingEstimate = getShippingEstimateText(language)

  const handleCheckout = () => {
    const itemsList = cartItems
      .map((item) => {
        const product = productsData.find((p) => p.id === item.id)
        if (!product) return ''
        const name = getProductName(product, language)
        return `• ${name} (x${item.quantity}) - RM${(product.price * item.quantity).toFixed(2)}`
      })
      .join('\n')

    const message = `Hi! I'd like to order:\n\n${itemsList}\n\n${t('cartPage.shipping')}: ${shippingEstimate}\n${t('cartPage.total')}: RM${subtotal.toFixed(2)}`
    window.open(`${contactLinks.whatsapp.url}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream">
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

      <div className="max-w-6xl mx-auto px-3 pb-32 pt-5 sm:px-4 sm:py-8 lg:pb-10">
        {cartItems.length === 0 ? (
          <div
            ref={heroRef}
            className={`text-center px-5 py-16 sm:py-20 bg-white rounded-2xl border border-peach/30 shadow-sm scroll-fade-up ${heroVisible ? 'visible' : ''}`}
          >
            <FiShoppingBag className="mx-auto text-peach mb-4" size={60} />
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">{t('cartPage.emptyTitle')}</h2>
            <p className="text-sm sm:text-base text-warm-brown/60 mb-6">{t('cartPage.emptyDescription')}</p>
            <Link
              to="/products"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-ribbon-red hover:bg-ribbon-red/90 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
            >
              {t('cartPage.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = productsData.find((p) => p.id === item.id)
                if (!product) return null
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-peach/30 p-3 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                  >
                    <div className="grid grid-cols-[84px_minmax(0,1fr)_36px] gap-3 sm:grid-cols-[104px_minmax(0,1fr)_122px_110px_40px] sm:items-center sm:gap-4">
                      <div
                        data-cart-image
                        className="row-span-3 aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center sm:row-span-1"
                      >
                        <ProductImage
                          product={product}
                          className="max-h-full max-w-full"
                          emojiClassName="text-4xl sm:text-5xl"
                        />
                      </div>
                      <div className="min-w-0 self-start sm:self-center">
                        <p className="mb-1 text-[10px] font-mono uppercase tracking-wide text-warm-brown/40">
                          {product.code}
                        </p>
                        <h3 className="font-semibold text-primary text-[13px] leading-snug sm:text-base">
                          {getProductName(product, language)}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                          <p className="text-ribbon-red font-bold text-base">RM{product.price.toFixed(2)}</p>
                          <span className="text-xs text-warm-brown/45">x{item.quantity}</span>
                        </div>
                      </div>
                      <div className="col-start-2 row-start-2 flex h-10 w-fit items-center rounded-full border border-peach/60 bg-light px-1 shadow-inner sm:col-start-auto sm:row-start-auto">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-8 w-8 rounded-full flex items-center justify-center text-warm-brown/60 transition-colors hover:bg-white hover:text-ribbon-red"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-9 text-center text-sm font-semibold text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8 rounded-full flex items-center justify-center text-warm-brown/60 transition-colors hover:bg-white hover:text-ribbon-red"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <p className="col-start-2 col-span-2 row-start-3 self-center justify-self-end text-right font-bold text-primary text-[15px] leading-tight sm:col-start-auto sm:col-span-1 sm:row-start-auto sm:justify-self-auto sm:text-base">
                        RM{(product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="col-start-3 row-start-1 flex h-9 w-9 items-center justify-center justify-self-end rounded-full text-warm-brown/40 transition-colors hover:bg-ribbon-red/10 hover:text-ribbon-red sm:col-start-auto sm:row-start-auto sm:h-10 sm:w-10 sm:justify-self-auto"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                )
              })}
              <button
                onClick={clearCart}
                className="min-h-10 px-2 text-sm text-warm-brown/60 hover:text-ribbon-red transition-colors underline"
              >
                {t('cartPage.clearCart')}
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="hidden bg-white rounded-2xl border border-peach/30 p-6 sticky top-24 shadow-sm lg:block">
                <h3 className="font-bold text-primary text-lg mb-4">{t('cartPage.orderSummary')}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-brown/60">{t('cartPage.subtotal')}</span>
                    <span className="text-primary font-medium">RM{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-warm-brown/60">{t('cartPage.shipping')}</span>
                    <span className="text-right text-warm-brown/70 font-medium">{shippingEstimate}</span>
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

            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-peach/40 bg-white/95 px-3 py-2.5 pb-[calc(env(safe-area-inset-bottom)+0.625rem)] shadow-[0_-12px_30px_rgba(74,44,42,0.12)] backdrop-blur lg:hidden">
              <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_minmax(168px,1.35fr)] items-center gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-warm-brown/55">{t('cartPage.total')}</p>
                  <p className="truncate text-lg font-bold text-ribbon-red">RM{subtotal.toFixed(2)}</p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-2.5 py-2.5 text-[11px] font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-colors hover:bg-[#1da851] sm:text-sm"
                >
                  <FaWhatsapp size={18} />
                  {t('cartPage.checkoutWhatsApp')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
