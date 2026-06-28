import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar, FiGrid, FiList, FiChevronLeft, FiFilter, FiX } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import productsData from '../data/products'

export default function ProductsPage() {
  const { t } = useLanguage()
  const phoneNumber = '60198688608'

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState('grid')
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  // Cart & Wishlist counts
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem('luma-cart') || '[]')
      const wishlist = JSON.parse(localStorage.getItem('luma-wishlist') || '[]')
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0))
      setWishlistCount(wishlist.length)
    }
    updateCounts()
    window.addEventListener('storage', updateCounts)
    return () => window.removeEventListener('storage', updateCounts)
  }, [])

  const categories = [
    { key: 'all', label: t('shopPage.allCategories') },
    { key: 'lighting', label: t('shopPage.lighting') },
    { key: 'electronics', label: t('shopPage.electronics') },
    { key: 'kitchen', label: t('shopPage.kitchen') },
    { key: 'home', label: t('shopPage.home') },
    { key: 'accessories', label: t('shopPage.accessories') },
  ]

  const sortOptions = [
    { key: 'popular', label: t('shopPage.sortPopular') },
    { key: 'newest', label: t('shopPage.sortNewest') },
    { key: 'priceLow', label: t('shopPage.sortPriceLow') },
    { key: 'priceHigh', label: t('shopPage.sortPriceHigh') },
    { key: 'rating', label: t('shopPage.sortRating') },
  ]

  const ratingOptions = [
    { value: 0, label: t('shopPage.allRatings') },
    { value: 4, label: '4★ & ' + t('shopPage.above') },
    { value: 3, label: '3★ & ' + t('shopPage.above') },
  ]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = productsData.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false
      if (product.rating < minRating) return false
      return true
    })

    switch (sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.price - b.price)
        break
      case 'priceHigh':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => b.id - a.id)
        break
      default:
        result.sort((a, b) => b.reviews - a.reviews)
    }

    return result
  }, [selectedCategory, priceRange, minRating, sortBy])

  const handleOrder = (product) => {
    const name = t(`shopPage.products.${product.nameKey}`)
    const message = `Hi, I'm interested in ordering:\n\nItem Code: ${product.code}\nProduct: ${name}\nPrice: RM${product.price}`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('luma-cart') || '[]')
    const existing = cart.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ id: product.id, quantity: 1 })
    }
    localStorage.setItem('luma-cart', JSON.stringify(cart))
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0))
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange([0, 100])
    setMinRating(0)
    setSortBy('popular')
  }

  const FilterSidebar = ({ mobile = false }) => (
    <div className={mobile ? '' : 'sticky top-24'}>
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wider">
          {t('shopPage.categories')}
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-ribbon-red/10 text-ribbon-red font-medium'
                  : 'text-warm-brown/70 hover:bg-cream hover:text-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wider">
          {t('shopPage.priceRange')}
        </h3>
        <div className="px-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-warm-brown/60">RM{priceRange[0]}</span>
            <span className="text-warm-brown/40">—</span>
            <span className="text-sm text-warm-brown/60">RM{priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-ribbon-red"
            aria-label="Maximum price"
          />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => setPriceRange([0, 20])}
              className={`text-xs px-2 py-1.5 rounded border transition-colors ${
                priceRange[1] === 20 ? 'border-ribbon-red text-ribbon-red bg-ribbon-red/5' : 'border-peach/50 text-warm-brown/60 hover:border-ribbon-red'
              }`}
            >
              RM0 - RM20
            </button>
            <button
              onClick={() => setPriceRange([0, 35])}
              className={`text-xs px-2 py-1.5 rounded border transition-colors ${
                priceRange[1] === 35 ? 'border-ribbon-red text-ribbon-red bg-ribbon-red/5' : 'border-peach/50 text-warm-brown/60 hover:border-ribbon-red'
              }`}
            >
              RM0 - RM35
            </button>
            <button
              onClick={() => setPriceRange([0, 50])}
              className={`text-xs px-2 py-1.5 rounded border transition-colors ${
                priceRange[1] === 50 ? 'border-ribbon-red text-ribbon-red bg-ribbon-red/5' : 'border-peach/50 text-warm-brown/60 hover:border-ribbon-red'
              }`}
            >
              RM0 - RM50
            </button>
            <button
              onClick={() => setPriceRange([0, 100])}
              className={`text-xs px-2 py-1.5 rounded border transition-colors ${
                priceRange[1] === 100 ? 'border-ribbon-red text-ribbon-red bg-ribbon-red/5' : 'border-peach/50 text-warm-brown/60 hover:border-ribbon-red'
              }`}
            >
              {t('shopPage.allPrices')}
            </button>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wider">
          {t('shopPage.rating')}
        </h3>
        <div className="space-y-1 px-3">
          {ratingOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMinRating(opt.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                minRating === opt.value
                  ? 'bg-ribbon-red/10 text-ribbon-red font-medium'
                  : 'text-warm-brown/70 hover:bg-cream hover:text-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full px-4 py-2 border border-warm-brown/20 text-warm-brown/60 rounded-lg text-sm hover:border-ribbon-red hover:text-ribbon-red transition-colors"
      >
        {t('shopPage.clearFilters')}
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-peach/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-primary hover:text-ribbon-red transition-colors"
              >
                <FiChevronLeft size={20} />
                <span className="font-medium text-sm">{t('shopPage.backToHome')}</span>
              </Link>
            </div>
            <h1 className="font-bold text-primary text-lg">{t('shopPage.title')}</h1>
            <div className="flex items-center gap-3">
              <Link to="/wishlist" className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Wishlist">
                <FiHeart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-ribbon-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Cart">
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-ribbon-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Bar: Sort + View Mode + Results Count */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 border border-peach/30">
          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setShowMobileFilter(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 border border-peach/50 rounded-lg text-sm text-warm-brown/70 hover:border-ribbon-red hover:text-ribbon-red transition-colors"
            >
              <FiFilter size={16} />
              {t('shopPage.filters')}
            </button>
            <span className="text-sm text-warm-brown/60">
              {filteredProducts.length} {t('shopPage.results')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-peach/50 rounded-lg px-3 py-2 text-warm-brown/70 bg-white focus:outline-none focus:border-ribbon-red"
              aria-label="Sort products"
            >
              {sortOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-peach/50 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-ribbon-red text-white' : 'text-warm-brown/60 hover:text-primary'
                }`}
                aria-label="Grid view"
              >
                <FiGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' ? 'bg-ribbon-red text-white' : 'text-warm-brown/60 hover:text-primary'
                }`}
                aria-label="List view"
              >
                <FiList size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-5 border border-peach/30">
              <FilterSidebar />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {showMobileFilter && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilter(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-primary text-lg">{t('shopPage.filters')}</h2>
                  <button
                    onClick={() => setShowMobileFilter(false)}
                    className="p-2 text-warm-brown/60 hover:text-primary"
                    aria-label="Close filters"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                <FilterSidebar mobile />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-peach/30">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-warm-brown/60 text-lg">{t('shopPage.noResults')}</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-ribbon-red text-white rounded-full text-sm font-medium hover:bg-ribbon-red/90 transition-colors"
                >
                  {t('shopPage.clearFilters')}
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl border border-peach/30 overflow-hidden hover:shadow-lg hover:shadow-peach/20 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-ribbon-red/30"
                  >
                    {/* Product Image */}
                    <Link to={`/product/${product.id}`} className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-6 flex items-center justify-center h-40 block">
                      <span className="text-5xl group-hover:scale-125 group-hover:rotate-3 transition-transform duration-500 ease-out">
                        {product.emoji}
                      </span>
                      <span className="absolute top-2 left-2 bg-ribbon-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {t(`products.${product.badgeKey}`)}
                      </span>
                      <button
                        className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:bg-ribbon-red hover:text-white transition-colors text-primary opacity-0 group-hover:opacity-100"
                        aria-label={`Add to wishlist`}
                        onClick={(e) => {
                          e.preventDefault()
                          const wishlist = JSON.parse(localStorage.getItem('luma-wishlist') || '[]')
                          if (!wishlist.includes(product.id)) {
                            wishlist.push(product.id)
                            localStorage.setItem('luma-wishlist', JSON.stringify(wishlist))
                            setWishlistCount(wishlist.length)
                          } else {
                            const updated = wishlist.filter((id) => id !== product.id)
                            localStorage.setItem('luma-wishlist', JSON.stringify(updated))
                            setWishlistCount(updated.length)
                          }
                        }}
                      >
                        <FiHeart size={12} />
                      </button>
                    </Link>

                    {/* Product Info */}
                    <div className="p-3">
                      <p className="text-[10px] font-mono text-warm-brown/40">{product.code}</p>
                      <h3 className="font-medium text-primary text-sm mb-1 line-clamp-2 leading-tight">
                        {t(`shopPage.products.${product.nameKey}`)}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <FiStar className="text-gold fill-current" size={11} />
                        <span className="text-xs text-warm-brown/60">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-base font-bold text-ribbon-red">RM{product.price}</span>
                          <span className="text-[10px] text-warm-brown/40 line-through ml-1">RM{product.originalPrice}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mt-2 w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1da851] text-white py-1.5 rounded-lg text-xs font-medium transition-colors"
                        aria-label={`Order via WhatsApp`}
                      >
                        <FiShoppingCart size={12} />
                        {t('products.addToCart')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl border border-peach/30 overflow-hidden hover:shadow-lg hover:shadow-peach/20 transition-all duration-300 hover:border-ribbon-red/30 flex"
                  >
                    {/* Product Image */}
                    <div className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-6 flex items-center justify-center w-40 flex-shrink-0">
                      <span className="text-4xl group-hover:scale-125 group-hover:rotate-3 transition-transform duration-500 ease-out">
                        {product.emoji}
                      </span>
                      <span className="absolute top-2 left-2 bg-ribbon-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {t(`products.${product.badgeKey}`)}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] font-mono text-warm-brown/40">{product.code}</p>
                        <h3 className="font-semibold text-primary text-base mb-1">
                          {t(`shopPage.products.${product.nameKey}`)}
                        </h3>
                        <div className="flex items-center gap-1 mb-2">
                          <FiStar className="text-gold fill-current" size={13} />
                          <span className="text-sm text-warm-brown/60">
                            {product.rating} ({product.reviews} {t('shopPage.reviewsLabel')})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-ribbon-red">RM{product.price}</span>
                          <span className="text-sm text-warm-brown/40 line-through">RM{product.originalPrice}</span>
                          <span className="text-xs bg-ribbon-red/10 text-ribbon-red px-2 py-0.5 rounded-full font-medium">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </span>
                        </div>
                        <button
                          onClick={() => handleOrder(product)}
                          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                          aria-label={`Order via WhatsApp`}
                        >
                          <FiShoppingCart size={14} />
                          {t('products.addToCart')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
