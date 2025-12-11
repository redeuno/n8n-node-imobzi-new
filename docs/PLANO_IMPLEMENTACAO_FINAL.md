# 📋 PLANO DE IMPLEMENTAÇÃO FINAL - Node Imobzi n8n

**Data:** 11/12/2025  
**Baseado em:** 101 testes reais da API (77 sucesso, 24 erro)  
**Versão Alvo:** 2.0.0

---

## 📊 INVENTÁRIO COMPLETO DA API

### ✅ ENDPOINTS QUE FUNCIONAM (77 endpoints)

| Categoria | Endpoint | DataKey | Paginação | Filtros |
|-----------|----------|---------|-----------|---------|
| **USERS** | `/v1/users` | array direto | - | - |
| **CONTACTS** | `/v1/contacts` | `contacts` | `cursor` | contact_type, media_source, tags, user_id, manager_id, smart_list |
| | `/v1/contacts/search` | `contacts` | `cursor` | mesmos |
| | `/v1/contact/exists` | objeto | - | email, cpf, cnpj, phone_number |
| | `/v1/person/{id}` | objeto | - | - |
| | `/v1/person/code/{code}` | objeto | - | - |
| | `/v1/contacts/tags` | `tags` | - | - |
| | `/v1/media-sources` | array direto | - | - |
| **PROPERTIES** | `/v1/properties` | `properties` | `cursor` | smart_list, finality, status, user_id, limit |
| | `/v1/property/{id}` | objeto | - | - |
| | `/v1/property/code/{code}` | objeto | - | - |
| | `/v1/property/exists` | objeto | - | code |
| | `/v1/property/{id}/statistics` | objeto | - | - |
| | `/v1/property/{id}/deals-match` | objeto | - | - |
| | `/v1/property-types` | array direto | - | - |
| | `/v1/property-features` | `Imóvel` | - | - |
| | `/v1/property-adverts` | `adverts` | - | limit |
| | `/v1/property-buildings/search` | array direto | - | search_text |
| **LEASES** | `/v1/leases` | `leases` | `cursor` | smart_list, limit |
| | `/v1/lease/{id}` | objeto | - | - |
| | `/v1/lease/code/{code}` | objeto | - | - |
| **INVOICES** | `/v1/invoices` | `invoices` | `next_page` | status, limit |
| | `/v1/invoice/{id}` | objeto | - | - |
| **DEALS** | `/v1/deals` | estrutura especial | - | user_id, pipeline_group_id, deal_status |
| | `/v1/deals/search` | `deals` | `cursor` | user_id, pipeline_id, deal_status, show_activities, limit |
| | `/v1/pipeline-groups` | array direto | - | - |
| | `/v1/pipelines` | array direto | - | - |
| | `/v1/deal-fields` | objeto | - | - |
| | `/v1/deal/lost-reason` | `deals_lost_reasons` | - | - |
| **TRANSACTIONS** | `/v1/financial/transactions` | `transactions` | `next_page` | limit |
| **CALENDAR** | `/v1/calendar` | `calendar_items` | `cursor_fw/rw` | year*, month*, user_id, item_type |
| **DOCUMENTS** | `/v1/documents` | `documents` | - | contact_id, property_id, limit |
| **OTHERS** | `/v1/banks` | array direto | - | - |
| | `/v1/notifications` | `notifications` | - | - |
| | `/v1/webhooks` | array direto | - | - |

### ❌ ENDPOINTS QUE NÃO FUNCIONAM (24 endpoints)

| Endpoint | Erro | Motivo |
|----------|------|--------|
| `/v1/contact/{id}` | 404 | Não existe, usar `/v1/person/{id}` |
| `/v1/deal/{id}` | 500 | Bug da API |
| `/v1/timeline` | 500 | Bug da API |
| `/v1/transactions` | 400 | Endpoint errado |
| `/v1/financial-transactions` | 400 | Endpoint errado |
| `/v1/accounts` | 400 | Não disponível |
| `/v1/teams` | 400 | Não disponível |
| `/v1/calendar-types` | 401 | Sem autorização |
| `/v1/categories` | 400 | Não disponível |
| `/v1/subcategories` | 400 | Não disponível |
| `/v1/guarantee-types` | 400 | Não disponível |
| `/v1/custom-fields` | 400 | Não disponível |
| `/v1/readjustments` | 400 | Não disponível |
| `/v1/property/neighborhoods` | 401 | Sem autorização |
| `/v1/property/{id}/calendar-items` | 401 | Sem autorização |
| `/v1/property/{id}/views` | 405 | Método não permitido |
| `/v1/property/search` | 422 | Parâmetros obrigatórios |
| `/v1/property/range-values` | 422 | Parâmetros obrigatórios |
| `/v1/property/range-areas` | 422 | Parâmetros obrigatórios |
| `/v1/site-settings` | 400 | Não disponível |
| `/v1/site/statistics` | 404 | Não existe |

---

## 🎯 ARQUITETURA DO NODE

### Recursos Principais (8)

```
1. Contact    - Contatos (pessoas, organizações, leads)
2. Property   - Imóveis
3. Lease      - Locações
4. Invoice    - Faturas
5. Deal       - Funil de vendas
6. Transaction - Transações financeiras
7. Calendar   - Calendário (visitas, tarefas)
8. Document   - Documentos
```

### Recursos Auxiliares (para dropdowns dinâmicos)

```
- User            → Dropdown de usuários/corretores
- Pipeline        → Dropdown de estágios
- Pipeline Group  → Dropdown de grupos de funil
- Property Type   → Dropdown de tipos de imóvel
- Media Source    → Dropdown de origens
- Contact Tag     → Dropdown de tags
- Lost Reason     → Dropdown de motivos de perda
- Bank            → Dropdown de bancos
```

---

## 📋 OPERAÇÕES POR RECURSO

### 1. CONTACT

| Operação | Endpoint | Parâmetros |
|----------|----------|------------|
| Listar (Get Many) | `GET /v1/contacts` | contact_type, media_source, tags, user_id, manager_id, smart_list |
| Buscar por ID | `GET /v1/person/{id}` | id |
| Buscar por Código | `GET /v1/person/code/{code}` | code |
| Verificar Existência | `GET /v1/contact/exists` | email, cpf, cnpj, phone_number |

**Dropdowns:**
- `contact_type`: person, organization, lead
- `smart_list`: all, my_contacts, my_leads, birthdays_all, birthdays_only_mine, without_deals, with_deals, shared_with_me, shared_with_others, out_of_date, new_contacts, new_leads, pending, inactives, without_interest, out_of_date_90_days
- `media_source`: Dinâmico de `/v1/media-sources`
- `tags`: Dinâmico de `/v1/contacts/tags`
- `user_id`: Dinâmico de `/v1/users`
- `manager_id`: Dinâmico de `/v1/users`

**Paginação:** `cursor` (auto-paginar, limite 50 fixo ignorado pela API)

---

### 2. PROPERTY

| Operação | Endpoint | Parâmetros |
|----------|----------|------------|
| Listar (Get Many) | `GET /v1/properties` | smart_list, finality, status, user_id, limit |
| Buscar por ID | `GET /v1/property/{id}` | id |
| Buscar por Código | `GET /v1/property/code/{code}` | code |
| Verificar Existência | `GET /v1/property/exists` | code |
| Estatísticas | `GET /v1/property/{id}/statistics` | id |
| Deals Relacionados | `GET /v1/property/{id}/deals-match` | id |

**Dropdowns:**
- `smart_list`: all, available, available_reserved, rent, sale, vacation_rental, site_publish, site_no_publish, without_photos, my_properties, buildings, reserved, unavailable_properties, inactives, etc.
- `finality`: residential, commercial, rural
- `status`: available, reserved, unavailable
- `user_id`: Dinâmico de `/v1/users`
- `property_type`: Dinâmico de `/v1/property-types`

**Paginação:** `cursor` (limite funciona até 50)

---

### 3. LEASE

| Operação | Endpoint | Parâmetros |
|----------|----------|------------|
| Listar (Get Many) | `GET /v1/leases` | smart_list, limit |
| Buscar por ID | `GET /v1/lease/{id}` | id |
| Buscar por Código | `GET /v1/lease/code/{code}` | code |

**Dropdowns:**
- `smart_list`: active, inactive

**Paginação:** `cursor` (limite funciona até 50)

---

### 4. INVOICE

| Operação | Endpoint | Parâmetros |
|----------|----------|------------|
| Listar (Get Many) | `GET /v1/invoices` | status, limit |
| Buscar por ID | `GET /v1/invoice/{id}` | id |

**Dropdowns:**
- `status`: pending, paid, overdue, cancelled

**Paginação:** `next_page` (número, diferente!)

---

### 5. DEAL

| Operação | Endpoint | Parâmetros |
|----------|----------|------------|
| Listar por Estágio (Kanban) | `GET /v1/deals` | user_id, pipeline_group_id, deal_status |
| Buscar (Lista Plana) | `GET /v1/deals/search` | user_id, pipeline_id, deal_status, show_activities, limit |

**Dropdowns:**
- `deal_status`: all, stagnant, in progress, out_of_date, win, lost, property_radar
- `user_id`: Dinâmico de `/v1/users`
- `pipeline_group_id`: Dinâmico de `/v1/pipeline-groups`
- `pipeline_id`: Dinâmico de `/v1/pipelines`

**Paginação:** 
- `/v1/deals`: Não tem (estrutura especial)
- `/v1/deals/search`: `cursor`

---

### 6. TRANSACTION

| Operação | Endpoint | Parâmetros |
|----------|----------|------------|
| Listar (Get Many) | `GET /v1/financial/transactions` | limit |

**⚠️ ENDPOINT:** Com barra! `/v1/financial/transactions`

**Paginação:** `next_page` (número)

---

### 7. CALENDAR

| Operação | Endpoint | Parâmetros |
|----------|----------|------------|
| Listar (Get Many) | `GET /v1/calendar` | year*, month*, user_id, item_type |

**Parâmetros OBRIGATÓRIOS:** year, month

**Dropdowns:**
- `item_type`: task, visit, whatsapp, call
- `user_id`: Dinâmico de `/v1/users`
- `year`: Campo numérico (ex: 2025)
- `month`: Dropdown 1-12

**Paginação:** `cursor_fw/rw`

---

### 8. DOCUMENT

| Operação | Endpoint | Parâmetros |
|----------|----------|------------|
| Listar (Get Many) | `GET /v1/documents` | contact_id, property_id, limit |

---

## 🔧 CONFIGURAÇÃO TÉCNICA DO NODE

### DataKeys por Recurso

```javascript
const dataKeyMap = {
  contacts: 'contacts',
  properties: 'properties',
  leases: 'leases',
  invoices: 'invoices',
  deals: 'deals',           // para /deals/search
  transactions: 'transactions',
  calendar: 'calendar_items',
  documents: 'documents',
  // Arrays diretos (sem dataKey):
  users: null,              // array direto
  pipelines: null,          // array direto
  pipelineGroups: null,     // array direto
  propertyTypes: null,      // array direto
  mediaSources: null,       // array direto
  banks: null,              // array direto
};
```

### Paginação por Recurso

```javascript
const paginationType = {
  contacts: 'cursor',
  properties: 'cursor',
  leases: 'cursor',
  invoices: 'next_page',    // DIFERENTE!
  deals: 'cursor',          // para /deals/search
  transactions: 'next_page', // DIFERENTE!
  calendar: 'cursor_fw',
  documents: null,          // sem paginação
};
```

### Auto-Paginação

```javascript
// Para recursos com cursor:
async function paginateWithCursor(endpoint, params, recordLimit) {
  let allRecords = [];
  let cursor = null;
  
  while (allRecords.length < recordLimit) {
    const response = await makeRequest(endpoint, { ...params, cursor });
    const records = response[dataKey] || response;
    allRecords.push(...records);
    
    cursor = response.cursor || response._metadata?.cursor;
    if (!cursor) break;
  }
  
  return allRecords.slice(0, recordLimit);
}

// Para recursos com next_page:
async function paginateWithNextPage(endpoint, params, recordLimit) {
  let allRecords = [];
  let page = 1;
  
  while (allRecords.length < recordLimit) {
    const response = await makeRequest(endpoint, { ...params, next_page: page });
    const records = response[dataKey] || response;
    allRecords.push(...records);
    
    if (response.next_page === null) break;
    page++;
  }
  
  return allRecords.slice(0, recordLimit);
}
```

---

## 📅 FASES DE IMPLEMENTAÇÃO

### FASE 1 - Core Básico (v2.0.0)
**Objetivo:** Recursos essenciais funcionando 100%

| Item | Descrição | Prioridade |
|------|-----------|------------|
| ✅ Corrigir endpoints | Usar endpoints corretos da API | CRÍTICO |
| ✅ Corrigir dataKeys | Mapear dataKeys corretamente | CRÍTICO |
| ✅ Corrigir paginação | cursor vs next_page | CRÍTICO |
| ✅ Contact | Listar, Por ID, Por Código, Verificar Existência | ALTA |
| ✅ Property | Listar, Por ID, Por Código | ALTA |
| ✅ Lease | Listar, Por ID, Por Código | ALTA |
| ✅ Invoice | Listar, Por ID | ALTA |
| ✅ User | Para dropdown | ALTA |

**Filtros Fase 1:**
- Contact: contact_type, media_source, user_id
- Property: smart_list, finality, status
- Lease: smart_list
- Invoice: status

**Entregáveis:**
- Auto-paginação funcionando (50, 100, 200, 500, Todos)
- Filtros básicos com dropdowns fixos
- Busca por ID e Código

---

### FASE 2 - Deals e Funil (v2.1.0)
**Objetivo:** Funil de vendas completo

| Item | Descrição |
|------|-----------|
| Deal por Estágio | `/v1/deals` com estrutura especial |
| Deal Busca | `/v1/deals/search` com filtros |
| Pipeline Groups | Para dropdown |
| Pipelines | Para dropdown |
| Lost Reasons | Para dropdown |
| Deal Fields | Campos customizados |

**Filtros:**
- user_id (dropdown dinâmico)
- pipeline_group_id (dropdown dinâmico)
- pipeline_id (dropdown dinâmico)
- deal_status (dropdown fixo)
- show_activities

---

### FASE 3 - Financeiro (v2.2.0)
**Objetivo:** Transações financeiras

| Item | Descrição |
|------|-----------|
| Transaction | Listar com paginação next_page |
| Bank | Para dropdown |

---

### FASE 4 - Calendário e Extras (v2.3.0)
**Objetivo:** Funcionalidades complementares

| Item | Descrição |
|------|-----------|
| Calendar | year/month obrigatórios, item_type |
| Document | Por contact ou property |
| Property Statistics | Estatísticas |
| Property Adverts | Anúncios em portais |
| Notifications | Lista |
| Webhooks | Lista |

**Filtros Calendário:**
- year (campo numérico)
- month (dropdown 1-12)
- user_id (dropdown dinâmico)
- item_type (dropdown fixo)

---

### FASE 5 - Dropdowns Dinâmicos (v2.4.0)
**Objetivo:** UX aprimorada

| Item | Descrição |
|------|-----------|
| Media Sources | Dropdown dinâmico de origens |
| Contact Tags | Dropdown dinâmico de tags |
| Property Types | Dropdown dinâmico de tipos |
| Property Features | Dropdown dinâmico de características |

---

## 📝 CHECKLIST TÉCNICO FASE 1

### Correções Obrigatórias

- [ ] Endpoint de transações: `/v1/financial/transactions`
- [ ] Endpoint de contato por ID: `/v1/person/{id}` (não `/v1/contact/{id}`)
- [ ] DataKey contacts: `contacts`
- [ ] DataKey properties: `properties`
- [ ] DataKey leases: `leases`
- [ ] DataKey invoices: `invoices`
- [ ] DataKey transactions: `transactions`
- [ ] Paginação invoices: `next_page` (número)
- [ ] Paginação transactions: `next_page` (número)
- [ ] Limite contacts: Ignorar (sempre 50), paginar via cursor
- [ ] Limite outros: max 50, paginar para mais

### Estrutura do Node

```
nodes/
  Imobzi/
    Imobzi.node.ts        # Node principal
    Imobzi.node.json      # Metadados
    imobzi.svg            # Ícone
    GenericFunctions.ts   # Funções auxiliares (novo)
    descriptions/         # Opções por recurso (novo)
      ContactDescription.ts
      PropertyDescription.ts
      LeaseDescription.ts
      InvoiceDescription.ts
      DealDescription.ts
      TransactionDescription.ts
      CalendarDescription.ts
      DocumentDescription.ts
```

### Testes Manuais Fase 1

1. [ ] Contact - Listar sem filtros
2. [ ] Contact - Listar com contact_type=person
3. [ ] Contact - Buscar por ID
4. [ ] Contact - Buscar por Código
5. [ ] Contact - Verificar Existência
6. [ ] Property - Listar sem filtros
7. [ ] Property - Listar com smart_list=available
8. [ ] Property - Buscar por ID
9. [ ] Property - Buscar por Código
10. [ ] Lease - Listar
11. [ ] Lease - Buscar por ID
12. [ ] Invoice - Listar
13. [ ] Invoice - Listar com status=paid
14. [ ] Invoice - Buscar por ID
15. [ ] Auto-paginação 100 registros
16. [ ] Auto-paginação 200 registros

---

## 📊 RESUMO FINAL

### O que temos:
- **77 endpoints funcionais** testados
- **8 recursos principais** para o node
- **8+ recursos auxiliares** para dropdowns
- **Documentação completa** com exemplos

### O que NÃO temos:
- Deal por ID (bug da API)
- Timeline (bug da API)
- Várias configs internas (categories, subcategories, etc.)

### Prioridades:
1. **FASE 1** - Core funcionando 100% (Contact, Property, Lease, Invoice)
2. **FASE 2** - Deals completo
3. **FASE 3** - Transações
4. **FASE 4** - Calendário e extras
5. **FASE 5** - UX com dropdowns dinâmicos

---

**Próximo passo:** Implementar FASE 1 com foco em corrigir os problemas identificados.

