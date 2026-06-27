import { FiStar, FiHeart } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Verified Buyer',
    avatar: '👩',
    rating: 5,
    text: 'The bear night lamp is SO cute! My daughter loves it. The quality is amazing for the price. Will order more!',
  },
  {
    name: 'James K.',
    role: 'Verified Buyer',
    avatar: '👨',
    rating: 5,
    text: 'Everything came perfectly packaged with adorable touches. The stirring mug is both functional and kawaii!',
  },
  {
    name: 'Lisa R.',
    role: 'Verified Buyer',
    avatar: '👩‍🦰',
    rating: 5,
    text: 'Best online store for cute lifestyle products! Fast shipping and amazing customer service. 10/10 recommend ♡',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-ribbon-red font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            What Our Customers Say 💕
          </h2>
          <p className="text-warm-brown/60 max-w-2xl mx-auto">
            Join thousands of happy customers who trust LUMA for cute and quality products.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-cream p-8 rounded-2xl border border-peach/30 hover:shadow-md hover:shadow-peach/20 transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FiStar key={i} className="text-gold fill-current" size={16} />
                ))}
              </div>

              {/* Text */}
              <p className="text-warm-brown/70 leading-relaxed mb-6">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-soft-pink rounded-full flex items-center justify-center text-2xl border-2 border-peach">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-warm-brown/50 flex items-center gap-1">
                    <FiHeart size={10} className="text-ribbon-red" />
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
