# n8n-nodes-imobzi-latest

Node customizado para integração com a **API da Imobzi** no n8n.

[![npm version](https://badge.fury.io/js/n8n-nodes-imobzi-latest.svg)](https://www.npmjs.com/package/n8n-nodes-imobzi-latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Recursos Disponíveis

### Recursos Principais

| Recurso | Operações |
|---------|-----------|
| **Contato** | Listar, Buscar por ID, Buscar por Código, Verificar Existência |
| **Imóvel** | Listar, Buscar por ID, Buscar por Código, Estatísticas, Verificar Existência |
| **Locação** | Listar, Buscar por ID, Buscar por Código |
| **Fatura** | Listar, Buscar por ID |
| **Funil (Deal)** | Listar (busca plana) |
| **Funil Por Estágio** | Listar (visão Kanban) |
| **Transação Financeira** | Listar |
| **Calendário** | Listar (requer ano/mês) |
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
  - Origem: OLX, Site, etc
  - Smart List: Meus Contatos, Novos Leads, etc
```

### Buscar Imóvel por Código

```
Recurso: Imóvel
Operação: Buscar Por Código
Código: 326
```

### Listar Faturas Pagas

```
Recurso: Fatura
Operação: Get Many
Filtros:
  - Status: Pago
```

### Listar Calendário

```
Recurso: Calendário
Operação: Get Many
Ano: 2025
Mês: Dezembro
Filtros:
  - Tipo de Item: Visita/Tarefa/WhatsApp/Chamada
```

## 🔧 Auto-Paginação

O node suporta auto-paginação automática. Selecione a quantidade de registros:

- 50 registros
- 100 registros
- 200 registros
- 500 registros
- Todos (máx 5000)

## 📊 Filtros Disponíveis

### Contato
- Tipo de Contato (person, organization, lead)
- Origem (media_source)
- Tags
- Smart List
- ID do Usuário/Gestor
- Busca (search_text)

### Imóvel
- Smart List (available, rent, sale, etc)
- Finalidade (residential, commercial, rural)
- Status (available, reserved, unavailable)
- ID do Corretor

### Locação
- Smart List (active, inactive)

### Fatura
- Status (pending, paid, overdue, cancelled)

### Deal
- Status (in progress, win, lost, stagnant, etc)
- ID do Usuário
- ID do Estágio
- Mostrar Atividades

### Calendário
- Tipo de Item (task, visit, whatsapp, call)
- ID do Usuário

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
- Transações: `/v1/financial/transactions` (com barra!)
- Contato por ID: `/v1/person/{id}` (não existe `/v1/contact/{id}`)

### IDs
- Usuários: STRING (ex: "P1ibK4GFPqZYKIx9e55RpQobt7J2")
- Contatos/Imóveis: STRING numérica
- Locações/Pipelines: NUMBER
- Faturas: STRING UUID

## 📄 Licença

MIT © Bruno Mantovani

## 🔗 Links

- [Imobzi](https://imobzi.com)
- [n8n](https://n8n.io)
- [Repositório](https://github.com/redeuno/n8n-nodes-imobzi-latest)
- [npm](https://www.npmjs.com/package/n8n-nodes-imobzi-latest)

## 📞 Suporte

- Issues: [GitHub Issues](https://github.com/redeuno/n8n-nodes-imobzi-latest/issues)
- Email: bruno@redeuno.com.br

---

**Versão:** 2.0.0  
**Última atualização:** Dezembro 2024  
**Testado com:** API Imobzi (101 endpoints testados)
