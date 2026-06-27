import { FiMail, FiGift } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'

export default function Newsletter() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-secondary to-dark-brown relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-ribbon-red/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-peach/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/10">
          <FiGift className="text-gold" />
          <span className="text-white/80 text-sm font-medium">{t('newsletter.badge')}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {t('newsletter.title')}
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          {t('newsletter.description')}
        </p>

        {/* Form */}
        <form
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-brown/40" size={18} />
            <input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-primary placeholder-warm-brown/40 focus:outline-none focus:ring-2 focus:ring-ribbon-red/50"
              aria-label="Email address"
            />
          </div>
          <button
            type="submit"
            className="bg-ribbon-red hover:bg-ribbon-red/90 text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-ribbon-red/30 whitespace-nowrap"
          >
            {t('newsletter.subscribe')}
          </button>
        </form>

        <p className="text-white/40 text-sm mt-4">
          {t('newsletter.privacy')}
        </p>
      </div>
    </section>
  )
}
