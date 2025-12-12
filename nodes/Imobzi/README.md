# Imobzi Node v2.6.0

Node n8n para integração com a API da Imobzi.

## Recursos

### CRUD Completo

| Recurso | Create | Read | Update | Delete |
|---------|--------|------|--------|--------|
| Contato | ✅ | ✅ | ✅ | ✅ |
| Imóvel | ✅ | ✅ | ✅ | ✅ |
| Deal | ✅ | ✅ | ✅ | ❌ |
| Locação | ❌ | ✅ | ❌ | ❌ |
| Fatura | ❌ | ✅ | ❌ | ❌ |

### Operações de Leitura

- **Contato**: Listar, Buscar por ID/Código, Verificar Existência
- **Imóvel**: Listar, Buscar por ID/Código, Estatísticas
- **Locação**: Listar, Buscar por ID
- **Fatura**: Listar, Buscar por ID
- **Deal**: Listar (plana ou Kanban)
- **Transação Financeira**: Listar com filtros completos
- **Calendário**: Listar com filtros avançados
- **Auxiliares**: Usuário, Documento, Estágio, Grupo de Funil, Tipo de Imóvel, Origem, Tag, Motivo de Perda, Banco

## Filtros Disponíveis

### Transações Financeiras (NOVO v2.6.0)
- Conta Bancária (account_id)
- Data Início/Fim (start_at, end_at)
- Status (paid, pending)
- Tipo (income, expense)
- Ordenar Por (due_date, paid_at, amount)
- Ordem (asc, desc)

### Contatos
- Usuário Responsável (16 usuários)
- Origem (38 opções)
- Tags (57 opções)
- Smart List (12 opções)
- Tipo de Contato
- Busca por texto

### Imóveis
- Corretor (16 usuários)
- Smart List (16 opções)
- Status, Finalidade

### Locação
- Smart List (9 opções)

### Faturas
- Período (15, 30, 60, 90 dias, custom)
- Status (pending, paid, overdue, canceled, etc.)
- Método de Pagamento

### Deals
- Corretor (16 usuários)
- Estágio (7 opções)
- Status (open, in_progress, win, lost, etc.)
- Tipo (rent, sale, both, all)

### Calendário
- Usuário (Todos ou específico)
- Tipo de Item (task, visit, whatsapp, call)
- Exibir Feriados

## Paginação

O node suporta auto-paginação:
- 50, 100, 200, 500 ou Todos (máx 5000) registros
- Contacts: cursor-based (sempre 50 por página)
- Invoices/Transactions: next_page-based

## Changelog

### v2.6.0
- ✅ Filtros completos em Transações Financeiras
- ✅ CRUD: Update e Delete para Contact, Property
- ✅ Deal: Update e Get by ID
- ✅ Filtros validados na API

### v2.5.0
- ✅ Calendar: search_all=true + item_type
- ✅ 57 Tags em dropdown
- ✅ 38 Origens em dropdown
- ✅ 16 Usuários com IDs reais

### v2.4.0
- ✅ Período pré-definido em faturas
- ✅ CPF/CNPJ aceita formatação

---

Versão: 2.6.0
