document.addEventListener("DOMContentLoaded", function () {
  // Animate elements on scroll
  const animateOnScroll = document.querySelectorAll(".animate-on-scroll");
  
  function handleScrollAnimation() {
      animateOnScroll.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.9) {
              el.classList.add("visible");
          }
      });
  }

  window.addEventListener("scroll", handleScrollAnimation);
  handleScrollAnimation();

  // Update cart count dynamically
  function updateCartCount() {
      const cartCount = localStorage.getItem("cartCount") || 0;
      document.querySelector(".cart-count").textContent = cartCount;
  }
  updateCartCount();

  // Category links dynamic behavior
  const categoryLinks = document.querySelectorAll(".category-link");
  categoryLinks.forEach(link => {
      link.addEventListener("click", function (event) {
          event.preventDefault();
          const category = this.getAttribute("href").split("=")[1];
          localStorage.setItem("selectedCategory", category);
          window.location.href = "products.html";
      });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
              target.scrollIntoView({ behavior: "smooth" });
          }
      });
  });
});
