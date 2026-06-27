import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaTwitter } from 'react-icons/fa'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

export default function SocialMedia() {
  const { t } = useLanguage()
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.3 })
  const [gridRef, gridVisible] = useStaggerAnimation({ threshold: 0.08 })

  const socialPlatforms = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      handle: '@lumalifeofficial',
      color: 'from-purple-400 via-pink-400 to-orange-300',
      url: 'https://instagram.com/lumalifeofficial',
      description: t('social.instagram'),
    },
    {
      name: 'Facebook',
      icon: FaFacebookF,
      handle: 'LUMA LIFE CPY',
      color: 'from-blue-400 to-blue-500',
      url: 'https://www.facebook.com/lumalifecpy',
      description: t('social.facebook'),
    },
    {
      name: 'TikTok',
      icon: FaTiktok,
      handle: '@lumalifeofficial',
      color: 'from-gray-700 to-gray-800',
      url: 'https://tiktok.com/@lumalifeofficial',
      description: t('social.tiktok'),
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      handle: 'LumaLife Official',
      color: 'from-red-400 to-red-500',
      url: 'https://youtube.com/@lumalifeofficial',
      description: t('social.youtube'),
    },
    {
      name: 'Twitter / X',
      icon: FaTwitter,
      handle: '@lumalifeofficial',
      color: 'from-gray-600 to-gray-700',
      url: 'https://x.com/lumalifeofficial',
      description: t('social.twitter'),
    },
  ]

  return (
    <section id="contact" className="py-20 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - slide up bounce */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-slide-up-bounce ${headerVisible ? 'visible' : ''}`}
        >
          <span className="text-ribbon-red font-semibold text-sm uppercase tracking-wider">{t('social.sectionLabel')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            {t('social.title')}
          </h2>
          <p className="text-warm-brown/60 max-w-2xl mx-auto">
            {t('social.description')}
          </p>
        </div>

        {/* Social Cards Grid - staggered pop-in */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPlatforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-peach/30 hover:scale-[1.02] scroll-pop-in ${
                gridVisible ? 'visible' : ''
              }`}
              style={{
                transitionDelay: gridVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-85 group-hover:opacity-100 transition-opacity`}></div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-between mb-4">
                  <platform.icon size={32} className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-bold mb-1">{platform.name}</h3>
                <p className="text-white/70 text-sm mb-3">{platform.handle}</p>
                <p className="text-white/60 text-sm">{platform.description}</p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">{t('social.followUs')}</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
