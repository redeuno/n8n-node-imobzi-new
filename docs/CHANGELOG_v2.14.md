# 📋 CHANGELOG v2.14.0

**Data:** 14/12/2025  
**Tipo:** Release Final - Fase 1 + Fase 2 Testadas

---

## 🎯 Resumo

Esta versão finaliza as **Fases 1 e 2** com todos os endpoints **testados e funcionando**. Foram removidos recursos que não funcionam na API.

---

## ✅ TESTES REALIZADOS

### Resultado Final
- **Passou:** 28 endpoints
- **Taxa de Sucesso:** 100%

---

## 📦 RECURSOS FUNCIONANDO

### FASE 1 - CRUD Completo (17 endpoints)

| Recurso | Get All | Get ID | Get Code | Create | Update | Delete |
|---------|---------|--------|----------|--------|--------|--------|
| **Contato** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Imóvel** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Deal** | ✅ | ✅ (CORRIGIDO!) | - | ✅ | ✅ | - |
| **Locação** | ✅ | ✅ | - | ✅ | ✅ | ✅ |
| **Fatura** | ✅ | ✅ | - | ✅ | ✅ | - |
| **Transação** | ✅ | ✅ | - | ✅ | ✅ | ✅ |
| **Calendário** | ✅ | - | - | ✅ | ✅ | ✅ |

### FASE 2 - Novos Recursos (2 endpoints)

| Recurso | Get All | Create | Delete |
|---------|---------|--------|--------|
| **Histórico (Timeline)** | ✅ | ✅ | - |
| **Reserva de Imóvel** | ✅ | ✅ | ✅ |

### Recursos Auxiliares (9 endpoints)

| Recurso | Status | Items |
|---------|--------|-------|
| Users | ✅ | 15 |
| Pipeline Groups | ✅ | 5 |
| Pipelines | ✅ | 7 |
| Financial Accounts | ✅ | 5 |
| Media Sources | ✅ | 38 |
| Contact Tags | ✅ | 57 |
| Property Types | ✅ | 27 |
| Lost Reasons | ✅ | 6 |
| Banks | ✅ | 198 |

---

## ❌ RECURSOS REMOVIDOS

| Recurso | Motivo |
|---------|--------|
| **Proposta** | API retorna erro 401 (Not Authorized) |
| **Match de Imóveis** | API retorna erro 401 (Not Authorized) |

Esses recursos são endpoints internos do app Imobzi que não estão disponíveis via API pública.

---

## 🎉 BUG CORRIGIDO PELA IMOBZI

**Deal Get by ID** - Antes retornava erro 500, agora funciona!

---

## 📁 Arquivos Modificados

- `nodes/Imobzi/Imobzi.node.ts` - Removidos recursos Proposta e Match
- `package.json` - Versão 2.14.0
- `README.md` - Documentação atualizada

---

## 🚀 Instalação

```bash
npm install n8n-nodes-imobzi-latest@2.14.0
```

---

## 📊 Total de Recursos

| Categoria | Quantidade |
|-----------|------------|
| Recursos Principais | 7 |
| Recursos Fase 2 | 2 |
| Recursos Auxiliares | 9 |
| **Total** | **18** |

---

**Versão:** 2.14.0  
**Node Version:** 17  
**Commit:** v2.14.0 - Fase 1 + Fase 2 Testadas (28 endpoints)

