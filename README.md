# n8n-nodes-imobzi-latest

Este é um pacote de nodes da comunidade n8n que permite integrar com a API da Imobzi em seus workflows.

A Imobzi é uma plataforma de CRM imobiliário que oferece uma API aberta para integração com outros softwares. Para utilizar a API, é necessário possuir o plano CRM Business ou a Gestão de Locação Real Estate.

[n8n](https://n8n.io/) é uma plataforma de automação de workflows com licença fair-code.

## Índice

- [Instalação](#instalação)  
- [Configuração](#configuração)  
- [Recursos](#recursos)  
- [Operações](#operações)  
- [Auto-Paginação](#auto-paginação)  
- [Webhooks](#webhooks)  
- [Exemplos](#exemplos)  
- [Compatibilidade](#compatibilidade)  
- [Links Úteis](#links-úteis)  

## Instalação

Siga o [guia de instalação](https://docs.n8n.io/integrations/community-nodes/installation/) na documentação dos nodes da comunidade n8n.

```bash
npm install n8n-nodes-imobzi-latest
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
| **Contatos** | `/v1/contacts` | Gerenciamento de contatos |
| **Pessoas** | `/v1/person/{id}` | Detalhes de pessoas físicas |
| **Organizações** | `/v1/organization/{id}` | Detalhes de empresas |
| **Leads** | `/v1/lead/{id}` | Detalhes de leads |
| **Imóveis** | `/v1/properties` | Gerenciamento de imóveis |
| **Locações** | `/v1/leases` | Contratos de locação |
| **Contratos** | `/v1/contracts` | Contratos de venda |
| **Faturas** | `/v1/invoices` | Gerenciamento de faturas |
| **Negócios (Deals)** | `/v1/deals` | Negócios/oportunidades |
| **Pipelines** | `/v1/pipelines` | Estágios do funil |
| **Grupos de Funil** | `/v1/pipeline-groups` | Grupos de funil |
| **Transações Financeiras** | `/v1/financial-transactions` | Transações financeiras |
| **Calendário** | `/v1/calendar` | Eventos do calendário |
| **Usuários** | `/v1/users` | Usuários/corretores |
| **Tipos de Imóvel** | `/v1/property-types` | Tipos de imóveis |

## Operações

### Contato

| Operação | Descrição | Endpoint |
|----------|-----------|----------|
| **Listar** | Lista todos os contatos | `GET /v1/contacts` |
| **Obter** | Detalhes completos por ID | `GET /v1/person/{id}` ou `/v1/organization/{id}` |
| **Buscar por Código** | Busca por código | `GET /v1/person/code/{code}` |
| **Verificar Existência** | Verifica por CPF/Email/Tel/CNPJ | `GET /v1/contact/exists` |
| **Criar** | Cria pessoa, lead ou organização | `POST /v1/persons` |
| **Atualizar** | Atualiza contato | `POST /v1/person/{id}` |
| **Excluir** | Remove contato | `DELETE /v1/person/{id}` |

### Imóvel

| Operação | Descrição | Endpoint |
|----------|-----------|----------|
| **Listar** | Lista imóveis com Smart List | `GET /v1/properties` |
| **Obter** | Detalhes completos por ID | `GET /v1/property/{id}` |
| **Buscar por Código** | Busca por código | `GET /v1/property/code/{code}` |
| **Criar** | Cria novo imóvel | `POST /v1/properties` |
| **Atualizar** | Atualiza imóvel | `POST /v1/property/{id}` |
| **Excluir** | Remove imóvel | `DELETE /v1/property/{id}` |

### Locação

| Operação | Descrição | Endpoint |
|----------|-----------|----------|
| **Listar** | Lista locações com filtros | `GET /v1/leases` |
| **Obter** | Detalhes completos por ID | `GET /v1/lease/{id}` |
| **Buscar por Código** | Busca por código | `GET /v1/lease/code/{code}` |
| **Criar** | Cria nova locação | `POST /v1/leases` |
| **Atualizar** | Atualiza locação | `POST /v1/lease/{id}` |

## Auto-Paginação

O node suporta auto-paginação para buscar múltiplas páginas automaticamente:

| Opção | Descrição |
|-------|-----------|
| **50** | 1 página (padrão) |
| **100** | 2 páginas |
| **200** | 4 páginas |
| **500** | 10 páginas |
| **Todos** | Máximo 1000 registros |

A API do Imobzi limita a 50 registros por requisição. O node faz requisições automáticas usando o cursor até atingir o limite desejado.

## Filtros Disponíveis

### Contatos

| Filtro | Tipo | Opções |
|--------|------|--------|
| Tipo de Contato | Dropdown | Pessoa, Organização, Lead |
| Origem | Dropdown | Facebook, Google, Instagram, Site, WhatsApp, etc. |
| Tags | Texto | Separadas por vírgula |
| Gestor | ID | ID do usuário responsável |
| Inativos | Boolean | Incluir ou não inativos |
| Data Início/Fim | Data | Filtro por período |

### Imóveis

| Filtro | Tipo | Opções |
|--------|------|--------|
| Smart List | Dropdown | 25+ opções (disponíveis, aluguel, venda, etc.) |
| Finalidade | Dropdown | Residencial, Comercial, Rural |
| Ordenação | Dropdown | Código, Data, Valor |
| Todos os Corretores | Boolean | Incluir imóveis de todos |

### Smart List (Imóveis)

```
all, available, available_reserved, reserved, rent, sale, 
vacation_rental, site_publish, site_no_publish, without_photos, 
my_properties, properties_third_party, shared_with_me, 
shared_with_others, inactives, buildings, with_plaque, 
out_of_date, new_properties, pending, updated_by_owner, 
properties_without_owner, exceeding, outdated, updated, 
without_location, unavailable_properties
```

## Webhooks

O node **Imobzi Trigger** permite receber notificações em tempo real sobre eventos no Imobzi.

### Eventos Suportados

| Categoria | Eventos |
|-----------|---------|
| **Contatos** | `contact.created`, `contact.updated` |
| **Imóveis** | `property.created`, `property.updated` |
| **Negócios** | `deal.created`, `deal.updated`, `deal.won`, `deal.lost` |
| **Locações** | `lease.created`, `lease.updated` |
| **Contratos** | `contract.created`, `contract.updated` |
| **Faturas** | `invoice.created`, `invoice.paid` |
| **Visitas** | `visit.scheduled`, `visit.cancelled` |
| **Tarefas** | `task.created`, `task.updated` |

## Exemplos

### Exemplo 1: Listar Contatos com Filtro

```json
{
  "resource": "contact",
  "operation": "getAll",
  "recordLimit": 100,
  "contactOptions": {
    "contact_type": "person",
    "media_source": "Site"
  }
}
```

### Exemplo 2: Buscar Contato por CPF

```json
{
  "resource": "contact",
  "operation": "checkExists",
  "checkExistsBy": "cpf",
  "checkExistsValue": "123.456.789-00"
}
```

### Exemplo 3: Buscar Imóvel por Código

```json
{
  "resource": "property",
  "operation": "getByCode",
  "code": "326"
}
```

### Exemplo 4: Listar Imóveis Disponíveis para Venda

```json
{
  "resource": "property",
  "operation": "getAll",
  "recordLimit": 200,
  "propertyOptions": {
    "smart_list": "sale",
    "finality": "residential"
  }
}
```

### Exemplo 5: Criar Pessoa

```json
{
  "resource": "contact",
  "operation": "create",
  "contactTypeCreate": "person",
  "body": {
    "fullname": "João Silva",
    "email": "joao@email.com",
    "phones": [
      {
        "number": "(11) 99999-9999",
        "type": "mobile"
      }
    ]
  }
}
```

## Estrutura de Resposta

### Resposta com Auto-Paginação

```json
{
  "contact_id": "123456",
  "name": "João Silva",
  "email": "joao@email.com",
  "_pagination": {
    "total_fetched": 100,
    "pages_fetched": 2
  }
}
```

### Resposta Simples

```json
{
  "contact_id": "123456",
  "name": "João Silva",
  "_metadata": {
    "cursor": "next_page_cursor",
    "count": 50
  }
}
```

## Compatibilidade

- **n8n**: Versão mínima 1.0.0
- **Node.js**: >=20.15
- **Plano Imobzi**: CRM Business ou Gestão de Locação Real Estate
- **API Version**: v1
- **Node Version**: 5

## Links Úteis

* [Documentação da comunidade n8n](https://docs.n8n.io/integrations/#community-nodes)
* [Documentação da API Imobzi](https://developer.imobzi.com/)
* [Como funciona a chave de API](https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/)
* [Repositório GitHub](https://github.com/redeuno/n8n-nodes-imobzi-latest)

## Histórico de Versões

### v1.2.0 (Dezembro 2024) - Atual
- ✅ **Auto-paginação**: 50, 100, 200, 500, Todos (máx 1000)
- ✅ **Busca por código**: Pessoa, Lead, Organização, Imóvel, Locação
- ✅ **Verificar existência**: CPF, Email, Telefone, CNPJ
- ✅ **Operações separadas por tipo**: Contato com tipo (Pessoa/Org/Lead)
- ✅ **Campos de data nativos**: dateTime do n8n
- ✅ **Dropdowns pré-definidos**: Em todos os filtros
- ✅ **typeVersion: 5**

### v1.1.0 (Dezembro 2024)
- ✅ URL base corrigida para `https://api.imobzi.app`
- ✅ Autenticação com header `X-Imobzi-Secret`
- ✅ Calendário com year/month obrigatórios
- ✅ Limite máximo de 50 por requisição
- ✅ Dropdowns básicos

### v1.0.0 (Dezembro 2024)
- Versão inicial com recursos básicos

---

**Criado por**: Bruno Mantovani  
**Email**: bruno@redeuno.com.br  
**GitHub**: [redeuno/n8n-nodes-imobzi-latest](https://github.com/redeuno/n8n-nodes-imobzi-latest)  
**Versão**: 1.2.0  
**Última atualização**: Dezembro 2024
