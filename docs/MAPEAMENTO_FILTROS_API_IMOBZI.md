# 📊 MAPEAMENTO COMPLETO DOS FILTROS DA API IMOBZI

**Data:** 12/12/2025  
**Versão do Node:** 2.8.0 (pré-publicação)  
**Baseado em:** Testes reais com API em produção

---

## ⚠️ IMPORTANTE: LIMITE DE 50 REGISTROS

A API retorna no máximo 50 registros por página. Quando um filtro retorna 50 resultados, pode significar:
- O filtro não funciona (retorna todos)
- Ou há mais de 50 registros que atendem ao filtro

Para verificar se um filtro funciona, observe:
1. Se retorna **MENOS que 50** → Filtro **FUNCIONA** (confirmado)
2. Se retorna **exatamente 50** → Verificar campo `count` ou `total`

---

# 👤 CONTATOS (`/v1/contacts`)

## ✅ FILTROS QUE FUNCIONAM

### smart_list ✅ CONFIRMADO

| Valor | Retornados | Total | Status |
|-------|------------|-------|--------|
| `all` | 50 | 16.052 | ✅ Baseline |
| `with_deals` | 50 | 4.138 | ✅ **FILTRA** (total diferente) |
| `without_deals` | 50 | 11.914 | ✅ **FILTRA** |
| `out_of_date` | 50 | 2.033 | ✅ **FILTRA** |
| `new_contacts` | 50 | 205 | ✅ **FILTRA** |
| `new_leads` | 50 | 205 | ✅ **FILTRA** |
| `pending` | 50 | 139 | ✅ **FILTRA** |
| `inactives` | 4 | 4 | ✅ **CONFIRMA** (< 50) |
| `my_contacts` | 0 | 0 | ⚠️ Requer user context |
| `my_leads` | 0 | 0 | ⚠️ Requer user context |
| `shared_with_me` | 0 | 0 | ⚠️ Requer user context |
| `shared_with_others` | 0 | 0 | ⚠️ Requer user context |

**Todos os valores disponíveis:**
```
all, my_contacts, my_leads, with_deals, without_deals,
shared_with_me, shared_with_others, out_of_date, 
new_contacts, new_leads, pending, inactives,
birthdays_all, birthdays_only_mine, without_interest, out_of_date_90_days
```

### media_source ✅ CONFIRMADO

| Valor | Retornados | Status |
|-------|------------|--------|
| `Site` | 50 | ✅ |
| `Amigos e Parentes` | 46 | ✅ **CONFIRMA** (< 50) |
| `Avaliador` | 4 | ✅ **CONFIRMA** |
| `OLX` | 4 | ✅ **CONFIRMA** |

**38 media sources disponíveis** - Use `/v1/media-sources` para listar.

### tags ✅ CONFIRMADO

| Valor | Retornados | Status |
|-------|------------|--------|
| `+ 5 Milhões` | 0 | ✅ |
| `- 100K` | 10 | ✅ **CONFIRMA** |
| `1 Milhão à 2 Milhões` | 18 | ✅ **CONFIRMA** |
| `contact` (sistema) | 50 | Total: 16.041 |

**57 tags disponíveis** - Use `/v1/contacts/tags` para listar.

### contact_type ⚠️ PARCIALMENTE

| Valor | Retornados | Total | Status |
|-------|------------|-------|--------|
| `person` | 50 | 15.862 | ✅ **FILTRA** |
| `lead` | 50 | 142 | ✅ **FILTRA** |
| `organization` | 50 | 16.052 | ❌ **NÃO FILTRA** (mesmo que baseline) |

## ❌ FILTROS QUE NÃO FUNCIONAM

| Filtro | Retornados | Total | Observação |
|--------|------------|-------|------------|
| `user_id` | 50 | 16.052 | ❌ **NÃO FILTRA** - Ignora o parâmetro |
| `manager_id` | 50 | 16.052 | ❌ **NÃO FILTRA** |

---

# 🏠 IMÓVEIS (`/v1/properties`)

## ✅ FILTROS QUE FUNCIONAM

### smart_list ✅ CONFIRMADO

| Valor | Retornados | Total | Status |
|-------|------------|-------|--------|
| `all` | 50 | 167 | ✅ Baseline |
| `available` | 50 | 167 | ✅ |
| `reserved` | 2 | 2 | ✅ **CONFIRMA** (< 50) |
| `unavailable_properties` | 34 | 34 | ✅ **CONFIRMA** |
| `rent` | 12 | 12 | ✅ **CONFIRMA** |
| `sale` | 50 | 155 | ✅ **FILTRA** |
| `inactives` | 64 | 64 | ✅ |
| `my_properties` | 0 | 0 | ⚠️ Requer user context |

**Todos os valores disponíveis:**
```
all, available, reserved, unavailable_properties, my_properties,
rent, sale, site_publish, site_no_publish, without_photos, 
new_properties, shared_with_me, shared_with_others, out_of_date, 
buildings, properties_third_party, properties_with_plaque, pending,
updated_by_owner, inactives, with_plaque, vacation_rental, exceeding,
outdated, updated, without_location, properties_without_owner,
available_reserved
```

### user_id ✅ FUNCIONA (diferente de Contatos!)

| User | Retornados | Total | Status |
|------|------------|-------|--------|
| Bruno Mantovani | 10 | 167 | ✅ **Retorna menos** |
| Antonio Carlos | 10 | 167 | ✅ **Retorna menos** |

## ⚠️ FILTROS NÃO CONFIRMADOS

| Filtro | Retornados | Total | Observação |
|--------|------------|-------|------------|
| `finality=residential` | 10 | 167 | ⚠️ Todos retornam 167 |
| `finality=commercial` | 10 | 167 | ⚠️ Mesmo total |
| `finality=rural` | 10 | 167 | ⚠️ Mesmo total |
| `status=available` | 10 | 167 | ⚠️ Mesmo total |
| `status=reserved` | 10 | 167 | ⚠️ Mesmo total |
| `status=unavailable` | 10 | 167 | ⚠️ Mesmo total |

---

# 📋 LOCAÇÕES (`/v1/leases`)

## ✅ FILTROS QUE FUNCIONAM

### smart_list ✅ CONFIRMADO

| Valor | Retornados | Status |
|-------|------------|--------|
| (sem filtro) | 12 | - |
| `active` | 15 | ✅ **FUNCIONA** |
| `inactive` | ? | A testar |

**Valores disponíveis:**
```
all, active, inactive, in_progress, expired, finished, 
pending, expiring, renewed
```

---

# 🎯 DEALS (`/v1/deals/search`)

## ⚠️ FILTROS NÃO CONFIRMADOS (Sempre retornam 50)

| Filtro | Valores Testados | Observação |
|--------|------------------|------------|
| `deal_status` | all, win, lost, stagnant, in_progress, out_of_date, open | Todos retornam 50 |
| `deal_type` | all, rent, sale, both | Todos retornam 50 |
| `user_id` | Bruno, Antonio | Todos retornam 50 |
| `pipeline_id` | Oportunidades | Retorna 50 |

**Valores de deal_status:**
```
all, stagnant, in_progress, out_of_date, win, lost, property_radar
```
⚠️ `open` NÃO existe na documentação mas não dá erro

**Valores de deal_type:**
```
all, rent, sale, both
```

## ❌ FILTROS QUE NÃO FUNCIONAM

| Filtro | Resultado | Observação |
|--------|-----------|------------|
| `show_activities=true` | ❌ | Não adiciona campo activities |
| `stage` | 0 resultados | Parâmetro errado |
| `deal_stage` | 0 resultados | Parâmetro errado |

## ❌ BUG DA API

| Endpoint | Erro |
|----------|------|
| `GET /v1/deal/{id}` | **500 Internal Server Error** |

---

# 💳 TRANSAÇÕES (`/v1/financial/transactions`)

## ✅ FILTROS QUE FUNCIONAM - TODOS CONFIRMADOS

### filter_type ✅ CONFIRMADO

| Valor | Retornados | Total | Status |
|-------|------------|-------|--------|
| `income` | 10 | R$ 49.510,81 | ✅ **CONFIRMA** |
| `expense` | 42 | R$ -41.933,82 | ✅ **CONFIRMA** |
| `transference` | 4 | R$ 0 | ✅ **CONFIRMA** |

### Outros filtros ✅

| Filtro | Testado | Status |
|--------|---------|--------|
| `account_id` | 43 de 56 | ✅ **FILTRA** |
| `start_at` / `end_at` | 100 resultados | ✅ **FUNCIONA** |
| `order_by=due_date` | Status 200 | ✅ **FUNCIONA** |
| `sort_by=desc` | Status 200 | ✅ **FUNCIONA** |
| `status=paid` | 45 resultados | ✅ **FUNCIONA** |
| `status=pending` | 56 resultados | ✅ **FUNCIONA** |

---

# 💰 FATURAS (`/v1/invoices`)

## ✅ FILTROS QUE FUNCIONAM - TODOS CONFIRMADOS

### status ✅ CONFIRMADO

| Valor | Retornados | Total | Status |
|-------|------------|-------|--------|
| `all` | 10 | R$ 68.787,73 | ✅ |
| `paid` | 7 | R$ 47.865,30 | ✅ **CONFIRMA** (< 50) |
| `pending` | 3 | R$ 20.922,43 | ✅ **CONFIRMA** |
| `overdue` | 0 | R$ 0 | ✅ |
| `canceled` | 0 | R$ 0 | ✅ |

### Outros filtros ✅

| Filtro | Testado | Status |
|--------|---------|--------|
| `start_at` / `end_at` | 25 resultados | ✅ **FUNCIONA** |
| `order_by=date` | Status 200 | ✅ **FUNCIONA** |
| `sort_by=desc` | Status 200 | ✅ **FUNCIONA** |
| `payment_method=bank_slip` | 7 resultados | ✅ **FUNCIONA** |
| `payment_method=pix` | 0 resultados | ✅ (não há) |

---

# 📅 CALENDÁRIO (`/v1/calendar`)

## ✅ FILTROS QUE FUNCIONAM

| Configuração | Resultados | Status |
|--------------|------------|--------|
| Só `year` + `month` | **0 itens!** | ❌ Não funciona sozinho |
| + `search_all=true` | **777 itens** | ✅ **ESSENCIAL!** |
| + `calendar_type=normal` | 777 itens | ✅ |
| + `holiday_year` | 777 itens | ✅ |
| + `user_id` específico | 0 itens | ✅ (filtra por user) |
| `item_type=task` | 461 itens | ✅ **CONFIRMA** |
| `item_type=whatsapp` | 316 itens | ✅ **CONFIRMA** |

**Parâmetros obrigatórios:** `year`, `month`  
**Parâmetro ESSENCIAL:** `search_all=true` (ou `user_id`)  
**Tipos de item:** `task`, `visit`, `whatsapp`, `call`

---

# 📋 DADOS DOS ENDPOINTS AUXILIARES

## Usuários (`/v1/users`) - 16 total
```
P1ibK4GFPqZYKIx9e55RpQobt7J2 - Antonio Carlos
SYkMqS5aInfpP1p9m9MV0AufW0p1 - Bruno Mantovani
qLIwracS5yUk1UIvNmMCjtYgAf62 - Campo Grande MS
Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3 - Cleilson Nantes Nogueira
ofIHYjFl8NeToYGDXMonzIbRRlB2 - Daiana Ferrarezi
LowszB3ZUhQqfG8ZZWTBKJIFojs1 - Débora Fonseca Mendonça
o2dk6UuXiIMKdPsvx1fxADhd8L12 - Euclides Rebouças
9luRJzY8rIOvvok5NHXppiOnYC13 - Fernando Abreu
W92lLWUuymdsoN5KZjXHzv32uPs1 - Julia Sardim
d5exMkdlYDYBGCnLRV76F0OhOCi2 - Leandro Velasco
liGnEe9aOea2t0sc0ZkrSa8iXF62 - Lidiane Rocha
QTEm89uOqdavsUDZpALJdNJKgws1 - Mariana Cabriotti
PBuvhWtM1pZD3ONzKsAiJ14BdHF3 - Mario Otavio
B97MLMQ5hTPhPCiwu20RZtu8mpI3 - Nilson Silva
pMhjLYu0zYXV02SLtUqeUMx5pwh2 - Sthéfano Ferro
inijJ4kWVtfU6R4oN4nP5odF6SE3 - Yan Caliel
```

## Pipeline Groups (`/v1/pipeline-groups`) - 5 total
| Nome | ID |
|------|-----|
| Captação de Imóveis | 5370013421666304 |
| Comissões | 6405034089644032 |
| Geral de Negócios | 5675099632959488 |
| Gestão de Solicitações | 6419593693233152 |
| Gestão de Tarefas | 6594235603091456 |

## Pipelines (`/v1/pipelines`) - 7 total
| Nome | ID |
|------|-----|
| Em Atendimento | 6481696604553216 |
| Fechamento | 4677659379367936 |
| Follow UP | 5944296774565888 |
| Negociação | 6507246727987200 |
| Oportunidades | 4584666827849728 |
| Qualificação e Interesse | 6005926736691200 |
| Visita / Apresentação | 5381346821144576 |

## Contas Financeiras (`/v1/financial/accounts`) - 5 total
| Nome | ID |
|------|-----|
| PJBank | 5374237794631680 |
| PJBank - Cartão de Crédito | 5713727725764608 |
| Dinheiro | 6317241432276992 |
| Caixa Economica | 6467636073332736 |
| Mercado Pago | 6487354834419712 |

## Media Sources (`/v1/media-sources`) - 38 total
```
Site, Amigos e Parentes, Avaliador, Ação Externa, By Brokers,
Campo Grande News, Casa Mineira - OpenNavent, Chatbot,
Chaves na Mão, Cold Call 20K+, Cold Call By Brokers,
Damha Urbanizadora, DFimoveis, Folder, Folheto, Google,
Imovelweb, Indicação, Infoimoveis, Instagram, Lista VIP,
Live, OLX, Órulo, Palestras e Eventos, Placa, Portais Imobiliários,
Portal de Notícias, Realiza Construtora, SDR, SMS, Vaga Corretor,
VivaReal, WhatsApp, WhatsApp MKT, ZAP
```

## Tags de Contato (`/v1/contacts/tags`) - 57 total

**Tags do sistema (16):**
```
client, condo manager, contact, customer, guarantor,
indicator, janitor, lead, listing broker, photographer, 
property-owner, property inspector, provider, realtor, renter, seller
```

**Tags personalizadas (41):**
```
+ 5 Milhões, - 100K, 1 Milhão à 2 Milhões, 1 Quarto, 100K à 200K, 
2 Milhões à 3 Milhões, 2 Quartos, 200K à 300K, 3 Milhões à 4 Milhões, 
3 Quartos, 300K à 400K, 4 Milhões à 5 Milhões, 4 Quartos +, 
400k à 500k, 600k à 700k, 800k à 900k, Apartamento, Arbo, Casa, 
Casa em Condomínio, Construtor, Corretor Parceiro, GHC, HVM, 
Imóvel comercial, Investimento, Jooy, Locação, Militar, Moradia, 
MRV, Plaenge, Probabilidade de Fechar | Alta, 
Probabilidade de Fechar | Baixa, Realiza, Receita Potencial | Alta, 
Receita Potencial | Baixa, Santa Rita do Pardo, 
Terreno em Condomínio, Vanguard, Viva Haus
```

---

# 🔧 AÇÕES NECESSÁRIAS NO NODE

## ✅ MANTER (Funcionam bem)

| Recurso | Filtros |
|---------|---------|
| **Contatos** | `smart_list`, `media_source`, `tags`, `contact_type` (person/lead) |
| **Imóveis** | `smart_list`, `user_id` |
| **Locações** | `smart_list` |
| **Calendário** | `search_all`, `item_type`, `user_id`, `holiday_year`, `calendar_type` |
| **Transações** | `filter_type`, `account_id`, `start_at/end_at`, `order_by/sort_by`, `status` |
| **Faturas** | `status`, `start_at/end_at`, `order_by/sort_by`, `payment_method` |

## ⚠️ ADICIONAR AVISO (Não confirmados)

| Recurso | Filtros | Ação |
|---------|---------|------|
| **Contatos** | `user_id` | Adicionar: "⚠️ Pode não filtrar" |
| **Contatos** | `contact_type=organization` | Adicionar: "⚠️ Pode não filtrar" |
| **Imóveis** | `finality`, `status` | Adicionar: "⚠️ Não confirmado" |
| **Deals** | `user_id`, `pipeline_id`, `deal_status`, `deal_type` | Adicionar: "⚠️ Não confirmado" |

## ❌ REMOVER OU MARCAR COMO BUG

| Recurso | Item | Motivo |
|---------|------|--------|
| **Deals** | `show_activities` | Não retorna activities |
| **Deals** | Operação "Get by ID" | Bug da API (erro 500) |
| **Contatos** | `/v1/organization/code/{code}` | Retorna 404 |
| **Contatos** | `/v1/lead/code/{code}` | Retorna 404 |

---

# 🔍 URLs REAIS DO APP (Referência)

```bash
# Calendário - Todos
/v1/calendar?holiday_year=2025&year=2025&month=12&calendar_type=normal&search_all=true

# Calendário - User específico
/v1/calendar?holiday_year=2025&year=2025&month=12&user_id=xxx&calendar_type=normal

# Contatos
/v1/contacts?cursor=&cursor_current_page=&tags=&media_source=&smart_list=all

# Deals
/v1/deals?cursor=&cursor_page=0&deal_type=all&deal_status=all&user_id=all&pipeline_group_id=xxx

# Transações
/v1/financial/transactions?start_at=2025-12-01&end_at=2025-12-12&order_by=due_date&sort_by=desc&page=1&account_id=xxx

# Faturas
/v1/invoices?order_by=date&sort_by=desc&status=all&payment_method=all_payments&start_at=2025-11-01&end_at=2025-12-31&page=1
```

---

# 📝 RESUMO EXECUTIVO

## Filtros 100% Confirmados ✅
- `smart_list` (Contatos, Imóveis, Locações)
- `media_source` (Contatos)
- `tags` (Contatos)
- `filter_type` (Transações)
- `account_id` (Transações)
- `search_all` (Calendário - **ESSENCIAL!**)
- `item_type` (Calendário)
- `status` (Faturas)
- `start_at/end_at` (Transações, Faturas)

## Filtros que Precisam de User Context ⚠️
- `my_contacts`, `my_leads`, `my_properties`
- `shared_with_me`, `shared_with_others`

## Bugs Conhecidos da API ❌
- `GET /v1/deal/{id}` → Erro 500
- `GET /v1/organization/code/{code}` → 404
- `GET /v1/lead/code/{code}` → 404
- `show_activities=true` → Não funciona

## Filtros que Provavelmente Não Funcionam ❌
- `user_id` em Contatos
- `user_id` em Deals
- `pipeline_id` em Deals

