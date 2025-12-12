# Guia de Instalação e Uso - n8n-nodes-imobzi-latest

## 📦 Pacote

**npm**: https://www.npmjs.com/package/n8n-nodes-imobzi-latest  
**GitHub**: https://github.com/redeuno/n8n-nodes-imobzi-latest  
**Versão**: 1.2.0

## 🚀 Como Instalar

### Opção 1: Instalação Global (Recomendado)

```bash
npm install -g n8n-nodes-imobzi-latest
```

### Opção 2: Instalação via n8n Community Nodes

1. Acesse o n8n
2. Vá para **Settings** > **Community Nodes**
3. Clique em **Install**
4. Digite `n8n-nodes-imobzi-latest`
5. Clique em **Install**

## 🔧 Configuração no n8n

### 1. Reinicie o n8n

Após instalar o pacote, reinicie o n8n para que os novos nodes sejam carregados.

### 2. Configure as Credenciais

1. No n8n, vá para **Settings** > **Credentials**
2. Clique em **Add Credential**
3. Procure por **"Imobzi API"**
4. Configure:
   - **API Key**: Sua chave da API da Imobzi

### 3. Como Obter a API Key da Imobzi

1. Acesse o menu lateral do Imobzi
2. Clique em **"Integrações & Automações"**
3. Selecione **"Chave de API"**
4. Clique em **"Adicionar uma nova chave de API"**
5. Nomeie a chave e selecione as permissões necessárias
6. Copie a chave e configure no n8n

**Documentação**: [Como funciona a chave de API](https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/)

## 📋 Nodes Disponíveis

### 1. Imobzi Node

**Localização**: Transform > Imobzi

**Recursos Disponíveis**:

| Recurso | Operações |
|---------|-----------|
| Contato | Listar, Obter, Buscar por Código, Verificar Existência, Criar, Atualizar, Excluir |
| Imóvel | Listar, Obter, Buscar por Código, Criar, Atualizar, Excluir |
| Locação | Listar, Obter, Buscar por Código, Criar, Atualizar |
| Fatura | Listar, Obter, Criar, Atualizar |
| Contrato | Listar, Obter, Criar, Atualizar, Excluir |
| Negócio (Deal) | Listar, Obter, Criar, Atualizar, Excluir |
| Funil (Pipeline) | Listar, Obter |
| Grupo de Funil | Listar, Obter |
| Transação Financeira | Listar, Obter, Criar, Atualizar |
| Calendário | Listar, Obter, Criar, Atualizar, Excluir |
| Usuário | Listar, Obter |
| Tipo de Imóvel | Listar |

### 2. Imobzi Trigger (Webhook)

**Localização**: Trigger > Imobzi Trigger

**Eventos Suportados**:

| Categoria | Eventos |
|-----------|---------|
| Contatos | `contact.created`, `contact.updated` |
| Imóveis | `property.created`, `property.updated` |
| Negócios | `deal.created`, `deal.updated`, `deal.won`, `deal.lost` |
| Locações | `lease.created`, `lease.updated` |
| Contratos | `contract.created`, `contract.updated` |
| Faturas | `invoice.created`, `invoice.paid` |
| Visitas | `visit.scheduled`, `visit.cancelled` |
| Tarefas | `task.created`, `task.updated` |

## 🆕 Novidades da Versão 1.2.0

### Auto-Paginação

Busque múltiplas páginas automaticamente:

| Opção | Páginas |
|-------|---------|
| 50 | 1 página |
| 100 | 2 páginas |
| 200 | 4 páginas |
| 500 | 10 páginas |
| Todos | Máximo 1000 |

### Busca por Código

Busque registros pelo código interno:

```json
{
  "resource": "property",
  "operation": "getByCode",
  "code": "326"
}
```

Suportado para: **Pessoa, Lead, Organização, Imóvel, Locação**

### Verificar Existência de Contato

Verifique se um contato já existe antes de criar:

```json
{
  "resource": "contact",
  "operation": "checkExists",
  "checkExistsBy": "cpf",
  "checkExistsValue": "123.456.789-00"
}
```

Busca por: **CPF, Email, Telefone, CNPJ**

### Campos de Data Nativos

Todos os campos de data agora usam o seletor de data nativo do n8n.

### Dropdowns Pré-Definidos

Todos os filtros agora têm opções pré-definidas em dropdowns para facilitar o uso.

## 🔄 Exemplos de Uso

### Exemplo 1: Listar Contatos com Auto-Paginação

```json
{
  "resource": "contact",
  "operation": "getAll",
  "recordLimit": 200,
  "contactOptions": {
    "contact_type": "person",
    "media_source": "Site"
  }
}
```

### Exemplo 2: Verificar se Contato Existe

```json
{
  "resource": "contact",
  "operation": "checkExists",
  "checkExistsBy": "email",
  "checkExistsValue": "joao@email.com"
}
```

### Exemplo 3: Obter Pessoa por ID

```json
{
  "resource": "contact",
  "operation": "get",
  "contactTypeGet": "person",
  "id": "5352720932798464"
}
```

### Exemplo 4: Buscar Imóvel por Código

```json
{
  "resource": "property",
  "operation": "getByCode",
  "code": "326"
}
```

### Exemplo 5: Listar Imóveis Disponíveis para Venda

```json
{
  "resource": "property",
  "operation": "getAll",
  "recordLimit": 500,
  "propertyOptions": {
    "smart_list": "sale",
    "finality": "residential"
  }
}
```

### Exemplo 6: Criar Lead

```json
{
  "resource": "contact",
  "operation": "create",
  "contactTypeCreate": "lead",
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

### Exemplo 7: Listar Calendário

```json
{
  "resource": "calendar",
  "operation": "getAll",
  "year": 2025,
  "month": 1,
  "calendarOptions": {
    "item_type": "visit"
  }
}
```

## 🌐 Instalação em VPS

```bash
# 1. Acesse sua VPS via SSH
ssh usuario@seu-servidor.com

# 2. Instale o pacote
npm install -g n8n-nodes-imobzi-latest

# 3. Reinicie o n8n

# Se usar PM2:
pm2 restart n8n

# Se usar systemd:
sudo systemctl restart n8n

# Se usar Docker:
docker restart seu-container-n8n
```

## 🆘 Troubleshooting

### Verificar instalação

```bash
npm list -g n8n-nodes-imobzi-latest
```

### Verificar versão

```bash
npm show n8n-nodes-imobzi-latest version
```

### Atualizar para última versão

```bash
npm update -g n8n-nodes-imobzi-latest
```

### Reinstalar

   ```bash
npm uninstall -g n8n-nodes-imobzi-latest
npm install -g n8n-nodes-imobzi-latest
   ```

### Verificar logs

   ```bash
# PM2
   pm2 logs n8n
   
# systemd
   sudo journalctl -u n8n -f
   ```

## 🔗 Links Úteis

- **npm**: https://www.npmjs.com/package/n8n-nodes-imobzi-latest
- **GitHub**: https://github.com/redeuno/n8n-nodes-imobzi-latest
- **API Imobzi**: https://developer.imobzi.com/
- **Chave de API**: https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/
- **Webhooks**: https://www.imobzi.com/docs/primeiros-passos/integracoes-e-automacoes/como-criar-e-usar-webhooks-na-imobzi/

## 📝 Para Desenvolvedores

```bash
# Clone o repositório
git clone https://github.com/redeuno/n8n-nodes-imobzi-latest.git
cd n8n-nodes-imobzi-latest

# Instale dependências
npm install

# Desenvolva
npm run dev

# Build
npm run build

# Lint
npm run lint

# Publique atualizações
npm version patch  # ou minor/major
npm publish
```

---

**Criado por**: Bruno Mantovani  
**Email**: bruno@redeuno.com.br  
**GitHub**: [redeuno/n8n-nodes-imobzi-latest](https://github.com/redeuno/n8n-nodes-imobzi-latest)  
**Versão**: 1.2.0  
**Última atualização**: Dezembro 2024
