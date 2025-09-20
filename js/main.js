/**
 * Home Made Products - Main JavaScript
 * This file contains the main functionality for the artisanal marketplace
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile menu
  initMobileMenu()

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize testimonial slider
  initTestimonialSlider()

  // Update cart count from localStorage
  updateCartCount()

  // Initialize newsletter form
  initNewsletterForm()
})

/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle")

  if (!menuToggle) return

  // Create mobile menu if it doesn't exist
  if (!document.querySelector(".mobile-menu")) {
    createMobileMenu()
  }

  const mobileMenu = document.querySelector(".mobile-menu")
  const closeMenu = document.querySelector(".close-menu")

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
    document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
  })

  // Close mobile menu
  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = "" // Re-enable scrolling
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    }
  })
}

/**
 * Create Mobile Menu DOM Structure
 */
function createMobileMenu() {
  // Create mobile menu elements
  const mobileMenu = document.createElement("div")
  mobileMenu.className = "mobile-menu"

  // Create mobile menu header
  const mobileMenuHeader = document.createElement("div")
  mobileMenuHeader.className = "mobile-menu-header"

  const logoClone = document.querySelector(".logo").cloneNode(true)

  const closeButton = document.createElement("button")
  closeButton.className = "close-menu"
  closeButton.innerHTML = '<i class="fas fa-times"></i>'

  mobileMenuHeader.appendChild(logoClone)
  mobileMenuHeader.appendChild(closeButton)

  // Create mobile menu links
  const mobileNavLinks = document.createElement("ul")
  mobileNavLinks.className = "mobile-nav-links"

  // Clone the navigation links
  const navLinks = document.querySelector(".nav-links").cloneNode(true)
  const navItems = navLinks.querySelectorAll("li")

  navItems.forEach((item) => {
    mobileNavLinks.appendChild(item.cloneNode(true))
  })

  // Add user and cart links
  const userLink = document.createElement("li")
  userLink.innerHTML = '<a href="login.html"><i class="fas fa-user"></i> Account</a>'

  const cartLink = document.createElement("li")
  cartLink.innerHTML = '<a href="cart.html"><i class="fas fa-shopping-cart"></i> Cart</a>'

  mobileNavLinks.appendChild(userLink)
  mobileNavLinks.appendChild(cartLink)

  // Assemble mobile menu
  mobileMenu.appendChild(mobileMenuHeader)
  mobileMenu.appendChild(mobileNavLinks)

  // Add to the DOM
  document.body.appendChild(mobileMenu)
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  if (animatedElements.length === 0) return

  // Check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
  }

  // Add visible class to elements in viewport
  function checkAnimations() {
    animatedElements.forEach((element) => {
      if (isInViewport(element)) {
        element.classList.add("visible")
      }
    })
  }

  // Run on scroll
  window.addEventListener("scroll", checkAnimations)

  // Run on page load
  checkAnimations()
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
  const testimonialSlider = document.querySelector(".testimonial-slider")
  const dots = document.querySelectorAll(".testimonial-dots .dot")

  if (!testimonialSlider || !dots.length) return

  let currentSlide = 0
  const slides = testimonialSlider.querySelectorAll(".testimonial-slide")

  // Hide all slides except the first one
  for (let i = 1; i < slides.length; i++) {
    slides[i].style.display = "none"
  }

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
    })
  })

  // Auto rotate slides every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }, 5000)

  // Show slide by index
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.style.display = "none"
    })

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the selected slide
    slides[index].style.display = "block"
    dots[index].classList.add("active")

    // Update current slide
    currentSlide = index

    // Add fade-in animation
    slides[index].classList.add("animate-fade-in")
    setTimeout(() => {
      slides[index].classList.remove("animate-fade-in")
    }, 1000)
  }
}

/**
 * Update Cart Count
 */
function updateCartCount() {
  const cartCountElements = document.querySelectorAll(".cart-count")

  if (!cartCountElements.length) return

  // Get cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  // Update all cart count elements
  cartCountElements.forEach((element) => {
    element.textContent = itemCount

    // Add animation if count is greater than 0
    if (itemCount > 0) {
      element.classList.add("animate-pulse")
      setTimeout(() => {
        element.classList.remove("animate-pulse")
      }, 1000)
    }
  })
}

/**
 * Add to Cart Functionality
 * @param {Object} product - Product object to add to cart
 */
function addToCart(product) {
  // Get existing cart items
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  // Check if product already exists in cart
  const existingItemIndex = cartItems.findIndex((item) => item.id === product.id)

  if (existingItemIndex > -1) {
    // Update quantity if product already in cart
    cartItems[existingItemIndex].quantity += product.quantity || 1
  } else {
    // Add new product to cart
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity || 1,
    })
  }

  // Save to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems))

  // Update cart count
  updateCartCount()

  // Update order summary in sessionStorage to keep checkout in sync
  updateOrderSummaryFromCart()

  // Show notification
  showNotification(`${product.name} added to cart!`)
}

/**
 * Update order summary in sessionStorage based on current cart
 * This keeps the checkout page in sync with cart changes
 */
function updateOrderSummaryFromCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
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
 * Show Notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = "success") {
  // Create notification element if it doesn't exist
  if (!document.querySelector(".notification-container")) {
    const container = document.createElement("div")
    container.className = "notification-container"
    document.body.appendChild(container)
  }

  const container = document.querySelector(".notification-container")

  // Create notification
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `

  // Add to container
  container.appendChild(notification)

  // Add close functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.remove()
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.remove()
  }, 5000)
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
  const forms = document.querySelectorAll(".newsletter-form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (!email) {
        showNotification("Please enter your email address", "error")
        return
      }

      // Simulate API call
      setTimeout(() => {
        showNotification("Thank you for subscribing to our newsletter!")
        emailInput.value = ""
      }, 1000)
    })
  })
}

/**
 * Change Product Image
 * @param {string} imageSrc - Source of the image to display
 */
function changeImage(imageSrc) {
  const mainImage = document.getElementById("main-product-image")
  if (!mainImage) return

  // Change main image source
  mainImage.src = imageSrc

  // Update active thumbnail
  const thumbnails = document.querySelectorAll(".thumbnail-images img")
  thumbnails.forEach((thumb) => {
    if (thumb.getAttribute("src") === imageSrc) {
      thumb.classList.add("active")
    } else {
      thumb.classList.remove("active")
    }
  })
}

/**
 * Initialize Tab Functionality
 * @param {string} tabsSelector - Selector for tabs container
 * @param {string} tabBtnSelector - Selector for tab buttons
 * @param {string} tabPanelSelector - Selector for tab panels
 */
function initTabs(tabsSelector, tabBtnSelector, tabPanelSelector) {
  const tabsContainer = document.querySelector(tabsSelector);
  if (!tabsContainer) return;
  
  const tabButtons = tabsContainer.querySelectorAll(tabBtnSelector);
  const tabPanels = tabsContainer.querySelectorAll(tabPanelSelector);
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked button and corresponding panel
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}


// Export functions for use in other files
window.homeMadeProducts = {
  addToCart,
  updateCartCount,
  showNotification,
  changeImage,
  initTabs,
  updateOrderSummaryFromCart
};

