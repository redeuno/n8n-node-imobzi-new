const https = require('https');

const API_KEY = process.env.IMOBZI_API_KEY;

function makeRequest(method, path, qs = {}) {
	return new Promise((resolve) => {
		const queryString = Object.entries(qs)
			.filter(([, v]) => v !== '' && v !== null && v !== undefined)
			.map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
			.join('&');
		
		const fullPath = queryString ? `${path}?${queryString}` : path;
		
		console.log(`\n${'='.repeat(60)}`);
		console.log(`📡 ${method} https://api.imobzi.app${fullPath}`);
		console.log(`   QueryString:`, JSON.stringify(qs));
		
		const options = {
			hostname: 'api.imobzi.app',
			path: fullPath,
			method: method,
			headers: {
				'X-Imobzi-Secret': API_KEY,
				'Content-Type': 'application/json'
			}
		};

		const req = https.request(options, (res) => {
			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('end', () => {
				console.log(`   Status: ${res.statusCode}`);
				try {
					const json = JSON.parse(data);
					resolve({ status: res.statusCode, data: json, path: fullPath });
				} catch {
					console.log(`   Response (raw):`, data.substring(0, 200));
					resolve({ status: res.statusCode, data, path: fullPath });
				}
			});
		});
		
		req.on('error', (e) => {
			console.log(`   ERROR:`, e.message);
			resolve({ status: 0, error: e.message, path: fullPath });
		});
		req.end();
	});
}

function analyzeResponse(name, r, expectedDataKey) {
	console.log(`\n   📊 ANÁLISE: ${name}`);
	
	if (r.status !== 200) {
		console.log(`   ❌ Erro ${r.status}: ${r.data?.message || JSON.stringify(r.data).substring(0, 100)}`);
		return;
	}
	
	// Verificar estrutura
	const keys = Object.keys(r.data);
	console.log(`   Keys na resposta: [${keys.join(', ')}]`);
	
	// Verificar dataKey
	if (expectedDataKey) {
		if (r.data[expectedDataKey]) {
			const items = r.data[expectedDataKey];
			console.log(`   ✅ DataKey '${expectedDataKey}' encontrado: ${Array.isArray(items) ? items.length + ' itens' : typeof items}`);
		} else {
			console.log(`   ❌ DataKey '${expectedDataKey}' NÃO encontrado!`);
		}
	}
	
	// Array direto?
	if (Array.isArray(r.data)) {
		console.log(`   ✅ É array direto: ${r.data.length} itens`);
	}
	
	// Verificar cursor
	if (r.data.cursor !== undefined) {
		console.log(`   ✅ cursor: ${r.data.cursor ? 'presente' : 'null'}`);
	}
	if (r.data._metadata?.cursor !== undefined) {
		console.log(`   ✅ _metadata.cursor: ${r.data._metadata.cursor ? 'presente' : 'null'}`);
	}
	if (r.data.next_page !== undefined) {
		console.log(`   ✅ next_page: ${r.data.next_page}`);
	}
	
	// Primeiro item
	if (expectedDataKey && r.data[expectedDataKey]?.[0]) {
		const first = r.data[expectedDataKey][0];
		console.log(`   Primeiro item keys: [${Object.keys(first).slice(0, 10).join(', ')}...]`);
	}
}

async function debugCompleto() {
	console.log('\n' + '🔍'.repeat(30));
	console.log('DEBUG COMPLETO - FASE 1');
	console.log('🔍'.repeat(30));

	// ==================== 1. CONTATOS ====================
	console.log('\n\n' + '📇 1. CONTATOS '.padEnd(60, '='));
	
	// 1.1 Listar
	let r = await makeRequest('GET', '/v1/contacts', { limit: 50 });
	analyzeResponse('Listar Contatos', r, 'contacts');
	
	// 1.2 Com filtro contact_type
	r = await makeRequest('GET', '/v1/contacts', { contact_type: 'person', limit: 50 });
	analyzeResponse('Contatos tipo=person', r, 'contacts');
	
	// 1.3 Com filtro media_source
	r = await makeRequest('GET', '/v1/contacts', { media_source: 'OLX', limit: 50 });
	analyzeResponse('Contatos media_source=OLX', r, 'contacts');
	
	// 1.4 Verificar existência - email
	r = await makeRequest('GET', '/v1/contact/exists', { email: 'teste@teste.com' });
	analyzeResponse('Verificar email', r, null);
	console.log(`   Resposta:`, JSON.stringify(r.data).substring(0, 150));
	
	// 1.5 Verificar existência - phone_number
	r = await makeRequest('GET', '/v1/contact/exists', { phone_number: '67999847530' });
	analyzeResponse('Verificar phone_number', r, null);
	console.log(`   Resposta:`, JSON.stringify(r.data).substring(0, 150));
	
	// 1.6 Por ID
	r = await makeRequest('GET', '/v1/person/5352720932798464');
	analyzeResponse('Contato por ID', r, null);
	if (r.data?.fullname) console.log(`   ✅ fullname: ${r.data.fullname}`);
	
	// 1.7 Por código
	r = await makeRequest('GET', '/v1/person/code/10063');
	analyzeResponse('Contato por código', r, null);
	if (r.data?.fullname) console.log(`   ✅ fullname: ${r.data.fullname}`);
	
	// 1.8 Paginação - segunda página
	const firstPage = await makeRequest('GET', '/v1/contacts', { limit: 50 });
	if (firstPage.data?.cursor) {
		console.log(`\n   Testando paginação com cursor...`);
		r = await makeRequest('GET', '/v1/contacts', { cursor: firstPage.data.cursor });
		analyzeResponse('Segunda página (cursor)', r, 'contacts');
	}

	// ==================== 2. TAGS DE CONTATO ====================
	console.log('\n\n' + '🏷️ 2. TAGS DE CONTATO '.padEnd(60, '='));
	r = await makeRequest('GET', '/v1/contacts/tags');
	analyzeResponse('Tags de Contato', r, 'tags');

	// ==================== 3. MEDIA SOURCES ====================
	console.log('\n\n' + '📢 3. MEDIA SOURCES '.padEnd(60, '='));
	r = await makeRequest('GET', '/v1/media-sources');
	analyzeResponse('Media Sources', r, null);
	if (Array.isArray(r.data)) console.log(`   ✅ Array direto: ${r.data.length} itens`);

	// ==================== 4. IMÓVEIS ====================
	console.log('\n\n' + '🏠 4. IMÓVEIS '.padEnd(60, '='));
	
	r = await makeRequest('GET', '/v1/properties', { limit: 50 });
	analyzeResponse('Listar Imóveis', r, 'properties');
	
	r = await makeRequest('GET', '/v1/properties', { smart_list: 'available', limit: 50 });
	analyzeResponse('Imóveis smart_list=available', r, 'properties');
	
	r = await makeRequest('GET', '/v1/property/4550464861896704');
	analyzeResponse('Imóvel por ID', r, null);
	if (r.data?.address) console.log(`   ✅ address: ${r.data.address}`);
	
	r = await makeRequest('GET', '/v1/property/code/326');
	analyzeResponse('Imóvel por código', r, null);
	if (r.data?.address) console.log(`   ✅ address: ${r.data.address}`);
	
	r = await makeRequest('GET', '/v1/property/exists', { code: '326' });
	analyzeResponse('Verificar imóvel', r, null);
	console.log(`   Resposta:`, JSON.stringify(r.data).substring(0, 150));
	
	r = await makeRequest('GET', '/v1/property/4550464861896704/statistics');
	analyzeResponse('Estatísticas imóvel', r, null);
	console.log(`   Resposta keys:`, Object.keys(r.data || {}));

	// ==================== 5. LOCAÇÕES ====================
	console.log('\n\n' + '📋 5. LOCAÇÕES '.padEnd(60, '='));
	
	r = await makeRequest('GET', '/v1/leases', { limit: 50 });
	analyzeResponse('Listar Locações', r, 'leases');
	
	r = await makeRequest('GET', '/v1/leases', { smart_list: 'active', limit: 50 });
	analyzeResponse('Locações smart_list=active', r, 'leases');
	
	// Pegar primeiro lease para teste
	if (r.data?.leases?.[0]?.db_id) {
		const leaseId = r.data.leases[0].db_id;
		r = await makeRequest('GET', `/v1/lease/${leaseId}`);
		analyzeResponse('Locação por ID', r, null);
	}

	// ==================== 6. FATURAS ====================
	console.log('\n\n' + '💰 6. FATURAS '.padEnd(60, '='));
	
	r = await makeRequest('GET', '/v1/invoices', { limit: 50 });
	analyzeResponse('Listar Faturas', r, 'invoices');
	
	r = await makeRequest('GET', '/v1/invoices', { status: 'paid', limit: 50 });
	analyzeResponse('Faturas status=paid', r, 'invoices');
	
	// Paginação com next_page
	if (r.data?.next_page) {
		r = await makeRequest('GET', '/v1/invoices', { next_page: 2, limit: 50 });
		analyzeResponse('Faturas página 2', r, 'invoices');
	}

	// ==================== 7. TRANSAÇÕES ====================
	console.log('\n\n' + '💳 7. TRANSAÇÕES '.padEnd(60, '='));
	
	r = await makeRequest('GET', '/v1/financial/transactions', { limit: 50 });
	analyzeResponse('Listar Transações', r, 'transactions');

	// ==================== 8. CALENDÁRIO ====================
	console.log('\n\n' + '📅 8. CALENDÁRIO '.padEnd(60, '='));
	
	r = await makeRequest('GET', '/v1/calendar', { year: 2025, month: 12 });
	analyzeResponse('Calendário 12/2025', r, 'calendar_items');
	console.log(`   Resposta completa keys:`, Object.keys(r.data || {}));
	
	r = await makeRequest('GET', '/v1/calendar', { year: 2025, month: 11 });
	analyzeResponse('Calendário 11/2025', r, 'calendar_items');
	
	r = await makeRequest('GET', '/v1/calendar', { year: 2025, month: 10 });
	analyzeResponse('Calendário 10/2025', r, 'calendar_items');
	
	// Com filtro item_type
	r = await makeRequest('GET', '/v1/calendar', { year: 2025, month: 12, item_type: 'task' });
	analyzeResponse('Calendário item_type=task', r, 'calendar_items');

	// ==================== 9. BANCOS ====================
	console.log('\n\n' + '🏦 9. BANCOS '.padEnd(60, '='));
	r = await makeRequest('GET', '/v1/banks');
	analyzeResponse('Bancos', r, null);
	if (Array.isArray(r.data)) {
		console.log(`   ✅ Array direto: ${r.data.length} bancos`);
		console.log(`   Primeiro banco:`, JSON.stringify(r.data[0]).substring(0, 100));
	}

	// ==================== 10. MOTIVOS DE PERDA ====================
	console.log('\n\n' + '❌ 10. MOTIVOS DE PERDA '.padEnd(60, '='));
	r = await makeRequest('GET', '/v1/deal/lost-reason');
	analyzeResponse('Motivos de Perda', r, 'deals_lost_reasons');

	// ==================== 11. USUÁRIOS ====================
	console.log('\n\n' + '👤 11. USUÁRIOS '.padEnd(60, '='));
	r = await makeRequest('GET', '/v1/users');
	analyzeResponse('Usuários', r, null);
	if (Array.isArray(r.data)) {
		console.log(`   ✅ Array direto: ${r.data.length} usuários`);
		if (r.data[0]) console.log(`   Primeiro user ID: ${r.data[0].db_id} (tipo: ${typeof r.data[0].db_id})`);
	}

	// ==================== 12. PIPELINES ====================
	console.log('\n\n' + '🔄 12. PIPELINES '.padEnd(60, '='));
	r = await makeRequest('GET', '/v1/pipelines');
	analyzeResponse('Pipelines', r, null);
	
	r = await makeRequest('GET', '/v1/pipeline-groups');
	analyzeResponse('Pipeline Groups', r, null);

	// ==================== FIM ====================
	console.log('\n\n' + '✅'.repeat(30));
	console.log('DEBUG COMPLETO FINALIZADO');
	console.log('✅'.repeat(30) + '\n');
}

debugCompleto();

