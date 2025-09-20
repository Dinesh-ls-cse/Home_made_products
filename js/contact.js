// Home Made Products - Contact Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // FAQ Accordion functionality
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });
      item.classList.toggle("active");
    });
  });

  // Select the contact form
  const contactForm = document.querySelector("#contact-form");
  if (!contactForm) return;

  // Form validation and submission
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    let isValid = true;

    // Email validation
    const emailField = contactForm.querySelector("#email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailField.value || !emailPattern.test(emailField.value)) {
      isValid = false;
      emailField.classList.add("error");
    }

    if (isValid) {
      let formData = new FormData(contactForm);

      fetch("contact.php", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement("div");
            successMessage.className = "success-message animate-fade-in";
            successMessage.innerHTML = `
              <i class="fas fa-check-circle"></i>
              <h3>Thank You!</h3>
              <p>${data.message}</p>
            `;

            contactForm.classList.add("animate-fade-out");

            setTimeout(() => {
              contactForm.style.display = "none";
              formContainer.appendChild(successMessage);
              contactForm.reset();
            }, 300);
          } else {
            alert(data.message); // Show error message if any
          }
        })
        .catch(error => console.error("Error:", error));
    }
  });

  // Remove error class on input
  const formInputs = contactForm.querySelectorAll("input, textarea, select");
  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("error");
    });
  });

  // Add animation classes to elements when they come into view
  const animateElements = document.querySelectorAll(
    ".contact-info, .contact-form-container, .map-container, .faq-item"
  );

  const animateOnScroll = () => {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate-fade-in");
      }
    });
  };

  // Run once on page load
  animateOnScroll();

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll);
});

// Add these styles to support the JS functionality
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
    .error {
        border-color: #ff4d4d !important;
        box-shadow: 0 0 0 3px rgba(255, 77, 77, 0.1) !important;
    }
    
    .success-message {
        text-align: center;
        padding: var(--spacing-xl);
    }
    
    .success-message i {
        font-size: 3rem;
        color: #00cc44;
        margin-bottom: var(--spacing-md);
    }
    
    .animate-fade-out {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.5s ease forwards;
    }
</style>
`
);
