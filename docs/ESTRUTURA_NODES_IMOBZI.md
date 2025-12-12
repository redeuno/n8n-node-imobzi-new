# 📊 ESTRUTURA COMPLETA DOS NODES IMOBZI

**Versão:** 2.10.0 (Planejada)  
**Data:** 12/12/2025  
**Documento:** Estrutura detalhada de todos os nodes com filtros, outputs e casos de uso

---

## 📋 ÍNDICE

1. [Funil (Deal) - Lista](#1-funil-deal---lista)
2. [Funil Por Estágio - Kanban](#2-funil-por-estágio---kanban)
3. [Contato](#3-contato)
4. [Imóvel](#4-imóvel)
5. [Locação](#5-locação)
6. [Fatura](#6-fatura)
7. [Transação Financeira](#7-transação-financeira)
8. [Calendário](#8-calendário)
9. [Recursos Auxiliares](#9-recursos-auxiliares)
10. [Resumo de Endpoints](#10-resumo-de-endpoints)

---

## 1. FUNIL (DEAL) - LISTA

### 📝 O QUE FAZ
Busca negócios (deals) do CRM Imobzi e retorna em formato de **lista plana**. Ideal para exportação de dados, criação de relatórios, integrações com outras ferramentas e automações que precisam processar cada deal individualmente.

### 🎯 PARA QUE SERVE
- **Relatórios**: Exportar todos os deals para Excel/Google Sheets
- **Integrações**: Enviar deals para outros sistemas (WhatsApp, Email Marketing)
- **Automações**: Processar cada deal em um workflow n8n
- **Análises**: Filtrar e analisar dados de vendas/locações
- **Notificações**: Alertar sobre deals parados, ganhos ou perdidos

### 🔗 ENDPOINT
`/v1/deals`

### 📄 TIPO DE OUTPUT
Lista plana de deals: `[deal1, deal2, deal3, ...]`

### 🔧 OPERAÇÕES

| Operação | Descrição | Status |
|----------|-----------|--------|
| **Get Many** | Lista todos os deals com filtros | ✅ Funciona |
| **Obter Por ID** | Busca um deal específico | ⚠️ Bug API (erro 500) |
| **Criar** | Cria novo deal | ✅ Funciona |
| **Atualizar** | Atualiza deal existente | ✅ Funciona |

### 🎯 FILTROS

```
📂 Grupo de Funil (pipeline_group_id)
├── Todos os Grupos (valor: '')
├── Captação de Imóveis (5370013421666304)
├── Comissões (6405034089644032)
├── Geral de Negócios (5675099632959488)
├── Gestão de Solicitações (6419593693233152)
└── Gestão de Tarefas (6594235603091456)

📊 Etapa/Estágio (pipeline_id)
├── Todas as Etapas (valor: '')
├── Oportunidades (4584666827849728)
├── Qualificação e Interesse (6005926736691200)
├── Visita / Apresentação (5381346821144576)
├── Follow UP (5944296774565888)
├── Em Atendimento (6481696604553216)
├── Negociação (6507246727987200)
└── Fechamento (4677659379367936)

📋 Status do Deal (deal_status)
├── Todos os Status (valor: 'all')
├── Em Progresso (in_progress)
├── Estagnado (stagnant)
├── Desatualizado (out_of_date)
├── Ganho (win)
├── Perdido (lost)
└── Radar de Imóveis (property_radar)

🏷️ Tipo de Negócio (deal_type)
├── Todos os Tipos (valor: 'all')
├── Venda (sale)
├── Locação (rent)
└── Venda e Locação (both)

👤 Corretor (user_id)
├── Todos os Corretores (valor: '')
├── Antonio Carlos (P1ibK4GFPqZYKIx9e55RpQobt7J2)
├── Bruno Mantovani (SYkMqS5aInfpP1p9m9MV0AufW0p1)
├── Campo Grande MS (qLIwracS5yUk1UIvNmMCjtYgAf62)
├── Cleilson Nantes Nogueira (Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3)
├── Daiana Ferrarezi (ofIHYjFl8NeToYGDXMonzIbRRlB2)
├── Débora Fonseca Mendonça (LowszB3ZUhQqfG8ZZWTBKJIFojs1)
├── Euclides Rebouças (o2dk6UuXiIMKdPsvx1fxADhd8L12)
├── Fernando Abreu (9luRJzY8rIOvvok5NHXppiOnYC13)
├── Julia Sardim (W92lLWUuymdsoN5KZjXHzv32uPs1)
├── Leandro Velasco (d5exMkdlYDYBGCnLRV76F0OhOCi2)
├── Lidiane Rocha (liGnEe9aOea2t0sc0ZkrSa8iXF62)
├── Mariana Cabriotti (QTEm89uOqdavsUDZpALJdNJKgws1)
├── Mario Otavio (PBuvhWtM1pZD3ONzKsAiJ14BdHF3)
├── Nilson Silva (B97MLMQ5hTPhPCiwu20RZtu8mpI3)
├── Sthéfano Ferro (pMhjLYu0zYXV02SLtUqeUMx5pwh2)
└── Yan Caliel (inijJ4kWVtfU6R4oN4nP5odF6SE3)
```

### 📤 EXEMPLO DE OUTPUT

```json
[
  {
    "db_id": 6751320269127680,
    "code": "4755",
    "title": "Casa para compra em Vila Planalto",
    "value": 1550000,
    "status": "in progress",
    "interest": "buy",
    "stage_name": "Qualificação e Interesse",
    "stage_position": 2,
    "pipeline_group_name": "Geral de Negócios",
    "stagnant": false,
    "contact": {
      "contact_type": "person",
      "db_id": 6458099144065024,
      "name": "Djalma Djalma",
      "phone": "(67) 9604-2973"
    },
    "user": {
      "name": "Mariana Cabriotti",
      "email": "marianacabriotti@gmail.com",
      "db_id": "QTEm89uOqdavsUDZpALJdNJKgws1"
    },
    "created_at": "2025-12-11T19:39:01.541296Z"
  }
]
```

### 💡 CASOS DE USO

| Caso de Uso | Filtros Sugeridos |
|-------------|-------------------|
| Deals do mês | Todos + período |
| Deals de um corretor | user_id específico |
| Deals de venda parados | deal_type=sale + deal_status=stagnant |
| Deals ganhos para comissão | deal_status=win |
| Pipeline específico | pipeline_group_id + pipeline_id |

---

## 2. FUNIL POR ESTÁGIO - KANBAN

### 📝 O QUE FAZ
Busca negócios (deals) do CRM Imobzi e retorna em formato **agrupado por estágio**, similar à visualização Kanban do sistema. Cada estágio contém seus deals organizados.

### 🎯 PARA QUE SERVE
- **Dashboards**: Criar painéis visuais tipo Kanban
- **Contagens**: Ver quantos deals em cada estágio
- **Análise de Funil**: Identificar gargalos no processo de vendas
- **Relatórios Gerenciais**: Visão consolidada por estágio
- **Métricas**: Calcular conversão entre estágios

### 🔗 ENDPOINT
`/v1/deals`

### 📄 TIPO DE OUTPUT
Objeto agrupado por estágio: `{ estágioId: { stage_name, deals: [...] } }`

### 🔧 OPERAÇÕES

| Operação | Descrição | Status |
|----------|-----------|--------|
| **Get Many** | Lista deals agrupados por estágio | ✅ Funciona |

### 🎯 FILTROS
(Mesmos filtros do node "Funil (Deal)")

```
📂 Grupo de Funil (Todos + 5 grupos)
📊 Etapa/Estágio (Todas + 7 estágios)
📋 Status do Deal (Todos + 7 status)
🏷️ Tipo de Negócio (Todos + 4 tipos)
👤 Corretor (Todos + 16 usuários)
```

### 📤 EXEMPLO DE OUTPUT

```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [
      { "db_id": 123, "title": "Apartamento Centro", "value": 500000 }
    ]
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [
      { "db_id": 456, "title": "Casa Vila Planalto", "value": 1550000 }
    ]
  },
  "5381346821144576": {
    "stage_name": "Visita / Apresentação",
    "deals": []
  },
  "5944296774565888": {
    "stage_name": "Follow UP",
    "deals": []
  },
  "6481696604553216": {
    "stage_name": "Em Atendimento",
    "deals": []
  },
  "6507246727987200": {
    "stage_name": "Negociação",
    "deals": []
  },
  "4677659379367936": {
    "stage_name": "Fechamento",
    "deals": []
  },
  "total_deals": 2,
  "total_values": 2050000
}
```

### 💡 CASOS DE USO

| Caso de Uso | Como Usar |
|-------------|-----------|
| Dashboard Kanban | Usar output direto para visualização |
| Contagem por estágio | Contar `deals.length` de cada estágio |
| Valor total por estágio | Somar `value` dos deals de cada estágio |
| Identificar gargalos | Ver estágios com muitos deals parados |

---

## 3. CONTATO

### 📝 O QUE FAZ
Gerencia contatos do CRM Imobzi - pessoas (clientes), leads (prospects) e organizações (empresas). Permite buscar, criar, atualizar e deletar contatos.

### 🎯 PARA QUE SERVE
- **CRM**: Sincronizar contatos com outras plataformas
- **Marketing**: Segmentar contatos por origem, tags
- **Automação**: Criar contatos automaticamente de formulários
- **Enriquecimento**: Atualizar dados de contatos existentes
- **Limpeza**: Identificar contatos duplicados ou desatualizados

### 🔗 ENDPOINT
`/v1/contacts`

### 📄 PAGINAÇÃO
Cursor (50 contatos por página)

### 🔧 OPERAÇÕES

| Operação | Descrição | Status |
|----------|-----------|--------|
| **Get Many** | Lista contatos com filtros | ✅ Funciona |
| **Obter Por ID** | Busca contato por ID | ✅ Funciona |
| **Buscar Por Código** | Busca por código interno | ✅ Só funciona para "Pessoa" |
| **Verificar Existência** | Verifica CPF/CNPJ/Email | ✅ Funciona |
| **Criar** | Cria novo contato | ✅ Funciona |
| **Atualizar** | Atualiza contato | ✅ Funciona |
| **Deletar** | Remove contato | ✅ Funciona |

### 🎯 FILTROS

```
📝 Tipo de Contato (para operações específicas)
├── Pessoa (person) ✅
├── Lead (lead) ✅
└── Organização (organization) ⚠️ Pode não filtrar

👤 Usuário Responsável (user_id) ⚠️ NÃO FUNCIONA NA API
├── Todos os Usuários (valor: '')
└── [16 usuários...]

🔍 Busca (search_text)
└── Nome, email ou telefone

📍 Origem (media_source) - 38 opções
├── Todas as Origens (valor: '')
├── Site
├── OLX
├── Instagram
├── WhatsApp
├── Google
├── Indicação
└── ... (38 total)

📋 Smart List - 12 opções
├── Todos os Contatos (all)
├── Com Negócios (with_deals)
├── Sem Negócios (without_deals)
├── Meus Contatos (my_contacts)
├── Meus Leads (my_leads)
├── Novos Contatos (new_contacts)
├── Novos Leads (new_leads)
├── Pendentes (pending)
├── Desatualizados (out_of_date)
├── Inativos (inactives)
├── Compartilhados Comigo (shared_with_me)
└── Compartilhados Com Outros (shared_with_others)

🏷️ Tags - 57 opções
├── Todas as Tags (valor: '')
├── Tags do Sistema (16): client, customer, lead, renter, seller...
└── Tags Personalizadas (41): Venda, Locação, Apartamento...

📋 Tipo de Contato (contact_type)
├── Todos (valor: '')
├── Pessoa (person) ✅
├── Lead (lead) ✅
└── Organização (organization) ⚠️
```

### 📤 EXEMPLO DE OUTPUT

```json
{
  "db_id": 6458099144065024,
  "name": "João Silva",
  "contact_type": "person",
  "email": "joao@email.com",
  "phones": [
    {
      "number": "(67) 99999-9999",
      "type": "mobile"
    }
  ],
  "cpf": "123.456.789-00",
  "tags": ["customer", "Venda"],
  "media_source": "Site",
  "responsible_user_name": "Bruno Mantovani",
  "created_at": "2025-01-15T10:30:00Z"
}
```

### 💡 CASOS DE USO

| Caso de Uso | Filtros Sugeridos |
|-------------|-------------------|
| Leads novos | smart_list=new_leads |
| Contatos do Site | media_source=Site |
| Clientes de Venda | tags=Venda + contact_type=person |
| Contatos inativos | smart_list=inactives |
| Buscar por nome | search_text=nome |

---

## 4. IMÓVEL

### 📝 O QUE FAZ
Gerencia o catálogo de imóveis da imobiliária. Permite buscar, criar, atualizar e deletar imóveis com filtros avançados.

### 🎯 PARA QUE SERVE
- **Portais**: Sincronizar imóveis com OLX, ZAP, VivaReal
- **Site**: Atualizar catálogo do site automaticamente
- **Relatórios**: Listar imóveis disponíveis, reservados
- **Automação**: Notificar quando imóvel ficar disponível
- **Análise**: Identificar imóveis sem fotos, desatualizados

### 🔗 ENDPOINT
`/v1/properties`

### 📄 PAGINAÇÃO
Cursor (10 imóveis por página)

### 🔧 OPERAÇÕES

| Operação | Descrição | Status |
|----------|-----------|--------|
| **Get Many** | Lista imóveis com filtros | ✅ Funciona |
| **Obter Por ID** | Busca imóvel por ID | ✅ Funciona |
| **Buscar Por Código** | Busca por código interno | ✅ Funciona |
| **Estatísticas** | Dados de visualização do imóvel | ✅ Funciona |
| **Verificar Existência** | Verifica se código existe | ⚠️ Pode retornar incorreto |
| **Criar** | Cria novo imóvel | ✅ Funciona |
| **Atualizar** | Atualiza imóvel | ✅ Funciona |
| **Deletar** | Remove imóvel | ✅ Funciona |

### 🎯 FILTROS

```
👤 Corretor (user_id) ✅ FUNCIONA
├── Todos os Corretores (valor: '')
└── [16 usuários...]

📋 Smart List - 16 opções ✅ FUNCIONA
├── Todos (valor: '')
├── Disponíveis (available)
├── Reservados (reserved)
├── Inativos (inactives)
├── Locação (rent)
├── Venda (sale)
├── Publicados no Site (site_publish)
├── Sem Fotos (without_photos)
├── Sem Localização (without_location)
├── Novos (7 dias) (new_properties)
├── Meus Imóveis (my_properties)
├── Atualizados (updated)
├── Atualizados pelo Proprietário (updated_by_owner)
├── Desatualizados (60 dias) (outdated)
├── Compartilhados Comigo (shared_with_me)
└── Compartilhados Com Outros (shared_with_others)

🏠 Finalidade (finality) ⚠️ NÃO CONFIRMADO
├── Todas (valor: '')
├── Residencial (residential)
├── Comercial (commercial)
└── Rural (rural)

📊 Status (status) ⚠️ NÃO CONFIRMADO
├── Todos (valor: '')
├── Disponível (available)
├── Reservado (reserved)
└── Indisponível (unavailable)
```

### 📤 EXEMPLO DE OUTPUT

```json
{
  "db_id": 5435857736040448,
  "code": "396",
  "status": "available",
  "finality": "residential",
  "property_type": "Apartamento",
  "address": {
    "street": "Rua das Flores",
    "number": "123",
    "neighborhood": "Centro",
    "city": "Campo Grande",
    "state": "MS"
  },
  "sale_value": 500000,
  "rent_value": 2500,
  "area": 120,
  "bedrooms": 3,
  "bathrooms": 2,
  "garage": 2,
  "photos": ["url1", "url2"],
  "responsible_user_name": "Bruno Mantovani"
}
```

### 💡 CASOS DE USO

| Caso de Uso | Filtros Sugeridos |
|-------------|-------------------|
| Imóveis para venda | smart_list=sale |
| Imóveis disponíveis | smart_list=available |
| Imóveis sem fotos | smart_list=without_photos |
| Meus imóveis | smart_list=my_properties |
| Imóveis de um corretor | user_id específico |

---

## 5. LOCAÇÃO

### 📝 O QUE FAZ
Gerencia contratos de locação ativos e históricos. Permite buscar e visualizar locações.

### 🎯 PARA QUE SERVE
- **Gestão de Contratos**: Listar locações ativas
- **Renovações**: Identificar contratos próximos do vencimento
- **Relatórios**: Histórico de locações
- **Financeiro**: Integrar com sistema de cobranças

### 🔗 ENDPOINT
`/v1/leases`

### 📄 PAGINAÇÃO
Cursor

### 🔧 OPERAÇÕES

| Operação | Descrição | Status |
|----------|-----------|--------|
| **Get Many** | Lista locações com filtros | ✅ Funciona |
| **Obter Por ID** | Busca locação por ID | ✅ Funciona |

### 🎯 FILTROS

```
📋 Smart List - 9 opções
├── Todas (valor: '')
├── Ativas (active)
├── Inativas (inactive)
├── Expirando (expiring)
├── Finalizadas (finished)
├── Canceladas (canceled)
├── Pendentes (pending)
├── Renovadas (renewed)
└── Em Atraso (overdue)
```

### 📤 EXEMPLO DE OUTPUT

```json
{
  "db_id": 5987740112388096,
  "status": "active",
  "rent_value": 2500,
  "start_date": "2024-01-01",
  "end_date": "2025-12-31",
  "property": {
    "code": "396",
    "address": "Rua das Flores, 123"
  },
  "tenant": {
    "name": "Maria Santos",
    "cpf": "123.456.789-00"
  }
}
```

---

## 6. FATURA

### 📝 O QUE FAZ
Gerencia faturas/boletos de locações e taxas. Permite buscar faturas por período, status e método de pagamento.

### 🎯 PARA QUE SERVE
- **Cobrança**: Identificar faturas pendentes/atrasadas
- **Financeiro**: Relatório de recebimentos
- **Automação**: Enviar lembretes de vencimento
- **Conciliação**: Verificar pagamentos

### 🔗 ENDPOINT
`/v1/invoices`

### 📄 PAGINAÇÃO
next_page (10 por página)

### 🔧 OPERAÇÕES

| Operação | Descrição | Status |
|----------|-----------|--------|
| **Get Many** | Lista faturas com filtros | ✅ Funciona |
| **Obter Por ID** | Busca fatura por ID | ✅ Funciona |

### 🎯 FILTROS

```
📅 Período (periodo)
├── Todos (valor: '')
├── Últimos 15 dias (15)
├── Últimos 30 dias (30)
├── Últimos 60 dias (60)
├── Últimos 90 dias (90)
└── Personalizado (custom)

📅 Data Início (start_at) - quando periodo=custom
📅 Data Fim (end_at) - quando periodo=custom

📊 Status - 8 opções
├── Todos (valor: 'all')
├── Pendente (pending)
├── Pago (paid)
├── Atrasado (overdue)
├── Cancelado (canceled)
├── Parcialmente Pago (partially_paid)
├── Expirado (expired)
└── Deletado (deleted)

💳 Método de Pagamento
├── Todos (valor: '')
├── Boleto (bank_slip)
├── PIX (pix)
└── Cartão de Crédito (credit_card)

📋 Ordenar Por (order_by)
├── Data (date)
├── Data de Vencimento (due_date)
└── Valor (amount)

🔃 Ordem (sort_by)
├── Crescente (asc)
└── Decrescente (desc)
```

### 📤 EXEMPLO DE OUTPUT

```json
{
  "invoice_id": "536edb56c6cb11f0822842004e494300",
  "status": "paid",
  "total_value": 5263.09,
  "due_date": "2025-12-01",
  "paid_at": "2025-11-28",
  "payment_method": "pix",
  "lease_id": 5987740112388096,
  "tenant_name": "Maria Santos"
}
```

---

## 7. TRANSAÇÃO FINANCEIRA

### 📝 O QUE FAZ
Gerencia movimentações financeiras - receitas, despesas e transferências entre contas.

### 🎯 PARA QUE SERVE
- **Fluxo de Caixa**: Relatório de entradas e saídas
- **Conciliação**: Verificar transações por conta
- **Relatórios**: Análise financeira por período
- **Exportação**: Integrar com sistemas contábeis

### 🔗 ENDPOINT
`/v1/financial/transactions`

### 📄 PAGINAÇÃO
next_page

### 🔧 OPERAÇÕES

| Operação | Descrição | Status |
|----------|-----------|--------|
| **Get Many** | Lista transações com filtros | ✅ Funciona |

### 🎯 FILTROS

```
🏦 Conta Financeira (account_id)
├── Todas as Contas (valor: '')
├── PJBank (5374237794631680)
├── PJBank - Cartão de Crédito (5713727725764608)
├── Dinheiro (6317241432276992)
├── Caixa Economica (6467636073332736)
└── Mercado Pago (6487354834419712)

📅 Data Início (start_at)
📅 Data Fim (end_at)

📊 Status
├── Todos (valor: '')
├── Pago (paid)
└── Pendente (pending)

🏷️ Tipo (filter_type)
├── Todos (valor: '')
├── Receita (income)
├── Despesa (expense)
└── Transferência (transference)

📋 Ordenar Por (order_by)
├── Data de Vencimento (due_date)
├── Data de Pagamento (paid_at)
└── Valor (amount)

🔃 Ordem (sort_by)
├── Crescente (asc)
└── Decrescente (desc)
```

### 📤 EXEMPLO DE OUTPUT

```json
{
  "db_id": "46fe4b1ed74b11f0820d42004e494300",
  "type": "income",
  "status": "paid",
  "amount": 2500.00,
  "due_date": "2025-12-01",
  "paid_at": "2025-11-28",
  "account_name": "PJBank",
  "description": "Aluguel Dezembro"
}
```

---

## 8. CALENDÁRIO

### 📝 O QUE FAZ
Busca atividades do calendário - visitas, tarefas, chamadas e mensagens de WhatsApp agendadas.

### 🎯 PARA QUE SERVE
- **Agenda**: Visualizar compromissos do mês
- **Relatórios**: Quantas visitas/tarefas por período
- **Automação**: Enviar lembretes de atividades
- **Dashboard**: Painel de atividades da equipe

### 🔗 ENDPOINT
`/v1/calendar`

### 📄 PAGINAÇÃO
Nenhuma (retorna todos os itens do período)

### 🔧 OPERAÇÕES

| Operação | Descrição | Status |
|----------|-----------|--------|
| **Get Many** | Lista itens do calendário | ✅ Funciona |

### 📝 CAMPOS OBRIGATÓRIOS

```
📅 Ano (year) - Ex: 2025
📅 Mês (month) - Ex: 12
```

### 🎯 FILTROS

```
👤 Usuário (user_filter)
├── Todos os Usuários (all) → usa search_all=true
└── [16 usuários específicos...]

📋 Tipo de Item (item_type)
├── Todas as Atividades (valor: '')
├── Tarefa (task)
├── Visita (visit)
├── Chamada (call)
└── WhatsApp (whatsapp)

🎄 Exibir Feriados (show_holidays)
├── Sim (true)
└── Não (false)
```

### 📤 EXEMPLO DE OUTPUT

```json
{
  "calendar_items": [
    {
      "db_id": 6012636662071296,
      "type": "visit",
      "title": "Visita Apartamento Centro",
      "date": "2025-12-15",
      "time": "14:00",
      "user_name": "Bruno Mantovani",
      "contact_name": "João Silva",
      "property_code": "396"
    }
  ]
}
```

**Total de itens em Dezembro/2025:** 779 atividades

---

## 9. RECURSOS AUXILIARES

### 📝 O QUE SÃO
Recursos de suporte que fornecem dados para preencher dropdowns e validações.

### 📂 GRUPO DE FUNIL (pipelineGroup)
```
🔗 Endpoint: /v1/pipeline-groups
📤 Output: 5 grupos

ID: 5370013421666304 | Captação de Imóveis
ID: 6405034089644032 | Comissões
ID: 5675099632959488 | Geral de Negócios
ID: 6419593693233152 | Gestão de Solicitações
ID: 6594235603091456 | Gestão de Tarefas
```

### 📊 ESTÁGIO/PIPELINE (pipeline)
```
🔗 Endpoint: /v1/pipelines
📤 Output: 7 estágios

ID: 4584666827849728 | Oportunidades
ID: 6005926736691200 | Qualificação e Interesse
ID: 5381346821144576 | Visita / Apresentação
ID: 5944296774565888 | Follow UP
ID: 6481696604553216 | Em Atendimento
ID: 6507246727987200 | Negociação
ID: 4677659379367936 | Fechamento
```

### 👥 USUÁRIO (user)
```
🔗 Endpoint: /v1/users
📤 Output: 16 usuários

Antonio Carlos, Bruno Mantovani, Campo Grande MS,
Cleilson Nantes Nogueira, Daiana Ferrarezi,
Débora Fonseca Mendonça, Euclides Rebouças,
Fernando Abreu, Julia Sardim, Leandro Velasco,
Lidiane Rocha, Mariana Cabriotti, Mario Otavio,
Nilson Silva, Sthéfano Ferro, Yan Caliel
```

### 🏦 CONTA FINANCEIRA (financialAccount)
```
🔗 Endpoint: /v1/financial/accounts
📤 Output: 5 contas

ID: 5374237794631680 | PJBank           | R$ 259,52
ID: 5713727725764608 | PJBank - Cartão  | N/A
ID: 6317241432276992 | Dinheiro         | R$ 20.358,36
ID: 6467636073332736 | Caixa Economica  | R$ 18.633,21
ID: 6487354834419712 | Mercado Pago     | R$ 6.847,48
```

### 📍 ORIGEM/MEDIA SOURCE (mediaSource)
```
🔗 Endpoint: /v1/media-sources
📤 Output: 38 origens

Site, OLX, Instagram, WhatsApp, Google, Indicação,
VivaReal, ZAP, Imovelweb, Chatbot...
```

### 🏷️ TAG DE CONTATO (contactTag)
```
🔗 Endpoint: /v1/contacts/tags
📤 Output: 57 tags

Sistema (16): client, customer, lead, renter, seller...
Personalizadas (41): Venda, Locação, Apartamento...
```

### 🏠 TIPO DE IMÓVEL (propertyType)
```
🔗 Endpoint: /v1/property-types
📤 Output: Tipos de imóveis disponíveis
```

### ❌ MOTIVO DE PERDA (lostReason)
```
🔗 Endpoint: /v1/deal/lost-reason
📤 Output: Motivos para marcar deal como perdido
```

### 🏦 BANCO (bank)
```
🔗 Endpoint: /v1/banks
📤 Output: Lista de bancos
```

---

## 10. RESUMO DE ENDPOINTS

| Recurso | Endpoint | Paginação | Itens/Página |
|---------|----------|-----------|--------------|
| Contato | `/v1/contacts` | cursor | 50 |
| Imóvel | `/v1/properties` | cursor | 10 |
| Locação | `/v1/leases` | cursor | 12 |
| Fatura | `/v1/invoices` | next_page | 10 |
| Deal (Lista) | `/v1/deals` | - | todos |
| Deal (Kanban) | `/v1/deals` | - | todos |
| Transação | `/v1/financial/transactions` | next_page | 56 |
| Calendário | `/v1/calendar` | - | todos |
| Grupos de Funil | `/v1/pipeline-groups` | - | 5 |
| Estágios | `/v1/pipelines` | - | 7 |
| Usuários | `/v1/users` | - | 16 |
| Contas | `/v1/financial/accounts` | - | 5 |
| Origens | `/v1/media-sources` | - | 38 |
| Tags | `/v1/contacts/tags` | - | 57 |

---

## 📋 LEGENDA

| Símbolo | Significado |
|---------|-------------|
| ✅ | Funciona corretamente |
| ⚠️ | Pode não funcionar / Não confirmado |
| ❌ | Não funciona (bug da API) |

---

**Documento criado em:** 12/12/2025  
**Próxima versão:** 2.10.0

