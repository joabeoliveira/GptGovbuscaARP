import { fetchArpAtas, fetchArpItems, fetchCnpjDetails, fetchCnpjDetailsBrasilApi, fetchUnidadesItem } from './utils/api.js';
import { addDays, isValidCatmat, isValidDateRange, toIsoDate } from './utils/validation.js';
import {
  renderRows,
  renderEmptyRow,
  setSaldoError,
  setSaldoLoading,
  setSaldoValue
} from './components/results.js';

const form = document.getElementById('searchForm');
const catmatInput = document.getElementById('catmat');
const dateMinInput = document.getElementById('dateMin');
const dateMaxInput = document.getElementById('dateMax');
const pageSizeSelect = document.getElementById('pageSize');
const orgaoInput = document.getElementById('orgao');
const numeroAtaInput = document.getElementById('numeroAta');
const modalidadeInput = document.getElementById('modalidade');
const tipoItemInput = document.getElementById('tipoItem');
const submitButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetButton');
const resultsBody = document.getElementById('resultsBody');
const statusText = document.getElementById('statusText');
const errorBox = document.getElementById('errorBox');
const totalRegistros = document.getElementById('totalRegistros');
const totalPaginas = document.getElementById('totalPaginas');
const paginationInfo = document.getElementById('paginationInfo');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const darkModeToggle = document.getElementById('darkModeToggle');
const n8nWebhookInput = document.getElementById('n8nWebhook');
const n8nEnabled = document.getElementById('n8nEnabled');
const onlyPositive = document.getElementById('onlyPositive');
const detailsModal = document.getElementById('detailsModal');
const detailsContent = document.getElementById('detailsContent');
const closeModal = document.getElementById('closeModal');
const supplierModal = document.getElementById('supplierModal');
const supplierContent = document.getElementById('supplierContent');
const closeSupplier = document.getElementById('closeSupplier');

const state = {
  page: 1,
  totalPages: 0,
  totalResults: 0,
  lastFilters: null
};

function setStatus(message) {
  statusText.textContent = message;
}

function setError(message) {
  if (!message) {
    errorBox.textContent = '';
    errorBox.classList.add('hidden');
    return;
  }
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? 'Consultando...' : 'Consultar ARPs';
}

function updatePagination() {
  paginationInfo.textContent = `Pagina ${state.page} de ${state.totalPages}`;
  prevPage.disabled = state.page <= 1;
  nextPage.disabled = state.page >= state.totalPages;
}

function buildFilters(pageOverride) {
  return {
    pagina: pageOverride ?? state.page,
    tamanhoPagina: pageSizeSelect.value,
    codigoItem: catmatInput.value.trim(),
    dataVigenciaInicialMin: dateMinInput.value,
    dataVigenciaInicialMax: dateMaxInput.value,
    codigoUnidadeGerenciadora: orgaoInput.value.trim(),
    numeroAtaRegistroPreco: numeroAtaInput.value.trim(),
    codigoModalidadeCompra: modalidadeInput.value.trim(),
    tipoItem: tipoItemInput.value.trim()
  };
}

function resetResults() {
  totalRegistros.textContent = '0';
  totalPaginas.textContent = '0';
  paginationInfo.textContent = 'Pagina 0 de 0';
  renderEmptyRow(resultsBody);
}

async function triggerN8nWebhook(payload) {
  const webhookUrl = n8nWebhookInput.value.trim();
  if (!n8nEnabled.checked || !webhookUrl) {
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    setError('Falha ao enviar webhook para n8n.');
  }
}

async function runSearch(page = 1) {
  setError('');

  const catmat = catmatInput.value.trim();
  if (!isValidCatmat(catmat)) {
    setError('Informe um CATMAT valido (apenas numeros).');
    return;
  }

  if (!isValidDateRange(dateMinInput.value, dateMaxInput.value)) {
    setError('Informe um intervalo de vigencia valido.');
    return;
  }

  setLoading(true);
  setStatus('Consultando API...');

  try {
    const filters = buildFilters(page);
    state.lastFilters = { ...filters };
    state.page = page;

    const response = await fetchArpItems(filters);
    let results = Array.isArray(response.resultado) ? response.resultado : [];

    state.totalPages = response.totalPaginas ?? 0;
    state.totalResults = response.totalRegistros ?? 0;

    totalRegistros.textContent = String(state.totalResults);
    totalPaginas.textContent = String(state.totalPages);
    updatePagination();

    if (results.length) {
      if (onlyPositive.checked) {
        setStatus('Aplicando filtro de adesao positiva...');
        results = await filterByMaxAdesao(results);
      }

      renderRows(results, resultsBody);
      setStatus(`Encontrados ${state.totalResults} registros no total.`);
    } else {
      renderEmptyRow(resultsBody);
      setStatus('Nenhum registro encontrado para os filtros informados.');
    }

    await triggerN8nWebhook({
      tipo: 'consulta-arp',
      filtros: filters,
      totalRegistros: state.totalResults,
      amostra: results.slice(0, 5)
    });
  } catch (error) {
    setError('Erro ao consultar a API. Tente novamente em alguns segundos.');
    setStatus('Falha na consulta.');
  } finally {
    setLoading(false);
  }
}

function openModal() {
  detailsModal.classList.remove('hidden');
  detailsModal.classList.add('flex');
}

function closeDetailsModal() {
  detailsModal.classList.add('hidden');
  detailsModal.classList.remove('flex');
}

function openSupplierModal() {
  supplierModal.classList.remove('hidden');
  supplierModal.classList.add('flex');
}

function closeSupplierModal() {
  supplierModal.classList.add('hidden');
  supplierModal.classList.remove('flex');
}

function normalizeCnpj(value) {
  return String(value || '').replace(/\D/g, '');
}

function createInfoCard(title, value) {
  const card = document.createElement('div');
  card.className = 'rounded-2xl border border-slate-200/80 bg-white p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300';

  const label = document.createElement('p');
  label.className = 'text-xs uppercase tracking-[0.2em] text-slate-500';
  label.textContent = title;

  const content = document.createElement('p');
  content.className = 'mt-2 text-base font-semibold text-ink dark:text-white';
  content.textContent = value || 'Nao informado';

  card.appendChild(label);
  card.appendChild(content);
  return card;
}

function renderSupplierDetails(data, cnpj, nomeFornecedor) {
  supplierContent.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-900/60';

  const label = document.createElement('p');
  label.className = 'text-xs uppercase tracking-[0.2em] text-slate-500';
  label.textContent = 'Identificacao';

  const title = document.createElement('p');
  title.className = 'mt-2 text-base font-semibold text-ink dark:text-white';
  title.textContent = nomeFornecedor || data.razaoSocial || data.nome || data.razao_social || data.fantasia || data.nome_fantasia || 'Fornecedor';

  const subtitle = document.createElement('p');
  subtitle.className = 'mt-1 text-sm text-slate-500';
  subtitle.textContent = `CNPJ: ${cnpj}`;

  header.appendChild(label);
  header.appendChild(title);
  header.appendChild(subtitle);

  const grid = document.createElement('div');
  grid.className = 'grid gap-4 md:grid-cols-2';
  grid.appendChild(createInfoCard('Situacao', data.situacao || data.descricao_situacao_cadastral));
  grid.appendChild(createInfoCard('Abertura', data.abertura || data.data_inicio_atividade));
  grid.appendChild(createInfoCard('Telefone', data.telefone || data.ddd_telefone_1 || data.ddd_telefone_2));
  grid.appendChild(createInfoCard('Email', data.email));

  const address = document.createElement('div');
  address.className = 'rounded-2xl border border-slate-200/80 bg-white p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300';
  const addressLabel = document.createElement('p');
  addressLabel.className = 'text-xs uppercase tracking-[0.2em] text-slate-500';
  addressLabel.textContent = 'Endereco';
  const addressText = document.createElement('p');
  addressText.className = 'mt-2';
  const addressParts = [
    data.logradouro || data.descricao_tipo_de_logradouro,
    data.numero,
    data.complemento,
    data.bairro,
    data.municipio,
    data.uf,
    data.cep
  ].filter(Boolean);
  addressText.textContent = addressParts.length ? addressParts.join(' - ') : 'Nao informado';
  address.appendChild(addressLabel);
  address.appendChild(addressText);

  supplierContent.appendChild(header);
  supplierContent.appendChild(grid);
  supplierContent.appendChild(address);
}

async function handleDetailsClick(button) {
  const numeroAta = button.dataset.ata;
  const unidadeGerenciadora = button.dataset.ug;

  if (!numeroAta || !unidadeGerenciadora) {
    return;
  }

  detailsContent.innerHTML = '<p>Carregando detalhes...</p>';
  openModal();

  try {
    const response = await fetchArpAtas({
      pagina: 1,
      tamanhoPagina: 10,
      codigoUnidadeGerenciadora: unidadeGerenciadora,
      numeroAtaRegistroPreco: numeroAta,
      dataVigenciaInicialMin: dateMinInput.value,
      dataVigenciaInicialMax: dateMaxInput.value
    });

    const resultado = Array.isArray(response.resultado) ? response.resultado : [];
    const ata = resultado.find((entry) => entry.numeroAtaRegistroPreco === numeroAta) || resultado[0];

    if (!ata) {
      detailsContent.innerHTML = '<p>Nenhum detalhe encontrado para esta ata.</p>';
      return;
    }

    const linkAta = ata.linkAtaPNCP || ata.linkAtaPncp || '';
    const linkCompra = ata.linkCompraPNCP || ata.linkCompraPncp || '';

    detailsContent.innerHTML = `
      <div class="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-900/60">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Ata</p>
        <p class="mt-2 text-base font-semibold text-ink dark:text-white">${ata.numeroAtaRegistroPreco}</p>
        <p class="mt-1 text-sm text-slate-500">${ata.nomeUnidadeGerenciadora || ''}</p>
      </div>
      <div class="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-slate-950">
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Links PNCP</p>
        <div class="mt-3 space-y-2">
          ${linkAta ? `<a class="block rounded-lg border border-ocean/20 px-4 py-2 text-ocean hover:border-ocean hover:bg-ocean/5" href="${linkAta}" target="_blank" rel="noreferrer">Abrir Ata no PNCP</a>` : '<p>Nenhum link de ata informado.</p>'}
          ${linkCompra ? `<a class="block rounded-lg border border-ocean/20 px-4 py-2 text-ocean hover:border-ocean hover:bg-ocean/5" href="${linkCompra}" target="_blank" rel="noreferrer">Abrir Compra no PNCP</a>` : '<p>Nenhum link de compra informado.</p>'}
        </div>
      </div>
      <div class="rounded-2xl border border-slate-200/80 bg-white p-4 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
        <p><span class="font-semibold">Objeto:</span> ${ata.objeto || 'Nao informado'}</p>
        <p class="mt-2"><span class="font-semibold">Vigencia:</span> ${ata.dataVigenciaInicial || '-'} ate ${ata.dataVigenciaFinal || '-'}</p>
        <p class="mt-2"><span class="font-semibold">Modalidade:</span> ${ata.nomeModalidadeCompra || '-'}</p>
      </div>
    `;
  } catch (error) {
    detailsContent.innerHTML = '<p>Falha ao carregar detalhes da ata.</p>';
  }
}

async function handleSupplierClick(button) {
  const rawCnpj = button.dataset.cnpj;
  const fornecedor = button.dataset.fornecedor || '';
  const cnpj = normalizeCnpj(rawCnpj);

  if (!cnpj) {
    return;
  }

  supplierContent.innerHTML = '<p>Carregando detalhes...</p>';
  openSupplierModal();

  try {
    let data = await fetchCnpjDetails(cnpj);
    if (data.status === 'ERROR') {
      data = await fetchCnpjDetailsBrasilApi(cnpj);
    }

    if (data.message) {
      supplierContent.textContent = data.message || 'Nao foi possivel consultar o CNPJ.';
      return;
    }

    renderSupplierDetails(data, cnpj, fornecedor);
  } catch (error) {
    supplierContent.textContent = 'Falha ao consultar detalhes do fornecedor.';
  }
}

async function handleSaldoConsulta(button) {
  const cell = setSaldoLoading(button);
  const numeroAta = button.dataset.ata;
  const unidadeGerenciadora = button.dataset.ug;
  const numeroItem = button.dataset.item;

  try {
    const response = await fetchUnidadesItem({
      pagina: 1,
      tamanhoPagina: 20,
      numeroAta,
      unidadeGerenciadora,
      numeroItem
    });

    const items = Array.isArray(response.resultado) ? response.resultado : [];
    const saldoValues = items
      .map((item) => item.saldoAdesoes ?? item.saldoEmpenho ?? null)
      .filter((value) => Number.isFinite(Number(value)));

    const aceitaAdesao = items.some((item) => item.aceitaAdesao === true);

    if (!saldoValues.length) {
      setSaldoValue(cell, 'Sem saldo', aceitaAdesao);
      return;
    }

    const maxSaldo = Math.max(...saldoValues.map(Number));
    setSaldoValue(cell, String(maxSaldo), aceitaAdesao);
  } catch (error) {
    setSaldoError(cell);
  }
}

async function filterByMaxAdesao(items) {
  const checks = await Promise.all(items.map((item) => fetchSaldoInfo(item)));
  return items.filter((_, index) => checks[index]?.maximoAdesao > 0);
}

async function fetchSaldoInfo(item) {
  const numeroAta = item.numeroAtaRegistroPreco ?? item.numeroAta ?? '';
  const unidadeGerenciadora = item.codigoUnidadeGerenciadora ?? item.unidadeGerenciadora ?? '';
  const numeroItem = item.numeroItem ?? '';

  if (!numeroAta || !unidadeGerenciadora || !numeroItem) {
    return null;
  }

  try {
    const response = await fetchUnidadesItem({
      pagina: 1,
      tamanhoPagina: 20,
      numeroAta,
      unidadeGerenciadora,
      numeroItem
    });

    const items = Array.isArray(response.resultado) ? response.resultado : [];
    const saldoValues = items
      .map((itemSaldo) => itemSaldo.saldoAdesoes ?? itemSaldo.saldoEmpenho ?? null)
      .filter((value) => Number.isFinite(Number(value)));

    const aceitaAdesao = items.some((itemSaldo) => itemSaldo.aceitaAdesao === true);
    const maxSaldo = saldoValues.length ? Math.max(...saldoValues.map(Number)) : 0;

    item.maximoAdesao = maxSaldo;
    item.aceitaAdesao = aceitaAdesao;

    return { maximoAdesao: maxSaldo };
  } catch (error) {
    return null;
  }
}

function setupDefaults() {
  const today = new Date();
  const minDate = addDays(today, -180);
  dateMinInput.value = toIsoDate(minDate);
  dateMaxInput.value = toIsoDate(today);
  resetResults();
}

function setupDarkMode() {
  const html = document.documentElement;
  const saved = localStorage.getItem('darkMode') === 'true';
  if (saved) {
    html.classList.add('dark');
    darkModeToggle.setAttribute('aria-pressed', 'true');
  }

  darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('darkMode', String(isDark));
    darkModeToggle.setAttribute('aria-pressed', String(isDark));
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  runSearch(1);
});

resetButton.addEventListener('click', () => {
  setError('');
  setupDefaults();
});

prevPage.addEventListener('click', () => {
  if (state.page > 1) {
    runSearch(state.page - 1);
  }
});

nextPage.addEventListener('click', () => {
  if (state.page < state.totalPages) {
    runSearch(state.page + 1);
  }
});

resultsBody.addEventListener('click', (event) => {
  const button = event.target.closest('.js-saldo-btn');
  if (!button) return;
  handleSaldoConsulta(button);
});

resultsBody.addEventListener('click', (event) => {
  const button = event.target.closest('.js-details-btn');
  if (!button) return;
  handleDetailsClick(button);
});

resultsBody.addEventListener('click', (event) => {
  const button = event.target.closest('.js-supplier-btn');
  if (!button) return;
  handleSupplierClick(button);
});

closeModal.addEventListener('click', () => {
  closeDetailsModal();
});

detailsModal.addEventListener('click', (event) => {
  if (event.target === detailsModal) {
    closeDetailsModal();
  }
});

closeSupplier.addEventListener('click', () => {
  closeSupplierModal();
});

supplierModal.addEventListener('click', (event) => {
  if (event.target === supplierModal) {
    closeSupplierModal();
  }
});

setupDefaults();
setupDarkMode();
