const https = require('https');

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoiMjAyNS0xMi0xMFQxMzowNzo1MC43MDM3MzVaIiwiaXNfdGhpcmRfcGFydHlfYWNjZXNzIjp0cnVlLCJ0aGlyZF9wYXJ0eV9hcHBfaWQiOiJoNTZDNGpqNXc3RjgifQ.mNrABlX_L88mBKG4isoKm5pnycR43J3b-3Wku8pBIFk';

const options = {
	hostname: 'api.imobzi.app',
	path: '/v1/financial/accounts',
	method: 'GET',
	headers: { 'X-Imobzi-Secret': API_KEY, 'Content-Type': 'application/json' },
};

const req = https.request(options, (res) => {
	let data = '';
	res.on('data', (chunk) => (data += chunk));
	res.on('end', () => {
		const json = JSON.parse(data);
		if (json.accounts && json.accounts.length > 0) {
			console.log('Exemplo de conta completa:');
			console.log(JSON.stringify(json.accounts[0], null, 2));
			console.log('\nTodas as contas:');
			json.accounts.forEach(acc => {
				console.log(`  - ID: ${acc.db_id || acc.id} | Nome: ${acc.name}`);
			});
		}
	});
});
req.end();
