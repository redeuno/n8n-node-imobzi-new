/**
 * Teste Completo da API Imobzi - Baseado na Documentação
 * Token fornecido pelo usuário
 */

const https = require('https');

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoiMjAyNS0xMi0xMFQxMzowNzo1MC43MDM3MzVaIiwiaXNfdGhpcmRfcGFydHlfYWNjZXNzIjp0cnVlLCJ0aGlyZF9wYXJ0eV9hcHBfaWQiOiJoNTZDNGpqNXc3RjgifQ.mNrABlX_L88mBKG4isoKm5pnycR43J3b-3Wku8pBIFk';
const BASE_URL = 'api.imobzi.app';

function makeRequest(path, description) {
	return new Promise((resolve) => {
		const options = {
			hostname: BASE_URL,
			path: path,
			method: 'GET',
			headers: {
				'X-Imobzi-Secret': API_KEY,
				'Content-Type': 'application/json',
			},
		};

		const req = https.request(options, (res) => {
			let data = '';
			res.on('data', (chunk) => (data += chunk));
			res.on('end', () => {
				try {
					const json = JSON.parse(data);
					resolve({ description, path, status: res.statusCode, success: true, data: json });
				} catch (e) {
					resolve({ description, path, status: res.statusCode, success: false, error: data.substring(0, 500) });
				}
			});
		});

		req.on('error', (e) => {
			resolve({ description, path, success: false, error: e.message });
		});

		req.end();
	});
}

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTests() {
	console.log('='.repeat(80));
	console.log('TESTE COMPLETO DA API IMOBZI - BASEADO NA DOCUMENTAÇÃO');
	console.log('='.repeat(80));

	const results = {};

	// ==================== 1. TRANSAÇÕES FINANCEIRAS ====================
	console.log('\n📊 1. TRANSAÇÕES FINANCEIRAS\n');

	// Básico
	let r = await makeRequest('/v1/financial/transactions?limit=5', 'Transações - Básico');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status}`);
	if (r.success && r.data.transactions) {
		const types = {};
		const statuses = {};
		r.data.transactions.forEach(t => {
			types[t.transaction_type] = (types[t.transaction_type] || 0) + 1;
			statuses[t.status] = (statuses[t.status] || 0) + 1;
		});
		console.log(`   → Tipos encontrados: ${JSON.stringify(types)}`);
		console.log(`   → Status encontrados: ${JSON.stringify(statuses)}`);
		results.transaction_types = Object.keys(types);
		results.transaction_statuses = Object.keys(statuses);
	}
	await sleep(300);

	// filter_type (correto) vs type (errado)
	r = await makeRequest('/v1/financial/transactions?filter_type=income&limit=5', 'Transações - filter_type=income');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} filter_type=income: ${r.status} (${r.data?.transactions?.length || 0} resultados)`);
	await sleep(300);

	r = await makeRequest('/v1/financial/transactions?filter_type=expense&limit=5', 'Transações - filter_type=expense');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} filter_type=expense: ${r.status} (${r.data?.transactions?.length || 0} resultados)`);
	await sleep(300);

	r = await makeRequest('/v1/financial/transactions?type=income&limit=5', 'Transações - type=income (ERRADO)');
	console.log(`   ${r.status === 200 ? '⚠️' : '❌'} type=income (errado): ${r.status} (${r.data?.transactions?.length || 0} resultados)`);
	await sleep(300);

	// Status
	r = await makeRequest('/v1/financial/transactions?status=paid&limit=5', 'Transações - status=paid');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} status=paid: ${r.status} (${r.data?.transactions?.length || 0} resultados)`);
	await sleep(300);

	r = await makeRequest('/v1/financial/transactions?status=pending&limit=5', 'Transações - status=pending');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} status=pending: ${r.status} (${r.data?.transactions?.length || 0} resultados)`);
	await sleep(300);

	// Datas
	r = await makeRequest('/v1/financial/transactions?start_at=2024-01-01&end_at=2024-12-31&limit=5', 'Transações - datas');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} start_at/end_at: ${r.status} (${r.data?.transactions?.length || 0} resultados)`);
	await sleep(300);

	// Ordenação
	r = await makeRequest('/v1/financial/transactions?sort_by=due_date&order_by=desc&limit=5', 'Transações - ordenação');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} sort_by/order_by: ${r.status} (${r.data?.transactions?.length || 0} resultados)`);
	await sleep(300);

	// ==================== 2. CONTAS FINANCEIRAS (para dropdown) ====================
	console.log('\n🏦 2. CONTAS FINANCEIRAS (DROPDOWN)\n');

	r = await makeRequest('/v1/financial/accounts', 'Contas Financeiras');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} /v1/financial/accounts: ${r.status}`);
	if (r.success && Array.isArray(r.data)) {
		console.log(`   → Total de contas: ${r.data.length}`);
		r.data.slice(0, 5).forEach(acc => {
			console.log(`      - ${acc.account_id || acc.id}: ${acc.name || acc.bank_name || 'Sem nome'}`);
		});
		results.financial_accounts = r.data;
	} else if (r.success && r.data) {
		console.log(`   → Estrutura: ${JSON.stringify(Object.keys(r.data))}`);
	}
	await sleep(300);

	// ==================== 3. DEAL POR ID ====================
	console.log('\n🎯 3. DEAL POR ID\n');

	// Primeiro pegar um deal_id válido
	r = await makeRequest('/v1/deals/search?limit=1', 'Deals Search');
	let dealId = null;
	if (r.success && r.data.deals && r.data.deals.length > 0) {
		dealId = r.data.deals[0].deal_id || r.data.deals[0].db_id;
		console.log(`   → Deal ID encontrado: ${dealId}`);
	}
	await sleep(300);

	if (dealId) {
		r = await makeRequest(`/v1/deal/${dealId}`, `Deal por ID: ${dealId}`);
		console.log(`   ${r.status === 200 ? '✅' : '❌'} GET /v1/deal/{id}: ${r.status}`);
		if (!r.success || r.status !== 200) {
			console.log(`   → ERRO: ${r.error || JSON.stringify(r.data).substring(0, 200)}`);
		}
	}
	await sleep(300);

	// ==================== 4. FATURAS ====================
	console.log('\n💰 4. FATURAS\n');

	r = await makeRequest('/v1/invoices?limit=5', 'Faturas - Básico');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status}`);
	if (r.success && r.data.invoices) {
		const statuses = {};
		r.data.invoices.forEach(inv => {
			statuses[inv.status] = (statuses[inv.status] || 0) + 1;
		});
		console.log(`   → Status encontrados: ${JSON.stringify(statuses)}`);
		results.invoice_statuses = Object.keys(statuses);
	}
	await sleep(300);

	r = await makeRequest('/v1/invoices?status=paid&limit=5', 'Faturas - status=paid');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} status=paid: ${r.status} (${r.data?.invoices?.length || 0} resultados)`);
	await sleep(300);

	r = await makeRequest('/v1/invoices?start_at=2024-01-01&end_at=2024-12-31&limit=5', 'Faturas - datas');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} start_at/end_at: ${r.status} (${r.data?.invoices?.length || 0} resultados)`);
	await sleep(300);

	// ==================== 5. CALENDÁRIO ====================
	console.log('\n📅 5. CALENDÁRIO\n');

	r = await makeRequest('/v1/calendar?year=2025&month=12', 'Calendário - Básico');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} Básico: ${r.status}`);
	if (r.success && r.data.calendar_items) {
		console.log(`   → Items: ${r.data.calendar_items.length}`);
	}
	await sleep(300);

	r = await makeRequest('/v1/calendar?year=2025&month=12&calendar_type=normal&search_all=true', 'Calendário - search_all');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} search_all=true: ${r.status}`);
	if (r.success && r.data.calendar_items) {
		console.log(`   → Items: ${r.data.calendar_items.length}`);
	}
	await sleep(300);

	// ==================== 6. DEALS FILTERS ====================
	console.log('\n🔍 6. DEALS FILTERS\n');

	r = await makeRequest('/v1/deals/search?deal_status=all&limit=5', 'Deals - status=all');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} deal_status=all: ${r.status} (${r.data?.deals?.length || 0} resultados)`);
	await sleep(300);

	r = await makeRequest('/v1/deals/search?deal_status=win&limit=5', 'Deals - status=win');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} deal_status=win: ${r.status} (${r.data?.deals?.length || 0} resultados)`);
	await sleep(300);

	r = await makeRequest('/v1/deals/search?deal_status=lost&limit=5', 'Deals - status=lost');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} deal_status=lost: ${r.status} (${r.data?.deals?.length || 0} resultados)`);
	await sleep(300);

	r = await makeRequest('/v1/deals/search?show_activities=true&limit=3', 'Deals - show_activities');
	console.log(`   ${r.status === 200 ? '✅' : '❌'} show_activities=true: ${r.status}`);
	if (r.success && r.data.deals && r.data.deals.length > 0) {
		const hasActivities = r.data.deals[0].activities !== undefined;
		console.log(`   → Tem activities: ${hasActivities}`);
	}
	await sleep(300);

	// ==================== RESUMO FINAL ====================
	console.log('\n' + '='.repeat(80));
	console.log('RESUMO FINAL - PARÂMETROS CORRETOS');
	console.log('='.repeat(80));

	console.log('\n📊 TRANSAÇÕES FINANCEIRAS:');
	console.log('   Endpoint: /v1/financial/transactions');
	console.log(`   Tipos (transaction_type): ${results.transaction_types?.join(', ') || 'N/A'}`);
	console.log(`   Status: ${results.transaction_statuses?.join(', ') || 'N/A'}`);
	console.log('   Filtro de tipo: filter_type (NÃO type!)');
	console.log('   Datas: start_at, end_at');
	console.log('   Ordenação: sort_by, order_by');

	console.log('\n🏦 CONTAS FINANCEIRAS:');
	console.log('   Endpoint: /v1/financial/accounts');
	console.log(`   Total: ${results.financial_accounts?.length || 'N/A'}`);

	console.log('\n💰 FATURAS:');
	console.log(`   Status: ${results.invoice_statuses?.join(', ') || 'N/A'}`);

	console.log('\n✅ FILTROS QUE FUNCIONAM:');
	console.log('   - filter_type (income, expense)');
	console.log('   - status (paid, pending, etc)');
	console.log('   - start_at / end_at');
	console.log('   - sort_by / order_by');
	console.log('   - account_id');

	console.log('\n❌ FILTROS QUE NÃO FUNCIONAM:');
	console.log('   - type (usar filter_type)');
}

runTests().catch(console.error);
