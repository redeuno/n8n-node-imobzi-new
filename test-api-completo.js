/**
 * Script de teste COMPLETO da API Imobzi
 * Testa todos os endpoints conhecidos e salva resultados
 */

const https = require('https');
const fs = require('fs');

const API_KEY = process.env.IMOBZI_API_KEY || 'SUA_API_KEY_AQUI';
const BASE_URL = 'api.imobzi.app';

const results = [];
let testCount = 0;

async function makeRequest(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const queryString = Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== '' && v !== null)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
    
    const path = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    const options = {
      hostname: BASE_URL,
      path: path,
      method: 'GET',
      headers: {
        'X-Imobzi-Secret': API_KEY,
        'Content-Type': 'application/json',
      },
    };

    testCount++;
    console.log(`\n[${testCount}] 🔍 GET ${path}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json, path });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, path });
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
}

function analyzeResponse(data) {
  if (Array.isArray(data)) {
    return {
      type: 'array',
      length: data.length,
      keys: data.length > 0 ? Object.keys(data[0]) : [],
      sample: data.length > 0 ? data[0] : null
    };
  } else if (typeof data === 'object' && data !== null) {
    const analysis = { type: 'object', keys: Object.keys(data) };
    
    // Encontrar dataKey (array dentro do objeto)
    for (const key of Object.keys(data)) {
      if (Array.isArray(data[key])) {
        analysis.dataKey = key;
        analysis.dataLength = data[key].length;
        if (data[key].length > 0) {
          analysis.dataKeys = Object.keys(data[key][0]);
        }
        break;
      }
    }
    
    // Verificar paginação
    if (data.cursor) analysis.pagination = 'cursor';
    if (data.next_page !== undefined) analysis.pagination = 'next_page';
    if (data.cursor_fw) analysis.pagination = 'cursor_fw/rw';
    
    return analysis;
  }
  return { type: typeof data };
}

function saveResult(name, category, result) {
  const analysis = result.status === 200 ? analyzeResponse(result.data) : null;
  
  results.push({
    name,
    category,
    endpoint: result.path,
    status: result.status,
    analysis,
    response: result.data
  });
  
  if (result.status === 200) {
    console.log(`   ✅ ${result.status} | ${analysis?.type} | dataKey: ${analysis?.dataKey || 'N/A'} | pagination: ${analysis?.pagination || 'N/A'}`);
  } else {
    const errorMsg = typeof result.data === 'object' ? (result.data.message || result.data.detail?.[0]?.msg || JSON.stringify(result.data).substring(0, 100)) : String(result.data).substring(0, 100);
    console.log(`   ❌ ${result.status} | ${errorMsg}`);
  }
}

async function runTests() {
  console.log('🚀 TESTE COMPLETO DA API IMOBZI');
  console.log('='.repeat(70));

  // IDs para usar nos testes
  let userId = null;
  let propertyId = null;
  let propertyCode = null;
  let contactId = null;
  let contactCode = null;
  let leaseId = null;
  let leaseCode = null;
  let invoiceId = null;
  let pipelineId = null;
  let pipelineGroupId = null;

  // ====================
  // CATEGORIA: USUÁRIOS
  // ====================
  console.log('\n\n📂 USUÁRIOS');
  console.log('-'.repeat(70));

  const users = await makeRequest('/v1/users');
  saveResult('Listar Usuários', 'users', users);
  if (users.status === 200 && Array.isArray(users.data) && users.data.length > 0) {
    userId = users.data.find(u => u.active)?.db_id || users.data[0].db_id;
    console.log(`   📌 user_id para testes: ${userId}`);
  }
  await sleep(200);

  // ====================
  // CATEGORIA: CONTATOS
  // ====================
  console.log('\n\n📂 CONTATOS');
  console.log('-'.repeat(70));

  const contacts = await makeRequest('/v1/contacts', { limit: 3 });
  saveResult('Listar Contatos', 'contacts', contacts);
  if (contacts.status === 200 && contacts.data.contacts?.length > 0) {
    contactId = contacts.data.contacts[0].contact_id;
    contactCode = contacts.data.contacts[0].code;
    console.log(`   📌 contact_id: ${contactId}, code: ${contactCode}`);
  }
  await sleep(200);

  await testAndSave('Contatos - search', 'contacts', '/v1/contacts/search', { limit: 3 });
  await testAndSave('Contatos - com filtro contact_type=person', 'contacts', '/v1/contacts', { contact_type: 'person', limit: 3 });
  await testAndSave('Contatos - com filtro contact_type=organization', 'contacts', '/v1/contacts', { contact_type: 'organization', limit: 3 });
  await testAndSave('Contatos - com filtro contact_type=lead', 'contacts', '/v1/contacts', { contact_type: 'lead', limit: 3 });
  await testAndSave('Contatos - com user_id', 'contacts', '/v1/contacts', { user_id: userId, limit: 3 });
  await testAndSave('Contatos - com manager_id', 'contacts', '/v1/contacts', { manager_id: userId, limit: 3 });
  await testAndSave('Contatos - com smart_list', 'contacts', '/v1/contacts', { smart_list: 'owners', limit: 3 });
  await testAndSave('Contatos - com tags', 'contacts', '/v1/contacts', { tags: 'contact', limit: 3 });
  await testAndSave('Contato - Verificar existência por email', 'contacts', '/v1/contact/exists', { email: 'teste@teste.com' });
  await testAndSave('Contato - Verificar existência por cpf', 'contacts', '/v1/contact/exists', { cpf: '12345678900' });
  await testAndSave('Contato - Verificar existência por phone_number', 'contacts', '/v1/contact/exists', { phone_number: '67999999999' });
  await testAndSave('Contato - Verificar existência por cnpj', 'contacts', '/v1/contact/exists', { cnpj: '12345678000100' });
  
  if (contactId) {
    await testAndSave('Pessoa por ID', 'contacts', `/v1/person/${contactId}`, {});
  }
  if (contactCode) {
    await testAndSave('Pessoa por Código', 'contacts', `/v1/person/code/${contactCode}`, {});
  }

  // Tags de contato
  await testAndSave('Tags de Contato - Listar', 'contacts', '/v1/contacts/tags', {});

  // Media Sources
  await testAndSave('Media Sources - Listar', 'contacts', '/v1/media-sources', {});
  await testAndSave('Media Sources - Report', 'contacts', '/v1/media-sources-report', {});

  // ====================
  // CATEGORIA: IMÓVEIS
  // ====================
  console.log('\n\n📂 IMÓVEIS');
  console.log('-'.repeat(70));

  const properties = await makeRequest('/v1/properties', { limit: 3 });
  saveResult('Listar Imóveis', 'properties', properties);
  if (properties.status === 200 && properties.data.properties?.length > 0) {
    propertyId = properties.data.properties[0].db_id;
    propertyCode = properties.data.properties[0].code;
    console.log(`   📌 property_id: ${propertyId}, code: ${propertyCode}`);
  }
  await sleep(200);

  await testAndSave('Imóveis - smart_list=available', 'properties', '/v1/properties', { smart_list: 'available', limit: 3 });
  await testAndSave('Imóveis - smart_list=rent', 'properties', '/v1/properties', { smart_list: 'rent', limit: 3 });
  await testAndSave('Imóveis - smart_list=sale', 'properties', '/v1/properties', { smart_list: 'sale', limit: 3 });
  await testAndSave('Imóveis - smart_list=site_publish', 'properties', '/v1/properties', { smart_list: 'site_publish', limit: 3 });
  await testAndSave('Imóveis - finality=residential', 'properties', '/v1/properties', { finality: 'residential', limit: 3 });
  await testAndSave('Imóveis - finality=commercial', 'properties', '/v1/properties', { finality: 'commercial', limit: 3 });
  await testAndSave('Imóveis - status=available', 'properties', '/v1/properties', { status: 'available', limit: 3 });
  await testAndSave('Imóveis - com user_id', 'properties', '/v1/properties', { user_id: userId, limit: 3 });
  
  await testAndSave('Imóvel - Search', 'properties', '/v1/property/search', { limit: 3 });
  await testAndSave('Imóvel - Verificar existência', 'properties', '/v1/property/exists', { code: propertyCode });
  await testAndSave('Imóvel - Bairros', 'properties', '/v1/property/neighborhoods', {});
  await testAndSave('Imóvel - Range Values', 'properties', '/v1/property/range-values', {});
  await testAndSave('Imóvel - Range Areas', 'properties', '/v1/property/range-areas', {});
  
  if (propertyId) {
    await testAndSave('Imóvel por ID', 'properties', `/v1/property/${propertyId}`, {});
    await testAndSave('Imóvel - Estatísticas', 'properties', `/v1/property/${propertyId}/statistics`, {});
    await testAndSave('Imóvel - Views', 'properties', `/v1/property/${propertyId}/views`, {});
    await testAndSave('Imóvel - Calendar Items', 'properties', `/v1/property/${propertyId}/calendar-items`, {});
    await testAndSave('Imóvel - Deals Match', 'properties', `/v1/property/${propertyId}/deals-match`, {});
  }
  if (propertyCode) {
    await testAndSave('Imóvel por Código', 'properties', `/v1/property/code/${propertyCode}`, {});
  }

  // Tipos de Imóvel
  await testAndSave('Tipos de Imóvel', 'properties', '/v1/property-types', {});

  // Features
  await testAndSave('Property Features - Listar', 'properties', '/v1/property-features', {});

  // Property Adverts
  await testAndSave('Property Adverts - Listar', 'properties', '/v1/property-adverts', { limit: 5 });

  // Buildings
  await testAndSave('Property Buildings - Search', 'properties', '/v1/property-buildings/search', { search_text: 'edificio' });

  // ====================
  // CATEGORIA: LOCAÇÕES
  // ====================
  console.log('\n\n📂 LOCAÇÕES');
  console.log('-'.repeat(70));

  const leases = await makeRequest('/v1/leases', { limit: 3 });
  saveResult('Listar Locações', 'leases', leases);
  if (leases.status === 200 && leases.data.leases?.length > 0) {
    leaseId = leases.data.leases[0].db_id;
    leaseCode = leases.data.leases[0].code;
    console.log(`   📌 lease_id: ${leaseId}, code: ${leaseCode}`);
  }
  await sleep(200);

  await testAndSave('Locações - smart_list=active', 'leases', '/v1/leases', { smart_list: 'active', limit: 3 });
  await testAndSave('Locações - smart_list=inactive', 'leases', '/v1/leases', { smart_list: 'inactive', limit: 3 });
  
  if (leaseId) {
    await testAndSave('Locação por ID', 'leases', `/v1/lease/${leaseId}`, {});
  }
  if (leaseCode) {
    await testAndSave('Locação por Código', 'leases', `/v1/lease/code/${leaseCode}`, {});
  }

  // ====================
  // CATEGORIA: FATURAS
  // ====================
  console.log('\n\n📂 FATURAS');
  console.log('-'.repeat(70));

  const invoices = await makeRequest('/v1/invoices', { limit: 3 });
  saveResult('Listar Faturas', 'invoices', invoices);
  if (invoices.status === 200 && invoices.data.invoices?.length > 0) {
    invoiceId = invoices.data.invoices[0].invoice_id;
    console.log(`   📌 invoice_id: ${invoiceId}`);
  }
  await sleep(200);

  await testAndSave('Faturas - status=paid', 'invoices', '/v1/invoices', { status: 'paid', limit: 3 });
  await testAndSave('Faturas - status=pending', 'invoices', '/v1/invoices', { status: 'pending', limit: 3 });
  await testAndSave('Faturas - status=overdue', 'invoices', '/v1/invoices', { status: 'overdue', limit: 3 });
  
  if (invoiceId) {
    await testAndSave('Fatura por ID', 'invoices', `/v1/invoice/${invoiceId}`, {});
  }

  // ====================
  // CATEGORIA: DEALS / FUNIL
  // ====================
  console.log('\n\n📂 DEALS / FUNIL');
  console.log('-'.repeat(70));

  // Pipeline Groups
  const pipelineGroups = await makeRequest('/v1/pipeline-groups');
  saveResult('Pipeline Groups', 'deals', pipelineGroups);
  if (pipelineGroups.status === 200 && Array.isArray(pipelineGroups.data) && pipelineGroups.data.length > 0) {
    pipelineGroupId = pipelineGroups.data.find(g => g.default)?.db_id || pipelineGroups.data[0].db_id;
    console.log(`   📌 pipeline_group_id: ${pipelineGroupId}`);
  }
  await sleep(200);

  // Pipelines
  const pipelines = await makeRequest('/v1/pipelines');
  saveResult('Pipelines (Estágios)', 'deals', pipelines);
  if (pipelines.status === 200 && Array.isArray(pipelines.data) && pipelines.data.length > 0) {
    pipelineId = pipelines.data[0].db_id;
    console.log(`   📌 pipeline_id: ${pipelineId}`);
  }
  await sleep(200);

  // Deals
  await testAndSave('Deals - Sem parâmetros', 'deals', '/v1/deals', {});
  await testAndSave('Deals - Com user_id', 'deals', '/v1/deals', { user_id: userId });
  await testAndSave('Deals - Com pipeline_group_id', 'deals', '/v1/deals', { pipeline_group_id: pipelineGroupId });
  await testAndSave('Deals - deal_status=all', 'deals', '/v1/deals', { deal_status: 'all' });
  await testAndSave('Deals - deal_status=in progress', 'deals', '/v1/deals', { deal_status: 'in progress' });
  await testAndSave('Deals - deal_status=win', 'deals', '/v1/deals', { deal_status: 'win' });
  await testAndSave('Deals - deal_status=lost', 'deals', '/v1/deals', { deal_status: 'lost' });
  await testAndSave('Deals - deal_status=stagnant', 'deals', '/v1/deals', { deal_status: 'stagnant' });
  await testAndSave('Deals - user_id + deal_status', 'deals', '/v1/deals', { user_id: userId, deal_status: 'all' });

  // Deals Search
  await testAndSave('Deals Search - Sem parâmetros', 'deals', '/v1/deals/search', { limit: 5 });
  await testAndSave('Deals Search - Com user_id', 'deals', '/v1/deals/search', { user_id: userId, limit: 5 });
  await testAndSave('Deals Search - Com pipeline_id', 'deals', '/v1/deals/search', { pipeline_id: pipelineId, limit: 5 });
  await testAndSave('Deals Search - deal_status=in progress', 'deals', '/v1/deals/search', { deal_status: 'in progress', limit: 5 });
  await testAndSave('Deals Search - show_activities=true', 'deals', '/v1/deals/search', { show_activities: true, limit: 3 });

  // Deal Fields
  await testAndSave('Deal Fields', 'deals', '/v1/deal-fields', {});

  // Lost Reasons
  await testAndSave('Motivos de Perda', 'deals', '/v1/deal/lost-reason', {});

  // ====================
  // CATEGORIA: TRANSAÇÕES
  // ====================
  console.log('\n\n📂 TRANSAÇÕES FINANCEIRAS');
  console.log('-'.repeat(70));

  await testAndSave('Transações - /v1/financial/transactions', 'transactions', '/v1/financial/transactions', { limit: 5 });
  await testAndSave('Transações - tentativa /v1/transactions', 'transactions', '/v1/transactions', { limit: 5 });
  await testAndSave('Transações - tentativa /v1/financial-transactions', 'transactions', '/v1/financial-transactions', { limit: 5 });

  // ====================
  // CATEGORIA: CALENDÁRIO
  // ====================
  console.log('\n\n📂 CALENDÁRIO');
  console.log('-'.repeat(70));

  await testAndSave('Calendário - 2025/12', 'calendar', '/v1/calendar', { year: 2025, month: 12 });
  await testAndSave('Calendário - Com user_id', 'calendar', '/v1/calendar', { year: 2025, month: 12, user_id: userId });
  await testAndSave('Calendário - item_type=visit', 'calendar', '/v1/calendar', { year: 2025, month: 12, item_type: 'visit' });
  await testAndSave('Calendário - item_type=task', 'calendar', '/v1/calendar', { year: 2025, month: 12, item_type: 'task' });
  await testAndSave('Calendário - item_type=whatsapp', 'calendar', '/v1/calendar', { year: 2025, month: 12, item_type: 'whatsapp' });
  await testAndSave('Calendário - item_type=call', 'calendar', '/v1/calendar', { year: 2025, month: 12, item_type: 'call' });
  await testAndSave('Calendário - item_type=event (teste)', 'calendar', '/v1/calendar', { year: 2025, month: 12, item_type: 'event' });

  // ====================
  // CATEGORIA: TIMELINE
  // ====================
  console.log('\n\n📂 TIMELINE');
  console.log('-'.repeat(70));

  await testAndSave('Timeline - Sem parâmetros', 'timeline', '/v1/timeline', { limit: 5 });
  await testAndSave('Timeline - Com contact_id', 'timeline', '/v1/timeline', { contact_id: contactId, limit: 5 });
  await testAndSave('Timeline - Com property_id', 'timeline', '/v1/timeline', { property_id: propertyId, limit: 5 });
  await testAndSave('Timeline - Com deal_id', 'timeline', '/v1/timeline', { deal_id: '123', limit: 5 });

  // ====================
  // CATEGORIA: DOCUMENTOS
  // ====================
  console.log('\n\n📂 DOCUMENTOS');
  console.log('-'.repeat(70));

  await testAndSave('Documentos - Listar', 'documents', '/v1/documents', { limit: 5 });
  await testAndSave('Documentos - Por contact_id', 'documents', '/v1/documents', { contact_id: contactId, limit: 5 });
  await testAndSave('Documentos - Por property_id', 'documents', '/v1/documents', { property_id: propertyId, limit: 5 });

  // ====================
  // CATEGORIA: OUTROS
  // ====================
  console.log('\n\n📂 OUTROS ENDPOINTS');
  console.log('-'.repeat(70));

  await testAndSave('Contas Bancárias', 'others', '/v1/accounts', {});
  await testAndSave('Bancos', 'others', '/v1/banks', {});
  await testAndSave('Teams', 'others', '/v1/teams', {});
  await testAndSave('Calendar Types', 'others', '/v1/calendar-types', {});
  await testAndSave('Readjustments', 'others', '/v1/readjustments', {});
  await testAndSave('Categories', 'others', '/v1/categories', {});
  await testAndSave('Subcategories', 'others', '/v1/subcategories', {});
  await testAndSave('Guarantee Types', 'others', '/v1/guarantee-types', {});
  await testAndSave('Site Settings', 'others', '/v1/site-settings', {});
  await testAndSave('Site Statistics', 'others', '/v1/site/statistics', {});
  await testAndSave('Notifications', 'others', '/v1/notifications', {});
  await testAndSave('Custom Fields', 'others', '/v1/custom-fields', {});
  await testAndSave('Webhooks', 'others', '/v1/webhooks', {});

  // ====================
  // SALVAR RESULTADOS
  // ====================
  console.log('\n\n' + '='.repeat(70));
  console.log('💾 SALVANDO RESULTADOS');
  console.log('='.repeat(70));

  // Salvar JSON completo
  fs.writeFileSync(
    'docs/API_MAPEAMENTO_COMPLETO.json',
    JSON.stringify(results, null, 2),
    'utf8'
  );
  console.log('✅ JSON salvo em docs/API_MAPEAMENTO_COMPLETO.json');

  // Criar resumo markdown
  generateMarkdownSummary();

  console.log('\n\n🎉 TESTES CONCLUÍDOS!');
  console.log(`   Total de testes: ${testCount}`);
  console.log(`   Sucesso: ${results.filter(r => r.status === 200).length}`);
  console.log(`   Erro: ${results.filter(r => r.status !== 200).length}`);
}

async function testAndSave(name, category, endpoint, params) {
  const result = await makeRequest(endpoint, params);
  saveResult(name, category, result);
  await sleep(200);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateMarkdownSummary() {
  let md = `# 📋 MAPEAMENTO COMPLETO DA API IMOBZI\n\n`;
  md += `**Data:** ${new Date().toISOString()}\n`;
  md += `**Total de Testes:** ${testCount}\n`;
  md += `**Sucesso:** ${results.filter(r => r.status === 200).length}\n`;
  md += `**Erro:** ${results.filter(r => r.status !== 200).length}\n\n`;
  md += `---\n\n`;

  // Agrupar por categoria
  const categories = [...new Set(results.map(r => r.category))];
  
  for (const cat of categories) {
    const catResults = results.filter(r => r.category === cat);
    
    md += `## 📂 ${cat.toUpperCase()}\n\n`;
    md += `| Endpoint | Status | Tipo | DataKey | Paginação |\n`;
    md += `|----------|--------|------|---------|----------|\n`;
    
    for (const r of catResults) {
      const status = r.status === 200 ? '✅' : '❌';
      const tipo = r.analysis?.type || '-';
      const dataKey = r.analysis?.dataKey || '-';
      const pagination = r.analysis?.pagination || '-';
      md += `| \`${r.endpoint.substring(0, 50)}\` | ${status} ${r.status} | ${tipo} | ${dataKey} | ${pagination} |\n`;
    }
    
    md += `\n`;

    // Detalhes dos endpoints que funcionaram
    md += `### Detalhes\n\n`;
    for (const r of catResults.filter(r => r.status === 200)) {
      md += `#### ${r.name}\n`;
      md += `- **Endpoint:** \`${r.endpoint}\`\n`;
      md += `- **Tipo:** ${r.analysis?.type}\n`;
      if (r.analysis?.dataKey) md += `- **DataKey:** \`${r.analysis.dataKey}\`\n`;
      if (r.analysis?.dataLength !== undefined) md += `- **Registros:** ${r.analysis.dataLength}\n`;
      if (r.analysis?.pagination) md += `- **Paginação:** ${r.analysis.pagination}\n`;
      if (r.analysis?.keys) md += `- **Chaves:** ${r.analysis.keys.slice(0, 10).join(', ')}${r.analysis.keys.length > 10 ? '...' : ''}\n`;
      if (r.analysis?.dataKeys) md += `- **Chaves dos dados:** ${r.analysis.dataKeys.slice(0, 10).join(', ')}${r.analysis.dataKeys.length > 10 ? '...' : ''}\n`;
      md += `\n**Exemplo de Resposta:**\n\`\`\`json\n${JSON.stringify(r.response, null, 2).substring(0, 1500)}${JSON.stringify(r.response).length > 1500 ? '\n... (truncado)' : ''}\n\`\`\`\n\n`;
    }

    // Erros
    const errors = catResults.filter(r => r.status !== 200);
    if (errors.length > 0) {
      md += `### Endpoints com Erro\n\n`;
      for (const r of errors) {
        md += `- \`${r.endpoint}\` → ${r.status}: ${typeof r.response === 'object' ? (r.response.message || JSON.stringify(r.response).substring(0, 100)) : String(r.response).substring(0, 100)}\n`;
      }
      md += `\n`;
    }

    md += `---\n\n`;
  }

  // Tabela resumo final
  md += `## 📊 RESUMO GERAL\n\n`;
  md += `### Endpoints que Funcionam (para o Node)\n\n`;
  md += `| Recurso | Listar | Por ID | Por Código | DataKey | Paginação |\n`;
  md += `|---------|--------|--------|------------|---------|----------|\n`;

  const successByCategory = {
    contacts: results.filter(r => r.category === 'contacts' && r.status === 200),
    properties: results.filter(r => r.category === 'properties' && r.status === 200),
    leases: results.filter(r => r.category === 'leases' && r.status === 200),
    invoices: results.filter(r => r.category === 'invoices' && r.status === 200),
    deals: results.filter(r => r.category === 'deals' && r.status === 200),
    transactions: results.filter(r => r.category === 'transactions' && r.status === 200),
    calendar: results.filter(r => r.category === 'calendar' && r.status === 200),
  };

  for (const [cat, items] of Object.entries(successByCategory)) {
    const listar = items.find(i => i.name.toLowerCase().includes('listar'));
    const porId = items.find(i => i.name.toLowerCase().includes('por id'));
    const porCodigo = items.find(i => i.name.toLowerCase().includes('por código') || i.name.toLowerCase().includes('por codigo'));
    
    md += `| ${cat} | ${listar ? '✅' : '❌'} | ${porId ? '✅' : '❌'} | ${porCodigo ? '✅' : '❌'} | ${listar?.analysis?.dataKey || '-'} | ${listar?.analysis?.pagination || '-'} |\n`;
  }

  fs.writeFileSync('docs/API_MAPEAMENTO_COMPLETO.md', md, 'utf8');
  console.log('✅ Markdown salvo em docs/API_MAPEAMENTO_COMPLETO.md');
}

if (API_KEY === 'SUA_API_KEY_AQUI') {
  console.log('❌ Configure sua API Key!');
  process.exit(1);
}

runTests();

