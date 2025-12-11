const https = require('https');

const API_KEY = process.env.IMOBZI_API_KEY;

function makeRequest(path, params = {}) {
	return new Promise((resolve) => {
		const queryString = Object.entries(params)
			.filter(([, v]) => v !== '' && v !== null && v !== undefined)
			.map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
			.join('&');
		
		const url = queryString ? `${path}?${queryString}` : path;
		console.log(`\n📡 GET ${url}`);
		console.log(`   Params:`, JSON.stringify(params));
		
		const options = {
			hostname: 'api.imobzi.app',
			path: url,
			method: 'GET',
			headers: {
				'X-Imobzi-Secret': API_KEY,
				'Content-Type': 'application/json'
			}
		};

		const req = https.request(options, (res) => {
			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('end', () => {
				try {
					const json = JSON.parse(data);
					resolve({ status: res.statusCode, data: json, url });
				} catch {
					resolve({ status: res.statusCode, data, url });
				}
			});
		});
		
		req.on('error', (e) => resolve({ status: 0, error: e.message, url }));
		req.end();
	});
}

async function test() {
	console.log('='.repeat(60));
	console.log('TESTE DE DEBUG - API IMOBZI');
	console.log('='.repeat(60));

	// 1. CONTATOS
	console.log('\n\n📇 1. CONTATOS');
	console.log('-'.repeat(40));
	
	// Lista simples
	let r = await makeRequest('/v1/contacts', { limit: 50 });
	console.log(`   Status: ${r.status}`);
	console.log(`   Contacts Count: ${r.data?.contacts?.length || 0}`);
	console.log(`   Has cursor: ${!!r.data?._metadata?.cursor}`);
	
	// Com filtro contact_type
	r = await makeRequest('/v1/contacts', { contact_type: 'person' });
	console.log(`   Com contact_type=person: ${r.status}, count: ${r.data?.contacts?.length || 0}`);
	
	// Com filtro media_source
	r = await makeRequest('/v1/contacts', { media_source: 'OLX' });
	console.log(`   Com media_source=OLX: ${r.status}, count: ${r.data?.contacts?.length || 0}`);
	
	// Verificar existência
	r = await makeRequest('/v1/contact/exists', { phone_number: '67999847530' });
	console.log(`   Verificar phone_number: ${r.status}`, JSON.stringify(r.data).substring(0, 100));
	
	r = await makeRequest('/v1/contact/exists', { email: 'teste@teste.com' });
	console.log(`   Verificar email: ${r.status}`, JSON.stringify(r.data).substring(0, 100));
	
	// Por ID
	r = await makeRequest('/v1/person/5352720932798464');
	console.log(`   Por ID: ${r.status}, name: ${r.data?.name || r.data?.message}`);
	
	// Por código
	r = await makeRequest('/v1/person/code/10063');
	console.log(`   Por código: ${r.status}, name: ${r.data?.name || r.data?.message}`);

	// Tags
	r = await makeRequest('/v1/contacts/tags');
	console.log(`   Tags: ${r.status}, count: ${r.data?.tags?.length || (Array.isArray(r.data) ? r.data.length : 0)}`);

	// 2. IMÓVEIS
	console.log('\n\n🏠 2. IMÓVEIS');
	console.log('-'.repeat(40));
	
	r = await makeRequest('/v1/properties', { limit: 50 });
	console.log(`   Status: ${r.status}`);
	console.log(`   Properties Count: ${r.data?.properties?.length || 0}`);
	console.log(`   Has cursor: ${!!r.data?._metadata?.cursor}`);
	
	// Com filtro smart_list
	r = await makeRequest('/v1/properties', { smart_list: 'available', limit: 50 });
	console.log(`   Com smart_list=available: ${r.status}, count: ${r.data?.properties?.length || 0}`);
	
	// Verificar existência
	r = await makeRequest('/v1/property/exists', { code: '326' });
	console.log(`   Verificar code=326: ${r.status}`, JSON.stringify(r.data).substring(0, 100));
	
	// Por ID
	r = await makeRequest('/v1/property/4550464861896704');
	console.log(`   Por ID: ${r.status}, address: ${r.data?.address || r.data?.message}`);
	
	// Por código
	r = await makeRequest('/v1/property/code/326');
	console.log(`   Por código: ${r.status}, address: ${r.data?.address || r.data?.message}`);
	
	// Estatísticas
	r = await makeRequest('/v1/property/4550464861896704/statistics');
	console.log(`   Estatísticas: ${r.status}`, JSON.stringify(r.data).substring(0, 100));

	// 3. LOCAÇÕES
	console.log('\n\n📋 3. LOCAÇÕES');
	console.log('-'.repeat(40));
	
	r = await makeRequest('/v1/leases', { limit: 50 });
	console.log(`   Status: ${r.status}`);
	console.log(`   Leases Count: ${r.data?.leases?.length || 0}`);
	
	r = await makeRequest('/v1/leases', { smart_list: 'active', limit: 50 });
	console.log(`   Com smart_list=active: ${r.status}, count: ${r.data?.leases?.length || 0}`);
	
	// Por código
	r = await makeRequest('/v1/lease/code/15');
	console.log(`   Por código 15: ${r.status}, value: ${r.data?.value || r.data?.message}`);

	// 4. FATURAS
	console.log('\n\n💰 4. FATURAS');
	console.log('-'.repeat(40));
	
	r = await makeRequest('/v1/invoices', { limit: 50 });
	console.log(`   Status: ${r.status}`);
	console.log(`   Invoices Count: ${r.data?.invoices?.length || 0}`);
	console.log(`   Has next_page: ${r.data?.next_page}`);
	
	r = await makeRequest('/v1/invoices', { status: 'paid', limit: 50 });
	console.log(`   Com status=paid: ${r.status}, count: ${r.data?.invoices?.length || 0}`);

	// 5. TRANSAÇÕES
	console.log('\n\n💳 5. TRANSAÇÕES FINANCEIRAS');
	console.log('-'.repeat(40));
	
	r = await makeRequest('/v1/financial/transactions', { limit: 50 });
	console.log(`   Status: ${r.status}`);
	console.log(`   Transactions Count: ${r.data?.transactions?.length || 0}`);

	// 6. AUXILIARES
	console.log('\n\n🔧 6. AUXILIARES');
	console.log('-'.repeat(40));
	
	r = await makeRequest('/v1/media-sources');
	console.log(`   Media Sources: ${r.status}, count: ${Array.isArray(r.data) ? r.data.length : 0}`);
	
	r = await makeRequest('/v1/deal/lost-reason');
	console.log(`   Lost Reasons: ${r.status}, count: ${r.data?.deals_lost_reasons?.length || 0}`);
	
	r = await makeRequest('/v1/banks');
	console.log(`   Banks: ${r.status}, count: ${Array.isArray(r.data) ? r.data.length : 0}`);

	// 7. CALENDÁRIO
	console.log('\n\n📅 7. CALENDÁRIO');
	console.log('-'.repeat(40));
	
	r = await makeRequest('/v1/calendar', { year: 2025, month: 12 });
	console.log(`   Status: ${r.status}`);
	console.log(`   Items Count: ${r.data?.calendar_items?.length || 0}`);
	
	r = await makeRequest('/v1/calendar', { year: 2025, month: 12, item_type: 'task' });
	console.log(`   Com item_type=task: ${r.status}, count: ${r.data?.calendar_items?.length || 0}`);

	console.log('\n\n' + '='.repeat(60));
	console.log('TESTE CONCLUÍDO');
	console.log('='.repeat(60));
}

test();

