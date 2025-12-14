# 📊 ANÁLISE: Requisições do App Imobzi vs Nossos Nodes

**Data:** 14/12/2025  
**Versão atual do node:** v2.11.0

## 🎯 Objetivo

Comparar as requisições capturadas do console do navegador do App Imobzi com a implementação atual dos nossos nodes para identificar melhorias.

---

## 👤 CONTATOS

### Requisições do App
```
/v1/contacts?cursor=&cursor_current_page=&tags=&media_source=&smart_list=all
/v1/contacts?...&manager_id=P1ibK4GFPqZYKIx9e55RpQobt7J2  (com usuário)
/v1/contacts?...&tags=property-owner  (com tag)
```

### Resultados dos Testes
| Teste | Status | Contatos |
|-------|--------|----------|
| APP: smart_list=all | 200 | 50 |
| APP: com manager_id | 200 | 50 |
| NODE: com user_id | 200 | 50 |
| TESTE: manager_id=Mariana | 200 | 50 |
| TESTE: user_id=Mariana | 200 | 50 |
| APP: com tag | 200 | 50 |

### 🔍 Descobertas
1. **Filtro de usuário**: App usa `manager_id`, nós usamos `user_id`
   - Ambos retornam 50 (paginação), precisaria testar com cursor
   - Pode ser que nenhum dos dois esteja realmente filtrando

2. **Parâmetros extras do App**:
   - `cursor_current_page=`
   - Parâmetros vazios enviados

### ⚠️ Problemas no Node Atual
- Filtro `user_id` pode não estar funcionando (API pode ignorar)
- Deveria usar `manager_id` como o App?

### ✅ O que está OK
- smart_list funciona
- tags funciona
- media_source funciona

---

## 📊 DEALS/NEGÓCIOS

### Requisições do App
```
/v1/deals?cursor=&cursor_page=0&deal_type=all&deal_status=all&user_id=all&user_team=all&filter_id=&pipeline_group_id=5675099632959488
```

### Resultados dos Testes
| Teste | Status | Deals |
|-------|--------|-------|
| APP: Geral de Negócios - Todos | 200 | 233 |
| APP: deal_status=win | 200 | 19 |
| APP: deal_status=lost | 200 | 220 |
| APP: deal_status=stagnant | 200 | 229 |
| APP: deal_status=property_radar | 200 | 100 |
| APP: deal_status=out_of_date | 200 | 201 |
| NODE: só user_id=all | 200 | 233 |
| NODE: com status e type | 200 | 233 |
| TESTE: in_progress | **422** | ERRO |
| APP: Captação de Imóveis | 200 | 112 |

### 🔍 Descobertas IMPORTANTES

1. **Status que FUNCIONAM (testados com sucesso)**:
   - `all` → 233 deals
   - `win` → 19 deals (GANHOS) ✅
   - `lost` → 220 deals (PERDIDOS) ✅
   - `stagnant` → 229 deals (ESTAGNADOS) ✅
   - `property_radar` → 100 deals ✅
   - `out_of_date` → 201 deals (+3 MESES) ✅

2. **Status que NÃO FUNCIONAM**:
   - `in_progress` → 422 ERROR ❌

3. **Parâmetros extras do App**:
   - `cursor_page=0`
   - `user_team=all`
   - `filter_id=`
   - `pipeline_group_id` (SEMPRE enviado!)

4. **pipeline_group_id por Funil**:
   - Geral de Negócios: `5675099632959488` → 233 deals
   - Captação de Imóveis: `5370013421666304` → 112 deals

### ⚠️ Problemas no Node Atual
- Removemos status válidos (win, stagnant, property_radar, out_of_date)
- Só deixamos `all` e `lost`
- O App consegue filtrar por win, stagnant, etc!

### ✅ Correção Necessária
Adicionar de volta os status que funcionam:
- `win` (ganhos)
- `stagnant` (estagnados)
- `property_radar` (radar de imóveis)
- `out_of_date` (mais de 3 meses)

---

## 💰 FATURAS (INVOICES)

### Requisições do App
```
/v1/invoices?order_by=date&sort_by=desc&status=all&payment_methods_available=all_payments&payment_method=all_payments&start_at=2025-12-01&end_at=2025-12-31&page=1
```

### Resultados dos Testes
| Teste | Status | Faturas |
|-------|--------|---------|
| APP: Dezembro 2025 | 200 | 10 |
| APP: Pagas 2025 | 200 | 25 |
| APP: Canceladas | 200 | 5 |
| NODE: só status=all | 200 | 10 |
| NODE: status=paid | 200 | 7 |
| TESTE: com datas ano | 200 | **25** |

### 🔍 Descobertas

1. **Datas fazem diferença!**
   - Sem datas: 10 faturas (mês atual?)
   - Com datas 2025: 25 faturas

2. **Parâmetros extras do App**:
   - `payment_methods_available=all_payments`
   - `payment_method=all_payments`
   - `contract_type=all`
   - `period=created_at`
   - `order_by=date`
   - `sort_by=desc`

### ⚠️ Problemas no Node Atual
- Sem datas, retorna só mês atual
- Faltam filtros de ordenação
- Status `canceled` funciona (não `cancelled`!)

### ✅ Melhorias Sugeridas
- Adicionar range de datas por padrão
- Adicionar ordenação (order_by, sort_by)

---

## 🏠 LOCAÇÕES (LEASES)

### Requisições do App
```
/v1/leases?smart_list=all&start_at=2025-12-14&end_at=2026-01-13
/v1/leases?smart_list=actives_with_invoices_late&start_at=2025-12-14&end_at=2026-01-13
```

### Resultados dos Testes
| Teste | Status | Locações |
|-------|--------|----------|
| APP: smart_list=all com datas | 200 | 15 |
| APP: ativos c/ faturas atrasadas | 200 | 0 |
| NODE: sem parâmetros | 200 | 12 |
| NODE: status=active | 200 | 12 |
| TESTE: smart_list=all | 200 | 15 |
| TESTE: smart_list=actives | 200 | 15 |

### 🔍 Descobertas

1. **smart_list retorna mais dados!**
   - Sem parâmetros: 12 locações
   - Com smart_list=all: 15 locações

2. **Smart Lists disponíveis**:
   - `all`
   - `actives`
   - `actives_with_invoices_late`

3. **App usa datas**: start_at e end_at

### ⚠️ Problemas no Node Atual
- Usamos `status` mas App usa `smart_list`
- Sem smart_list, pode estar perdendo dados

### ✅ Melhorias Sugeridas
- Mudar de `status` para `smart_list`
- Adicionar datas (start_at, end_at)

---

## 💳 TRANSAÇÕES FINANCEIRAS

### Requisições do App
```
/v1/financial/transactions?start_at=2025-12-01&end_at=2025-12-14&periodType=this_month_until_today&order_by=due_date&sort_by=desc&page=1
```

### Resultados dos Testes
| Teste | Status | Transações |
|-------|--------|------------|
| APP: Dezembro até hoje | 200 | 45 |
| NODE: sem parâmetros | 200 | 56 |
| NODE: filter_type=income | 200 | 10 |
| TESTE: com datas | 200 | 45 |

### 🔍 Descobertas

1. **Datas funcionam**: Filtram corretamente
2. **Parâmetros do App**:
   - `periodType=this_month_until_today`
   - `order_by=due_date`
   - `sort_by=desc`

### ✅ O que está funcionando
- Datas funcionam
- filter_type funciona (10 receitas)

### ✅ Melhorias Sugeridas
- Adicionar periodType
- Adicionar ordenação

---

## 📋 RESUMO DE AÇÕES NECESSÁRIAS

### 🔴 CRÍTICO (Corrigir)

1. **DEALS - Status removidos que funcionam**:
   - Adicionar: `win`, `stagnant`, `property_radar`, `out_of_date`
   - Manter: `all`, `lost`
   - Remover: `in_progress` (422)

### 🟡 IMPORTANTE (Melhorar)

2. **CONTATOS - Verificar filtro de usuário**:
   - Testar se `manager_id` filtra melhor que `user_id`

3. **LOCAÇÕES - Usar smart_list**:
   - Mudar de `status` para `smart_list`
   - Smart lists: `all`, `actives`, `actives_with_invoices_late`

4. **FATURAS - Datas por padrão**:
   - Com datas 2025: 25 faturas
   - Sem datas: 10 faturas (perde dados históricos)

### 🟢 OPCIONAL (Adicionar)

5. **Parâmetros de ordenação em todos**:
   - `order_by`, `sort_by`

6. **Parâmetros extras do App**:
   - `user_team=all` em deals
   - `periodType` em transações
   - `payment_methods_available` em faturas

---

## 📊 COMPARATIVO: APP vs NODE

| Recurso | App | Node Atual | Status |
|---------|-----|------------|--------|
| Contatos smart_list | ✅ | ✅ | OK |
| Contatos user filter | manager_id | user_id | ⚠️ Verificar |
| Deals status=win | ✅ | ❌ removido | 🔴 Corrigir |
| Deals status=stagnant | ✅ | ❌ removido | 🔴 Corrigir |
| Deals status=out_of_date | ✅ | ❌ removido | 🔴 Corrigir |
| Deals status=property_radar | ✅ | ❌ removido | 🔴 Corrigir |
| Deals status=in_progress | ❌ 422 | ❌ removido | ✅ Correto |
| Deals pipeline_group_id | ✅ | ✅ | OK |
| Faturas com datas | ✅ | ⚠️ opcional | 🟡 Melhorar |
| Locações smart_list | ✅ | ❌ usa status | 🟡 Melhorar |
| Transações com datas | ✅ | ✅ | OK |

---

## 🔍 ANÁLISE DO CÓDIGO ATUAL DO NODE

### DEALS - Código Atual (PROBLEMA!)
```typescript
// Linha 970-977 - dealFilters
{
    displayName: 'Status Do Deal',
    name: 'deal_status',
    options: [
        { name: 'Perdido', value: 'lost' },
        { name: 'Todos', value: 'all' },  // ❌ FALTAM: win, stagnant, property_radar, out_of_date
    ],
}
```

**Erro:** Removemos status que FUNCIONAM:
- `win` → 19 deals ✅ FUNCIONA
- `stagnant` → 229 deals ✅ FUNCIONA
- `property_radar` → 100 deals ✅ FUNCIONA
- `out_of_date` → 201 deals ✅ FUNCIONA

### LOCAÇÕES - Código Atual (OK!)
```typescript
// Linha 794-807 - leaseFilters
{
    displayName: 'Smart List',
    name: 'smart_list',
    options: [
        { name: 'Ativos', value: 'active' },
        { name: 'Todas As Locações', value: 'all' },
        // ... outros
    ],
}
```
✅ Já usa smart_list como o App!

### FATURAS - Código Atual (OK!)
```typescript
// Linha 815-889 - invoiceFilters
- Data Início (start_at) ✅
- Data Fim (end_at) ✅
- Status ✅
- Método de Pagamento ✅
- Ordenação (order_by, sort_by) ✅
```
✅ Tem os filtros principais!

---

## 📝 ERROS ESPECÍFICOS ENCONTRADOS NO CÓDIGO

### 🔴 ERRO 1: Status de Deal removidos incorretamente

**Arquivo:** `nodes/Imobzi/Imobzi.node.ts`  
**Linhas:** 968-988 (dealFilters) e 1066-1086 (dealByStageFilters)

**Problema:** Na v2.11.0, removemos status que funcionam porque confundimos com `in_progress` que dá 422.

**Status que devem ser ADICIONADOS de volta:**
| Status | Valor | Resultado Teste |
|--------|-------|-----------------|
| Ganhos | `win` | 19 deals ✅ |
| Estagnados | `stagnant` | 229 deals ✅ |
| Radar de Imóveis | `property_radar` | 100 deals ✅ |
| +3 Meses | `out_of_date` | 201 deals ✅ |

**Status que deve CONTINUAR REMOVIDO:**
| Status | Valor | Resultado |
|--------|-------|-----------|
| Em Progresso | `in_progress` | 422 ERROR ❌ |

### 🟡 ATENÇÃO 2: Comentário desatualizado no header

**Linha 32-33:**
```typescript
* - deal_status: apenas "all" e "lost" funcionam, outros causam 422
* - deal_type: apenas "all" funciona, lease/sale causam 422
```

**Deve ser atualizado para:**
```typescript
* - deal_status: funcionam: all, win, lost, stagnant, property_radar, out_of_date
* - deal_status: NÃO funciona: in_progress (422)
* - deal_type: apenas "all" funciona
```

---

## 🎯 PRÓXIMOS PASSOS (NÃO EXECUTAR AINDA)

### Correções Necessárias:

1. **DEALS - Adicionar status que funcionam:**
   - Adicionar: `win`, `stagnant`, `property_radar`, `out_of_date`
   - Manter: `all`, `lost`
   - NÃO adicionar: `in_progress` (422)

2. **Atualizar comentário do header** com informações corretas

3. **Testar novamente** após correções

### Melhorias Opcionais:

4. **Contatos** - Testar `manager_id` vs `user_id` com paginação completa
5. **Locações** - Adicionar datas (start_at, end_at) como o App
6. **Transações** - Adicionar `periodType`

---

## 📊 ARQUIVOS GERADOS

- `docs/ANALISE_APP_vs_NODES_14_12_2025.md` - Este documento
- `test-analise-app.js` - Script de teste
- `test-analise-app-results.json` - Resultados em JSON

