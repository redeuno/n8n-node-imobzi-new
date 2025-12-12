# n8n-nodes-imobzi-latest

Node customizado para integração com a **API da Imobzi** no n8n.

[![npm version](https://badge.fury.io/js/n8n-nodes-imobzi-latest.svg)](https://www.npmjs.com/package/n8n-nodes-imobzi-latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Recursos Disponíveis

### Recursos Principais

| Recurso | Operações |
|---------|-----------|
| **Contato** | Listar, Buscar por ID, Buscar por Código, Verificar Existência, **Criar** |
| **Imóvel** | Listar, Buscar por ID, Buscar por Código, Estatísticas, **Criar** |
| **Locação** | Listar, Buscar por ID |
| **Fatura** | Listar, Buscar por ID |
| **Funil (Deal)** | Listar (busca plana), **Criar** |
| **Funil Por Estágio** | Listar (visão Kanban) |
| **Transação Financeira** | Listar |
| **Calendário** | Listar (com filtros avançados) |
| **Documento** | Listar |
| **Usuário** | Listar |

### Recursos Auxiliares (para dropdowns)

- Estágio (Pipeline)
- Grupo de Funil
- Tipo de Imóvel
- Origem (Media Source)
- Tag de Contato
- Motivo de Perda
- Banco

## 🚀 Instalação

### Via npm (recomendado)

```bash
npm install n8n-nodes-imobzi-latest -g
```

### No n8n Cloud

1. Vá em **Settings** > **Community Nodes**
2. Clique em **Install a community node**
3. Digite: `n8n-nodes-imobzi-latest`
4. Clique em **Install**

### VPS / Self-hosted

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-imobzi-latest
# Reiniciar n8n
pm2 restart n8n
```

## ⚙️ Configuração

### Obter API Key

1. Acesse sua conta Imobzi
2. Vá em **Configurações** > **Integrações** > **API**
3. Copie sua **API Key**

### Configurar no n8n

1. Adicione um node **Imobzi**
2. Clique em **Create New Credential**
3. Cole sua **API Key**
4. Salve

## 📖 Uso

### Listar Contatos

```
Recurso: Contato
Operação: Get Many
Filtros:
  - Tipo de Contato: Pessoa/Organização/Lead
  - Origem: Dropdown com 38 opções
  - Tags: Dropdown com 57 opções
  - Smart List: Meus Contatos, Novos Leads, etc
  - Usuário Responsável: Dropdown com usuários
```

### Criar Contato

```
Recurso: Contato
Operação: Criar
Tipo de Contato: Pessoa/Lead/Organização
Dados (JSON):
{
  "name": "Nome do Contato",
  "email": "email@exemplo.com",
  "phones": [{"number": "67999999999"}]
}
```

### Listar Calendário

```
Recurso: Calendário
Operação: Get Many
Ano: 2025
Mês: Dezembro
Filtros:
  - Usuário: Dropdown (todos ou específico)
  - Tipo de Item: Visita/Tarefa/WhatsApp/Chamada
  - Exibir Feriados: Sim/Não
```

### Listar Faturas

```
Recurso: Fatura
Operação: Get Many
Filtros:
  - Período: 15/30/60/90 dias ou Personalizado
  - Status: Pago/Pendente/Atrasado/Cancelado
  - Método de Pagamento: Boleto/PIX/Cartão de Crédito
```

## 🔧 Auto-Paginação

O node suporta auto-paginação automática. Selecione a quantidade de registros:

- 50 registros
- 100 registros
- 200 registros
- 500 registros
- Todos (máx 5000)

## 📊 Filtros Disponíveis (v2.5.0)

### Contato
- **Usuário Responsável**: Dropdown com 16 usuários
- **Origem**: Dropdown com 38 origens
- **Tags**: Dropdown com 57 tags (sistema + personalizadas)
- **Smart List**: 12 opções (all, my_contacts, new_leads, etc.)
- **Tipo de Contato**: person, organization, lead
- **Busca**: Por nome, email ou telefone

### Imóvel
- **Corretor**: Dropdown com 16 usuários
- **Smart List**: 16 opções (available, rent, sale, without_photos, etc.)
- **Status**: available, reserved, unavailable
- **Finalidade**: residential, commercial, rural

### Locação
- **Smart List**: 9 opções (active, inactive, expiring, finished, etc.)

### Fatura
- **Período**: 15, 30, 60, 90 dias, Personalizado ou Todos
- **Status**: pending, paid, overdue, canceled, partially_paid, expired, deleted, all
- **Método de Pagamento**: bank_slip, pix, credit_card

### Deal
- **Corretor**: Dropdown com 16 usuários
- **Estágio**: Dropdown com 7 estágios
- **Status**: open, in_progress, win, lost, stagnant, out_of_date, property_radar
- **Tipo**: rent, sale, both, all
- **Mostrar Atividades**: Sim/Não

### Deal Por Estágio
- **Corretor**: Dropdown com 16 usuários
- **Grupo de Funil**: Dropdown com 5 grupos

### Calendário
- **Usuário**: Dropdown (Todos ou específico)
- **Tipo de Item**: task, visit, whatsapp, call
- **Exibir Feriados**: Sim/Não

## 🔗 Webhook

O pacote inclui também o node **Imobzi Trigger** para receber webhooks da Imobzi.

Eventos suportados:
- contact.created / contact.updated
- property.created / property.updated
- deal.created / deal.updated / deal.lost / deal.won
- lease.created
- invoice.created / invoice.paid
- visit.scheduled / visit.cancelled
- E outros...

## 📝 Notas Importantes

### Paginação
- Contacts: A API ignora o limite e sempre retorna 50 por página (auto-paginação via cursor)
- Invoices e Transactions: Usam `next_page` (número) para paginação
- Outros: Usam `cursor` para paginação

### Endpoints Corretos
- Transações: `/v1/financial/transactions`
- Contato por ID: `/v1/person/{id}` (não existe `/v1/contact/{id}`)

### IDs
- Usuários: STRING (ex: "P1ibK4GFPqZYKIx9e55RpQobt7J2")
- Contatos/Imóveis: STRING numérica
- Locações/Pipelines: NUMBER
- Faturas: STRING UUID

## 🆕 Novidades v2.5.0

- ✅ **Calendar corrigido**: `search_all=true` + `holiday_year` + `calendar_type=normal`
- ✅ **57 Tags** em dropdown (sistema + personalizadas)
- ✅ **38 Origens** em dropdown
- ✅ **16 Usuários** em dropdown com IDs reais
- ✅ **Smart Lists completas**: Imóveis (16), Contatos (12), Locação (9)
- ✅ **Deals melhorados**: `deal_type` + `deal_status` corrigidos
- ✅ **CRUD**: Create para Contact, Property e Deal
- ✅ **Pipeline Stages**: Dropdown com 7 estágios
- ✅ **Pipeline Groups**: Dropdown com 5 grupos

### Correções anteriores (v2.4.0)
- ✅ Período pré-definido em faturas (15, 30, 60, 90 dias)
- ✅ CPF/CNPJ aceita formatação (com pontos e traços)
- ✅ Status de fatura corrigido
- ✅ Método de pagamento em faturas

## 📄 Licença

MIT © Bruno Mantovani

## 🔗 Links

- [Imobzi](https://imobzi.com)
- [n8n](https://n8n.io)
- [Repositório](https://github.com/redeuno/n8n-node-imobzi-new)
- [npm](https://www.npmjs.com/package/n8n-nodes-imobzi-latest)

## 📞 Suporte

- Issues: [GitHub Issues](https://github.com/redeuno/n8n-node-imobzi-new/issues)
- Email: bruno@redeuno.com.br

---

**Versão:** 2.5.0  
**Última atualização:** Dezembro 2024  
**Testado com:** API Imobzi (mapeamento completo)
