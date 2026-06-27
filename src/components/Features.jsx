import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi'

const features = [
  {
    icon: FiTruck,
    title: 'Free Shipping',
    description: 'Free delivery on all orders over $50. Fast and reliable worldwide shipping.',
  },
  {
    icon: FiShield,
    title: 'Secure Payment',
    description: 'Your payment info is safe with 256-bit SSL encryption on every transaction.',
  },
  {
    icon: FiRefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy. Not satisfied? Get your money back.',
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    description: 'Our dedicated support team is here to help you anytime, anywhere.',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-cream rounded-2xl border border-peach/30 hover:shadow-md hover:shadow-peach/20 transition-all"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-soft-pink rounded-xl mb-4">
                <feature.icon className="text-ribbon-red" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-warm-brown/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
