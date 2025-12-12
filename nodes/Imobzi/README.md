# Imobzi Node para n8n

Integração completa com a API da Imobzi - Plataforma de Gestão Imobiliária.

## Versão 2.5.0

### Novidades
- ✅ **Calendar corrigido**: `search_all=true` + `holiday_year` + `calendar_type=normal`
- ✅ **57 Tags** em dropdown (sistema + personalizadas)
- ✅ **38 Origens** em dropdown
- ✅ **16 Usuários** em dropdown com IDs reais
- ✅ **Smart Lists completas**: Imóveis (16), Contatos (12), Locação (9)
- ✅ **Deals melhorados**: `deal_type` + `deal_status` corrigidos
- ✅ **CRUD**: Create para Contact, Property e Deal
- ✅ **Pipeline Stages**: Dropdown com 7 estágios
- ✅ **Pipeline Groups**: Dropdown com 5 grupos

### Correções anteriores (v2.4.0)
- ✅ Período pré-definido em faturas (15, 30, 60, 90 dias)
- ✅ CPF/CNPJ aceita formatação (com pontos e traços)
- ✅ Status de fatura corrigido
- ✅ Método de pagamento em faturas

## Funcionalidades

### Recursos Disponíveis

| Recurso | Operações |
|---------|-----------|
| **Contato** | Listar, Buscar por ID, Buscar por Código, Verificar Existência, **Criar** |
| **Imóvel** | Listar, Buscar por ID, Buscar por Código, Estatísticas, **Criar** |
| **Locação** | Listar, Buscar por ID |
| **Fatura** | Listar, Buscar por ID |
| **Funil (Deal)** | Listar (busca plana), **Criar** |
| **Funil Por Estágio** | Listar (visão Kanban) |
| **Transação Financeira** | Listar |
| **Calendário** | Listar (com filtros avançados) |
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

## Filtros Disponíveis (v2.5.0)

### Contato
| Filtro | Descrição |
|--------|-----------|
| **Usuário Responsável** | Dropdown com 16 usuários |
| **Origem** | Dropdown com 38 origens |
| **Tags** | Dropdown com 57 tags (sistema + personalizadas) |
| **Smart List** | 12 opções (all, my_contacts, new_leads, etc.) |
| **Tipo de Contato** | person, organization, lead |
| **Busca** | Por nome, email ou telefone |

### Imóvel
| Filtro | Descrição |
|--------|-----------|
| **Corretor** | Dropdown com 16 usuários |
| **Smart List** | 16 opções (available, rent, sale, without_photos, etc.) |
| **Status** | available, reserved, unavailable |
| **Finalidade** | residential, commercial, rural |

### Locação
| Filtro | Descrição |
|--------|-----------|
| **Smart List** | 9 opções (active, inactive, expiring, finished, etc.) |

### Fatura
| Filtro | Descrição |
|--------|-----------|
| **Período** | 15, 30, 60, 90 dias, Personalizado ou Todos |
| **Status** | pending, paid, overdue, canceled, partially_paid, expired, deleted, all |
| **Método de Pagamento** | bank_slip, pix, credit_card |

### Deal
| Filtro | Descrição |
|--------|-----------|
| **Corretor** | Dropdown com 16 usuários |
| **Estágio** | Dropdown com 7 estágios |
| **Status** | open, in_progress, win, lost, stagnant, out_of_date, property_radar |
| **Tipo** | rent, sale, both, all |
| **Mostrar Atividades** | Sim/Não |

### Deal Por Estágio
| Filtro | Descrição |
|--------|-----------|
| **Corretor** | Dropdown com 16 usuários |
| **Grupo de Funil** | Dropdown com 5 grupos |

### Calendário
| Filtro | Descrição |
|--------|-----------|
| **Usuário** | Dropdown (Todos ou específico) |
| **Tipo de Item** | task, visit, whatsapp, call |
| **Exibir Feriados** | Sim/Não |

## Endpoints da API

| Endpoint | Recurso |
|----------|---------|
| `/v1/contacts` | Contatos |
| `/v1/persons` | Criar Pessoa |
| `/v1/leads` | Criar Lead |
| `/v1/organizations` | Criar Organização |
| `/v1/person/{id}` | Pessoa por ID |
| `/v1/person/code/{code}` | Pessoa por Código |
| `/v1/properties` | Imóveis / Criar Imóvel |
| `/v1/property/{id}` | Imóvel por ID |
| `/v1/property/code/{code}` | Imóvel por Código |
| `/v1/property/{id}/statistics` | Estatísticas do Imóvel |
| `/v1/leases` | Locações |
| `/v1/lease/{id}` | Locação por ID |
| `/v1/invoices` | Faturas |
| `/v1/invoice/{id}` | Fatura por ID |
| `/v1/deals/search` | Deals (busca plana) |
| `/v1/deals` | Deals (Kanban) / Criar Deal |
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
**Versão**: 2.5.0  
**Última atualização**: Dezembro 2024
