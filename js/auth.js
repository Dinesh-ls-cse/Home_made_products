/**
 * Home Made Products - Authentication JavaScript
 * This file handles login and registration functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
          const passwordInput = this.parentElement.querySelector('input');
          const icon = this.querySelector('i');
          
          if (passwordInput.type === 'password') {
              passwordInput.type = 'text';
              icon.classList.remove('fa-eye');
              icon.classList.add('fa-eye-slash');
          } else {
              passwordInput.type = 'password';
              icon.classList.remove('fa-eye-slash');
              icon.classList.add('fa-eye');
          }
      });
  });

  // Password strength meter
  const registerPasswordInput = document.getElementById('register-password');
  if (registerPasswordInput) {
      registerPasswordInput.addEventListener('input', function() {
          updatePasswordStrength(this.value);
      });
  }

  // Form submission
  const loginForm = document.getElementById('login-form-element');
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          handleLogin();
      });
  }

  const registerForm = document.getElementById('register-form-element');
  if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
          e.preventDefault();
          handleRegistration();
      });
  }
});

/**
* Updates the password strength meter based on password value
* @param {string} password - The password to evaluate
*/
function updatePasswordStrength(password) {
  const strengthMeter = document.querySelector('.strength-meter');
  const strengthText = document.querySelector('.strength-text');
  const segments = strengthMeter.querySelectorAll('.strength-segment');
  
  // Reset segments
  segments.forEach(segment => {
      segment.className = 'strength-segment';
  });
  
  // Calculate password strength
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  // Update UI based on strength
  for (let i = 0; i < strength; i++) {
      if (segments[i]) {
          if (strength === 1) {
              segments[i].classList.add('weak');
          } else if (strength === 2 || strength === 3) {
              segments[i].classList.add('medium');
          } else if (strength === 4) {
              segments[i].classList.add('strong');
          }
      }
  }
  
  // Update text
  if (password.length === 0) {
      strengthText.textContent = 'Password strength';
  } else if (strength === 1) {
      strengthText.textContent = 'Weak password';
  } else if (strength === 2) {
      strengthText.textContent = 'Fair password';
  } else if (strength === 3) {
      strengthText.textContent = 'Good password';
  } else {
      strengthText.textContent = 'Strong password';
  }
}

/**
* Handles the login form submission
*/
function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const rememberMe = document.getElementById('remember-me')?.checked;
  
  // Validate inputs
  if (!email || !password) {
      showNotification('Please fill in all fields', 'error');
      return;
  }
  
  // Here you would typically make an API call to your backend
  // For demonstration, we'll simulate a successful login
  console.log('Login attempt:', { email, password, rememberMe });
  
  // Simulate API call
  setTimeout(() => {
      // Successful login
      showNotification('Login successful! Redirecting...', 'success');
      
      // Redirect to dashboard or home page after a short delay
      setTimeout(() => {
          window.location.href = 'index.html';
      }, 1500);
  }, 1000);
}

/**
* Handles the registration form submission
*/
function handleRegistration() {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const termsAccepted = document.getElementById('terms')?.checked;
  
  // Validate inputs
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showNotification('Please fill in all fields', 'error');
      return;
  }
  
  if (password !== confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
  }
  
  if (!termsAccepted) {
      showNotification('Please accept the Terms of Service', 'error');
      return;
  }
  
  // Here you would typically make an API call to your backend
  // For demonstration, we'll simulate a successful registration
  console.log('Registration attempt:', { firstName, lastName, email, password });
  
  // Simulate API call
  setTimeout(() => {
      // Successful registration
      showNotification('Registration successful! Redirecting to login...', 'success');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
          window.location.href = 'login.html';
      }, 1500);
  }, 1000);
}

/**
* Shows a notification message to the user
* @param {string} message - The message to display
* @param {string} type - The type of notification (success, error, info)
*/
function showNotification(message, type = 'info') {
  // Check if notification container exists, create if not
  let notificationContainer = document.querySelector('.notification-container');
  if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.className = 'notification-container';
      document.body.appendChild(notificationContainer);
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
      <div class="notification-content">
          <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
          <span>${message}</span>
      </div>
      <button class="notification-close"><i class="fas fa-times"></i></button>
  `;
  
  // Add to container
  notificationContainer.appendChild(notification);
  
  // Add event listener for close button
  notification.querySelector('.notification-close').addEventListener('click', function() {
      notification.remove();
  });
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
          notification.remove();
      }, 300);
  }, 5000);
}