import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Newsletter() {
  const { t } = useLanguage()
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.2 })
  const [btnRef, btnVisible] = useScrollAnimation({ threshold: 0.3 })

  const whatsappNumber = '60123456789'
  const whatsappMessage = encodeURIComponent('Hi LUMA! I would like to know more about your products.')
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-secondary to-dark-brown relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-ribbon-red/10 rounded-full blur-3xl animate-pulse-soft"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse-soft [animation-delay:1s]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-peach/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title - flip in */}
        <div
          ref={sectionRef}
          className={`scroll-flip-up ${sectionVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('newsletter.title')}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            {t('newsletter.description')}
          </p>
        </div>

        {/* WhatsApp Button - pop in */}
        <div
          ref={btnRef}
          className={`scroll-pop-in ${btnVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5b] text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-[#25D366]/30 text-lg"
          >
            <FaWhatsapp size={24} />
            {t('newsletter.contactWhatsApp')}
          </a>

          <p className="text-white/40 text-sm mt-4">
            {t('newsletter.privacy')}
          </p>
        </div>
      </div>
    </section>
  )
}
