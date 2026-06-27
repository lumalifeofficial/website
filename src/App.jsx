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
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
