import { Link } from 'react-router-dom'
import { FiChevronLeft, FiHeart, FiStar, FiTruck, FiShield, FiSmile } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'
import LanguageSelector from '../components/LanguageSelector'

export default function AboutPage() {
  const { t } = useLanguage()
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 })
  const [storyRef, storyVisible] = useScrollAnimation({ threshold: 0.15 })
  const [valuesRef, valuesVisible] = useStaggerAnimation({ threshold: 0.1 })
  const [teamRef, teamVisible] = useStaggerAnimation({ threshold: 0.1 })
  const [statsRef, statsVisible] = useStaggerAnimation({ threshold: 0.1 })

  const values = [
    { icon: <FiHeart size={24} />, key: 'joy' },
    { icon: <FiStar size={24} />, key: 'quality' },
    { icon: <FiTruck size={24} />, key: 'reliability' },
    { icon: <FiShield size={24} />, key: 'trust' },
    { icon: <FiSmile size={24} />, key: 'community' },
  ]

  const teamMembers = [
    { emoji: '👩‍💼', key: 'founder' },
    { emoji: '👨‍🎨', key: 'designer' },
    { emoji: '👩‍💻', key: 'developer' },
    { emoji: '📦', key: 'operations' },
  ]

  const stats = [
    { number: '10K+', key: 'happyCustomers' },
    { number: '500+', key: 'productsListed' },
    { number: '50+', key: 'countriesServed' },
    { number: '4.9', key: 'averageRating' },
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-peach/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary hover:text-ribbon-red transition-colors"
            >
              <FiChevronLeft size={20} />
              <span className="hidden sm:inline font-medium text-sm">{t('aboutPage.backToHome')}</span>
            </Link>
            <h1 className="font-bold text-primary text-lg">{t('aboutPage.title')}</h1>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`py-20 px-4 text-center scroll-fade-up ${heroVisible ? 'visible' : ''}`}
      >
        <div className="max-w-3xl mx-auto">
          <span className="text-5xl mb-6 block">🐻✨</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t('aboutPage.heroTitle')}
          </h2>
          <p className="text-warm-brown/70 text-lg leading-relaxed">
            {t('aboutPage.heroDescription')}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div
          ref={storyRef}
          className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center scroll-blur-in ${storyVisible ? 'visible' : ''}`}
        >
          <div className="bg-gradient-to-br from-soft-pink to-peach/50 rounded-3xl p-12 flex items-center justify-center">
            <span className="text-8xl animate-float">🏠💕</span>
          </div>
          <div>
            <span className="text-sm font-semibold text-ribbon-red uppercase tracking-wider">
              {t('aboutPage.ourStoryLabel')}
            </span>
            <h3 className="text-3xl font-bold text-primary mt-2 mb-4">
              {t('aboutPage.ourStoryTitle')}
            </h3>
            <p className="text-warm-brown/70 leading-relaxed mb-4">
              {t('aboutPage.ourStoryP1')}
            </p>
            <p className="text-warm-brown/70 leading-relaxed">
              {t('aboutPage.ourStoryP2')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div ref={statsRef} className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={`text-center scroll-pop-in stagger-delay-${index + 1} ${statsVisible ? 'visible' : ''}`}
            >
              <p className="text-3xl md:text-4xl font-bold text-ribbon-red mb-2">{stat.number}</p>
              <p className="text-warm-brown/60 text-sm">{t(`aboutPage.stats.${stat.key}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-ribbon-red uppercase tracking-wider">
              {t('aboutPage.valuesLabel')}
            </span>
            <h3 className="text-3xl font-bold text-primary mt-2">
              {t('aboutPage.valuesTitle')}
            </h3>
          </div>
          <div ref={valuesRef} className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <div
                key={value.key}
                className={`bg-white rounded-2xl p-6 text-center border border-peach/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 scroll-zoom-in stagger-delay-${index + 1} ${valuesVisible ? 'visible' : ''}`}
              >
                <div className="w-12 h-12 bg-ribbon-red/10 rounded-full flex items-center justify-center mx-auto mb-3 text-ribbon-red">
                  {value.icon}
                </div>
                <h4 className="font-semibold text-primary text-sm mb-1">
                  {t(`aboutPage.values.${value.key}.title`)}
                </h4>
                <p className="text-warm-brown/60 text-xs">
                  {t(`aboutPage.values.${value.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-ribbon-red uppercase tracking-wider">
              {t('aboutPage.teamLabel')}
            </span>
            <h3 className="text-3xl font-bold text-primary mt-2">
              {t('aboutPage.teamTitle')}
            </h3>
          </div>
          <div ref={teamRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.key}
                className={`text-center scroll-flip-up stagger-delay-${index + 1} ${teamVisible ? 'visible' : ''}`}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-soft-pink to-peach rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{member.emoji}</span>
                </div>
                <h4 className="font-semibold text-primary">
                  {t(`aboutPage.team.${member.key}.name`)}
                </h4>
                <p className="text-warm-brown/60 text-sm">
                  {t(`aboutPage.team.${member.key}.role`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-primary mb-4">
            {t('aboutPage.ctaTitle')}
          </h3>
          <p className="text-warm-brown/70 mb-8">
            {t('aboutPage.ctaDescription')}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-ribbon-red hover:bg-ribbon-red/90 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            {t('aboutPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  )
}
