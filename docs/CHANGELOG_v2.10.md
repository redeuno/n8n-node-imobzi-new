# 📝 CHANGELOG v2.10.0

**Data:** 12/12/2025  
**Baseado em:** docs/ESTRUTURA_NODES_IMOBZI.md

---

## 📋 RESUMO DAS ALTERAÇÕES

### ✅ JÁ IMPLEMENTADO

| Node | Alteração | Status |
|------|-----------|--------|
| **Deal (Lista)** | Endpoint `/v1/deals` + extração lista plana | ✅ |
| **Deal (Lista)** | Filtros: Grupo, Etapa, Status, Tipo, Corretor | ✅ |
| **Deal Por Estágio** | Filtro Etapa (pipeline_id) adicionado | ✅ |

### ✅ VERIFICADOS - CONFORMES COM DOCUMENTO

| Node | Filtro | Opção "Todos" | Status |
|------|--------|---------------|--------|
| **Contato** | user_id | Todos Os Usuários (valor: '') | ✅ |
| **Contato** | media_source | Todas As Origens (valor: '') | ✅ |
| **Contato** | smart_list | Todos Os Contatos (valor: 'all') | ✅ |
| **Contato** | tags | Todas As Tags (valor: '') | ✅ |
| **Contato** | contact_type | Todos (valor: '') | ✅ |
| **Imóvel** | user_id | Todos Os Corretores (valor: '') | ✅ |
| **Imóvel** | smart_list | Todos (valor: '') | ✅ |
| **Imóvel** | finality | Todos (valor: '') | ✅ |
| **Imóvel** | status | Todos (valor: '') | ✅ |
| **Locação** | smart_list | Todas As Locações (valor: 'all') | ✅ |
| **Fatura** | payment_method | Todos (valor: '') | ✅ |
| **Fatura** | status | Todos (valor: 'all') | ✅ |
| **Transação** | account_id | Todas As Contas (valor: '') | ✅ |
| **Transação** | status | Todos (valor: '') | ✅ |
| **Transação** | filter_type | Todos (valor: '') | ✅ |
| **Calendário** | user_filter | Todos Os Usuários (valor: 'all') | ✅ |
| **Calendário** | item_type | Todas Atividades (valor: '') | ✅ |
| **Deal (Lista)** | pipeline_group_id | Todos Os Grupos (valor: '') | ✅ |
| **Deal (Lista)** | pipeline_id | Todas As Etapas (valor: '') | ✅ |
| **Deal (Lista)** | deal_status | Todos (valor: 'all') | ✅ |
| **Deal (Lista)** | deal_type | Todos (valor: 'all') | ✅ |
| **Deal (Lista)** | user_id | Todos Os Corretores (valor: '') | ✅ |
| **Deal Por Estágio** | Todos os filtros | ✅ Conformes | ✅ |

---

## 📊 ANÁLISE DETALHADA

### 1. DEAL (LISTA) ✅

**Mudanças:**
- Endpoint: `/v1/deals/search` → `/v1/deals`
- Output: Lista plana extraída da estrutura Kanban
- Filtros: Todos funcionam com `/v1/deals`

**Filtros:**
| Filtro | Opção "Todos" | Status |
|--------|---------------|--------|
| Grupo de Funil | Todos Os Grupos (valor: '') | ✅ |
| Etapa | Todas As Etapas (valor: '') | ✅ |
| Status | Todos (valor: 'all') | ✅ |
| Tipo | Todos (valor: 'all') | ✅ |
| Corretor | Todos Os Corretores (valor: '') | ✅ |

### 2. DEAL POR ESTÁGIO ✅

**Mudanças:**
- Filtro Etapa (pipeline_id) adicionado

**Filtros:** Mesmos do Deal (Lista) ✅

### 3. CONTATO ✅

**Filtros verificados:**
| Filtro | Opção "Todos" | Status |
|--------|---------------|--------|
| user_id | Todos Os Usuários (valor: '') | ✅ |
| media_source | Todas As Origens (valor: '') | ✅ |
| smart_list | Todos Os Contatos (valor: 'all') | ✅ |
| tags | Todas As Tags (valor: '') | ✅ |
| contact_type | Todos (valor: '') | ✅ |

### 4. IMÓVEL ✅

**Filtros verificados:**
| Filtro | Opção "Todos" | Status |
|--------|---------------|--------|
| user_id | Todos Os Corretores (valor: '') | ✅ |
| smart_list | Todos (valor: '') | ✅ |
| finality | Todos (valor: '') | ✅ |
| status | Todos (valor: '') | ✅ |

### 5. LOCAÇÃO ✅

**Filtros verificados:**
| Filtro | Opção "Todos" | Status |
|--------|---------------|--------|
| smart_list | Todas As Locações (valor: 'all') | ✅ |

### 6. FATURA ✅

**Filtros verificados:**
| Filtro | Opção "Todos" | Status |
|--------|---------------|--------|
| payment_method | Todos (valor: '') | ✅ |
| status | Todos (valor: 'all') | ✅ |

### 7. TRANSAÇÃO ✅

**Filtros verificados:**
| Filtro | Opção "Todos" | Status |
|--------|---------------|--------|
| account_id | Todas As Contas (valor: '') | ✅ |
| status | Todos (valor: '') | ✅ |
| filter_type | Todos (valor: '') | ✅ |

### 8. CALENDÁRIO ✅

**Filtros verificados:**
| Filtro | Opção "Todos" | Status |
|--------|---------------|--------|
| user_filter | Todos Os Usuários (valor: 'all') | ✅ |
| item_type | Todas Atividades (valor: '') | ✅ |

---

## ✅ CONCLUSÃO

**Todos os nodes estão conformes com o documento ESTRUTURA_NODES_IMOBZI.md**

Principais mudanças desta versão:
1. Deal (Lista) agora usa `/v1/deals` e extrai lista plana
2. Filtro de Etapa adicionado em Deal e Deal Por Estágio
3. Todos os filtros têm opção "Todos" implementada

---

## 🚀 PUBLICAÇÃO

- [x] Build: `npm run build` ✅
- [x] Lint: `npm run lint` ✅
- [x] Git: Commit e push ✅
- [ ] npm: `npm publish --otp=CODIGO` (aguardando OTP)

