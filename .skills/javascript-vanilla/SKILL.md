# Skill: JavaScript Vanilla & ES6+

---
**name:** JavaScript Vanilla & Modern ES6+  
**description:** Padrões e boas práticas para JavaScript puro (sem frameworks) em projetos contemporâneos.  
---

## 🎯 Objetivo
Escrever JavaScript limpo, modular, performático e acessível sem dependências desnecessárias.

## 📋 Instruções Principais

### 1. Estrutura de Arquivos JavaScript
```
js/
├── main.js              # Ponto de entrada
├── components/          # Componentes reutilizáveis
│   ├── navbar.js
│   ├── modal.js
│   └── form-handler.js
├── utils/               # Funções utilitárias
│   ├── dom.js
│   ├── validation.js
│   └── api.js
└── constants.js         # Constantes do projeto
```

### 2. Padrões Fundamentais (ES6+)

#### Módulos (Import/Export)
```javascript
// utils/dom.js
export function querySelector(selector) {
  return document.querySelector(selector);
}

export function addEventListener(element, event, handler) {
  element?.addEventListener(event, handler);
}

// main.js
import { querySelector, addEventListener } from './utils/dom.js';

const button = querySelector('.btn-submit');
addEventListener(button, 'click', handleSubmit);
```

#### Const/Let (Nunca var)
```javascript
// ✅ Bom
const API_BASE = 'https://api.example.com'; // Constante
let currentPage = 1;                          // Variável mutável

// ❌ Evitar
var oldStyle = 'não usar'; // Escopo confuso
```

#### Arrow Functions & Destructuring
```javascript
// ✅ Bom
const handleClick = (event) => {
  const { target } = event;
  const { id, dataset } = target;
  console.log(id, dataset);
};

// ❌ Evitar
function handleClick(event) {
  // Syntax antiga
}
```

#### Async/Await
```javascript
// ✅ Bom - Limpo e legível
async function fetchUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error('Erro ao buscar usuário');
    return await response.json();
  } catch (error) {
    console.error('Erro:', error.message);
    return null;
  }
}

// ❌ Evitar - Callbacks aninhados
fetch('/api/users')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(e => console.error(e));
```

### 3. Validação & Segurança

#### Validação de Entrada
```javascript
// utils/validation.js
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  return /^\d{10,11}$/.test(phone.replace(/\D/g, ''));
}

export function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// main.js
import { isValidEmail, sanitizeInput } from './utils/validation.js';

const email = document.getElementById('email').value;
if (!isValidEmail(email)) {
  console.error('Email inválido');
  return;
}
```

#### Prevenção de XSS
```javascript
// ✅ Bom - Seguro
element.textContent = userInput; // Não parse HTML

// ❌ Evitar - Vulnerável a XSS
element.innerHTML = userInput; // Pode executar scripts
```

### 4. Manipulação de DOM Eficiente

#### Seletores Modernos
```javascript
// ✅ Bom
const button = document.querySelector('.btn-primary');
const buttons = document.querySelectorAll('[data-role="button"]');
const modal = document.getElementById('modalId');

// ❌ Evitar
const btn = document.getElementsByClassName('btn-primary')[0];
```

#### Event Delegation
```javascript
// ✅ Bom - Uma listener para múltiplos elementos
document.addEventListener('click', (event) => {
  if (event.target.matches('.btn-action')) {
    handleAction(event.target);
  }
});

// ❌ Evitar - Listener para cada elemento
document.querySelectorAll('.btn-action').forEach(btn => {
  btn.addEventListener('click', handleAction);
});
```

#### Manipulação de Classes
```javascript
// ✅ Bom - Moderno
element.classList.add('active');
element.classList.remove('disabled');
element.classList.toggle('dark-mode');
element.classList.contains('visible');

// ❌ Evitar - Antigo
element.className += ' active';
element.className = element.className.replace('active', '');
```

### 5. Componentes Reutilizáveis

#### Padrão: Classe para Componentes Complexos
```javascript
// components/modal.js
export class Modal {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.closeBtn = this.element.querySelector('[data-close]');
    this.bindEvents();
  }

  bindEvents() {
    this.closeBtn?.addEventListener('click', () => this.close());
    this.element?.addEventListener('click', (e) => {
      if (e.target === this.element) this.close();
    });
  }

  open() {
    this.element?.classList.add('modal-open');
    this.element?.setAttribute('aria-hidden', 'false');
  }

  close() {
    this.element?.classList.remove('modal-open');
    this.element?.setAttribute('aria-hidden', 'true');
  }
}

// main.js
import { Modal } from './components/modal.js';
const modal = new Modal('myModal');
document.querySelector('.btn-open-modal').addEventListener('click', () => modal.open());
```

### 6. Requisições API

#### Fetch com Timeout
```javascript
// utils/api.js
export async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Requisição expirou');
    }
    throw error;
  }
}
```

### 7. Armazenamento Local

#### LocalStorage com Serialização
```javascript
// utils/storage.js
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Erro ao salvar:', error);
  }
}

export function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erro ao recuperar:', error);
    return defaultValue;
  }
}
```

### 8. Acessibilidade em JavaScript

#### Atributos ARIA Dinâmicos
```javascript
// Anunciar mudanças para leitores de tela
export function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only'; // Classe CSS que esconde visualmente
  announcement.textContent = message;

  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
}

// Exemplo de uso
async function handleFormSubmit(event) {
  event.preventDefault();
  try {
    await submitForm();
    announceToScreenReader('Formulário enviado com sucesso!');
  } catch (error) {
    announceToScreenReader('Erro ao enviar formulário');
  }
}
```

#### Navegação por Teclado
```javascript
// Implementar navegação Tab entre elementos focáveis
export function makeFocusable(element) {
  if (!element.tabIndex && element.tabIndex !== 0) {
    element.tabIndex = 0;
  }
}

export function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey && document.activeElement === firstFocusable) {
      lastFocusable.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      firstFocusable.focus();
      e.preventDefault();
    }
  });
}
```

### 9. Performance

#### Debounce & Throttle
```javascript
// utils/performance.js
export function debounce(func, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle(func, limit = 300) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Uso
const handleResize = debounce(() => {
  console.log('Window resized');
}, 200);

window.addEventListener('resize', handleResize);
```

#### Lazy Loading com Intersection Observer
```javascript
export function setupLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');

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
}
```

### 10. Constraints
- **Sempre use módulos ES6** (import/export).
- **Nunca use `var`**; prefira `const` e `let`.
- **Valide entrada do usuário** sempre.
- **Use `textContent`** em vez de `innerHTML` quando possível.
- **Trate erros explicitamente** com try/catch em Promises e async/await.
- **Teste acessibilidade**: navegação por teclado, ARIA, leitores de tela.
- **Minifique JavaScript em produção**.

### 11. Recursos Úteis
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
