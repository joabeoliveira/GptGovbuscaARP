/**
 * Exemplo Simples: Integração com n8n via Webhooks
 * 
 * Suporta:
 * - n8n Cloud (https://app.n8n.cloud/)
 * - Self-Hosted (seu servidor com Docker)
 * - Local Development (Docker local)
 * 
 * Como usar:
 * 1. Instale n8n em qualquer um dos 3 contextos
 * 2. Crie um workflow com webhook trigger
 * 3. Copie a URL do webhook
 * 4. Configure no HTML ou .env
 * 5. Use o código abaixo
 */

// ============================================
// 1. CONFIGURAÇÃO (Suporta todos os 3 tipos)
// ============================================

// Deve ser definido no HTML ou via builder
const N8N_WEBHOOK_URL = window.N8N_WEBHOOK_URL || 
                         'http://localhost:5678/webhook/contact';

// Exemplos de URLs válidas:
// Cloud: https://seu-workspace.n8n.cloud/webhook/contact
// Self-Hosted: https://n8n.seu-dominio.com/webhook/contact
// Local Dev: http://localhost:5678/webhook/contact

// ============================================
// 2. CHAMAR WEBHOOK (Forma Simples)
// ============================================

async function sendToN8n(data) {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    console.log('✅ Enviado para n8n');
    return await response.json();
  } catch (error) {
    console.error('❌ Erro:', error.message);
    throw error;
  }
}

// ============================================
// 3. COM TIMEOUT E RETRY
// ============================================

async function sendToN8nSafe(data, retries = 2) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      console.log('✅ Sucesso na tentativa', attempt);
      return await response.json();

    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        console.warn(`⚠️ Tentativa ${attempt} falhou, retrying...`);
        await new Promise(r => setTimeout(r, 1000 * attempt));
      }
    }
  }

  throw lastError;
}

// ============================================
// 4. INTEGRAÇÃO COM FORMULÁRIO
// ============================================

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      timestamp: new Date().toISOString(),
    };

    try {
      await sendToN8nSafe(data);
      alert('✅ Contato enviado com sucesso!');
      form.reset();
    } catch (error) {
      alert('❌ Erro ao enviar. Tente novamente.');
    }
  });
}

// ============================================
// 5. USAR API DO N8N (COM AUTENTICAÇÃO)
// ============================================

class N8nAPIClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'X-N8N-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  // Listar workflows
  async listWorkflows() {
    return this.request('/workflows');
  }

  // Obter execuções
  async getExecutions(workflowId, limit = 10) {
    return this.request(`/workflows/${workflowId}/executions?limit=${limit}`);
  }
}

// ============================================
// 6. INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();

  // Expor globalmente para debug
  window.n8n = {
    send: sendToN8n,
    sendSafe: sendToN8nSafe,
    api: new N8nAPIClient(
      window.N8N_API_URL || 'https://seu-n8n.com/api/v1',
      window.N8N_API_KEY || ''
    ),
  };

  console.log('n8n Integration loaded. Use window.n8n to debug.');
});

// ============================================
// 7. EXPORTAR
// ============================================

export { sendToN8n, sendToN8nSafe, N8nAPIClient };
