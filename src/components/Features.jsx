import { FiTruck, FiShield, FiHeadphones } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Features() {
  const { t } = useLanguage()
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.15 })

  const features = [
    {
      icon: FiTruck,
      title: t('features.freeShipping'),
      description: t('features.freeShippingDesc'),
    },
    {
      icon: FiShield,
      title: t('features.securePayment'),
      description: t('features.securePaymentDesc'),
    },

    {
      icon: FiHeadphones,
      title: t('features.support'),
      description: t('features.supportDesc'),
    },
  ]

  // Duplicate features for seamless infinite scroll
  const scrollItems = [...features, ...features]

  return (
    <section
      ref={sectionRef}
      className={`py-12 sm:py-16 bg-white/50 overflow-hidden scroll-fade-up ${sectionVisible ? 'visible' : ''}`}
    >
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white/50 to-transparent z-10 pointer-events-none"></div>

        {/* Infinite scroll container */}
        <div className="flex animate-scroll-right hover:[animation-play-state:paused]">
          {scrollItems.map((feature, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] sm:w-[320px] mx-3 sm:mx-4"
            >
              <div className="text-center p-6 bg-cream rounded-2xl border border-peach/30 hover:shadow-lg hover:shadow-peach/20 hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-soft-pink rounded-xl mb-4">
                  <feature.icon className="text-ribbon-red" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-warm-brown/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
