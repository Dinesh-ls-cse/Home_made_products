document.addEventListener("DOMContentLoaded", function () {
  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
          }
      });
  });

  // Scroll-triggered animations
  function revealOnScroll() {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach(el => {
          const position = el.getBoundingClientRect().top;
          if (position < window.innerHeight - 100) {
              el.classList.add("visible");
          }
      });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger animations if elements are already in view

  // Dynamic cart count update
  function updateCartCount() {
      const cartCount = localStorage.getItem("cartCount") || 0;
      document.querySelector(".cart-count").textContent = cartCount;
  }
  updateCartCount();
  
  // Simulate cart addition (for demo purposes)
  document.querySelector(".cart-icon").addEventListener("click", function () {
      let cartCount = parseInt(localStorage.getItem("cartCount") || "0");
      cartCount++;
      localStorage.setItem("cartCount", cartCount);
      updateCartCount();
  });
});
