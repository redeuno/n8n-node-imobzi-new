# 📋 CHANGELOG v2.13.0

**Data:** 14/12/2025  
**Tipo:** Major Release - Fase 1 Completa + Fase 2

---

## 🎯 Resumo

Esta versão completa a **Fase 1** (CRUD para todos os recursos) e implementa a **Fase 2** (novos recursos avançados).

---

## ✅ FASE 1 COMPLETA - CRUD

### 📋 Transação Financeira

| Operação | Endpoint | Status |
|----------|----------|--------|
| **Get Many** | `/v1/financial/transactions` | ✅ Já existia |
| **Get by ID** | `/v1/financial/transaction/{id}` | ✅ **NOVO** |
| **Create** | `/v1/financial/transaction` | ✅ **NOVO** |
| **Update** | `/v1/financial/transaction/{id}` | ✅ **NOVO** |
| **Delete** | `/v1/financial/transaction/{id}` | ✅ **NOVO** |

### 📅 Calendário

| Operação | Endpoint | Status |
|----------|----------|--------|
| **Get Many** | `/v1/calendar` | ✅ Já existia |
| **Create** | `/v1/calendar/item` | ✅ **NOVO** |
| **Update** | `/v1/calendar/item/{id}` | ✅ **NOVO** |
| **Delete** | `/v1/calendar/item/{id}` | ✅ **NOVO** |

### 🏠 Locação

| Operação | Endpoint | Status |
|----------|----------|--------|
| **Get Many** | `/v1/leases` | ✅ Já existia |
| **Get by ID** | `/v1/lease/{id}` | ✅ Já existia |
| **Create** | `/v1/leases` | ✅ **NOVO** |
| **Update** | `/v1/lease/{id}` | ✅ **NOVO** |
| **Delete** | `/v1/lease/{id}` | ✅ **NOVO** |

### 💰 Fatura

| Operação | Endpoint | Status |
|----------|----------|--------|
| **Get Many** | `/v1/invoices` | ✅ Já existia |
| **Get by ID** | `/v1/invoice/{id}` | ✅ Já existia |
| **Create** | `/v1/invoices` | ✅ **NOVO** |
| **Update** | `/v1/invoice/{id}` | ✅ **NOVO** |

---

## ✅ FASE 2 COMPLETA - NOVOS RECURSOS

### 📜 Histórico (Timeline)

**O que faz:** Busca histórico de interações de um contato (notas, chamadas, visitas, etc.)

| Operação | Endpoint | Descrição |
|----------|----------|-----------|
| **Get Many** | `/v1/timeline` | Listar histórico do contato |
| **Create** | `/v1/{type}/{id}/notes` | Criar nota no histórico |

**Parâmetros:**
- `parent_id` - ID do contato
- `parent_type` - Tipo (person/lead/organization)
- `deal_id` - ID do deal (opcional)
- `type` - Tipo de histórico (all/call/visit/note)

### 📝 Proposta

**O que faz:** Gerencia propostas vinculadas a deals.

| Operação | Endpoint | Descrição |
|----------|----------|-----------|
| **Get Many** | `/v1/proposal/deal/{id}` | Listar propostas do deal |
| **Create** | `/v1/proposal/deal/{id}` | Criar nova proposta |
| **Update** | `/v1/proposal/{id}` | Atualizar proposta |

**Parâmetros:**
- `deal_id` - ID do deal
- `proposal_id` - ID da proposta (para update)

### 🏷️ Reserva de Imóvel

**O que faz:** Gerencia reservas de imóveis vinculadas a deals.

| Operação | Endpoint | Descrição |
|----------|----------|-----------|
| **Get Many** | `/v1/property-reserves` | Listar reservas do deal |
| **Create** | `/v1/property-reserves` | Criar reserva |
| **Cancel** | `/v1/property-reserve/{id}` | Cancelar reserva |

**Parâmetros:**
- `deal_id` - ID do deal
- `reserve_id` - ID da reserva (para cancelar)

### 🔍 Match de Imóveis

**O que faz:** Busca imóveis compatíveis com o perfil do cliente no deal.

| Operação | Endpoint | Descrição |
|----------|----------|-----------|
| **Get Many** | `/v1/deal/{id}/properties-match` | Listar imóveis compatíveis |

**Parâmetros:**
- `deal_id` - ID do deal
- `profile_id` - ID do perfil (opcional)

---

## 📊 Resumo de Recursos

### Recursos Completos (CRUD)

| Recurso | Get All | Get ID | Create | Update | Delete |
|---------|---------|--------|--------|--------|--------|
| **Contato** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Imóvel** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Deal** | ✅ | ⚠️ Bug | ✅ | ✅ | - |
| **Transação** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Calendário** | ✅ | - | ✅ | ✅ | ✅ |
| **Locação** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Fatura** | ✅ | ✅ | ✅ | ✅ | - |

### Novos Recursos (Fase 2)

| Recurso | Get All | Create | Update | Delete |
|---------|---------|--------|--------|--------|
| **Timeline** | ✅ | ✅ | - | - |
| **Proposta** | ✅ | ✅ | ✅ | - |
| **Reserva** | ✅ | ✅ | - | ✅ |
| **Match** | ✅ | - | - | - |

### Recursos Auxiliares

| Recurso | Endpoint | Itens |
|---------|----------|-------|
| Grupos de Funil | `/v1/pipeline-groups` | 5 |
| Estágios | `/v1/pipelines` | 7 |
| Usuários | `/v1/users` | 16 |
| Contas | `/v1/financial/accounts` | 5 |
| Origens | `/v1/media-sources` | 38 |
| Tags | `/v1/contacts/tags` | 57 |
| Tipos de Imóvel | `/v1/property-types` | 27 |
| Motivos de Perda | `/v1/deal/lost-reason` | 6 |
| Bancos | `/v1/banks` | 198 |

---

## 📁 Arquivos Modificados

- `nodes/Imobzi/Imobzi.node.ts` - Código principal
- `package.json` - Versão 2.13.0
- `README.md` - Documentação atualizada

---

## 🚀 Instalação

```bash
npm install n8n-nodes-imobzi-latest@2.13.0
```

---

## 💡 Exemplos de Uso

### Criar Transação Financeira

```json
{
  "type": "expense",
  "amount": 1500.00,
  "due_date": "2025-12-31",
  "account_id": "5374237794631680",
  "description": "Pagamento de manutenção"
}
```

### Criar Atividade no Calendário

```json
{
  "type": "visit",
  "title": "Visita ao imóvel 396",
  "date": "2025-12-20",
  "time": "14:00",
  "contact_id": "6458099144065024",
  "property_id": "5435857736040448"
}
```

### Buscar Histórico do Contato

```
Recurso: Histórico (Timeline)
Operação: Get Many
ID do Contato: 6458099144065024
Tipo de Contato: Pessoa
```

---

**Versão:** 2.13.0  
**Node Version:** 16  
**Commit:** v2.13.0 - Fase 1 + Fase 2 Completas

