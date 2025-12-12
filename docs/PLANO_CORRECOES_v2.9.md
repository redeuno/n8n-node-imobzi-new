# 🔧 PLANO DE CORREÇÕES v2.9.0

**Data:** 12/12/2025  
**Baseado em:** MAPEAMENTO_FILTROS_API_IMOBZI.md

---

## 📋 VISÃO GERAL DAS MUDANÇAS

### 1. DEALS - Reestruturar Filtros

**Problema atual:**
- `user_id` não filtra
- `pipeline_id` não filtra
- `show_activities` não funciona
- Estrutura confusa entre `/v1/deals` e `/v1/deals/search`

**Solução:**
Usar a estrutura correta da API:
- `/v1/deals` → Visão por estágio (Kanban) - usa `pipeline_group_id`
- `/v1/deals/search` → Lista plana - usa filtros de busca

**Filtros para `/v1/deals` (Deal por Estágio):**
```
pipeline_group_id (obrigatório para filtrar):
  - 5675099632959488 → Geral de Negócios
  - 5370013421666304 → Captação de Imóveis
  - 6405034089644032 → Comissões
  - 6419593693233152 → Gestão de Solicitações
  - 6594235603091456 → Gestão de Tarefas

user_id (opcional):
  - IDs dos usuários ou vazio para todos

deal_status (opcional):
  - all, stagnant, in_progress, out_of_date, win, lost, property_radar

deal_type (opcional):
  - all, rent, sale, both
```

**Filtros para `/v1/deals/search` (Lista Plana):**
- Manter como está, mas adicionar avisos

---

### 2. CONTATOS - Ajustar Filtros

**Remover ou Adicionar Aviso:**
- `user_id` → Adicionar: "⚠️ Este filtro pode não funcionar na API"

**Manter:**
- `smart_list` ✅
- `media_source` ✅
- `tags` ✅
- `contact_type` (person/lead funcionam, organization não)

---

### 3. IMÓVEIS - Ajustar Filtros

**Adicionar Aviso:**
- `finality` → "⚠️ Filtro não confirmado"
- `status` → "⚠️ Filtro não confirmado"

**Manter:**
- `smart_list` ✅
- `user_id` ✅ (funciona em imóveis!)

---

### 4. CALENDÁRIO - Garantir search_all

**Já implementado corretamente:**
- `search_all=true` é adicionado automaticamente
- `calendar_type=normal`
- `holiday_year`
- `user_id`
- `item_type`

---

### 5. DEAL GET BY ID - Remover ou Avisar

**Problema:** `/v1/deal/{id}` retorna erro 500

**Solução:** Marcar como "⚠️ Bug na API - Erro 500"

---

### 6. BUSCAR POR CÓDIGO - Corrigir

**Problema:**
- `/v1/organization/code/{code}` → 404
- `/v1/lead/code/{code}` → 404

**Solução:** Só funciona para `person`:
- `/v1/person/code/{code}` ✅

---

## 🔄 ESTRUTURA DOS DEALS CORRIGIDA

### Deal por Estágio (`/v1/deals`)

Retorna estrutura agrupada por estágio:
```json
{
  "4584666827849728": { "stage_name": "Oportunidades", "deals": [...] },
  "6005926736691200": { "stage_name": "Qualificação", "deals": [...] },
  ...
}
```

**Filtros:**
1. `pipeline_group_id` - Seleciona o grupo de funil
2. `user_id` - Filtra por corretor (ou 'all')
3. `deal_status` - Status do deal
4. `deal_type` - Tipo (venda/locação)

### Deal Busca (`/v1/deals/search`)

Retorna lista plana:
```json
{
  "deals": [...],
  "cursor": "..."
}
```

**Filtros:** (não confirmados, manter com aviso)
- `user_id`
- `deal_status`
- `deal_type`
- `pipeline_id` (estágio específico)

---

## 📝 ALTERAÇÕES NO CÓDIGO

### 1. dealByStageFilters - ATUALIZAR

```typescript
// Grupo de Funil (OBRIGATÓRIO para filtrar corretamente)
pipeline_group_id: {
  options: [
    { name: 'Captação de Imóveis', value: '5370013421666304' },
    { name: 'Comissões', value: '6405034089644032' },
    { name: 'Geral de Negócios', value: '5675099632959488' },
    { name: 'Gestão de Solicitações', value: '6419593693233152' },
    { name: 'Gestão de Tarefas', value: '6594235603091456' },
    { name: 'Todos os Grupos', value: '' },
  ]
}

// Status do Deal
deal_status: {
  options: [
    { name: 'Todos', value: 'all' },
    { name: 'Em Progresso', value: 'in_progress' },
    { name: 'Estagnado', value: 'stagnant' },
    { name: 'Desatualizado', value: 'out_of_date' },
    { name: 'Ganho', value: 'win' },
    { name: 'Perdido', value: 'lost' },
    { name: 'Radar de Imóveis', value: 'property_radar' },
  ]
}

// Tipo de Negócio
deal_type: {
  options: [
    { name: 'Todos', value: 'all' },
    { name: 'Venda', value: 'sale' },
    { name: 'Locação', value: 'rent' },
    { name: 'Venda e Locação', value: 'both' },
  ]
}

// Corretor
user_id: {
  options: [
    { name: 'Todos os Corretores', value: 'all' },
    // ... lista de usuários
  ]
}
```

### 2. dealFilters - ADICIONAR AVISOS

```typescript
// user_id
description: '⚠️ Filtro não confirmado - pode não funcionar'

// pipeline_id  
description: '⚠️ Filtro não confirmado - pode não funcionar'
```

### 3. contactFilters - ADICIONAR AVISO

```typescript
// user_id
description: '⚠️ Este filtro pode não funcionar na API'
```

### 4. propertyFilters - ADICIONAR AVISOS

```typescript
// finality
description: '⚠️ Filtro não confirmado'

// status
description: '⚠️ Filtro não confirmado'
```

### 5. Deal Get by ID - ADICIONAR AVISO

```typescript
{ name: '⚠️ Obter Por ID (Bug API)', value: 'get', action: '...' }
```

### 6. Contact getByCode - CORRIGIR

Só permitir `person` para busca por código:
```typescript
// Remover organization e lead das opções de getByCode
// Ou adicionar aviso que só funciona para person
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [ ] 1. Atualizar dealByStageFilters com pipeline_group_id, deal_status, deal_type
- [ ] 2. Adicionar aviso em dealFilters (user_id, pipeline_id)
- [ ] 3. Adicionar aviso em contactFilters (user_id)
- [ ] 4. Adicionar aviso em propertyFilters (finality, status)
- [ ] 5. Atualizar aviso em Deal Get by ID
- [ ] 6. Corrigir/avisar sobre getByCode para contatos
- [ ] 7. Remover show_activities de dealFilters
- [ ] 8. Atualizar versão para 2.9.0
- [ ] 9. Build e teste
- [ ] 10. Commit e push

