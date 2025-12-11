# Imobzi Node para n8n

Integração completa com a API da Imobzi - Plataforma de Gestão Imobiliária.

## Funcionalidades

### Recursos Disponíveis

| Recurso | Descrição | Operações |
|---------|-----------|-----------|
| **Contato** | Gerenciar contatos (pessoas e organizações) | Criar, Obter, Listar, Atualizar, Excluir |
| **Pessoa** | Gerenciar pessoas físicas | Criar, Obter, Listar, Atualizar, Excluir |
| **Organização** | Gerenciar organizações/empresas | Criar, Obter, Listar, Atualizar, Excluir |
| **Lead** | Gerenciar leads | Criar, Obter, Listar, Atualizar, Excluir |
| **Imóvel** | Gerenciar imóveis | Criar, Obter, Listar, Atualizar, Excluir |
| **Contrato** | Gerenciar contratos de venda | Criar, Obter, Listar, Atualizar, Excluir |
| **Locação** | Gerenciar contratos de locação | Criar, Obter, Listar, Atualizar, Excluir |
| **Documento** | Gerenciar documentos | Criar, Obter, Listar, Atualizar, Excluir |
| **Usuário** | Gerenciar usuários/corretores | Criar, Obter, Listar, Atualizar, Excluir |
| **Negócio (Deal)** | Gerenciar negócios/oportunidades | Criar, Obter, Listar, Atualizar, Excluir |
| **Funil (Pipeline)** | Gerenciar estágios do funil | Criar, Obter, Listar, Atualizar, Excluir |
| **Grupo de Funil** | Gerenciar grupos de funil | Criar, Obter, Listar, Atualizar, Excluir |
| **Conta Financeira** | Gerenciar contas financeiras | Criar, Obter, Listar, Atualizar, Excluir |
| **Transação Financeira** | Gerenciar transações | Criar, Obter, Listar, Atualizar, Excluir |
| **Fatura** | Gerenciar faturas | Criar, Obter, Listar, Atualizar, Excluir |
| **Categoria Financeira** | Gerenciar categorias | Criar, Obter, Listar, Atualizar, Excluir |
| **Calendário** | Gerenciar eventos do calendário | Criar, Obter, Listar, Atualizar, Excluir |
| **Webhook** | Gerenciar webhooks | Criar, Obter, Listar, Atualizar, Excluir |
| **Integração** | Gerenciar integrações externas | Criar, Obter, Listar, Atualizar, Excluir |
| **Tipo de Imóvel** | Gerenciar tipos de imóveis | Criar, Obter, Listar, Atualizar, Excluir |

## Configuração

### Credenciais

1. Acesse o painel da Imobzi
2. Vá para **Integrações & Automações** > **Chave de API**
3. Clique em **"Adicionar uma nova chave de API"**
4. Nomeie a chave e selecione as permissões necessárias
5. Copie a chave gerada
6. No n8n, adicione uma nova credencial **Imobzi API**
7. Cole a chave de API

### Pré-requisitos

- **Plano Imobzi**: CRM Business ou Gestão de Locação Real Estate
- **Chave de API**: Gerada no painel da Imobzi
- **Permissões**: Configuradas para os métodos necessários

## Endpoints da API

| Endpoint | Recurso |
|----------|---------|
| `/v1/contacts` | Contatos |
| `/v1/persons` | Pessoas |
| `/v1/organizations` | Organizações |
| `/v1/leads` | Leads |
| `/v1/properties` | Imóveis |
| `/v1/contracts` | Contratos |
| `/v1/leases` | Locações |
| `/v1/documents` | Documentos |
| `/v1/users` | Usuários |
| `/v1/deals` | Negócios |
| `/v1/pipelines` | Funis |
| `/v1/pipeline-groups` | Grupos de Funil |
| `/v1/financial/accounts` | Contas Financeiras |
| `/v1/financial/transactions` | Transações |
| `/v1/financial/categories` | Categorias Financeiras |
| `/v1/invoices` | Faturas |
| `/v1/calendar` | Calendário |
| `/v1/webhooks` | Webhooks |
| `/v1/integrations` | Integrações |
| `/v1/property-types` | Tipos de Imóvel |

## Exemplos de Uso

### Listar Contatos

```json
{
  "resource": "contact",
  "operation": "getAll",
  "options": {
    "limit": 50
  },
  "contactOptions": {
    "contact_type": "person",
    "tags": "proprietário"
  }
}
```

### Criar um Lead

```json
{
  "resource": "lead",
  "operation": "create",
  "body": {
    "fullname": "João Silva",
    "email": "joao@email.com",
    "phones": [
      {
        "number": "(11) 99999-9999",
        "type": "mobile"
      }
    ],
    "media_source": "Site"
  }
}
```

### Buscar Imóvel por ID

```json
{
  "resource": "property",
  "operation": "get",
  "id": "4550464861896704"
}
```

### Listar Locações

```json
{
  "resource": "lease",
  "operation": "getAll",
  "leaseOptions": {
    "property_id": "5064445616193536"
  }
}
```

### Listar Transações Financeiras

```json
{
  "resource": "financialTransaction",
  "operation": "getAll",
  "options": {
    "start_at": "2025-01-01",
    "end_at": "2025-12-31"
  },
  "transactionOptions": {
    "status": "paid",
    "order_by": "desc"
  }
}
```

### Criar Evento no Calendário

```json
{
  "resource": "calendar",
  "operation": "create",
  "body": {
    "title": "Visita ao Imóvel",
    "description": "Visita agendada com cliente",
    "start_at": "2025-12-15T10:00:00",
    "end_at": "2025-12-15T11:00:00",
    "item_type": "visit"
  }
}
```

## Paginação

A API usa paginação baseada em cursor. Para obter a próxima página:

1. Execute a primeira requisição
2. Capture o `cursor` retornado nos metadados (`_metadata.cursor`)
3. Use esse cursor na próxima requisição no campo **Opções > Cursor**

## Estrutura da Resposta

### Para recursos com dataKey (contacts, properties, leases, etc.)

```json
{
  "cursor": "eyJhbGci...",
  "count": 50,
  "total": 166,
  "properties": [
    { "db_id": "123", "address": "..." },
    { "db_id": "456", "address": "..." }
  ]
}
```

### Para recursos com array direto (users, pipelines, webhooks, integrations)

```json
[
  { "db_id": "123", "fullname": "..." },
  { "db_id": "456", "fullname": "..." }
]
```

## Autenticação

A API usa autenticação via header `X-Imobzi-Secret`:

```
X-Imobzi-Secret: YOUR_API_KEY
Content-Type: application/json
```

**Base URL**: `https://api.imobzi.app`

## Documentação Oficial

- [Portal do Desenvolvedor Imobzi](https://developer.imobzi.com/)
- [Como funciona a chave de API](https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/)
- [Como usar webhooks na Imobzi](https://www.imobzi.com/docs/primeiros-passos/integracoes-e-automacoes/como-criar-e-usar-webhooks-na-imobzi/)

## Suporte

Para suporte técnico:
- **Documentação**: https://developer.imobzi.com/
- **GitHub**: https://github.com/redeuno/n8n-nodes-imobzi-latest
- **Issues**: https://github.com/redeuno/n8n-nodes-imobzi-latest/issues

---

**Criado por**: Bruno Mantovani  
**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024
