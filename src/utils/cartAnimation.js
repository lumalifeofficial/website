import { getProductImages, getProductName } from './productImage.jsx'

function getCartTarget() {
  return document.querySelector('[data-cart-target="true"]') || document.querySelector('[aria-label="Cart"]')
}

function bumpCartTarget(target) {
  if (!target) return

  target.classList.remove('cart-target-bump')
  void target.offsetWidth
  target.classList.add('cart-target-bump')
  window.setTimeout(() => target.classList.remove('cart-target-bump'), 650)
}

function getSourceElement(triggerElement, imageElement) {
  return (
    imageElement ||
    triggerElement?.closest('[data-product-card]')?.querySelector('[data-cart-image] img, [data-cart-image] span, [data-cart-image]') ||
    triggerElement
  )
}

export function animateAddToCart({ product, language = 'en', triggerElement, imageElement }) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const target = getCartTarget()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    bumpCartTarget(target)
    return
  }

  const sourceElement = getSourceElement(triggerElement, imageElement)
  const sourceRect = sourceElement?.getBoundingClientRect?.()
  const targetRect = target?.getBoundingClientRect?.() || {
    left: window.innerWidth - 50,
    top: 22,
    width: 28,
    height: 28,
  }

  if (!sourceRect || sourceRect.width === 0 || sourceRect.height === 0) {
    bumpCartTarget(target)
    return
  }

  const size = Math.min(76, Math.max(44, Math.min(sourceRect.width, sourceRect.height) * 0.46))
  const startX = sourceRect.left + sourceRect.width / 2 - size / 2
  const startY = sourceRect.top + sourceRect.height / 2 - size / 2
  const endX = targetRect.left + targetRect.width / 2 - size / 2
  const endY = targetRect.top + targetRect.height / 2 - size / 2
  const lift = Math.min(150, Math.max(70, Math.abs(endY - startY) * 0.35 + 50))

  const flyer = document.createElement('div')
  flyer.className = 'cart-fly-item'
  flyer.style.width = `${size}px`
  flyer.style.height = `${size}px`
  flyer.style.left = `${startX}px`
  flyer.style.top = `${startY}px`

  const [image] = getProductImages(product, language)
  if (image) {
    const img = document.createElement('img')
    img.src = image
    img.alt = getProductName(product, language)
    flyer.appendChild(img)
  } else {
    const fallback = document.createElement('span')
    fallback.textContent = product?.emoji || '🛒'
    flyer.appendChild(fallback)
  }

  document.body.appendChild(flyer)

  const deltaX = endX - startX
  const deltaY = endY - startY
  const animation = flyer.animate(
    [
      { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 0.96 },
      { transform: `translate3d(${deltaX * 0.52}px, ${deltaY * 0.38 - lift}px, 0) scale(0.86) rotate(-8deg)`, opacity: 0.92 },
      { transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(0.18) rotate(10deg)`, opacity: 0.2 },
    ],
    {
      duration: 760,
      easing: 'cubic-bezier(0.18, 0.86, 0.26, 1)',
      fill: 'forwards',
    }
  )

  animation.finished
    .catch(() => {})
    .finally(() => {
      flyer.remove()
      bumpCartTarget(target)
    })
}
