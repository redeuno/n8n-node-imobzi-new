import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ImobziApi implements ICredentialType {
	name = 'imobziApi';
	displayName = 'Imobzi API';

	documentationUrl = 'https://developer.imobzi.com/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Sua chave de API da Imobzi. Obtenha em Integrações & Automações > Chave de API no painel do Imobzi.',
		},
	];

	// Autenticação usando o header X-Imobzi-Secret conforme documentação oficial
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Imobzi-Secret': '={{$credentials.apiKey}}',
				'Content-Type': 'application/json',
			},
		},
	};

	// Teste de conexão usando endpoint de usuários (funciona e retorna dados)
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.imobzi.app',
			url: '/v1/users',
			method: 'GET',
		},
	};
}
