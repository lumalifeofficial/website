import { FiStar, FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import productsData from '../data/products'
import { getProductImages, getProductName } from '../utils/productImage'

export default function Testimonials() {
  const { t, language } = useLanguage()
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 })
  const [cardsRef, cardsVisible] = useStaggerAnimation({ threshold: 0.1 })

  const testimonials = [
    {
      name: 'Aina Z.',
      role: t('testimonials.verifiedBuyer'),
      location: t('testimonials.location1'),
      product: productsData[0],
      avatar: 'AZ',
      rating: 5,
      text: t('testimonials.review1'),
    },
    {
      name: 'Michelle T.',
      role: t('testimonials.verifiedBuyer'),
      location: t('testimonials.location2'),
      product: productsData[7],
      avatar: 'MT',
      rating: 5,
      text: t('testimonials.review2'),
    },
    {
      name: 'Nurul H.',
      role: t('testimonials.verifiedBuyer'),
      location: t('testimonials.location3'),
      product: productsData[5],
      avatar: 'NH',
      rating: 4,
      text: t('testimonials.review3'),
    },
    {
      name: 'Grace L.',
      role: t('testimonials.verifiedBuyer'),
      location: t('testimonials.location4'),
      product: productsData[1],
      avatar: 'GL',
      rating: 5,
      text: t('testimonials.review4'),
    },
    {
      name: 'Farah M.',
      role: t('testimonials.verifiedBuyer'),
      location: t('testimonials.location5'),
      product: productsData[3],
      avatar: 'FM',
      rating: 3,
      text: t('testimonials.review5'),
    },
    {
      name: 'Yvonne C.',
      role: t('testimonials.verifiedBuyer'),
      location: t('testimonials.location6'),
      product: productsData[8],
      avatar: 'YC',
      rating: 4,
      text: t('testimonials.review6'),
    },
  ]

  const cardAnimations = ['scroll-fade-left', 'scroll-fade-up', 'scroll-fade-right']

  return (
    <section className="py-20 bg-white/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={'text-center mb-16 scroll-blur-in ' + (headerVisible ? 'visible' : '')}
        >
          <span className="text-ribbon-red font-semibold text-sm uppercase tracking-wider">{t('testimonials.sectionLabel')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-warm-brown/60 max-w-2xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const [productImage] = getProductImages(testimonial.product, language)
            const productName = getProductName(testimonial.product, language)
            const cardClassName =
              'bg-cream p-6 sm:p-7 rounded-xl border border-peach/40 hover:shadow-lg hover:shadow-peach/20 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ' +
              cardAnimations[index % cardAnimations.length] +
              (cardsVisible ? ' visible' : '')

            return (
              <div
                key={testimonial.name}
                className={cardClassName}
                style={{
                  transitionDelay: cardsVisible ? index * 150 + 'ms' : '0ms',
                }}
              >
                <div className="mb-5 flex items-center gap-4 border-b border-peach/40 pb-5">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white p-1.5">
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={productName}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-3xl">
                        {testimonial.product.emoji}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ribbon-red">
                      <FiShoppingBag size={13} />
                      {t('testimonials.productTag')}
                    </p>
                    <p className="text-sm font-semibold leading-snug text-primary">
                      {productName}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={i < testimonial.rating ? 'text-gold fill-current' : 'text-peach'}
                      size={16}
                    />
                  ))}
                </div>

                <p className="text-warm-brown/75 leading-relaxed mb-6">"{testimonial.text}"</p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-soft-pink rounded-full flex items-center justify-center text-sm font-bold text-primary border-2 border-peach">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-warm-brown/55 flex items-center gap-1">
                      <FiHeart size={10} className="text-ribbon-red" />
                      {testimonial.role} · {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
