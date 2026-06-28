import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiShoppingCart, FiHeart } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSelector from './LanguageSelector'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md shadow-sm border-b border-peach/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src="/logoHeaader.jpeg" alt="Luma" className="h-20 w-20 object-cover rounded-full" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary hover:text-ribbon-red transition-colors font-medium">{t('nav.home')}</Link>
            <Link to="/products" className="text-primary hover:text-ribbon-red transition-colors font-medium">{t('nav.shop')}</Link>
            <Link to="/about" className="text-primary hover:text-ribbon-red transition-colors font-medium">{t('nav.about')}</Link>
            <Link to="/faq" className="text-primary hover:text-ribbon-red transition-colors font-medium">{t('nav.faq')}</Link>
            <Link to="/contact" className="text-primary hover:text-ribbon-red transition-colors font-medium">{t('nav.contact')}</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />
            <Link to="/wishlist" className="p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Wishlist">
              <FiHeart size={20} />
            </Link>
            <Link to="/cart" className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Cart">
              <FiShoppingCart size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cream border-t border-peach/50">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-primary hover:text-ribbon-red font-medium py-2">{t('nav.home')}</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block text-primary hover:text-ribbon-red font-medium py-2">{t('nav.shop')}</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-primary hover:text-ribbon-red font-medium py-2">{t('nav.about')}</Link>
            <Link to="/faq" onClick={() => setIsOpen(false)} className="block text-primary hover:text-ribbon-red font-medium py-2">{t('nav.faq')}</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-primary hover:text-ribbon-red font-medium py-2">{t('nav.contact')}</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="block text-primary hover:text-ribbon-red font-medium py-2">{t('nav.cart')}</Link>
            <Link to="/wishlist" onClick={() => setIsOpen(false)} className="block text-primary hover:text-ribbon-red font-medium py-2">{t('nav.wishlist')}</Link>
            <div className="pt-3 border-t border-peach/50">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
