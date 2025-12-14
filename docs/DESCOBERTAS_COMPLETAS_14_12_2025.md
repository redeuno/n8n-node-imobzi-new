# 🔬 DESCOBERTAS COMPLETAS - Testes de Combinações

**Data:** 14/12/2025  
**Versão do Node:** v2.11.0

---

## 📊 RESUMO EXECUTIVO

### ✅ O QUE FUNCIONA (não sabíamos antes)

| Recurso | Descoberta | Impacto |
|---------|------------|---------|
| **Deals** | `deal_type=rent` funciona! | 138 deals |
| **Deals** | Status `win`, `stagnant`, `property_radar`, `out_of_date` funcionam | Devem ser adicionados |
| **Locações** | `smart_list` retorna mais que `status` | 15 vs 12 |
| **Faturas** | Com datas retorna mais dados | 25 vs 10 |
| **Transações** | `filter_type` funciona | income=10, expense=42 |
| **Calendário** | `item_type=task` e `whatsapp` funcionam | 461 e 326 itens |

### ❌ O QUE NÃO FUNCIONA

| Recurso | Parâmetro | Erro |
|---------|-----------|------|
| **Deals** | `deal_status=in_progress` | 422 |
| **Deals** | `deal_status=gained` | 422 |
| **Deals** | `deal_type=sale` | 422 |
| **Deals** | `deal_type=both` | 422 |
| **Deals** | `deal_type=lease` | 422 |
| **Faturas** | `status=cancelled` (com 2 L's) | 422 |
| **Faturas** | `payment_method=transfer` | 422 |
| **Calendário** | `user_id=all` | 500 |
| **Calendário** | `item_type=all` | 422 |
| **Calendário** | `item_type=meeting` | 422 |

---

## 👤 CONTATOS

### Smart Lists Testadas
| Smart List | Resultado | Observação |
|------------|-----------|------------|
| `all` | 50 | ✅ Funciona |
| `with_deals` | 50 | ✅ Funciona |
| `without_deals` | 50 | ✅ Funciona |
| `my_contacts` | 0 | Requer user autenticado |
| `my_leads` | 0 | Requer user autenticado |
| `new_contacts` | 50 | ✅ Funciona |
| `new_leads` | 50 | ✅ Funciona |
| `pending` | 50 | ✅ Funciona |
| `inactives` | 4 | ✅ Funciona (poucos inativos) |
| `out_of_date` | 50 | ✅ Funciona |
| `shared_with_me` | 0 | Requer compartilhamento |
| `shared_with_others` | 0 | Requer compartilhamento |

### Contact Types
| Type | Resultado | Observação |
|------|-----------|------------|
| `person` | 50 | ✅ Funciona |
| `organization` | 50 | ✅ Funciona |
| `lead` | 50 | ✅ Funciona |
| `all` | 50 | ✅ Funciona |

### Filtros de Usuário
| Filtro | Resultado | Observação |
|--------|-----------|------------|
| `user_id=Mariana` | 50 | Não filtra (retorna todos) |
| `manager_id=Mariana` | 50 | Não filtra (retorna todos) |

**Conclusão:** Nem `user_id` nem `manager_id` parecem filtrar corretamente em contatos. Sempre retorna 50 (paginação).

---

## 📊 DEALS (NEGÓCIOS)

### 🔴 DESCOBERTA CRÍTICA: Status e Types

#### Status que FUNCIONAM ✅
| Status | Valor | Resultado | Descrição |
|--------|-------|-----------|-----------|
| Todos | `all` | 233 | Todos os deals |
| Ganhos | `win` | **19** | ✅ FUNCIONA! |
| Perdidos | `lost` | 220 | Deals perdidos |
| Estagnados | `stagnant` | **229** | ✅ FUNCIONA! |
| Radar Imóveis | `property_radar` | **100** | ✅ FUNCIONA! |
| +3 Meses | `out_of_date` | **201** | ✅ FUNCIONA! |

#### Status que NÃO FUNCIONAM ❌
| Status | Valor | Erro |
|--------|-------|------|
| Em Progresso | `in_progress` | 422 |
| Ganho | `gained` | 422 |

#### Deal Types
| Type | Valor | Resultado |
|------|-------|-----------|
| Todos | `all` | 233 ✅ |
| Locação | `rent` | **138** ✅ **FUNCIONA!** |
| Venda | `sale` | 422 ❌ |
| Ambos | `both` | 422 ❌ |
| Lease | `lease` | 422 ❌ |

**NOVA DESCOBERTA:** `deal_type=rent` funciona e retorna 138 deals!

### Pipeline Groups
| Grupo | ID | Deals |
|-------|-----|-------|
| Geral de Negócios | `5675099632959488` | 233 |
| Captação de Imóveis | `5370013421666304` | 112 |
| Comissões | `6405034089644032` | 1 |
| Gestão de Solicitações | `6419593693233152` | 0 |
| Gestão de Tarefas | `6594235603091456` | 9 |

### Pipeline ID (Etapas)
| Etapa | Resultado | Observação |
|-------|-----------|------------|
| Em Atendimento | 233 | Não filtra |
| Fechamento | 233 | Não filtra |
| Oportunidades | 233 | Não filtra |
| Negociação | 233 | Não filtra |

**Conclusão:** `pipeline_id` não filtra por etapa. Sempre retorna todos.

### User Específico
| Teste | Resultado |
|-------|-----------|
| `user_id=Mariana` | 44 deals ✅ |
| `user_id=Mariana + Geral` | 44 deals ✅ |
| `user_id=Mariana + status=win` | 1 deal ✅ |

**Conclusão:** Filtro por usuário funciona em deals!

---

## 🏠 IMÓVEIS

### Smart Lists vs Status
| Tipo | Valor | Resultado |
|------|-------|-----------|
| smart_list | `all` | 10 |
| smart_list | `available` | 10 |
| smart_list | `rent` | 10 |
| smart_list | `sale` | 10 |
| status | `available` | 10 |
| status | `unavailable` | 10 |
| status | `rented` | 10 |
| status | `sold` | 10 |

**Conclusão:** Todos retornam 10 (paginação). Filtros parecem não funcionar ou há poucos dados.

### Finality
| Finality | Resultado |
|----------|-----------|
| `residential` | 10 |
| `commercial` | 10 |
| `rural` | 10 |
| `all` | 10 |

**Conclusão:** Mesmo padrão - paginação de 10.

---

## 📋 LOCAÇÕES

### 🔴 DESCOBERTA: smart_list vs status
| Método | Valor | Resultado |
|--------|-------|-----------|
| **smart_list** | `all` | **15** |
| **smart_list** | `active` | **15** |
| **smart_list** | `actives` | **15** |
| status | `active` | 12 |
| status | `all` | 12 |

**IMPORTANTE:** `smart_list` retorna mais dados (15) que `status` (12)!

### Smart Lists Disponíveis
| Smart List | Resultado |
|------------|-----------|
| `all` | 15 |
| `active` | 15 |
| `actives` | 15 |
| `actives_with_invoices_late` | 0 |
| `in_progress` | 15 |
| `expired` | 15 |
| `expiring` | 15 |
| `finished` | 15 |
| `inactive` | 15 |
| `pending` | 15 |
| `renewed` | 15 |

---

## 💰 FATURAS (INVOICES)

### Status
| Status | Resultado | Observação |
|--------|-----------|------------|
| `all` | 10 | ✅ |
| `paid` | 7 | ✅ |
| `pending` | 3 | ✅ |
| `partially_paid` | 0 | ✅ |
| `expired` | 0 | ✅ |
| `canceled` | 0 | ✅ (com 1 L!) |
| `cancelled` | **422** | ❌ (com 2 L's = ERRO) |
| `deleted` | 0 | ✅ |

**IMPORTANTE:** Usar `canceled` (americano), não `cancelled` (britânico)!

### 🔴 DESCOBERTA: Datas fazem diferença!
| Teste | Resultado |
|-------|-----------|
| Sem datas | 10 |
| 2025 completo | **25** |
| status=paid + 2025 | **25** |

**IMPORTANTE:** Sem datas, API retorna só mês atual!

### Métodos de Pagamento
| Método | Resultado |
|--------|-----------|
| `all_payments` | 7 |
| `bank_slip` | 7 |
| `credit_card` | 0 |
| `pix` | 0 |
| `transfer` | **422** ❌ |

---

## 💳 TRANSAÇÕES FINANCEIRAS

### Filter Types
| Type | Resultado |
|------|-----------|
| `all` | 56 |
| `income` | **10** ✅ |
| `expense` | **42** ✅ |
| `transfer` | 56 |

**FUNCIONA:** `filter_type` filtra corretamente!

### Status
| Status | Resultado |
|--------|-----------|
| `paid` | 45 |
| `pending` | 56 |
| `all` | 56 |
| `overdue` | 56 |

### Com Datas
| Teste | Resultado |
|-------|-----------|
| Dezembro 2025 | 60 |
| income + datas | 10 |
| expense + datas | 46 |

---

## 📅 CALENDÁRIO

### Base
| Teste | Resultado |
|-------|-----------|
| Apenas year/month/type | **0** |
| + search_all=true | **787** |
| + search_all=false | 0 |

**CRÍTICO:** `search_all=true` é obrigatório para "Todos"!

### Users
| Teste | Resultado |
|-------|-----------|
| user_id=Mariana | 170 |
| user_id=Antonio | 223 |
| user_id=all | **500 ERROR** ❌ |

### Item Types
| Type | Resultado |
|------|-----------|
| `task` | **461** ✅ |
| `visit` | 0 |
| `call` | 0 |
| `whatsapp` | **326** ✅ |
| `all` | 422 ❌ |
| `meeting` | 422 ❌ |

**FUNCIONA:** `item_type=task` e `item_type=whatsapp`!

---

## 🔧 RECURSOS AUXILIARES

| Recurso | Endpoint | Itens |
|---------|----------|-------|
| Usuários | `/v1/users` | 15 |
| Pipelines | `/v1/pipelines` | 7 |
| Pipeline Groups | `/v1/pipeline-groups` | 5 |
| Tags | `/v1/contacts/tags` | 57 |
| Media Sources | `/v1/media-sources` | 38 |
| Bancos | `/v1/banks` | 198 |
| Contas Financeiras | `/v1/financial/accounts` | 5 |
| Tipos de Imóvel | `/v1/property-types` | 27 |
| Motivos de Perda | `/v1/deal/lost-reason` | 6 |

---

## 📋 AÇÕES NECESSÁRIAS NO NODE

### 🔴 CRÍTICO - Corrigir Imediatamente

1. **DEALS - Adicionar status que funcionam:**
   - ✅ Adicionar: `win` (19 deals)
   - ✅ Adicionar: `stagnant` (229 deals)
   - ✅ Adicionar: `property_radar` (100 deals)
   - ✅ Adicionar: `out_of_date` (201 deals)
   - ❌ Manter removido: `in_progress` (422)
   - ❌ Manter removido: `gained` (422)

2. **DEALS - Adicionar deal_type=rent:**
   - ✅ Adicionar: `rent` (138 deals)
   - ❌ Manter removido: `sale`, `both`, `lease` (422)

3. **FATURAS - Status correto:**
   - ✅ Usar: `canceled` (1 L)
   - ❌ Remover: `cancelled` (2 L's - erro 422)

### 🟡 IMPORTANTE - Melhorar

4. **LOCAÇÕES - Usar smart_list:**
   - `smart_list` retorna 15
   - `status` retorna 12
   - Preferir `smart_list`

5. **FATURAS - Datas:**
   - Sem datas: 10 faturas
   - Com datas 2025: 25 faturas
   - Considerar datas obrigatórias

6. **CALENDÁRIO - item_type:**
   - ✅ Adicionar: `task` (461 itens)
   - ✅ Adicionar: `whatsapp` (326 itens)
   - ❌ Remover: `all`, `meeting` (422)

### 🟢 OPCIONAL - Adicionar

7. **Pipeline Groups por funil:**
   - Geral de Negócios: 233 deals
   - Captação de Imóveis: 112 deals
   - Comissões: 1 deal
   - Gestão de Tarefas: 9 deals

8. **Filtros de usuário funcionam em Deals:**
   - user_id específico funciona!
   - Combinação com status funciona!

---

## 📁 ARQUIVOS GERADOS

- `docs/DESCOBERTAS_COMPLETAS_14_12_2025.md` - Este documento
- `docs/ANALISE_APP_vs_NODES_14_12_2025.md` - Análise anterior
- `test-combinacoes-completas.js` - Script de teste
- `test-combinacoes-results.json` - Resultados JSON
- `test-analise-app.js` - Script de teste do App
- `test-analise-app-results.json` - Resultados JSON do App

