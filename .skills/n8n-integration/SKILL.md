---
name: n8n Integration & Webhooks
description: Integração simples de n8n em projetos HTML/CSS/JS usando webhooks e API básica.
---

# Skill: n8n Integration (Opcional)

## Goal
Usar n8n como plataforma de automação externa integrada ao seu projeto web. Chamar workflows criados no n8n diretamente do frontend/backend via webhooks ou API.

## ⚠️ Importante
Esta é uma **skill OPCIONAL**. Use apenas se seu projeto precisar de automações.

---

## Instructions

### 1. O que é n8n?

**n8n** = plataforma de automação que conecta APIs e cria workflows sem código.

No seu projeto, você **não cria** workflows em código. Você:
1. Instala n8n (ou usa n8n Cloud)
2. Cria workflows na interface n8n
3. Liga webhooks do n8n ao seu projeto

**Alternativas**: Zapier, Make, IFTTT.

---

### 2. Setup Inicial do n8n

#### Opção A: Docker Local (Desenvolvimento)

```bash
docker run -it --rm \
  -p 5678:5678 \
  -e DB="sqlite" \
  n8nio/n8n

# Acesso: http://localhost:5678
```

#### Opção B: n8n Cloud (SaaS)

```
Acesse: https://app.n8n.cloud/
Crie conta → Copie URL da sua instância
Exemplo: https://seu-workspace.n8n.cloud/
```

#### Opção C: Self-Hosted (Seu Servidor)

**Pré-requisitos**:
- Servidor Linux (AWS, DigitalOcean, Linode, etc)
- Docker instalado
- Domínio (opcional, mas recomendado)

**Deploy com Docker Compose**:

```bash
# Criar pasta de trabalho
mkdir n8n && cd n8n

# Criar docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    environment:
      DB: postgres
      DB_POSTGRESDB_HOST: postgres
      DB_POSTGRESDB_PORT: 5432
      DB_POSTGRESDB_DATABASE: n8n
      DB_POSTGRESDB_USER: n8n
      DB_POSTGRESDB_PASSWORD: senhaforte
      NODE_ENV: production
    depends_on:
      - postgres
    volumes:
      - n8n_data:/home/node/.n8n
    networks:
      - n8n_network

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: senhaforte
      POSTGRES_DB: n8n
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - n8n_network

volumes:
  n8n_data:
  postgres_data:

networks:
  n8n_network:
    driver: bridge
EOF

# Iniciar
docker-compose up -d

# Acessar: http://seu-servidor-ip:5678
```

**Com Nginx (HTTPS)**:

```bash
# docker-compose.yml com Nginx
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    environment:
      DB: postgres
      DB_POSTGRESDB_HOST: postgres
      DB_POSTGRESDB_DATABASE: n8n
      DB_POSTGRESDB_USER: n8n
      DB_POSTGRESDB_PASSWORD: senhaforte
      NODE_ENV: production
      WEBHOOK_URL: 'https://seu-dominio.com/'
    depends_on:
      - postgres
    volumes:
      - n8n_data:/home/node/.n8n
    networks:
      - n8n_network

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: n8n
      POSTGRES_PASSWORD: senhaforte
      POSTGRES_DB: n8n
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - n8n_network

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - n8n
    networks:
      - n8n_network

volumes:
  n8n_data:
  postgres_data:

networks:
  n8n_network:
    driver: bridge
EOF
```

**Obter Chave de API**:

No seu n8n self-hosted:
1. Acesse a interface (http://seu-dominio.com)
2. **Settings** → **API Keys**
3. **Create API Key**
4. Copie e guarde em `.env`

---

### 3. Criar Workflow no n8n

**Exemplo**: Workflow que recebe contato e envia email

1. **Novo workflow** → Nome: `Contact Form`
2. **Adicionar nó**: `Webhook`
   - Método: `POST`
   - Caminho: `/contact`
   - Salve e copie a URL completa
   
3. **Próximo nó**: `Send Email`
   - Para: `{{ $json.email }}`
   - Assunto: `Novo contato`
   - Corpo: `{{ $json.message }}`

4. **Deploy** (botão verde)

---

### 4. Chamar Webhook do Frontend

```javascript
// js/n8n-webhook.js

const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/contact';

// Chamar webhook quando formulário é enviado
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('✅ Dados enviados para n8n!');
      alert('Contato enviado com sucesso!');
      document.getElementById('contactForm').reset();
    } else {
      throw new Error(`Erro: ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao chamar n8n:', error);
    alert('Erro ao enviar contato. Tente novamente.');
  }
});
```

---

### 5. Configurar URL do Webhook

Defina a URL conforme seu setup:

```javascript
// js/n8n-webhook.js

// Opção 1: Hardcode (apenas dev)
// const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/contact';

// Opção 2: Injetar no HTML (recomendado)
const N8N_WEBHOOK_URL = window.N8N_WEBHOOK_URL;

// Opção 3: Variável global em script anterior
// (definido em <script> inline ou arquivo separado)
```

```html
<!-- No seu index.html -->
<script>
  // Configure conforme seu ambiente
  window.N8N_WEBHOOK_URL = 'https://n8n.seu-dominio.com/webhook/contact';
  // ou 'https://seu-workspace.n8n.cloud/webhook/contact'
  // ou 'http://localhost:5678/webhook/contact'
</script>

<!-- Depois carregue seu app -->
<script src="js/n8n-webhook.js" defer></script>
```

**Se usar builder (Vite, Webpack, etc)**:

```javascript
// Adapt para seu builder
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;  // Webpack
const N8N_WEBHOOK_URL = import.meta.env.N8N_WEBHOOK_URL;  // Vite
```

---

### 6. Usar API do n8n com Chave

Se precisar acessar workflows ou dados via API:

#### 6.1 Gerar Chave no n8n

No n8n:
1. **Settings** → **API Keys**
2. **Create API Key**
3. Copie a chave

#### 6.2 Chamar API

```javascript
// js/n8n-api.js

const N8N_BASE_URL = 'https://seu-n8n.com/api/v1';
const N8N_API_KEY = 'sk_xxx_yyy_zzz';

/**
 * Listar workflows
 */
async function listWorkflows() {
  const response = await fetch(`${N8N_BASE_URL}/workflows`, {
    headers: {
      'X-N8N-API-KEY': N8N_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Obter execuções de um workflow
 */
async function getExecutions(workflowId, limit = 10) {
  const response = await fetch(
    `${N8N_BASE_URL}/workflows/${workflowId}/executions?limit=${limit}`,
    {
      headers: {
        'X-N8N-API-KEY': N8N_API_KEY,
      },
    }
  );

  return response.json();
}

// Uso
const workflows = await listWorkflows();
console.log('Workflows:', workflows);
```

---

### 7. Casos de Uso Comuns

#### 7.1 Email Automático

```javascript
// Frontend
const response = await fetch('https://seu-n8n.com/webhook/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'usuario@example.com',
    assunto: 'Confirmação de cadastro',
  }),
});
```

**No n8n**: Webhook → Send Email → Deploy

#### 7.2 Salvar em Google Sheets

```javascript
const response = await fetch('https://seu-n8n.com/webhook/save-sheet', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'João',
    email: 'joao@example.com',
    valor: 1500,
  }),
});
```

**No n8n**: Webhook → Google Sheets (Insert) → Deploy

#### 7.3 Notificação em Slack

```javascript
const response = await fetch('https://seu-n8n.com/webhook/slack-notify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    channel: '#vendas',
    mensagem: 'Novo pedido recebido!',
  }),
});
```

**No n8n**: Webhook → Slack (Send Message) → Deploy

---

### 8. Tratamento de Erros e Timeout

```javascript
async function callN8nWebhook(url, data) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Timeout: n8n não respondeu');
    } else {
      console.error('Erro:', error.message);
    }
    throw error;
  }
}
```

---

### 9. CORS no n8n Self-Hosted

Se seu frontend está em outro domínio e n8n é self-hosted, configure CORS:

```bash
# No container n8n, adicione variável de environment
-e N8N_BACKEND_CORS_ORIGIN="https://seu-dominio.com"

# Ou se não souber domínio em dev
-e N8N_BACKEND_CORS_ORIGIN="*"  # ⚠️ Apenas desenvolvimento!
```

**Exemplo docker-compose.yml com CORS**:

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    environment:
      # ... outras configs
      N8N_BACKEND_CORS_ORIGIN: 'https://seu-dominio.com'
      # Ou múltiplos domínios:
      # N8N_BACKEND_CORS_ORIGIN: 'https://seu-dominio.com,https://app.seu-dominio.com'
```

---

### 10. Deploy n8n em Produção

**Se você já tem n8n rodando**:
- Apenas use a URL e chave de API no seu `.env`
- Nada mais precisa ser feito!

**Se precisa deployar**:

#### Self-Hosted (Seu Servidor)

```bash
# 1. SSH no servidor
ssh user@seu-servidor.com

# 2. Clone ou use docker-compose
mkdir n8n && cd n8n
# ... (veja seção 2.C acima)

# 3. Inicie
docker-compose up -d

# 4. Verifique logs
docker-compose logs -f n8n
```

#### n8n Cloud

```
https://app.n8n.cloud/ → Criar workspace → 
Use URL gerada no seu .env
```

---

## Troubleshooting

### Erro CORS (Self-Hosted)

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solução**: Adicione `N8N_BACKEND_CORS_ORIGIN` no docker-compose:

```yaml
environment:
  N8N_BACKEND_CORS_ORIGIN: 'https://seu-dominio.com'
```

Reinicie: `docker-compose down && docker-compose up -d`

---

### Webhook retorna 404

- Verifique o caminho exato no n8n (deve estar escrito na URL do webhook)
- Confirme que o workflow está **deployed** (botão verde)
- Teste com Postman antes de integrar no frontend

---

### n8n Cloud: Autenticação

Se usar n8n Cloud com senhas de usuário:

```javascript
// Você pode precisar passar credenciais
const response = await fetch(N8N_WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // n8n Cloud webhooks geralmente NÃO precisam de auth
  },
  body: JSON.stringify(data),
});
```

---

### Self-Hosted: Certificado SSL

Para HTTPS, use Let's Encrypt com Certbot:

```bash
docker run --rm -it \
  -v /etc/letsencrypt:/etc/letsencrypt \
  -v /var/lib/letsencrypt:/var/lib/letsencrypt \
  -p 80:80 \
  certbot/certbot certonly -d n8n.seu-dominio.com
```

Depois configure seu Nginx com os certificados.

---

## Constraints

- **CRITICAL**: Nunca exponha chaves de API no código frontend
- **CRITICAL**: Use `.env` para URLs e chaves
- **CRITICAL**: Implemente timeout em fetch() (5-10s)
- **CRITICAL**: Valide dados antes de enviar
- **CRITICAL**: Configure CORS corretamente em self-hosted

---

## Boas Práticas

- ✅ Use URLs de environment variables
- ✅ Teste webhooks com Postman antes de integrar
- ✅ Adicione timeout e tratamento de erro
- ✅ Log de chamadas para debug
- ✅ Documente cada webhook em comentários
- ✅ Self-hosted: Configure backup automático
- ✅ Self-hosted: Configure monitoring/alertas

---

## Recursos

- [n8n Documentação](https://docs.n8n.io/)
- [n8n Webhooks](https://docs.n8n.io/nodes/n8n-nodes-core.webhook/)
- [n8n API](https://docs.n8n.io/api/)
- [n8n Cloud](https://app.n8n.cloud/)
- [n8n Docker Setup](https://docs.n8n.io/hosting/installation/docker/)
- [n8n Self-Hosting](https://docs.n8n.io/hosting/)
