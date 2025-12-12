/**
 * Script de teste - Parte 2: Busca por ID e Código
 */

const https = require('https');

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
    if (Array.isArray(data)) {
      console.log(`Tipo: Array com ${data.length} itens`);
      if (data.length > 0) console.log(`Chaves: ${Object.keys(data[0]).join(', ')}`);
    } else if (typeof data === 'object') {
      console.log(`Tipo: Objeto`);
      console.log(`Chaves: ${Object.keys(data).join(', ')}`);
    }
    console.log(`\nPreview:`);
    console.log(JSON.stringify(data, null, 2).substring(0, 800) + '...');
  } else {
    console.log(`Erro: ${JSON.stringify(result.data)}`);
  }
}

async function runTests() {
  console.log('🚀 Testes Parte 2 - Busca por ID e Código\n');

  const tests = [
    // BUSCA POR ID
    { name: '1. Contato por ID (contact_id)', endpoint: '/v1/contact/5352720932798464', params: {} },
    { name: '2. Pessoa por ID', endpoint: '/v1/person/5352720932798464', params: {} },
    { name: '3. Imóvel por ID', endpoint: '/v1/property/4550464861896704', params: {} },
    { name: '4. Locação por ID', endpoint: '/v1/lease/5987740112388096', params: {} },
    { name: '5. Fatura por ID', endpoint: '/v1/invoice/536edb56c6cb11f0822842004e494300', params: {} },
    
    // BUSCA POR CÓDIGO
    { name: '6. Pessoa por Código', endpoint: '/v1/person/code/10063', params: {} },
    { name: '7. Imóvel por Código', endpoint: '/v1/property/code/326', params: {} },
    { name: '8. Locação por Código', endpoint: '/v1/lease/code/15', params: {} },
    
    // TRANSAÇÕES - tentando diferentes endpoints
    { name: '9. Transações (transactions)', endpoint: '/v1/transactions', params: { limit: 5 } },
    { name: '10. Transações Financeiras (financial/transactions)', endpoint: '/v1/financial/transactions', params: { limit: 5 } },
    { name: '11. Repasses (onlendings)', endpoint: '/v1/onlendings', params: { limit: 5 } },
    
    // DEALS - busca alternativa
    { name: '12. Deals Search', endpoint: '/v1/deals/search', params: { limit: 5 } },
    { name: '13. Deal por ID (se houver)', endpoint: '/v1/deal/5675099632959488', params: {} },
    
    // VERIFICAR EXISTÊNCIA
    { name: '14. Verificar contato por telefone', endpoint: '/v1/contact/exists', params: { phone: '67999847530' } },
    { name: '15. Verificar contato por CPF', endpoint: '/v1/contact/exists', params: { cpf: '36282001803' } },
    
    // OUTROS ENDPOINTS
    { name: '16. Timeline', endpoint: '/v1/timeline', params: { limit: 5 } },
    { name: '17. Lost Reasons', endpoint: '/v1/deal/lost-reason', params: {} },
    { name: '18. Calendar Types', endpoint: '/v1/calendar-types', params: {} },
    { name: '19. Teams', endpoint: '/v1/teams', params: {} },
    { name: '20. Banks/Accounts', endpoint: '/v1/accounts', params: {} },
  ];

  for (const test of tests) {
    try {
      const result = await makeRequest(test.endpoint, test.params);
      printResult(test.name, result);
      await new Promise(r => setTimeout(r, 300));
    } catch (error) {
      console.log(`\n❌ Erro em ${test.name}: ${error.message}`);
    }
  }

  console.log('\n\n✅ Testes concluídos!');
}

if (API_KEY === 'SUA_API_KEY_AQUI') {
  console.log('❌ Configure sua API Key!');
  process.exit(1);
}

runTests();


