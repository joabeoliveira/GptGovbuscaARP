# Skill: Tailwind CSS & Design Responsivo

---
**name:** Tailwind CSS & Responsive Design  
**description:** Padrões e boas práticas para Tailwind CSS com foco em mobile-first e dark mode.  
---

## 🎯 Objetivo
Garantir estilos consistentes, responsivos e acessíveis usando Tailwind CSS em todos os projetos.

## 📋 Instruções Principais

### 1. Configuração Base do Tailwind
```javascript
// tailwind.config.js
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',    // Azul profundo
        secondary: '#DC2626',  // Vermelho
        accent: '#EA580C',     // Laranja
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Ativa dark mode com classe .dark no HTML
};
```

### 2. Estrutura CSS com Tailwind
```html
<!-- Sempre use classes Tailwind, nunca CSS inline -->
<div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Título
    </h1>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        Conteúdo
    </p>
</div>
```

### 3. Mobile-First & Responsive
- **Comece com mobile**, depois use breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`.
- Exemplo: `w-full md:w-1/2 lg:w-1/3` (100% mobile, 50% em tablets, 33% em desktop).
- **Sempre teste em múltiplos tamanhos de tela.**

```html
<!-- Layout responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <!-- Card -->
    </div>
</div>
```

### 4. Dark Mode (Nativo com Tailwind)
```html
<!-- No arquivo base (HTML) -->
<html class="dark"> <!-- Adicione .dark para ativar dark mode -->
    <body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <!-- Conteúdo responde automaticamente -->
    </body>
</html>
```

```javascript
// JavaScript para toggle dark mode
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Aplicar preferência salva ao carregar
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}
```

### 5. Componentes Reutilizáveis com Tailwind
```html
<!-- Padrão: classes em variáveis de CSS custom ou função JS -->

<!-- Botão Base -->
<button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 
              transition-colors duration-200 font-medium
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
    Clique aqui
</button>

<!-- Card Reutilizável -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md 
            p-6 border border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold mb-2">Card Title</h3>
    <p class="text-gray-600 dark:text-gray-400">Conteúdo...</p>
</div>
```

### 6. Acessibilidade com Tailwind
```html
<!-- Contraste adecuado -->
<div class="text-gray-900 dark:text-white bg-white dark:bg-gray-900">
    <!-- Mínimo 4.5:1 de contraste -->
</div>

<!-- Estados focus visíveis (obrigatório) -->
<button class="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
    Foco bem visível
</button>

<!-- Espaçamento para clicabilidade -->
<button class="px-4 py-2 h-10 min-h-10 min-w-10">
    <!-- 44px mínimo em mobile para clicabilidade -->
</button>
```

### 7. Animações com Tailwind (Acessíveis)
```html
<!-- Transições suaves -->
<div class="transition-all duration-300 hover:shadow-lg">
    Elemento com transição
</div>

<!-- Respeitar preferência de redução de movimento -->
<style>
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
</style>
```

### 8. Paleta de Cores Recomendada
```
Primária (Ações):     #1E40AF (Azul)
Secundária (Links):   #DC2626 (Vermelho)
Acento (Destaque):    #EA580C (Laranja)
Neutro (Texto):       #1F2937 (Gray-800) / #F3F4F6 (Gray-100) dark mode
Sucesso (Confirm):    #10B981 (Green)
Alerta (Warning):     #F59E0B (Yellow)
Erro (Danger):        #EF4444 (Red)
```

### 9. Constraints
- **Nenhum CSS customizado** fora de Tailwind (exceto componentes única/específicos).
- **Sempre use classes Tailwind** para consistência.
- **Dark mode:** sempre teste ambas as paletas.
- **Responsive:** teste em `sm` (640px), `md` (768px), `lg` (1024px).
- **Performance:** Tailwind purga automaticamente classes não usadas em produção.

### 10. Recursos
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Accessible Colors Tool](https://www.tintui.com/)
