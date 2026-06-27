import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'

const products = [
  {
    id: 1,
    name: 'Bear LED Night Lamp',
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    emoji: '🧸💡',
  },
  {
    id: 2,
    name: 'Kawaii Mini Fan',
    price: 19.99,
    originalPrice: 34.99,
    rating: 4.6,
    reviews: 89,
    badge: 'Hot',
    emoji: '🌸🌀',
  },
  {
    id: 3,
    name: 'Cute Stirring Mug',
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviews: 201,
    badge: 'New',
    emoji: '🐻☕',
  },
  {
    id: 4,
    name: 'Pastel Kitchen Mat',
    price: 14.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviews: 156,
    badge: 'Sale',
    emoji: '🎀🍳',
  },
  {
    id: 5,
    name: 'Cloud Wireless Charger',
    price: 34.99,
    originalPrice: 54.99,
    rating: 4.8,
    reviews: 312,
    badge: 'Popular',
    emoji: '☁️⚡',
  },
  {
    id: 6,
    name: 'Bear Aroma Diffuser',
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviews: 178,
    badge: 'Trending',
    emoji: '🐻🌿',
  },
]

export default function Products() {
  return (
    <section id="shop" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-ribbon-red font-semibold text-sm uppercase tracking-wider">Our Products</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            Trending This Week 🎀
          </h2>
          <p className="text-warm-brown/60 max-w-2xl mx-auto">
            Adorable products that combine cuteness, quality, and functionality for your everyday happiness.
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
                <h3 className="font-semibold text-primary text-lg mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <FiStar className="text-gold fill-current" size={14} />
                  <span className="text-sm text-warm-brown/60">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                    <span className="text-sm text-warm-brown/40 line-through">${product.originalPrice}</span>
                  </div>
                  <button
                    className="flex items-center gap-2 bg-primary hover:bg-ribbon-red text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <FiShoppingCart size={14} />
                    Add
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
            View All Products ♡
          </a>
        </div>
      </div>
    </section>
  )
}
