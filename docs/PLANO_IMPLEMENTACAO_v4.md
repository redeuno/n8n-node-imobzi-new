# 📋 PLANO DE IMPLEMENTAÇÃO v4.0 - Node Imobzi para n8n

**Autor:** Bruno Mantovani  
**Data:** Dezembro 2024  
**Pacote:** n8n-nodes-imobzi-latest  
**Repositório:** https://github.com/redeuno/n8n-node-imobzi-new.git

---

## 📑 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Configuração da API](#configuração-da-api)
3. [Estrutura de Recursos](#estrutura-de-recursos)
4. [Detalhamento por Recurso](#detalhamento-por-recurso)
5. [Funcionalidades Transversais](#funcionalidades-transversais)
6. [Fases de Implementação](#fases-de-implementação)
7. [Changelog](#changelog)

---

## 1. VISÃO GERAL

### Objetivo
Criar um node n8n completo para integração com a API do Imobzi, sistema de gestão imobiliária, com foco em:
- UX intuitiva com dropdowns pré-definidos
- Dados detalhados em todas as operações
- Auto-paginação para grandes volumes
- Suporte a automação de IA

### Recursos Principais

| # | Recurso | Prioridade | Operações |
|---|---------|------------|-----------|
| 1 | Contato | 🔴 Alta | 13 |
| 2 | Imóvel | 🔴 Alta | 11 |
| 3 | Locação | 🔴 Alta | 5 |
| 4 | Fatura | 🔴 Alta | 4 |
| 5 | Negócio (Deal) | 🔴 Alta | 12 |
| 6 | Calendário | 🔴 Alta | 6 |
| 7 | Transação | 🟡 Média | 4 |
| 8 | Usuário | 🟢 Baixa | 2 |

---

## 2. CONFIGURAÇÃO DA API

### Base URL
```
https://api.imobzi.app
```

### Autenticação
```
Header: X-Imobzi-Secret
Valor: {API_KEY}
```

### Limites
- **Limite por requisição:** 50 registros (máximo da API)
- **Paginação:** Cursor-based
- **Rate Limit:** Não documentado (usar com moderação)

---

## 3. ESTRUTURA DE RECURSOS

### Conceito: Listar vs Obter

| Operação | Descrição | Dados |
|----------|-----------|-------|
| **Listar** | Múltiplos registros | Resumidos |
| **Obter por ID** | Um registro | **COMPLETOS** |
| **Obter por Código** | Um registro | **COMPLETOS** |

### Tabela de Endpoints

| Recurso | Listar | Obter Detalhado | Por Código |
|---------|--------|-----------------|------------|
| Contato | /v1/contacts | /v1/person/{id} | /v1/person/code/{code} |
| Imóvel | /v1/properties | /v1/property/{id} | /v1/property/code/{code} |
| Locação | /v1/leases | /v1/lease/{id} | /v1/lease/code/{code} |
| Fatura | /v1/invoices | /v1/invoice/{id} | ❌ |
| Deal | /v1/deals | /v1/deal/{id} | ❌ |
| Calendário | /v1/calendar | /v1/calendar-item/{id} | ❌ |
| Transação | /v1/financial-transactions | /v1/financial-transaction/{id} | ❌ |

---

## 4. DETALHAMENTO POR RECURSO

### 4.1 CONTATO

#### Operações

| # | Operação | Método | Endpoint | Dados |
|---|----------|--------|----------|-------|
| 1 | Listar | GET | /v1/contacts | Resumidos |
| 2 | Obter Pessoa | GET | /v1/person/{id} | Completos |
| 3 | Obter Organização | GET | /v1/organization/{id} | Completos |
| 4 | Obter Lead | GET | /v1/lead/{id} | Completos |
| 5 | Buscar Pessoa por Código | GET | /v1/person/code/{code} | Completos |
| 6 | Buscar Lead por Código | GET | /v1/lead/code/{code} | Completos |
| 7 | Buscar Org por Código | GET | /v1/organization/code/{code} | Completos |
| 8 | Verificar Existência | GET | /v1/contact/exists | ID |
| 9 | Criar Pessoa | POST | /v1/persons | - |
| 10 | Criar Lead | POST | /v1/leads | - |
| 11 | Criar Organização | POST | /v1/organizations | - |
| 12 | Atualizar | POST | /v1/person/{id} ou /v1/organization/{id} | - |
| 13 | Excluir | DELETE | /v1/person/{id} ou /v1/organization/{id} | - |

#### Filtros (Listar)

| Campo | Tipo | Opções |
|-------|------|--------|
| contact_type | Dropdown | person, organization, lead |
| tags | Texto | - |
| media_source | Dropdown | Nenhum, Facebook, Instagram, Site, Google, Indicação, Portal, Outro |
| manager_id | Texto | ID do usuário |
| inactive | Boolean | true, false |
| search_text | Texto | Busca geral |
| start_date | Data | - |
| end_date | Data | - |

#### Verificar Existência - Campos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| email | Texto | Email do contato |
| phone_number | Texto | Telefone |
| cpf | Texto | CPF (apenas pessoa) |
| cnpj | Texto | CNPJ (apenas organização) |

---

### 4.2 IMÓVEL

#### Operações

| # | Operação | Método | Endpoint | Dados |
|---|----------|--------|----------|-------|
| 1 | Listar | GET | /v1/properties | Resumidos |
| 2 | Obter por ID | GET | /v1/property/{id} | Completos |
| 3 | Buscar por Código | GET | /v1/property/code/{code} | Completos |
| 4 | Verificar Existência | GET | /v1/property/exists | ID |
| 5 | Buscar Avançada | POST | /v1/property/search | Resumidos |
| 6 | Estatísticas | GET | /v1/property/{id}/statistics | Métricas |
| 7 | Deals Match | GET | /v1/property/{id}/deals-match | Deals |
| 8 | Eventos Calendário | GET | /v1/property/{id}/calendar-items | Eventos |
| 9 | Criar | POST | /v1/properties | - |
| 10 | Atualizar | POST | /v1/property/{id} | - |
| 11 | Excluir | DELETE | /v1/property/{id} | - |

#### Smart List (Dropdown)

```
all                      - Todos
available                - Disponíveis
available_reserved       - Disponíveis e Reservados
reserved                 - Reservados
rent                     - Para Aluguel
sale                     - Para Venda
vacation_rental          - Temporada
site_publish             - Publicados no Site
site_no_publish          - Não Publicados
without_photos           - Sem Fotos
my_properties            - Meus Imóveis
properties_third_party   - Imóveis de Terceiros
shared_with_me           - Compartilhados Comigo
shared_with_others       - Compartilhados com Outros
inactives                - Inativos
buildings                - Empreendimentos
with_plaque              - Com Placa
out_of_date              - Desatualizados
new_properties           - Novos
pending                  - Pendentes
updated_by_owner         - Atualizados pelo Proprietário
properties_without_owner - Sem Proprietário
exceeding                - Excedentes
outdated                 - Desatualizados
updated                  - Atualizados
without_location         - Sem Localização
unavailable_properties   - Indisponíveis
```

---

### 4.3 LOCAÇÃO

#### Operações

| # | Operação | Método | Endpoint | Dados |
|---|----------|--------|----------|-------|
| 1 | Listar | GET | /v1/leases | Resumidos |
| 2 | Obter por ID | GET | /v1/lease/{id} | Completos |
| 3 | Buscar por Código | GET | /v1/lease/code/{code} | Completos |
| 4 | Criar | POST | /v1/leases | - |
| 5 | Atualizar | POST | /v1/lease/{id} | - |

#### Filtros (Listar)

| Campo | Tipo | Opções |
|-------|------|--------|
| smart_list | Dropdown | all, active, inactive, terminated |
| owner_id | Texto | ID do proprietário |
| property_id | Texto | ID do imóvel |
| search_text | Texto | Busca geral |
| start_at | Data | Data início |
| end_at | Data | Data fim |

---

### 4.4 FATURA

#### Operações

| # | Operação | Método | Endpoint | Dados |
|---|----------|--------|----------|-------|
| 1 | Listar | GET | /v1/invoices | Resumidos |
| 2 | Obter por ID | GET | /v1/invoice/{id} | Completos |
| 3 | Criar | POST | /v1/invoices | - |
| 4 | Atualizar | POST | /v1/invoice/{id} | - |

#### Filtros (Listar)

| Campo | Tipo | Opções |
|-------|------|--------|
| status | Dropdown | all, paid, pending, overdue, cancelled |
| due_date_start | Data | - |
| due_date_end | Data | - |

---

### 4.5 NEGÓCIO (DEAL) ⭐

#### Operações

| # | Operação | Método | Endpoint | Dados |
|---|----------|--------|----------|-------|
| 1 | Listar por Estágio | GET | /v1/deals | Agrupado |
| 2 | Buscar | GET | /v1/deals/search | Lista plana |
| 3 | Obter por ID | GET | /v1/deal/{id} | Completos |
| 4 | Match com Imóveis | GET | /v1/deal/{id}/properties-match | Imóveis |
| 5 | Criar | POST | /v1/deals | - |
| 6 | Atualizar | POST | /v1/deal/{id} | - |
| 7 | Excluir | DELETE | /v1/deal/{id} | - |
| 8 | Listar Grupos de Funil | GET | /v1/pipeline-groups | Auxiliar |
| 9 | Listar Estágios | GET | /v1/pipelines | Auxiliar |
| 10 | Listar Motivos de Perda | GET | /v1/deal/lost-reason | Auxiliar |
| 11 | Timeline/Atividades | GET | /v1/timeline?deal_id={id} | Histórico |
| 12 | Deals Concluídos | GET | /v1/reports/deals-done | Relatório |

#### Filtros - Listar por Estágio (/v1/deals)

| Campo | Tipo | Opções |
|-------|------|--------|
| deal_status | Dropdown | open, won, lost |
| deal_type | Dropdown | rent, sale |
| pipeline_group_id | Texto | ID do grupo |
| user_id | Texto | ID do responsável |
| contact_id | Texto | ID do contato |
| property_id | Texto | ID do imóvel |
| search_text | Texto | Busca geral |

#### Filtros - Buscar (/v1/deals/search)

| Campo | Tipo | Opções |
|-------|------|--------|
| status | Dropdown | open, won, lost |
| deal_stage | Texto | ID do estágio |
| contact_id | Texto | ID do contato |
| finality | Dropdown | residential, commercial, rural |
| min_value | Número | - |
| max_value | Número | - |
| min_area | Número | - |
| max_area | Número | - |
| city | Texto | - |
| neighborhood | Texto | - |
| bedroom | Número | - |
| bathroom | Número | - |
| garage | Número | - |
| suite | Número | - |
| show_activities | Boolean | **true** para trazer atividades |
| initial_date | Data | - |
| final_date | Data | - |

---

### 4.6 CALENDÁRIO

#### Operações

| # | Operação | Método | Endpoint | Dados |
|---|----------|--------|----------|-------|
| 1 | Listar | GET | /v1/calendar | Resumidos |
| 2 | Obter por ID | GET | /v1/calendar-item/{id} | Completos |
| 3 | Criar | POST | /v1/calendar | - |
| 4 | Atualizar | POST | /v1/calendar-item/{id} | - |
| 5 | Excluir | DELETE | /v1/calendar-item/{id} | - |
| 6 | Listar Tipos | GET | /v1/calendar-types | Auxiliar |

#### Filtros (Listar) - OBRIGATÓRIOS

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| year | Número | ✅ SIM | Ano (ex: 2025) |
| month | Número | ✅ SIM | Mês (1-12) |
| day | Número | Não | Dia (1-31) |
| user_id | Texto | Não | ID do usuário |
| item_type | Dropdown | Não | visit, task, event, reminder |
| calendar_type | Texto | Não | Tipo personalizado |
| team_id | Texto | Não | ID da equipe |

---

### 4.7 TRANSAÇÃO FINANCEIRA

#### Operações

| # | Operação | Método | Endpoint | Dados |
|---|----------|--------|----------|-------|
| 1 | Listar | GET | /v1/financial-transactions | Resumidos |
| 2 | Obter por ID | GET | /v1/financial-transaction/{id} | Completos |
| 3 | Criar | POST | /v1/financial-transactions | - |
| 4 | Atualizar | POST | /v1/financial-transaction/{id} | - |

#### Filtros (Listar)

| Campo | Tipo | Opções |
|-------|------|--------|
| transaction_type | Dropdown | all, income, expense, onlending |
| status | Dropdown | paid, pending |
| category | Texto | - |
| start_date | Data | - |
| end_date | Data | - |

---

### 4.8 USUÁRIO

#### Operações

| # | Operação | Método | Endpoint | Dados |
|---|----------|--------|----------|-------|
| 1 | Listar | GET | /v1/users | Resumidos |
| 2 | Obter por ID | GET | /v1/user/{id} | Completos |

---

## 5. FUNCIONALIDADES TRANSVERSAIS

### 5.1 Auto-Paginação

```
Campo: "Quantidade de Registros"
Tipo: Dropdown

Opções:
├── 50 (padrão - 1 requisição)
├── 100 (2 requisições)
├── 200 (4 requisições)
├── 500 (10 requisições)
└── Todos (loop até acabar, max 1000)

Funcionamento:
1. Faz primeira requisição com limit=50
2. Verifica se tem cursor na resposta
3. Se quantidade desejada não foi atingida, faz nova requisição
4. Concatena resultados
5. Retorna array único
```

### 5.2 Dropdowns Pré-Definidos

Todos os campos que têm valores conhecidos terão dropdown:
- smart_list
- status
- contact_type
- finality
- deal_type
- deal_status
- transaction_type
- item_type (calendário)

### 5.3 Campos de Data Nativos

Usar campos de data do n8n para:
- start_date / end_date
- due_date
- initial_date / final_date

### 5.4 Tratamento de Erros

| Código | Descrição | Ação |
|--------|-----------|------|
| 400 | Bad Request | Mostrar mensagem da API |
| 401 | Não autorizado | Verificar API Key |
| 403 | Proibido | Verificar permissões |
| 404 | Não encontrado | Mostrar ID/código buscado |
| 422 | Validação | Mostrar campos inválidos |

---

## 6. FASES DE IMPLEMENTAÇÃO

### FASE 1 - UX e Correções Base
**Versão:** 1.2.0 | **typeVersion:** 5

- [ ] Auto-paginação (50, 100, 200, 500, Todos)
- [ ] Dropdowns pré-definidos em todos os campos
- [ ] Campos de data nativos
- [ ] Corrigir estrutura de Contato (Listar + Obter separados)
- [ ] Corrigir estrutura de Imóvel (Listar + Obter separados)
- [ ] Adicionar busca por código (Pessoa, Lead, Organização, Imóvel, Locação)
- [ ] Adicionar verificar existência (Contato, Imóvel)

**Estimativa:** 2-3 horas

---

### FASE 2 - Deal Completo
**Versão:** 1.3.0 | **typeVersion:** 5

- [ ] Listar por Estágio (/v1/deals)
- [ ] Buscar (/v1/deals/search com show_activities)
- [ ] Obter por ID (/v1/deal/{id})
- [ ] Match com Imóveis
- [ ] Operações auxiliares (Grupos, Estágios, Motivos de Perda)
- [ ] Timeline/Atividades do Deal

**Estimativa:** 2 horas

---

### FASE 3 - Calendário Completo
**Versão:** 1.4.0 | **typeVersion:** 5

- [ ] Listar (year/month obrigatórios)
- [ ] Obter por ID
- [ ] Criar evento
- [ ] Atualizar evento
- [ ] Excluir evento
- [ ] Listar Tipos de Calendário

**Estimativa:** 1-2 horas

---

### FASE 4 - Imóvel Avançado
**Versão:** 1.5.0 | **typeVersion:** 5

- [ ] Estatísticas do imóvel
- [ ] Deals Match do imóvel
- [ ] Eventos do Calendário do imóvel
- [ ] Busca avançada (POST /v1/property/search)

**Estimativa:** 1 hora

---

### FASE 5 - Recursos Auxiliares (Opcional)
**Versão:** 1.6.0 | **typeVersion:** 5

- [ ] Tags de Contato (CRUD)
- [ ] Tipos de Imóvel (CRUD)
- [ ] Times/Equipes
- [ ] Bancos/Contas
- [ ] Anúncios de Imóvel

**Estimativa:** 2 horas

---

## 7. CHANGELOG

### v1.1.0 (Atual)
- ✅ Correção URL base: api.imobzi.app
- ✅ Correção autenticação: X-Imobzi-Secret
- ✅ Remoção recursos inexistentes (lead, organization como listagem)
- ✅ Calendário: year/month obrigatórios
- ✅ Limite máximo: 50
- ✅ Dropdowns básicos

### v1.2.0 (Fase 1 - ✅ IMPLEMENTADO)
- ✅ Auto-paginação (50, 100, 200, 500, Todos)
- ✅ Busca por código (Pessoa, Lead, Organização, Imóvel, Locação)
- ✅ Verificar existência de contato (CPF, Email, Telefone, CNPJ)
- ✅ Separação Listar/Obter com tipo de contato
- ✅ Campos de data nativos (dateTime)
- ✅ Dropdowns pré-definidos em todos os filtros
- ✅ typeVersion: 5

### v1.3.0 (Fase 2 - Planejado)
- Deal completo com 3 modos de listagem
- Timeline/Atividades

### v1.4.0 (Fase 3 - Planejado)
- Calendário CRUD completo

### v1.5.0 (Fase 4 - Planejado)
- Imóvel avançado (estatísticas, matches)

---

## 📁 BACKUP

Arquivos salvos em `backup_v1.1.0/`:
- Imobzi.node.ts
- ImobziWebhook.node.ts
- ImobziApi.credentials.ts
- Imobzi.node.json
- ImobziWebhook.node.json
- package.json

---

## 📞 SUPORTE

**Autor:** Bruno Mantovani  
**Email:** bruno@redeuno.com.br  
**Repositório:** https://github.com/redeuno/n8n-node-imobzi-new.git

---

*Documento gerado em: Dezembro 2024*

