# 📚 GUIA COMPLETO DA API IMOBZI v2.0

**Data:** 11/12/2025  
**Total de Testes:** 101  
**Sucesso:** 77 | **Erro:** 24

---

## 📊 TABELA RESUMO - ENDPOINTS QUE FUNCIONAM

| Recurso | Listar | Por ID | Por Código | DataKey | Paginação |
|---------|--------|--------|------------|---------|-----------|
| Contacts | ✅ `/v1/contacts` | ✅ `/v1/person/{id}` | ✅ `/v1/person/code/{code}` | `contacts` | `cursor` |
| Properties | ✅ `/v1/properties` | ✅ `/v1/property/{id}` | ✅ `/v1/property/code/{code}` | `properties` | `cursor` |
| Leases | ✅ `/v1/leases` | ✅ `/v1/lease/{id}` | ✅ `/v1/lease/code/{code}` | `leases` | `cursor` |
| Invoices | ✅ `/v1/invoices` | ✅ `/v1/invoice/{id}` | ❌ | `invoices` | `next_page` |
| Deals | ✅ `/v1/deals` | ❌ (erro 500) | ❌ | especial | - |
| Deals Search | ✅ `/v1/deals/search` | - | - | `deals` | `cursor` |
| Transactions | ✅ `/v1/financial/transactions` | ❌ | ❌ | `transactions` | `next_page` |
| Calendar | ✅ `/v1/calendar` | ❌ | ❌ | `calendar_items` | `cursor_fw/rw` |
| Documents | ✅ `/v1/documents` | ❌ | ❌ | `documents` | - |

---

## 👤 USUÁRIOS

### Listar Usuários
```
GET /v1/users
```
- **Tipo:** Array direto
- **⚠️ ID é STRING:** `"P1ibK4GFPqZYKIx9e55RpQobt7J2"`

---

## 📇 CONTATOS

### Listar Contatos
```
GET /v1/contacts
```

**Parâmetros:**
| Parâmetro | Funciona | Valores |
|-----------|----------|---------|
| `limit` | ⚠️ IGNORADO | Sempre 50 |
| `cursor` | ✅ | string base64 |
| `contact_type` | ✅ | `person`, `organization`, `lead` |
| `media_source` | ✅ | Ex: `OLX`, `Site` |
| `tags` | ✅ | Ex: `contact`, `owner` |
| `user_id` | ✅ | ID do usuário |
| `manager_id` | ✅ | ID do gestor |
| `smart_list` | ✅ | Ver lista abaixo |

**Valores de `smart_list` para Contatos:**
```
all, my_contacts, my_leads, birthdays_all, birthdays_only_mine,
without_deals, with_deals, shared_with_me, shared_with_others,
out_of_date, new_contacts, new_leads, pending, inactives,
without_interest, out_of_date_90_days
```

### Buscar Contatos
```
GET /v1/contacts/search
```
Mesmos parâmetros que listar.

### Verificar Existência ✅ TODOS FUNCIONAM
```
GET /v1/contact/exists?email=xxx          ✅
GET /v1/contact/exists?cpf=xxx            ✅
GET /v1/contact/exists?cnpj=xxx           ✅
GET /v1/contact/exists?phone_number=xxx   ✅
```

### Buscar por ID/Código
```
GET /v1/person/{id}         ✅ Pessoa por ID
GET /v1/person/code/{code}  ✅ Pessoa por Código
GET /v1/organization/{id}   ⚠️ A testar
GET /v1/lead/{id}           ⚠️ A testar
```

### Tags de Contato
```
GET /v1/contacts/tags  ✅ DataKey: tags
```

### Media Sources (Origens)
```
GET /v1/media-sources        ✅ Array direto
GET /v1/media-sources-report ✅ Relatório
```

---

## 🏠 IMÓVEIS

### Listar Imóveis
```
GET /v1/properties
```

**Parâmetros:**
| Parâmetro | Funciona | Valores |
|-----------|----------|---------|
| `limit` | ✅ | 1-50 |
| `cursor` | ✅ | string JWT |
| `smart_list` | ✅ | Ver lista abaixo |
| `finality` | ✅ | `residential`, `commercial`, `rural` |
| `status` | ✅ | `available`, `reserved`, `unavailable` |
| `user_id` | ✅ | ID do corretor |

**Valores de `smart_list` para Imóveis:**
```
all, available, available_reserved, buildings, my_properties,
properties_third_party, properties_with_plaque, shared_with_me,
shared_with_others, out_of_date, site_no_publish, site_publish,
without_photos, new_properties, pending, updated_by_owner,
inactives, with_plaque, reserved, unavailable_properties,
rent, sale, vacation_rental, exceeding, outdated, updated,
without_location, properties_without_owner
```

### Buscar por ID/Código
```
GET /v1/property/{id}         ✅ Completo (com fotos, características)
GET /v1/property/code/{code}  ✅ Completo
```

### Verificar Existência
```
GET /v1/property/exists?code=xxx  ✅
```

### Estatísticas do Imóvel ✅ NOVO!
```
GET /v1/property/{id}/statistics
```
Retorna: visualizações, contatos, etc.

### Deals Relacionados
```
GET /v1/property/{id}/deals-match  ✅
```

### Tipos de Imóvel
```
GET /v1/property-types  ✅ Array direto
```

### Características (Features)
```
GET /v1/property-features  ✅ DataKey: Imóvel
```

### Anúncios (Adverts) ✅ NOVO!
```
GET /v1/property-adverts  ✅ DataKey: adverts
```
Lista todos os anúncios de imóveis em portais.

### Buildings (Edifícios)
```
GET /v1/property-buildings/search?search_text=xxx  ✅ Array direto
```

---

## 📋 LOCAÇÕES

### Listar Locações
```
GET /v1/leases
```

**Parâmetros:**
| Parâmetro | Funciona | Valores |
|-----------|----------|---------|
| `limit` | ✅ | 1-50 |
| `cursor` | ✅ | string |
| `smart_list` | ✅ | `active`, `inactive` |

### Buscar por ID/Código
```
GET /v1/lease/{id}         ✅ Completo
GET /v1/lease/code/{code}  ✅ Completo
```

---

## 💰 FATURAS

### Listar Faturas
```
GET /v1/invoices
```

**Parâmetros:**
| Parâmetro | Funciona | Valores |
|-----------|----------|---------|
| `limit` | ✅ | 1-50 |
| `next_page` | ✅ | número |
| `status` | ✅ | `pending`, `paid`, `overdue`, `cancelled` |

**⚠️ PAGINAÇÃO DIFERENTE:** Usa `next_page` (número), não `cursor`!

### Buscar por ID
```
GET /v1/invoice/{id}  ✅ Completo (com itens, histórico)
```

---

## 🎯 DEALS / FUNIL

### Pipeline Groups (Grupos de Funil)
```
GET /v1/pipeline-groups  ✅ Array direto
```

### Pipelines (Estágios)
```
GET /v1/pipelines  ✅ Array direto
```

### Listar Deals por Estágio (Visão Kanban)
```
GET /v1/deals
```

**Parâmetros:**
| Parâmetro | Funciona | Valores |
|-----------|----------|---------|
| `user_id` | ✅ | ID do corretor |
| `pipeline_group_id` | ✅ | ID do grupo |
| `deal_status` | ✅ | Ver lista abaixo |

**Valores de `deal_status`:**
```
all, stagnant, in progress, out_of_date, win, lost, property_radar
```

**⚠️ NÃO EXISTE:** `open`, `closed`

**Estrutura de Resposta (especial):**
```json
{
  "4584666827849728": { "stage_name": "Oportunidades", "deals": [...] },
  "6005926736691200": { "stage_name": "Qualificação", "deals": [...] },
  "cursor_all_stages": "++++++",
  "total_deals": 0
}
```

### Buscar Deals (Lista Plana)
```
GET /v1/deals/search
```

**Parâmetros:**
| Parâmetro | Funciona | Valores |
|-----------|----------|---------|
| `limit` | ✅ | 1-50 |
| `cursor` | ✅ | string JWT |
| `user_id` | ✅ | ID do corretor |
| `pipeline_id` | ✅ | ID do estágio |
| `deal_status` | ✅ | Ver lista acima |
| `show_activities` | ✅ | `true/false` |

### Campos de Deal
```
GET /v1/deal-fields  ✅
```

### Motivos de Perda
```
GET /v1/deal/lost-reason  ✅ DataKey: deals_lost_reasons
```

---

## 💳 TRANSAÇÕES FINANCEIRAS

### Listar Transações
```
GET /v1/financial/transactions  ✅
```

**⚠️ ENDPOINT CORRETO:** Com barra `/financial/transactions`

**❌ NÃO FUNCIONAM:**
- `/v1/transactions`
- `/v1/financial-transactions`

**Parâmetros:**
| Parâmetro | Funciona | Valores |
|-----------|----------|---------|
| `limit` | ✅ | 1-50 |
| `next_page` | ✅ | número |

---

## 📅 CALENDÁRIO

### Listar Itens
```
GET /v1/calendar?year=2025&month=12
```

**Parâmetros OBRIGATÓRIOS:**
| Parâmetro | Obrigatório | Valores |
|-----------|-------------|---------|
| `year` | ✅ SIM | Ex: 2025 |
| `month` | ✅ SIM | 1-12 |

**Parâmetros opcionais:**
| Parâmetro | Funciona | Valores |
|-----------|----------|---------|
| `user_id` | ✅ | ID do usuário |
| `item_type` | ✅ | Ver lista abaixo |

**Valores de `item_type`:**
```
task, visit, whatsapp, call
```

**❌ NÃO EXISTE:** `event`

---

## 📄 DOCUMENTOS ✅ NOVO!

### Listar Documentos
```
GET /v1/documents
```

**Parâmetros:**
| Parâmetro | Funciona | Descrição |
|-----------|----------|-----------|
| `limit` | ✅ | 1-50 |
| `contact_id` | ✅ | Docs do contato |
| `property_id` | ✅ | Docs do imóvel |

---

## 🔔 NOTIFICAÇÕES ✅ NOVO!

```
GET /v1/notifications  ✅ DataKey: notifications
```

---

## 🔗 WEBHOOKS ✅ NOVO!

```
GET /v1/webhooks  ✅ Array direto
```
Lista webhooks configurados.

---

## 🏦 BANCOS ✅ NOVO!

```
GET /v1/banks  ✅ Array direto
```
Lista de bancos disponíveis.

---

## ❌ ENDPOINTS QUE NÃO FUNCIONAM

| Endpoint | Erro | Alternativa |
|----------|------|-------------|
| `/v1/contact/{id}` | 404 | Usar `/v1/person/{id}` |
| `/v1/transactions` | 400 | Usar `/v1/financial/transactions` |
| `/v1/financial-transactions` | 400 | Usar `/v1/financial/transactions` |
| `/v1/deal/{id}` | 500 | ❌ Não disponível |
| `/v1/timeline` | 500 | ❌ Bug da API |
| `/v1/accounts` | 400 | ❌ Não disponível |
| `/v1/teams` | 400 | ❌ Não disponível |
| `/v1/calendar-types` | 401 | ❌ Sem autorização |
| `/v1/readjustments` | 400 | ❌ Não disponível |
| `/v1/categories` | 400 | ❌ Não disponível |
| `/v1/subcategories` | 400 | ❌ Não disponível |
| `/v1/guarantee-types` | 400 | ❌ Não disponível |
| `/v1/custom-fields` | 400 | ❌ Não disponível |
| `/v1/property/neighborhoods` | 401 | ❌ Sem autorização |
| `/v1/property/{id}/calendar-items` | 401 | ❌ Sem autorização |
| `/v1/property/{id}/views` | 405 | ❌ Método não permitido |

---

## 📝 NOTAS IMPORTANTES

### Tipos de Paginação

| Tipo | Endpoints | Como usar |
|------|-----------|-----------|
| `cursor` (base64) | contacts, contacts/search | `?cursor=xxx` |
| `cursor` (JWT) | properties, deals/search | `?cursor=xxx` |
| `cursor` | leases | `?cursor=xxx` |
| `next_page` | invoices, transactions | `?next_page=2` |
| `cursor_fw/rw` | calendar | Forward/Backward |

### IDs

| Recurso | Tipo | Exemplo |
|---------|------|---------|
| Users | STRING | `"P1ibK4GFPqZYKIx9e55RpQobt7J2"` |
| Contacts | STRING numérica | `"5352720932798464"` |
| Properties | STRING numérica | `"4550464861896704"` |
| Leases | NUMBER | `5987740112388096` |
| Pipelines | NUMBER | `4584666827849728` |
| Invoices | STRING UUID | `"536edb56c6cb11f0..."` |

### Limite de Registros

| Recurso | Limite | Nota |
|---------|--------|------|
| Contacts | ⚠️ 50 fixo | `limit` é IGNORADO |
| Properties | 50 máx | `limit` funciona |
| Leases | 50 máx | `limit` funciona |
| Invoices | 50 máx | `limit` funciona |
| Deals | 50 máx | `limit` funciona |
| Transactions | 50 máx | `limit` funciona |

---

## 🎯 RECURSOS PARA O NODE n8n

### Recursos Principais (CRUD)
1. **Contact** - Listar, Buscar ID, Buscar Código, Verificar Existência
2. **Property** - Listar, Buscar ID, Buscar Código, Estatísticas
3. **Lease** - Listar, Buscar ID, Buscar Código
4. **Invoice** - Listar, Buscar ID
5. **Deal** - Listar por Estágio, Buscar (lista plana)
6. **Transaction** - Listar
7. **Calendar** - Listar (year/month obrigatórios)
8. **Document** - Listar

### Recursos Auxiliares (Leitura)
1. **User** - Listar (para dropdowns)
2. **Pipeline** - Listar estágios
3. **Pipeline Group** - Listar grupos
4. **Property Type** - Listar tipos
5. **Property Feature** - Listar características
6. **Property Advert** - Listar anúncios
7. **Media Source** - Listar origens
8. **Contact Tag** - Listar tags
9. **Lost Reason** - Listar motivos de perda
10. **Bank** - Listar bancos
11. **Webhook** - Listar webhooks
12. **Notification** - Listar notificações

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1 - Core
- [ ] Contact (com filtros: contact_type, media_source, tags, user_id, manager_id, smart_list)
- [ ] Property (com filtros: smart_list, finality, status, user_id)
- [ ] Lease (com filtros: smart_list)
- [ ] Invoice (com filtros: status)
- [ ] User (para dropdown)

### Fase 2 - Deals
- [ ] Deal por estágio (`/v1/deals`)
- [ ] Deal busca (`/v1/deals/search` com filtros)
- [ ] Pipeline e Pipeline Group (auxiliar)
- [ ] Lost Reason (auxiliar)

### Fase 3 - Financeiro
- [ ] Transaction (`/v1/financial/transactions`)
- [ ] Bank (auxiliar)

### Fase 4 - Calendário e Extras
- [ ] Calendar (year/month obrigatórios, item_type)
- [ ] Document
- [ ] Property Statistics
- [ ] Property Advert
- [ ] Notification
- [ ] Webhook


