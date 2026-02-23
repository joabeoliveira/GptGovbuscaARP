# Skill: Gráficos & Animações

---
**name:** Graphics & Animations  
**description:** Guia para escolher e implementar bibliotecas de gráficos e animações com performance e acessibilidade.  
---

## 🎯 Objetivo
Implementar gráficos e animações visuais impressionantes mantendo performance, acessibilidade e compatibilidade entre navegadores.

## 📋 Instruções Principais

### 1. Escolha da Biblioteca por Caso de Uso

#### Chart.js (Gráficos Simples)
✅ **Quando usar**: Gráficos simples (barras, linhas, pizza), dashboards básicos, dados estáticos.  
✅ **Vantagens**: Leve (30KB), fácil de aprender, ótimo suporte.  
❌ **Limitações**: Não ideal para dados muito complexos ou interações avançadas.

```html
<canvas id="myChart"></canvas>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [{
        label: 'Vendas (R$)',
        data: [12000, 19000, 3000, 5000],
        backgroundColor: 'rgba(30, 64, 175, 0.8)',
        borderRadius: 4,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
</script>
```

#### D3.js (Gráficos Complexos & Customizáveis)
✅ **Quando usar**: Visualizações custom, animações complexas, dados em tempo real, árvores & grafos.  
✅ **Vantagens**: Extremamente poderoso e flexível.  
❌ **Limitações**: Curva de aprendizado íngreme, arquivo maior (180KB).

```javascript
// Exemplo simples com D3
const data = [
  { label: 'A', value: 30 },
  { label: 'B', value: 45 },
  { label: 'C', value: 25 }
];

const svg = d3.select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 300);

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * 150)
  .attr('y', d => 300 - d.value * 5)
  .attr('width', 100)
  .attr('height', d => d.value * 5)
  .attr('fill', '#1E40AF');
```

#### SVG Puro (Máximo Controle & Vanilla)
✅ **Quando usar**: Animações customizadas, ícones animados, gráficos minimalistas, projetos vanilla puro  
✅ **Vantagens**: Sem dependências, escalável, animações suaves com CSS, funciona em qualquer projeto  
❌ **Limitações**: Mais código para gráficos complexos

```html
<!-- Gráfico simples com SVG -->
<svg width="200" height="200" viewBox="0 0 200 200">
  <!-- Gráfico de pizza (path) -->
  <circle cx="100" cy="100" r="80" fill="none" stroke="#1E40AF" stroke-width="30" 
          stroke-dasharray="251 314" transform="rotate(-90 100 100)" />
  <circle cx="100" cy="100" r="80" fill="none" stroke="#10B981" stroke-width="30" 
          stroke-dasharray="63 314" stroke-dashoffset="-251" transform="rotate(-90 100 100)" />
</svg>
```

#### Recharts (React-only - Não recomendado para projetos vanilla)
⚠️ **ATENÇÃO**: Requer React, não funciona em projetos vanilla  
✅ **Quando usar**: Apenas se seu projeto já usa React  
❌ **Para projetos vanilla**: Use Chart.js, D3.js ou SVG puro

### 2. Matriz de Decisão

| Complexidade | Recomendação | Biblioteca |
|---|---|---|
| Muito Simples (1-3 gráficos) | SVG + CSS | Nativa |
| Simples (dashboards) | Dinâmico mas direto | Chart.js |
| Moderada (gráficos customizados) | Muita interação | D3.js ou Recharts |
| Complexa (tempo real, big data) | Análise avançada | D3.js + WebGL (Deck.gl) |

---

### 3. Animações Web

#### CSS Animations (Preferido para Performance)

```css
/* Define animação */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Aplica animação */
.card {
  animation: slideIn 0.6s ease-out forwards;
}

/* Atraso em cascata */
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.4s; }
```

#### CSS Transitions (Para mudanças de estado)

```css
.button {
  background-color: #1E40AF;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

#### Animate.css (Biblioteca de Animações Prontas)

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

<!-- Aplicar animação -->
<div class="animate__animated animate__fadeInUp">
  Elemento animado
</div>

<!-- Com JavaScript -->
<script>
  element.classList.add('animate__animated', 'animate__bounce');
</script>
```

#### AOS - Animate On Scroll

```html
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

<div data-aos="fade-up" data-aos-delay="200">
  Anima quando entra na tela
</div>

<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
  AOS.init({
    duration: 800,
    once: true,
  });
</script>
```

#### JavaScript Animations (Para Controle Total)

```javascript
// requestAnimationFrame para animações suaves
export function animateValue(element, startValue, endValue, duration = 1000) {
  let startTime = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress < 1) {
      const currentValue = startValue + (endValue - startValue) * progress;
      element.textContent = Math.round(currentValue);
      requestAnimationFrame(step);
    } else {
      element.textContent = endValue;
    }
  };

  requestAnimationFrame(step);
}

// Uso
animateValue(document.getElementById('counter'), 0, 1000, 2000);
```

### 4. Performance de Animações

#### Otimizações
- ✅ Use `transform` e `opacity` (GPU-acelerado).
- ❌ Evite animar `width`, `height`, `left`, `top` (causam reflow).
- ✅ Use `will-change` com moderação:
  ```css
  .animated-element {
    will-change: transform;
  }
  ```
- ✅ Teste com DevTools: Performance → Rendering (procure por frames vermelhos).

#### Redução de Movimento (Acessibilidade)
```css
/* Respeite preferência do usuário */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
// Verificar preferência via JavaScript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Animar apenas se usuário não desabilitou
  element.classList.add('animate__animated', 'animate__fadeIn');
}
```

### 5. Gráficos Acessíveis

#### Descrição de Gráficos
```html
<!-- Sempre forneça descrição textual -->
<figure>
  <canvas id="chart"></canvas>
  <figcaption>
    Gráfico de vendas por trimestre: Q1 (R$ 12k), Q2 (R$ 19k), Q3 (R$ 3k), Q4 (R$ 5k)
  </figcaption>
</figure>
```

#### ARIA para Gráficos Dinâmicos
```html
<div role="img" aria-label="Gráfico mostrando crescimento de 30% em vendas">
  <canvas id="myChart"></canvas>
</div>
```

#### Tabela Alternativa
```html
<!-- Forneça dados em tabela para leitores de tela -->
<table class="sr-only">
  <thead>
    <tr>
      <th>Período</th>
      <th>Vendas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jan</td>
      <td>R$ 12.000</td>
    </tr>
  </tbody>
</table>
```

### 6. Exemplo Completo: Dashboard Responsivo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard de Vendas</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-50 dark:bg-gray-900">
  <div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Gráfico 1 -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Vendas por Mês</h2>
        <canvas id="salesChart" role="img" aria-label="Gráfico de vendas mensais"></canvas>
      </div>

      <!-- Gráfico 2 -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-lg font-semibold mb-4">Distribuição</h2>
        <canvas id="distributionChart" role="img" aria-label="Gráfico de distribuição por categoria"></canvas>
      </div>
    </div>
  </div>

  <script src="js/charts.js"></script>
</body>
</html>
```

```javascript
// js/charts.js
function initCharts() {
  // Gráfico de linha
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Vendas',
        data: [12000, 19000, 3000, 5000, 8000, 15000],
        borderColor: '#1E40AF',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        tension: 0.4,
      }]
    }
  });

  // Gráfico de pizza
  const distributionCtx = document.getElementById('distributionChart').getContext('2d');
  new Chart(distributionCtx, {
    type: 'doughnut',
    data: {
      labels: ['Categoria A', 'Categoria B', 'Categoria C'],
      datasets: [{
        data: [30, 40, 30],
        backgroundColor: ['#1E40AF', '#10B981', '#EA580C'],
      }]
    }
  });
}

document.addEventListener('DOMContentLoaded', initCharts);
```

### 7. Constraints
- **Mantenha acessibilidade:** forneça descrições textuais de gráficos.
- **Otimize performance:** use `will-change` com moderação, teste FPS.
- **Respeite preferências:** implemente `prefers-reduced-motion`.
- **Responsive:** gráficos devem se adaptar a diferentes tamanhos de tela.
- **Testes:** valide em navegadores moderne e antigos.

### 8. Recursos
- [Chart.js Documentation](https://www.chartjs.org/)
- [D3.js Gallery](https://d3js.org/gallery)
- [Animate.css](https://animate.style/)
- [AOS - Animate On Scroll](https://michalsnik.github.io/aos/)
- [Web Animation Performance](https://web.dev/animations-guide/)
