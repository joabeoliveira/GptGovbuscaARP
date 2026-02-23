---
name: API Compras.gov.br — Módulo ARP
description: Integração com API de Atas de Registro de Preço (ARP) do Portal de Dados Abertos de Compras Públicas.
---

# Skill: API Compras.gov.br — Módulo ARP (Atas de Registro de Preço)

## Goal
Integrar e consumir endpoints do módulo ARP (Atas de Registro de Preço) da API Compras.gov.br para consultar atas vigentes, itens, saldos, empenhos e adesões.

**Base URL:** `https://dadosabertos.compras.gov.br`  
**Swagger:** [https://dadosabertos.compras.gov.br/swagger-ui/index.html](https://dadosabertos.compras.gov.br/swagger-ui/index.html)  
**Formato:** REST/JSON — OpenAPI 3.1  
**Tag:** `08 - ARP`

## Instructions

### Endpoints

### 1. Consultar ARPs
`GET /modulo-arp/1_consultarARP`

| Parâmetro | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `pagina` | int | Não (default: 1) | Página de resultados |
| `tamanhoPagina` | int | Não (default: 10) | Itens por página |
| `codigoUnidadeGerenciadora` | string | Não | Código da UG |
| `codigoModalidadeCompra` | string | Não | Modalidade |
| `numeroAtaRegistroPreco` | string | Não | Número da ata |
| `dataVigenciaInicialMin` | YYYY-MM-DD | **Sim** | Vigência inicial mínima |
| `dataVigenciaInicialMax` | YYYY-MM-DD | **Sim** | Vigência inicial máxima |
| `dataAssinaturaInicial` | YYYY-MM-DD | Não | Assinatura min |
| `dataAssinaturaFinal` | YYYY-MM-DD | Não | Assinatura max |

---

### 1.1 Consultar ARP por ID
`GET /modulo-arp/1.1_consultarARP_Id`

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `numeroControlePncpAta` | string | **Sim** |
| `dataAtualizacao` | YYYY-MM-DD | Não |

---

### 1.2 Consultar ARP por Fim de Vigência ⭐
`GET /modulo-arp/1.2_consultarARP_FimVigencia`

> **Usado no Processo A (Carga Inicial)** — Principal endpoint para varredura de atas vigentes.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `pagina` | int | Não (default: 1) |
| `tamanhoPagina` | int | Não (default: 10) |
| `codigoUnidadeGerenciadora` | string | Não |
| `codigoModalidadeCompra` | string | Não |
| `numeroAtaRegistroPreco` | string | Não |
| `dataVigenciaFinalMin` | YYYY-MM-DD | **Sim** |
| `dataVigenciaFinalMax` | YYYY-MM-DD | **Sim** |
| `dataAssinaturaInicial` | YYYY-MM-DD | Não |
| `dataAssinaturaFinal` | YYYY-MM-DD | Não |

**Resposta:** `VwFtArpAPIResponseDTO` contendo `resultado[]`, `totalRegistros`, `totalPaginas`, `paginasRestantes`

Cada item do resultado contém:
- `numeroAtaRegistroPreco`, `numeroControlePncpAta`
- `codigoUnidadeGerenciadora`, `nomeUnidadeGerenciadora`
- `dataVigenciaInicial`, `dataVigenciaFinal`
- `codigoModalidadeCompra`, `nomeModalidadeCompra`
- `linkAtaPncp`, `situacao`

---

### 2. Consultar Itens da ARP ⭐
`GET /modulo-arp/2_consultarARPItem`

> **Usado no Processo A (Extração de Itens)** — Popula o catálogo de busca.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `pagina` | int | Não (default: 1) |
| `tamanhoPagina` | int | Não (default: 10) |
| `codigoUnidadeGerenciadora` | int | Não |
| `codigoModalidadeCompra` | string | Não |
| `dataVigenciaInicialMin` | YYYY-MM-DD | **Sim** |
| `dataVigenciaInicialMax` | YYYY-MM-DD | **Sim** |
| `numeroItem` | string | Não |
| `codigoItem` | int | Não |
| `tipoItem` | string | Não |
| `niFornecedor` | string | Não |
| `codigoPdm` | int | Não |
| `numeroCompra` | string | Não |

**Campos vitais retornados:**
- `descricaoItem`, `descricaoDetalhada`, `valorUnitario`
- `niFornecedor`, `nomeRazaoSocialFornecedor`
- `numeroItem`, `codigoItem`, `tipoItem`
- `quantidadeRegistrada`, `unidadeMedida`

---

### 2.1 Consultar Item da ARP por ID
`GET /modulo-arp/2.1_consultarARPItem_Id`

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `numeroControlePncpAta` | string | **Sim** |
| `dataAtualizacao` | YYYY-MM-DD | Não |

---

### 3. Consultar Unidades do Item ⭐
`GET /modulo-arp/3_consultarUnidadesItem`

> **Usado no Processo B (Saldo On-Demand)** — Chamado ao clicar num item.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `pagina` | int | Não |
| `tamanhoPagina` | int | Não |
| `numeroAta` | string | **Sim** |
| `unidadeGerenciadora` | string | **Sim** |
| `numeroItem` | string | **Sim** |
| `dataAtualizacao` | YYYY-MM-DD | Não |

**Campos-chave retornados:**
- `aceitaAdesao` (bool) — Se aceita carona
- `saldoAdesoes` (int) — Quantidade disponível para adesão
- `unidadeParticipante`, `quantidadeRegistrada`, `quantidadeEmpenhada`

---

### 4. Consultar Empenhos/Saldo do Item ⭐
`GET /modulo-arp/4_consultarEmpenhosSaldoItem`

> **Usado no Processo C (Dashboard Fornecedor)** — Monitora estoque da UG.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `pagina` | int | Não |
| `tamanhoPagina` | int | Não |
| `numeroAta` | string | **Sim** |
| `unidadeGerenciadora` | string | **Sim** |
| `numeroItem` | string | **Sim** |
| `dataAtualizacao` | YYYY-MM-DD | Não |

**Exemplo do endpoint 4:**
https://dadosabertos.compras.gov.br/modulo-arp/5_consultarAdesoesItem?pagina=1&tamanhoPagina=10&numeroAta=00008%2F2026&unidadeGerenciadora=926040&numeroItem=00062

curl -X 'GET' \
  'https://dadosabertos.compras.gov.br/modulo-arp/5_consultarAdesoesItem?pagina=1&tamanhoPagina=10&numeroAta=00001%2F2026&unidadeGerenciadora=160392&numeroItem=00035' \
  -H 'accept: */*'

Obs: Obritórios númeo da ata, unidade gerenciadora e número do item.

Pode ocorrer codigo 200 com resultado vazio. O que pode significar que não há empenhos para o item. Ou que ainda não empenhado nada no sistema indicando que somente poderá ser feito adesão após o empenho.

**Campos-chave retornados:**
- `quantidadeRegistrada`, `quantidadeEmpenhada`, `saldoEmpenho`

---

### 5. Consultar Adesões do Item ⭐
`GET /modulo-arp/5_consultarAdesoesItem`

> **Usado no Processo C (Dashboard Fornecedor)** — Alerta de novas vendas.

| Parâmetro | Tipo | Obrigatório |
|---|---|---|
| `pagina` | int | Não |
| `tamanhoPagina` | int | Não |
| `numeroAta` | string | **Sim** |
| `unidadeGerenciadora` | string | **Sim** |
| `numeroItem` | string | **Sim** |
| `unidade` | string | Não |
| `dataAtualizacao` | YYYY-MM-DD | Não |

**Campos-chave retornados:**
- `unidadeNaoParticipante` — Quem está pedindo a carona
- `quantidadeAprovadaAdesao` — Quantidade aprovada
- `dataAprovacaoAnalise`

---

## Padrões de Resposta

Todas as respostas seguem o formato:
```json
{
  "resultado": [...],
  "totalRegistros": 1250,
  "totalPaginas": 125,
  "paginasRestantes": 10
}
```

## Constraints

### Critical ⚠️
- **Parâmetros de Data Obrigatórios**: `dataVigenciaInicialMin`, `dataVigenciaInicialMax` devem estar presentes em queries de consulta de atas.
- **Resposta Vazia ≠ Erro**: Status HTTP 200 com array vazio significa que não há registros ou dados ainda não tratados (ex.: saldo zero, sem empenhos).
- **Pagination**: Sempre respeitar `totalPaginas` e `paginasRestantes` para evitar chamadas desnecessárias.
- **URL Encoding**: Números de ata contêm `/` que deve ser encoded como `%2F` em URLs.

### Endpoints Principais por Processo
- **Processo A (Carga Inicial)**: `1.2_consultarARP_FimVigencia` + `2_consultarARPItem`
- **Processo B (Saldo On-Demand)**: `3_consultarUnidadesItem`
- **Processo C (Dashboard)**: `4_consultarEmpenhosSaldoItem` + `5_consultarAdesoesItem`

### Validações Obrigatórias
- Sempre validar presença de `numeroAta`, `unidadeGerenciadora`, `numeroItem` antes de chamar endpoints que exigem.
- Tratamento de erros: HTTP 200 com `resultado` vazio é válido; verificar sempre antes de acessar índices.
- Rate limiting: Considerar implementar backoff exponencial em falhas.

### Tipos de Dados
- Datas: Formato `YYYY-MM-DD` (ISO 8601)
- Números: Sem formatação especial (evitar pontuação)
- Unidade Gerenciadora: String (code) — sempre passar como string

## Notas de Integração
- **Paginação**: Use `pagina` + `tamanhoPagina` (max ~50). Itere enquanto `paginasRestantes > 0`.
- **Datas**: Formato `YYYY-MM-DD` obrigatório nos filtros de vigência.
- **Rate Limiting**: APIs governamentais podem ter limites. Adicionar `delay` entre requisições.
- **Sem autenticação?**: Os endpoints do módulo ARP aparentam ser públicos (sem `bearerAuth`).
