# GptGov Busca ARP

Aplicação front-end simples para buscar Atas de Registro de Preço (ARP) por CATMAT usando o módulo ARP do Portal de Dados Abertos (Compras.gov.br). Fornece filtros, paginação e consultas complementares (saldo de adesões e detalhes de fornecedores).

## Conteúdo

- `index.html` — interface principal
- `js/main.js` — lógica do cliente (validação, handlers, renderização)
- `js/utils/api.js` — construção de URLs e chamadas à API (detecta deploys estáticos)
- `js/components/results.js` — renderização das linhas de resultado
- `server.js` — proxy simples em Node (opcional) para contornar CORS/usar em ambientes que não permitam chamadas diretas

## Deploy estático (GitHub Pages, Netlify, Vercel)

1. Faça push do repositório para GitHub.
2. Ative GitHub Pages na branch `main` (ou publique a pasta `/docs`).

Observação: o client tenta detectar hosts estáticos e, nesses casos, usa as URLs públicas da API (`dadosabertos.compras.gov.br`) diretamente. Se a API bloquear CORS, use o `server.js` como proxy (veja abaixo) ou um serverless function.

## Deploy com proxy Node (quando necessário)

Se o provedor da API bloquear CORS ou você preferir um proxy, rode o servidor Node:

```bash
# em um host que permita Node.js
node server.js
# abrir http://localhost:3000
```

O `server.js` encaminha requisições iniciadas por `/api/` para as APIs externas e serve os arquivos estáticos. É útil para ambientes de teste/produção que suportam Node.

## Uso

1. Abra a aplicação (local ou deploy).  
2. Preencha `CATMAT` (apenas números, 3–10 dígitos) e selecione intervalo de datas.  
3. Clique em `Consultar ARPs`.  

Erros e status aparecem no painel lateral; se nada acontecer, verifique o Console do navegador (F12) e a aba Network.

## Configurações opcionais

- Webhook n8n: preencha a URL em `n8nWebhook` e ative `n8nEnabled` para enviar um resumo da consulta.

## Problemas comuns e solução rápida

- Botão não responde: confirme se `js/main.js` carregou (Network).  
- Validação: `CATMAT` deve ser apenas números (3–10 dígitos).  
- Erro de API / CORS: use `server.js` como proxy ou configure um serverless proxy.

## Contribuição

Abra uma issue ou envie um pull request com correções e melhorias.

---

Última atualização: 24 de março de 2026
