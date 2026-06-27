import { useState } from 'react'
import { FiMenu, FiX, FiShoppingCart, FiSearch, FiHeart } from 'react-icons/fi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md shadow-sm border-b border-peach/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src="/image.png" alt="Luma" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-primary hover:text-ribbon-red transition-colors font-medium">Home</a>
            <a href="#shop" className="text-primary hover:text-ribbon-red transition-colors font-medium">Shop</a>
            <a href="#collections" className="text-primary hover:text-ribbon-red transition-colors font-medium">Collections</a>
            <a href="#about" className="text-primary hover:text-ribbon-red transition-colors font-medium">About</a>
            <a href="#contact" className="text-primary hover:text-ribbon-red transition-colors font-medium">Contact</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Search">
              <FiSearch size={20} />
            </button>
            <button className="p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Wishlist">
              <FiHeart size={20} />
            </button>
            <button className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Cart">
              <FiShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-ribbon-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </button>
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
            <a href="#home" className="block text-primary hover:text-ribbon-red font-medium py-2">Home</a>
            <a href="#shop" className="block text-primary hover:text-ribbon-red font-medium py-2">Shop</a>
            <a href="#collections" className="block text-primary hover:text-ribbon-red font-medium py-2">Collections</a>
            <a href="#about" className="block text-primary hover:text-ribbon-red font-medium py-2">About</a>
            <a href="#contact" className="block text-primary hover:text-ribbon-red font-medium py-2">Contact</a>
          </div>
        </div>
      )}
    </nav>
  )
}
