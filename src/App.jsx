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

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <Features />
        <Products />
        <Testimonials />
        <SocialMedia />
        <Newsletter />
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  )
}

export default App
