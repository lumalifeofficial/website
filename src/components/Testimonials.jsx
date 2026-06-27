import { FiStar, FiHeart } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

export default function Testimonials() {
  const { t } = useLanguage()
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 })
  const [cardsRef, cardsVisible] = useStaggerAnimation({ threshold: 0.1 })

  const testimonials = [
    {
      name: 'Sarah M.',
      role: t('testimonials.verifiedBuyer'),
      avatar: '👩',
      rating: 5,
      text: t('testimonials.review1'),
    },
    {
      name: 'James K.',
      role: t('testimonials.verifiedBuyer'),
      avatar: '👨',
      rating: 5,
      text: t('testimonials.review2'),
    },
    {
      name: 'Lisa R.',
      role: t('testimonials.verifiedBuyer'),
      avatar: '👩‍🦰',
      rating: 5,
      text: t('testimonials.review3'),
    },
  ]

  // Alternate animation directions per card
  const cardAnimations = ['scroll-fade-left', 'scroll-fade-up', 'scroll-fade-right']

  return (
    <section className="py-20 bg-white/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - blur in */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-blur-in ${headerVisible ? 'visible' : ''}`}
        >
          <span className="text-ribbon-red font-semibold text-sm uppercase tracking-wider">{t('testimonials.sectionLabel')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-warm-brown/60 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonial Cards - each from different direction */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-cream p-8 rounded-2xl border border-peach/30 hover:shadow-lg hover:shadow-peach/20 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ${cardAnimations[index]} ${
                cardsVisible ? 'visible' : ''
              }`}
              style={{
                transitionDelay: cardsVisible ? `${index * 150}ms` : '0ms',
              }}
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
