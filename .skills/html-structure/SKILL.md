# Skill: HTML5 & Estrutura Semântica

---
**name:** HTML5 & Semantic Structure  
**description:** Guia de boas práticas para estrutura HTML semântica, acessibilidade e performance.  
---

## 🎯 Objetivo
Garantir código HTML limpo, semântico, acessível e otimizado para SEO e leitores de tela.

## 📋 Instruções Principais

### 1. Semântica HTML5
- Use tags semânticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- **Nunca** use `<div>` como substituto para `<nav>`, `<header>` ou `<main>`.
- Use `<h1>` uma vez por página; hierarquia de títulos: `<h1>` → `<h2>` → `<h3>`.

### 2. Acessibilidade
- Atributo `lang="pt-BR"` na tag `<html>`.
- Labels sempre associados a inputs: `<label for="inputId">`.
- Atributos `alt` descritivos em todas as imagens (ou `alt=""` se decorativa).
- ARIA labels quando necessário: `aria-label`, `aria-labelledby`, `aria-describedby`.
- Contraste de cores: mínimo 4.5:1 para texto normal, 3:1 para texto grande.

### 3. Meta Tags & SEO Básico
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Descrição breve do conteúdo (150-160 caracteres)">
<meta name="og:title" content="Título para redes sociais">
<meta name="og:description" content="Descrição para compartilhamento">
<meta name="og:image" content="URL da imagem">
```

### 4. Estrutura de Página Recomendada
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título da Página</title>
    <meta name="description" content="...">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <nav aria-label="Principal">
            <!-- Navegação principal -->
        </nav>
    </header>
    
    <main>
        <article>
            <h1>Título Principal</h1>
            <!-- Conteúdo -->
        </article>
    </main>
    
    <aside>
        <!-- Sidebar ou conteúdo relacionado -->
    </aside>
    
    <footer>
        <!-- Rodapé -->
    </footer>
    
    <script src="js/main.js"></script>
</body>
</html>
```

### 5. Otimizações de Performance
- **Lazy Loading:** `<img loading="lazy" alt="...">` e `<iframe loading="lazy">`.
- **Defer JavaScript:** `<script defer src="..."></script>`.
- **Minimize HTML:** Remove espaços desnecessários em produção.
- **Picture Element para Imagens Responsivas:**
```html
<picture>
    <source media="(max-width: 600px)" srcset="img-small.jpg">
    <img src="img-large.jpg" alt="Descrição">
</picture>
```

### 6. Constraints
- **Nenhuma** scripting inline em tags (`onclick`, atributos de evento).
- **Nenhum** CSS inline; tudo via `<link>` externo ou `<style>` em `<head>`.
- Valide HTML com [W3C Validator](https://validator.w3.org/).
- Use indentação de 2 espaços; mantenha consonsistência.

### 7. Validação & Boas Práticas
- Sempre forneça `alt` para imagens; use descrições significativas.
- Teste com leitores de tela (NVDA, JAWS, VoiceOver).
- Certifique-se de que toda funcionalidade é acessível por teclado.
- Estrutura clara de cabeçalho → conteúdo principal → conteúdo relacionado → rodapé.
