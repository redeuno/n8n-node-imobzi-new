/**
 * Script de Mapeamento COMPLETO de Filtros da API Imobzi
 * Objetivo: Descobrir TODOS os filtros que funcionam em cada endpoint
 */

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoiMjAyNS0xMi0xMFQxMzowNzo1MC43MDM3MzVaIiwiaXNfdGhpcmRfcGFydHlfYWNjZXNzIjp0cnVlLCJ0aGlyZF9wYXJ0eV9hcHBfaWQiOiJoNTZDNGpqNXc3RjgifQ.mNrABlX_L88mBKG4isoKm5pnycR43J3b-3Wku8pBIFk';
const BASE_URL = 'https://api.imobzi.app';

async function apiRequest(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'X-Imobzi-Secret': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json().catch(() => null);
        return { status: response.status, ok: response.ok, data };
    } catch (error) {
        return { status: 0, ok: false, error: error.message };
    }
}

function getCount(data) {
    if (!data) return 0;
    if (Array.isArray(data)) return data.length;
    return data.contacts?.length || data.properties?.length || data.deals?.length || 
           data.invoices?.length || data.leases?.length || data.transactions?.length || 
           data.calendar_items?.length || data.count || '?';
}

// =====================================================
// CONTATOS - TESTAR TODOS OS FILTROS
// =====================================================
async function testarFiltrosContatos() {
    console.log('\n' + '='.repeat(70));
    console.log('👤 CONTATOS - FILTROS');
    console.log('='.repeat(70));
    
    const userId = 'P1ibK4GFPqZYKIx9e55RpQobt7J2'; // Antonio Carlos
    
    const filtros = [
        // Filtros básicos
        { nome: 'Sem filtro', url: '/v1/contacts?limit=5' },
        { nome: 'user_id', url: `/v1/contacts?user_id=${userId}&limit=5` },
        { nome: 'manager_id', url: `/v1/contacts?manager_id=${userId}&limit=5` },
        { nome: 'contact_type=person', url: '/v1/contacts?contact_type=person&limit=5' },
        { nome: 'contact_type=lead', url: '/v1/contacts?contact_type=lead&limit=5' },
        { nome: 'media_source=OLX', url: '/v1/contacts?media_source=OLX&limit=5' },
        { nome: 'tags=contact', url: '/v1/contacts?tags=contact&limit=5' },
        { nome: 'smart_list=my_contacts', url: '/v1/contacts?smart_list=my_contacts&limit=5' },
        { nome: 'smart_list=new_leads', url: '/v1/contacts?smart_list=new_leads&limit=5' },
        { nome: 'search_text=teste', url: '/v1/contacts?search_text=teste&limit=5' },
        { nome: 'search=teste', url: '/v1/contacts?search=teste&limit=5' },
        { nome: 'q=teste', url: '/v1/contacts?q=teste&limit=5' },
        
        // Testar endpoint de search
        { nome: '/contacts/search', url: '/v1/contacts/search?limit=5' },
        { nome: '/contacts/search com user_id', url: `/v1/contacts/search?user_id=${userId}&limit=5` },
    ];
    
    for (const f of filtros) {
        const res = await apiRequest(f.url);
        const status = res.ok ? '✅' : '❌';
        const count = getCount(res.data);
        console.log(`   ${status} ${f.nome}: ${count} (status: ${res.status})`);
    }
}

// =====================================================
// IMÓVEIS - TESTAR TODOS OS FILTROS
// =====================================================
async function testarFiltrosImoveis() {
    console.log('\n' + '='.repeat(70));
    console.log('🏠 IMÓVEIS - FILTROS');
    console.log('='.repeat(70));
    
    const userId = 'P1ibK4GFPqZYKIx9e55RpQobt7J2';
    
    const filtros = [
        { nome: 'Sem filtro', url: '/v1/properties?limit=5' },
        { nome: 'user_id', url: `/v1/properties?user_id=${userId}&limit=5` },
        { nome: 'broker_id', url: `/v1/properties?broker_id=${userId}&limit=5` },
        { nome: 'realtor_id', url: `/v1/properties?realtor_id=${userId}&limit=5` },
        { nome: 'agent_id', url: `/v1/properties?agent_id=${userId}&limit=5` },
        { nome: 'status=available', url: '/v1/properties?status=available&limit=5' },
        { nome: 'finality=rent', url: '/v1/properties?finality=rent&limit=5' },
        { nome: 'finality=sale', url: '/v1/properties?finality=sale&limit=5' },
        { nome: 'smart_list=available', url: '/v1/properties?smart_list=available&limit=5' },
        { nome: 'smart_list=rent', url: '/v1/properties?smart_list=rent&limit=5' },
        { nome: 'smart_list=sale', url: '/v1/properties?smart_list=sale&limit=5' },
        { nome: 'smart_list=my_properties', url: '/v1/properties?smart_list=my_properties&limit=5' },
        { nome: 'search=360', url: '/v1/properties?search=360&limit=5' },
        { nome: 'code=360', url: '/v1/properties?code=360&limit=5' },
    ];
    
    for (const f of filtros) {
        const res = await apiRequest(f.url);
        const status = res.ok ? '✅' : '❌';
        const count = getCount(res.data);
        console.log(`   ${status} ${f.nome}: ${count} (status: ${res.status})`);
    }
}

// =====================================================
// DEALS - TESTAR TODOS OS FILTROS
// =====================================================
async function testarFiltrosDeals() {
    console.log('\n' + '='.repeat(70));
    console.log('💼 DEALS - FILTROS');
    console.log('='.repeat(70));
    
    const userId = 'P1ibK4GFPqZYKIx9e55RpQobt7J2';
    const pipelineId = '4584666827849728'; // Oportunidades
    const pipelineGroupId = '5675099632959488'; // Geral de Negócios
    
    console.log('\n📌 Endpoint /v1/deals/search:');
    const filtrosSearch = [
        { nome: 'Sem filtro', url: '/v1/deals/search?limit=5' },
        { nome: 'user_id', url: `/v1/deals/search?user_id=${userId}&limit=5` },
        { nome: 'deal_status=all', url: '/v1/deals/search?deal_status=all&limit=5' },
        { nome: 'deal_status=open', url: '/v1/deals/search?deal_status=open&limit=5' },
        { nome: 'deal_status=won', url: '/v1/deals/search?deal_status=won&limit=5' },
        { nome: 'deal_status=win', url: '/v1/deals/search?deal_status=win&limit=5' },
        { nome: 'deal_status=lost', url: '/v1/deals/search?deal_status=lost&limit=5' },
        { nome: 'deal_type=rent', url: '/v1/deals/search?deal_type=rent&limit=5' },
        { nome: 'deal_type=sale', url: '/v1/deals/search?deal_type=sale&limit=5' },
        { nome: 'pipeline_id', url: `/v1/deals/search?pipeline_id=${pipelineId}&limit=5` },
        { nome: 'pipeline_stage_id', url: `/v1/deals/search?pipeline_stage_id=${pipelineId}&limit=5` },
        { nome: 'stage_id', url: `/v1/deals/search?stage_id=${pipelineId}&limit=5` },
        { nome: 'pipeline_group_id', url: `/v1/deals/search?pipeline_group_id=${pipelineGroupId}&limit=5` },
        { nome: 'show_activities=true', url: '/v1/deals/search?show_activities=true&limit=5' },
        { nome: 'with_activities=true', url: '/v1/deals/search?with_activities=true&limit=5' },
    ];
    
    for (const f of filtrosSearch) {
        const res = await apiRequest(f.url);
        const status = res.ok ? '✅' : '❌';
        const count = getCount(res.data);
        console.log(`   ${status} ${f.nome}: ${count} (status: ${res.status})`);
    }
    
    console.log('\n📌 Endpoint /v1/deals (Kanban):');
    const filtrosKanban = [
        { nome: 'Sem filtro', url: '/v1/deals' },
        { nome: 'user_id', url: `/v1/deals?user_id=${userId}` },
        { nome: 'user_id=all', url: '/v1/deals?user_id=all' },
        { nome: 'deal_status=all', url: '/v1/deals?deal_status=all' },
        { nome: 'deal_type=all', url: '/v1/deals?deal_type=all' },
        { nome: 'pipeline_group_id', url: `/v1/deals?pipeline_group_id=${pipelineGroupId}` },
    ];
    
    for (const f of filtrosKanban) {
        const res = await apiRequest(f.url);
        const status = res.ok ? '✅' : '❌';
        const keys = res.data ? Object.keys(res.data).slice(0, 3).join(', ') : 'N/A';
        console.log(`   ${status} ${f.nome}: keys=[${keys}...] (status: ${res.status})`);
    }
}

// =====================================================
// TRANSAÇÕES FINANCEIRAS - TESTAR TODOS OS FILTROS
// =====================================================
async function testarFiltrosTransacoes() {
    console.log('\n' + '='.repeat(70));
    console.log('💳 TRANSAÇÕES FINANCEIRAS - FILTROS');
    console.log('='.repeat(70));
    
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const startAt = inicioMes.toISOString().split('T')[0];
    const endAt = hoje.toISOString().split('T')[0];
    
    const filtros = [
        { nome: 'Sem filtro', url: '/v1/financial/transactions?limit=5' },
        { nome: 'start_at + end_at', url: `/v1/financial/transactions?start_at=${startAt}&end_at=${endAt}&limit=5` },
        { nome: 'periodType=this_month', url: `/v1/financial/transactions?periodType=this_month&limit=5` },
        { nome: 'period_type=this_month', url: `/v1/financial/transactions?period_type=this_month&limit=5` },
        { nome: 'order_by=due_date', url: '/v1/financial/transactions?order_by=due_date&limit=5' },
        { nome: 'sort_by=desc', url: '/v1/financial/transactions?sort_by=desc&limit=5' },
        { nome: 'account_id=5374237794631680', url: '/v1/financial/transactions?account_id=5374237794631680&limit=5' },
        { nome: 'type=income', url: '/v1/financial/transactions?type=income&limit=5' },
        { nome: 'type=expense', url: '/v1/financial/transactions?type=expense&limit=5' },
        { nome: 'transaction_type=income', url: '/v1/financial/transactions?transaction_type=income&limit=5' },
        { nome: 'status=paid', url: '/v1/financial/transactions?status=paid&limit=5' },
        { nome: 'status=pending', url: '/v1/financial/transactions?status=pending&limit=5' },
    ];
    
    for (const f of filtros) {
        const res = await apiRequest(f.url);
        const status = res.ok ? '✅' : '❌';
        const count = getCount(res.data);
        console.log(`   ${status} ${f.nome}: ${count} (status: ${res.status})`);
    }
    
    // Buscar contas bancárias para filtro
    console.log('\n📌 Contas Bancárias disponíveis:');
    const banks = await apiRequest('/v1/bank_accounts');
    if (banks.ok && Array.isArray(banks.data)) {
        banks.data.forEach(b => {
            console.log(`   - ID: ${b.bank_account_id || b.db_id}, Nome: ${b.name}`);
        });
    }
}

// =====================================================
// FATURAS - TESTAR TODOS OS FILTROS
// =====================================================
async function testarFiltrosFaturas() {
    console.log('\n' + '='.repeat(70));
    console.log('💰 FATURAS - FILTROS');
    console.log('='.repeat(70));
    
    const hoje = new Date();
    const mesPassado = new Date(hoje);
    mesPassado.setMonth(hoje.getMonth() - 1);
    const startAt = mesPassado.toISOString().split('T')[0];
    const endAt = hoje.toISOString().split('T')[0];
    
    const filtros = [
        { nome: 'Sem filtro', url: '/v1/invoices?limit=5' },
        { nome: 'status=pending', url: '/v1/invoices?status=pending&limit=5' },
        { nome: 'status=paid', url: '/v1/invoices?status=paid&limit=5' },
        { nome: 'status=overdue', url: '/v1/invoices?status=overdue&limit=5' },
        { nome: 'status=all', url: '/v1/invoices?status=all&limit=5' },
        { nome: 'payment_method=pix', url: '/v1/invoices?payment_method=pix&limit=5' },
        { nome: 'payment_method=bank_slip', url: '/v1/invoices?payment_method=bank_slip&limit=5' },
        { nome: 'start_at + end_at', url: `/v1/invoices?start_at=${startAt}&end_at=${endAt}&limit=5` },
        { nome: 'order_by=date', url: '/v1/invoices?order_by=date&limit=5' },
        { nome: 'sort_by=desc', url: '/v1/invoices?sort_by=desc&limit=5' },
        { nome: 'contract_type=all', url: '/v1/invoices?contract_type=all&limit=5' },
        { nome: 'contract_type=rent', url: '/v1/invoices?contract_type=rent&limit=5' },
        { nome: 'period=due_date', url: '/v1/invoices?period=due_date&limit=5' },
        { nome: 'period=paid_at', url: '/v1/invoices?period=paid_at&limit=5' },
    ];
    
    for (const f of filtros) {
        const res = await apiRequest(f.url);
        const status = res.ok ? '✅' : '❌';
        const count = getCount(res.data);
        console.log(`   ${status} ${f.nome}: ${count} (status: ${res.status})`);
    }
}

// =====================================================
// LOCAÇÃO - TESTAR TODOS OS FILTROS
// =====================================================
async function testarFiltrosLocacao() {
    console.log('\n' + '='.repeat(70));
    console.log('📋 LOCAÇÃO - FILTROS');
    console.log('='.repeat(70));
    
    const filtros = [
        { nome: 'Sem filtro', url: '/v1/leases?limit=5' },
        { nome: 'status=in_progress', url: '/v1/leases?status=in_progress&limit=5' },
        { nome: 'status=active', url: '/v1/leases?status=active&limit=5' },
        { nome: 'status=finished', url: '/v1/leases?status=finished&limit=5' },
        { nome: 'smart_list=active', url: '/v1/leases?smart_list=active&limit=5' },
        { nome: 'smart_list=expiring', url: '/v1/leases?smart_list=expiring&limit=5' },
        { nome: 'smart_list=all', url: '/v1/leases?smart_list=all&limit=5' },
    ];
    
    for (const f of filtros) {
        const res = await apiRequest(f.url);
        const status = res.ok ? '✅' : '❌';
        const count = getCount(res.data);
        console.log(`   ${status} ${f.nome}: ${count} (status: ${res.status})`);
    }
}

// =====================================================
// TESTAR CRUD COMPLETO
// =====================================================
async function testarCRUD() {
    console.log('\n' + '='.repeat(70));
    console.log('📝 CRUD - ENDPOINTS DISPONÍVEIS');
    console.log('='.repeat(70));
    
    // Testar métodos disponíveis para cada recurso
    const recursos = [
        { nome: 'Contact (Person)', create: '/v1/persons', update: '/v1/person/', delete: '/v1/person/' },
        { nome: 'Contact (Lead)', create: '/v1/leads', update: '/v1/lead/', delete: '/v1/lead/' },
        { nome: 'Property', create: '/v1/properties', update: '/v1/property/', delete: '/v1/property/' },
        { nome: 'Deal', create: '/v1/deals', update: '/v1/deal/', delete: '/v1/deal/' },
        { nome: 'Lease', create: '/v1/leases', update: '/v1/lease/', delete: '/v1/lease/' },
        { nome: 'Invoice', create: '/v1/invoices', update: '/v1/invoice/', delete: '/v1/invoice/' },
    ];
    
    for (const r of recursos) {
        console.log(`\n📌 ${r.nome}:`);
        
        // Testar CREATE (POST com body vazio para ver se endpoint existe)
        const createRes = await fetch(`${BASE_URL}${r.create}`, {
            method: 'POST',
            headers: { 'X-Imobzi-Secret': API_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }).then(res => ({ status: res.status })).catch(() => ({ status: 0 }));
        
        const createStatus = createRes.status === 422 ? '✅ Existe (422=falta dados)' :
                            createRes.status === 201 || createRes.status === 200 ? '✅ Funciona' :
                            createRes.status === 405 ? '❌ Não permitido' :
                            createRes.status === 401 ? '⚠️ Sem permissão' :
                            `❓ Status ${createRes.status}`;
        console.log(`   POST ${r.create}: ${createStatus}`);
        
        // Testar UPDATE (PATCH com ID fictício)
        const patchRes = await fetch(`${BASE_URL}${r.update}TEST_ID`, {
            method: 'PATCH',
            headers: { 'X-Imobzi-Secret': API_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }).then(res => ({ status: res.status })).catch(() => ({ status: 0 }));
        
        const patchStatus = patchRes.status === 422 || patchRes.status === 404 ? '✅ Existe' :
                           patchRes.status === 405 ? '❌ Não permitido' :
                           patchRes.status === 401 ? '⚠️ Sem permissão' :
                           `❓ Status ${patchRes.status}`;
        console.log(`   PATCH ${r.update}{id}: ${patchStatus}`);
        
        // Testar UPDATE via POST
        const postUpdateRes = await fetch(`${BASE_URL}${r.update}TEST_ID`, {
            method: 'POST',
            headers: { 'X-Imobzi-Secret': API_KEY, 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }).then(res => ({ status: res.status })).catch(() => ({ status: 0 }));
        
        const postUpdateStatus = postUpdateRes.status === 422 || postUpdateRes.status === 404 ? '✅ Existe' :
                                postUpdateRes.status === 405 ? '❌ Não permitido' :
                                postUpdateRes.status === 401 ? '⚠️ Sem permissão' :
                                `❓ Status ${postUpdateRes.status}`;
        console.log(`   POST ${r.update}{id} (update): ${postUpdateStatus}`);
        
        // Testar DELETE
        const deleteRes = await fetch(`${BASE_URL}${r.delete}TEST_ID`, {
            method: 'DELETE',
            headers: { 'X-Imobzi-Secret': API_KEY },
        }).then(res => ({ status: res.status })).catch(() => ({ status: 0 }));
        
        const deleteStatus = deleteRes.status === 422 || deleteRes.status === 404 ? '✅ Existe' :
                            deleteRes.status === 405 ? '❌ Não permitido' :
                            deleteRes.status === 401 ? '⚠️ Sem permissão' :
                            `❓ Status ${deleteRes.status}`;
        console.log(`   DELETE ${r.delete}{id}: ${deleteStatus}`);
    }
}

// =====================================================
// EXECUTAR TODOS OS TESTES
// =====================================================
async function main() {
    console.log('\n' + '🔍'.repeat(35));
    console.log('MAPEAMENTO COMPLETO DE FILTROS DA API IMOBZI');
    console.log('🔍'.repeat(35));
    
    await testarFiltrosContatos();
    await testarFiltrosImoveis();
    await testarFiltrosDeals();
    await testarFiltrosTransacoes();
    await testarFiltrosFaturas();
    await testarFiltrosLocacao();
    await testarCRUD();
    
    console.log('\n\n' + '='.repeat(70));
    console.log('✅ MAPEAMENTO CONCLUÍDO');
    console.log('='.repeat(70));
}

main().catch(console.error);

