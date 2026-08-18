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

function addImportAfterRegex(source, importLine, anchorRegex, label) {
  if (source.includes(importLine)) return source
  if (!anchorRegex.test(source)) throw new Error(`Could not find ${label}`)
  return source.replace(anchorRegex, `$1${importLine}`)
}

function replaceRequired(source, search, replacement, label) {
  if (!source.includes(search)) throw new Error(`Could not find ${label}`)
  return source.replace(search, replacement)
}

function replaceRegexRequired(source, regex, replacement, label) {
  if (!regex.test(source)) throw new Error(`Could not find ${label}`)
  return source.replace(regex, replacement)
}

edit('src/components/Products.jsx', (source) => {
  source = addImportAfterRegex(
    source,
    `import { animateAddToCart } from '../utils/cartAnimation'\n`,
    /(import \{ ProductImage, getProductName \} from '\.\.\/utils\/productImage\.jsx'\r?\n)/,
    'Products product image import'
  )
  source = source.replace(`const handleAddToCart = (product) => {`, `const handleAddToCart = (product, event) => {`)

  if (!source.includes('animateAddToCart({ product, language, triggerElement: event.currentTarget })')) {
    source = replaceRegexRequired(
      source,
      /(localStorage\.setItem\('luma-cart', JSON\.stringify\(cart\)\)\r?\n)(  \})/,
      `$1    animateAddToCart({ product, language, triggerElement: event.currentTarget })\n$2`,
      'Products cart save'
    )
  }

  source = source.replace(
    `              key={product.id}\r
              className={\`group bg-white`,
    `              key={product.id}\r
              data-product-card\r
              className={\`group bg-white`
  )
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
  source = addImportAfterRegex(
    source,
    `import { animateAddToCart } from '../utils/cartAnimation'\n`,
    /(import \{ ProductImage, getProductName \} from '\.\.\/utils\/productImage\.jsx'\r?\n)/,
    'ProductsPage product image import'
  )
  source = source.replace(/import \{ contactLinks \} from '\.\.\/config\/contactLinks'\r?\n/, '')

  if (source.includes('const handleOrder = (product) => {')) {
    source = replaceRegexRequired(
      source,
      /\n  const handleOrder = \(product\) => \{[\s\S]*?\n  \}\n\n  const handleAddToCart/,
      '\n  const handleAddToCart',
      'ProductsPage handleOrder'
    )
  }

  source = source.replace(`const handleAddToCart = (product) => {`, `const handleAddToCart = (product, event) => {`)

  if (!source.includes('animateAddToCart({ product, language, triggerElement: event.currentTarget })')) {
    source = replaceRegexRequired(
      source,
      /(localStorage\.setItem\('luma-cart', JSON\.stringify\(cart\)\)\r?\n\s*setCartCount\(cart\.reduce\(\(sum, item\) => sum \+ item\.quantity, 0\)\)\r?\n)(  \})/,
      `$1    animateAddToCart({ product, language, triggerElement: event.currentTarget })\n$2`,
      'ProductsPage cart save'
    )
  }

  source = source.replace(
    `<Link to="/cart" className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Cart">`,
    `<Link to="/cart" data-cart-target="true" className="relative p-2 text-primary hover:text-ribbon-red transition-colors" aria-label="Cart">`
  )
  source = source.replace(
    `                    key={product.id}\r
                    className="group bg-white rounded-xl border`,
    `                    key={product.id}\r
                    data-product-card\r
                    className="group bg-white rounded-xl border`
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
    `<div className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center w-full sm:w-56 h-56 sm:h-auto flex-shrink-0">`,
    `<div data-cart-image className="relative bg-gradient-to-br from-cream to-soft-pink/50 p-2 flex items-center justify-center w-full sm:w-56 h-56 sm:h-auto flex-shrink-0">`
  )
  source = source.replace(
    `onClick={() => handleOrder(product)}`,
    `onClick={(event) => handleAddToCart(product, event)}`
  )
  source = source.replace(
    /aria-label=\{`Order via WhatsApp`\}/g,
    `aria-label={\`Add \${getProductName(product, language)} to cart\`}`
  )

  return source
})

edit('src/pages/ProductDetailPage.jsx', (source) => {
  source = addImportAfterRegex(
    source,
    `import { animateAddToCart } from '../utils/cartAnimation'\n`,
    /(import \{ contactLinks \} from '\.\.\/config\/contactLinks'\r?\n)/,
    'ProductDetail contact import'
  )
  source = source.replace(`const handleAddToCart = () => {`, `const handleAddToCart = (event) => {`)

  if (!source.includes('imageElement: imageRef.current?.querySelector')) {
    source = replaceRegexRequired(
      source,
      /(localStorage\.setItem\('luma-cart', JSON\.stringify\(cart\)\)\r?\n)(\s*setAddedToCart\(true\))/,
      `$1    animateAddToCart({\n      product,\n      language,\n      triggerElement: event.currentTarget,\n      imageElement: imageRef.current?.querySelector('[data-cart-image]') || imageRef.current,\n    })\n$2`,
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
  source = addImportAfterRegex(
    source,
    `import { animateAddToCart } from '../utils/cartAnimation'\n`,
    /(import \{ ProductImage, getProductName \} from '\.\.\/utils\/productImage\.jsx'\r?\n)/,
    'Wishlist product image import'
  )

  if (!source.includes('addedProductId')) {
    source = source.replace(
      `const [wishlist, setWishlist] = useState(() => {`,
      `const [addedProductId, setAddedProductId] = useState(null)\n  const [wishlist, setWishlist] = useState(() => {`
    )
  }

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
    `                key={product.id}\r
                className={\`group bg-white`,
    `                key={product.id}\r
                data-product-card\r
                className={\`group bg-white`
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
