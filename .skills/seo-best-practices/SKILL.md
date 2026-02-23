---
name: SEO Best Practices
description: Diretrizes essenciais para otimização de mecanismos de busca em qualquer site HTML.
---

# Skill: SEO Best Practices

## Goal
Garantir que páginas e conteúdos sejam perfeitamente indexáveis, relevantes e otimizados para mecanismos de busca, maximizando visibilidade orgânica.

## Instructions

### 1. Metadados e Cabeçalhos
- **Title tag**: Único por página (50-60 caracteres), com palavra-chave principal
- **Meta description**: 150-160 caracteres, chamativo e claro
- **Meta viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Meta charset**: `<meta charset="UTF-8">`
- **Open Graph**: Tags OG para compartilhamento em redes/WhatsApp

```html
<head>
  <title>Título Único - Palavra-Chave</title>
  <meta name="description" content="Descrição breve e atrativa...">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="UTF-8">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Título">
  <meta property="og:description" content="Descrição">
  <meta property="og:image" content="https://seu-site.com/imagem.jpg">
  <meta property="og:url" content="https://seu-site.com/pagina">
  <meta property="og:type" content="website">
</head>
```

### 2. Estrutura Semântica (HTML5)
- **Um único `<h1>`** por página, no início do conteúdo principal
- **Hierarquia coreta**: `<h1>` → `<h2>` → `<h3>` (não pule)
- **Elementos semânticos**: `<main>`, `<article>`, `<section>`, `<footer>`, `<nav>`

```html
<header>
  <nav aria-label="Principal">...</nav>
</header>

<main id="main">
  <article>
    <h1>Título Principal</h1>
    <section>
      <h2>Subtítulo</h2>
      <p>Conteúdo...</p>
    </section>
  </article>
</main>

<footer>© 2024</footer>
```

### 3. URLs Amigáveis
- ✅ `/blog/como-otimizar-seo`
- ❌ `/blog?id=123&cat=5`
- ✅ Usando hífens: `palavra-chave-alvo`
- ❌ Underscores: `palavra_chave`

### 4. Imagens
```html
<!-- Alt obrigatório e descritivo -->
<img src="produto.jpg" alt="Smartphone Samsung Galaxy com tela 6.7 polegadas">

<!-- Lazy loading -->
<img src="imagem.jpg" alt="..." loading="lazy">
```

### 5. Links Internos
```html
<!-- Bom: texto descritivo -->
<a href="/blog/seo-basico">Guia completo de SEO</a>

<!-- Ruim: genérico -->
<a href="/blog/123">Clique aqui</a>
```

### 6. Structured Data (Schema.org)
Adicione JSON-LD para ajudar motores de busca:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "NewsArticle",
  "headline": "Título do Artigo",
  "description": "Descrição breve",
  "image": "https://seu-site.com/imagem.jpg",
  "datePublished": "2024-02-23",
  "author": {
    "@type": "Person",
    "name": "Seu Nome"
  }
}
</script>
```

### 7. Performance (Impacto Alto em SEO)
- LCP < 2.5s
- CLS < 0.1
- Imagens otimizadas
- CSS/JavaScript minimizados

**Test com**: Google PageSpeed Insights, Lighthouse

### 8. Mobile-First
- ✅ Responsive design
- ✅ Toque otimizado (botões > 44px)
- ✅ Viewport correto
- ✅ Textos legíveis sem zoom

### 9. Robots e Sitemap
```
# robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://seu-site.com/sitemap.xml
```

```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seu-site.com/</loc>
    <lastmod>2024-02-23</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://seu-site.com/blog/artigo</loc>
    <lastmod>2024-02-23</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 10. Canonical Links
```html
<!-- Evitar duplicatas -->
<link rel="canonical" href="https://seu-site.com/pagina-principal">
```

---

## Checklist SEO

- ✅ Meta tags completas (title, description, viewport, charset)
- ✅ H1 único e relevante
- ✅ Hierarquia correta (h2, h3...)
- ✅ Imagens com alt descritivo
- ✅ Links internos com texto âncora
- ✅ URL amigável (com hífens)
- ✅ Responsive design
- ✅ Estrutura semântica HTML
- ✅ Sitemap + robots.txt
- ✅ Schema.org markups
- ✅ Performance otimizada
- ✅ Sem quebras de link (404)

---

## Boas Práticas

- ✅ Use ferramentas: Google Search Console, Lighthouse, Screaming Frog
- ✅ Monitore Core Web Vitals
- ✅ Atualize conteúdo regularmente
- ✅ Link building com blogs relevantes
- ✅ Teste em mobile primeiro
- ✅ Sem keyword stuffing
- ✅ Conteúdo original e útil

---

## Recursos

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://search.google.com/)
- [Open Graph Protocol](https://ogp.me/)
- **Alt Text**: Todas as imagens (exceto as estritamente decorativas) devem possuir o atributo `alt` descritivo.

### 3. URLs e Indexação
- **Caminhos Canônicos**: Definir `canonical` URLs para evitar problemas de conteúdo duplicado.
- **Sitemap & Robots**: Configurar a geração automática de `sitemap.xml` e um arquivo `robots.txt` bem estruturado usando as funções nativas do Next.js.
- **JSON-LD**: Implementar dados estruturados (Schema.org) em formato JSON-LD para produtos, artigos ou organizações.

### 4. Performance & Core Web Vitals (Fator de Ranking)
- **LCP (Largest Contentful Paint)**: Priorizar o carregamento de imagens principais.
- **CLS (Cumulative Layout Shift)**: Reservar espaço para imagens e anúncios para evitar saltos de layout.
- **Mobile First**: Garantir que a versão mobile seja a prioridade absoluta de design e performance.

## Constraints
- **CRITICAL**: Nunca deixar páginas de produção sem as tags de título e descrição básicas.
- **Links**: Sempre usar o componente `<Link>` do `next/link` para garantir o pre-fetching e a navegação SPA amigável ao Googlebot.
- **Client-Side**: Evitar depender exclusivamente de renderização no cliente (Client-side rendering) para conteúdos críticos que precisam ser indexados.
