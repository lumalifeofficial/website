import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiChevronLeft, FiHeart, FiShoppingCart, FiStar, FiShare2, FiMinus, FiPlus } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import productsData from '../data/products'

export default function ProductDetailPage() {
  const { t } = useLanguage()
  const { id } = useParams()
  const phoneNumber = '60198688608'
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.1 })
  const [infoRef, infoVisible] = useScrollAnimation({ threshold: 0.1 })
  const [relatedRef, relatedVisible] = useScrollAnimation({ threshold: 0.1 })

  const product = productsData.find((p) => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl block mb-4">😢</span>
          <h2 className="text-2xl font-bold text-primary mb-2">{t('productDetail.notFound')}</h2>
          <Link to="/products" className="text-ribbon-red hover:underline text-sm">
            {t('productDetail.backToProducts')}
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('luma-cart') || '[]')
    const existing = cart.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({ id: product.id, quantity })
    }
    localStorage.setItem('luma-cart', JSON.stringify(cart))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('luma-wishlist') || '[]')
    if (isWishlisted) {
      const updated = wishlist.filter((wId) => wId !== product.id)
      localStorage.setItem('luma-wishlist', JSON.stringify(updated))
    } else {
      wishlist.push(product.id)
      localStorage.setItem('luma-wishlist', JSON.stringify(wishlist))
    }
    setIsWishlisted(!isWishlisted)
  }

  const handleOrder = () => {
    const name = t(`shopPage.products.${product.nameKey}`)
    const message = `Hi! I'd like to order:\n\nItem Code: ${product.code}\nProduct: ${name}\nQuantity: ${quantity}\nTotal: RM${(product.price * quantity).toFixed(2)}`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: t(`shopPage.products.${product.nameKey}`), url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert(t('productDetail.linkCopied'))
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-peach/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/products" className="flex items-center gap-2 text-primary hover:text-ribbon-red transition-colors">
              <FiChevronLeft size={20} />
              <span className="font-medium text-sm">{t('productDetail.backToProducts')}</span>
            </Link>
            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Share">
                <FiShare2 size={18} />
              </button>
              <button onClick={handleWishlist} className={`p-2 transition-colors ${isWishlisted ? 'text-ribbon-red' : 'text-primary hover:text-ribbon-red'}`} aria-label="Wishlist">
                <FiHeart size={18} className={isWishlisted ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div
            ref={imageRef}
            className={`bg-white rounded-3xl border border-peach/30 p-12 flex items-center justify-center min-h-[400px] scroll-zoom-in ${imageVisible ? 'visible' : ''}`}
          >
            <div className="text-center">
              <span className="text-[120px] block animate-float">{product.emoji}</span>
              <span className="inline-block mt-4 bg-ribbon-red text-white text-xs font-bold px-3 py-1 rounded-full">
                {t(`products.${product.badgeKey}`)}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div
            ref={infoRef}
            className={`scroll-fade-right ${infoVisible ? 'visible' : ''}`}
          >
            <p className="text-xs font-mono text-warm-brown/40 mb-1">{product.code}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              {t(`shopPage.products.${product.nameKey}`)}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-gold fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-warm-brown/60">
                {product.rating} ({product.reviews} {t('productDetail.reviews')})
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-ribbon-red">RM{product.price}</span>
              <span className="text-lg text-warm-brown/40 line-through">RM{product.originalPrice}</span>
              <span className="text-sm bg-ribbon-red/10 text-ribbon-red px-2 py-0.5 rounded-full font-medium">
                -{discount}%
              </span>
            </div>

            <p className="text-warm-brown/70 leading-relaxed mb-6">
              {t('productDetail.description')}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-primary">{t('productDetail.quantity')}:</span>
              <div className="flex items-center gap-3 border border-peach/50 rounded-full px-3 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-warm-brown/60 hover:text-ribbon-red transition-colors"
                  aria-label="Decrease"
                >
                  <FiMinus size={14} />
                </button>
                <span className="w-8 text-center font-medium text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-warm-brown/60 hover:text-ribbon-red transition-colors"
                  aria-label="Increase"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleOrder}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white py-3.5 rounded-full font-semibold transition-colors"
              >
                <FaWhatsapp size={20} />
                {t('productDetail.orderWhatsApp')}
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 bg-ribbon-red hover:bg-ribbon-red/90 text-white py-3.5 rounded-full font-semibold transition-colors"
              >
                <FiShoppingCart size={18} />
                {addedToCart ? t('productDetail.addedToCart') : t('productDetail.addToCart')}
              </button>
            </div>

            {/* Features */}
            <div className="mt-8">
              <div className="text-center p-3 bg-white rounded-xl border border-peach/30 max-w-[160px] mx-auto">
                <span className="text-lg block mb-1">🔒</span>
                <p className="text-xs text-warm-brown/60">{t('productDetail.securePayment')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section
            ref={relatedRef}
            className={`mt-16 scroll-fade-up ${relatedVisible ? 'visible' : ''}`}
          >
            <h2 className="text-2xl font-bold text-primary mb-6">{t('productDetail.relatedProducts')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/product/${rp.id}`}
                  className="group bg-white rounded-xl border border-peach/30 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-cream to-soft-pink/50 p-6 flex items-center justify-center h-32">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{rp.emoji}</span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-primary text-sm line-clamp-1">
                      {t(`shopPage.products.${rp.nameKey}`)}
                    </h3>
                    <p className="text-ribbon-red font-bold text-sm">RM{rp.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
