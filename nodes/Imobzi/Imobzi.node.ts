import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHttpRequestMethods,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

// Configuração dos recursos e endpoints da API Imobzi
// Baseado na documentação oficial: https://api.imobzi.app
interface ResourceConfig {
	endpoint: string;
	singularEndpoint?: string;
	dataKey?: string; // Chave onde os dados estão na resposta (ex: 'properties', 'contacts')
	idField?: string; // Campo de ID usado para GET/UPDATE/DELETE
}

const resourceConfig: { [resource: string]: ResourceConfig } = {
	contact: {
		endpoint: '/v1/contacts',
		singularEndpoint: '/v1/contact',
		dataKey: 'contacts',
		idField: 'contact_id',
	},
	person: {
		endpoint: '/v1/persons',
		singularEndpoint: '/v1/person',
		dataKey: 'contacts',
		idField: 'person_id',
	},
	organization: {
		endpoint: '/v1/organizations',
		singularEndpoint: '/v1/organization',
		dataKey: 'contacts',
		idField: 'organization_id',
	},
	lead: {
		endpoint: '/v1/leads',
		singularEndpoint: '/v1/lead',
		dataKey: 'contacts',
		idField: 'lead_id',
	},
	property: {
		endpoint: '/v1/properties',
		singularEndpoint: '/v1/property',
		dataKey: 'properties',
		idField: 'property_id',
	},
	contract: {
		endpoint: '/v1/contracts',
		singularEndpoint: '/v1/contract',
		dataKey: 'contracts',
		idField: 'contract_id',
	},
	lease: {
		endpoint: '/v1/leases',
		singularEndpoint: '/v1/lease',
		dataKey: 'leases',
		idField: 'lease_id',
	},
	document: {
		endpoint: '/v1/documents',
		singularEndpoint: '/v1/document',
		dataKey: 'documents',
		idField: 'document_id',
	},
	user: {
		endpoint: '/v1/users',
		singularEndpoint: '/v1/user',
		dataKey: undefined, // Array direto
		idField: 'db_id',
	},
	deal: {
		endpoint: '/v1/deals',
		singularEndpoint: '/v1/deal',
		dataKey: undefined, // Estrutura especial por stages
		idField: 'deal_id',
	},
	pipeline: {
		endpoint: '/v1/pipelines',
		singularEndpoint: '/v1/pipeline',
		dataKey: undefined, // Array direto
		idField: 'pipeline_id',
	},
	financialAccount: {
		endpoint: '/v1/financial/accounts',
		singularEndpoint: '/v1/financial/account',
		dataKey: 'accounts',
		idField: 'account_id',
	},
	financialTransaction: {
		endpoint: '/v1/financial/transactions',
		singularEndpoint: '/v1/financial/transaction',
		dataKey: 'transactions',
		idField: 'transaction_id',
	},
	webhook: {
		endpoint: '/v1/webhooks',
		singularEndpoint: '/v1/webhook',
		dataKey: undefined, // Array direto
		idField: 'webhook_id',
	},
	integration: {
		endpoint: '/v1/integrations',
		singularEndpoint: '/v1/integration',
		dataKey: undefined, // Array direto
		idField: 'integration_id',
	},
	calendar: {
		endpoint: '/v1/calendar',
		singularEndpoint: '/v1/calendar-item',
		dataKey: 'calendar',
		idField: 'calendar_id',
	},
	pipelineGroup: {
		endpoint: '/v1/pipeline-groups',
		singularEndpoint: '/v1/pipeline-groups',
		dataKey: undefined,
		idField: 'pipeline_group_id',
	},
	invoice: {
		endpoint: '/v1/invoices',
		singularEndpoint: '/v1/invoice',
		dataKey: 'invoices',
		idField: 'invoice_id',
	},
	neighborhood: {
		endpoint: '/v1/neighborhoods',
		singularEndpoint: '/v1/neighborhoods',
		dataKey: 'neighborhoods',
		idField: 'neighborhood_id',
	},
	propertyType: {
		endpoint: '/v1/property-types',
		singularEndpoint: '/v1/property-types',
		dataKey: undefined,
		idField: 'property_type_id',
	},
	financialCategory: {
		endpoint: '/v1/financial/categories',
		singularEndpoint: '/v1/financial/category',
		dataKey: undefined,
		idField: 'category_id',
	},
};

export class Imobzi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi',
		name: 'imobzi',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 3,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integração completa com a API da Imobzi - Plataforma de Gestão Imobiliária',
		defaults: {
			name: 'Imobzi',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'imobziApi',
				required: true,
			},
		],
		properties: [
			// ==================== RESOURCE ====================
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Calendário',
						value: 'calendar',
						description: 'Gerenciar eventos do calendário',
					},
					{
						name: 'Categoria Financeira',
						value: 'financialCategory',
						description: 'Gerenciar categorias financeiras',
					},
					{
						name: 'Conta Financeira',
						value: 'financialAccount',
						description: 'Gerenciar contas financeiras',
					},
					{
						name: 'Contato',
						value: 'contact',
						description: 'Gerenciar contatos (pessoas e organizações)',
					},
					{
						name: 'Contrato',
						value: 'contract',
						description: 'Gerenciar contratos de venda',
					},
					{
						name: 'Documento',
						value: 'document',
						description: 'Gerenciar documentos',
					},
					{
						name: 'Fatura',
						value: 'invoice',
						description: 'Gerenciar faturas',
					},
					{
						name: 'Funil (Pipeline)',
						value: 'pipeline',
						description: 'Gerenciar estágios do funil de vendas',
					},
					{
						name: 'Grupo de Funil',
						value: 'pipelineGroup',
						description: 'Gerenciar grupos de funil',
					},
					{
						name: 'Imóvel',
						value: 'property',
						description: 'Gerenciar imóveis',
					},
					{
						name: 'Integração',
						value: 'integration',
						description: 'Gerenciar integrações externas',
					},
					{
						name: 'Lead',
						value: 'lead',
						description: 'Gerenciar leads',
					},
					{
						name: 'Locação',
						value: 'lease',
						description: 'Gerenciar contratos de locação',
					},
					{
						name: 'Negócio (Deal)',
						value: 'deal',
						description: 'Gerenciar negócios/oportunidades',
					},
					{
						name: 'Organização',
						value: 'organization',
						description: 'Gerenciar organizações/empresas',
					},
					{
						name: 'Pessoa',
						value: 'person',
						description: 'Gerenciar pessoas físicas',
					},
					{
						name: 'Tipo de Imóvel',
						value: 'propertyType',
						description: 'Gerenciar tipos de imóveis',
					},
					{
						name: 'Transação Financeira',
						value: 'financialTransaction',
						description: 'Gerenciar transações financeiras',
					},
					{
						name: 'Usuário',
						value: 'user',
						description: 'Gerenciar usuários/corretores',
					},
					{
						name: 'Webhook',
						value: 'webhook',
						description: 'Gerenciar webhooks',
					},
				],
				default: 'contact',
			},

			// ==================== OPERATION ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'contact', 'person', 'organization', 'lead', 'property', 
							'contract', 'lease', 'document', 'user', 'deal', 
							'pipeline', 'financialAccount', 'financialTransaction', 
							'webhook', 'integration', 'calendar', 'pipelineGroup',
							'invoice', 'neighborhood', 'propertyType', 'financialCategory'
						],
					},
				},
				options: [
					{
						name: 'Criar',
						value: 'create',
						action: 'Criar novo registro',
						description: 'Criar um novo registro',
					},
					{
						name: 'Atualizar',
						value: 'update',
						action: 'Atualizar registro',
						description: 'Atualizar um registro existente',
					},
					{
						name: 'Excluir',
						value: 'delete',
						action: 'Excluir registro',
						description: 'Excluir um registro',
					},
					{
						name: 'Listar',
						value: 'getAll',
						action: 'Listar registros',
						description: 'Listar todos os registros',
					},
					{
						name: 'Obter',
						value: 'get',
						action: 'Obter registro',
						description: 'Obter um registro específico por ID',
					},
				],
				default: 'getAll',
			},

			// ==================== ID FIELD (para get, update, delete) ====================
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				default: '',
				description: 'ID do registro',
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
					},
				},
			},

			// ==================== FILTERS FOR GETALL ====================
			{
				displayName: 'Opções',
				name: 'options',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Cursor',
						name: 'cursor',
						type: 'string',
						default: '',
						description: 'Cursor para paginação (recebido na resposta anterior)',
					},
					{
						displayName: 'Texto de Busca',
						name: 'search_text',
						type: 'string',
						default: '',
						description: 'Texto para busca',
					},
					{
						displayName: 'Data Início',
						name: 'start_at',
						type: 'string',
						default: '',
						description: 'Data de início para filtro (formato: YYYY-MM-DD)',
					},
					{
						displayName: 'Data Fim',
						name: 'end_at',
						type: 'string',
						default: '',
						description: 'Data de fim para filtro (formato: YYYY-MM-DD)',
					},
					{
						displayName: 'Limite',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 100,
						},
						default: 50,
						description: 'Número máximo de registros a retornar',
					},
				],
			},

			// ==================== CONTACT SPECIFIC OPTIONS ====================
			{
				displayName: 'Opções de Contato',
				name: 'contactOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Tipo de Contato',
						name: 'contact_type',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Pessoa', value: 'person' },
							{ name: 'Organização', value: 'organization' },
						],
						default: '',
						description: 'Filtrar por tipo de contato',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Filtrar por tags (ex: proprietário, inquilino, lead)',
					},
					{
						displayName: 'Origem',
						name: 'media_source',
						type: 'string',
						default: '',
						description: 'Origem do contato (ex: site, portal)',
					},
					{
						displayName: 'ID do Gestor',
						name: 'manager_id',
						type: 'string',
						default: '',
						description: 'Filtrar por gestor responsável',
					},
					{
						displayName: 'Inativos',
						name: 'inactive',
						type: 'boolean',
						default: false,
						description: 'Whether to include inactive contacts',
					},
				],
			},

			// ==================== PROPERTY SPECIFIC OPTIONS ====================
			{
				displayName: 'Opções de Imóvel',
				name: 'propertyOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['property'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Todos os Corretores',
						name: 'all_brokers',
						type: 'boolean',
						default: false,
						description: 'Whether to include properties from all brokers',
					},
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'string',
						default: '',
						description: 'Filtrar por lista inteligente',
					},
					{
						displayName: 'Namespace',
						name: 'namespace',
						type: 'string',
						default: '',
						description: 'Namespace para filtro',
					},
					{
						displayName: 'Ordenar Por',
						name: 'order',
						type: 'string',
						default: '',
						description: 'Campo para ordenação',
					},
					{
						displayName: 'Mostrar Mapa',
						name: 'show_map',
						type: 'boolean',
						default: false,
						description: 'Whether to include map data',
					},
					{
						displayName: 'Mostrar Rede',
						name: 'show_network',
						type: 'boolean',
						default: false,
						description: 'Whether to include network properties',
					},
				],
			},

			// ==================== LEASE SPECIFIC OPTIONS ====================
			{
				displayName: 'Opções de Locação',
				name: 'leaseOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['lease'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID do Proprietário',
						name: 'owner_id',
						type: 'string',
						default: '',
						description: 'Filtrar por proprietário',
					},
					{
						displayName: 'ID do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'Filtrar por imóvel',
					},
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'string',
						default: '',
						description: 'Filtrar por lista inteligente',
					},
					{
						displayName: 'Tipo de Busca',
						name: 'search_type',
						type: 'string',
						default: '',
						description: 'Tipo de busca',
					},
				],
			},

			// ==================== DEAL SPECIFIC OPTIONS ====================
			{
				displayName: 'Opções de Negócio',
				name: 'dealOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID do Pipeline Group',
						name: 'pipeline_group_id',
						type: 'string',
						default: '',
						description: 'Filtrar por grupo de pipeline',
					},
					{
						displayName: 'Tipo de Deal',
						name: 'deal_type',
						type: 'string',
						default: '',
						description: 'Tipo de negócio',
					},
					{
						displayName: 'Status',
						name: 'deal_status',
						type: 'string',
						default: '',
						description: 'Status do negócio',
					},
					{
						displayName: 'ID do Usuário',
						name: 'user_id',
						type: 'string',
						default: '',
						description: 'Filtrar por usuário responsável',
					},
					{
						displayName: 'ID do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'Filtrar por imóvel',
					},
					{
						displayName: 'ID do Contato',
						name: 'contact_id',
						type: 'string',
						default: '',
						description: 'Filtrar por contato',
					},
				],
			},

			// ==================== FINANCIAL TRANSACTION OPTIONS ====================
			{
				displayName: 'Opções de Transação',
				name: 'transactionOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['financialTransaction'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID da Conta',
						name: 'account_id',
						type: 'string',
						default: '',
						description: 'Filtrar por conta financeira',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Pago', value: 'paid' },
							{ name: 'Pendente', value: 'pending' },
						],
						default: '',
						description: 'Status da transação',
					},
					{
						displayName: 'Tipo de Filtro',
						name: 'filter_type',
						type: 'string',
						default: '',
						description: 'Tipo de filtro',
					},
					{
						displayName: 'Categoria',
						name: 'category',
						type: 'string',
						default: '',
						description: 'Categoria da transação',
					},
					{
						displayName: 'Subcategoria',
						name: 'subcategory',
						type: 'string',
						default: '',
						description: 'Subcategoria da transação',
					},
					{
						displayName: 'Ordenar Por',
						name: 'sort_by',
						type: 'string',
						default: '',
						description: 'Campo para ordenação',
					},
					{
						displayName: 'Ordem',
						name: 'order_by',
						type: 'options',
						options: [
							{ name: 'Crescente', value: 'asc' },
							{ name: 'Decrescente', value: 'desc' },
						],
						default: 'desc',
						description: 'Direção da ordenação',
					},
					{
						displayName: 'Página',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Número da página',
					},
				],
			},

			// ==================== CALENDAR SPECIFIC OPTIONS ====================
			{
				displayName: 'Opções de Calendário',
				name: 'calendarOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['calendar'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Ano',
						name: 'year',
						type: 'number',
						default: new Date().getFullYear(),
						description: 'Ano para filtro',
					},
					{
						displayName: 'Mês',
						name: 'month',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 12,
						},
						default: new Date().getMonth() + 1,
						description: 'Mês para filtro (1-12)',
					},
					{
						displayName: 'Dia',
						name: 'day',
						type: 'number',
						default: 0,
						description: 'Dia para filtro (0 = todos os dias)',
					},
					{
						displayName: 'ID do Usuário',
						name: 'user_id',
						type: 'string',
						default: '',
						description: 'Filtrar por usuário',
					},
					{
						displayName: 'Tipo de Item',
						name: 'item_type',
						type: 'string',
						default: '',
						description: 'Tipo de item do calendário',
					},
					{
						displayName: 'ID do Time',
						name: 'team_id',
						type: 'string',
						default: '',
						description: 'Filtrar por time',
					},
				],
			},

			// ==================== DOCUMENT SPECIFIC OPTIONS ====================
			{
				displayName: 'Opções de Documento',
				name: 'documentOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['document'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'string',
						default: '',
						description: 'Status do documento',
					},
					{
						displayName: 'Tipo de Documento',
						name: 'document_type',
						type: 'string',
						default: '',
						description: 'Tipo do documento',
					},
					{
						displayName: 'ID do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'Filtrar por imóvel',
					},
					{
						displayName: 'ID do Contato',
						name: 'contact_id',
						type: 'string',
						default: '',
						description: 'Filtrar por contato',
					},
					{
						displayName: 'Tipo de Contato',
						name: 'contact_type',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Pessoa', value: 'person' },
							{ name: 'Organização', value: 'organization' },
						],
						default: '',
						description: 'Tipo do contato',
					},
				],
			},

			// ==================== CONTRACT SPECIFIC OPTIONS ====================
			{
				displayName: 'Opções de Contrato',
				name: 'contractOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['contract'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'string',
						default: '',
						description: 'Filtrar por lista inteligente',
					},
					{
						displayName: 'Tipo de Busca',
						name: 'search_type',
						type: 'string',
						default: '',
						description: 'Tipo de busca',
					},
					{
						displayName: 'ID do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'Filtrar por imóvel',
					},
				],
			},

			// ==================== INVOICE SPECIFIC OPTIONS ====================
			{
				displayName: 'Opções de Fatura',
				name: 'invoiceOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID da Conta',
						name: 'account_id',
						type: 'string',
						default: '',
						description: 'Filtrar por conta',
					},
					{
						displayName: 'ID da Locação',
						name: 'lease_id',
						type: 'string',
						default: '',
						description: 'Filtrar por locação',
					},
					{
						displayName: 'ID do Contrato',
						name: 'contract_id',
						type: 'string',
						default: '',
						description: 'Filtrar por contrato',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Pago', value: 'paid' },
							{ name: 'Pendente', value: 'pending' },
							{ name: 'Atrasado', value: 'overdue' },
						],
						default: '',
						description: 'Status da fatura',
					},
					{
						displayName: 'Método de Pagamento',
						name: 'payment_method',
						type: 'string',
						default: '',
						description: 'Método de pagamento',
					},
					{
						displayName: 'Página',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Número da página',
					},
				],
			},

			// ==================== USER SPECIFIC OPTIONS ====================
			{
				displayName: 'Opções de Usuário',
				name: 'userOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Email do Usuário',
						name: 'user_email',
						type: 'string',
						default: '',
						description: 'Filtrar por email',
					},
					{
						displayName: 'Nome do Usuário',
						name: 'user_name',
						type: 'string',
						default: '',
						description: 'Filtrar por nome',
					},
					{
						displayName: 'Todos os Usuários',
						name: 'all_users',
						type: 'boolean',
						default: false,
						description: 'Whether to include all users',
					},
					{
						displayName: 'Busca Global',
						name: 'global_search',
						type: 'boolean',
						default: false,
						description: 'Whether to perform a global search',
					},
				],
			},

			// ==================== CREATE/UPDATE BODY ====================
			{
				displayName: 'Dados',
				name: 'body',
				type: 'json',
				default: '{}',
				description: 'Dados do registro em formato JSON',
				displayOptions: {
					show: {
						operation: ['create', 'update'],
					},
				},
			},

			// ==================== ADDITIONAL OPTIONS ====================
			{
				displayName: 'Parâmetros Adicionais',
				name: 'additionalParams',
				type: 'collection',
				placeholder: 'Adicionar parâmetro',
				default: {},
				options: [
					{
						displayName: 'Parâmetros de Query',
						name: 'queryParams',
						type: 'json',
						default: '{}',
						description: 'Parâmetros adicionais para a query string em formato JSON',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const resource = this.getNodeParameter('resource', itemIndex) as string;
				const operation = this.getNodeParameter('operation', itemIndex) as string;
				
				const config = resourceConfig[resource];
				if (!config) {
					throw new NodeOperationError(this.getNode(), `Recurso "${resource}" não suportado!`, { itemIndex });
				}

				let method: IHttpRequestMethods = 'GET';
				let endpoint = config.endpoint;
				let body: IDataObject | undefined;
				let qs: IDataObject = {};

				// Processar operação
				switch (operation) {
					case 'getAll': {
						method = 'GET';
						endpoint = config.endpoint;
						
						// Opções gerais
						const options = this.getNodeParameter('options', itemIndex, {}) as IDataObject;
						if (options.cursor) qs.cursor = options.cursor;
						if (options.search_text) qs.search_text = options.search_text;
						if (options.start_at) qs.start_at = options.start_at;
						if (options.end_at) qs.end_at = options.end_at;
						if (options.limit) qs.limit = options.limit;

						// Opções específicas por recurso
						const resourceOptionsMap: { [key: string]: string } = {
							contact: 'contactOptions',
							property: 'propertyOptions',
							lease: 'leaseOptions',
							deal: 'dealOptions',
							financialTransaction: 'transactionOptions',
							calendar: 'calendarOptions',
							document: 'documentOptions',
							contract: 'contractOptions',
							invoice: 'invoiceOptions',
							user: 'userOptions',
						};

						const optionsKey = resourceOptionsMap[resource];
						if (optionsKey) {
							const specificOptions = this.getNodeParameter(optionsKey, itemIndex, {}) as IDataObject;
							Object.keys(specificOptions).forEach(key => {
								if (specificOptions[key] !== '' && specificOptions[key] !== undefined && specificOptions[key] !== null) {
									qs[key] = specificOptions[key];
								}
							});
						}
						break;
					}

					case 'get': {
						method = 'GET';
						const id = this.getNodeParameter('id', itemIndex) as string;
						endpoint = `${config.singularEndpoint || config.endpoint}/${id}`;
						break;
					}

					case 'create': {
						method = 'POST';
						endpoint = config.endpoint;
						const bodyJson = this.getNodeParameter('body', itemIndex) as string;
						try {
							body = JSON.parse(bodyJson);
						} catch {
							throw new NodeOperationError(this.getNode(), 'JSON inválido no campo "Dados"', { itemIndex });
						}
						break;
					}

					case 'update': {
						method = 'POST'; // A API Imobzi usa POST para update
						const id = this.getNodeParameter('id', itemIndex) as string;
						endpoint = `${config.singularEndpoint || config.endpoint}/${id}`;
						const updateBodyJson = this.getNodeParameter('body', itemIndex) as string;
						try {
							body = JSON.parse(updateBodyJson);
						} catch {
							throw new NodeOperationError(this.getNode(), 'JSON inválido no campo "Dados"', { itemIndex });
						}
						break;
					}

					case 'delete': {
						method = 'DELETE';
						const id = this.getNodeParameter('id', itemIndex) as string;
						endpoint = `${config.singularEndpoint || config.endpoint}/${id}`;
						break;
					}

					default:
						throw new NodeOperationError(this.getNode(), `Operação "${operation}" não suportada!`, { itemIndex });
				}

				// Adicionar parâmetros adicionais
				const additionalParams = this.getNodeParameter('additionalParams', itemIndex, {}) as IDataObject;
				if (additionalParams.queryParams) {
					try {
						const extraParams = JSON.parse(additionalParams.queryParams as string);
						qs = { ...qs, ...extraParams };
					} catch {
						// Ignorar se não for JSON válido
					}
				}

				// Fazer a requisição
				const response = await this.helpers.requestWithAuthentication.call(
					this,
					'imobziApi',
					{
						method,
						url: endpoint,
						baseURL: 'https://api.imobzi.app',
						qs: Object.keys(qs).length > 0 ? qs : undefined,
						body: body,
						json: true,
					},
				);

				// Processar resposta
				if (operation === 'getAll' && config.dataKey && response[config.dataKey]) {
					// Se tem dataKey, extrair os dados
					const data = response[config.dataKey];
					if (Array.isArray(data)) {
						data.forEach((item: IDataObject) => {
							returnData.push({
								json: {
									...item,
									_metadata: {
										cursor: response.cursor,
										count: response.count,
										total: response.total,
									},
								},
								pairedItem: itemIndex,
							});
						});
					} else {
						returnData.push({ json: response, pairedItem: itemIndex });
					}
				} else if (operation === 'getAll' && Array.isArray(response)) {
					// Se é array direto
					response.forEach((item: IDataObject) => {
						returnData.push({ json: item, pairedItem: itemIndex });
					});
				} else if (operation === 'delete') {
					returnData.push({ 
						json: { success: true, message: 'Registro excluído com sucesso' }, 
						pairedItem: itemIndex 
					});
				} else {
					returnData.push({ json: response, pairedItem: itemIndex });
				}

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ 
						json: { 
							error: error.message,
							details: error.description || error.cause || null,
						}, 
						pairedItem: itemIndex 
					});
				} else {
					throw new NodeOperationError(this.getNode(), error, { itemIndex });
				}
			}
		}

		return [returnData];
	}
}
