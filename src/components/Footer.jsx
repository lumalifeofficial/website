import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaTiktok, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { SiXiaohongshu } from 'react-icons/si'
import { FiMapPin, FiMail, FiPhone, FiHeart, FiGlobe } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { contactLinks } from '../config/contactLinks'

export default function Footer() {
  const { t } = useLanguage()
  const [footerRef, footerVisible] = useScrollAnimation({ threshold: 0.1 })

  return (
    <footer className="bg-primary text-white">
      <div
        ref={footerRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-blur-in ${footerVisible ? 'visible' : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/LOGO.png" alt="Luma" className="h-12 w-auto brightness-110" />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              {t('footer.brandDescription')}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a href={contactLinks.instagram.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href={contactLinks.facebook.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href={contactLinks.tiktok.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="TikTok">
                <FaTiktok size={16} />
              </a>
              <a href={contactLinks.xhs.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="Xiaohongshu">
                <SiXiaohongshu size={16} />
              </a>
              <a href={contactLinks.telegram.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="Telegram">
                <FaTelegramPlane size={16} />
              </a>
              <a href={contactLinks.whatsapp.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="WhatsApp">
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.home')}</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.shop')}</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.newArrivals')}</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.bestSellers')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.sale')}</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.customerService')}</h3>
            <ul className="space-y-3">
              <li><a href="https://www.tracking.my/cn/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.trackOrder')}</a></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.shippingPolicy')}</Link></li>
              <li><Link to="/return-policy" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.returnsExchanges')}</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.faq')}</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-peach transition-colors text-sm">{t('footer.privacyPolicy')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-peach mt-0.5 flex-shrink-0" size={16} />
                <span className="text-gray-400 text-sm">202603027700 (003818165-X)</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-peach flex-shrink-0" size={16} />
                <a href={contactLinks.email.url} className="text-gray-400 hover:text-peach transition-colors text-sm">
                  {contactLinks.email.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-peach flex-shrink-0" size={16} />
                <a href={contactLinks.whatsapp.tel} className="text-gray-400 hover:text-peach transition-colors text-sm">
                  {contactLinks.whatsapp.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiGlobe className="text-peach flex-shrink-0" size={16} />
                <a href={contactLinks.website.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-peach transition-colors text-sm">
                  {contactLinks.website.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-1">
            {t('footer.copyright')} <FiHeart className="text-ribbon-red" size={12} /> {t('footer.carryASmile')}
          </p>
          <div className="flex items-center gap-6">
            {/* SSM Registration */}
            <img src="/ssm.jpg" alt="SSM Registered" className="h-14 w-auto rounded opacity-90" />
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-xs">{t('footer.weAccept')}</span>
              <div className="flex gap-2 text-lg">
                <span title="Visa">💳</span>
                <span title="Online Banking">🏦</span>
                <span title="E-Wallet">📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
