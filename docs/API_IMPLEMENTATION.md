# Implementação da API da Imobzi

Este documento descreve a implementação técnica da integração com a API da Imobzi no n8n.

## Configuração Oficial da API

### Pré-requisitos
- **Plano Imobzi**: CRM Business ou Gestão de Locação Real Estate
- **Chave de API**: Gerada no painel da Imobzi
- **Permissões**: Configuradas para os métodos necessários

### Geração da Chave de API
1. Acesse o menu lateral do Imobzi
2. Clique em **"Integrações & Automações"**
3. Selecione **"Chave de API"**
4. Clique em **"Adicionar uma nova chave de API"**
5. Nomeie a chave conforme o serviço que irá utilizá-la
6. Copie a chave gerada

**Documentação oficial**: [Como funciona a chave de API](https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/)

### Configuração das Permissões
- Ao criar ou editar uma chave de API, defina exatamente quais métodos (funções) a integração poderá acessar
- Marque os métodos desejados ou utilize a opção **"Selecionar todos os métodos"** para liberar todas as funções

## Endpoints da API

### Base URL
```
https://api.imobzi.app
```

### Versionamento
Todos os endpoints usam o prefixo `/v1/`

### Autenticação
A API usa autenticação via header `X-Imobzi-Secret`:

```http
X-Imobzi-Secret: YOUR_API_KEY
Content-Type: application/json
```

## Endpoints Implementados

### Contatos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/contacts` | Lista todos os contatos |
| GET | `/v1/contact/{id}` | Obtém um contato específico |
| POST | `/v1/contacts` | Cria um novo contato |
| POST | `/v1/contact/{id}` | Atualiza um contato |
| DELETE | `/v1/contact/{id}` | Remove um contato |

**Parâmetros de listagem**:
- `cursor` - Cursor para paginação
- `search_text` - Texto para busca
- `contact_type` - Tipo de contato (person, organization)
- `tags` - Filtrar por tags
- `media_source` - Origem do contato
- `manager_id` - ID do gestor responsável
- `inactive` - Incluir inativos

**Estrutura de resposta**:
```json
{
  "contacts": [...],
  "cursor": "next_page_cursor",
  "count": 50,
  "total": 1234
}
```

### Pessoas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/persons` | Lista todas as pessoas |
| GET | `/v1/person/{id}` | Obtém uma pessoa específica |
| POST | `/v1/persons` | Cria uma nova pessoa |
| POST | `/v1/person/{id}` | Atualiza uma pessoa |
| DELETE | `/v1/person/{id}` | Remove uma pessoa |

### Organizações
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/organizations` | Lista todas as organizações |
| GET | `/v1/organization/{id}` | Obtém uma organização específica |
| POST | `/v1/organizations` | Cria uma nova organização |
| POST | `/v1/organization/{id}` | Atualiza uma organização |
| DELETE | `/v1/organization/{id}` | Remove uma organização |

### Leads
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/leads` | Lista todos os leads |
| GET | `/v1/lead/{id}` | Obtém um lead específico |
| POST | `/v1/leads` | Cria um novo lead |
| POST | `/v1/lead/{id}` | Atualiza um lead |
| DELETE | `/v1/lead/{id}` | Remove um lead |

**Estrutura de resposta**:
```json
{
  "contacts": [...],
  "cursor": "next_page_cursor",
  "count": 50
}
```

### Imóveis (Properties)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/properties` | Lista todos os imóveis |
| GET | `/v1/property/{id}` | Obtém um imóvel específico |
| POST | `/v1/properties` | Cria um novo imóvel |
| POST | `/v1/property/{id}` | Atualiza um imóvel |
| DELETE | `/v1/property/{id}` | Remove um imóvel |

**Parâmetros de listagem**:
- `cursor` - Cursor para paginação
- `search_text` - Texto para busca
- `all_brokers` - Incluir imóveis de todos os corretores
- `smart_list` - Filtrar por lista inteligente
- `namespace` - Namespace para filtro
- `order` - Campo para ordenação
- `show_map` - Incluir dados de mapa
- `show_network` - Incluir imóveis da rede

**Estrutura de resposta**:
```json
{
  "properties": [...],
  "cursor": "next_page_cursor",
  "count": 50,
  "total": 166
}
```

### Contratos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/contracts` | Lista todos os contratos |
| GET | `/v1/contract/{id}` | Obtém um contrato específico |
| POST | `/v1/contracts` | Cria um novo contrato |
| POST | `/v1/contract/{id}` | Atualiza um contrato |
| DELETE | `/v1/contract/{id}` | Remove um contrato |

**Parâmetros de listagem**:
- `smart_list` - Filtrar por lista inteligente
- `search_type` - Tipo de busca
- `property_id` - Filtrar por imóvel

**Estrutura de resposta**:
```json
{
  "contracts": [...],
  "cursor": "next_page_cursor",
  "count": 50
}
```

### Locações (Leases)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/leases` | Lista todas as locações |
| GET | `/v1/lease/{id}` | Obtém uma locação específica |
| POST | `/v1/leases` | Cria uma nova locação |
| POST | `/v1/lease/{id}` | Atualiza uma locação |
| DELETE | `/v1/lease/{id}` | Remove uma locação |

**Parâmetros de listagem**:
- `owner_id` - Filtrar por proprietário
- `property_id` - Filtrar por imóvel
- `smart_list` - Filtrar por lista inteligente
- `search_type` - Tipo de busca

**Estrutura de resposta**:
```json
{
  "leases": [...],
  "cursor": "next_page_cursor",
  "count": 50,
  "total": 85
}
```

### Documentos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/documents` | Lista todos os documentos |
| GET | `/v1/document/{id}` | Obtém um documento específico |
| POST | `/v1/documents` | Cria um novo documento |
| POST | `/v1/document/{id}` | Atualiza um documento |
| DELETE | `/v1/document/{id}` | Remove um documento |

**Parâmetros de listagem**:
- `status` - Status do documento
- `document_type` - Tipo do documento
- `property_id` - Filtrar por imóvel
- `contact_id` - Filtrar por contato
- `contact_type` - Tipo do contato

**Estrutura de resposta**:
```json
{
  "documents": [...],
  "cursor": "next_page_cursor",
  "count": 50
}
```

### Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/users` | Lista todos os usuários |
| GET | `/v1/user/{id}` | Obtém um usuário específico |
| POST | `/v1/users` | Cria um novo usuário |
| POST | `/v1/user/{id}` | Atualiza um usuário |
| DELETE | `/v1/user/{id}` | Remove um usuário |

**Parâmetros de listagem**:
- `user_email` - Filtrar por email
- `user_name` - Filtrar por nome
- `all_users` - Incluir todos os usuários
- `global_search` - Busca global

**Estrutura de resposta**: Array direto
```json
[
  { "db_id": "123", "fullname": "João Silva", ... },
  { "db_id": "456", "fullname": "Maria Santos", ... }
]
```

### Negócios (Deals)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/deals` | Lista todos os negócios |
| GET | `/v1/deal/{id}` | Obtém um negócio específico |
| POST | `/v1/deals` | Cria um novo negócio |
| POST | `/v1/deal/{id}` | Atualiza um negócio |
| DELETE | `/v1/deal/{id}` | Remove um negócio |

**Parâmetros de listagem**:
- `pipeline_group_id` - Filtrar por grupo de pipeline
- `deal_type` - Tipo de negócio
- `deal_status` - Status do negócio
- `user_id` - Filtrar por usuário responsável
- `property_id` - Filtrar por imóvel
- `contact_id` - Filtrar por contato

**Estrutura de resposta**: Agrupado por stage
```json
{
  "stage_id_1": {
    "deals": [...],
    "count": 10
  },
  "stage_id_2": {
    "deals": [...],
    "count": 5
  }
}
```

### Funis (Pipelines)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/pipelines` | Lista todos os funis |
| GET | `/v1/pipeline/{id}` | Obtém um funil específico |
| POST | `/v1/pipelines` | Cria um novo funil |
| POST | `/v1/pipeline/{id}` | Atualiza um funil |
| DELETE | `/v1/pipeline/{id}` | Remove um funil |

**Estrutura de resposta**: Array direto
```json
[
  { "db_id": "123", "name": "Vendas", "stages": [...] },
  { "db_id": "456", "name": "Locação", "stages": [...] }
]
```

### Grupos de Funil (Pipeline Groups)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/pipeline-groups` | Lista todos os grupos de funil |
| GET | `/v1/pipeline-groups/{id}` | Obtém um grupo específico |
| POST | `/v1/pipeline-groups` | Cria um novo grupo |
| POST | `/v1/pipeline-groups/{id}` | Atualiza um grupo |
| DELETE | `/v1/pipeline-groups/{id}` | Remove um grupo |

### Contas Financeiras
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/financial/accounts` | Lista todas as contas |
| GET | `/v1/financial/account/{id}` | Obtém uma conta específica |
| POST | `/v1/financial/accounts` | Cria uma nova conta |
| POST | `/v1/financial/account/{id}` | Atualiza uma conta |
| DELETE | `/v1/financial/account/{id}` | Remove uma conta |

**Estrutura de resposta**:
```json
{
  "accounts": [...],
  "cursor": "next_page_cursor"
}
```

### Transações Financeiras
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/financial/transactions` | Lista todas as transações |
| GET | `/v1/financial/transaction/{id}` | Obtém uma transação específica |
| POST | `/v1/financial/transactions` | Cria uma nova transação |
| POST | `/v1/financial/transaction/{id}` | Atualiza uma transação |
| DELETE | `/v1/financial/transaction/{id}` | Remove uma transação |

**Parâmetros de listagem**:
- `account_id` - Filtrar por conta
- `status` - Status (paid, pending)
- `filter_type` - Tipo de filtro
- `category` - Categoria
- `subcategory` - Subcategoria
- `sort_by` - Campo para ordenação
- `order_by` - Direção (asc, desc)
- `page` - Número da página
- `start_at` - Data início
- `end_at` - Data fim

**Estrutura de resposta**:
```json
{
  "transactions": [...],
  "cursor": "next_page_cursor",
  "count": 50
}
```

### Categorias Financeiras
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/financial/categories` | Lista todas as categorias |
| GET | `/v1/financial/category/{id}` | Obtém uma categoria específica |
| POST | `/v1/financial/categories` | Cria uma nova categoria |
| POST | `/v1/financial/category/{id}` | Atualiza uma categoria |
| DELETE | `/v1/financial/category/{id}` | Remove uma categoria |

### Faturas (Invoices)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/invoices` | Lista todas as faturas |
| GET | `/v1/invoice/{id}` | Obtém uma fatura específica |
| POST | `/v1/invoices` | Cria uma nova fatura |
| POST | `/v1/invoice/{id}` | Atualiza uma fatura |
| DELETE | `/v1/invoice/{id}` | Remove uma fatura |

**Parâmetros de listagem**:
- `account_id` - Filtrar por conta
- `lease_id` - Filtrar por locação
- `contract_id` - Filtrar por contrato
- `status` - Status (paid, pending, overdue)
- `payment_method` - Método de pagamento
- `page` - Número da página

**Estrutura de resposta**:
```json
{
  "invoices": [...],
  "cursor": "next_page_cursor"
}
```

### Calendário
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/calendar` | Lista eventos do calendário |
| GET | `/v1/calendar-item/{id}` | Obtém um evento específico |
| POST | `/v1/calendar` | Cria um novo evento |
| POST | `/v1/calendar-item/{id}` | Atualiza um evento |
| DELETE | `/v1/calendar-item/{id}` | Remove um evento |

**Parâmetros de listagem** (obrigatórios):
- `year` - Ano para filtro
- `month` - Mês para filtro (1-12)
- `day` - Dia para filtro (0 = todos)
- `user_id` - Filtrar por usuário
- `item_type` - Tipo de item
- `team_id` - Filtrar por time

**Estrutura de resposta**:
```json
{
  "calendar": [...],
  "count": 50
}
```

### Integrações
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/integrations` | Lista todas as integrações |
| GET | `/v1/integration/{id}` | Obtém uma integração específica |
| POST | `/v1/integrations` | Cria uma nova integração |
| POST | `/v1/integration/{id}` | Atualiza uma integração |
| DELETE | `/v1/integration/{id}` | Remove uma integração |

**Estrutura de resposta**: Array direto
```json
[
  { "db_id": "123", "name": "Portal XYZ", ... },
  { "db_id": "456", "name": "Site Imobiliária", ... }
]
```

### Webhooks
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/webhooks` | Lista todos os webhooks |
| GET | `/v1/webhook/{id}` | Obtém um webhook específico |
| POST | `/v1/webhooks` | Cria um novo webhook |
| POST | `/v1/webhook/{id}` | Atualiza um webhook |
| DELETE | `/v1/webhook/{id}` | Remove um webhook |

**Estrutura de resposta**: Array direto
```json
[
  { "db_id": "123", "url": "https://...", "events": [...] },
  { "db_id": "456", "url": "https://...", "events": [...] }
]
```

### Bairros (Neighborhoods)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/neighborhoods` | Lista todos os bairros |
| GET | `/v1/neighborhoods/{id}` | Obtém um bairro específico |

**Estrutura de resposta**:
```json
{
  "neighborhoods": [...]
}
```

### Tipos de Imóvel (Property Types)
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/v1/property-types` | Lista todos os tipos de imóvel |
| GET | `/v1/property-types/{id}` | Obtém um tipo específico |

**Estrutura de resposta**: Array direto
```json
[
  { "id": "apartment", "name": "Apartamento" },
  { "id": "house", "name": "Casa" }
]
```

## Paginação

A API usa paginação baseada em cursor:

1. Faça a primeira requisição sem cursor
2. Capture o `cursor` da resposta
3. Use o cursor na próxima requisição

```typescript
// Primeira página
const response1 = await request({ url: '/v1/contacts' });
const cursor = response1.cursor;

// Próxima página
const response2 = await request({ url: '/v1/contacts', qs: { cursor } });
```

## Webhooks

### Eventos Suportados

| Categoria | Eventos |
|-----------|---------|
| **Leads** | `lead_created`, `lead_updated` |
| **Contatos** | `contact_created`, `contact_updated` |
| **Imóveis** | `property_created`, `property_updated` |
| **Negócios** | `deal_created`, `deal_updated`, `deal_moved`, `deal_won`, `deal_lost` |
| **Locações** | `lease_created`, `lease_updated` |
| **Contratos** | `contract_created`, `contract_updated` |
| **Faturas** | `invoice_created`, `invoice_paid`, `invoice_overdue` |
| **Documentos** | `document_created`, `document_signed` |
| **Visitas** | `visit_scheduled`, `visit_completed`, `visit_cancelled` |
| **Tarefas** | `task_created`, `task_completed` |
| **Usuários** | `user_created` |

### Formato do Payload

```json
{
  "event": "lead_created",
  "timestamp": "2024-12-10T10:00:00Z",
  "data": {
    "db_id": "123456789",
    "fullname": "João Silva",
    "email": "joao@email.com",
    "phones": [...],
    "created_at": "2024-12-10T10:00:00Z"
  }
}
```

### Configuração de Webhooks

Para configurar webhooks na Imobzi:

1. Acesse o painel da Imobzi
2. Vá para **Configurações** > **Webhooks**
3. Adicione uma nova URL de webhook
4. Selecione os eventos que devem acionar o webhook

**Documentação oficial**: [Como criar e usar webhooks na Imobzi](https://www.imobzi.com/docs/primeiros-passos/integracoes-e-automacoes/como-criar-e-usar-webhooks-na-imobzi/)

## Códigos de Status

| Código | Descrição |
|--------|-----------|
| `200` | Sucesso |
| `201` | Criado com sucesso |
| `400` | Requisição inválida / Parâmetros faltando |
| `401` | Não autorizado (API Key inválida) |
| `403` | Acesso negado (sem permissão) |
| `404` | Não encontrado |
| `422` | Entidade não processável |
| `500` | Erro interno do servidor |

## Implementação no Node n8n

### Autenticação

```typescript
authenticate: IAuthenticateGeneric = {
  type: 'generic',
  properties: {
    headers: {
      'X-Imobzi-Secret': '={{$credentials.apiKey}}',
      'Content-Type': 'application/json',
    },
  },
};
```

### Exemplo de Request

```typescript
const response = await this.helpers.requestWithAuthentication.call(
  this,
  'imobziApi',
  {
    method: 'GET',
    url: '/v1/contacts',
    baseURL: 'https://api.imobzi.app',
    qs: { cursor: '', limit: 50 },
    json: true,
  }
);
```

### Tratamento de Resposta

```typescript
// Para recursos com dataKey (contacts, properties, leases, etc.)
if (config.dataKey && response[config.dataKey]) {
  const data = response[config.dataKey];
  // Processar array de dados
}

// Para recursos com array direto (users, pipelines, webhooks, integrations)
if (Array.isArray(response)) {
  // Processar array direto
}
```

## Suporte

Para suporte técnico da API da Imobzi:
- **Documentação**: https://developer.imobzi.com/
- **Status**: https://status.imobzi.com/
- **Suporte**: https://help.imobzi.com/

Para suporte do node n8n:
- **GitHub**: https://github.com/redeuno/n8n-node-imobzi-new
- **Issues**: https://github.com/redeuno/n8n-node-imobzi-new/issues

## Recursos Adicionais

- [Como funciona a chave de API](https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/)
- [Como utilizar a API para integrar com aplicativos externos](https://help.imobzi.com/pt-br/article/como-utilizar-a-api-para-integrar-com-aplicativos-externos-n4fbe7/)
- [Como criar e usar webhooks na Imobzi](https://www.imobzi.com/docs/primeiros-passos/integracoes-e-automacoes/como-criar-e-usar-webhooks-na-imobzi/)

---

**Criado por**: Bruno Mantovani  
**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024
