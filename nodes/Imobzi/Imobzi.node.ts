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
interface ResourceConfig {
	endpoint: string;
	singularEndpoint?: string;
	codeEndpoint?: string;
	dataKey?: string;
}

const resourceConfig: { [resource: string]: ResourceConfig } = {
	contact: {
		endpoint: '/v1/contacts',
		singularEndpoint: '/v1/person',
		dataKey: 'contacts',
	},
	property: {
		endpoint: '/v1/properties',
		singularEndpoint: '/v1/property',
		codeEndpoint: '/v1/property/code',
		dataKey: 'properties',
	},
	lease: {
		endpoint: '/v1/leases',
		singularEndpoint: '/v1/lease',
		codeEndpoint: '/v1/lease/code',
		dataKey: 'leases',
	},
	contract: {
		endpoint: '/v1/contracts',
		singularEndpoint: '/v1/contract',
		codeEndpoint: '/v1/contract/code',
		dataKey: 'contracts',
	},
	invoice: {
		endpoint: '/v1/invoices',
		singularEndpoint: '/v1/invoice',
		dataKey: 'invoices',
	},
	deal: {
		endpoint: '/v1/deals',
		singularEndpoint: '/v1/deal',
	},
	pipeline: {
		endpoint: '/v1/pipelines',
		singularEndpoint: '/v1/pipeline',
	},
	pipelineGroup: {
		endpoint: '/v1/pipeline-groups',
	},
	financialTransaction: {
		endpoint: '/v1/financial-transactions',
		singularEndpoint: '/v1/financial-transaction',
	},
	calendar: {
		endpoint: '/v1/calendar',
		singularEndpoint: '/v1/calendar-item',
		dataKey: 'calendar_items',
	},
	user: {
		endpoint: '/v1/users',
		singularEndpoint: '/v1/user',
	},
	propertyType: {
		endpoint: '/v1/property-types',
	},
};

export class Imobzi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi',
		name: 'imobzi',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 5,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integração com a API da Imobzi - Plataforma de Gestão Imobiliária',
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
					{ name: 'Calendário', value: 'calendar' },
					{ name: 'Contato', value: 'contact' },
					{ name: 'Contrato', value: 'contract' },
					{ name: 'Fatura', value: 'invoice' },
					{ name: 'Funil (Pipeline)', value: 'pipeline' },
					{ name: 'Grupo De Funil', value: 'pipelineGroup' },
					{ name: 'Imóvel', value: 'property' },
					{ name: 'Locação', value: 'lease' },
					{ name: 'Negócio (Deal)', value: 'deal' },
					{ name: 'Tipo De Imóvel', value: 'propertyType' },
					{ name: 'Transação Financeira', value: 'financialTransaction' },
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
					{ name: 'Atualizar', value: 'update', action: 'Atualizar contato' },
					{ name: 'Criar', value: 'create', action: 'Criar contato' },
					{ name: 'Excluir', value: 'delete', action: 'Excluir contato' },
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
					{ name: 'Atualizar', value: 'update', action: 'Atualizar im vel' },
					{ name: 'Buscar Por Código', value: 'getByCode', action: 'Buscar im vel por c digo' },
					{ name: 'Criar', value: 'create', action: 'Criar im vel' },
					{ name: 'Excluir', value: 'delete', action: 'Excluir im vel' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar im veis' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter im vel por id' },
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
					{ name: 'Atualizar', value: 'update', action: 'Atualizar loca o' },
					{ name: 'Buscar Por Código', value: 'getByCode', action: 'Buscar loca o por c digo' },
					{ name: 'Criar', value: 'create', action: 'Criar loca o' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar loca es' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter loca o por id' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - CONTRACT ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contract'],
					},
				},
				options: [
					{ name: 'Atualizar', value: 'update', action: 'Atualizar contrato' },
					{ name: 'Buscar Por Código', value: 'getByCode', action: 'Buscar contrato por c digo' },
					{ name: 'Criar', value: 'create', action: 'Criar contrato' },
					{ name: 'Excluir', value: 'delete', action: 'Excluir contrato' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar contratos' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter contrato por ID' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - GENERIC ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user', 'deal', 'pipeline', 'financialTransaction', 'calendar', 'pipelineGroup', 'invoice', 'propertyType'],
					},
				},
				options: [
					{ name: 'Atualizar', value: 'update', action: 'Atualizar registro' },
					{ name: 'Criar', value: 'create', action: 'Criar registro' },
					{ name: 'Excluir', value: 'delete', action: 'Excluir registro' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar registros' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter registro por ID' },
				],
				default: 'getAll',
			},

			// ==================== ID FIELD (for get, update, delete - NOT contact) ====================
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
					hide: {
						resource: ['contact'],
					},
				},
			},

			// ==================== CONTACT - TYPE FOR GET/UPDATE/DELETE ====================
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
						operation: ['get', 'update', 'delete', 'create'],
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
				description: 'ID do contato (person_id, organization_id ou lead_id)',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['get', 'update', 'delete'],
					},
				},
			},

			// ==================== CODE FIELD (for getByCode) ====================
			{
				displayName: 'Código',
				name: 'code',
				type: 'string',
				required: true,
				default: '',
				description: 'Código do registro (ex: 326)',
				displayOptions: {
					show: {
						operation: ['getByCode'],
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
				description: 'Valor para buscar',
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
				default: new Date().getFullYear(),
				description: 'Ano para consulta do calendário',
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
				default: 1,
				options: [
					{ name: 'Janeiro', value: 1 },
					{ name: 'Fevereiro', value: 2 },
					{ name: 'Março', value: 3 },
					{ name: 'Abril', value: 4 },
					{ name: 'Maio', value: 5 },
					{ name: 'Junho', value: 6 },
					{ name: 'Julho', value: 7 },
					{ name: 'Agosto', value: 8 },
					{ name: 'Setembro', value: 9 },
					{ name: 'Outubro', value: 10 },
					{ name: 'Novembro', value: 11 },
					{ name: 'Dezembro', value: 12 },
				],
				description: 'Mês para consulta do calendário',
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
					{ name: 'Todos (Máx 1000)', value: 1000 },
				],
				description: 'Quantidade máxima de registros a retornar',
				displayOptions: {
					show: {
						operation: ['getAll'],
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
						description: 'Texto para busca',
					},
					{
						displayName: 'Data Fim',
						name: 'end_date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Data Início',
						name: 'start_date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Incluir Inativos',
						name: 'inactive',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Origem',
						name: 'media_source',
						type: 'options',
						default: '',
						options: [
							{ name: 'Facebook', value: 'Facebook' },
							{ name: 'Google', value: 'Google' },
							{ name: 'Indicação', value: 'Indicação' },
							{ name: 'Instagram', value: 'Instagram' },
							{ name: 'Nenhum', value: 'Nenhum' },
							{ name: 'OLX', value: 'OLX' },
							{ name: 'Outros', value: 'Outros' },
							{ name: 'Site', value: 'Site' },
							{ name: 'Todos', value: '' },
							{ name: 'WhatsApp', value: 'WhatsApp' },
						],
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Tags separadas por vírgula',
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
						displayName: 'Ordenar Por',
						name: 'order',
						type: 'options',
						default: '',
						options: [
							{ name: 'Código (Crescente)', value: 'code_asc' },
							{ name: 'Código (Decrescente)', value: 'code_desc' },
							{ name: 'Data De Atualização', value: 'updated_at' },
							{ name: 'Padrão', value: '' },
						],
					},
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'options',
						default: '',
						options: [
							{ name: 'Atualizados', value: 'updated' },
							{ name: 'Com Placa', value: 'with_plaque' },
							{ name: 'Compartilhados Comigo', value: 'shared_with_me' },
							{ name: 'Desatualizados', value: 'outdated' },
							{ name: 'Disponíveis', value: 'available' },
							{ name: 'Disponíveis E Reservados', value: 'available_reserved' },
							{ name: 'Edifícios', value: 'buildings' },
							{ name: 'Inativos', value: 'inactives' },
							{ name: 'Indisponíveis', value: 'unavailable_properties' },
							{ name: 'Locação', value: 'rent' },
							{ name: 'Meus Imóveis', value: 'my_properties' },
							{ name: 'Não Publicados', value: 'site_no_publish' },
							{ name: 'Novos', value: 'new_properties' },
							{ name: 'Pendentes', value: 'pending' },
							{ name: 'Publicados', value: 'site_publish' },
							{ name: 'Reservados', value: 'reserved' },
							{ name: 'Sem Fotos', value: 'without_photos' },
							{ name: 'Sem Proprietário', value: 'properties_without_owner' },
							{ name: 'Temporada', value: 'vacation_rental' },
							{ name: 'Terceiros', value: 'properties_third_party' },
							{ name: 'Todos', value: '' },
							{ name: 'Venda', value: 'sale' },
						],
					},
					{
						displayName: 'Todos Os Corretores',
						name: 'all_brokers',
						type: 'boolean',
						default: false,
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
						displayName: 'Busca',
						name: 'search_text',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Data Fim',
						name: 'end_at',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Data Início',
						name: 'start_at',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'ID Do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Do Proprietário',
						name: 'owner_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'options',
						default: '',
						options: [
							{ name: 'Ativos', value: 'active' },
							{ name: 'Encerrados', value: 'terminated' },
							{ name: 'Inativos', value: 'inactive' },
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
						displayName: 'Busca',
						name: 'search_text',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Do Contato',
						name: 'contact_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Do Grupo De Funil',
						name: 'pipeline_group_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Do Imóvel',
						name: 'property_id',
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
						displayName: 'Status',
						name: 'deal_status',
						type: 'options',
						default: '',
						options: [
							{ name: 'Aberto', value: 'open' },
							{ name: 'Ganho', value: 'won' },
							{ name: 'Perdido', value: 'lost' },
							{ name: 'Todos', value: '' },
						],
					},
					{
						displayName: 'Tipo',
						name: 'deal_type',
						type: 'options',
						default: '',
						options: [
							{ name: 'Locação', value: 'rent' },
							{ name: 'Todos', value: '' },
							{ name: 'Venda', value: 'sale' },
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
						displayName: 'ID Da Locação',
						name: 'lease_id',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Método De Pagamento',
						name: 'payment_method',
						type: 'options',
						default: '',
						options: [
							{ name: 'Boleto', value: 'bank_slip' },
							{ name: 'Cartão', value: 'credit_card' },
							{ name: 'Dinheiro', value: 'cash' },
							{ name: 'PIX', value: 'pix' },
							{ name: 'Todos', value: '' },
							{ name: 'Transferência', value: 'transfer' },
						],
					},
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
						displayName: 'Dia',
						name: 'day',
						type: 'number',
						default: 0,
						description: 'Dia específico (0 = todos)',
						typeOptions: {
							minValue: 0,
							maxValue: 31,
						},
					},
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
							{ name: 'Evento', value: 'event' },
							{ name: 'Lembrete', value: 'reminder' },
							{ name: 'Tarefa', value: 'task' },
							{ name: 'Todos', value: '' },
							{ name: 'Visita', value: 'visit' },
						],
					},
				],
			},

			// ==================== TRANSACTION FILTERS ====================
			{
				displayName: 'Filtros',
				name: 'transactionFilters',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				displayOptions: {
					show: {
						resource: ['financialTransaction'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Categoria',
						name: 'category',
						type: 'options',
						default: '',
						options: [
							{ name: 'Comissões', value: 'Comissões' },
							{ name: 'Despesas', value: 'Despesas Operacionais' },
							{ name: 'Receitas', value: 'Receitas' },
							{ name: 'Terceiros', value: 'Terceiros (Administração)' },
							{ name: 'Todas', value: '' },
						],
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						default: '',
						options: [
							{ name: 'Pago', value: 'paid' },
							{ name: 'Pendente', value: 'pending' },
							{ name: 'Todos', value: '' },
						],
					},
					{
						displayName: 'Tipo',
						name: 'transaction_type',
						type: 'options',
						default: '',
						options: [
							{ name: 'Despesa', value: 'expense' },
							{ name: 'Receita', value: 'income' },
							{ name: 'Repasse', value: 'onlending' },
							{ name: 'Todos', value: '' },
						],
					},
				],
			},

			// ==================== CREATE/UPDATE BODY ====================
			{
				displayName: 'Dados (JSON)',
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

				// ==================== SWITCH OPERATION ====================
				switch (operation) {
					// ==================== CHECK EXISTS ====================
					case 'checkExists': {
						method = 'GET';
						endpoint = '/v1/contact/exists';
						const checkBy = this.getNodeParameter('checkExistsBy', itemIndex) as string;
						const checkValue = this.getNodeParameter('checkExistsValue', itemIndex) as string;
						qs[checkBy] = checkValue;
						break;
					}

					// ==================== GET BY CODE ====================
					case 'getByCode': {
						method = 'GET';
						const code = this.getNodeParameter('code', itemIndex) as string;
						if (!config.codeEndpoint) {
							throw new NodeOperationError(this.getNode(), `Busca por código não disponível para "${resource}"`, { itemIndex });
						}
						endpoint = `${config.codeEndpoint}/${code}`;
						break;
					}

					// ==================== GET ALL ====================
					case 'getAll': {
						method = 'GET';
						endpoint = config.endpoint;

						// Calendário: campos obrigatórios
						if (resource === 'calendar') {
							qs.year = this.getNodeParameter('year', itemIndex) as number;
							qs.month = this.getNodeParameter('month', itemIndex) as number;
						}

						// Aplicar filtros por recurso
						const filtersMap: { [key: string]: string } = {
							contact: 'contactFilters',
							property: 'propertyFilters',
							lease: 'leaseFilters',
							deal: 'dealFilters',
							invoice: 'invoiceFilters',
							calendar: 'calendarFilters',
							financialTransaction: 'transactionFilters',
						};

						const filtersKey = filtersMap[resource];
						if (filtersKey) {
							const filters = this.getNodeParameter(filtersKey, itemIndex, {}) as IDataObject;
							for (const [key, value] of Object.entries(filters)) {
								if (value !== '' && value !== undefined && value !== null && value !== 0) {
									// Converter datas
									if (typeof value === 'string' && value.includes('T')) {
										qs[key] = value.split('T')[0];
									} else {
										qs[key] = value;
									}
								}
							}
						}

						qs.limit = 50; // Máximo da API
						break;
					}

					// ==================== GET ====================
					case 'get': {
						method = 'GET';
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

					// ==================== CREATE ====================
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
						try {
							body = JSON.parse(bodyJson);
						} catch {
							throw new NodeOperationError(this.getNode(), 'JSON inválido', { itemIndex });
						}
						break;
					}

					// ==================== UPDATE ====================
					case 'update': {
						method = 'POST';
						if (resource === 'contact') {
							const contactType = this.getNodeParameter('contactType', itemIndex) as string;
							const contactId = this.getNodeParameter('contactId', itemIndex) as string;
							endpoint = `/v1/${contactType}/${contactId}`;
						} else {
							const id = this.getNodeParameter('id', itemIndex) as string;
							endpoint = `${config.singularEndpoint || config.endpoint}/${id}`;
						}
						const updateBodyJson = this.getNodeParameter('body', itemIndex) as string;
						try {
							body = JSON.parse(updateBodyJson);
						} catch {
							throw new NodeOperationError(this.getNode(), 'JSON inválido', { itemIndex });
						}
						break;
					}

					// ==================== DELETE ====================
					case 'delete': {
						method = 'DELETE';
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
				}

				// ==================== EXECUTE REQUEST ====================
				if (operation === 'getAll') {
					// Auto-paginação
					const recordLimit = this.getNodeParameter('recordLimit', itemIndex, 50) as number;
					const allResults: IDataObject[] = [];
					let cursor: string | undefined;
					let pageCount = 0;
					const maxPages = Math.ceil(recordLimit / 50);

					do {
						if (cursor) {
							qs.cursor = cursor;
						}

						const response = await this.helpers.requestWithAuthentication.call(
							this,
							'imobziApi',
							{
								method,
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
						} else if (response.calendar_items) {
							pageData = response.calendar_items as IDataObject[];
						} else {
							// Resposta não é array - retornar como está
							returnData.push({ json: response, pairedItem: itemIndex });
							break;
						}

						allResults.push(...pageData);
						pageCount++;

						// Cursor para próxima página
						cursor = response.cursor || response._metadata?.cursor;

						// Condições de parada
						if (!cursor || allResults.length >= recordLimit || pageCount >= maxPages || pageData.length < 50) {
							break;
						}
					} while (true);

					// Retornar resultados
					const finalResults = allResults.slice(0, recordLimit);
					for (const item of finalResults) {
						returnData.push({
							json: {
								...item,
								_pagination: {
									total_fetched: finalResults.length,
									pages: pageCount,
								},
							},
							pairedItem: itemIndex,
						});
					}
				} else {
					// Requisição simples
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

					if (operation === 'delete') {
						returnData.push({
							json: { success: true, message: 'Registro excluído' },
							pairedItem: itemIndex,
						});
					} else {
						returnData.push({ json: response, pairedItem: itemIndex });
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
