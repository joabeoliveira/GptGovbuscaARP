# GitHub Copilot Instructions

Este arquivo contém instruções específicas para GitHub Copilot em projetos HTML/CSS/JavaScript.

## 🎯 Objetivo

Fornecer contexto ao GitHub Copilot para gerar código de alta qualidade, testável e acessível para projetos Web com HTML5, CSS3, JavaScript ES6+ e Tailwind CSS.

## 📋 Diretrizes Principais

### Idioma e Comunicação
- Responda e escreva comentários em **Português (Brasil)**.
- Código em **inglês**; comentários explicativos em português.
- Mantenha tom profissional e focado em soluções.

### Stack Tecnológico
- **HTML5**: Semântica, acessibilidade, SEO.
- **CSS + Tailwind CSS**: Mobile-first, dark mode, componentes reutilizáveis.
- **JavaScript ES6+**: Modular, clean code, validação de entrada.
- **Gráficos**: Chart.js (simples), D3.js (complexo), SVG puro (customizado).

### Qualidade de Código
- Use `const`/`let` (nunca `var`).
- Nomes em **inglês**; comentários em **português**.
- Modularize JavaScript: `import/export`, separar em arquivos.
- Valide todas as entradas de usuário.
- Use `async/await` em vez de callbacks.
- Trate erros explicitamente.

### Acessibilidade (WCAG AA)
- HTML semântico: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Labels associados a inputs: `<label for="id">`.
- `alt` em todas as imagens (significative).
- Contraste: 4.5:1 texto, 3:1 UI components.
- Navegação por teclado funcional; foco visível.
- Aria labels quando necessário: `aria-label`, `aria-describedby`.

### Performance
- Lazy load imagens: `loading="lazy"`.
- Defer scripts: `<script defer>`.
- CSS inline para acima da dobra, link para resto.
- Minimize imagens; use WebP com fallback.
- Promise.all() para requisições paralelas.

### SEO Básico
- Meta tags: `charset`, `viewport`, `description`.
- `<h1>` uma vez por página; hierarquia correta.
- Estrutura semântica com landmarks.

### Dark Mode
- Classes Tailwind: `dark:bg-gray-900`, `dark:text-white`.
- Defina no HTML: `<html class="dark">`.
- Ofereça toggle ao usuário.

## 📂 Estrutura de Projeto Sugerida

```
projeto/
├── index.html
├── css/
│   ├── style.css (Tailwind ou main)
│   └── custom.css (customizações)
├── js/
│   ├── main.js
│   ├── components/
│   │   ├── navbar.js
│   │   ├── modal.js
│   │   └── form-handler.js
│   └── utils/
│       ├── dom.js
│       ├── validation.js
│       └── api.js
├── img/ (imagens otimizadas)
├── assets/ (fontes, ícones)
└── tailwind.config.js
```

## 🔍 Checklist ao Gerar Código

- ✅ HTML semântico com acessibilidade?
- ✅ CSS com Tailwind (mobile-first)?
- ✅ JavaScript modular (ES6 modules)?
- ✅ Entrada de usuário validada?
- ✅ Imagens lazy loaded + alt?
- ✅ Dark mode considerado?
- ✅ Performance otimizada (bundle, imagens)?
- ✅ Testes de teclado + leitores de tela?

## 🚀 Exemplos

### HTML Semântico + Acessível
```html
<header>
  <nav aria-label="Principal">
    <a href="/">Home</a>
  </nav>
</header>

<main id="main">
  <article>
    <h1>Título</h1>
    <p>Conteúdo...</p>
  </article>
</main>

<aside aria-labelledby="related">
  <h2 id="related">Relacionado</h2>
</aside>

<footer>© 2024</footer>
```

### Tailwind com Dark Mode
```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <button class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 text-white 
                 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 
                 focus:ring-blue-500">
    Clique aqui
  </button>
</div>
```

### JavaScript Modular
```javascript
// utils/validation.js
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// main.js
import { isValidEmail } from './utils/validation.js';

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value;
  if (!isValidEmail(email)) {
    console.error('Email inválido');
    return;
  }
  // enviar...
});
```

## 📚 Recursos

Consulte as skills em `.skills/`:
- `html-structure/` - Semântica e SEO
- `tailwind-css/` - Estilos e responsividade
- `javascript-vanilla/` - JavaScript puro e modular
- `graphics-animations/` - Gráficos, animações, performance
- `accessibility-emag/` - Acessibilidade WCAG AA
- `performance-optimization/` - Otimizações web
