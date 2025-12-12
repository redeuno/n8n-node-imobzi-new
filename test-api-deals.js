/**
 * Script de teste - Deals e Funil com combinações de parâmetros
 */

const https = require('https');
const fs = require('fs');

const API_KEY = process.env.IMOBZI_API_KEY || 'SUA_API_KEY_AQUI';
const BASE_URL = 'api.imobzi.app';

// Armazenar resultados para salvar em arquivo
const results = [];

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

    console.log(`\n🔍 Testando: GET ${path}`);

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

function saveResult(name, result) {
  results.push({
    name,
    endpoint: result.path,
    status: result.status,
    response: result.data
  });
  
  console.log(`Status: ${result.status}`);
  if (result.status === 200) {
    const data = result.data;
    if (Array.isArray(data)) {
      console.log(`Tipo: Array com ${data.length} itens`);
    } else if (typeof data === 'object') {
      console.log(`Chaves: ${Object.keys(data).join(', ')}`);
    }
  } else {
    console.log(`Erro: ${JSON.stringify(result.data).substring(0, 200)}`);
  }
}

async function runTests() {
  console.log('🚀 Testes Detalhados - Deals, Funil e Usuários\n');

  // Primeiro buscar usuários para ter os IDs
  console.log('\n' + '='.repeat(70));
  console.log('📋 BUSCANDO USUÁRIOS DISPONÍVEIS');
  console.log('='.repeat(70));
  
  const usersResult = await makeRequest('/v1/users');
  saveResult('Listar Usuários', usersResult);
  
  let userId = null;
  if (usersResult.status === 200 && Array.isArray(usersResult.data) && usersResult.data.length > 0) {
    // Pegar o primeiro usuário ativo
    const activeUser = usersResult.data.find(u => u.active) || usersResult.data[0];
    userId = activeUser.db_id;
    console.log(`\n✅ Usando user_id: ${userId} (${activeUser.fullname})`);
  }

  await new Promise(r => setTimeout(r, 300));

  // Buscar Pipeline Groups para ter os IDs
  console.log('\n' + '='.repeat(70));
  console.log('📋 BUSCANDO PIPELINE GROUPS');
  console.log('='.repeat(70));
  
  const pipelineGroupsResult = await makeRequest('/v1/pipeline-groups');
  saveResult('Listar Pipeline Groups', pipelineGroupsResult);
  
  let defaultPipelineGroupId = null;
  if (pipelineGroupsResult.status === 200 && Array.isArray(pipelineGroupsResult.data)) {
    const defaultGroup = pipelineGroupsResult.data.find(g => g.default) || pipelineGroupsResult.data[0];
    defaultPipelineGroupId = defaultGroup?.db_id;
    console.log(`\n✅ Pipeline Group padrão: ${defaultPipelineGroupId} (${defaultGroup?.name})`);
  }

  await new Promise(r => setTimeout(r, 300));

  // Buscar Pipelines (estágios)
  console.log('\n' + '='.repeat(70));
  console.log('📋 BUSCANDO PIPELINES (ESTÁGIOS)');
  console.log('='.repeat(70));
  
  const pipelinesResult = await makeRequest('/v1/pipelines');
  saveResult('Listar Pipelines', pipelinesResult);
  
  let firstPipelineId = null;
  if (pipelinesResult.status === 200 && Array.isArray(pipelinesResult.data) && pipelinesResult.data.length > 0) {
    firstPipelineId = pipelinesResult.data[0].db_id;
  }

  await new Promise(r => setTimeout(r, 300));

  // TESTES DE DEALS
  console.log('\n' + '='.repeat(70));
  console.log('📋 TESTES DE DEALS');
  console.log('='.repeat(70));

  const dealTests = [
    // Sem parâmetros
    { name: 'Deals - Sem parâmetros', endpoint: '/v1/deals', params: {} },
    
    // Com user_id
    { name: 'Deals - Com user_id', endpoint: '/v1/deals', params: { user_id: userId } },
    
    // Com pipeline_group_id
    { name: 'Deals - Com pipeline_group_id', endpoint: '/v1/deals', params: { pipeline_group_id: defaultPipelineGroupId } },
    
    // Com user_id + pipeline_group_id
    { name: 'Deals - user_id + pipeline_group_id', endpoint: '/v1/deals', params: { user_id: userId, pipeline_group_id: defaultPipelineGroupId } },
    
    // Com deal_status
    { name: 'Deals - deal_status=all', endpoint: '/v1/deals', params: { deal_status: 'all' } },
    { name: 'Deals - deal_status=in progress', endpoint: '/v1/deals', params: { deal_status: 'in progress' } },
    { name: 'Deals - deal_status=win', endpoint: '/v1/deals', params: { deal_status: 'win' } },
    { name: 'Deals - deal_status=lost', endpoint: '/v1/deals', params: { deal_status: 'lost' } },
    
    // Combinações
    { name: 'Deals - user_id + deal_status=all', endpoint: '/v1/deals', params: { user_id: userId, deal_status: 'all' } },
    { name: 'Deals - user_id + deal_status=in progress', endpoint: '/v1/deals', params: { user_id: userId, deal_status: 'in progress' } },
    
    // Deals Search
    { name: 'Deals Search - Sem parâmetros', endpoint: '/v1/deals/search', params: { limit: 5 } },
    { name: 'Deals Search - Com user_id', endpoint: '/v1/deals/search', params: { user_id: userId, limit: 5 } },
    { name: 'Deals Search - deal_status=all', endpoint: '/v1/deals/search', params: { deal_status: 'all', limit: 5 } },
    { name: 'Deals Search - deal_status=in progress', endpoint: '/v1/deals/search', params: { deal_status: 'in progress', limit: 5 } },
    { name: 'Deals Search - user_id + deal_status=in progress', endpoint: '/v1/deals/search', params: { user_id: userId, deal_status: 'in progress', limit: 5 } },
    
    // Com show_activities
    { name: 'Deals Search - show_activities=true', endpoint: '/v1/deals/search', params: { show_activities: true, limit: 3 } },
    
    // Com pipeline_id (estágio específico)
    { name: 'Deals Search - Com pipeline_id', endpoint: '/v1/deals/search', params: { pipeline_id: firstPipelineId, limit: 5 } },
  ];

  for (const test of dealTests) {
    try {
      const result = await makeRequest(test.endpoint, test.params);
      saveResult(test.name, result);
      await new Promise(r => setTimeout(r, 300));
    } catch (error) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  // TESTES DE CONTATOS COM FILTROS
  console.log('\n' + '='.repeat(70));
  console.log('📋 TESTES DE CONTATOS COM FILTROS');
  console.log('='.repeat(70));

  const contactTests = [
    { name: 'Contatos - Sem filtros', endpoint: '/v1/contacts', params: { limit: 3 } },
    { name: 'Contatos - contact_type=person', endpoint: '/v1/contacts', params: { contact_type: 'person', limit: 3 } },
    { name: 'Contatos - contact_type=organization', endpoint: '/v1/contacts', params: { contact_type: 'organization', limit: 3 } },
    { name: 'Contatos - contact_type=lead', endpoint: '/v1/contacts', params: { contact_type: 'lead', limit: 3 } },
    { name: 'Contatos - active=true', endpoint: '/v1/contacts', params: { active: true, limit: 3 } },
    { name: 'Contatos - favorite=true', endpoint: '/v1/contacts', params: { favorite: true, limit: 3 } },
    { name: 'Contatos - Com user_id', endpoint: '/v1/contacts', params: { user_id: userId, limit: 3 } },
    { name: 'Contatos - Com manager_id', endpoint: '/v1/contacts', params: { manager_id: userId, limit: 3 } },
  ];

  for (const test of contactTests) {
    try {
      const result = await makeRequest(test.endpoint, test.params);
      saveResult(test.name, result);
      await new Promise(r => setTimeout(r, 300));
    } catch (error) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  // TESTES DE IMÓVEIS COM FILTROS
  console.log('\n' + '='.repeat(70));
  console.log('📋 TESTES DE IMÓVEIS COM FILTROS');
  console.log('='.repeat(70));

  const propertyTests = [
    { name: 'Imóveis - Sem filtros', endpoint: '/v1/properties', params: { limit: 3 } },
    { name: 'Imóveis - smart_list=available', endpoint: '/v1/properties', params: { smart_list: 'available', limit: 3 } },
    { name: 'Imóveis - smart_list=rent', endpoint: '/v1/properties', params: { smart_list: 'rent', limit: 3 } },
    { name: 'Imóveis - smart_list=sale', endpoint: '/v1/properties', params: { smart_list: 'sale', limit: 3 } },
    { name: 'Imóveis - Com user_id (listing_broker)', endpoint: '/v1/properties', params: { user_id: userId, limit: 3 } },
    { name: 'Imóveis - finality=residential', endpoint: '/v1/properties', params: { finality: 'residential', limit: 3 } },
    { name: 'Imóveis - finality=commercial', endpoint: '/v1/properties', params: { finality: 'commercial', limit: 3 } },
    { name: 'Imóveis - status=available', endpoint: '/v1/properties', params: { status: 'available', limit: 3 } },
  ];

  for (const test of propertyTests) {
    try {
      const result = await makeRequest(test.endpoint, test.params);
      saveResult(test.name, result);
      await new Promise(r => setTimeout(r, 300));
    } catch (error) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  // TESTES DE CALENDÁRIO
  console.log('\n' + '='.repeat(70));
  console.log('📋 TESTES DE CALENDÁRIO');
  console.log('='.repeat(70));

  const calendarTests = [
    { name: 'Calendário - Apenas year/month', endpoint: '/v1/calendar', params: { year: 2025, month: 12 } },
    { name: 'Calendário - Com user_id', endpoint: '/v1/calendar', params: { year: 2025, month: 12, user_id: userId } },
    { name: 'Calendário - item_type=visit', endpoint: '/v1/calendar', params: { year: 2025, month: 12, item_type: 'visit' } },
    { name: 'Calendário - item_type=task', endpoint: '/v1/calendar', params: { year: 2025, month: 12, item_type: 'task' } },
    { name: 'Calendário - item_type=event', endpoint: '/v1/calendar', params: { year: 2025, month: 12, item_type: 'event' } },
    { name: 'Calendário - user_id + item_type', endpoint: '/v1/calendar', params: { year: 2025, month: 12, user_id: userId, item_type: 'visit' } },
  ];

  for (const test of calendarTests) {
    try {
      const result = await makeRequest(test.endpoint, test.params);
      saveResult(test.name, result);
      await new Promise(r => setTimeout(r, 300));
    } catch (error) {
      console.log(`\n❌ Erro: ${error.message}`);
    }
  }

  // Salvar resultados em arquivo
  console.log('\n' + '='.repeat(70));
  console.log('💾 SALVANDO RESULTADOS');
  console.log('='.repeat(70));
  
  fs.writeFileSync(
    'docs/API_OUTPUTS_COMPLETOS.json',
    JSON.stringify(results, null, 2),
    'utf8'
  );
  console.log('✅ Resultados salvos em docs/API_OUTPUTS_COMPLETOS.json');

  // Criar resumo em markdown
  let markdown = `# 📋 OUTPUTS COMPLETOS DA API IMOBZI\n\n`;
  markdown += `**Data dos testes:** ${new Date().toISOString()}\n\n`;
  markdown += `---\n\n`;

  for (const r of results) {
    markdown += `## ${r.name}\n\n`;
    markdown += `**Endpoint:** \`${r.endpoint}\`\n`;
    markdown += `**Status:** ${r.status}\n\n`;
    
    if (r.status === 200) {
      markdown += `**Resposta:**\n\`\`\`json\n${JSON.stringify(r.response, null, 2).substring(0, 3000)}\n\`\`\`\n\n`;
    } else {
      markdown += `**Erro:**\n\`\`\`json\n${JSON.stringify(r.response, null, 2)}\n\`\`\`\n\n`;
    }
    markdown += `---\n\n`;
  }

  fs.writeFileSync('docs/API_OUTPUTS_COMPLETOS.md', markdown, 'utf8');
  console.log('✅ Resumo salvo em docs/API_OUTPUTS_COMPLETOS.md');

  console.log('\n\n✅ Todos os testes concluídos!');
}

if (API_KEY === 'SUA_API_KEY_AQUI') {
  console.log('❌ Configure sua API Key!');
  process.exit(1);
}

runTests();


