import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
import SocialMedia from './components/SocialMedia'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Products />
      <Testimonials />
      <SocialMedia />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default App
