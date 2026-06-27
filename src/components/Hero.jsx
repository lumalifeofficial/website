import { FiArrowRight, FiHeart } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-cream">
      {/* Soft decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-peach/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-soft-pink/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gold/15 rounded-full blur-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-peach/50">
              <FiHeart className="text-ribbon-red" size={14} />
              <span className="text-primary/80 text-sm font-medium">{t('hero.badge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary leading-tight mb-6">
              {t('hero.titleLine1')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ribbon-red to-gold">
                {t('hero.titleLine2')}
              </span>
            </h1>

            <p className="text-lg text-warm-brown/70 max-w-lg mb-8 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#shop"
                className="inline-flex items-center justify-center gap-2 bg-ribbon-red hover:bg-ribbon-red/90 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-ribbon-red/20"
              >
                {t('hero.shopNow')}
                <FiArrowRight />
              </a>
              <a
                href="#collections"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary/20 hover:border-primary/40 text-primary px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/50"
              >
                {t('hero.viewCollections')}
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              <div>
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="text-warm-brown/50 text-sm">{t('hero.happyCustomers')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">200+</p>
                <p className="text-warm-brown/50 text-sm">{t('hero.products')}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4.9★</p>
                <p className="text-warm-brown/50 text-sm">{t('hero.rating')}</p>
              </div>
            </div>
          </div>

          {/* Hero Visual — Logo/Bear */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 sm:w-96 sm:h-96 bg-gradient-to-br from-peach/40 to-soft-pink/40 rounded-full blur-xl absolute inset-0 -m-8"></div>
              <div className="relative">
                <img
                  src="/image.png"
                  alt="LUMA - Carry A Smile"
                  className="w-80 sm:w-[420px] h-auto drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/40 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
