/**
 * Home Made Products - Products JavaScript
 * This file contains functionality for product listings and filtering
 */

document.addEventListener("DOMContentLoaded", () => {
  // Load products
  loadProducts()

  // Initialize filters
  initFilters()

  // Initialize sorting
  initSorting()

  // Initialize pagination
  initPagination()
})

/**
 * Product data (mock data for demonstration)
 * In a real application, this would come from an API
 */
const productsData = [
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    description: "Beautiful handcrafted ceramic mug, perfect for your morning coffee or tea.",
    price: 24.99,
    originalPrice: 29.99,
    image: "images/products/ceramic-mug-1.jpg",
    category: "handcrafted",
    rating: 4.5,
    ratingCount: 42,
    isFeatured: true,
    isNew: false,
    isSale: true,
    stock: 15,
  },
  {
    id: 2,
    name: "Organic Honey",
    description: "Pure, raw organic honey harvested from local beehives.",
    price: 12.99,
    originalPrice: null,
    image: "images/products/organic-honey.jpg",
    category: "organic",
    rating: 5,
    ratingCount: 28,
    isFeatured: true,
    isNew: true,
    isSale: false,
    stock: 20,
  },
  {
    id: 3,
    name: "Handwoven Basket",
    description: "Traditional handwoven basket made from sustainable materials.",
    price: 34.99,
    originalPrice: 39.99,
    image: "images/products/handwoven-basket.jpg",
    category: "handcrafted",
    rating: 4.2,
    ratingCount: 18,
    isFeatured: true,
    isNew: false,
    isSale: true,
    stock: 8,
  },
  {
    id: 4,
    name: "Handmade Soap Set",
    description: "Set of 3 handmade soaps with natural ingredients and essential oils.",
    price: 18.99,
    originalPrice: null,
    image: "images/products/handmade-soap.jpg",
    category: "handcrafted",
    rating: 4.8,
    ratingCount: 36,
    isFeatured: true,
    isNew: true,
    isSale: false,
    stock: 25,
  },
  {
    id: 5,
    name: "Macramé Wall Hanging",
    description: "Beautiful handcrafted macramé wall hanging for home decoration.",
    price: 49.99,
    originalPrice: 59.99,
    image: "images/products/macrame-wall-hanging.jpg",
    category: "home-decor",
    rating: 4.6,
    ratingCount: 22,
    isFeatured: true,
    isNew: false,
    isSale: true,
    stock: 5,
  },
  {
    id: 6,
    name: "Handmade Silver Earrings",
    description: "Elegant handcrafted silver earrings with minimalist design.",
    price: 39.99,
    originalPrice: null,
    image: "images/products/silver-earrings.jpg",
    category: "jewelry",
    rating: 4.9,
    ratingCount: 31,
    isFeatured: true,
    isNew: true,
    isSale: false,
    stock: 12,
  },
  {
    id: 7,
    name: "Organic Herbal Tea",
    description: "Blend of organic herbs and flowers for a soothing tea experience.",
    price: 14.99,
    originalPrice: null,
    image: "images/products/herbal-tea.jpg",
    category: "organic",
    rating: 4.7,
    ratingCount: 24,
    isFeatured: false,
    isNew: true,
    isSale: false,
    stock: 30,
  },
  {
    id: 8,
    name: "Hand-Knitted Scarf",
    description: "Warm and cozy hand-knitted scarf made with premium wool.",
    price: 29.99,
    originalPrice: 34.99,
    image: "images/products/knitted-scarf.jpg",
    category: "clothing",
    rating: 4.4,
    ratingCount: 19,
    isFeatured: false,
    isNew: false,
    isSale: true,
    stock: 7,
  },
  // Additional products in the same format using only the 5 specified categories
  {
    id: 9,
    name: "Handcrafted Wooden Bowl",
    description: "Beautiful handcrafted wooden bowl, perfect for serving salads or as a decorative piece.",
    price: 32.99,
    originalPrice: 39.99,
    image: "images/products/wooden-bowl.jpg",
    category: "handcrafted",
    rating: 4.6,
    ratingCount: 27,
    isFeatured: false,
    isNew: false,
    isSale: true,
    stock: 10,
  },
  {
    id: 10,
    name: "Organic Face Cream",
    description: "Natural face cream made with organic ingredients for all skin types.",
    price: 22.99,
    originalPrice: null,
    image: "images/products/face-cream.jpg",
    category: "organic",
    rating: 4.8,
    ratingCount: 34,
    isFeatured: false,
    isNew: true,
    isSale: false,
    stock: 15,
  },
  {
    id: 11,
    name: "Decorative Throw Pillows",
    description: "Set of 2 handmade decorative throw pillows with unique patterns.",
    price: 44.99,
    originalPrice: 49.99,
    image: "images/products/throw-pillows.jpg",
    category: "home-decor",
    rating: 4.3,
    ratingCount: 21,
    isFeatured: false,
    isNew: false,
    isSale: true,
    stock: 12,
  },
  {
    id: 12,
    name: "Beaded Bracelet Set",
    description: "Set of 3 handmade beaded bracelets with natural stones.",
    price: 19.99,
    originalPrice: null,
    image: "images/products/beaded-bracelet.jpg",
    category: "jewelry",
    rating: 4.7,
    ratingCount: 29,
    isFeatured: false,
    isNew: true,
    isSale: false,
    stock: 20,
  },
  {
    id: 13,
    name: "Handwoven Cotton Shirt",
    description: "Comfortable handwoven cotton shirt with natural dyes.",
    price: 54.99,
    originalPrice: 64.99,
    image: "images/products/cotton-shirt.jpg",
    category: "clothing",
    rating: 4.5,
    ratingCount: 23,
    isFeatured: false,
    isNew: false,
    isSale: true,
    stock: 8,
  },
  {
    id: 14,
    name: "Ceramic Vase",
    description: "Handcrafted ceramic vase with unique glaze finish.",
    price: 36.99,
    originalPrice: null,
    image: "images/products/ceramic-vase.jpg",
    category: "handcrafted",
    rating: 4.8,
    ratingCount: 32,
    isFeatured: false,
    isNew: true,
    isSale: false,
    stock: 14,
  },
  {
    id: 15,
    name: "Organic Body Scrub",
    description: "Exfoliating body scrub made with organic coffee grounds and essential oils.",
    price: 16.99,
    originalPrice: 19.99,
    image: "images/products/body-scrub.jpg",
    category: "organic",
    rating: 4.9,
    ratingCount: 38,
    isFeatured: false,
    isNew: false,
    isSale: true,
    stock: 25,
  },
  {
    id: 16,
    name: "Woven Wall Art",
    description: "Handwoven wall art piece made with natural fibers and dyes.",
    price: 59.99,
    originalPrice: null,
    image: "images/products/wall-art.jpg",
    category: "home-decor",
    rating: 4.7,
    ratingCount: 26,
    isFeatured: false,
    isNew: true,
    isSale: false,
    stock: 6,
  },
  {
    id: 17,
    name: "Handmade Pendant Necklace",
    description: "Unique pendant necklace with handcrafted silver chain.",
    price: 42.99,
    originalPrice: 49.99,
    image: "images/products/pendant-necklace.jpg",
    category: "jewelry",
    rating: 4.6,
    ratingCount: 31,
    isFeatured: false,
    isNew: false,
    isSale: true,
    stock: 9,
  },
  {
    id: 18,
    name: "Organic Cotton Socks",
    description: "Set of 3 pairs of comfortable organic cotton socks.",
    price: 14.99,
    originalPrice: null,
    image: "images/products/cotton-socks.jpg",
    category: "clothing",
    rating: 4.4,
    ratingCount: 27,
    isFeatured: false,
    isNew: true,
    isSale: false,
    stock: 30,
  },
  {
    id: 19,
    name: "Handmade Cutting Board",
    description: "Durable handcrafted wooden cutting board with unique grain pattern.",
    price: 39.99,
    originalPrice: 45.99,
    image: "images/products/cutting-board.jpg",
    category: "handcrafted",
    rating: 4.8,
    ratingCount: 33,
    isFeatured: false,
    isNew: false,
    isSale: true,
    stock: 12,
  },
  {
    id: 20,
    name: "Organic Lip Balm Set",
    description: "Set of 4 organic lip balms with different natural flavors.",
    price: 12.99,
    originalPrice: null,
    image: "images/products/lip-balm.jpg",
    category: "organic",
    rating: 4.7,
    ratingCount: 42,
    isFeatured: false,
    isNew: true,
    isSale: false,
    stock: 22,
  },
  {
    id: 21,
    name: "Decorative Candle Holders",
    description: "Set of 3 handcrafted decorative candle holders in varying heights.",
    price: 34.99,
    originalPrice: 39.99,
    image: "images/products/candle-holders.jpg",
    category: "home-decor",
    rating: 4.5,
    ratingCount: 24,
    isFeatured: false,
    isNew: false,
    isSale: true,
    stock: 15,
  },
  {
    id: 22,
    name: "Handcrafted Wooden Earrings",
    description: "Lightweight wooden earrings with intricate carved designs.",
    price: 24.99,
    originalPrice: null,
    image: "images/products/wooden-earrings.jpg",
    category: "jewelry",
    rating: 4.6,
    ratingCount: 29,
    isFeatured: false,
    isNew: true,
    isSale: false,
    stock: 18,
  },
  {
    id: 23,
    name: "Handwoven Wool Hat",
    description: "Warm and stylish handwoven wool hat for cold weather.",
    price: 32.99,
    originalPrice: 37.99,
    image: "images/products/wool-hat.jpg",
    category: "clothing",
    rating: 4.4,
    ratingCount: 22,
    isFeatured: false,
    isNew: false,
    isSale: true,
    stock: 10,
  },
  {
    id: 24,
    name: "Handmade Leather Journal",
    description: "Beautiful handcrafted leather journal with handmade paper.",
    price: 29.99,
    originalPrice: null,
    image: "images/products/leather-journal.jpg",
    category: "handcrafted",
    rating: 4.9,
    ratingCount: 36,
    isFeatured: false,
    isNew: true,
    isSale: false,
    stock: 14,
  }
]

/**
 * Load products into the product grid
 * @param {Array} products - Array of product objects (optional, defaults to all products)
 */
function loadProducts(products = productsData) {
  const productGrid = document.querySelector(".product-grid")
  if (!productGrid) return

  // Clear existing products
  productGrid.innerHTML = ""

  // Update product count
  const productsTotal = document.getElementById("products-total")
  if (productsTotal) {
    productsTotal.textContent = products.length
  }

  // Check if we're on the home page (featured products) or products page (all products)
  const isFeaturedSection = document.querySelector(".featured-products") !== null
  const isProductsPage = window.location.pathname.includes("products.html")

  // If on home page, only show featured products (max 8)
  // If on products page, show all products
  let displayProducts = products
  if (isFeaturedSection && !isProductsPage) {
    displayProducts = products.filter((product) => product.isFeatured).slice(0, 8)
  }

  // Create product cards
  displayProducts.forEach((product) => {
    const productCard = createProductCard(product)
    productGrid.appendChild(productCard)
  })
}

/**
 * Create a product card element
 * @param {Object} product - Product object
 * @returns {HTMLElement} - Product card element
 */
function createProductCard(product) {
  const productCard = document.createElement("div")
  productCard.className = "product-card"
  productCard.setAttribute("data-product-id", product.id)

  // Create product image container
  const productImage = document.createElement("div")
  productImage.className = "product-image"

  // Add product badges (sale, new)
  if (product.isSale) {
    const saleBadge = document.createElement("span")
    saleBadge.className = "product-badge sale"
    saleBadge.textContent = "Sale"
    productImage.appendChild(saleBadge)
  } else if (product.isNew) {
    const newBadge = document.createElement("span")
    newBadge.className = "product-badge new"
    newBadge.textContent = "New"
    productImage.appendChild(newBadge)
  }

  // Add product image
  const img = document.createElement("img")
  img.src = product.image
  img.alt = product.name
  productImage.appendChild(img)

  // Add product actions
  const productActions = document.createElement("div")
  productActions.className = "product-actions"

  const wishlistBtn = document.createElement("button")
  wishlistBtn.className = "action-btn wishlist-btn"
  wishlistBtn.innerHTML = '<i class="far fa-heart"></i>'
  wishlistBtn.setAttribute("title", "Add to Wishlist")
  wishlistBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  })

  const quickViewBtn = document.createElement("button")
  quickViewBtn.className = "action-btn quickview-btn"
  quickViewBtn.innerHTML = '<i class="far fa-eye"></i>'
  quickViewBtn.setAttribute("title", "Quick View")
  quickViewBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    quickViewProduct(product)
  })

  productActions.appendChild(wishlistBtn)
  productActions.appendChild(quickViewBtn)
  productImage.appendChild(productActions)

  // Create product info
  const productInfo = document.createElement("div")
  productInfo.className = "product-info"

  // Add product category
  const productCategory = document.createElement("div")
  productCategory.className = "product-category"
  productCategory.textContent = capitalizeFirstLetter(product.category)
  productInfo.appendChild(productCategory)

  // Add product title
  const productTitle = document.createElement("h3")
  productTitle.className = "product-title"
  const productLink = document.createElement("a")
  productLink.href = `product-details.html?id=${product.id}`
  productLink.textContent = product.name
  productTitle.appendChild(productLink)
  productInfo.appendChild(productTitle)

  // Add product rating
  const productRating = document.createElement("div")
  productRating.className = "product-rating"

  // Create stars based on rating
  const fullStars = Math.floor(product.rating)
  const hasHalfStar = product.rating % 1 >= 0.5

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i")
    if (i <= fullStars) {
      star.className = "fas fa-star"
    } else if (i === fullStars + 1 && hasHalfStar) {
      star.className = "fas fa-star-half-alt"
    } else {
      star.className = "far fa-star"
    }
    productRating.appendChild(star)
  }

  const ratingCount = document.createElement("span")
  ratingCount.className = "rating-count"
  ratingCount.textContent = `(${product.ratingCount})`
  productRating.appendChild(ratingCount)

  productInfo.appendChild(productRating)

  // Add product price
  const productPrice = document.createElement("div")
  productPrice.className = "product-price"

  const currentPrice = document.createElement("span")
  currentPrice.className = "current-price"
  currentPrice.textContent = `$${product.price.toFixed(2)}`
  productPrice.appendChild(currentPrice)

  if (product.originalPrice) {
    const originalPrice = document.createElement("span")
    originalPrice.className = "original-price"
    originalPrice.textContent = `$${product.originalPrice.toFixed(2)}`
    productPrice.appendChild(originalPrice)
  }

  productInfo.appendChild(productPrice)

  // Add to cart button
  const addToCartBtn = document.createElement("button")
  addToCartBtn.className = "add-to-cart"
  addToCartBtn.textContent = "Add to Cart"
  addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  })

  productInfo.appendChild(addToCartBtn)

  // Assemble product card
  productCard.appendChild(productImage)
  productCard.appendChild(productInfo)

  // Add click event to navigate to product details
  productCard.addEventListener("click", () => {
    window.location.href = `product-details.html?id=${product.id}`
  })

  return productCard
}

/**
 * Initialize filters functionality
 */
function initFilters() {
  const filterCheckboxes = document.querySelectorAll(
    '.filter-list input[type="checkbox"], .filter-list input[type="radio"]',
  )
  const priceRange = document.getElementById("price-range")
  const priceValue = document.getElementById("price-value")
  const applyFiltersBtn = document.getElementById("apply-filters")
  const clearFiltersBtn = document.getElementById("clear-filters")

  if (!filterCheckboxes.length || !applyFiltersBtn || !clearFiltersBtn) return

  // Update price range value display
  if (priceRange && priceValue) {
    priceRange.addEventListener("input", function () {
      priceValue.textContent = `$${this.value}`
    })
  }

  // Apply filters
  applyFiltersBtn.addEventListener("click", () => {
    applyFilters()
  })

  // Clear filters
  clearFiltersBtn.addEventListener("click", () => {
    clearFilters()
  })

  // Mobile filter toggle
  const filterToggle = document.querySelector(".filter-toggle")
  const filtersContent = document.querySelector(".filters-content")

  if (filterToggle && filtersContent) {
    filterToggle.addEventListener("click", function () {
      filtersContent.classList.toggle("active")

      // Update toggle icon
      const icon = this.querySelector("i")
      if (filtersContent.classList.contains("active")) {
        icon.className = "fas fa-chevron-up"
      } else {
        icon.className = "fas fa-chevron-down"
      }
    })
  }
}

/**
 * Apply selected filters to products
 */
function applyFilters() {
  // Get selected categories
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(
    (input) => input.value,
  )

  // Get price range
  const maxPrice = Number.parseInt(document.getElementById("price-range").value)

  // Get rating filter
  const ratingFilter = document.querySelector('input[name="rating"]:checked').value
  const minRating = ratingFilter === "any" ? 0 : Number.parseInt(ratingFilter)

  // Filter products
  let filteredProducts = productsData.filter((product) => {
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Filter by price
    if (product.price > maxPrice) {
      return false
    }

    // Filter by rating
    if (product.rating < minRating) {
      return false
    }

    return true
  })

  // Apply current sort
  const sortSelect = document.getElementById("sort-by")
  if (sortSelect) {
    const sortValue = sortSelect.value
    filteredProducts = sortProducts(filteredProducts, sortValue)
  }

  // Load filtered products
  loadProducts(filteredProducts)
}

/**
 * Clear all filters
 */
function clearFilters() {
  // Uncheck all category checkboxes
  document.querySelectorAll('input[name="category"]').forEach((input) => {
    input.checked = false
  })

  // Reset price range
  const priceRange = document.getElementById("price-range")
  const priceValue = document.getElementById("price-value")
  if (priceRange && priceValue) {
    priceRange.value = priceRange.max
    priceValue.textContent = `$${priceRange.max}`
  }

  // Reset rating filter
  document.getElementById("rating-any").checked = true

  // Load all products
  loadProducts()
}

/**
 * Initialize sorting functionality
 */
function initSorting() {
  const sortSelect = document.getElementById("sort-by")
  if (!sortSelect) return

  sortSelect.addEventListener("change", function () {
    const sortValue = this.value
    let products = [...productsData]

    // Apply current filters
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(
      (input) => input.value,
    )
    if (selectedCategories.length > 0) {
      products = products.filter((product) => selectedCategories.includes(product.category))
    }

    const maxPrice = Number.parseInt(document.getElementById("price-range").value)
    products = products.filter((product) => product.price <= maxPrice)

    const ratingFilter = document.querySelector('input[name="rating"]:checked').value
    const minRating = ratingFilter === "any" ? 0 : Number.parseInt(ratingFilter)
    products = products.filter((product) => product.rating >= minRating)

    // Sort products
    products = sortProducts(products, sortValue)

    // Load sorted products
    loadProducts(products)
  })
}

/**
 * Sort products based on sort value
 * @param {Array} products - Array of product objects
 * @param {string} sortValue - Sort value
 * @returns {Array} - Sorted products array
 */
function sortProducts(products, sortValue) {
  switch (sortValue) {
    case "price-low":
      return products.sort((a, b) => a.price - b.price)
    case "price-high":
      return products.sort((a, b) => b.price - a.price)
    case "rating":
      return products.sort((a, b) => b.rating - a.rating)
    case "newest":
      return products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    case "featured":
    default:
      return products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
  }
}

/**
 * Initialize pagination functionality
 */
function initPagination() {
  const paginationButtons = document.querySelectorAll(".pagination-btn")
  if (!paginationButtons.length) return

  paginationButtons.forEach((button) => {
    if (!button.classList.contains("active") && !button.disabled) {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        paginationButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // In a real application, this would load the next page of products
        // For this demo, we'll just scroll to the top of the products section
        const productsSection = document.querySelector(".products-section")
        if (productsSection) {
          window.scrollTo({
            top: productsSection.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    }
  })
}

/**
 * Toggle wishlist for a product
 * @param {number} productId - Product ID
 */
function toggleWishlist(productId) {
  // Get wishlist from localStorage
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

  // Check if product is already in wishlist
  const index = wishlist.indexOf(productId)

  if (index > -1) {
    // Remove from wishlist
    wishlist.splice(index, 1)
    window.homeMadeProducts.showNotification("Product removed from wishlist")
  } else {
    // Add to wishlist
    wishlist.push(productId)
    window.homeMadeProducts.showNotification("Product added to wishlist")
  }

  // Save to localStorage
  localStorage.setItem("wishlist", JSON.stringify(wishlist))

  // Update wishlist button
  const wishlistBtn = document.querySelector(`.product-card[data-product-id="${productId}"] .wishlist-btn i`)
  if (wishlistBtn) {
    if (index > -1) {
      wishlistBtn.className = "far fa-heart"
    } else {
      wishlistBtn.className = "fas fa-heart"
    }
  }
}

/**
 * Quick view product
 * @param {Object} product - Product object
 */
function quickViewProduct(product) {
  // Create quick view modal if it doesn't exist
  if (!document.querySelector(".quickview-modal")) {
    createQuickViewModal()
  }

  const modal = document.querySelector(".quickview-modal")
  const modalContent = modal.querySelector(".quickview-content")

  // Populate modal with product details
  modalContent.innerHTML = `
    <div class="quickview-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="quickview-info">
      <h2>${product.name}</h2>
      <div class="product-rating">
        ${getStarRating(product.rating)}
        <span class="rating-count">(${product.ratingCount})</span>
      </div>
      <div class="product-price">
        <span class="current-price">$${product.price.toFixed(2)}</span>
        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ""}
      </div>
      <div class="product-description">
        <p>${product.description}</p>
      </div>
      <div class="product-actions">
        <div class="quantity-selector">
          <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
          <input type="number" value="1" min="1" max="${product.stock}" id="quickview-quantity">
          <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
        </div>
        <button class="btn primary-btn add-to-cart-btn">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
      <div class="product-meta">
        <div class="meta-item">
          <span>Category:</span>
          <a href="products.html?category=${product.category}">${capitalizeFirstLetter(product.category)}</a>
        </div>
        <div class="meta-item">
          <span>Availability:</span>
          ${product.stock > 0 ? `<span class="in-stock">In Stock (${product.stock})</span>` : '<span class="out-of-stock">Out of Stock</span>'}
        </div>
      </div>
    </div>
  `

  // Show modal
  modal.style.display = "flex"
  document.body.style.overflow = "hidden" // Prevent scrolling

  // Add event listeners
  const closeBtn = modal.querySelector(".close-modal")
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.style.overflow = "" // Re-enable scrolling
  })

  // Quantity selector
  const minusBtn = modal.querySelector(".quantity-btn.minus")
  const plusBtn = modal.querySelector(".quantity-btn.plus")
  const quantityInput = modal.querySelector("#quickview-quantity")

  minusBtn.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1
    }
  })

  plusBtn.addEventListener("click", () => {
    const currentValue = Number.parseInt(quantityInput.value)
    if (currentValue < product.stock) {
      quantityInput.value = currentValue + 1
    }
  })

  // Add to cart button
  const addToCartBtn = modal.querySelector(".add-to-cart-btn")
  addToCartBtn.addEventListener("click", () => {
    const quantity = Number.parseInt(quantityInput.value)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })

    // Close modal
    modal.style.display = "none"
    document.body.style.overflow = "" // Re-enable scrolling
  })

  // Close modal when clicking outside
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "" // Re-enable scrolling
    }
  })
}

/**
 * Create quick view modal
 */
function createQuickViewModal() {
  const modal = document.createElement("div")
  modal.className = "quickview-modal"

  modal.innerHTML = `
    <div class="quickview-container">
      <button class="close-modal"><i class="fas fa-times"></i></button>
      <div class="quickview-content">
        <!-- Content will be dynamically added -->
      </div>
    </div>
  `

  document.body.appendChild(modal)
}

/**
 * Get star rating HTML
 * @param {number} rating - Rating value
 * @returns {string} - Star rating HTML
 */
function getStarRating(rating) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  let starsHtml = ""

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHtml += '<i class="fas fa-star"></i>'
    } else if (i === fullStars + 1 && hasHalfStar) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>'
    } else {
      starsHtml += '<i class="far fa-star"></i>'
    }
  }

  return starsHtml
}

/**
 * Add to cart functionality
 * @param {Object} product - Product object
 */
function addToCart(product) {
  window.homeMadeProducts.addToCart(product)
}

/**
 * Capitalize first letter of a string
 * @param {string} string - String to capitalize
 * @returns {string} - Capitalized string
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}