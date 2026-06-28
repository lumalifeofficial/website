import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiMessageCircle } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 })
  const [infoRef, infoVisible] = useStaggerAnimation({ threshold: 0.1 })
  const [formRef, formVisible] = useScrollAnimation({ threshold: 0.1 })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Frontend-only: simulate submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    { icon: <FiPhone size={20} />, key: 'phone', value: '019-8688608', href: 'tel:+60198688608' },
    { icon: <FiMail size={20} />, key: 'email', value: 'lumalifeofficial@gmail.com', href: 'mailto:lumalifeofficial@gmail.com' },
    { icon: <FiMapPin size={20} />, key: 'address', value: 'Malaysia' },
    { icon: <FiClock size={20} />, key: 'hours', value: '9AM - 9PM (GMT+8)' },
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
              <span className="font-medium text-sm">{t('contactPage.backToHome')}</span>
            </Link>
            <h1 className="font-bold text-primary text-lg">{t('contactPage.title')}</h1>
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
          <span className="text-5xl mb-4 block">💌</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t('contactPage.heroTitle')}
          </h2>
          <p className="text-warm-brown/70 text-lg">
            {t('contactPage.heroDescription')}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div ref={infoRef} className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={item.key}
                  className={`flex items-start gap-4 bg-white rounded-xl p-4 border border-peach/30 scroll-fade-left stagger-delay-${index + 1} ${infoVisible ? 'visible' : ''}`}
                >
                  <div className="w-10 h-10 bg-ribbon-red/10 rounded-full flex items-center justify-center text-ribbon-red flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm">
                      {t(`contactPage.info.${item.key}`)}
                    </h4>
                    {item.href ? (
                      <a href={item.href} className="text-warm-brown/70 text-sm hover:text-ribbon-red transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-warm-brown/70 text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Social / Quick Contact */}
              <div className="bg-white rounded-xl p-6 border border-peach/30">
                <h4 className="font-semibold text-primary mb-4">{t('contactPage.quickContact')}</h4>
                <div className="flex gap-3">
                  <a
                    href="https://wa.me/60198688608"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1da851] transition-colors"
                  >
                    <FaWhatsapp size={16} />
                    WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/lumalifeofficial?igsh=MXVydGF4aHMwc3N3ZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1RsKmqqNyk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                    aria-label="Facebook"
                  >
                    <FaFacebookF size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div
              ref={formRef}
              className={`bg-white rounded-2xl p-8 border border-peach/30 scroll-fade-right ${formVisible ? 'visible' : ''}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <FiMessageCircle className="text-ribbon-red" size={24} />
                <h3 className="text-xl font-bold text-primary">{t('contactPage.formTitle')}</h3>
              </div>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                  <span>✅</span> {t('contactPage.successMessage')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">
                      {t('contactPage.form.name')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-peach/50 rounded-xl text-sm focus:outline-none focus:border-ribbon-red focus:ring-1 focus:ring-ribbon-red/20 transition-colors"
                      placeholder={t('contactPage.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                      {t('contactPage.form.email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 border border-peach/50 rounded-xl text-sm focus:outline-none focus:border-ribbon-red focus:ring-1 focus:ring-ribbon-red/20 transition-colors"
                      placeholder={t('contactPage.form.emailPlaceholder')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1.5">
                    {t('contactPage.form.subject')}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-peach/50 rounded-xl text-sm focus:outline-none focus:border-ribbon-red focus:ring-1 focus:ring-ribbon-red/20 transition-colors"
                    placeholder={t('contactPage.form.subjectPlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-1.5">
                    {t('contactPage.form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-peach/50 rounded-xl text-sm focus:outline-none focus:border-ribbon-red focus:ring-1 focus:ring-ribbon-red/20 transition-colors resize-none"
                    placeholder={t('contactPage.form.messagePlaceholder')}
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-ribbon-red hover:bg-ribbon-red/90 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                >
                  <FiSend size={16} />
                  {t('contactPage.form.submit')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
