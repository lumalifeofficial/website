import { useEffect, useRef } from 'react'
import { FiTruck, FiShield, FiHeadphones } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Features() {
  const { t } = useLanguage()
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.15 })
  const sliderRef = useRef(null)
  const pauseAutoSlideRef = useRef(false)
  const autoScrollingRef = useRef(false)
  const lastAutoScrollTimeRef = useRef(0)
  const resumeTimeoutRef = useRef(null)

  const features = [
    {
      icon: FiTruck,
      title: t('features.freeShipping'),
      description: t('features.freeShippingDesc'),
    },
    {
      icon: FiShield,
      title: t('features.securePayment'),
      description: t('features.securePaymentDesc'),
    },

    {
      icon: FiHeadphones,
      title: t('features.support'),
      description: t('features.supportDesc'),
    },
  ]

  const sliderItems = [...features, ...features, ...features]

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const getLoopWidth = () => slider.scrollWidth / 3

    const keepInsideMiddleLoop = () => {
      const loopWidth = getLoopWidth()
      if (!loopWidth) return

      if (slider.scrollLeft < loopWidth * 0.5) {
        slider.scrollLeft += loopWidth
      } else if (slider.scrollLeft > loopWidth * 1.5) {
        slider.scrollLeft -= loopWidth
      }
    }

    const placeInMiddleLoop = () => {
      const loopWidth = getLoopWidth()
      if (loopWidth) slider.scrollLeft = loopWidth
    }

    let animationId
    placeInMiddleLoop()

    const handleScroll = () => {
      keepInsideMiddleLoop()

      if (autoScrollingRef.current || Date.now() - lastAutoScrollTimeRef.current < 120) return

      pauseAutoSlideRef.current = true
      window.clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = window.setTimeout(() => {
        pauseAutoSlideRef.current = false
      }, 900)
    }

    const tick = () => {
      if (!reduceMotion && !pauseAutoSlideRef.current) {
        autoScrollingRef.current = true
        lastAutoScrollTimeRef.current = Date.now()
        slider.scrollLeft += 0.45
        keepInsideMiddleLoop()
        window.requestAnimationFrame(() => {
          autoScrollingRef.current = false
        })
      }

      animationId = window.requestAnimationFrame(tick)
    }

    slider.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', placeInMiddleLoop)
    animationId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.clearTimeout(resumeTimeoutRef.current)
      slider.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', placeInMiddleLoop)
    }
  }, [])

  const pauseAutoSlide = () => {
    pauseAutoSlideRef.current = true
  }

  const resumeAutoSlide = () => {
    pauseAutoSlideRef.current = false
  }

  return (
    <section
      ref={sectionRef}
      className={`py-12 sm:py-16 bg-white/50 overflow-hidden scroll-fade-up ${sectionVisible ? 'visible' : ''}`}
    >
      <div className="relative mx-auto max-w-[1088px]">
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white/50 to-transparent z-10 pointer-events-none"></div>

        <div
          ref={sliderRef}
          className="features-swipe flex gap-4 overflow-x-auto px-5 sm:px-8 pb-3"
          onMouseEnter={pauseAutoSlide}
          onMouseLeave={resumeAutoSlide}
          onPointerDown={pauseAutoSlide}
          onPointerUp={resumeAutoSlide}
          onPointerCancel={resumeAutoSlide}
        >
          {sliderItems.map((feature, index) => (
            <div
              key={`${feature.title}-${index}`}
              data-feature-card
              className="flex-shrink-0 w-[82vw] max-w-[320px] sm:w-[320px]"
            >
              <div className="h-full text-center p-6 bg-cream rounded-2xl border border-peach/30 hover:shadow-lg hover:shadow-peach/20 hover:-translate-y-2 hover:scale-105 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-soft-pink rounded-xl mb-4">
                  <feature.icon className="text-ribbon-red" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-warm-brown/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
