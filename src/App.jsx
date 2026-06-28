import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
import SocialMedia from './components/SocialMedia'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ProductsPage from './pages/ProductsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import FAQPage from './pages/FAQPage'
import ReturnPolicyPage from './pages/ReturnPolicyPage'
import ProductDetailPage from './pages/ProductDetailPage'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Products />
      <Testimonials />
      <SocialMedia />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
