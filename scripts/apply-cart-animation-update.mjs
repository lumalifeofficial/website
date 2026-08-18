import fs from 'node:fs'

function edit(path, updater) {
  const original = fs.readFileSync(path, 'utf8')
  const updated = updater(original)

  if (updated === original) {
    console.log(`${path}: no changes`)
    return
  }

  fs.writeFileSync(path, updated)
  console.log(`${path}: updated`)
}

function addImport(source, importLine, afterLine) {
  if (source.includes(importLine)) return source
  return source.replace(afterLine, `${afterLine}${importLine}`)
}

function replaceRequired(source, search, replacement, label) {
  if (!source.includes(search)) {
    throw new Error(`Could not find ${label}`)
  }

  return source.replace(search, replacement)
}

function replaceRegexRequired(source, regex, replacement, label) {
  if (!regex.test(source)) {
    throw new Error(`Could not find ${label}`)
  }

  return source.replace(regex, replacement)
}

edit('src/utils/cartAnimation.js', (source) => {
  source = source.replace(
    `  if (!target || reduceMotion) {
    bumpCartTarget(target)
    return
  }

  const sourceElement = getSourceElement(triggerElement, imageElement)
  const sourceRect = sourceElement?.getBoundingClientRect?.()
  const targetRect = target.getBoundingClientRect()
`,
    `  if (reduceMotion) {
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
`
  )

  return source
})

edit('src/index.css', (source) => {
  if (!source.includes('.cart-fly-item')) {
    source = replaceRequired(
      source,
      `body {
  font-family: var(--font-sans);
  background-color: var(--color-cream);
}
`,
      `body {
  font-family: var(--font-sans);
  background-color: var(--color-cream);
}

.cart-fly-item {
  position: fixed;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  pointer-events: none;
  overflow: hidden;
  border-radius: 9999px;
  background: #fff9f3;
  border: 1px solid rgba(248, 213, 200, 0.8);
  box-shadow: 0 18px 36px rgba(74, 44, 42, 0.18);
  will-change: transform, opacity;
}

.cart-fly-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.cart-fly-item span {
  font-size: 28px;
  line-height: 1;
}

.cart-target-bump {
  animation: cart-target-bump 0.62s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes cart-target-bump {
  0% { transform: scale(1); }
  35% { transform: scale(1.28) rotate(-8deg); }
  70% { transform: scale(0.94) rotate(4deg); }
  100% { transform: scale(1) rotate(0); }
}
`,
      'body styles'
    )
  }

  if (!source.includes('.cart-target-bump {\n    animation: none !important;')) {
    source = replaceRequired(
      source,
      `    transition: none !important;
  }
}
`,
      `    transition: none !important;
  }

  .cart-fly-item,
  .cart-target-bump {
    animation: none !important;
    transition: none !important;
  }
}
`,
      'reduced motion block'
    )
  }

  return source
})

edit('src/components/Navbar.jsx', (source) => {
  return source.replace(
    `<Link to="/cart" className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Cart">`,
    `<Link to="/cart" data-cart-target="true" className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Cart">`
  )
})

edit('src/utils/productImage.jsx', (source) => {
  return source.replace(
    `<div className="h-[420px] w-full">
        <img`,
    `<div data-cart-image className="h-[420px] w-full">
        <img`
  )
})

edit('src/components/Products.jsx', (source) => {
  source = addImport(
    source,
    `import { animateAddToCart } from '../utils/cartAnimation'
`,
    `import { ProductImage, getProductName } from '../utils/productImage.jsx'
`
  )
  source = source.replace(`const handleAddToCart = (product) => {`, `const handleAddToCart = (product, event) => {`)

  if (!source.includes('animateAddToCart({ product, language, triggerElement: event.currentTarget })')) {
    source = replaceRequired(
      source,
      `    localStorage.setItem('luma-cart', JSON.stringify(cart))
  }
`,
      `    localStorage.setItem('luma-cart', JSON.stringify(cart))
    animateAddToCart({ product, language, triggerElement: event.currentTarget })
  }
`,
      'Products cart save'
    )
  }

  source = source.replace(
    `              key={product.id}
              className={\`group bg-white`,
    `              key={product.id}
              data-product-card
              className={\`group bg-white`
  )
  source = source.replace(
    `<div className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center h-72">`,
    `<div data-cart-image className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center h-72">`
  )
  source = source.replace(
    `onClick={() => handleAddToCart(product)}`,
    `onClick={(event) => handleAddToCart(product, event)}`
  )

  return source
})

edit('src/pages/ProductsPage.jsx', (source) => {
  source = addImport(
    source,
    `import { animateAddToCart } from '../utils/cartAnimation'
`,
    `import { ProductImage, getProductName } from '../utils/productImage.jsx'
`
  )
  source = source.replace(`import { contactLinks } from '../config/contactLinks'
`, '')
  source = replaceRegexRequired(
    source,
    /\n  const handleOrder = \(product\) => \{[\s\S]*?\n  \}\n\n  const handleAddToCart/,
    '\n  const handleAddToCart',
    'ProductsPage handleOrder'
  )
  source = source.replace(`const handleAddToCart = (product) => {`, `const handleAddToCart = (product, event) => {`)

  if (!source.includes('animateAddToCart({ product, language, triggerElement: event.currentTarget })')) {
    source = replaceRequired(
      source,
      `    localStorage.setItem('luma-cart', JSON.stringify(cart))
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0))
  }
`,
      `    localStorage.setItem('luma-cart', JSON.stringify(cart))
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0))
    animateAddToCart({ product, language, triggerElement: event.currentTarget })
  }
`,
      'ProductsPage cart save'
    )
  }

  source = source.replace(
    `<Link to="/cart" className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Cart">`,
    `<Link to="/cart" data-cart-target="true" className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Cart">`
  )
  source = source.replace(
    `                    key={product.id}
                    className="group bg-white rounded-xl border`,
    `                    key={product.id}
                    data-product-card
                    className="group bg-white rounded-xl border`
  )
  source = source.replace(
    `<Link to={\`/product/\${product.id}\`} className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center h-56 block">`,
    `<Link to={\`/product/\${product.id}\`} data-cart-image className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center h-56 block">`
  )
  source = source.replace(
    `onClick={() => handleAddToCart(product)}`,
    `onClick={(event) => handleAddToCart(product, event)}`
  )
  source = source.replace(
    `                    key={product.id}
                    className="group bg-white rounded-xl border border-peach/30 overflow-hidden hover:shadow-lg hover:shadow-peach/20 transition-all duration-300 hover:border-ribbon-red/30 flex flex-col sm:flex-row"`,
    `                    key={product.id}
                    data-product-card
                    className="group bg-white rounded-xl border border-peach/30 overflow-hidden hover:shadow-lg hover:shadow-peach/20 transition-all duration-300 hover:border-ribbon-red/30 flex flex-col sm:flex-row"`
  )
  source = source.replace(
    `<div className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center w-full sm:w-56 h-56 sm:h-auto flex-shrink-0">`,
    `<div data-cart-image className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center w-full sm:w-56 h-56 sm:h-auto flex-shrink-0">`
  )
  source = source.replace(
    `onClick={() => handleOrder(product)}`,
    `onClick={(event) => handleAddToCart(product, event)}`
  )
  source = source.replace(
    `aria-label={\`Order via WhatsApp\`}`,
    `aria-label={\`Add \${getProductName(product, language)} to cart\`}`
  )

  return source
})

edit('src/pages/ProductDetailPage.jsx', (source) => {
  source = addImport(
    source,
    `import { animateAddToCart } from '../utils/cartAnimation'
`,
    `import { contactLinks } from '../config/contactLinks'
`
  )
  source = source.replace(`const handleAddToCart = () => {`, `const handleAddToCart = (event) => {`)

  if (!source.includes('animateAddToCart({')) {
    source = replaceRequired(
      source,
      `    localStorage.setItem('luma-cart', JSON.stringify(cart))
    setAddedToCart(true)
`,
      `    localStorage.setItem('luma-cart', JSON.stringify(cart))
    animateAddToCart({
      product,
      language,
      triggerElement: event.currentTarget,
      imageElement: imageRef.current?.querySelector('[data-cart-image]') || imageRef.current,
    })
    setAddedToCart(true)
`,
      'ProductDetail cart save'
    )
  }

  source = source.replace(
    `onClick={handleAddToCart}`,
    `onClick={(event) => handleAddToCart(event)}`
  )

  return source
})

edit('src/pages/WishlistPage.jsx', (source) => {
  source = addImport(
    source,
    `import { animateAddToCart } from '../utils/cartAnimation'
`,
    `import { ProductImage, getProductName } from '../utils/productImage.jsx'
`
  )
  source = source.replace(`const [wishlist, setWishlist] = useState(() => {`, `const [addedProductId, setAddedProductId] = useState(null)\n  const [wishlist, setWishlist] = useState(() => {`)
  source = source.replace(`const addToCart = (product) => {`, `const addToCart = (product, event) => {`)
  source = source.replace(
    `    localStorage.setItem('luma-cart', JSON.stringify(cart))
    alert(t('wishlistPage.addedToCart'))
  }
`,
    `    localStorage.setItem('luma-cart', JSON.stringify(cart))
    animateAddToCart({ product, language, triggerElement: event.currentTarget })
    setAddedProductId(product.id)
    window.setTimeout(() => setAddedProductId(null), 1400)
  }
`
  )
  source = source.replace(
    `                key={product.id}
                className={\`group bg-white`,
    `                key={product.id}
                data-product-card
                className={\`group bg-white`
  )
  source = source.replace(
    `<div className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center h-56">`,
    `<div data-cart-image className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center h-56">`
  )
  source = source.replace(
    `onClick={() => addToCart(product)}`,
    `onClick={(event) => addToCart(product, event)}`
  )
  source = source.replace(
    `{t('wishlistPage.addToCart')}`,
    `{addedProductId === product.id ? t('wishlistPage.addedToCart') : t('wishlistPage.addToCart')}`
  )

  return source
})
