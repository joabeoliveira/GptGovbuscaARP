---
name: Performance Optimization
description: Melhores práticas essenciais de performance web para otimizar Core Web Vitals e tempo de carregamento.
---

# Skill: Especialista em Performance Web

## Goal
Garantir que as aplicações sejam ultra-rápidas, otimizando métricas de desempenho (LCP, FID, CLS), tamanho de arquivo e tempo de carregamento.

## Instructions

### 1. Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s (bom).
- **FID (First Input Delay)**: < 100ms (bom).
- **CLS (Cumulative Layout Shift)**: < 0.1 (bom).
- **Teste com**: Google PageSpeed Insights, Lighthouse, WebPageTest.

### 2. Otimização de Imagens (Impacto Alto)
- **Formatos Modernos**: Use WebP com fallback JPEG/PNG.
- **Lazy Loading**: `loading="lazy"` em imagens abaixo da dobra.
- **Dimensões Apropriadas**: `<picture>` ou srcset para diferentes resoluções.
- **Compressão**: Use TinyPNG, ImageOptim.

### 3. JavaScript: Carregamento & Execução
- **Defer Scripts**: `<script defer src="...">` para scripts não-críticos.
- **Async Scripts**: `<script async>` para analytics, third-party.
- **Code Splitting**: Divida código em chunks e carregue sob demanda.

### 4. CSS: Carregamento & Renderização
- **Inline Critical CSS**: CSS acima da dobra inline em `<style>` no `<head>`.
- **Media Queries**: Separe CSS por dispositivo.
- **Minimize CSS**: Minifique em produção; remova estilos não usados.

### 5. Requisições & Network (Parallel Fetching)
- **Promise.all()**: Inicie múltiplas requisições simultaneamente.
- **Resource Hints**: dns-prefetch, preconnect, prefetch, preload.

### 6. Animações Otimizadas
- **GPU-Accelerated**: Use `transform` e `opacity` (não width/height).
- **Respeite `prefers-reduced-motion`**: Desative para usuários que pedirem.
- **FPS Target**: Mantenha 60 FPS.

### 7. Bundle Size
- **Minificação**: Minifique JS/CSS em produção.
- **Tree-Shaking**: Remova código não usado.
- **Target**: Bundle JS < 100KB por página.

## Constraints
- **CRITICAL**: Nunca bloquear renderização por requisições lentas.
- **Bundle**: Mantenha JS primeiro-carregamento < 100KB.
- **Imagens**: Sempre comprima; use WebP com fallback.
- **Mobile-first**: Teste em redes 4G/3G lentas.
