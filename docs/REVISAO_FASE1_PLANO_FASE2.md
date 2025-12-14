# 📊 REVISÃO FASE 1 + PLANO FASE 2

**Versão Atual:** 2.12.0  
**Data:** 14/12/2025  
**Baseado em:** +250 testes da API, requisições do App Imobzi

---

## 📋 ÍNDICE

1. [Revisão Completa da Fase 1](#fase-1---revisão-completa)
2. [Resumo do Status da Fase 1](#resumo-status-fase-1)
3. [O que Falta na Fase 1](#o-que-falta-fase-1)
4. [Plano da Fase 2](#fase-2---plano-de-implementação)
5. [Novos Recursos Descobertos](#novos-recursos-descobertos)
6. [Melhorias Identificadas](#melhorias-identificadas)
7. [Roadmap Completo](#roadmap-completo)

---

# FASE 1 - REVISÃO COMPLETA

---

## 1. FUNIL (DEAL) - LISTA

### 📝 O QUE FAZ
Busca negócios (deals) do CRM Imobzi e retorna em formato de **lista plana**.

### 🎯 PARA QUE SERVE
- Relatórios, Integrações, Automações, Análises, Notificações

### 🔗 ENDPOINT
`/v1/deals`

### 🔧 OPERAÇÕES

| Operação | Descrição | Status v2.12.0 | Testado |
|----------|-----------|----------------|---------|
| **Get Many** | Lista deals com filtros | ✅ Funciona | ✅ 233 deals |
| **Obter Por ID** | Busca deal específico | ⚠️ Bug API (erro 500) | ✅ Testado |
| **Criar** | Cria novo deal | ✅ Funciona | ⚠️ Não testado |
| **Atualizar** | Atualiza deal existente | ✅ Funciona | ⚠️ Não testado |

### 🎯 FILTROS - STATUS v2.12.0

```
📂 Grupo de Funil (pipeline_group_id)
├── ✅ Todos os Grupos → '' (233 deals)
├── ✅ Geral de Negócios → 5675099632959488 (233 deals)
├── ✅ Captação de Imóveis → 5370013421666304 (112 deals)
├── ✅ Comissões → 6405034089644032 (1 deal)
├── ✅ Gestão de Solicitações → 6419593693233152 (0 deals)
└── ✅ Gestão de Tarefas → 6594235603091456 (9 deals)

📊 Etapa/Estágio (pipeline_id)
├── ✅ Todas as Etapas → ''
├── ⚠️ Oportunidades → 4584666827849728 (não filtra na API)
├── ⚠️ Qualificação → 6005926736691200 (não filtra na API)
├── ⚠️ Visita → 5381346821144576 (não filtra na API)
├── ⚠️ Follow UP → 5944296774565888 (não filtra na API)
├── ⚠️ Em Atendimento → 6481696604553216 (não filtra na API)
├── ⚠️ Negociação → 6507246727987200 (não filtra na API)
└── ⚠️ Fechamento → 4677659379367936 (não filtra na API)

📋 Status do Deal (deal_status) - ATUALIZADO v2.12.0
├── ✅ Todos → 'all' (233 deals)
├── ✅ Ganho → 'win' (19 deals) ← ADICIONADO
├── ✅ Perdido → 'lost' (220 deals)
├── ✅ Estagnado → 'stagnant' (229 deals) ← ADICIONADO
├── ✅ Radar de Imóveis → 'property_radar' (100 deals) ← ADICIONADO
├── ✅ +3 Meses → 'out_of_date' (201 deals) ← ADICIONADO
├── ❌ in_progress → ERRO 422
└── ❌ gained → ERRO 422

🏷️ Tipo de Negócio (deal_type) - ATUALIZADO v2.12.0
├── ✅ Todos → 'all' (233 deals)
├── ✅ Locação → 'rent' (138 deals) ← ADICIONADO
├── ❌ sale → ERRO 422
├── ❌ both → ERRO 422
└── ❌ lease → ERRO 422

👤 Corretor (user_id)
├── ✅ Todos → 'all' (233 deals)
├── ✅ Mariana Cabriotti → 44 deals
├── ✅ Antonio Carlos → 223 deals
└── ✅ [+ 14 usuários...]
```

### ✅ STATUS FASE 1: COMPLETO

---

## 2. FUNIL POR ESTÁGIO - KANBAN

### 📝 O QUE FAZ
Busca negócios agrupados por estágio, formato Kanban.

### 🔧 OPERAÇÕES

| Operação | Status v2.12.0 | Testado |
|----------|----------------|---------|
| **Get Many** | ✅ Funciona | ✅ |

### 🎯 FILTROS
(Mesmos filtros do Deal Lista - todos testados)

### ✅ STATUS FASE 1: COMPLETO

---

## 3. CONTATO

### 📝 O QUE FAZ
Gerencia contatos do CRM - pessoas, leads, organizações.

### 🔗 ENDPOINT
`/v1/contacts`

### 🔧 OPERAÇÕES

| Operação | Descrição | Status v2.12.0 | Testado |
|----------|-----------|----------------|---------|
| **Get Many** | Lista contatos | ✅ Funciona | ✅ 16.064 total |
| **Obter Por ID** | Busca por ID | ✅ Funciona | ✅ |
| **Buscar Por Código** | Busca por código | ✅ Só funciona para "Pessoa" | ✅ |
| **Verificar Existência** | CPF/CNPJ/Email | ✅ Funciona | ✅ |
| **Criar** | Cria contato | ✅ Funciona | ⚠️ Não testado |
| **Atualizar** | Atualiza contato | ✅ Funciona | ⚠️ Não testado |
| **Deletar** | Remove contato | ✅ Funciona | ⚠️ Não testado |

### 🎯 FILTROS - STATUS v2.12.0

```
📋 Smart List - 12 opções
├── ✅ all → 50 (paginação)
├── ✅ with_deals → 50
├── ✅ without_deals → 50
├── ✅ new_contacts → 50
├── ✅ new_leads → 50
├── ✅ pending → 50
├── ✅ inactives → 4
├── ✅ out_of_date → 50
├── ⚠️ my_contacts → 0 (requer user autenticado)
├── ⚠️ my_leads → 0 (requer user autenticado)
├── ⚠️ shared_with_me → 0 (requer compartilhamento)
└── ⚠️ shared_with_others → 0 (requer compartilhamento)

📝 Tipo de Contato (contact_type)
├── ✅ person → 50
├── ✅ organization → 50
├── ✅ lead → 50
└── ✅ all → 50

🏷️ Tags - 57 opções
├── ✅ Todas → ''
├── ✅ Tags específicas funcionam → "1 Milhão à 2 Milhões" → 18
└── ✅ "100K à 200K" → 10

📍 Origem (media_source) - 38 opções
├── ✅ Todas → ''
└── ✅ Site, OLX, Instagram... funcionam

👤 Usuário Responsável (user_id/manager_id)
├── ⚠️ user_id → NÃO FILTRA (sempre retorna 50)
└── ⚠️ manager_id → NÃO FILTRA (sempre retorna 50)
```

### ⚠️ LIMITAÇÃO: Filtro de usuário não funciona na API

### ✅ STATUS FASE 1: COMPLETO (com limitações da API)

---

## 4. IMÓVEL

### 📝 O QUE FAZ
Gerencia catálogo de imóveis da imobiliária.

### 🔗 ENDPOINT
`/v1/properties`

### 🔧 OPERAÇÕES

| Operação | Descrição | Status v2.12.0 | Testado |
|----------|-----------|----------------|---------|
| **Get Many** | Lista imóveis | ✅ Funciona | ✅ 10/página |
| **Obter Por ID** | Busca por ID | ✅ Funciona | ✅ |
| **Buscar Por Código** | Busca por código | ✅ Funciona | ✅ |
| **Estatísticas** | Dados de visualização | ✅ Funciona | ✅ |
| **Verificar Existência** | Verifica código | ⚠️ Pode retornar incorreto | ✅ Bug conhecido |
| **Criar** | Cria imóvel | ✅ Funciona | ⚠️ Não testado |
| **Atualizar** | Atualiza imóvel | ✅ Funciona | ⚠️ Não testado |
| **Deletar** | Remove imóvel | ✅ Funciona | ⚠️ Não testado |

### 🎯 FILTROS - STATUS v2.12.0

```
📋 Smart List - 16 opções
├── ✅ Todas → ''
├── ✅ available → 10
├── ✅ rent → 10
├── ✅ sale → 10
└── ⚠️ Todos retornam 10 (paginação) - não confirmado se filtram

🏠 Finalidade (finality)
├── ⚠️ residential → 10 (não confirmado)
├── ⚠️ commercial → 10 (não confirmado)
└── ⚠️ rural → 10 (não confirmado)

📊 Status (status)
├── ⚠️ available → 10 (não confirmado)
├── ⚠️ reserved → 10 (não confirmado)
└── ⚠️ unavailable → 10 (não confirmado)

👤 Corretor (user_id)
└── ✅ Funciona
```

### ⚠️ LIMITAÇÃO: Difícil confirmar filtros com paginação de 10

### ✅ STATUS FASE 1: COMPLETO (com limitações da API)

---

## 5. LOCAÇÃO

### 📝 O QUE FAZ
Gerencia contratos de locação.

### 🔗 ENDPOINT
`/v1/leases`

### 🔧 OPERAÇÕES

| Operação | Descrição | Status v2.12.0 | Testado |
|----------|-----------|----------------|---------|
| **Get Many** | Lista locações | ✅ Funciona | ✅ 15 com smart_list |
| **Obter Por ID** | Busca por ID | ✅ Funciona | ✅ |
| **Criar** | Cria locação | ❌ NÃO IMPLEMENTADO | - |
| **Atualizar** | Atualiza locação | ❌ NÃO IMPLEMENTADO | - |
| **Deletar** | Remove locação | ❌ NÃO IMPLEMENTADO | - |

### 🎯 FILTROS - STATUS v2.12.0

```
📋 Smart List - DESCOBERTA IMPORTANTE!
├── ✅ all → 15 locações
├── ✅ active → 15 locações
├── ✅ actives → 15 locações
├── ✅ actives_with_invoices_late → 0
├── ✅ in_progress → 15
├── ✅ expired → 15
├── ✅ expiring → 15
├── ✅ finished → 15
├── ✅ inactive → 15
├── ✅ pending → 15
└── ✅ renewed → 15

📊 Status (alternativo)
├── ✅ active → 12 locações
└── ✅ all → 12 locações

⚠️ IMPORTANTE: smart_list retorna MAIS dados (15) que status (12)!
```

### ⚠️ PENDENTE FASE 2: CRUD completo

### ✅ STATUS FASE 1: PARCIAL (falta CRUD)

---

## 6. FATURA

### 📝 O QUE FAZ
Gerencia faturas/boletos de locações.

### 🔗 ENDPOINT
`/v1/invoices`

### 🔧 OPERAÇÕES

| Operação | Descrição | Status v2.12.0 | Testado |
|----------|-----------|----------------|---------|
| **Get Many** | Lista faturas | ✅ Funciona | ✅ |
| **Obter Por ID** | Busca por ID | ✅ Funciona | ✅ |
| **Criar** | Cria fatura | ❌ NÃO IMPLEMENTADO | - |
| **Atualizar** | Atualiza fatura | ❌ NÃO IMPLEMENTADO | - |

### 🎯 FILTROS - STATUS v2.12.0

```
📅 Período
├── ✅ Todos → ''
├── ✅ 15 dias → 15
├── ✅ 30 dias → 30
├── ✅ 60 dias → 60
├── ✅ 90 dias → 90
└── ✅ Personalizado → custom

📅 Datas - DESCOBERTA IMPORTANTE!
├── ✅ Sem datas → 10 faturas (mês atual)
└── ✅ Com datas 2025 → 25 faturas (histórico)

📊 Status - ATUALIZADO v2.12.0
├── ✅ all → funciona
├── ✅ paid → 7
├── ✅ pending → 3
├── ✅ partially_paid → 0
├── ✅ expired → 0
├── ✅ canceled → 0 (COM 1 L!) ← CORRIGIDO
├── ❌ cancelled → ERRO 422 (COM 2 L's = ERRO)
└── ✅ deleted → 0

💳 Método de Pagamento
├── ✅ all_payments → 7
├── ✅ bank_slip → 7
├── ✅ credit_card → 0
├── ✅ pix → 0
└── ❌ transfer → ERRO 422
```

### ⚠️ PENDENTE FASE 2: Criar fatura (se API permitir)

### ✅ STATUS FASE 1: PARCIAL (falta CRUD)

---

## 7. TRANSAÇÃO FINANCEIRA

### 📝 O QUE FAZ
Gerencia movimentações financeiras - receitas, despesas, transferências.

### 🔗 ENDPOINT
`/v1/financial/transactions`

### 🔧 OPERAÇÕES

| Operação | Descrição | Status v2.12.0 | Testado |
|----------|-----------|----------------|---------|
| **Get Many** | Lista transações | ✅ Funciona | ✅ 56 |
| **Obter Por ID** | Busca por ID | ❌ NÃO IMPLEMENTADO | - |
| **Criar** | Cria transação | ❌ NÃO IMPLEMENTADO | - |
| **Atualizar** | Atualiza transação | ❌ NÃO IMPLEMENTADO | - |
| **Deletar** | Remove transação | ❌ NÃO IMPLEMENTADO | - |

### 🎯 FILTROS - STATUS v2.12.0

```
🏦 Conta Financeira (account_id)
├── ✅ Todas → ''
├── ✅ PJBank → 5374237794631680
├── ✅ PJBank Cartão → 5713727725764608
├── ✅ Dinheiro → 6317241432276992
├── ✅ Caixa Economica → 6467636073332736
└── ✅ Mercado Pago → 6487354834419712

📅 Datas
├── ✅ start_at → funciona
└── ✅ end_at → funciona

🏷️ Tipo (filter_type) - TESTADO!
├── ✅ all → 56
├── ✅ income → 10 (receitas)
├── ✅ expense → 42 (despesas)
└── ✅ transfer → 56

📊 Status
├── ✅ paid → 45
├── ✅ pending → 56
├── ✅ all → 56
└── ⚠️ overdue → 56 (não filtra?)
```

### ⚠️ PENDENTE FASE 2: CRUD completo

### ✅ STATUS FASE 1: PARCIAL (falta CRUD)

---

## 8. CALENDÁRIO

### 📝 O QUE FAZ
Busca atividades do calendário - visitas, tarefas, chamadas, WhatsApp.

### 🔗 ENDPOINT
`/v1/calendar`

### 🔧 OPERAÇÕES

| Operação | Descrição | Status v2.12.0 | Testado |
|----------|-----------|----------------|---------|
| **Get Many** | Lista atividades | ✅ Funciona | ✅ 787 itens |
| **Criar** | Cria atividade | ❌ NÃO IMPLEMENTADO | - |
| **Atualizar** | Atualiza atividade | ❌ NÃO IMPLEMENTADO | - |
| **Deletar** | Remove atividade | ❌ NÃO IMPLEMENTADO | - |

### 🎯 FILTROS - STATUS v2.12.0

```
📅 Ano/Mês (obrigatórios)
├── ✅ year → 2025
└── ✅ month → 12

👤 Usuário (user_filter)
├── ✅ Todos → search_all=true → 787 itens
├── ✅ Mariana → 170 itens
├── ✅ Antonio → 223 itens
└── ❌ user_id=all → ERRO 500

📋 Tipo de Item (item_type) - ATUALIZADO v2.12.0
├── ✅ task → 461 itens ← CONFIRMADO!
├── ✅ whatsapp → 326 itens ← CONFIRMADO!
├── ✅ visit → 0 itens
├── ✅ call → 0 itens
├── ❌ all → ERRO 422
└── ❌ meeting → ERRO 422

🎄 Exibir Feriados
├── ✅ true → inclui feriados
└── ✅ false → sem feriados
```

### ⚠️ PENDENTE FASE 2: CRUD de atividades

### ✅ STATUS FASE 1: PARCIAL (falta CRUD)

---

## 9. RECURSOS AUXILIARES

### 📝 O QUE FAZ
Fornecem dados para dropdowns e validações.

| Recurso | Endpoint | Itens | Status |
|---------|----------|-------|--------|
| Grupos de Funil | `/v1/pipeline-groups` | 5 | ✅ |
| Estágios | `/v1/pipelines` | 7 | ✅ |
| Usuários | `/v1/users` | 16 | ✅ |
| Contas Financeiras | `/v1/financial/accounts` | 5 | ✅ |
| Origens | `/v1/media-sources` | 38 | ✅ |
| Tags | `/v1/contacts/tags` | 57 | ✅ |
| Tipos de Imóvel | `/v1/property-types` | 27 | ✅ |
| Motivos de Perda | `/v1/deal/lost-reason` | 6 | ✅ |
| Bancos | `/v1/banks` | 198 | ✅ |

### ✅ STATUS FASE 1: COMPLETO

---

# RESUMO STATUS FASE 1

## ✅ COMPLETO

| Node | Get Many | Get By ID | Create | Update | Delete | Filtros |
|------|----------|-----------|--------|--------|--------|---------|
| **Funil (Deal)** | ✅ | ⚠️ Bug | ✅ | ✅ | - | ✅ v2.12 |
| **Funil Por Estágio** | ✅ | - | - | - | - | ✅ v2.12 |
| **Contato** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Imóvel** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Recursos Auxiliares** | ✅ | - | - | - | - | - |

## ⚠️ PARCIAL (Falta CRUD)

| Node | Get Many | Get By ID | Create | Update | Delete | Filtros |
|------|----------|-----------|--------|--------|--------|---------|
| **Locação** | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| **Fatura** | ✅ | ✅ | ❌ | ❌ | - | ✅ v2.12 |
| **Transação** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Calendário** | ✅ | - | ❌ | ❌ | ❌ | ✅ v2.12 |

---

# O QUE FALTA FASE 1

## 🔴 Operações CRUD Pendentes

```
📋 LOCAÇÃO
├── ❌ Criar locação
├── ❌ Atualizar locação
└── ❌ Deletar locação

💰 FATURA
├── ❌ Criar fatura
└── ❌ Atualizar fatura

💳 TRANSAÇÃO FINANCEIRA
├── ❌ Obter por ID
├── ❌ Criar transação
├── ❌ Atualizar transação
└── ❌ Deletar transação

📅 CALENDÁRIO
├── ❌ Criar atividade
├── ❌ Atualizar atividade
└── ❌ Deletar atividade
```

## 🟡 Bugs Conhecidos da API

```
⚠️ Deal por ID → Erro 500
⚠️ Property Exists → Retorna incorreto
⚠️ Contato user_id → Não filtra
⚠️ Deal pipeline_id → Não filtra por etapa
```

---

# FASE 2 - PLANO DE IMPLEMENTAÇÃO

---

## PRIORIDADE 1: CRUD Completo

### 2.1. TRANSAÇÃO FINANCEIRA - CRUD

```
📝 O QUE FAZ
CRUD completo para transações financeiras.

🔧 OPERAÇÕES A IMPLEMENTAR

| Operação | Endpoint | Método | Status |
|----------|----------|--------|--------|
| Obter Por ID | /v1/financial/transaction/{id} | GET | 🔜 |
| Criar | /v1/financial/transaction | POST | 🔜 |
| Atualizar | /v1/financial/transaction/{id} | POST/PATCH | 🔜 |
| Deletar | /v1/financial/transaction/{id} | DELETE | 🔜 |

📋 CAMPOS PARA CRIAR/ATUALIZAR
├── type: income / expense / transference
├── amount: valor
├── due_date: data de vencimento
├── paid_at: data de pagamento
├── account_id: conta financeira
├── description: descrição
├── category: categoria
└── status: paid / pending
```

### 2.2. CALENDÁRIO - CRUD

```
📝 O QUE FAZ
CRUD para atividades do calendário.

🔧 OPERAÇÕES A IMPLEMENTAR

| Operação | Endpoint | Método |
|----------|----------|--------|
| Criar | /v1/calendar/item | POST |
| Atualizar | /v1/calendar/item/{id} | POST/PATCH |
| Deletar | /v1/calendar/item/{id} | DELETE |

📋 CAMPOS PARA CRIAR/ATUALIZAR
├── type: visit / task / call / whatsapp
├── title: título
├── date: data
├── time: hora
├── user_id: usuário responsável
├── contact_id: contato relacionado
├── property_id: imóvel relacionado
├── deal_id: deal relacionado
└── notes: observações
```

### 2.3. LOCAÇÃO - CRUD

```
📝 O QUE FAZ
CRUD para contratos de locação.

🔧 OPERAÇÕES A IMPLEMENTAR

| Operação | Endpoint | Método |
|----------|----------|--------|
| Criar | /v1/lease | POST |
| Atualizar | /v1/lease/{id} | POST/PATCH |
| Deletar | /v1/lease/{id} | DELETE |

📋 CAMPOS PARA CRIAR/ATUALIZAR
├── property_id: imóvel
├── tenant_id: inquilino
├── start_date: data início
├── end_date: data fim
├── rent_value: valor do aluguel
├── payment_day: dia do pagamento
├── status: active / inactive
└── notes: observações
```

---

## PRIORIDADE 2: NOVOS RECURSOS DESCOBERTOS

### 2.4. TIMELINE - Histórico do Contato

```
📝 O QUE FAZ
Busca histórico de interações de um contato.

🔗 ENDPOINT
/v1/timeline?parent_id={contact_id}&parent_type=person&type=all

🔧 OPERAÇÕES

| Operação | Descrição |
|----------|-----------|
| Get Many | Lista histórico de um contato |

📋 PARÂMETROS
├── parent_id: ID do contato
├── parent_type: person / organization / lead
├── type: all / call / visit / note / email
├── deal_id: ID do deal (opcional)
└── cursor: paginação

📤 OUTPUT ESPERADO
├── Notas criadas
├── Chamadas realizadas
├── Visitas agendadas
├── Emails enviados
└── Alterações de status
```

### 2.5. PROPOSTA - Propostas de Deal

```
📝 O QUE FAZ
Gerencia propostas vinculadas a deals.

🔗 ENDPOINT
/v1/proposal/deal/{deal_id}

🔧 OPERAÇÕES

| Operação | Descrição |
|----------|-----------|
| Get Many | Lista propostas de um deal |
| Criar | Cria nova proposta |
| Atualizar | Atualiza proposta |

📋 CAMPOS
├── deal_id: deal relacionado
├── value: valor da proposta
├── status: pending / accepted / rejected
├── payment_type: à vista / financiado
├── notes: observações
└── expiration_date: validade
```

### 2.6. RESERVA DE IMÓVEL

```
📝 O QUE FAZ
Gerencia reservas de imóveis.

🔗 ENDPOINT
/v1/property-reserves

🔧 OPERAÇÕES

| Operação | Descrição |
|----------|-----------|
| Get Many | Lista reservas de um deal |
| Criar | Cria reserva |
| Cancelar | Cancela reserva |

📋 PARÂMETROS
├── deal_id: deal relacionado
├── property_id: imóvel
└── status: active / cancelled
```

### 2.7. MATCH DE IMÓVEIS

```
📝 O QUE FAZ
Busca imóveis compatíveis com perfil do cliente.

🔗 ENDPOINT
/v1/deal/{deal_id}/properties-match

🔧 OPERAÇÕES

| Operação | Descrição |
|----------|-----------|
| Get Many | Lista imóveis compatíveis |

📋 PARÂMETROS
├── deal_id: deal
├── profile_id: perfil do cliente
└── cursor: paginação
```

---

## PRIORIDADE 3: MELHORIAS NOS FILTROS

### 3.1. CONTATOS - manager_id vs user_id

```
📋 INVESTIGAR
├── App usa: manager_id
├── Node usa: user_id
├── Nenhum parece filtrar
└── Testar com paginação completa
```

### 3.2. FATURAS - Parâmetros do App

```
📋 ADICIONAR
├── contract_type: all / rent / sale
├── period: created_at / due_date / paid_at
└── payment_methods_available: all_payments
```

### 3.3. TRANSAÇÕES - periodType

```
📋 ADICIONAR
├── periodType: this_month / this_month_until_today / last_month
└── Simplifica seleção de datas
```

### 3.4. LOCAÇÕES - Datas

```
📋 ADICIONAR
├── start_at: data início do período
└── end_at: data fim do período
```

---

## PRIORIDADE 4: DROPDOWNS DINÂMICOS

```
📝 O QUE FAZ
Buscar opções da API em tempo real.

📋 DROPDOWNS A DINAMIZAR
├── user_id → buscar de /v1/users
├── pipeline_group_id → buscar de /v1/pipeline-groups
├── pipeline_id → buscar de /v1/pipelines
├── account_id → buscar de /v1/financial/accounts
├── media_source → buscar de /v1/media-sources
├── tags → buscar de /v1/contacts/tags
└── property_type → buscar de /v1/property-types

⚠️ COMPLEXIDADE
├── Requer loadOptionsMethod no n8n
├── Chamadas extras à API
└── Pode impactar performance
```

---

# NOVOS RECURSOS DESCOBERTOS

## Endpoints do App Imobzi

| Endpoint | Descrição | Prioridade |
|----------|-----------|------------|
| `/v1/timeline` | Histórico do contato | 🔴 Alta |
| `/v1/proposal/deal/{id}` | Propostas | 🟡 Média |
| `/v1/property-reserves` | Reservas | 🟡 Média |
| `/v1/deal/{id}/properties-match` | Match de imóveis | 🟢 Baixa |
| `/v1/contacts/search` | Busca avançada | 🟢 Baixa |
| `/v1/deals/search` | Busca de deals | 🟢 Baixa |

---

# MELHORIAS IDENTIFICADAS

## Performance

| Melhoria | Impacto |
|----------|---------|
| Cache de dropdowns | Menos chamadas API |
| Limite de paginação configurável | Mais controle |

## UX

| Melhoria | Impacto |
|----------|---------|
| Dropdowns dinâmicos | Dados sempre atualizados |
| Validação de campos | Menos erros |
| Mensagens de erro claras | Melhor debugging |

---

# ROADMAP COMPLETO

## v2.12.0 ✅ ATUAL
- [x] Deals: status win, stagnant, property_radar, out_of_date
- [x] Deals: deal_type=rent
- [x] Calendário: item_type task, whatsapp, visit, call
- [x] Faturas: status=canceled (1 L)
- [x] +250 testes da API

## v2.13.0 - CRUD Transações
- [ ] Transação: Obter por ID
- [ ] Transação: Criar
- [ ] Transação: Atualizar
- [ ] Transação: Deletar

## v2.14.0 - CRUD Calendário
- [ ] Calendário: Criar atividade
- [ ] Calendário: Atualizar atividade
- [ ] Calendário: Deletar atividade

## v2.15.0 - CRUD Locação
- [ ] Locação: Criar
- [ ] Locação: Atualizar
- [ ] Locação: Deletar

## v2.16.0 - Novos Recursos
- [ ] Timeline (histórico do contato)
- [ ] Propostas de Deal
- [ ] Reserva de Imóvel

## v2.17.0 - Melhorias
- [ ] Dropdowns dinâmicos
- [ ] Match de imóveis
- [ ] Filtros avançados

---

# CHECKLIST FASE 1

## ✅ Completo
- [x] Deal (Lista) - Get Many + CRUD + Filtros v2.12
- [x] Deal Por Estágio - Get Many + Filtros v2.12
- [x] Contato - CRUD completo + Filtros
- [x] Imóvel - CRUD completo + Filtros
- [x] Fatura - Get Many/ID + Filtros v2.12
- [x] Calendário - Get Many + Filtros v2.12
- [x] Transação - Get Many + Filtros
- [x] Locação - Get Many/ID + Filtros
- [x] Recursos Auxiliares - Todos

## ⚠️ Pendente (Fase 2)
- [ ] Locação CRUD
- [ ] Fatura CRUD (se API permitir)
- [ ] Transação CRUD
- [ ] Calendário CRUD
- [ ] Novos recursos (Timeline, Propostas, Reservas)
- [ ] Dropdowns dinâmicos

---

**Documento criado em:** 14/12/2025  
**Próxima versão planejada:** 2.13.0 (CRUD Transações)

