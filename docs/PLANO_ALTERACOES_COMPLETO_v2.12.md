# 📋 PLANO COMPLETO DE ALTERAÇÕES - v2.12.0

**Data:** 14/12/2025  
**Baseado em:** Testes do App + Testes de Combinações + Testes Exploratórios  
**Total de testes realizados:** ~250+

---

## 📊 RESUMO EXECUTIVO

### Totais Descobertos
| Recurso | Total na Base |
|---------|---------------|
| Contatos | **16.064** |
| Deals | **2.434** |
| Faturas | Variável por período |

### Testes Realizados
- Testes do App (requisições capturadas): ~50
- Testes de Combinações: ~150
- Testes Exploratórios: ~100

---

## 🔴 ALTERAÇÕES CRÍTICAS

### 1. DEALS - Status (CORRIGIR URGENTE)

**Situação atual:** Só temos `all` e `lost`
**Necessário:** Adicionar status que funcionam

| Status | Valor | Geral | Captação | Comissões | Tarefas | Ação |
|--------|-------|-------|----------|-----------|---------|------|
| Todos | `all` | 233 | 112 | 1 | 9 | ✅ Manter |
| Ganhos | `win` | **19** | **33** | 0 | 0 | ✅ **ADICIONAR** |
| Perdidos | `lost` | 220 | 122 | 0 | 0 | ✅ Manter |
| Estagnados | `stagnant` | **229** | **112** | 0 | **9** | ✅ **ADICIONAR** |
| Radar Imóveis | `property_radar` | **100** | **1** | 0 | 0 | ✅ **ADICIONAR** |
| +3 Meses | `out_of_date` | **201** | **24** | 0 | **9** | ✅ **ADICIONAR** |
| Em Progresso | `in_progress` | 422 | - | - | - | ❌ Não adicionar |
| Ganho | `gained` | 422 | - | - | - | ❌ Não adicionar |

### 2. DEALS - deal_type (CORRIGIR)

**Situação atual:** Só temos `all`
**Descoberta:** `rent` funciona!

| Type | Valor | Resultado | Ação |
|------|-------|-----------|------|
| Todos | `all` | 233 | ✅ Manter |
| Locação | `rent` | **138** | ✅ **ADICIONAR** |
| Venda | `sale` | 422 | ❌ Não adicionar |
| Ambos | `both` | 422 | ❌ Não adicionar |
| Lease | `lease` | 422 | ❌ Não adicionar |

### 3. DEALS - Combinação stagnant + rent

**NOVA DESCOBERTA:**
```
status=stagnant + type=rent → 136 deals ✅
```
Combinações funcionam!

### 4. FATURAS - Ortografia do status

| Escrita | Resultado | Ação |
|---------|-----------|------|
| `canceled` (1 L) | ✅ Funciona | ✅ Usar este |
| `cancelled` (2 L's) | 422 ERROR | ❌ Remover |

### 5. CALENDÁRIO - item_type

**Situação atual:** Não temos este filtro
**Descoberta:**

| Type | Resultado | Ação |
|------|-----------|------|
| `task` | **461** | ✅ **ADICIONAR** |
| `whatsapp` | **326** | ✅ **ADICIONAR** |
| `visit` | 0 | ✅ Adicionar |
| `call` | 0 | ✅ Adicionar |
| `all` | 422 | ❌ Não adicionar |
| `meeting` | 422 | ❌ Não adicionar |

---

## 🟡 MELHORIAS IMPORTANTES

### 6. LOCAÇÕES - smart_list retorna mais dados

| Método | Resultado |
|--------|-----------|
| `smart_list=all` | **15** locações |
| `status=all` | 12 locações |

**Ação:** Preferir `smart_list` sobre `status`

### 7. FATURAS - Datas fazem diferença

| Período | Faturas |
|---------|---------|
| Sem datas | 10 |
| Com datas 2025 | **25** |

**Ação:** Considerar adicionar datas padrão ou aviso

### 8. CONTATOS - Endpoints alternativos

**Descoberta:**
- `/v1/contacts/search` → 20 contatos (diferente de `/v1/contacts` → 50)
- `/v1/deals/search` → 50 deals

**Pode ser útil:** Endpoint de busca retorna resultados diferentes

### 9. TAGS - Funcionam!

**Descoberta:** Tags funcionam para filtrar contatos
```
tags=1 Milhão à 2 Milhões → 18 contatos
tags=100K à 200K → 10 contatos
```

**57 tags disponíveis** no sistema

### 10. MEDIA SOURCES

**38 media sources disponíveis**
- Site, Amigos e Parentes, Avaliador, etc.

---

## 🟢 DESCOBERTAS ADICIONAIS

### 11. Paginação

- `limit` parece ser ignorado (sempre retorna 50)
- `page=2` funciona para faturas
- `per_page` parece ser ignorado

### 12. Ordenação funciona

| Parâmetro | Funciona |
|-----------|----------|
| `sort=name` | ✅ |
| `sort=-name` (desc) | ✅ |
| `order_by=created_at` | ✅ |
| `sort_by=updated_at` | ✅ |
| `order=name` | ❌ 422 |

### 13. Filtros booleanos

Parecem ser ignorados (sempre retornam mesma quantidade):
- `is_available=true/false`
- `has_garage=true`
- `has_deal=true`
- `is_active=true`

### 14. Endpoints que NÃO existem

| Endpoint | Status |
|----------|--------|
| `/v1/properties/search` | 404 |
| `/v1/leases/search` | 404 |
| `/v1/contacts/count` | 404 |
| `/v1/statistics` | 400 |
| `/v1/dashboard` | 400 |
| `/v1/timeline` | 500 |

### 15. Pipeline Groups completos

| Grupo | ID | Deals |
|-------|-----|-------|
| Geral de Negócios | `5675099632959488` | 233 |
| Captação de Imóveis | `5370013421666304` | 112 |
| Comissões | `6405034089644032` | 1 |
| Gestão de Solicitações | `6419593693233152` | 0 |
| Gestão de Tarefas | `6594235603091456` | 9 |

### 16. Pipelines (Etapas)

| Etapa | ID |
|-------|-----|
| Oportunidades | `4584666827849728` |
| Qualificação e Interesse | `6005926736691200` |
| Visita / Apresentação | `5381346821144576` |
| Follow UP | `5944296774565888` |
| Em Atendimento | `6481696604553216` |
| Negociação | `6507246727987200` |
| Fechamento | `4677659379367936` |

---

## 📝 CÓDIGO A ALTERAR

### Arquivo: `nodes/Imobzi/Imobzi.node.ts`

#### 1. dealFilters - deal_status (linha ~970)

```typescript
// DE:
options: [
    { name: 'Perdido', value: 'lost' },
    { name: 'Todos', value: 'all' },
],

// PARA:
options: [
    { name: '+3 Meses (Desatualizado)', value: 'out_of_date' },
    { name: 'Estagnado', value: 'stagnant' },
    { name: 'Ganho', value: 'win' },
    { name: 'Perdido', value: 'lost' },
    { name: 'Radar De Imóveis', value: 'property_radar' },
    { name: 'Todos', value: 'all' },
],
```

#### 2. dealFilters - deal_type (linha ~980)

```typescript
// DE:
options: [
    { name: 'Todos', value: 'all' },
],

// PARA:
options: [
    { name: 'Locação', value: 'rent' },
    { name: 'Todos', value: 'all' },
],
```

#### 3. dealByStageFilters - mesmo ajuste

Replicar as mesmas alterações para `dealByStageFilters`

#### 4. calendarFilters - Adicionar item_type (após user_filter)

```typescript
{
    displayName: 'Tipo De Atividade',
    name: 'item_type',
    type: 'options',
    default: '',
    description: 'Filtrar por tipo de atividade do calendário.',
    options: [
        { name: 'Chamada', value: 'call' },
        { name: 'Tarefa', value: 'task' },
        { name: 'Todas', value: '' },
        { name: 'Visita', value: 'visit' },
        { name: 'WhatsApp', value: 'whatsapp' },
    ],
},
```

#### 5. invoiceFilters - Verificar status canceled

Garantir que usamos `canceled` (1 L) e não `cancelled` (2 L's)

#### 6. Atualizar header do arquivo

```typescript
/**
 * n8n-nodes-imobzi-latest v2.12.0
 * ...
 * Correções v2.12.0:
 * - DEALS: Adicionados status win, stagnant, property_radar, out_of_date
 * - DEALS: Adicionado deal_type=rent (138 deals)
 * - CALENDÁRIO: Adicionado filtro item_type (task, whatsapp, visit, call)
 * - FATURAS: Confirmado status=canceled (não cancelled)
 *
 * Descobertas da API:
 * - Contatos total: 16.064
 * - Deals total: 2.434
 * - Tags disponíveis: 57
 * - Media Sources: 38
 * - Pipeline Groups: 5
 * - Pipelines/Etapas: 7
 */
```

---

## 📁 ARQUIVOS DE TESTE GERADOS

| Arquivo | Descrição |
|---------|-----------|
| `test-analise-app.js` | Testes baseados no App |
| `test-analise-app-results.json` | Resultados JSON |
| `test-combinacoes-completas.js` | Testes de combinações |
| `test-combinacoes-results.json` | Resultados JSON |
| `test-exploratorio-criativo.js` | Testes exploratórios |
| `test-exploratorio-results.json` | Resultados JSON |

---

## 📊 CHECKLIST DE ALTERAÇÕES

### Obrigatórias
- [ ] Adicionar deal_status: win, stagnant, property_radar, out_of_date
- [ ] Adicionar deal_type: rent
- [ ] Adicionar calendarFilters.item_type
- [ ] Verificar invoiceFilters.status (canceled vs cancelled)
- [ ] Replicar alterações em dealByStageFilters

### Opcionais
- [ ] Adicionar ordenação (order_by, sort_by) em mais recursos
- [ ] Considerar smart_list como padrão em locações
- [ ] Adicionar aviso sobre datas em faturas

### Documentação
- [ ] Atualizar README.md
- [ ] Atualizar docs/ESTRUTURA_NODES_IMOBZI.md
- [ ] Criar CHANGELOG v2.12.0

---

## 🚀 PRÓXIMOS PASSOS

1. **Aprovar** este plano
2. **Executar** as alterações no código
3. **Build** e **Lint**
4. **Testar** no n8n
5. **Commit** e **Push** para Git
6. **Publicar** no npm v2.12.0

---

**Status:** ⏳ AGUARDANDO APROVAÇÃO

