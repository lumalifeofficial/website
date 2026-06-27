import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaTwitter } from 'react-icons/fa'
import { FiMapPin, FiMail, FiPhone, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/image.png" alt="Luma" className="h-12 w-auto brightness-110" />
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Carry a smile ♡ Cute, cozy, and quality lifestyle products curated to bring joy to your everyday life.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com/lumalifeofficial" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="https://facebook.com/lumalifeofficial" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="https://tiktok.com/@lumalifeofficial" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="TikTok">
                <FaTiktok size={16} />
              </a>
              <a href="https://youtube.com/@lumalifeofficial" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="YouTube">
                <FaYoutube size={16} />
              </a>
              <a href="https://x.com/lumalifeofficial" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 hover:bg-ribbon-red rounded-full flex items-center justify-center transition-colors" aria-label="Twitter">
                <FaTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-peach transition-colors text-sm">Home</a></li>
              <li><a href="#shop" className="text-gray-400 hover:text-peach transition-colors text-sm">Shop</a></li>
              <li><a href="#" className="text-gray-400 hover:text-peach transition-colors text-sm">New Arrivals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-peach transition-colors text-sm">Best Sellers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-peach transition-colors text-sm">Sale</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-peach transition-colors text-sm">Track Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-peach transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-peach transition-colors text-sm">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-peach transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-peach transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-peach mt-0.5 flex-shrink-0" size={16} />
                <span className="text-gray-400 text-sm">202603027700 (003818165-X)</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-peach flex-shrink-0" size={16} />
                <a href="mailto:hello@lumalifeofficial.com" className="text-gray-400 hover:text-peach transition-colors text-sm">
                  hello@lumalifeofficial.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-peach flex-shrink-0" size={16} />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-peach transition-colors text-sm">
                  +60 12-345-6789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-1">
            © 2026 LUMA Official. Made with <FiHeart className="text-ribbon-red" size={12} /> Carry A Smile
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs">We accept:</span>
            <div className="flex gap-2 text-lg">
              <span title="Visa">💳</span>
              <span title="Online Banking">🏦</span>
              <span title="E-Wallet">📱</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
