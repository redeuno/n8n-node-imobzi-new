/**
 * Script de teste dos endpoints da API Imobzi
 * Execute: node test-api.js
 */

const https = require('https');

// COLOQUE SUA API KEY AQUI
const API_KEY = process.env.IMOBZI_API_KEY || 'SUA_API_KEY_AQUI';

const BASE_URL = 'api.imobzi.app';

async function makeRequest(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const queryString = Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== '')
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
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.end();
  });
}

function printResult(name, result) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📋 ${name}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Status: ${result.status}`);
  
  if (result.status === 200) {
    const data = result.data;
    
    // Identificar estrutura
    if (Array.isArray(data)) {
      console.log(`Tipo: Array`);
      console.log(`Total itens: ${data.length}`);
      if (data.length > 0) {
        console.log(`Chaves do primeiro item: ${Object.keys(data[0]).join(', ')}`);
      }
    } else if (typeof data === 'object') {
      console.log(`Tipo: Objeto`);
      console.log(`Chaves: ${Object.keys(data).join(', ')}`);
      
      // Verificar se tem dataKey
      for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
          console.log(`  - ${key}: Array com ${data[key].length} itens`);
          if (data[key].length > 0) {
            console.log(`    Chaves: ${Object.keys(data[key][0]).slice(0, 10).join(', ')}...`);
          }
        } else if (key === 'cursor' || key === '_metadata') {
          console.log(`  - ${key}: ${JSON.stringify(data[key])}`);
        }
      }
    }
    
    // Preview
    console.log(`\nPreview (primeiros 500 chars):`);
    console.log(JSON.stringify(data, null, 2).substring(0, 500) + '...');
  } else {
    console.log(`Erro: ${JSON.stringify(result.data)}`);
  }
}

async function runTests() {
  console.log('🚀 Iniciando testes da API Imobzi');
  console.log(`Base URL: https://${BASE_URL}`);
  console.log(`API Key: ${API_KEY.substring(0, 10)}...`);

  const tests = [
    // CONTATOS
    { name: '1. Contatos - Listar', endpoint: '/v1/contacts', params: { limit: 5 } },
    { name: '2. Contatos - Listar com filtro media_source', endpoint: '/v1/contacts', params: { limit: 5, media_source: 'OLX' } },
    { name: '3. Contatos - Listar com filtro contact_type', endpoint: '/v1/contacts', params: { limit: 5, contact_type: 'person' } },
    { name: '4. Contato - Verificar existência (email)', endpoint: '/v1/contact/exists', params: { email: 'teste@teste.com' } },
    
    // IMÓVEIS
    { name: '5. Imóveis - Listar', endpoint: '/v1/properties', params: { limit: 5 } },
    { name: '6. Imóveis - Listar com smart_list=available', endpoint: '/v1/properties', params: { limit: 5, smart_list: 'available' } },
    { name: '7. Imóveis - Listar com smart_list=sale', endpoint: '/v1/properties', params: { limit: 5, smart_list: 'sale' } },
    
    // LOCAÇÕES
    { name: '8. Locações - Listar', endpoint: '/v1/leases', params: { limit: 5 } },
    { name: '9. Locações - Listar com smart_list=active', endpoint: '/v1/leases', params: { limit: 5, smart_list: 'active' } },
    
    // FATURAS
    { name: '10. Faturas - Listar', endpoint: '/v1/invoices', params: { limit: 5 } },
    { name: '11. Faturas - Listar com status=paid', endpoint: '/v1/invoices', params: { limit: 5, status: 'paid' } },
    
    // DEALS
    { name: '12. Deals - Listar', endpoint: '/v1/deals', params: { limit: 5 } },
    { name: '13. Deals - Listar com deal_status=open', endpoint: '/v1/deals', params: { limit: 5, deal_status: 'open' } },
    
    // CALENDÁRIO
    { name: '14. Calendário - Listar (2025/01)', endpoint: '/v1/calendar', params: { year: 2025, month: 1 } },
    { name: '15. Calendário - Listar (2025/12)', endpoint: '/v1/calendar', params: { year: 2025, month: 12 } },
    
    // TRANSAÇÕES
    { name: '16. Transações - Listar', endpoint: '/v1/financial-transactions', params: { limit: 5 } },
    
    // AUXILIARES
    { name: '17. Pipelines - Listar', endpoint: '/v1/pipelines', params: {} },
    { name: '18. Pipeline Groups - Listar', endpoint: '/v1/pipeline-groups', params: {} },
    { name: '19. Tipos de Imóvel - Listar', endpoint: '/v1/property-types', params: {} },
    { name: '20. Usuários - Listar', endpoint: '/v1/users', params: {} },
  ];

  for (const test of tests) {
    try {
      const result = await makeRequest(test.endpoint, test.params);
      printResult(test.name, result);
      
      // Delay entre requests
      await new Promise(r => setTimeout(r, 500));
    } catch (error) {
      console.log(`\n❌ Erro em ${test.name}: ${error.message}`);
    }
  }

  console.log('\n\n✅ Testes concluídos!');
}

// Verificar API Key
if (API_KEY === 'SUA_API_KEY_AQUI') {
  console.log('❌ Configure sua API Key!');
  console.log('Execute: IMOBZI_API_KEY=sua_key node test-api.js');
  console.log('Ou edite o arquivo e coloque sua key na variável API_KEY');
  process.exit(1);
}

runTests();


