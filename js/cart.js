/**
 * Home Made Products - Cart JavaScript
 * This file contains functionality for the shopping cart
 */

document.addEventListener("DOMContentLoaded", () => {
  // Load cart items
  loadCartItems()

  // Initialize cart functionality
  initCartFunctionality()
})

/**
 * Load cart items from localStorage
 */
function loadCartItems() {
  // Get cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  // Get cart container
  const cartItemsContainer = document.getElementById("cart-items-container")
  const emptyCart = document.querySelector(".empty-cart")
  const cartContent = document.querySelector(".cart-content")

  if (!cartItemsContainer || !emptyCart || !cartContent) return

  // Check if cart is empty
  if (cartItems.length === 0) {
    emptyCart.style.display = "block"
    cartContent.style.display = "none"
    return
  }

  // Show cart content
  emptyCart.style.display = "none"
  cartContent.style.display = "block"

  // Clear existing items
  cartItemsContainer.innerHTML = ""

  // Calculate totals
  let subtotal = 0

  // Add each item to the cart
  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.setAttribute("data-item-id", item.id)

    cartItem.innerHTML = `
      <div class="cart-product">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-product-info">
          <h4>${item.name}</h4>
          ${item.color ? `<div class="product-variant">Color: ${item.color}</div>` : ""}
        </div>
      </div>
      <div class="cart-price">$${item.price.toFixed(2)}</div>
      <div class="cart-quantity">
        <div class="quantity-selector">
          <button class="quantity-btn minus" data-item-id="${item.id}"><i class="fas fa-minus"></i></button>
          <input type="number" value="${item.quantity}" min="1" max="10" data-item-id="${item.id}">
          <button class="quantity-btn plus" data-item-id="${item.id}"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div class="cart-total">$${itemTotal.toFixed(2)}</div>
      <button class="cart-remove" data-item-id="${item.id}"><i class="fas fa-times"></i></button>
    `

    cartItemsContainer.appendChild(cartItem)
  })

  // Update summary
  updateCartSummary(subtotal)

  // Also update the order summary in sessionStorage to keep checkout in sync
  updateOrderSummaryInSession(subtotal)
}

/**
 * Update order summary in sessionStorage to keep checkout in sync
 * @param {number} subtotal - Cart subtotal
 */
function updateOrderSummaryInSession(subtotal) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  // Calculate totals
  const shipping = subtotal >= 50 ? 0 : 4.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Update order summary in sessionStorage
  const orderSummary = {
    cartItems,
    subtotal,
    shipping,
    tax,
    total,
  }

  sessionStorage.setItem("orderSummary", JSON.stringify(orderSummary))
}

/**
 * Initialize cart functionality
 */
function initCartFunctionality() {
  // Get cart container
  const cartItemsContainer = document.getElementById("cart-items-container")
  if (!cartItemsContainer) return

  // Event delegation for cart items
  cartItemsContainer.addEventListener("click", (e) => {
    const target = e.target

    // Remove item
    if (target.classList.contains("cart-remove") || target.closest(".cart-remove")) {
      const removeBtn = target.classList.contains("cart-remove") ? target : target.closest(".cart-remove")
      const itemId = Number.parseInt(removeBtn.getAttribute("data-item-id"))
      removeCartItem(itemId)
    }

    // Decrease quantity
    if (target.classList.contains("minus") || target.closest(".minus")) {
      const minusBtn = target.classList.contains("minus") ? target : target.closest(".minus")
      const itemId = Number.parseInt(minusBtn.getAttribute("data-item-id"))
      updateCartItemQuantity(itemId, "decrease")
    }

    // Increase quantity
    if (target.classList.contains("plus") || target.closest(".plus")) {
      const plusBtn = target.classList.contains("plus") ? target : target.closest(".plus")
      const itemId = Number.parseInt(plusBtn.getAttribute("data-item-id"))
      updateCartItemQuantity(itemId, "increase")
    }
  })

  // Quantity input change
  cartItemsContainer.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT" && e.target.type === "number") {
      const itemId = Number.parseInt(e.target.getAttribute("data-item-id"))
      const quantity = Number.parseInt(e.target.value)

      if (quantity > 0) {
        updateCartItemQuantity(itemId, "set", quantity)
      }
    }
  })

  // Update cart button
  const updateCartBtn = document.querySelector(".update-cart")
  if (updateCartBtn) {
    updateCartBtn.addEventListener("click", () => {
      // Reload cart items
      loadCartItems()
      window.homeMadeProducts.showNotification("Cart updated successfully")
    })
  }

  // Add event listener for checkout button
  const checkoutBtn = document.querySelector(".checkout-btn")
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      if (saveOrderSummary()) {
        console.log("Redirecting to checkout page")
        window.location.href = "checkout.html"
      }
    })
  }
}

/**
 * Save order summary in sessionStorage before navigating to checkout
 */
function saveOrderSummary() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  if (cartItems.length === 0) {
    alert("Your cart is empty!")
    return false
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal >= 50 ? 0 : 4.99 // Free shipping for orders over $50
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  // Save order details to sessionStorage
  const orderSummary = {
    cartItems,
    subtotal,
    shipping,
    tax,
    total,
  }

  console.log("Saving order summary:", orderSummary)
  sessionStorage.setItem("orderSummary", JSON.stringify(orderSummary))
  return true
}

/**
 * Remove item from cart
 * @param {number} itemId - Item ID to remove
 */
function removeCartItem(itemId) {
  // Get cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  // Find item index
  const itemIndex = cartItems.findIndex((item) => item.id === itemId)

  if (itemIndex > -1) {
    // Remove item
    cartItems.splice(itemIndex, 1)

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems))

    // Update cart count
    window.homeMadeProducts.updateCartCount()

    // Show notification
    window.homeMadeProducts.showNotification("Item removed from cart")

    // Reload cart items
    loadCartItems()
  }
}

/**
 * Update cart item quantity
 * @param {number} itemId - Item ID to update
 * @param {string} action - Action to perform (increase, decrease, set)
 * @param {number} quantity - Quantity to set (only for 'set' action)
 */
function updateCartItemQuantity(itemId, action, quantity = null) {
  // Get cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  // Find item
  const item = cartItems.find((item) => item.id === itemId)

  if (item) {
    // Update quantity
    switch (action) {
      case "increase":
        item.quantity++
        break
      case "decrease":
        if (item.quantity > 1) {
          item.quantity--
        }
        break
      case "set":
        item.quantity = quantity
        break
    }

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems))

    // Update cart count
    window.homeMadeProducts.updateCartCount()

    // Update item in DOM
    updateCartItemInDOM(itemId, item)

    // Update cart summary
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    updateCartSummary(subtotal)

    // Also update the order summary in sessionStorage
    updateOrderSummaryInSession(subtotal)
  }
}

/**
 * Update cart item in DOM
 * @param {number} itemId - Item ID to update
 * @param {Object} item - Updated item object
 */
function updateCartItemInDOM(itemId, item) {
  const cartItem = document.querySelector(`.cart-item[data-item-id="${itemId}"]`)
  if (!cartItem) return

  // Update quantity input
  const quantityInput = cartItem.querySelector('input[type="number"]')
  if (quantityInput) {
    quantityInput.value = item.quantity
  }

  // Update item total
  const itemTotal = item.price * item.quantity
  const totalElement = cartItem.querySelector(".cart-total")
  if (totalElement) {
    totalElement.textContent = `$${itemTotal.toFixed(2)}`
  }
}

/**
 * Update cart summary
 * @param {number} subtotal - Cart subtotal
 */
function updateCartSummary(subtotal) {
  const subtotalElement = document.getElementById("cart-subtotal")
  const shippingElement = document.getElementById("cart-shipping")
  const taxElement = document.getElementById("cart-tax")
  const totalElement = document.getElementById("cart-total")

  if (!subtotalElement || !shippingElement || !taxElement || !totalElement) return

  // Calculate shipping (free for orders over $50)
  const shipping = subtotal >= 50 ? 0 : 4.99

  // Calculate tax (8%)
  const tax = subtotal * 0.08

  // Calculate total
  const total = subtotal + shipping + tax

  // Update elements
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`
  shippingElement.textContent = shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`
  taxElement.textContent = `$${tax.toFixed(2)}`
  totalElement.textContent = `$${total.toFixed(2)}`
}

