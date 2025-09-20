/**
 * Home Made Products - Checkout JavaScript
 * This file contains functionality for the checkout page
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Checkout page loaded")

  // Always use the latest cart data from localStorage
  syncOrderSummaryWithCart()

  // Load order summary from sessionStorage
  loadOrderSummary()

  // Display cart items in checkout
  displayCartItemsInCheckout()

  // Initialize form validation
  initFormValidation()
})

/**
 * Sync order summary with current cart data
 * This ensures checkout always shows the latest cart contents
 */
function syncOrderSummaryWithCart() {
  // Get current cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  if (cartItems.length === 0) {
    console.log("Cart is empty")
    // Don't redirect, but update the order summary to show empty
    const orderSummary = {
      cartItems: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
    }
    sessionStorage.setItem("orderSummary", JSON.stringify(orderSummary))
  } else {
    console.log("Syncing checkout with cart data:", cartItems)
    // Calculate totals based on current cart
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = subtotal >= 50 ? 0 : 4.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    // Update order summary with latest cart data
    const orderSummary = {
      cartItems,
      subtotal,
      shipping,
      tax,
      total,
    }
    sessionStorage.setItem("orderSummary", JSON.stringify(orderSummary))
  }
}

/**
 * Load order summary from sessionStorage
 */
function loadOrderSummary() {
  // Get order summary from sessionStorage
  const orderSummary = JSON.parse(sessionStorage.getItem("orderSummary"))
  console.log("Loading order summary:", orderSummary)

  if (!orderSummary) {
    console.log("No order summary found")
    return // Don't redirect, just return
  }

  // Update order summary in checkout page
  const subtotalElement = document.getElementById("cart-subtotal")
  const shippingElement = document.getElementById("cart-shipping")
  const taxElement = document.getElementById("cart-tax")
  const totalElement = document.getElementById("cart-total")

  if (subtotalElement) subtotalElement.textContent = `$${orderSummary.subtotal.toFixed(2)}`
  if (shippingElement)
    shippingElement.textContent = orderSummary.shipping === 0 ? "Free" : `$${orderSummary.shipping.toFixed(2)}`
  if (taxElement) taxElement.textContent = `$${orderSummary.tax.toFixed(2)}`
  if (totalElement) totalElement.textContent = `$${orderSummary.total.toFixed(2)}`

  // Set hidden fields for form submission if they exist
  const hiddenProductName = document.getElementById("hiddenProductName")
  const hiddenProductPrice = document.getElementById("hiddenProductPrice")
  const hiddenProductImage = document.getElementById("hiddenProductImage")

  if (hiddenProductName && hiddenProductPrice) {
    // Convert cart items to a string of product names
    const productNames = orderSummary.cartItems.map((item) => item.name).join(", ")
    hiddenProductName.value = productNames
    hiddenProductPrice.value = orderSummary.total.toFixed(2)

    // If there's an image field and at least one product, use the first product's image
    if (hiddenProductImage && orderSummary.cartItems.length > 0) {
      hiddenProductImage.value = orderSummary.cartItems[0].image
    }
  }
}

/**
 * Display cart items in the checkout page
 */
function displayCartItemsInCheckout() {
  const orderSummary = JSON.parse(sessionStorage.getItem("orderSummary"))
  const cartItemsContainer = document.getElementById("checkout-items-container")

  if (!cartItemsContainer || !orderSummary || !orderSummary.cartItems) return

  cartItemsContainer.innerHTML = ""

  orderSummary.cartItems.forEach((item) => {
    const itemElement = document.createElement("div")
    itemElement.className = "checkout-item"
    itemElement.innerHTML = `
      <div class="checkout-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="checkout-item-details">
        <h4>${item.name}</h4>
        <div class="checkout-item-price">
          <span>$${item.price.toFixed(2)} × ${item.quantity}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    `
    cartItemsContainer.appendChild(itemElement)
  })

  // Set the hidden field with all cart items JSON
  const cartItemsJsonField = document.getElementById("cartItemsJson")
  if (cartItemsJsonField) {
    cartItemsJsonField.value = JSON.stringify(orderSummary.cartItems)
  }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
  const shippingForm = document.getElementById("shipping-form")
  if (!shippingForm) return

  shippingForm.addEventListener("submit", (e) => {
    // Basic validation
    let isValid = true
    const requiredFields = shippingForm.querySelectorAll("[required]")

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error")
        isValid = false
      } else {
        field.classList.remove("error")
      }
    })

    // Email validation
    const emailField = document.getElementById("email")
    if (emailField && emailField.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(emailField.value)) {
        emailField.classList.add("error")
        isValid = false
      }
    }

    // Mobile validation
    const mobileField = document.getElementById("mobile")
    if (mobileField && mobileField.value) {
      const mobilePattern = /^\d{10}$/
      if (!mobilePattern.test(mobileField.value)) {
        mobileField.classList.add("error")
        isValid = false
      }
    }

    if (!isValid) {
      e.preventDefault() // Only prevent submission if validation fails
    }
  })

  // Remove error class on input
  const formInputs = shippingForm.querySelectorAll("input, textarea, select")
  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("error")
    })
  })
}

/**
 * Show order confirmation
 * This is only used if you want to show a confirmation without redirecting
 */
function showOrderConfirmation() {
  const checkoutContainer = document.querySelector(".checkout-container")
  if (!checkoutContainer) return

  // Create confirmation message
  const confirmationMessage = document.createElement("div")
  confirmationMessage.className = "order-confirmation"
  confirmationMessage.innerHTML = `
    <div class="order-confirmation-content">
      <i class="fas fa-check-circle"></i>
      <h2>Thank You for Your Order!</h2>
      <p>Your order has been placed successfully. We'll send you a confirmation email shortly.</p>
      <a href="index.html" class="btn primary-btn">Continue Shopping</a>
    </div>
  `

  // Replace checkout form with confirmation
  checkoutContainer.innerHTML = ""
  checkoutContainer.appendChild(confirmationMessage)

  // Clear cart and order summary
  localStorage.removeItem("cartItems")
  sessionStorage.removeItem("orderSummary")
}

