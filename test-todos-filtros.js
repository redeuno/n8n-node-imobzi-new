/**
 * TESTE COMPLETO DE TODOS OS FILTROS DE TODOS OS RECURSOS
 * Baseado na documentação oficial api_imobzi.md
 */

const https = require('https');

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoiMjAyNS0xMi0xMFQxMzowNzo1MC43MDM3MzVaIiwiaXNfdGhpcmRfcGFydHlfYWNjZXNzIjp0cnVlLCJ0aGlyZF9wYXJ0eV9hcHBfaWQiOiJoNTZDNGpqNXc3RjgifQ.mNrABlX_L88mBKG4isoKm5pnycR43J3b-3Wku8pBIFk';

function makeRequest(path) {
	return new Promise((resolve) => {
		const options = {
			hostname: 'api.imobzi.app',
			path: path,
			method: 'GET',
			headers: { 'X-Imobzi-Secret': API_KEY, 'Content-Type': 'application/json' },
		};

		const req = https.request(options, (res) => {
			let data = '';
			res.on('data', (chunk) => (data += chunk));
			res.on('end', () => {
				try {
					const json = JSON.parse(data);
					const count = json.contacts?.length || json.properties?.length || json.leases?.length || 
								  json.invoices?.length || json.deals?.length || json.transactions?.length ||
								  json.calendar_items?.length || (Array.isArray(json) ? json.length : 0);
					resolve({ status: res.statusCode, count, data: json });
				} catch (e) {
					resolve({ status: res.statusCode, error: data.substring(0, 200) });
				}
			});
		});
		req.on('error', (e) => resolve({ status: 0, error: e.message }));
		req.end();
	});
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function testFilter(endpoint, filter, value, description) {
	const path = `${endpoint}?${filter}=${encodeURIComponent(value)}&limit=5`;
	const r = await makeRequest(path);
	const status = r.status === 200 ? (r.count > 0 ? '✅' : '⚠️') : '❌';
	console.log(`   ${status} ${filter}=${value} → ${r.status} (${r.count || 0} resultados)`);
	await sleep(250);
	return { filter, value, status: r.status, count: r.count };
}

async function runTests() {
	console.log('='.repeat(80));
	console.log('TESTE COMPLETO DE TODOS OS FILTROS - API IMOBZI');
	console.log('='.repeat(80));

	const results = {};

	// ==================== 1. CONTACTS ====================
	console.log('\n👤 1. CONTATOS (/v1/contacts)\n');
	console.log('   Parâmetros da API: cursor, contact_type, media_source, order, smart_list,');
	console.log('   tags, clear_notifications, inactive, manager_id, search_text, search_type,');
	console.log('   cursor_current_page, search_date, start_date, end_date, user_id\n');

	results.contacts = [];
	
	// Básico
	let r = await makeRequest('/v1/contacts?limit=5');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status} (${r.count} resultados)`);
	await sleep(250);

	// contact_type
	results.contacts.push(await testFilter('/v1/contacts', 'contact_type', 'person', 'Tipo pessoa'));
	results.contacts.push(await testFilter('/v1/contacts', 'contact_type', 'lead', 'Tipo lead'));
	results.contacts.push(await testFilter('/v1/contacts', 'contact_type', 'organization', 'Tipo organização'));

	// media_source
	results.contacts.push(await testFilter('/v1/contacts', 'media_source', 'OLX', 'Origem OLX'));
	results.contacts.push(await testFilter('/v1/contacts', 'media_source', 'Site', 'Origem Site'));

	// smart_list
	results.contacts.push(await testFilter('/v1/contacts', 'smart_list', 'all', 'Smart: all'));
	results.contacts.push(await testFilter('/v1/contacts', 'smart_list', 'my_contacts', 'Smart: my_contacts'));
	results.contacts.push(await testFilter('/v1/contacts', 'smart_list', 'with_deals', 'Smart: with_deals'));
	results.contacts.push(await testFilter('/v1/contacts', 'smart_list', 'without_deals', 'Smart: without_deals'));

	// tags
	results.contacts.push(await testFilter('/v1/contacts', 'tags', 'contact', 'Tag: contact'));
	results.contacts.push(await testFilter('/v1/contacts', 'tags', 'lead', 'Tag: lead'));

	// user_id (corretor responsável)
	results.contacts.push(await testFilter('/v1/contacts', 'user_id', 'SYkMqS5aInfpP1p9m9MV0AufW0p1', 'User ID'));

	// manager_id
	results.contacts.push(await testFilter('/v1/contacts', 'manager_id', 'SYkMqS5aInfpP1p9m9MV0AufW0p1', 'Manager ID'));

	// search_text
	results.contacts.push(await testFilter('/v1/contacts', 'search_text', 'Bruno', 'Busca texto'));

	// inactive
	results.contacts.push(await testFilter('/v1/contacts', 'inactive', 'true', 'Inativos'));
	results.contacts.push(await testFilter('/v1/contacts', 'inactive', 'false', 'Ativos'));

	// ==================== 2. PROPERTIES ====================
	console.log('\n🏠 2. IMÓVEIS (/v1/properties)\n');
	console.log('   Parâmetros da API: cursor, all_brokers, clear_notifications, smart_list,');
	console.log('   namespace, order, limit, show_map, show_network, user_id, finality, status\n');

	results.properties = [];

	// Básico
	r = await makeRequest('/v1/properties?limit=5');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status} (${r.count} resultados)`);
	await sleep(250);

	// smart_list
	results.properties.push(await testFilter('/v1/properties', 'smart_list', 'all', 'Smart: all'));
	results.properties.push(await testFilter('/v1/properties', 'smart_list', 'available', 'Smart: available'));
	results.properties.push(await testFilter('/v1/properties', 'smart_list', 'rent', 'Smart: rent'));
	results.properties.push(await testFilter('/v1/properties', 'smart_list', 'sale', 'Smart: sale'));
	results.properties.push(await testFilter('/v1/properties', 'smart_list', 'my_properties', 'Smart: my_properties'));
	results.properties.push(await testFilter('/v1/properties', 'smart_list', 'inactives', 'Smart: inactives'));

	// finality
	results.properties.push(await testFilter('/v1/properties', 'finality', 'residential', 'Finalidade residencial'));
	results.properties.push(await testFilter('/v1/properties', 'finality', 'commercial', 'Finalidade comercial'));

	// status
	results.properties.push(await testFilter('/v1/properties', 'status', 'available', 'Status disponível'));
	results.properties.push(await testFilter('/v1/properties', 'status', 'reserved', 'Status reservado'));

	// user_id
	results.properties.push(await testFilter('/v1/properties', 'user_id', 'SYkMqS5aInfpP1p9m9MV0AufW0p1', 'User ID'));

	// all_brokers
	results.properties.push(await testFilter('/v1/properties', 'all_brokers', 'true', 'Todos corretores'));

	// ==================== 3. LEASES ====================
	console.log('\n📋 3. LOCAÇÕES (/v1/leases)\n');
	console.log('   Parâmetros da API: cursor, end_at, owner_id, search_text, search_type,');
	console.log('   smart_list, start_at, property_id\n');

	results.leases = [];

	// Básico
	r = await makeRequest('/v1/leases?limit=5');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status} (${r.count} resultados)`);
	await sleep(250);

	// smart_list
	results.leases.push(await testFilter('/v1/leases', 'smart_list', 'active', 'Smart: active'));
	results.leases.push(await testFilter('/v1/leases', 'smart_list', 'inactive', 'Smart: inactive'));
	results.leases.push(await testFilter('/v1/leases', 'smart_list', 'all', 'Smart: all'));

	// search_text
	results.leases.push(await testFilter('/v1/leases', 'search_text', 'Bruno', 'Busca texto'));

	// start_at / end_at
	results.leases.push(await testFilter('/v1/leases', 'start_at', '2024-01-01', 'Data início'));
	results.leases.push(await testFilter('/v1/leases', 'end_at', '2024-12-31', 'Data fim'));

	// ==================== 4. INVOICES ====================
	console.log('\n💰 4. FATURAS (/v1/invoices)\n');
	console.log('   Parâmetros da API: account_id, contact_type, lease_id, contract_id,');
	console.log('   contract_type, contact_id, page, start_at, end_at, status, ...\n');

	results.invoices = [];

	// Básico
	r = await makeRequest('/v1/invoices?limit=5');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status} (${r.count} resultados)`);
	await sleep(250);

	// status
	results.invoices.push(await testFilter('/v1/invoices', 'status', 'paid', 'Status pago'));
	results.invoices.push(await testFilter('/v1/invoices', 'status', 'pending', 'Status pendente'));
	results.invoices.push(await testFilter('/v1/invoices', 'status', 'overdue', 'Status atrasado'));
	results.invoices.push(await testFilter('/v1/invoices', 'status', 'canceled', 'Status cancelado'));

	// start_at / end_at
	results.invoices.push(await testFilter('/v1/invoices', 'start_at', '2024-01-01', 'Data início'));
	results.invoices.push(await testFilter('/v1/invoices', 'end_at', '2024-12-31', 'Data fim'));

	// ==================== 5. DEALS/SEARCH ====================
	console.log('\n🎯 5. DEALS SEARCH (/v1/deals/search)\n');
	console.log('   Parâmetros da API: contact_type, cursor, deal_stage, contact_id, value,');
	console.log('   initial_date, interest, final_date, finality, status, show_activities,');
	console.log('   pipeline_id, user_id, deal_status, ...\n');

	results.deals = [];

	// Básico
	r = await makeRequest('/v1/deals/search?limit=5');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status} (${r.count} resultados)`);
	await sleep(250);

	// deal_status
	results.deals.push(await testFilter('/v1/deals/search', 'deal_status', 'all', 'Status: all'));
	results.deals.push(await testFilter('/v1/deals/search', 'deal_status', 'win', 'Status: win'));
	results.deals.push(await testFilter('/v1/deals/search', 'deal_status', 'lost', 'Status: lost'));
	results.deals.push(await testFilter('/v1/deals/search', 'deal_status', 'stagnant', 'Status: stagnant'));
	results.deals.push(await testFilter('/v1/deals/search', 'deal_status', 'in progress', 'Status: in progress'));
	results.deals.push(await testFilter('/v1/deals/search', 'deal_status', 'out_of_date', 'Status: out_of_date'));

	// status (diferente de deal_status?)
	results.deals.push(await testFilter('/v1/deals/search', 'status', 'open', 'status: open'));
	results.deals.push(await testFilter('/v1/deals/search', 'status', 'won', 'status: won'));

	// user_id
	results.deals.push(await testFilter('/v1/deals/search', 'user_id', 'SYkMqS5aInfpP1p9m9MV0AufW0p1', 'User ID'));

	// pipeline_id
	results.deals.push(await testFilter('/v1/deals/search', 'pipeline_id', '4584666827849728', 'Pipeline ID'));

	// stage
	results.deals.push(await testFilter('/v1/deals/search', 'stage', '4584666827849728', 'Stage ID'));
	results.deals.push(await testFilter('/v1/deals/search', 'deal_stage', '4584666827849728', 'Deal Stage ID'));

	// show_activities
	results.deals.push(await testFilter('/v1/deals/search', 'show_activities', 'true', 'Show activities'));

	// finality
	results.deals.push(await testFilter('/v1/deals/search', 'finality', 'rent', 'Finalidade locação'));
	results.deals.push(await testFilter('/v1/deals/search', 'finality', 'sale', 'Finalidade venda'));

	// interest
	results.deals.push(await testFilter('/v1/deals/search', 'interest', 'rent', 'Interesse locação'));
	results.deals.push(await testFilter('/v1/deals/search', 'interest', 'sale', 'Interesse venda'));

	// ==================== 6. DEALS (por estágio) ====================
	console.log('\n📊 6. DEALS POR ESTÁGIO (/v1/deals)\n');
	console.log('   Parâmetros da API: cursor, deal_id, cursor_page, deal_type, deal_status,');
	console.log('   pipeline_group_id, user_id, only_new_properties, property_id, ...\n');

	results.dealsByStage = [];

	// Básico
	r = await makeRequest('/v1/deals');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status}`);
	await sleep(250);

	// deal_type
	results.dealsByStage.push(await testFilter('/v1/deals', 'deal_type', 'rent', 'Tipo: rent'));
	results.dealsByStage.push(await testFilter('/v1/deals', 'deal_type', 'sale', 'Tipo: sale'));

	// deal_status
	results.dealsByStage.push(await testFilter('/v1/deals', 'deal_status', 'all', 'Status: all'));
	results.dealsByStage.push(await testFilter('/v1/deals', 'deal_status', 'stagnant', 'Status: stagnant'));

	// pipeline_group_id
	results.dealsByStage.push(await testFilter('/v1/deals', 'pipeline_group_id', '5675099632959488', 'Pipeline Group ID'));

	// user_id
	results.dealsByStage.push(await testFilter('/v1/deals', 'user_id', 'SYkMqS5aInfpP1p9m9MV0AufW0p1', 'User ID'));

	// ==================== 7. TRANSACTIONS ====================
	console.log('\n💳 7. TRANSAÇÕES (/v1/financial/transactions)\n');
	console.log('   Parâmetros da API: filter_type, search_text, start_at, end_at, contact_type,');
	console.log('   contact_id, user_id, account_id, page, status, tags, ...\n');

	results.transactions = [];

	// Básico
	r = await makeRequest('/v1/financial/transactions?limit=5');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status} (${r.count} resultados)`);
	await sleep(250);

	// filter_type
	results.transactions.push(await testFilter('/v1/financial/transactions', 'filter_type', 'income', 'Tipo: income'));
	results.transactions.push(await testFilter('/v1/financial/transactions', 'filter_type', 'expense', 'Tipo: expense'));
	results.transactions.push(await testFilter('/v1/financial/transactions', 'filter_type', 'transference', 'Tipo: transference'));

	// status
	results.transactions.push(await testFilter('/v1/financial/transactions', 'status', 'paid', 'Status: paid'));
	results.transactions.push(await testFilter('/v1/financial/transactions', 'status', 'pending', 'Status: pending'));

	// start_at / end_at
	results.transactions.push(await testFilter('/v1/financial/transactions', 'start_at', '2024-01-01', 'Data início'));
	results.transactions.push(await testFilter('/v1/financial/transactions', 'end_at', '2024-12-31', 'Data fim'));

	// account_id
	results.transactions.push(await testFilter('/v1/financial/transactions', 'account_id', '5374237794631680', 'Conta PJBank'));

	// ==================== 8. CALENDAR ====================
	console.log('\n📅 8. CALENDÁRIO (/v1/calendar)\n');
	console.log('   Parâmetros da API: cursor_fw, cursor_rw, item_type, user_id, year, month,');
	console.log('   day, week, calendar_type, schedule, search_all, holiday_year\n');

	results.calendar = [];

	// Básico (ano/mês obrigatórios)
	r = await makeRequest('/v1/calendar?year=2025&month=12');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status} (${r.count} resultados)`);
	await sleep(250);

	// calendar_type + search_all
	r = await makeRequest('/v1/calendar?year=2025&month=12&calendar_type=normal&search_all=true');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} search_all=true: ${r.status} (${r.data?.calendar_items?.length || 0} resultados)`);
	await sleep(250);

	// item_type
	r = await makeRequest('/v1/calendar?year=2025&month=12&calendar_type=normal&search_all=true&item_type=task');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} item_type=task: ${r.status} (${r.data?.calendar_items?.length || 0} resultados)`);
	await sleep(250);

	r = await makeRequest('/v1/calendar?year=2025&month=12&calendar_type=normal&search_all=true&item_type=visit');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} item_type=visit: ${r.status} (${r.data?.calendar_items?.length || 0} resultados)`);
	await sleep(250);

	// user_id
	r = await makeRequest('/v1/calendar?year=2025&month=12&calendar_type=normal&user_id=SYkMqS5aInfpP1p9m9MV0AufW0p1');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} user_id específico: ${r.status} (${r.data?.calendar_items?.length || 0} resultados)`);
	await sleep(250);

	// ==================== RESUMO ====================
	console.log('\n' + '='.repeat(80));
	console.log('RESUMO DOS FILTROS QUE FUNCIONAM');
	console.log('='.repeat(80));

	const printWorking = (name, arr) => {
		const working = arr.filter(r => r.status === 200 && r.count > 0).map(r => r.filter + '=' + r.value);
		const notWorking = arr.filter(r => r.status !== 200 || r.count === 0).map(r => r.filter + '=' + r.value);
		console.log(`\n${name}:`);
		console.log(`   ✅ Funcionam: ${working.join(', ') || 'nenhum'}`);
		console.log(`   ❌ Não funcionam: ${notWorking.join(', ') || 'nenhum'}`);
	};

	printWorking('CONTACTS', results.contacts);
	printWorking('PROPERTIES', results.properties);
	printWorking('LEASES', results.leases);
	printWorking('INVOICES', results.invoices);
	printWorking('DEALS SEARCH', results.deals);
	printWorking('DEALS BY STAGE', results.dealsByStage);
	printWorking('TRANSACTIONS', results.transactions);
}

runTests().catch(console.error);

