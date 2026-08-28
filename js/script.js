/* ===== Navigation Toggle ===== */
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  const icon = navToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

/* ===== Active link on scroll ===== */
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', highlightNav);

/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const icon = themeToggle.querySelector('i');
  const isLight = body.classList.contains('light');

  if (isLight) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  }
});


/* ===== Back to Top ===== */
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== Contact Form Validation ===== */
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('form-success');

function showError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  input.classList.add('error');
  errorEl.textContent = message;
}

function clearError(input) {
  const errorEl = document.getElementById(`${input.id}-error`);
  input.classList.remove('error');
  errorEl.textContent = '';
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  // Name
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Por favor, informe seu nome.');
    isValid = false;
  } else if (nameInput.value.trim().length < 2) {
    showError(nameInput, 'Nome deve ter pelo menos 2 caracteres.');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Email
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Por favor, informe seu e-mail.');
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, 'E-mail inválido.');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // Message
  if (messageInput.value.trim() === '') {
    showError(messageInput, 'Por favor, escreva uma mensagem.');
    isValid = false;
  } else if (messageInput.value.trim().length < 10) {
    showError(messageInput, 'Mensagem deve ter pelo menos 10 caracteres.');
    isValid = false;
  } else {
    clearError(messageInput);
  }

  if (isValid) {
    formSuccess.hidden = false;
    form.reset();
    setTimeout(() => {
      formSuccess.hidden = true;
    }, 4000);
  }
});

// Clear errors on input
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', () => clearError(input));
});
