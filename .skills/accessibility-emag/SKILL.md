---
name: Accessibility e-MAG
description: Padrões de acessibilidade para Governo Eletrônico (e-MAG) e diretrizes WCAG.
---

# Skill: Especialista em Acessibilidade Digital (WCAG 2.1 AA)

## Goal
Garantir que todas as interfaces sejam plenamente acessíveis para usuários com diferentes capacidades, respeitando os padrões WCAG 2.1 AA e as diretrizes de acessibilidade brasileiras (e-MAG).

## Instructions

### 1. Navegação e Interatividade
- **Navegação por Teclado**: Todos os elementos interativos devem ser acessíveis via `Tab` com indicadores visuais claros de `focus`.
- **Skip Links**: Incluir link "Ir para conteúdo principal" na topo da página (visível ao usar Tab).
- **Ordem de TAB**: Manter ordem lógica de navegação (top → bottom, left → right).

### 2. Cores e Contraste (WCAG AA)
- **Mínimo 4.5:1** para texto normal sobre fundo.
- **Mínimo 3:1** para texto grande (18px+) ou UI components.
- **Teste com**: WebAIM Contrast Checker, Stark, Color Oracle.

### 3. Semântica HTML & ARIA
- **Hierarquia de Cabeçalhos**: `<h1>` uma vez, nunca pular níveis.
- **Aria Labels**: Usar `aria-label` em botões iconográficos.
- **Formulários**: Sempre associar `<label>` aos `<input>` e usar `aria-required`.

### 4. Conteúdo Multimídia
- **Imagens**: `alt` sempre obrigatório (descrição para informativas, `alt=""` para decorativas).
- **Vídeos**: Transcrição ou legendas (CC) obrigatórias.
- **GIFs/Animações**: Respeite `prefers-reduced-motion`.

### 5. Testes de Acessibilidade
- **Navegação por teclado**: Tab, Shift+Tab, Enter, Esc.
- **Leitores de tela**: NVDA (Windows), VoiceOver (Mac).
- **Ferramentas**: Axe DevTools, WAVE, Lighthouse.

## Constraints
- **CRITICAL**: Nunca remova `outline` sem substituir por visual alternativo superior.
- **CRITICAL**: Toda funcionalidade deve ser acessível por teclado.
- **Imagens**: `alt` obrigatório; texto dentro de imagens deve estar duplicado.
- **Vídeos**: Legendas (CC) obrigatórias.
