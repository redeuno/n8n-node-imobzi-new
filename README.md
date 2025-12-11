# n8n-node-imobzi-latest

Este é um pacote de nodes da comunidade n8n que permite integrar com a API da Imobzi em seus workflows.

A Imobzi é uma plataforma de CRM imobiliário que oferece uma API aberta para integração com outros softwares. Para utilizar a API, é necessário possuir o plano CRM Business ou a Gestão de Locação Real Estate.

[n8n](https://n8n.io/) é uma plataforma de automação de workflows com licença fair-code.

## Índice

- [Instalação](#instalação)  
- [Configuração](#configuração)  
- [Recursos](#recursos)  
- [Operações](#operações)  
- [Webhooks](#webhooks)  
- [Exemplos](#exemplos)  
- [Compatibilidade](#compatibilidade)  
- [Links Úteis](#links-úteis)  

## Instalação

Siga o [guia de instalação](https://docs.n8n.io/integrations/community-nodes/installation/) na documentação dos nodes da comunidade n8n.

```bash
npm install n8n-node-imobzi-latest
```

## Configuração

### 1. Gerar Chave de API no Imobzi

1. Acesse o menu lateral do Imobzi
2. Clique em **"Integrações & Automações"**
3. Selecione **"Chave de API"**
4. Clique em **"Adicionar uma nova chave de API"**
5. Nomeie a chave conforme o serviço que irá utilizá-la
6. Copie a chave gerada

Para mais detalhes, consulte: [Como funciona a chave de API](https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/)

### 2. Configurar Permissões da Chave de API

1. Ao criar ou editar uma chave de API, defina exatamente quais métodos (funções) a integração poderá acessar
2. Marque os métodos desejados ou utilize a opção **"Selecionar todos os métodos"** para liberar todas as funções

### 3. Configurar Credenciais no n8n

1. No n8n, vá para **Settings** > **Credentials**
2. Clique em **Add Credential**
3. Procure por **"Imobzi API"**
4. Configure:
   - **API Key**: Cole a chave gerada no Imobzi

### Autenticação

A API utiliza o header `X-Imobzi-Secret` para autenticação:

```
X-Imobzi-Secret: sua-chave-de-api
```

**Base URL**: `https://api.imobzi.app`

## Recursos

O node suporta os seguintes recursos da API da Imobzi (v1):

| Recurso | Endpoint | Descrição |
|---------|----------|-----------|
| **Contatos** | `/v1/contacts` | Gerenciamento de contatos (pessoas e organizações) |
| **Pessoas** | `/v1/persons` | Gerenciamento de pessoas físicas |
| **Organizações** | `/v1/organizations` | Gerenciamento de empresas/organizações |
| **Leads** | `/v1/leads` | Gerenciamento de leads |
| **Imóveis** | `/v1/properties` | Gerenciamento de imóveis |
| **Contratos** | `/v1/contracts` | Gerenciamento de contratos de venda |
| **Locações** | `/v1/leases` | Gerenciamento de contratos de locação |
| **Documentos** | `/v1/documents` | Gerenciamento de documentos |
| **Usuários** | `/v1/users` | Gerenciamento de usuários/corretores |
| **Negócios (Deals)** | `/v1/deals` | Gerenciamento de negócios/oportunidades |
| **Pipelines** | `/v1/pipelines` | Gerenciamento de estágios do funil |
| **Grupos de Funil** | `/v1/pipeline-groups` | Gerenciamento de grupos de funil |
| **Contas Financeiras** | `/v1/financial/accounts` | Contas financeiras |
| **Transações Financeiras** | `/v1/financial/transactions` | Transações financeiras |
| **Categorias Financeiras** | `/v1/financial/categories` | Categorias financeiras |
| **Faturas** | `/v1/invoices` | Gerenciamento de faturas |
| **Calendário** | `/v1/calendar` | Eventos do calendário |
| **Integrações** | `/v1/integrations` | Integrações configuradas |
| **Webhooks** | `/v1/webhooks` | Gerenciamento de webhooks |
| **Bairros** | `/v1/neighborhoods` | Gerenciamento de bairros |
| **Tipos de Imóvel** | `/v1/property-types` | Tipos de imóveis |

## Operações

Cada recurso suporta as seguintes operações:

### Listar (Get All)
Lista todos os itens do recurso com suporte a:

- **Cursor**: Paginação baseada em cursor
- **Busca por texto**: Filtro por texto em campos relevantes
- **Filtros por data**: `start_at` e `end_at`
- **Limite**: Número máximo de registros

**Opções específicas por recurso:**

| Recurso | Opções Disponíveis |
|---------|-------------------|
| **Contatos** | Tipo de contato, tags, origem, gestor, inativos |
| **Imóveis** | Todos os corretores, smart list, namespace, ordenação, mapa, rede |
| **Locações** | Proprietário, imóvel, smart list, tipo de busca |
| **Negócios** | Pipeline group, tipo, status, usuário, imóvel, contato |
| **Transações** | Conta, status, categoria, subcategoria, ordenação, página |
| **Calendário** | Ano, mês, dia, usuário, tipo de item, time |
| **Documentos** | Status, tipo, imóvel, contato |
| **Contratos** | Smart list, tipo de busca, imóvel |
| **Faturas** | Conta, locação, contrato, status, método de pagamento |
| **Usuários** | Email, nome, todos os usuários, busca global |

### Obter (Get)
Obtém um item específico por ID.

### Criar (Create)
Cria um novo item enviando dados em formato JSON.

### Atualizar (Update)
Atualiza um item existente por ID enviando dados em formato JSON.

### Excluir (Delete)
Remove um item por ID.

## Webhooks

O node **Imobzi Trigger** permite receber notificações em tempo real sobre eventos no Imobzi.

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

### Funcionalidades do Webhook

- **Registro automático**: O webhook pode ser registrado automaticamente na API do Imobzi quando o workflow é ativado
- **Filtragem de eventos**: Selecione apenas os eventos que deseja receber
- **Metadados**: Recebe informações completas do evento incluindo timestamp e headers

### Configuração Manual de Webhooks

Para configurar webhooks manualmente na Imobzi:

1. Acesse o painel da Imobzi
2. Vá para **Configurações** > **Webhooks**
3. Adicione a URL do webhook gerada pelo n8n
4. Selecione os eventos que devem acionar o webhook

## Exemplos

### Exemplo 1: Sincronizar Leads com CRM Externo

```json
{
  "resource": "lead",
  "operation": "getAll",
  "options": {
    "cursor": "",
    "limit": 50
  }
}
```

### Exemplo 2: Criar Novo Contato

```json
{
  "resource": "contact",
  "operation": "create",
  "body": {
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "+5511999999999",
    "type": "person"
  }
}
```

### Exemplo 3: Listar Imóveis com Filtros

```json
{
  "resource": "property",
  "operation": "getAll",
  "propertyOptions": {
    "all_brokers": true,
    "show_map": false
  }
}
```

### Exemplo 4: Buscar Transações Financeiras

```json
{
  "resource": "financialTransaction",
  "operation": "getAll",
  "options": {
    "start_at": "2024-01-01",
    "end_at": "2024-12-31"
  },
  "transactionOptions": {
    "status": "paid",
    "sort_by": "due_date",
    "order_by": "desc"
  }
}
```

### Exemplo 5: Webhook para Novos Leads

1. Adicione o **Imobzi Trigger** ao workflow
2. Selecione o evento `lead_created`
3. Ative o registro automático de webhook
4. Conecte com os próximos nodes para processar o lead

## Estrutura de Resposta

### Resposta com Paginação

```json
{
  "contacts": [...],
  "cursor": "next_page_cursor",
  "count": 50,
  "total": 1234
}
```

### Metadados Incluídos

Cada item retornado inclui metadados de paginação:

```json
{
  "_metadata": {
    "cursor": "next_page_cursor",
    "count": 50,
    "total": 1234
  }
}
```

## Compatibilidade

- **n8n**: Versão mínima 1.0.0
- **Node.js**: >=20.15
- **Plano Imobzi**: CRM Business ou Gestão de Locação Real Estate
- **API Version**: v1

## Links Úteis

* [Documentação da comunidade n8n](https://docs.n8n.io/integrations/#community-nodes)
* [Documentação da API Imobzi](https://developer.imobzi.com/)
* [Como funciona a chave de API](https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/)
* [Como utilizar a API para integrar com aplicativos externos](https://help.imobzi.com/pt-br/article/como-utilizar-a-api-para-integrar-com-aplicativos-externos-n4fbe7/)
* [Como criar e usar webhooks na Imobzi](https://www.imobzi.com/docs/primeiros-passos/integracoes-e-automacoes/como-criar-e-usar-webhooks-na-imobzi/)
* [Repositório GitHub](https://github.com/redeuno/n8n-node-imobzi-latest)

## Histórico de Versões

### v1.0.0 (Dezembro 2024)
- ✅ **URL base corrigida** para `https://api.imobzi.app`
- ✅ **Autenticação corrigida** para usar header `X-Imobzi-Secret`
- ✅ **21 recursos** implementados com endpoints corretos
- ✅ **Opções específicas por recurso** para filtros avançados
- ✅ **Webhook Trigger** com registro automático e 25+ eventos
- ✅ **Metadados de paginação** incluídos nas respostas
- ✅ **Node versão 3** com melhorias de UX
- ✅ Todos os erros de linting corrigidos

---

**Criado por**: Bruno Mantovani  
**GitHub**: [redeuno/n8n-node-imobzi-latest](https://github.com/redeuno/n8n-node-imobzi-latest)  
**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024
