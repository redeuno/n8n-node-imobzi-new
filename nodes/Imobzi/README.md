# Imobzi Node para n8n

Integração completa com a API da Imobzi - Plataforma de Gestão Imobiliária.

## Versão 2.3.0

### Novidades
- ✅ Removido sanitização de CPF/CNPJ (API aceita COM formatação)
- ✅ Filtros de data em faturas: `start_at` e `end_at`
- ✅ Status de fatura corrigido: `cancelled` → `canceled`
- ✅ Novas opções de status: partially_paid, expired, deleted, all
- ✅ Filtro de método de pagamento adicionado
- ✅ Descrições explicativas nos campos de ID
- ✅ Avisos sobre limitações da API

### Roadmap
- **Fase 6 (v3.0.0):** CRUD Completo - Criar, Atualizar e Excluir

## Funcionalidades

### Recursos Disponíveis

| Recurso | Operações |
|---------|-----------|
| **Contato** | Listar, Buscar por ID, Buscar por Código, Verificar Existência, Criar |
| **Imóvel** | Listar, Buscar por ID, Buscar por Código, Estatísticas |
| **Locação** | Listar, Buscar por ID |
| **Fatura** | Listar, Buscar por ID |
| **Funil (Deal)** | Listar (busca plana) |
| **Funil Por Estágio** | Listar (visão Kanban) |
| **Transação Financeira** | Listar |
| **Calendário** | Listar (requer ano/mês) |
| **Documento** | Listar |
| **Usuário** | Listar |
| **Estágio (Pipeline)** | Listar |
| **Grupo de Funil** | Listar |
| **Tipo de Imóvel** | Listar |
| **Origem (Media Source)** | Listar |
| **Tag de Contato** | Listar |
| **Motivo de Perda** | Listar |
| **Banco** | Listar |

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
| `/v1/person/{id}` | Pessoa por ID |
| `/v1/person/code/{code}` | Pessoa por Código |
| `/v1/properties` | Imóveis |
| `/v1/property/{id}` | Imóvel por ID |
| `/v1/property/code/{code}` | Imóvel por Código |
| `/v1/property/{id}/statistics` | Estatísticas do Imóvel |
| `/v1/leases` | Locações |
| `/v1/lease/{id}` | Locação por ID |
| `/v1/invoices` | Faturas |
| `/v1/invoice/{id}` | Fatura por ID |
| `/v1/deals/search` | Deals (busca plana) |
| `/v1/deals` | Deals (Kanban) |
| `/v1/financial/transactions` | Transações |
| `/v1/calendar` | Calendário |
| `/v1/users` | Usuários |
| `/v1/pipelines` | Estágios (Pipeline) |
| `/v1/pipeline-groups` | Grupos de Funil |
| `/v1/property-types` | Tipos de Imóvel |
| `/v1/media-sources` | Origens |
| `/v1/contacts/tags` | Tags de Contato |
| `/v1/deal/lost-reason` | Motivos de Perda |
| `/v1/banks` | Bancos |
| `/v1/contact/exists` | Verificar Existência |

## Filtros Disponíveis

### Contato
| Filtro | Parâmetro | Valores |
|--------|-----------|---------|
| Tipo de Contato | `contact_type` | person, organization, lead |
| Origem | `media_source` | Texto livre (ex: OLX, Site) |
| Tags | `tags` | Texto livre |
| Smart List | `smart_list` | with_deals, my_contacts, new_leads, etc |
| ID do Usuário | `user_id` | String (use Usuário > Get Many) |
| Busca | `search_text` | Nome, email ou telefone |

### Imóvel
| Filtro | Parâmetro | Valores |
|--------|-----------|---------|
| Smart List | `smart_list` | available, rent, sale, reserved, etc |
| Finalidade | `finality` | residential, commercial, rural |
| Status | `status` | available, unavailable, reserved |
| ID do Corretor | `user_id` | String (use Usuário > Get Many) |

### Locação
| Filtro | Parâmetro | Valores |
|--------|-----------|---------|
| Smart List | `smart_list` | active, inactive |

### Fatura
| Filtro | Parâmetro | Valores |
|--------|-----------|---------|
| Status | `status` | pending, paid, overdue, canceled, partially_paid, expired, deleted, all |
| Método de Pagamento | `payment_method` | bank_slip, pix, credit_card |

### Deal
| Filtro | Parâmetro | Valores |
|--------|-----------|---------|
| Status | `deal_status` | in progress, win, lost, stagnant, out_of_date, property_radar, all |
| ID do Usuário | `user_id` | String (use Usuário > Get Many) |
| ID do Estágio | `pipeline_id` | Number (use Estágio > Get Many) |
| Mostrar Atividades | `show_activities` | true/false |

### Calendário
| Filtro | Parâmetro | Valores |
|--------|-----------|---------|
| Tipo de Item | `item_type` | task, visit, whatsapp, call |
| ID do Usuário | `user_id` | String (use Usuário > Get Many) |

## Paginação

A API usa dois tipos de paginação:

### Cursor (contacts, properties, leases, deals)
- Retorno inclui `cursor` para próxima página
- Auto-paginação implementada no node

### Next Page (invoices, transactions)
- Retorno inclui `next_page` com número da próxima página
- Auto-paginação implementada no node

### Limites
- Selecione: 50, 100, 200, 500 ou Todos (máx 5000)
- A API limita a 50 registros por requisição

## IDs

| Tipo | Formato | Exemplo |
|------|---------|---------|
| Usuários | String alfanumérica | P1ibK4GFPqZYKIx9e55RpQobt7J2 |
| Contatos | String numérica | 5352720932798464 |
| Imóveis | String numérica | 4550464861896704 |
| Locações | Number | 5987740112388096 |
| Faturas | String UUID | 536edb56c6cb11f0... |
| Pipelines | Number | 4584666827849728 |

## Autenticação

A API usa autenticação via header `X-Imobzi-Secret`:

```
X-Imobzi-Secret: YOUR_API_KEY
Content-Type: application/json
```

**Base URL**: `https://api.imobzi.app`

## Limitações Conhecidas da API

⚠️ Alguns filtros não funcionam corretamente na API Imobzi:
- `contact_type` - A API pode ignorar este filtro
- `finality` - A API pode ignorar este filtro
- `/v1/property/exists` - Pode retornar resultados incorretos

## Documentação Oficial

- [Portal do Desenvolvedor Imobzi](https://developer.imobzi.com/)
- [Como funciona a chave de API](https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/)
- [Como usar webhooks na Imobzi](https://www.imobzi.com/docs/primeiros-passos/integracoes-e-automacoes/como-criar-e-usar-webhooks-na-imobzi/)

## Suporte

Para suporte técnico:
- **Documentação**: https://developer.imobzi.com/
- **GitHub**: https://github.com/redeuno/n8n-node-imobzi-new
- **Issues**: https://github.com/redeuno/n8n-node-imobzi-new/issues

---

**Criado por**: Bruno Mantovani  
**Versão**: 2.3.0  
**Última atualização**: Dezembro 2024
