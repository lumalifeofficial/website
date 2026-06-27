import { useEffect, useRef, useState } from 'react'

/**
 * Enhanced scroll animation hook with multiple animation variants.
 * Triggers animation only when the element scrolls into view.
 * Works on mobile with lower threshold defaults.
 *
 * @param {object} options
 * @param {number} options.threshold - IntersectionObserver threshold (default 0.15)
 * @param {string} options.rootMargin - Margin around viewport (default '0px 0px -50px 0px')
 * @param {boolean} options.once - Only animate once (default true)
 */
export function useScrollAnimation({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    const current = ref.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}

/**
 * Hook for staggered children animations.
 * Returns a ref for the container and visibility state.
 * Use the index to compute per-child delay.
 */
export function useStaggerAnimation({
  threshold = 0.1,
  rootMargin = '0px 0px -30px 0px',
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    const current = ref.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [threshold, rootMargin])

  return [ref, isVisible]
}
