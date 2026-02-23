# 🚀 HTML/CSS/JavaScript Skills Kit

Kit de ferramentas e padrões para acelerar a construção de projetos Web simples e modernos com **HTML5**, **CSS3**, **JavaScript ES6+** e **Tailwind CSS**.

🎯 **Compatível com**: GitHub Copilot · Cursor · Claude Code · Antigravity · Lovable

---

## 📦 O que está incluído?

Este repositório oferece **skills** (conjuntos de diretrizes e padrões) para:

| Skill | Descrição |
|-------|-----------|
| 🏗️ **HTML Structure** | Semântica, acessibilidade e SEO |
| 🎨 **Tailwind CSS** | Styling responsive, dark mode, componentes |
| ⚙️ **JavaScript Vanilla** | ES6+, modular, validação, performance |
| 📊 **Graphics & Animations** | Chart.js, D3.js, SVG, CSS animations |
| ♿ **Accessibility (WCAG AA)** | Leitores de tela, contraste, navegação por teclado |
| ⚡ **Performance** | Otimizações, Web Vitals, lazy loading |
| 🌐 **SEO Basics** | Meta tags, Open Graph, structured data |
| 🔌 **API REST** | Integração com APIs externas |
| 🤖 **n8n Integration** [OPCIONAL] | Automações, webhooks, workflows + integração com Agentes de IA |

---

## 🚀 Quick Start

### 1. Copiar Skills para seu Projeto

```bash
# Clone este repositório
git clone https://github.com/seu-usuario/Html_JS_CSS.git

# Copie os arquivos essenciais
cp Html_JS_CSS/.cursorrules seu_projeto/
cp -r Html_JS_CSS/.skills seu_projeto/
cp Html_JS_CSS/.claude.md seu_projeto/
mkdir -p seu_projeto/.github
cp Html_JS_CSS/.github/copilot-instructions.md seu_projeto/.github/
```

### 2. Estrutura do Projeto

```
seu_projeto/
├── .cursorrules                    # Regras globais
├── .claude.md                      # Instruções Claude Code
├── .github/
│   └── copilot-instructions.md    # Instruções GitHub Copilot
├── .skills/                        # Skills (consultar conforme necessário)
│   ├── html-structure/
│   ├── tailwind-css/
│   ├── javascript-vanilla/
│   ├── graphics-animations/
│   ├── accessibility-emag/
│   └── performance-optimization/
├── index.html
├── css/style.css
├── js/main.js
└── tailwind.config.js
```

---

## 💡 Como Usar em Cada Editor

### GitHub Copilot
1. Copie `.github/copilot-instructions.md` para `.github/` em seu repo
2. Copilot lerá automaticamente  
3. Peça: *"Implement a responsive header with dark mode"*

### Cursor
1. Copie `.cursorrules` para a **raiz** do projeto
2. Cursor aplica as regras automaticamente
3. Use: `Cmd+Shift+L` (Mac) ou `Ctrl+Shift+L` (Windows) para chat

### Claude Code
1. Copie `.claude.md` para a **raiz** do projeto
2. Claude Code lerá as instruções
3. Descreva: *"Create an accessibility-compliant form"*

### Antigravity / Lovable
1. Copie `.cursorrules` (ambas usam o mesmo formato)
2. Disponível automaticamente no contexto
3. Use prompts em português

---

## 🎯 Stack Tecnológico

- **HTML5**: Semântica completa, SEO-friendly
- **CSS3 + Tailwind**: Mobile-first, dark mode, responsivo
- **JavaScript ES6+**: Vanilla (sem frameworks), modular
- **Gráficos**: Chart.js, D3.js, ou SVG puro (sua escolha!)

---

## ✨ Exemplos Rápidos

### HTML Semântico
```html
<header>
  <nav aria-label="Principal">
    <a href="/">Home</a>
  </nav>
</header>

<main id="main">
  <h1>Título</h1>
  <p>Conteúdo...</p>
</main>

<footer>© 2024</footer>
```

### Tailwind + Dark Mode
```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg 
                 focus:ring-2 focus:ring-blue-500">
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
  if (!isValidEmail(form.email.value)) {
    console.error('Email inválido');
    return;
  }
  // Enviar...
});
```

---

## 🤖 n8n Integration & Webhooks (Opcional)

Se seu projeto necessita de **automações** via webhooks:

```bash
# Copiar skill opcional
cp -r Html_JS_CSS/.skills/n8n-integration seu_projeto/.skills/
```

### Uso Rápido

1. **Instale n8n**: Docker ou https://app.n8n.cloud/
2. **Crie workflow** na interface n8n com webhook trigger
3. **Copie a URL do webhook**
4. **Chame do JavaScript**:

```javascript
const N8N_WEBHOOK_URL = 'https://seu-n8n.com/webhook/contact';

document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    }),
  });

  if (response.ok) {
    alert('✅ Enviado para automação!');
  }
});
```

### Exemplos de Workflows

- **Email automático** ao submeter formulário
- **Google Sheets** como banco de dados
- **Notificações Slack/Discord** em tempo real
- **APIs terceiras** (Stripe, HubSpot, etc)

📚 **Documentação**: `.skills/n8n-integration/SKILL.md`

---

## 🔍 Documentação Completa

Consulte cada skill para documentação profunda:

- **`.skills/html-structure/SKILL.md`** → Semântica, SEO, meta tags
- **`.skills/tailwind-css/SKILL.md`** → Responsive, dark mode, componentes
- **`.skills/javascript-vanilla/SKILL.md`** → Módulos, validação, performance
- **`.skills/graphics-animations/SKILL.md`** → Gráficos (Chart.js, D3.js, SVG)
- **`.skills/accessibility-emag/SKILL.md`** → WCAG AA, ARIA, teclado
- **`.skills/performance-optimization/SKILL.md`** → Web Vitals, imagens, bundles

---

## ✅ Checklist Antes de Deploy

```
HTML/Acessibilidade:
  ☐ HTML semântico (<header>, <nav>, <main>, <footer>)?
  ☐ Atributos alt em todas as imagens?
  ☐ Labels associados a inputs?
  ☐ Navegação por teclado funcional?
  ☐ Contraste >= 4.5:1?

CSS/Styling:
  ☐ Mobile-first (sm:, md:, lg: breakpoints)?
  ☐ Dark mode testado?
  ☐ Tailwind CSS utilizado (sem inline)?

JavaScript:
  ☐ Modular (import/export)?
  ☐ Entrada validada?
  ☐ Erros tratados?

Performance:
  ☐ Imagens lazy loaded + otimizadas?
  ☐ Scripts defer/async?
  ☐ Web Vitals OK (LCP < 2.5s)?
```

---

## 🤝 Contribuindo

Este é um projeto vivo! Encontrou algo melhorável?

- Abra uma [Issue](https://github.com/seu-usuario/Html_JS_CSS/issues)
- Envie um [Pull Request](https://github.com/seu-usuario/Html_JS_CSS/pulls)
- Sugira novas skills

---

## 📚 Recursos Úteis

- [MDN Web Docs](https://developer.mozilla.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Web Accessibility (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [Web Vitals Guide](https://web.dev/vitals)

---

## 📄 Licença

MIT © 2024

---

**Última atualização**: 23 de fevereiro de 2026

✨ **Feito com ❤️ para Desenvolvedores Web**
