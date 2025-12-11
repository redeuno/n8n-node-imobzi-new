import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHttpRequestMethods,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

/**
 * n8n-nodes-imobzi-latest v2.1.0
 * Configuração dos recursos da API Imobzi
 * Baseado em 101 testes reais - 11/12/2025
 */
interface ResourceConfig {
	endpoint: string;
	singularEndpoint?: string;
	dataKey?: string;
	paginationType: 'cursor' | 'next_page' | 'none';
}

const resourceConfig: { [resource: string]: ResourceConfig } = {
	contact: {
		endpoint: '/v1/contacts',
		singularEndpoint: '/v1/person',
		dataKey: 'contacts',
		paginationType: 'cursor',
	},
	property: {
		endpoint: '/v1/properties',
		singularEndpoint: '/v1/property',
		dataKey: 'properties',
		paginationType: 'cursor',
	},
	lease: {
		endpoint: '/v1/leases',
		singularEndpoint: '/v1/lease',
		dataKey: 'leases',
		paginationType: 'cursor',
	},
	invoice: {
		endpoint: '/v1/invoices',
		singularEndpoint: '/v1/invoice',
		dataKey: 'invoices',
		paginationType: 'next_page',
	},
	deal: {
		endpoint: '/v1/deals/search',
		dataKey: 'deals',
		paginationType: 'cursor',
	},
	dealByStage: {
		endpoint: '/v1/deals',
		paginationType: 'none',
	},
	transaction: {
		endpoint: '/v1/financial/transactions',
		dataKey: 'transactions',
		paginationType: 'next_page',
	},
	calendar: {
		endpoint: '/v1/calendar',
		dataKey: 'calendar_items',
		paginationType: 'none', // Calendário não pagina normalmente
	},
	document: {
		endpoint: '/v1/documents',
		dataKey: 'documents',
		paginationType: 'none',
	},
	user: {
		endpoint: '/v1/users',
		paginationType: 'none',
	},
	pipeline: {
		endpoint: '/v1/pipelines',
		paginationType: 'none',
	},
	pipelineGroup: {
		endpoint: '/v1/pipeline-groups',
		paginationType: 'none',
	},
	propertyType: {
		endpoint: '/v1/property-types',
		paginationType: 'none',
	},
	mediaSource: {
		endpoint: '/v1/media-sources',
		paginationType: 'none',
	},
	contactTag: {
		endpoint: '/v1/contacts/tags',
		dataKey: 'tags',
		paginationType: 'none',
	},
	lostReason: {
		endpoint: '/v1/deal/lost-reason',
		dataKey: 'deals_lost_reasons',
		paginationType: 'none',
	},
	bank: {
		endpoint: '/v1/banks',
		paginationType: 'none',
	},
};

export class Imobzi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi',
		name: 'imobzi',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 7, // v2.1.0
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integração com a API da Imobzi v2.1.0',
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
					{ name: 'Banco', value: 'bank' },
					{ name: 'Calendário', value: 'calendar' },
					{ name: 'Contato', value: 'contact' },
					{ name: 'Documento', value: 'document' },
					{ name: 'Estágio (Pipeline)', value: 'pipeline' },
					{ name: 'Fatura', value: 'invoice' },
					{ name: 'Funil (Deal)', value: 'deal' },
					{ name: 'Funil Por Estágio', value: 'dealByStage' },
					{ name: 'Grupo De Funil', value: 'pipelineGroup' },
					{ name: 'Imóvel', value: 'property' },
					{ name: 'Locação', value: 'lease' },
					{ name: 'Motivo De Perda', value: 'lostReason' },
					{ name: 'Origem (Media Source)', value: 'mediaSource' },
					{ name: 'Tag De Contato', value: 'contactTag' },
					{ name: 'Tipo De Imóvel', value: 'propertyType' },
					{ name: 'Transação Financeira', value: 'transaction' },
					{ name: 'Usuário', value: 'user' },
				],
				default: 'contact',
			},

			// ==================== OPERATIONS - CONTACT ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{ name: 'Buscar Por Código', value: 'getByCode', action: 'Buscar contato por c digo' },
					{ name: 'Criar', value: 'create', action: 'Criar contato' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar contatos' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter contato por ID' },
					{ name: 'Verificar Existência', value: 'checkExists', action: 'Verificar se contato existe' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - PROPERTY ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['property'],
					},
				},
				options: [
					{ name: 'Buscar Por Código', value: 'getByCode', action: 'Buscar im vel por c digo' },
					{ name: 'Estatísticas', value: 'statistics', action: 'Obter estat sticas do im vel' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar im veis' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter im vel por id' },
					{ name: 'Verificar Existência', value: 'checkPropertyExists', action: 'Verificar se im vel existe' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - LEASE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['lease'],
					},
				},
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Listar loca es' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter loca o por id' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - INVOICE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['invoice'],
					},
				},
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Listar faturas' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter fatura por ID' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - DEAL ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['deal'],
					},
				},
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Buscar deals lista plana' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - SIMPLE RESOURCES ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['transaction', 'calendar', 'document', 'user', 'pipeline', 'pipelineGroup', 'propertyType', 'mediaSource', 'contactTag', 'lostReason', 'bank', 'dealByStage'],
					},
				},
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Listar registros' },
				],
				default: 'getAll',
			},

			// ==================== ID FIELD ====================
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				default: '',
				description: 'ID do registro',
				displayOptions: {
					show: {
						operation: ['get', 'statistics'],
					},
					hide: {
						resource: ['contact'],
					},
				},
			},

			// ==================== CONTACT - TYPE FOR GET ====================
			{
				displayName: 'Tipo De Contato',
				name: 'contactType',
				type: 'options',
				required: true,
				default: 'person',
				options: [
					{ name: 'Lead', value: 'lead' },
					{ name: 'Organização', value: 'organization' },
					{ name: 'Pessoa', value: 'person' },
				],
				description: 'Tipo do contato',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['get', 'create', 'getByCode'],
					},
				},
			},

			// ==================== CONTACT - ID FIELD ====================
			{
				displayName: 'ID Do Contato',
				name: 'contactId',
				type: 'string',
				required: true,
				default: '',
				description: 'ID do contato (ex: 5352720932798464)',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['get'],
					},
				},
			},

			// ==================== CODE FIELD ====================
			{
				displayName: 'Código',
				name: 'code',
				type: 'string',
				required: true,
				default: '',
				description: 'Código do registro (ex: 326)',
				displayOptions: {
					show: {
						resource: ['contact', 'property'],
						operation: ['getByCode'],
					},
				},
			},
			{
				displayName: 'Código Do Imóvel',
				name: 'propertyCode',
				type: 'string',
				required: true,
				default: '',
				description: 'Código do imóvel para verificar existência',
				displayOptions: {
					show: {
						resource: ['property'],
						operation: ['checkPropertyExists'],
					},
				},
			},

			// ==================== CONTACT - CHECK EXISTS ====================
			{
				displayName: 'Buscar Por',
				name: 'checkExistsBy',
				type: 'options',
				required: true,
				default: 'email',
				options: [
					{ name: 'CNPJ', value: 'cnpj' },
					{ name: 'CPF', value: 'cpf' },
					{ name: 'Email', value: 'email' },
					{ name: 'Telefone', value: 'phone_number' },
				],
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['checkExists'],
					},
				},
			},
			{
				displayName: 'Valor',
				name: 'checkExistsValue',
				type: 'string',
				required: true,
				default: '',
				description: 'Valor para buscar (ex: email@exemplo.com)',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['checkExists'],
					},
				},
			},

			// ==================== CALENDAR REQUIRED FIELDS ====================
			{
				displayName: 'Ano',
				name: 'year',
				type: 'number',
				required: true,
				default: 2025,
				description: 'Ano (obrigatório para calendário)',
				displayOptions: {
					show: {
						resource: ['calendar'],
						operation: ['getAll'],
					},
				},
			},
			{
				displayName: 'Mês',
				name: 'month',
				type: 'options',
				required: true,
				default: 12,
				options: [
					{ name: 'Abril', value: 4 },
					{ name: 'Agosto', value: 8 },
					{ name: 'Dezembro', value: 12 },
					{ name: 'Fevereiro', value: 2 },
					{ name: 'Janeiro', value: 1 },
					{ name: 'Julho', value: 7 },
					{ name: 'Junho', value: 6 },
					{ name: 'Maio', value: 5 },
					{ name: 'Março', value: 3 },
					{ name: 'Novembro', value: 11 },
					{ name: 'Outubro', value: 10 },
					{ name: 'Setembro', value: 9 },
				],
				description: 'Mês (obrigatório para calendário)',
				displayOptions: {
					show: {
						resource: ['calendar'],
						operation: ['getAll'],
					},
				},
			},

			// ==================== AUTO-PAGINATION ====================
			{
				displayName: 'Quantidade De Registros',
				name: 'recordLimit',
				type: 'options',
				default: 50,
				options: [
					{ name: '50 Registros', value: 50 },
					{ name: '100 Registros', value: 100 },
					{ name: '200 Registros', value: 200 },
					{ name: '500 Registros', value: 500 },
					{ name: 'Todos (Máx 5000)', value: 5000 },
				],
				description: 'Quantidade máxima de registros (auto-paginação)',
				displayOptions: {
					show: {
						operation: ['getAll'],
						resource: ['contact', 'property', 'lease', 'invoice', 'deal', 'transaction'],
					},
				},
			},

			// ==================== CONTACT FILTERS ====================
			{
				displayName: 'Filtros',
				name: 'contactFilters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Busca',
						name: 'search_text',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Do Usuário',
						name: 'user_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Origem',
						name: 'media_source',
						type: 'string',
						default: '',
						description: 'Ex: OLX, Site, Facebook',
					},
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'options',
						default: '',
						options: [
							{ name: 'Com Negócios', value: 'with_deals' },
							{ name: 'Compartilhados Com Outros', value: 'shared_with_others' },
							{ name: 'Compartilhados Comigo', value: 'shared_with_me' },
							{ name: 'Desatualizados', value: 'out_of_date' },
							{ name: 'Inativos', value: 'inactives' },
							{ name: 'Meus Contatos', value: 'my_contacts' },
							{ name: 'Meus Leads', value: 'my_leads' },
							{ name: 'Novos Contatos', value: 'new_contacts' },
							{ name: 'Novos Leads', value: 'new_leads' },
							{ name: 'Pendentes', value: 'pending' },
							{ name: 'Sem Negócios', value: 'without_deals' },
							{ name: 'Todos', value: '' },
						],
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Ex: contact, owner',
					},
					{
						displayName: 'Tipo De Contato',
						name: 'contact_type',
						type: 'options',
						default: '',
						options: [
							{ name: 'Lead', value: 'lead' },
							{ name: 'Organização', value: 'organization' },
							{ name: 'Pessoa', value: 'person' },
							{ name: 'Todos', value: '' },
						],
					},
				],
			},

			// ==================== PROPERTY FILTERS ====================
			{
				displayName: 'Filtros',
				name: 'propertyFilters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['property'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Finalidade',
						name: 'finality',
						type: 'options',
						default: '',
						options: [
							{ name: 'Comercial', value: 'commercial' },
							{ name: 'Residencial', value: 'residential' },
							{ name: 'Rural', value: 'rural' },
							{ name: 'Todos', value: '' },
						],
					},
					{
						displayName: 'ID Do Corretor',
						name: 'user_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'options',
						default: '',
						options: [
							{ name: 'Atualizados', value: 'updated' },
							{ name: 'Compartilhados Com Outros', value: 'shared_with_others' },
							{ name: 'Compartilhados Comigo', value: 'shared_with_me' },
							{ name: 'Desatualizados', value: 'outdated' },
							{ name: 'Disponíveis', value: 'available' },
							{ name: 'Inativos', value: 'inactives' },
							{ name: 'Locação', value: 'rent' },
							{ name: 'Meus Imóveis', value: 'my_properties' },
							{ name: 'Novos', value: 'new_properties' },
							{ name: 'Publicados', value: 'site_publish' },
							{ name: 'Reservados', value: 'reserved' },
							{ name: 'Todos', value: '' },
							{ name: 'Venda', value: 'sale' },
						],
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						default: '',
						options: [
							{ name: 'Disponível', value: 'available' },
							{ name: 'Indisponível', value: 'unavailable' },
							{ name: 'Reservado', value: 'reserved' },
							{ name: 'Todos', value: '' },
						],
					},
				],
			},

			// ==================== LEASE FILTERS ====================
			{
				displayName: 'Filtros',
				name: 'leaseFilters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['lease'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'options',
						default: '',
						options: [
							{ name: 'Ativos', value: 'active' },
							{ name: 'Inativos', value: 'inactive' },
							{ name: 'Todos', value: '' },
						],
					},
				],
			},

			// ==================== INVOICE FILTERS ====================
			{
				displayName: 'Filtros',
				name: 'invoiceFilters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						default: '',
						options: [
							{ name: 'Atrasado', value: 'overdue' },
							{ name: 'Cancelado', value: 'cancelled' },
							{ name: 'Pago', value: 'paid' },
							{ name: 'Pendente', value: 'pending' },
							{ name: 'Todos', value: '' },
						],
					},
				],
			},

			// ==================== DEAL FILTERS ====================
			{
				displayName: 'Filtros',
				name: 'dealFilters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID Do Estágio (Pipeline)',
						name: 'pipeline_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Do Usuário',
						name: 'user_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Mostrar Atividades',
						name: 'show_activities',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Status',
						name: 'deal_status',
						type: 'options',
						default: 'all',
						options: [
							{ name: 'Desatualizado', value: 'out_of_date' },
							{ name: 'Em Progresso', value: 'in progress' },
							{ name: 'Estagnado', value: 'stagnant' },
							{ name: 'Ganho', value: 'win' },
							{ name: 'Perdido', value: 'lost' },
							{ name: 'Todos', value: 'all' },
						],
					},
				],
			},

			// ==================== DEAL BY STAGE FILTERS ====================
			{
				displayName: 'Filtros',
				name: 'dealByStageFilters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['dealByStage'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID Do Grupo De Funil',
						name: 'pipeline_group_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Do Usuário',
						name: 'user_id',
						type: 'string',
						default: '',
					},
				],
			},

			// ==================== CALENDAR FILTERS ====================
			{
				displayName: 'Filtros',
				name: 'calendarFilters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['calendar'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID Do Usuário',
						name: 'user_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Tipo De Item',
						name: 'item_type',
						type: 'options',
						default: '',
						options: [
							{ name: 'Chamada', value: 'call' },
							{ name: 'Tarefa', value: 'task' },
							{ name: 'Todos', value: '' },
							{ name: 'Visita', value: 'visit' },
							{ name: 'WhatsApp', value: 'whatsapp' },
						],
					},
				],
			},

			// ==================== CREATE BODY ====================
			{
				displayName: 'Dados (JSON)',
				name: 'body',
				type: 'json',
				default: '{}',
				description: 'Dados do registro em formato JSON',
				displayOptions: {
					show: {
						operation: ['create'],
					},
				},
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
				const qs: IDataObject = {};

				// ==================== BUILD REQUEST ====================
				switch (operation) {
					case 'checkExists': {
						endpoint = '/v1/contact/exists';
						const checkBy = this.getNodeParameter('checkExistsBy', itemIndex) as string;
						const checkValue = this.getNodeParameter('checkExistsValue', itemIndex) as string;
						qs[checkBy] = checkValue;
						break;
					}

					case 'checkPropertyExists': {
						endpoint = '/v1/property/exists';
						const propCode = this.getNodeParameter('propertyCode', itemIndex) as string;
						qs.code = propCode;
						break;
					}

					case 'getByCode': {
						const code = this.getNodeParameter('code', itemIndex) as string;
						if (resource === 'contact') {
							const contactType = this.getNodeParameter('contactType', itemIndex) as string;
							endpoint = `/v1/${contactType}/code/${code}`;
						} else if (resource === 'property') {
							endpoint = `/v1/property/code/${code}`;
						}
						break;
					}

					case 'get': {
						if (resource === 'contact') {
							const contactType = this.getNodeParameter('contactType', itemIndex) as string;
							const contactId = this.getNodeParameter('contactId', itemIndex) as string;
							endpoint = `/v1/${contactType}/${contactId}`;
						} else {
							const id = this.getNodeParameter('id', itemIndex) as string;
							endpoint = `${config.singularEndpoint || config.endpoint}/${id}`;
						}
						break;
					}

					case 'statistics': {
						const propId = this.getNodeParameter('id', itemIndex) as string;
						endpoint = `/v1/property/${propId}/statistics`;
						break;
					}

					case 'create': {
						method = 'POST';
						if (resource === 'contact') {
							const contactType = this.getNodeParameter('contactType', itemIndex) as string;
							const typeMap: { [key: string]: string } = {
								person: '/v1/persons',
								lead: '/v1/leads',
								organization: '/v1/organizations',
							};
							endpoint = typeMap[contactType] || '/v1/persons';
						}
						const bodyJson = this.getNodeParameter('body', itemIndex) as string;
						body = JSON.parse(bodyJson);
						break;
					}

					case 'getAll': {
						// Calendário: campos obrigatórios
						if (resource === 'calendar') {
							qs.year = this.getNodeParameter('year', itemIndex) as number;
							qs.month = this.getNodeParameter('month', itemIndex) as number;
						}

						// Aplicar filtros
						const filtersMap: { [key: string]: string } = {
							contact: 'contactFilters',
							property: 'propertyFilters',
							lease: 'leaseFilters',
							invoice: 'invoiceFilters',
							deal: 'dealFilters',
							dealByStage: 'dealByStageFilters',
							calendar: 'calendarFilters',
						};

						const filtersKey = filtersMap[resource];
						if (filtersKey) {
							const filters = this.getNodeParameter(filtersKey, itemIndex, {}) as IDataObject;
							for (const [key, value] of Object.entries(filters)) {
								if (value !== '' && value !== undefined && value !== null) {
									qs[key] = value;
								}
							}
						}

						// Limite
						if (config.paginationType !== 'none') {
							qs.limit = 50;
						}
						break;
					}
				}

				// ==================== EXECUTE REQUEST ====================
				
				// Operações simples (não getAll)
				if (operation !== 'getAll') {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method,
							url: endpoint,
							baseURL: 'https://api.imobzi.app',
							qs: Object.keys(qs).length > 0 ? qs : undefined,
							body,
							json: true,
						},
					);
					returnData.push({ json: response, pairedItem: itemIndex });
					continue;
				}

				// ==================== GET ALL ====================
				const allResults: IDataObject[] = [];

				// Recursos com paginação cursor
				if (config.paginationType === 'cursor') {
					const recordLimit = this.getNodeParameter('recordLimit', itemIndex, 50) as number;
					let cursor: string | undefined;

					do {
						if (cursor) {
							qs.cursor = cursor;
						}

						const response = await this.helpers.requestWithAuthentication.call(
							this,
							'imobziApi',
							{
								method: 'GET',
								url: endpoint,
								baseURL: 'https://api.imobzi.app',
								qs,
								json: true,
							},
						);

						// Extrair dados
						let pageData: IDataObject[] = [];
						if (config.dataKey && response[config.dataKey]) {
							pageData = response[config.dataKey] as IDataObject[];
						} else if (Array.isArray(response)) {
							pageData = response;
						}

						allResults.push(...pageData);

						// Próximo cursor
						cursor = response.cursor;

						// Parar se não há mais dados
						if (!cursor || pageData.length === 0 || allResults.length >= recordLimit) {
							break;
						}
					} while (true);

					// Retornar resultados
					for (const item of allResults.slice(0, recordLimit)) {
						returnData.push({ json: item, pairedItem: itemIndex });
					}
				}

				// Recursos com paginação next_page
				else if (config.paginationType === 'next_page') {
					const recordLimit = this.getNodeParameter('recordLimit', itemIndex, 50) as number;
					let page = 1;
					let hasMore = true;

					while (hasMore && allResults.length < recordLimit) {
						if (page > 1) {
							qs.next_page = page;
						}

						const response = await this.helpers.requestWithAuthentication.call(
							this,
							'imobziApi',
							{
								method: 'GET',
								url: endpoint,
								baseURL: 'https://api.imobzi.app',
								qs,
								json: true,
							},
						);

						// Extrair dados
						let pageData: IDataObject[] = [];
						if (config.dataKey && response[config.dataKey]) {
							pageData = response[config.dataKey] as IDataObject[];
						} else if (Array.isArray(response)) {
							pageData = response;
						}

						allResults.push(...pageData);

						// Verificar próxima página
						hasMore = response.next_page !== null && pageData.length > 0;
						page++;
					}

					// Retornar resultados
					for (const item of allResults.slice(0, recordLimit)) {
						returnData.push({ json: item, pairedItem: itemIndex });
					}
				}

				// Recursos sem paginação (user, bank, pipeline, etc)
				else {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'GET',
							url: endpoint,
							baseURL: 'https://api.imobzi.app',
							qs: Object.keys(qs).length > 0 ? qs : undefined,
							json: true,
						},
					);

					// Extrair dados - pode ser array direto ou ter dataKey
					let data: IDataObject[] = [];
					
					if (config.dataKey && response[config.dataKey]) {
						// Tem dataKey (tags, deals_lost_reasons, calendar_items, etc)
						data = response[config.dataKey] as IDataObject[];
					} else if (Array.isArray(response)) {
						// Array direto (users, banks, pipelines, media-sources)
						data = response;
					} else {
						// Objeto especial (dealByStage retorna estrutura diferente)
						returnData.push({ json: response, pairedItem: itemIndex });
						continue;
					}

					// Retornar cada item
					for (const item of data) {
						returnData.push({ json: item, pairedItem: itemIndex });
					}
				}

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: itemIndex,
					});
				} else {
					throw new NodeOperationError(this.getNode(), error, { itemIndex });
				}
			}
		}

		return [returnData];
	}
}
