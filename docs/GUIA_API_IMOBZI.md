# 📚 GUIA COMPLETO DA API IMOBZI

**Data:** 11/12/2025  
**Baseado em:** Testes reais com API de produção

---

## 📊 RESUMO RÁPIDO

### Endpoints Principais

| Recurso | Listar | Por ID | Por Código |
|---------|--------|--------|------------|
| Contatos | `/v1/contacts` | `/v1/person/{id}` ou `/v1/organization/{id}` | `/v1/person/code/{code}` |
| Imóveis | `/v1/properties` | `/v1/property/{id}` | `/v1/property/code/{code}` |
| Locações | `/v1/leases` | `/v1/lease/{id}` | `/v1/lease/code/{code}` |
| Faturas | `/v1/invoices` | `/v1/invoice/{id}` | ❌ |
| Deals | `/v1/deals` ou `/v1/deals/search` | ❌ (erro 500) | ❌ |
| Transações | `/v1/financial/transactions` | ❌ | ❌ |
| Calendário | `/v1/calendar` | ❌ | ❌ |

### DataKeys por Recurso

| Endpoint | DataKey | Paginação |
|----------|---------|-----------|
| `/v1/contacts` | `contacts` | `cursor` |
| `/v1/properties` | `properties` | `cursor` |
| `/v1/leases` | `leases` | `cursor` |
| `/v1/invoices` | `invoices` | `next_page` |
| `/v1/deals` | (estrutura especial) | `cursor_all_stages` |
| `/v1/deals/search` | `deals` | `cursor` |
| `/v1/financial/transactions` | `transactions` | `next_page` |
| `/v1/calendar` | `calendar_items` | `cursor_fw` / `cursor_rw` |
| `/v1/users` | (array direto) | - |
| `/v1/pipelines` | (array direto) | - |
| `/v1/pipeline-groups` | (array direto) | - |
| `/v1/property-types` | (array direto) | - |

---

## 👤 USUÁRIOS (Users)

### Listar Usuários
```
GET /v1/users
```

**Resposta:** Array direto de objetos

```json
[
  {
    "database": "ac-dfzv24117ahkn",
    "db_id": "P1ibK4GFPqZYKIx9e55RpQobt7J2",  // ⚠️ ID é STRING, não número!
    "fullname": "Antonio Carlos",
    "function": "",
    "profile_image_url": null,
    "active": true,
    "email": "militaoa@gmail.com",
    "phones": [
      {
        "country_code": "+55",
        "number": "(67) 99874-7553",
        "alpha2Code": "br",
        "type": "mobile"
      }
    ]
  }
]
```

**⚠️ IMPORTANTE:** O `db_id` do usuário é uma STRING, não um número!

---

## 📇 CONTATOS (Contacts)

### Listar Contatos
```
GET /v1/contacts
```

**Parâmetros:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `limit` | number | ⚠️ IGNORADO! Sempre retorna 50 |
| `cursor` | string | Cursor para paginação |
| `contact_type` | string | `person`, `organization`, `lead` |
| `media_source` | string | Ex: `OLX`, `Site`, etc |
| `active` | boolean | Filtrar por ativos |
| `favorite` | boolean | Filtrar favoritos |
| `user_id` | string | ID do usuário responsável |
| `manager_id` | string | ID do gestor |

**Resposta:**
```json
{
  "contacts": [
    {
      "contact_id": "5352720932798464",  // ID numérico como STRING
      "code": "10063",
      "contact_type": "person",
      "name": "Alexandre Rezende",
      "fullname": "Alexandre Rezende",
      "email": "",
      "emails": [],
      "phones": [...],
      "tags": ["contact", "1 Milhão à 2 Milhões"],
      "media_source": "Nenhum",
      "favorite": true,
      "active": true,
      "created_at": "2025-03-13T16:49:46.213252",
      "updated_at": "2025-04-17T20:32:26.955575",
      "_metadata": {
        "cursor": "base64...",
        "count": 16045
      }
    }
  ],
  "cursor": "base64string",
  "count": 16045,
  "count_pending": 0
}
```

### Buscar Pessoa por ID
```
GET /v1/person/{id}
```

**⚠️ NÃO EXISTE:** `/v1/contact/{id}` (retorna 404)

**Resposta:** Objeto completo com todos os detalhes

### Buscar Pessoa por Código
```
GET /v1/person/code/{code}
```

### Verificar Existência
```
GET /v1/contact/exists?email=xxx
GET /v1/contact/exists?cpf=xxx
```

**⚠️ NÃO FUNCIONA:** `?phone=xxx` (retorna 400)

---

## 🏠 IMÓVEIS (Properties)

### Listar Imóveis
```
GET /v1/properties
```

**Parâmetros:**
| Parâmetro | Tipo | Valores |
|-----------|------|---------|
| `limit` | number | 1-50 (funciona!) |
| `cursor` | string | Cursor para paginação |
| `smart_list` | string | Ver lista abaixo |
| `finality` | string | `residential`, `commercial`, `rural` |
| `status` | string | `available`, `reserved`, `unavailable` |
| `user_id` | string | ID do corretor responsável |

**Valores de `smart_list`:**
- `all`, `available`, `available_reserved`, `buildings`
- `my_properties`, `properties_third_party`, `properties_with_plaque`
- `shared_with_me`, `shared_with_others`, `out_of_date`
- `site_no_publish`, `site_publish`, `without_photos`
- `new_properties`, `pending`, `updated_by_owner`
- `inactives`, `with_plaque`, `reserved`
- `unavailable_properties`, `rent`, `sale`, `vacation_rental`
- `exceeding`, `outdated`, `updated`, `without_location`
- `properties_without_owner`

**Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "jwt...",
  "count": 166,
  "count_without_location": 0,
  "count_pending": 0,
  "count_review": 0,
  "properties": [
    {
      "db_id": "4550464861896704",  // STRING!
      "code": "326",
      "address": "Rua Santos, 66",
      "neighborhood": "Jardim Sao Bento",
      "city": "Campo Grande",
      "state": "MS",
      "status": "available",
      "property_type": "Sobrado",
      "finality": "residential",
      "sale_value": 6200000,
      "rental_value": 0,
      "area": 766,
      "bedroom": 5,
      "bathroom": 8,
      "garage": 4,
      "cover_photo": {...},
      "_metadata": {
        "cursor": "jwt...",
        "count": 166
      }
    }
  ]
}
```

### Buscar por ID / Código
```
GET /v1/property/{id}
GET /v1/property/code/{code}
```

---

## 📋 LOCAÇÕES (Leases)

### Listar Locações
```
GET /v1/leases
```

**Parâmetros:**
| Parâmetro | Tipo | Valores |
|-----------|------|---------|
| `limit` | number | 1-50 |
| `cursor` | string | Cursor para paginação |
| `smart_list` | string | `active`, `inactive`, etc |

**Resposta:**
```json
{
  "leases": [
    {
      "db_id": 5987740112388096,  // NUMBER!
      "code": "15",
      "lease_type": "residential",
      "value": 6313.51,
      "status": "active",
      "start_at": "2025-12-01T00:00:00.000000Z",
      "end_at": "2029-11-30T00:00:00.000000Z",
      "property": {...},
      "tenants": [...],
      "owners": [...],
      "beneficiaries": [...]
    }
  ],
  "cursor": null,
  "count": 12,
  "value_total": ...,
  "management_fee_total": ...
}
```

---

## 💰 FATURAS (Invoices)

### Listar Faturas
```
GET /v1/invoices
```

**Parâmetros:**
| Parâmetro | Tipo | Valores |
|-----------|------|---------|
| `limit` | number | 1-50 |
| `next_page` | number | ⚠️ Paginação diferente! |
| `status` | string | `pending`, `paid`, `overdue`, `cancelled` |

**Resposta:**
```json
{
  "invoices": [
    {
      "invoice_id": "536edb56c6cb11f0822842004e494300",  // STRING UUID
      "status": "paid",
      "due_date": "2025-12-01",
      "total_value": 5263.09,
      "description": "Aluguel ref. 01/11/2025 a 30/11/2025",
      "payment_method": "bank_slip",
      "contact": {...},
      "property": {...},
      "lease": {...}
    }
  ],
  "count": 9,
  "next_page": null,  // ⚠️ USA next_page, NÃO cursor!
  "total": 47865.3,
  "total_paid": ...,
  "total_pending": ...,
  "total_overdue": ...
}
```

---

## 🎯 DEALS (Funil)

### Listar por Estágio (Visão Kanban)
```
GET /v1/deals
```

**Parâmetros:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `user_id` | string | **IMPORTANTE!** Filtrar por corretor |
| `pipeline_group_id` | number | Filtrar por grupo de funil |
| `deal_status` | string | `all`, `stagnant`, `in progress`, `out_of_date`, `win`, `lost`, `property_radar` |

**⚠️ IMPORTANTE:** Sem `user_id`, os deals podem vir vazios!

**Resposta (estrutura especial):**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [...],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [...],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  // ... outros estágios (chaves são os IDs dos pipelines)
  "cursor_all_stages": "++++++",
  "total_pages": 0,
  "total_values": 0,
  "total_deals": 0
}
```

### Buscar Deals (Lista Plana)
```
GET /v1/deals/search
```

**Parâmetros:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `limit` | number | 1-50 |
| `cursor` | string | Cursor para paginação |
| `user_id` | string | Filtrar por corretor |
| `pipeline_id` | number | Filtrar por estágio específico |
| `deal_status` | string | `all`, `stagnant`, `in progress`, `out_of_date`, `win`, `lost`, `property_radar` |
| `show_activities` | boolean | Incluir atividades do deal |

**⚠️ NÃO EXISTE:** `deal_status=open` (use `in progress`)

**Resposta:**
```json
{
  "name": "",
  "database": "ac-dfzv24117ahkn",
  "cursor": "jwt...",
  "count": 2418,
  "deals": [
    {
      "db_id": 5979731189563392,
      "code": "4754",
      "title": "Código 399",
      "status": "in progress",
      "value": 1500000,
      "commission": 0,
      "description": "...",
      "stagnant": false,
      "stage_date": "2025-12-11T09:14:21...",
      "deal_codes": [...],
      "flag": []
    }
  ]
}
```

---

## 💳 TRANSAÇÕES FINANCEIRAS

### Listar Transações
```
GET /v1/financial/transactions
```

**⚠️ ENDPOINT CORRETO:** `/v1/financial/transactions` (com barra!)  
**❌ NÃO FUNCIONA:** `/v1/financial-transactions`

**Parâmetros:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `limit` | number | 1-50 |
| `next_page` | number | ⚠️ Paginação diferente! |

**Resposta:**
```json
{
  "transactions": [
    {
      "transaction_id": "a1285d14db1011eeb2e1837306c406a7",
      "transaction_type": "expense",
      "value": -6078.7,
      "description": "Aluguel Rede Uno - DDA",
      "due_date": "2025-12-05",
      "paid": true,
      "paid_at": "2025-12-05",
      "account": {...},
      "contact": {...}
    }
  ],
  "next_page": null,
  "total": 7405.68,
  "previous_balance": ...,
  "incomes": ...,
  "expenses": ...
}
```

---

## 📅 CALENDÁRIO

### Listar Itens do Calendário
```
GET /v1/calendar
```

**Parâmetros OBRIGATÓRIOS:**
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `year` | number | **OBRIGATÓRIO** Ano (ex: 2025) |
| `month` | number | **OBRIGATÓRIO** Mês (1-12) |

**Parâmetros opcionais:**
| Parâmetro | Tipo | Valores |
|-----------|------|---------|
| `user_id` | string | Filtrar por usuário |
| `item_type` | string | `task`, `visit`, `whatsapp`, `call` |

**⚠️ NÃO EXISTE:** `item_type=event`

**Resposta:**
```json
{
  "calendar_items": [...],
  "holidays": [...],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "..."
}
```

---

## 🔧 AUXILIARES

### Pipeline Groups (Grupos de Funil)
```
GET /v1/pipeline-groups
```

```json
[
  {
    "db_id": 5675099632959488,
    "code": 4755,
    "name": "Geral de Negócios",
    "default": true,
    "pipeline_type": "default",
    "deal_cards_info": [...]
  }
]
```

### Pipelines (Estágios do Funil)
```
GET /v1/pipelines
```

```json
[
  {
    "db_id": 4584666827849728,
    "name": "Oportunidades",
    "position": 1,
    "stagnant_days": 1
  },
  {
    "db_id": 6005926736691200,
    "name": "Qualificação e Interesse",
    "position": 2,
    "stagnant_days": 14
  }
]
```

### Tipos de Imóvel
```
GET /v1/property-types
```

```json
[
  {
    "db_id": "4567443539230720",
    "type": "Prédio Inteiro",
    "finality": "commercial",
    "active": true
  }
]
```

### Motivos de Perda
```
GET /v1/deal/lost-reason
```

```json
{
  "deals_lost_reasons": [
    {
      "db_id": "5081176791318528",
      "name": "Dados de contato inválido",
      "active": true
    }
  ]
}
```

---

## ⚠️ ENDPOINTS QUE NÃO EXISTEM

| Tentativa | Erro | Usar |
|-----------|------|------|
| `/v1/contact/{id}` | 404 | `/v1/person/{id}` |
| `/v1/financial-transactions` | 400 | `/v1/financial/transactions` |
| `/v1/transactions` | 400 | `/v1/financial/transactions` |
| `/v1/deal/{id}` | 500 | ❌ Não disponível |
| `/v1/teams` | 400 | ❌ Não disponível |
| `/v1/accounts` | 400 | ❌ Não disponível |
| `/v1/contact/exists?phone=xxx` | 400 | Usar `email` ou `cpf` |

---

## 📝 NOTAS IMPORTANTES

### Tipos de Paginação

**Cursor (base64 ou JWT):**
- `/v1/contacts` - cursor base64
- `/v1/properties` - cursor JWT
- `/v1/leases` - cursor
- `/v1/deals/search` - cursor JWT

**Next Page (número):**
- `/v1/invoices` - next_page
- `/v1/financial/transactions` - next_page

### IDs

- **Usuários:** STRING (ex: `"P1ibK4GFPqZYKIx9e55RpQobt7J2"`)
- **Contatos:** STRING numérica (ex: `"5352720932798464"`)
- **Imóveis:** STRING numérica (ex: `"4550464861896704"`)
- **Locações:** NUMBER (ex: `5987740112388096`)
- **Pipelines:** NUMBER (ex: `4584666827849728`)
- **Faturas:** STRING UUID (ex: `"536edb56c6cb11f0822842004e494300"`)

### Limites

- **Contatos:** O parâmetro `limit` é IGNORADO, sempre retorna 50
- **Outros:** Máximo 50 por requisição

---

## 🎯 RESUMO PARA O NODE

### Recursos Principais (com CRUD):
1. **Contact** - Listar, Buscar por ID, Buscar por Código, Verificar Existência
2. **Property** - Listar, Buscar por ID, Buscar por Código
3. **Lease** - Listar, Buscar por ID, Buscar por Código
4. **Invoice** - Listar, Buscar por ID
5. **Deal** - Listar por Estágio, Buscar (lista plana)
6. **Transaction** - Listar
7. **Calendar** - Listar (requer year/month)

### Recursos Auxiliares (somente leitura):
1. **User** - Listar (para dropdowns)
2. **Pipeline** - Listar (estágios)
3. **Pipeline Group** - Listar (grupos de funil)
4. **Property Type** - Listar (tipos de imóvel)
5. **Lost Reason** - Listar (motivos de perda)

