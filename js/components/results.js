const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

function safeText(value) {
  if (value === undefined || value === null || String(value).trim() === '') {
    return '-';
  }
  return String(value);
}

function formatCurrency(value) {
  if (value === undefined || value === null || value === '') {
    return '-';
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return safeText(value);
  }
  return currencyFormatter.format(numeric);
}

function createCell(text, className = '') {
  const cell = document.createElement('td');
  cell.className = `px-4 py-3 text-sm text-slate-700 dark:text-slate-200 ${className}`.trim();
  cell.textContent = text;
  return cell;
}

function createSaldoCell(item) {
  const cell = document.createElement('td');
  cell.className = 'px-4 py-3 text-sm text-slate-700 dark:text-slate-200';

  if (item.maximoAdesao !== undefined && item.maximoAdesao !== null) {
    const aceite = item.aceitaAdesao ? ' (aceita)' : ' (nao aceita)';
    cell.textContent = `${item.maximoAdesao}${aceite}`;
    return cell;
  }

  const numeroAta = item.numeroAtaRegistroPreco ?? item.numeroAta ?? '';
  const unidadeGerenciadora = item.codigoUnidadeGerenciadora ?? item.unidadeGerenciadora ?? '';
  const numeroItem = item.numeroItem ?? '';

  if (!numeroAta || !unidadeGerenciadora || !numeroItem) {
    cell.textContent = 'Nao disponivel';
    return cell;
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'js-saldo-btn rounded-full border border-ocean/40 px-3 py-1 text-xs font-semibold text-ocean transition hover:border-ocean hover:bg-ocean/10 focus:outline-none focus:ring-2 focus:ring-ocean/40';
  button.dataset.ata = numeroAta;
  button.dataset.ug = unidadeGerenciadora;
  button.dataset.item = numeroItem;
  button.textContent = 'Consultar saldo';

  cell.appendChild(button);
  return cell;
}

export function renderRows(results, tbody) {
  tbody.innerHTML = '';

  if (!results.length) {
    renderEmptyRow(tbody);
    return;
  }

  const fragment = document.createDocumentFragment();

  results.forEach((item) => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-slate-50/80 dark:hover:bg-white/5';

    const numeroAta = safeText(item.numeroAtaRegistroPreco ?? item.numeroAta ?? '-');
    const catmat = safeText(item.codigoItem ?? item.codigoItemMaterial ?? '-');
    const descricao = safeText(item.descricaoItem ?? item.descricaoDetalhada ?? item.descricao ?? '-');
    const detailButton = createDetailsButton(item);
    const orgao = safeText(item.nomeUnidadeGerenciadora ?? item.nomeOrgaoGerenciador ?? '-');
    const ug = safeText(item.codigoUnidadeGerenciadora ?? item.unidadeGerenciadora ?? '-');
    const fornecedor = safeText(item.nomeRazaoSocialFornecedor ?? item.nomeFornecedor ?? '-');
    const cnpj = safeText(item.niFornecedor ?? item.cnpjFornecedor ?? '-');
    const supplierButton = createSupplierButton(item);

    row.appendChild(createCell(numeroAta));
    row.appendChild(createCell(catmat));
    row.appendChild(createCell(descricao, 'min-w-[240px]'));
    row.appendChild(detailButton);
    row.appendChild(createSaldoCell(item));
    row.appendChild(createCell(formatCurrency(item.valorUnitario ?? item.valorUnitarioItem ?? item.valorUnitarioHomologado)));
    row.appendChild(createCell(orgao));
    row.appendChild(createCell(ug));
    row.appendChild(createCell(fornecedor));
    row.appendChild(supplierButton);
    row.appendChild(createCell(cnpj));

    fragment.appendChild(row);
  });

  tbody.appendChild(fragment);
}

export function renderEmptyRow(tbody) {
  tbody.innerHTML = '';
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.colSpan = 11;
  cell.className = 'px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-300';
  cell.textContent = 'Nenhum resultado encontrado para os filtros informados.';
  row.appendChild(cell);
  tbody.appendChild(row);
}

function createDetailsButton(item) {
  const cell = document.createElement('td');
  cell.className = 'px-4 py-3 text-sm';

  const numeroAta = item.numeroAtaRegistroPreco ?? item.numeroAta ?? '';
  const unidadeGerenciadora = item.codigoUnidadeGerenciadora ?? item.unidadeGerenciadora ?? '';

  if (!numeroAta || !unidadeGerenciadora) {
    cell.textContent = '-';
    cell.classList.add('text-slate-500', 'dark:text-slate-300');
    return cell;
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'js-details-btn rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-white/20 dark:text-slate-200';
  button.dataset.ata = numeroAta;
  button.dataset.ug = unidadeGerenciadora;
  button.textContent = 'Mais detalhes';

  cell.appendChild(button);
  return cell;
}

function createSupplierButton(item) {
  const cell = document.createElement('td');
  cell.className = 'px-4 py-3 text-sm';

  const cnpj = item.niFornecedor ?? item.cnpjFornecedor ?? '';

  if (!cnpj) {
    cell.textContent = '-';
    cell.classList.add('text-slate-500', 'dark:text-slate-300');
    return cell;
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'js-supplier-btn rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:border-white/20 dark:text-slate-200';
  button.dataset.cnpj = cnpj;
  button.dataset.fornecedor = item.nomeRazaoSocialFornecedor ?? item.nomeFornecedor ?? '';
  button.textContent = 'Fornecedor';

  cell.appendChild(button);
  return cell;
}

export function setSaldoLoading(button) {
  const cell = button.closest('td');
  if (!cell) return null;
  cell.textContent = 'Carregando...';
  return cell;
}

export function setSaldoValue(cell, value, aceitaAdesao) {
  if (!cell) return;
  const aceite = aceitaAdesao === undefined ? '' : (aceitaAdesao ? ' (aceita)' : ' (nao aceita)');
  cell.textContent = `${value}${aceite}`;
}

export function setSaldoError(cell) {
  if (!cell) return;
  cell.textContent = 'Falha ao consultar';
}
