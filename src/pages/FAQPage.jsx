import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronDown, FiSearch } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

export default function FAQPage() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 })
  const [faqRef, faqVisible] = useStaggerAnimation({ threshold: 0.05 })

  const faqCategories = [
    { key: 'ordering', emoji: '🛒', count: 3 },
    { key: 'shipping', emoji: '🚚', count: 3 },
    { key: 'returns', emoji: '↩️', count: 3 },
    { key: 'products', emoji: '🧸', count: 3 },
  ]

  const allFaqs = faqCategories.flatMap((category) =>
    Array.from({ length: category.count }, (_, i) => ({
      category: category.key,
      questionKey: `faqPage.faqs.${category.key}.q${i + 1}`,
      answerKey: `faqPage.faqs.${category.key}.a${i + 1}`,
    }))
  )

  const filteredFaqs = allFaqs.filter((faq) => {
    if (!searchQuery) return true
    const question = t(faq.questionKey).toLowerCase()
    const answer = t(faq.answerKey).toLowerCase()
    return question.includes(searchQuery.toLowerCase()) || answer.includes(searchQuery.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white border-b border-peach/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-ribbon-red transition-colors">
              <FiChevronLeft size={20} />
              <span className="font-medium text-sm">{t('faqPage.backToHome')}</span>
            </Link>
            <h1 className="font-bold text-primary text-lg">{t('faqPage.title')}</h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        ref={heroRef}
        className={`py-16 px-4 text-center scroll-fade-up ${heroVisible ? 'visible' : ''}`}
      >
        <div className="max-w-2xl mx-auto">
          <span className="text-5xl mb-4 block">❓</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('faqPage.heroTitle')}
          </h2>
          <p className="text-warm-brown/70 text-lg mb-8">
            {t('faqPage.heroDescription')}
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-brown/40" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('faqPage.searchPlaceholder')}
              className="w-full pl-11 pr-4 py-3 border border-peach/50 rounded-full text-sm focus:outline-none focus:border-ribbon-red focus:ring-1 focus:ring-ribbon-red/20 transition-colors bg-white"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-4xl mx-auto px-4 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {faqCategories.map((cat) => (
            <div
              key={cat.key}
              className="bg-white rounded-xl p-4 text-center border border-peach/30 hover:border-ribbon-red/30 hover:shadow-md transition-all cursor-pointer"
              onClick={() => {
                setSearchQuery('')
                const el = document.getElementById(`faq-${cat.key}`)
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="text-2xl block mb-2">{cat.emoji}</span>
              <p className="text-sm font-medium text-primary">{t(`faqPage.categories.${cat.key}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <div ref={faqRef} className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-peach/30">
              <p className="text-warm-brown/60">{t('faqPage.noResults')}</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div
                key={`${faq.category}-${index}`}
                id={index === 0 ? `faq-${faq.category}` : undefined}
                className={`bg-white rounded-xl border border-peach/30 overflow-hidden scroll-fade-up stagger-delay-${Math.min(index + 1, 6)} ${faqVisible ? 'visible' : ''}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-cream/50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-primary text-sm pr-4">
                    {t(faq.questionKey)}
                  </span>
                  <FiChevronDown
                    className={`flex-shrink-0 text-warm-brown/40 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-ribbon-red' : ''
                    }`}
                    size={18}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-4 pb-4 text-warm-brown/70 text-sm leading-relaxed whitespace-pre-line">
                    {t(faq.answerKey)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Still need help */}
        <div className="mt-12 text-center bg-white rounded-2xl p-8 border border-peach/30">
          <h3 className="text-xl font-bold text-primary mb-2">{t('faqPage.stillNeedHelp')}</h3>
          <p className="text-warm-brown/60 text-sm mb-4">{t('faqPage.stillNeedHelpDesc')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-ribbon-red hover:bg-ribbon-red/90 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
          >
            {t('faqPage.contactUs')}
          </Link>
        </div>
      </section>
    </div>
  )
}
