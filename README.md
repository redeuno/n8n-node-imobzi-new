# n8n-nodes-imobzi-latest

Node customizado para integração com a **API da Imobzi** no n8n.

[![npm version](https://badge.fury.io/js/n8n-nodes-imobzi-latest.svg)](https://www.npmjs.com/package/n8n-nodes-imobzi-latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Recursos Disponíveis

### Recursos Principais

| Recurso | Operações |
|---------|-----------|
| **Contato** | Listar, Buscar por ID, Buscar por Código, Verificar Existência, Criar, Atualizar, Deletar |
| **Imóvel** | Listar, Buscar por ID, Buscar por Código, Estatísticas, Criar, Atualizar, Deletar |
| **Locação** | Listar, Buscar por ID |
| **Fatura** | Listar, Buscar por ID |
| **Funil (Deal)** | Listar, Buscar por ID, Criar, Atualizar |
| **Funil Por Estágio** | Listar (visão Kanban) |
| **Transação Financeira** | Listar (com filtros completos) |
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
  - Usuário Responsável: Dropdown com 16 usuários
  - Origem: Dropdown com 38 opções
  - Tags: Dropdown com 57 opções
  - Smart List: Meus Contatos, Novos Leads, etc
```

### Criar/Atualizar Contato

```
Recurso: Contato
Operação: Criar / Atualizar
Tipo de Contato: Pessoa/Lead/Organização
Dados (JSON):
{
  "name": "Nome do Contato",
  "email": "email@exemplo.com",
  "phones": [{"number": "67999999999"}]
}
```

### Listar Transações Financeiras

```
Recurso: Transação Financeira
Operação: Get Many
Filtros:
  - Data Início / Data Fim
  - Status: Pago / Pendente
  - Tipo: Receita / Despesa
  - Conta Bancária
  - Ordenar Por / Ordem
```

### Listar Calendário

```
Recurso: Calendário
Operação: Get Many
Ano: 2025
Mês: Dezembro
Filtros:
  - Usuário: Dropdown (Todos ou específico)
  - Tipo de Item: Visita/Tarefa/WhatsApp/Chamada
  - Exibir Feriados: Sim/Não
```

## 🔧 Auto-Paginação

O node suporta auto-paginação automática. Selecione a quantidade de registros:

- 50 registros
- 100 registros
- 200 registros
- 500 registros
- Todos (máx 5000)

## 📊 Filtros Disponíveis (v2.6.0)

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

### Transação Financeira (NOVO v2.6.0)
- **Data Início / Data Fim**: Período de busca
- **Status**: Pago, Pendente, Todos
- **Tipo**: Receita, Despesa, Todos
- **Conta Bancária**: ID da conta
- **Ordenar Por**: Data de Vencimento, Data de Pagamento, Valor
- **Ordem**: Crescente, Decrescente

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

### CRUD
- **Create**: POST para criar novos registros
- **Update**: POST para atualizar (API Imobzi não usa PATCH)
- **Delete**: DELETE para remover registros

### Paginação
- Contacts: A API ignora o limite e sempre retorna 50 por página (auto-paginação via cursor)
- Invoices e Transactions: Usam `next_page` (número) para paginação
- Outros: Usam `cursor` para paginação

### IDs
- Usuários: STRING (ex: "P1ibK4GFPqZYKIx9e55RpQobt7J2")
- Contatos/Imóveis: STRING numérica
- Locações/Pipelines: NUMBER
- Faturas: STRING UUID

## 🆕 Novidades v2.6.0

- ✅ **Transações Financeiras**: 7 filtros completos
- ✅ **CRUD Contato**: Create, Update, Delete
- ✅ **CRUD Imóvel**: Create, Update, Delete
- ✅ **CRUD Deal**: Create, Update, Get by ID
- ✅ **Filtros testados**: Todos validados na API

### Versões anteriores

**v2.5.0:**
- Calendar corrigido: search_all=true + holiday_year
- 57 Tags em dropdown
- 38 Origens em dropdown
- 16 Usuários com IDs reais
- Smart Lists completas

**v2.4.0:**
- Período pré-definido em faturas
- CPF/CNPJ aceita formatação

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

**Versão:** 2.6.0  
**Última atualização:** Dezembro 2024  
**Testado com:** API Imobzi (mapeamento completo)
