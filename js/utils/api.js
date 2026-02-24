const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = isLocalhost
  ? `${window.location.origin}/api/`
  : 'https://dadosabertos.compras.gov.br/';
const CNPJ_BASE = isLocalhost
  ? `${window.location.origin}/api/cnpj/`
  : 'https://www.receitaws.com.br/v1/cnpj/';
const CNPJ_BRASIL_API_BASE = isLocalhost
  ? `${window.location.origin}/api/cnpj-br/`
  : 'https://brasilapi.com.br/api/cnpj/v1/';

export function buildUrl(path, params = {}) {
  const normalizedPath = String(path || '').replace(/^\//, '');
  const url = new URL(normalizedPath, API_BASE);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

export async function fetchWithTimeout(url, options = {}, timeout = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(id);
  }
}

export async function fetchArpItems(filters) {
  const url = buildUrl('/modulo-arp/2_consultarARPItem', filters);
  return fetchWithTimeout(url);
}

export async function fetchArpAtas(filters) {
  const url = buildUrl('/modulo-arp/1_consultarARP', filters);
  return fetchWithTimeout(url);
}

export async function fetchUnidadesItem(params) {
  const url = buildUrl('/modulo-arp/3_consultarUnidadesItem', params);
  return fetchWithTimeout(url);
}

export async function fetchCnpjDetails(cnpj) {
  const url = new URL(cnpj, CNPJ_BASE);
  return fetchWithTimeout(url.toString(), {}, 15000);
}

export async function fetchCnpjDetailsBrasilApi(cnpj) {
  const url = new URL(cnpj, CNPJ_BRASIL_API_BASE);
  return fetchWithTimeout(url.toString(), {}, 15000);
}
