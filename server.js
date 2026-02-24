const http = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');

const PORT = process.env.PORT || 3000;
const API_BASE = 'https://dadosabertos.compras.gov.br';
const CNPJ_BASE = 'https://www.receitaws.com.br/v1/cnpj/';
const CNPJ_BRASIL_API_BASE = 'https://brasilapi.com.br/api/cnpj/v1/';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
};

async function handleProxy(req, res) {
  const isCnpj = req.url.startsWith('/api/cnpj/');
  const isBrasilApi = req.url.startsWith('/api/cnpj-br/');
  const proxyBase = isCnpj ? CNPJ_BASE : isBrasilApi ? CNPJ_BRASIL_API_BASE : API_BASE;
  const proxyPath = isCnpj
    ? req.url.replace('/api/cnpj/', '')
    : isBrasilApi
      ? req.url.replace('/api/cnpj-br/', '')
      : req.url.replace('/api/', '');
  const targetUrl = new URL(proxyPath, proxyBase);

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        accept: req.headers.accept || '*/*',
        'user-agent': req.headers['user-agent'] || 'Mozilla/5.0'
      }
    });

    res.writeHead(response.status, {
      'content-type': response.headers.get('content-type') || 'application/json; charset=utf-8',
      'access-control-allow-origin': '*'
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    res.end(buffer);
  } catch (error) {
    res.writeHead(502, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Falha ao acessar a API externa.' }));
  }
}

async function serveStatic(req, res) {
  const urlPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath);

  try {
    const content = await readFile(filePath);
    res.writeHead(200, { 'content-type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Arquivo nao encontrado.');
  }
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/')) {
    await handleProxy(req, res);
    return;
  }

  await serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Servidor local ativo em http://localhost:${PORT}`);
});
