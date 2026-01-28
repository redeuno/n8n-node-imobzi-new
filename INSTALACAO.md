# Guia de Instalação e Uso - n8n-node-imobzi-new

## 📦 Pacote

**npm**: https://www.npmjs.com/package/n8n-node-imobzi-new  
**GitHub**: https://github.com/redeuno/n8n-node-imobzi-new  
**Versão**: 1.0.0

## 🚀 Como Instalar

### Opção 1: Instalação Global (Recomendado)

```bash
npm install -g n8n-node-imobzi-new
```

### Opção 2: Instalação via n8n Community Nodes

1. Acesse o n8n
2. Vá para **Settings** > **Community Nodes**
3. Clique em **Install**
4. Digite `n8n-node-imobzi-new`
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

**21 Recursos Disponíveis**:

| Recurso | Operações |
|---------|-----------|
| Contato | Criar, Obter, Listar, Atualizar, Excluir |
| Pessoa | Criar, Obter, Listar, Atualizar, Excluir |
| Organização | Criar, Obter, Listar, Atualizar, Excluir |
| Lead | Criar, Obter, Listar, Atualizar, Excluir |
| Imóvel | Criar, Obter, Listar, Atualizar, Excluir |
| Contrato | Criar, Obter, Listar, Atualizar, Excluir |
| Locação | Criar, Obter, Listar, Atualizar, Excluir |
| Documento | Criar, Obter, Listar, Atualizar, Excluir |
| Usuário | Criar, Obter, Listar, Atualizar, Excluir |
| Negócio (Deal) | Criar, Obter, Listar, Atualizar, Excluir |
| Funil (Pipeline) | Criar, Obter, Listar, Atualizar, Excluir |
| Grupo de Funil | Criar, Obter, Listar, Atualizar, Excluir |
| Conta Financeira | Criar, Obter, Listar, Atualizar, Excluir |
| Transação Financeira | Criar, Obter, Listar, Atualizar, Excluir |
| Categoria Financeira | Criar, Obter, Listar, Atualizar, Excluir |
| Fatura | Criar, Obter, Listar, Atualizar, Excluir |
| Calendário | Criar, Obter, Listar, Atualizar, Excluir |
| Webhook | Criar, Obter, Listar, Atualizar, Excluir |
| Integração | Criar, Obter, Listar, Atualizar, Excluir |
| Bairro | Listar, Obter |
| Tipo de Imóvel | Listar, Obter |

### 2. Imobzi Trigger (Webhook)

**Localização**: Trigger > Imobzi Trigger

**25 Eventos Suportados**:

| Categoria | Eventos |
|-----------|---------|
| Leads | `lead_created`, `lead_updated` |
| Contatos | `contact_created`, `contact_updated` |
| Imóveis | `property_created`, `property_updated` |
| Negócios | `deal_created`, `deal_updated`, `deal_moved`, `deal_won`, `deal_lost` |
| Locações | `lease_created`, `lease_updated` |
| Contratos | `contract_created`, `contract_updated` |
| Faturas | `invoice_created`, `invoice_paid`, `invoice_overdue` |
| Documentos | `document_created`, `document_signed` |
| Visitas | `visit_scheduled`, `visit_completed`, `visit_cancelled` |
| Tarefas | `task_created`, `task_completed` |
| Usuários | `user_created` |

**Funcionalidades**:
- Registro automático do webhook na API Imobzi
- Filtragem por eventos específicos
- Metadados completos (headers, timestamp)

## 🔄 Exemplos de Uso

### Exemplo 1: Listar Contatos

```json
{
  "resource": "contact",
  "operation": "getAll",
  "options": {
    "limit": 50
  },
  "contactOptions": {
    "contact_type": "person"
  }
}
```

### Exemplo 2: Criar Lead

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

### Exemplo 3: Listar Transações Pagas

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
    "order_by": "desc"
  }
}
```

### Exemplo 4: Webhook para Novos Leads

1. Adicione **Imobzi Trigger** ao workflow
2. Selecione evento `lead_created`
3. Ative **Registrar Webhook Automaticamente**
4. Conecte aos próximos nodes

## 🌐 Instalação em VPS

```bash
# 1. Acesse sua VPS via SSH
ssh usuario@seu-servidor.com

# 2. Instale o pacote
npm install -g n8n-node-imobzi-new

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
npm list -g n8n-node-imobzi-new
```

### Verificar logs

```bash
# PM2
pm2 logs n8n

# systemd
sudo journalctl -u n8n -f
```

### Reinstalar

```bash
npm uninstall -g n8n-node-imobzi-new
npm install -g n8n-node-imobzi-new
```

## 🔗 Links Úteis

- **npm**: https://www.npmjs.com/package/n8n-node-imobzi-new
- **GitHub**: https://github.com/redeuno/n8n-node-imobzi-new
- **API Imobzi**: https://developer.imobzi.com/
- **Chave de API**: https://help.imobzi.com/pt-br/article/como-funciona-a-chave-de-api-1nieky8/
- **Webhooks**: https://www.imobzi.com/docs/primeiros-passos/integracoes-e-automacoes/como-criar-e-usar-webhooks-na-imobzi/

## 📝 Para Desenvolvedores

```bash
# Clone o repositório
git clone https://github.com/redeuno/n8n-node-imobzi-new.git
cd n8n-node-imobzi-new

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
**GitHub**: [redeuno/n8n-node-imobzi-new](https://github.com/redeuno/n8n-node-imobzi-new)  
**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024
