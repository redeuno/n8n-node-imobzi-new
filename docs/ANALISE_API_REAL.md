# 🔍 ANÁLISE REAL DA API IMOBZI

**Data:** 11/12/2025
**Testado com:** API Key real em produção

---

## 📊 RESUMO DOS ENDPOINTS TESTADOS

### ✅ FUNCIONAM CORRETAMENTE

| Recurso | Endpoint | DataKey | Paginação | Limit Funciona |
|---------|----------|---------|-----------|----------------|
| Contatos (Listar) | `/v1/contacts` | `contacts` | `cursor` | ❌ Sempre 50 |
| Pessoa (por ID) | `/v1/person/{id}` | objeto direto | - | - |
| Pessoa (por código) | `/v1/person/code/{code}` | objeto direto | - | - |
| Verificar contato (email) | `/v1/contact/exists?email=xxx` | objeto direto | - | - |
| Verificar contato (cpf) | `/v1/contact/exists?cpf=xxx` | objeto direto | - | - |
| Imóveis (Listar) | `/v1/properties` | `properties` | `cursor` | ✅ |
| Imóvel (por ID) | `/v1/property/{id}` | objeto direto | - | - |
| Imóvel (por código) | `/v1/property/code/{code}` | objeto direto | - | - |
| Locações (Listar) | `/v1/leases` | `leases` | `cursor` | ✅ |
| Locação (por ID) | `/v1/lease/{id}` | objeto direto | - | - |
| Locação (por código) | `/v1/lease/code/{code}` | objeto direto | - | - |
| Faturas (Listar) | `/v1/invoices` | `invoices` | `next_page` | ✅ |
| Fatura (por ID) | `/v1/invoice/{id}` | objeto direto | - | - |
| Deals (por estágio) | `/v1/deals` | estrutura especial | `cursor_all_stages` | - |
| Deals (busca plana) | `/v1/deals/search` | `deals` | `cursor` | ✅ |
| Transações | `/v1/financial/transactions` | `transactions` | `next_page` | ✅ |
| Pipelines | `/v1/pipelines` | array direto | - | - |
| Pipeline Groups | `/v1/pipeline-groups` | array direto | - | - |
| Tipos de Imóvel | `/v1/property-types` | array direto | - | - |
| Usuários | `/v1/users` | array direto | - | - |
| Motivos de Perda | `/v1/deal/lost-reason` | `deals_lost_reasons` | - | - |
| Calendário | `/v1/calendar?year=&month=` | `calendar_items` | `cursor_fw/rw` | - |

### ❌ NÃO FUNCIONAM / NÃO EXISTEM

| Endpoint | Erro | Observação |
|----------|------|------------|
| `/v1/contact/{id}` | 404 | Usar `/v1/person/{id}` ou `/v1/organization/{id}` |
| `/v1/financial-transactions` | 400 | Usar `/v1/financial/transactions` |
| `/v1/transactions` | 400 | Não existe |
| `/v1/onlendings` | 400 | Não existe |
| `/v1/teams` | 400 | Não existe |
| `/v1/accounts` | 400 | Não existe |
| `/v1/calendar-types` | 401 | Sem autorização |
| `/v1/contact/exists?phone=xxx` | 400 | Telefone não funciona |
| `/v1/deal/{id}` | 500 | Erro interno do servidor |

---

## 📋 DETALHES POR RECURSO

### 1. CONTATOS

**Listar:**
```
GET /v1/contacts
```
- **DataKey:** `contacts`
- **Paginação:** `cursor` (base64)
- **⚠️ IMPORTANTE:** O parâmetro `limit` é IGNORADO, sempre retorna 50 registros
- **Filtros que funcionam:**
  - `media_source` (ex: "OLX")
  - `contact_type` (ex: "person", "organization", "lead")
- **Resposta:**
```json
{
  "contacts": [...],
  "cursor": "base64string",
  "count": 16045,
  "count_pending": 0
}
```

**Buscar por ID:**
```
GET /v1/person/{id}      ✅ Funciona
GET /v1/organization/{id} ⚠️ A testar
GET /v1/contact/{id}     ❌ NÃO EXISTE (404)
```

**Buscar por Código:**
```
GET /v1/person/code/{code}       ✅ Funciona
GET /v1/organization/code/{code} ⚠️ A testar
```

**Verificar Existência:**
```
GET /v1/contact/exists?email=xxx  ✅ Funciona
GET /v1/contact/exists?cpf=xxx    ✅ Funciona
GET /v1/contact/exists?phone=xxx  ❌ NÃO FUNCIONA (400)
```

---

### 2. IMÓVEIS

**Listar:**
```
GET /v1/properties?limit=50&smart_list=available
```
- **DataKey:** `properties`
- **Paginação:** `cursor` (JWT)
- **`limit` funciona:** Sim (máx 50)
- **Filtros que funcionam:**
  - `smart_list`: all, available, available_reserved, buildings, my_properties, properties_third_party, properties_with_plaque, shared_with_me, shared_with_others, out_of_date, site_no_publish, site_publish, without_photos, new_properties, pending, updated_by_owner, inactives, with_plaque, reserved, unavailable_properties, rent, sale, vacation_rental, exceeding, outdated, updated, without_location, properties_without_owner

**Buscar por ID:**
```
GET /v1/property/{id}  ✅ Funciona (retorna dados completos)
```

**Buscar por Código:**
```
GET /v1/property/code/{code}  ✅ Funciona (retorna dados completos)
```

---

### 3. LOCAÇÕES

**Listar:**
```
GET /v1/leases?limit=50&smart_list=active
```
- **DataKey:** `leases`
- **Paginação:** `cursor`
- **`limit` funciona:** Sim
- **Filtros:**
  - `smart_list`: active, inactive, etc.

**Buscar por ID/Código:**
```
GET /v1/lease/{id}        ✅ Funciona
GET /v1/lease/code/{code} ✅ Funciona
```

---

### 4. FATURAS

**Listar:**
```
GET /v1/invoices?limit=50&status=paid
```
- **DataKey:** `invoices`
- **Paginação:** `next_page` (diferente dos outros!)
- **`limit` funciona:** Sim
- **Filtros:**
  - `status`: pending, paid, overdue, cancelled

**Buscar por ID:**
```
GET /v1/invoice/{id}  ✅ Funciona
```

---

### 5. DEALS (Funil)

**Listar por Estágio (estrutura agrupada):**
```
GET /v1/deals
```
- **Estrutura especial:** Retorna objeto com IDs de stages como chaves
```json
{
  "4584666827849728": { "stage_name": "Oportunidades", "deals": [], "cursor": null, "count": 0, "total": 0 },
  "6005926736691200": { "stage_name": "Qualificação", "deals": [], ... },
  ...
  "cursor_all_stages": "++++++",
  "total_deals": 0
}
```

**Busca Plana (lista simples):**
```
GET /v1/deals/search?limit=50
```
- **DataKey:** `deals`
- **Paginação:** `cursor`
- **Filtros válidos:**
  - `deal_status`: `all`, `stagnant`, `in progress`, `out_of_date`, `win`, `lost`, `property_radar`

**⚠️ ATENÇÃO:** `deal_status=open` NÃO EXISTE! Erro 422.

---

### 6. TRANSAÇÕES FINANCEIRAS

**Listar:**
```
GET /v1/financial/transactions?limit=50
```
- **⚠️ ENDPOINT CORRETO:** `/v1/financial/transactions` (com barra!)
- **DataKey:** `transactions`
- **Paginação:** `next_page`

**❌ NÃO FUNCIONA:**
- `/v1/financial-transactions`
- `/v1/transactions`

---

### 7. CALENDÁRIO

**Listar:**
```
GET /v1/calendar?year=2025&month=12
```
- **DataKey:** `calendar_items`
- **Paginação:** `cursor_fw`, `cursor_rw`
- **⚠️ OBRIGATÓRIO:** `year` e `month` são parâmetros obrigatórios

---

### 8. AUXILIARES (Array Direto)

```
GET /v1/pipelines         → Array de pipelines
GET /v1/pipeline-groups   → Array de grupos
GET /v1/property-types    → Array de tipos de imóvel
GET /v1/users             → Array de usuários
GET /v1/deal/lost-reason  → { "deals_lost_reasons": [...] }
```

---

## 🔧 PROBLEMAS IDENTIFICADOS NO NODE ATUAL

### 1. DataKeys Errados
O node não está extraindo corretamente os dados do response.

### 2. Endpoint de Transações Errado
- ❌ Atual: `/v1/financial-transactions`
- ✅ Correto: `/v1/financial/transactions`

### 3. Busca de Contato por ID
- ❌ Atual: `/v1/contact/{id}`
- ✅ Correto: `/v1/person/{id}` ou `/v1/organization/{id}`

### 4. Paginação Mista
- `contacts`, `properties`, `leases`, `deals/search`: usam `cursor`
- `invoices`, `transactions`: usam `next_page`

### 5. Limite em Contacts
O `limit` é IGNORADO pela API. Sempre retorna 50. Precisa paginar via cursor.

### 6. Deals tem 2 formatos
- `/v1/deals` → estrutura agrupada por estágio
- `/v1/deals/search` → lista plana

### 7. Deal Status Errado
- ❌ Valores errados: `open`, `closed`
- ✅ Valores corretos: `all`, `stagnant`, `in progress`, `out_of_date`, `win`, `lost`, `property_radar`

---

## ✅ PLANO DE CORREÇÃO

### Prioridade 1: Corrigir DataKeys e Endpoints
1. Mapear todos os dataKeys corretamente
2. Corrigir endpoint de transações
3. Corrigir endpoint de contato por ID

### Prioridade 2: Corrigir Paginação
1. Implementar lógica para `cursor` (contacts, properties, leases, deals)
2. Implementar lógica para `next_page` (invoices, transactions)
3. Ignorar `limit` para contacts (sempre paginar)

### Prioridade 3: Corrigir Filtros
1. Atualizar opções de `deal_status`
2. Validar todos os filtros

### Prioridade 4: Separar Deals
1. Operação "Listar por Estágio" → `/v1/deals`
2. Operação "Buscar" → `/v1/deals/search`

---

## 📝 NOTAS ADICIONAIS

- A API sempre retorna 50 registros para contacts, independente do `limit`
- Alguns endpoints auxiliares não estão disponíveis (teams, accounts, calendar-types)
- O endpoint de deal por ID retorna erro 500 (bug da API)
- Verificação de contato só funciona com email e CPF, não com telefone

