# n8n-nodes-imobzi-latest

Node customizado para integração com a **API da Imobzi** no n8n.

[![npm version](https://badge.fury.io/js/n8n-nodes-imobzi-latest.svg)](https://www.npmjs.com/package/n8n-nodes-imobzi-latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🆕 Novidades v2.10.0

- ✅ **Deal (Lista)**: Agora usa `/v1/deals` com filtros completos
- ✅ **Filtros de Deal**: Grupo de Funil, Etapa, Status, Tipo, Corretor
- ✅ **Todos os filtros têm opção "Todos"**
- ✅ **Output Lista Plana**: Deals extraídos da estrutura Kanban em lista

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

## 📊 Filtros Disponíveis (v2.9.0)

### Contato
- **⚠️ Usuário Responsável**: Dropdown com 16 usuários - *Não funciona na API*
- **✅ Origem**: Dropdown com 38 origens
- **✅ Tags**: Dropdown com 57 tags (sistema + personalizadas)
- **✅ Smart List**: 12 opções (all, my_contacts, new_leads, etc.)
- **⚠️ Tipo de Contato**: person ✅, lead ⚠️, organization ❌
- **Busca**: Por nome, email ou telefone

### Imóvel
- **✅ Corretor**: Dropdown com 16 usuários
- **✅ Smart List**: 16 opções (available, rent, sale, without_photos, etc.)
- **⚠️ Status**: available, reserved, unavailable - *Não confirmado*
- **⚠️ Finalidade**: residential, commercial, rural - *Não confirmado*

### Locação
- **✅ Smart List**: 9 opções (active, inactive, expiring, finished, etc.)

### Fatura
- **✅ Período**: 15, 30, 60, 90 dias, Personalizado ou Todos
- **✅ Status**: pending, paid, overdue, canceled, partially_paid, expired, deleted, all
- **✅ Método de Pagamento**: bank_slip, pix, credit_card
- **✅ Ordenar Por / Ordem**

### Deal (Lista) - v2.10.0 ✅ ATUALIZADO
Agora usa `/v1/deals` com todos os filtros funcionando:
- **✅ Grupo de Funil**: Todos + 5 grupos
- **✅ Etapa**: Todas + 7 estágios
- **✅ Status do Deal**: Todos + 7 status
- **✅ Tipo de Negócio**: Todos + 4 tipos
- **✅ Corretor**: Todos + 16 usuários
- **📤 Output**: Lista plana de deals

### Deal Por Estágio (Kanban)
Mesmos filtros do Deal (Lista):
- **✅ Grupo de Funil**: Todos + 5 grupos
- **✅ Etapa**: Todas + 7 estágios (novo!)
- **✅ Status do Deal**: Todos + 7 status
- **✅ Tipo de Negócio**: Todos + 4 tipos
- **✅ Corretor**: Todos + 16 usuários
- **📤 Output**: Estrutura Kanban (deals agrupados por estágio)

### Transação Financeira
- **✅ Data Início / Data Fim**: Período de busca
- **✅ Status**: Pago, Pendente, Todos
- **✅ Tipo**: Receita, Despesa, Transferência
- **✅ Conta Bancária**: Dropdown dinâmico
- **✅ Ordenar Por**: Data de Vencimento, Data de Pagamento, Valor
- **✅ Ordem**: Crescente, Decrescente

### Calendário
- **✅ Usuário**: Dropdown (Todos ou específico)
- **✅ Tipo de Item**: task, visit, whatsapp, call
- **✅ Exibir Feriados**: Sim/Não

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

## ⚠️ Limitações Conhecidas da API (v2.9.0)

| Endpoint | Problema |
|----------|----------|
| `/v1/contacts?user_id=` | Não filtra - sempre retorna todos |
| `/v1/deals/search?user_id=` | Não filtra |
| `/v1/deals/search?pipeline_id=` | Não filtra |
| `/v1/deal/{id}` | Bug - Retorna erro 500 |
| `/v1/organization/code/{code}` | Retorna 404 |
| `/v1/lead/code/{code}` | Retorna 404 |
| `/v1/property/exists?code=` | Retorna dados incorretos |

### Soluções
- **Para filtrar Deals**: Use **"Deal Por Estágio"** com `pipeline_group_id`
- **Para buscar contato por código**: Só funciona para tipo **"Pessoa"**

## 📋 Histórico de Versões

### v2.10.0 (Atual)
- ✅ **Deal (Lista)**: Agora usa `/v1/deals` com todos os filtros
- ✅ **Filtro de Etapa**: Adicionado em Deal e Deal Por Estágio
- ✅ **Output Lista Plana**: Deals extraídos da estrutura Kanban
- ✅ **Todos os filtros têm "Todos"**: Consistência em todos os nodes

### v2.9.0
- Deal Por Estágio: Pipeline Groups (5 grupos) + Pipelines (7 estágios)
- Avisos visuais: Filtros que não funcionam marcados com ⚠️
- Documentação: Mapeamento completo de filtros da API

### v2.8.0
- Análise completa de todos os filtros da API
- Documento de mapeamento consolidado

### v2.6.0
- Transações Financeiras: 7 filtros completos
- CRUD Contato, Imóvel, Deal

### v2.5.0
- Calendar corrigido
- 57 Tags, 38 Origens, 16 Usuários em dropdowns

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

**Versão:** 2.10.0  
**Última atualização:** 12 Dezembro 2025  
**Documentação:** [docs/ESTRUTURA_NODES_IMOBZI.md](docs/ESTRUTURA_NODES_IMOBZI.md)
