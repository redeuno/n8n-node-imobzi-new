# 📋 CHANGELOG v2.12.0

**Data:** 14/12/2025  
**Baseado em:** +250 testes reais da API Imobzi

---

## 🎯 Resumo

Esta versão adiciona filtros testados e comprovados para Deals, Calendário e Faturas, baseado em análise extensiva das requisições do App Imobzi e testes de combinações.

---

## ✅ Alterações Realizadas

### 📊 DEALS - Status do Deal

**Adicionados 4 novos status que funcionam:**

| Status | Valor | Deals Testados |
|--------|-------|----------------|
| Ganho | `win` | 19 |
| Estagnado | `stagnant` | 229 |
| Radar de Imóveis | `property_radar` | 100 |
| +3 Meses (Desatualizado) | `out_of_date` | 201 |

**Mantidos:**
- Todos (`all`) - 233 deals
- Perdido (`lost`) - 220 deals

**NÃO adicionados (erro 422):**
- `in_progress`
- `gained`

### 📊 DEALS - Tipo de Negócio

**Adicionado:**
| Tipo | Valor | Deals Testados |
|------|-------|----------------|
| Locação | `rent` | 138 |

**NÃO adicionados (erro 422):**
- `sale`
- `both`
- `lease`

### 📅 CALENDÁRIO - Tipo de Item

**Filtro item_type atualizado com descrição dos testes:**

| Tipo | Valor | Itens Testados |
|------|-------|----------------|
| Tarefa | `task` | 461 |
| WhatsApp | `whatsapp` | 326 |
| Visita | `visit` | 0 |
| Chamada | `call` | 0 |
| Todas | `''` (vazio) | 787 |

**NÃO adicionados (erro 422):**
- `all`
- `meeting`

### 💰 FATURAS - Status

**Confirmado:**
- Usar `canceled` (1 L) ✅
- NÃO usar `cancelled` (2 L's) = erro 422

---

## 📊 Descobertas da API

Durante os testes, descobrimos informações importantes sobre a base de dados:

| Recurso | Total na Base |
|---------|---------------|
| Contatos | 16.064 |
| Deals | 2.434 |
| Tags | 57 |
| Media Sources | 38 |
| Pipeline Groups | 5 |
| Pipelines/Etapas | 7 |
| Bancos | 198 |
| Tipos de Imóvel | 27 |
| Contas Financeiras | 5 |
| Motivos de Perda | 6 |

---

## 🔬 Testes Realizados

- **Testes do App:** ~50 requisições capturadas
- **Testes de Combinações:** ~150 testes
- **Testes Exploratórios:** ~100 testes
- **Total:** +250 testes

---

## 📁 Arquivos Modificados

- `nodes/Imobzi/Imobzi.node.ts` - Código principal do node
- `package.json` - Versão atualizada para 2.12.0
- `README.md` - Documentação atualizada

---

## 📁 Documentação Gerada

- `docs/PLANO_ALTERACOES_COMPLETO_v2.12.md` - Plano de alterações
- `docs/DESCOBERTAS_COMPLETAS_14_12_2025.md` - Descobertas dos testes
- `docs/ANALISE_APP_vs_NODES_14_12_2025.md` - Análise do App vs Node
- `docs/CHANGELOG_v2.12.md` - Este arquivo

---

## 🚀 Instalação

```bash
npm install n8n-nodes-imobzi-latest@2.12.0
```

---

## 📋 Próximos Passos

Com base nos testes, identificamos melhorias opcionais para versões futuras:

1. **Locações:** smart_list retorna mais dados (15) que status (12)
2. **Faturas:** Com datas retorna mais dados (25 vs 10)
3. **Contatos:** manager_id vs user_id (ambos parecem não filtrar)
4. **Ordenação:** Parâmetros order_by/sort_by funcionam em vários endpoints

---

**Versão:** 2.12.0  
**Node Version:** 15  
**Commit:** v2.12.0 - Filtros completos testados (+250 testes)

