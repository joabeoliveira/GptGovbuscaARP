/**
 * JavaScript main.js - Exemplo usando o HTML/CSS/JS Skills Kit
 * Padrões: Módulos ES6, validação, dark mode, acessibilidade
 */

// ============================================
// Módulo: Validação
// ============================================
const Validation = (() => {
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^\d{10,11}$/.test(phone.replace(/\D/g, ''));
  };

  const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  return {
    isValidEmail,
    isValidPhone,
    sanitizeInput
  };
})();

// ============================================
// Módulo: Dark Mode
// ============================================
const DarkMode = (() => {
  const STORAGE_KEY = 'darkMode';
  const DARK_CLASS = 'dark';

  const init = () => {
    const button = document.getElementById('toggleDarkMode');
    if (button) {
      button.addEventListener('click', toggle);
      applyPreference();
    }
  };

  const applyPreference = () => {
    const isDark = localStorage.getItem(STORAGE_KEY) === 'true' ||
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS);
      localStorage.setItem(STORAGE_KEY, 'true');
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
      localStorage.setItem(STORAGE_KEY, 'false');
    }
  };

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle(DARK_CLASS);
    localStorage.setItem(STORAGE_KEY, isDark ? 'true' : 'false');
  };

  return { init, toggle };
})();

// ============================================
// Módulo: Acessibilidade
// ============================================
const Accessibility = (() => {
  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 2000);
  };

  return {
    announceToScreenReader
  };
})();

// ============================================
// Módulo: Formulário
// ============================================
const FormHandler = (() => {
  const init = () => {
    const form = document.getElementById('exampleForm');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email?.value?.trim();
    const message = form.message?.value?.trim();

    // Validar email
    if (!email) {
      showError('email', 'Email é obrigatório');
      return;
    }

    if (!Validation.isValidEmail(email)) {
      showError('email', 'Email inválido');
      return;
    }

    // Limpar erros
    clearErrors();

    // Simular envio
    console.log('Enviando formulário:', { email, message });
    Accessibility.announceToScreenReader('Formulário enviado com sucesso!');

    // Limpar form
    form.reset();

    // Opcional: Simular requisição
    // await submitForm({ email, message });
  };

  const showError = (fieldName, message) => {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.remove('sr-only');
      const input = document.getElementById(fieldName);
      if (input) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', `${fieldName}Error`);
      }
    }
  };

  const clearErrors = () => {
    document.querySelectorAll('[id$="Error"]').forEach(el => {
      el.textContent = '';
      el.classList.add('sr-only');
    });
    document.querySelectorAll('input, textarea').forEach(el => {
      el.removeAttribute('aria-invalid');
    });
  };

  return { init };
})();

// ============================================
// Inicialização
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  DarkMode.init();
  FormHandler.init();
  console.log('✅ Aplicação inicializada');
});

// ============================================
// Exemplo: Performance - Debounce
// ============================================
const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Exemplo de uso: window.addEventListener('resize', debounce(handleResize, 200));

// ============================================
// Exemplo: Lazy Loading de Imagens
// ============================================
const setupLazyLoad = () => {
  const images = document.querySelectorAll('img[data-src]');

  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => observer.observe(img));
};

// Descomente se tiver imagens com data-src:
// document.addEventListener('DOMContentLoaded', setupLazyLoad);
