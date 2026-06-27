import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'

export default function Products() {
  const { t } = useLanguage()

  const phoneNumber = '60198688608'

  const products = [
    {
      id: 1,
      code: 'BL001',
      name: t('products.bearLamp'),
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.8,
      reviews: 124,
      badge: t('products.bestSeller'),
      emoji: '🧸💡',
    },
    {
      id: 2,
      code: 'MF002',
      name: t('products.miniFan'),
      price: 19.99,
      originalPrice: 34.99,
      rating: 4.6,
      reviews: 89,
      badge: t('products.hot'),
      emoji: '🌸🌀',
    },
    {
      id: 3,
      code: 'SM003',
      name: t('products.stirringMug'),
      price: 24.99,
      originalPrice: 39.99,
      rating: 4.9,
      reviews: 201,
      badge: t('products.new'),
      emoji: '🐻☕',
    },
    {
      id: 4,
      code: 'KM004',
      name: t('products.kitchenMat'),
      price: 14.99,
      originalPrice: 24.99,
      rating: 4.7,
      reviews: 156,
      badge: t('products.sale'),
      emoji: '🎀🍳',
    },
    {
      id: 5,
      code: 'WC005',
      name: t('products.wirelessCharger'),
      price: 34.99,
      originalPrice: 54.99,
      rating: 4.8,
      reviews: 312,
      badge: t('products.popular'),
      emoji: '☁️⚡',
    },
    {
      id: 6,
      code: 'AD006',
      name: t('products.aromaDiffuser'),
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.9,
      reviews: 178,
      badge: t('products.trending'),
      emoji: '🐻🌿',
    },
  ]

  const handleOrder = (product) => {
    const message = `Hi, I'm interested in ordering:\n\nItem Code: ${product.code}\nProduct: ${product.name}\nPrice: RM${product.price}`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <section id="shop" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-ribbon-red font-semibold text-sm uppercase tracking-wider">{t('products.sectionLabel')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            {t('products.title')}
          </h2>
          <p className="text-warm-brown/60 max-w-2xl mx-auto">
            {t('products.description')}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-peach/30 overflow-hidden hover:shadow-xl hover:shadow-peach/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product Image Area */}
              <div className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-8 flex items-center justify-center h-56">
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {product.emoji}
                </span>
                {/* Badge */}
                <span className="absolute top-4 left-4 bg-ribbon-red text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
                {/* Wishlist */}
                <button
                  className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-ribbon-red hover:text-white transition-colors text-primary"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <FiHeart size={16} />
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
                    <span className="text-xl font-bold text-primary">RM{product.price}</span>
                    <span className="text-sm text-warm-brown/40 line-through">RM{product.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => handleOrder(product)}
                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    aria-label={`Order ${product.name} via WhatsApp`}
                  >
                    <FiShoppingCart size={14} />
                    {t('products.addToCart')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-all"
          >
            {t('products.viewAll')}
          </a>
        </div>
      </div>
    </section>
  )
}
