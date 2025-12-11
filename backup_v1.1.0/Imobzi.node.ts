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
	dataKey?: string;
	idField?: string;
}

const resourceConfig: { [resource: string]: ResourceConfig } = {
	contact: {
		endpoint: '/v1/contacts',
		singularEndpoint: '/v1/contact',
		dataKey: 'contacts',
		idField: 'contact_id',
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
	user: {
		endpoint: '/v1/users',
		singularEndpoint: '/v1/user',
		dataKey: undefined,
		idField: 'db_id',
	},
	deal: {
		endpoint: '/v1/deals',
		singularEndpoint: '/v1/deal',
		dataKey: undefined,
		idField: 'deal_id',
	},
	pipeline: {
		endpoint: '/v1/pipelines',
		singularEndpoint: '/v1/pipeline',
		dataKey: undefined,
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
		dataKey: undefined,
		idField: 'webhook_id',
	},
	integration: {
		endpoint: '/v1/integrations',
		singularEndpoint: '/v1/integration',
		dataKey: undefined,
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
		version: 4,
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
						name: 'Bairro',
						value: 'neighborhood',
						description: 'Gerenciar bairros',
					},
					{
						name: 'Calendário',
						value: 'calendar',
						description: 'Gerenciar eventos do calendário (visitas, tarefas, etc)',
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
						description: 'Gerenciar contatos (pessoas, organizações e leads)',
					},
					{
						name: 'Contrato',
						value: 'contract',
						description: 'Gerenciar contratos de venda',
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
						name: 'Grupo De Funil',
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
						name: 'Tipo De Imóvel',
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
							'contact', 'property', 'contract', 'lease', 'user', 'deal',
							'pipeline', 'financialAccount', 'financialTransaction',
							'webhook', 'integration', 'calendar', 'pipelineGroup',
							'invoice', 'neighborhood', 'propertyType', 'financialCategory',
						],
					},
				},
				options: [
					{
						name: 'Atualizar',
						value: 'update',
						action: 'Atualizar registro',
						description: 'Atualizar um registro existente',
					},
					{
						name: 'Criar',
						value: 'create',
						action: 'Criar novo registro',
						description: 'Criar um novo registro',
					},
					{
						name: 'Excluir',
						value: 'delete',
						action: 'Excluir registro',
						description: 'Excluir um registro',
					},
					{
						name: 'Get Many',
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
						operation: ['get', 'update', 'delete'],
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
				description: 'Ano para consulta do calendário (obrigatório)',
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
				default: 1,
				description: 'Mês para consulta do calendário (obrigatório)',
				displayOptions: {
					show: {
						resource: ['calendar'],
						operation: ['getAll'],
					},
				},
			},

			// ==================== GENERAL OPTIONS ====================
			{
				displayName: 'Opções',
				name: 'options',
				type: 'collection',
				placeholder: 'Adicionar Opção',
				default: {},
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
					hide: {
						resource: ['calendar'],
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
						displayName: 'Data Fim',
						name: 'end_at',
						type: 'string',
						default: '',
						description: 'Data de fim para filtro (formato: YYYY-MM-DD)',
					},
					{
						displayName: 'Data Início',
						name: 'start_at',
						type: 'string',
						default: '',
						description: 'Data de início para filtro (formato: YYYY-MM-DD)',
					},
					{
						displayName: 'Limite',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
					},
					{
						displayName: 'Texto De Busca',
						name: 'search_text',
						type: 'string',
						default: '',
						description: 'Texto para busca',
					},
				],
			},

			// ==================== CONTACT OPTIONS ====================
			{
				displayName: 'Opções De Contato',
				name: 'contactOptions',
				type: 'collection',
				placeholder: 'Adicionar Opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID Do Gestor',
						name: 'manager_id',
						type: 'string',
						default: '',
						description: 'Filtrar por gestor responsável',
					},
					{
						displayName: 'Incluir Inativos',
						name: 'inactive',
						type: 'boolean',
						default: false,
						description: 'Whether to include inactive contacts',
					},
					{
						displayName: 'Origem',
						name: 'media_source',
						type: 'options',
						options: [
							{ name: 'Facebook', value: 'facebook' },
							{ name: 'Google', value: 'google' },
							{ name: 'Indicação', value: 'indication' },
							{ name: 'Instagram', value: 'instagram' },
							{ name: 'Nenhum', value: 'Nenhum' },
							{ name: 'OLX', value: 'olx' },
							{ name: 'Portal', value: 'portal' },
							{ name: 'Site', value: 'site' },
							{ name: 'Todos', value: '' },
							{ name: 'WhatsApp', value: 'whatsapp' },
							{ name: 'Zap Imóveis', value: 'zap' },
						],
						default: '',
						description: 'Origem do contato',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'options',
						options: [
							{ name: 'Contato', value: 'contact' },
							{ name: 'Fiador', value: 'fiador' },
							{ name: 'Inquilino', value: 'inquilino' },
							{ name: 'Lead', value: 'lead' },
							{ name: 'Proprietário', value: 'proprietário' },
							{ name: 'Todos', value: '' },
						],
						default: '',
						description: 'Filtrar por tag do contato',
					},
					{
						displayName: 'Tipo De Contato',
						name: 'contact_type',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Organização', value: 'organization' },
							{ name: 'Pessoa', value: 'person' },
						],
						default: '',
						description: 'Filtrar por tipo de contato',
					},
				],
			},

			// ==================== PROPERTY OPTIONS ====================
			{
				displayName: 'Opções De Imóvel',
				name: 'propertyOptions',
				type: 'collection',
				placeholder: 'Adicionar Opção',
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
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Comercial', value: 'commercial' },
							{ name: 'Residencial', value: 'residential' },
							{ name: 'Rural', value: 'rural' },
						],
						default: '',
						description: 'Finalidade do imóvel',
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
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'options',
						options: [
							{ name: 'Atualizados', value: 'updated' },
							{ name: 'Com Placa', value: 'with_plaque' },
							{ name: 'Compartilhados Com Outros', value: 'shared_with_others' },
							{ name: 'Compartilhados Comigo', value: 'shared_with_me' },
							{ name: 'Desatualizados', value: 'outdated' },
							{ name: 'Disponíveis', value: 'available' },
							{ name: 'Disponíveis E Reservados', value: 'available_reserved' },
							{ name: 'Edifícios', value: 'buildings' },
							{ name: 'Excedentes', value: 'exceeding' },
							{ name: 'Inativos', value: 'inactives' },
							{ name: 'Indisponíveis', value: 'unavailable_properties' },
							{ name: 'Locação', value: 'rent' },
							{ name: 'Meus Imóveis', value: 'my_properties' },
							{ name: 'Não Publicados No Site', value: 'site_no_publish' },
							{ name: 'Novos Imóveis', value: 'new_properties' },
							{ name: 'Pendentes', value: 'pending' },
							{ name: 'Publicados No Site', value: 'site_publish' },
							{ name: 'Reservados', value: 'reserved' },
							{ name: 'Sem Fotos', value: 'without_photos' },
							{ name: 'Sem Localização', value: 'without_location' },
							{ name: 'Sem Proprietário', value: 'properties_without_owner' },
							{ name: 'Temporada', value: 'vacation_rental' },
							{ name: 'Terceiros', value: 'properties_third_party' },
							{ name: 'Todos', value: '' },
							{ name: 'Venda', value: 'sale' },
						],
						default: '',
						description: 'Filtrar por lista inteligente',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Disponível', value: 'available' },
							{ name: 'Indisponível', value: 'unavailable' },
							{ name: 'Reservado', value: 'reserved' },
						],
						default: '',
						description: 'Status do imóvel',
					},
					{
						displayName: 'Todos Os Corretores',
						name: 'all_brokers',
						type: 'boolean',
						default: false,
						description: 'Whether to include properties from all brokers',
					},
				],
			},

			// ==================== LEASE OPTIONS ====================
			{
				displayName: 'Opções De Locação',
				name: 'leaseOptions',
				type: 'collection',
				placeholder: 'Adicionar Opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['lease'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID Do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'Filtrar por imóvel',
					},
					{
						displayName: 'ID Do Proprietário',
						name: 'owner_id',
						type: 'string',
						default: '',
						description: 'Filtrar por proprietário',
					},
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'options',
						options: [
							{ name: 'Ativos', value: 'active' },
							{ name: 'Encerrados', value: 'terminated' },
							{ name: 'Inativos', value: 'inactive' },
							{ name: 'Todos', value: '' },
							{ name: 'Vencendo Em 30 Dias', value: 'expiring_30' },
							{ name: 'Vencendo Em 60 Dias', value: 'expiring_60' },
							{ name: 'Vencendo Em 90 Dias', value: 'expiring_90' },
						],
						default: '',
						description: 'Filtrar por lista inteligente',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Ativo', value: 'active' },
							{ name: 'Encerrado', value: 'terminated' },
							{ name: 'Inativo', value: 'inactive' },
						],
						default: '',
						description: 'Status da locação',
					},
					{
						displayName: 'Tipo De Locação',
						name: 'lease_type',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Comercial', value: 'commercial' },
							{ name: 'Residencial', value: 'residential' },
							{ name: 'Temporada', value: 'vacation' },
						],
						default: '',
					},
				],
			},

			// ==================== DEAL OPTIONS ====================
			{
				displayName: 'Opções De Negócio',
				name: 'dealOptions',
				type: 'collection',
				placeholder: 'Adicionar Opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['deal'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID Do Contato',
						name: 'contact_id',
						type: 'string',
						default: '',
						description: 'Filtrar por contato',
					},
					{
						displayName: 'ID Do Grupo De Funil',
						name: 'pipeline_group_id',
						type: 'string',
						default: '',
						description: 'Filtrar por grupo de pipeline',
					},
					{
						displayName: 'ID Do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'Filtrar por imóvel',
					},
					{
						displayName: 'ID Do Usuário',
						name: 'user_id',
						type: 'string',
						default: '',
						description: 'Filtrar por usuário responsável',
					},
					{
						displayName: 'Status',
						name: 'deal_status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Aberto', value: 'open' },
							{ name: 'Ganho', value: 'won' },
							{ name: 'Perdido', value: 'lost' },
						],
						default: '',
						description: 'Status do negócio',
					},
					{
						displayName: 'Tipo',
						name: 'deal_type',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Locação', value: 'rent' },
							{ name: 'Venda', value: 'sale' },
						],
						default: '',
						description: 'Tipo de negócio',
					},
				],
			},

			// ==================== FINANCIAL TRANSACTION OPTIONS ====================
			{
				displayName: 'Opções De Transação',
				name: 'transactionOptions',
				type: 'collection',
				placeholder: 'Adicionar Opção',
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
						options: [
							{ name: 'Comissões', value: 'Comissões' },
							{ name: 'Despesas Operacionais', value: 'Despesas Operacionais' },
							{ name: 'Receitas', value: 'Receitas' },
							{ name: 'Terceiros (Administração)', value: 'Terceiros (Administração)' },
							{ name: 'Todas', value: '' },
							{ name: 'Transferências', value: 'Transferências' },
						],
						default: '',
						description: 'Categoria da transação',
					},
					{
						displayName: 'ID Da Conta',
						name: 'account_id',
						type: 'string',
						default: '',
						description: 'Filtrar por conta financeira',
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
						displayName: 'Ordenar Por',
						name: 'sort_by',
						type: 'options',
						options: [
							{ name: 'Data De Vencimento', value: 'due_date' },
							{ name: 'Data De Criação', value: 'created_at' },
							{ name: 'Valor', value: 'value' },
						],
						default: 'due_date',
						description: 'Campo para ordenação',
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
						displayName: 'Subcategoria',
						name: 'subcategory',
						type: 'options',
						options: [
							{ name: 'Todas', value: '' },
							{ name: 'Recebimento De Aluguel', value: 'Recebimento de Aluguel' },
							{ name: 'Repasse De Aluguel', value: 'Repasse de Aluguel' },
							{ name: 'Taxa De Administração', value: 'Taxa de Administração' },
						],
						default: '',
						description: 'Subcategoria da transação',
					},
					{
						displayName: 'Tipo',
						name: 'transaction_type',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Despesa', value: 'expense' },
							{ name: 'Receita', value: 'income' },
							{ name: 'Repasse', value: 'onlending' },
						],
						default: '',
						description: 'Tipo de transação',
					},
				],
			},

			// ==================== CALENDAR OPTIONS ====================
			{
				displayName: 'Opções De Calendário',
				name: 'calendarOptions',
				type: 'collection',
				placeholder: 'Adicionar Opção',
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
						typeOptions: {
							minValue: 0,
							maxValue: 31,
						},
						default: 0,
						description: 'Dia específico (0 = todos os dias do mês)',
					},
					{
						displayName: 'ID Do Time',
						name: 'team_id',
						type: 'string',
						default: '',
						description: 'Filtrar por time',
					},
					{
						displayName: 'ID Do Usuário',
						name: 'user_id',
						type: 'string',
						default: '',
						description: 'Filtrar por usuário',
					},
					{
						displayName: 'Tipo De Item',
						name: 'item_type',
						type: 'options',
						options: [
							{ name: 'Evento', value: 'event' },
							{ name: 'Lembrete', value: 'reminder' },
							{ name: 'Tarefa', value: 'task' },
							{ name: 'Todos', value: '' },
							{ name: 'Visita', value: 'visit' },
						],
						default: '',
						description: 'Tipo de item do calendário',
					},
				],
			},

			// ==================== CONTRACT OPTIONS ====================
			{
				displayName: 'Opções De Contrato',
				name: 'contractOptions',
				type: 'collection',
				placeholder: 'Adicionar Opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['contract'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID Do Imóvel',
						name: 'property_id',
						type: 'string',
						default: '',
						description: 'Filtrar por imóvel',
					},
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Ativos', value: 'active' },
							{ name: 'Concluídos', value: 'completed' },
							{ name: 'Pendentes', value: 'pending' },
						],
						default: '',
						description: 'Filtrar por lista inteligente',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Ativo', value: 'active' },
							{ name: 'Concluído', value: 'completed' },
							{ name: 'Pendente', value: 'pending' },
						],
						default: '',
						description: 'Status do contrato',
					},
				],
			},

			// ==================== INVOICE OPTIONS ====================
			{
				displayName: 'Opções De Fatura',
				name: 'invoiceOptions',
				type: 'collection',
				placeholder: 'Adicionar Opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'ID Da Conta',
						name: 'account_id',
						type: 'string',
						default: '',
						description: 'Filtrar por conta',
					},
					{
						displayName: 'ID Da Locação',
						name: 'lease_id',
						type: 'string',
						default: '',
						description: 'Filtrar por locação',
					},
					{
						displayName: 'ID Do Contrato',
						name: 'contract_id',
						type: 'string',
						default: '',
						description: 'Filtrar por contrato',
					},
					{
						displayName: 'Método De Pagamento',
						name: 'payment_method',
						type: 'options',
						options: [
							{ name: 'Boleto', value: 'bank_slip' },
							{ name: 'Cartão De Crédito', value: 'credit_card' },
							{ name: 'Dinheiro', value: 'cash' },
							{ name: 'PIX', value: 'pix' },
							{ name: 'Todos', value: '' },
							{ name: 'Transferência', value: 'transfer' },
						],
						default: '',
						description: 'Filtrar por método de pagamento',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Todos', value: '' },
							{ name: 'Atrasado', value: 'overdue' },
							{ name: 'Pago', value: 'paid' },
							{ name: 'Pendente', value: 'pending' },
						],
						default: '',
						description: 'Status da fatura',
					},
				],
			},

			// ==================== USER OPTIONS ====================
			{
				displayName: 'Opções De Usuário',
				name: 'userOptions',
				type: 'collection',
				placeholder: 'Adicionar Opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Busca Global',
						name: 'global_search',
						type: 'boolean',
						default: false,
						description: 'Whether to perform a global search',
					},
					{
						displayName: 'Email',
						name: 'user_email',
						type: 'string',
						default: '',
						description: 'Filtrar por email',
					},
					{
						displayName: 'Nome',
						name: 'user_name',
						type: 'string',
						default: '',
						description: 'Filtrar por nome',
					},
					{
						displayName: 'Todos Os Usuários',
						name: 'all_users',
						type: 'boolean',
						default: false,
						description: 'Whether to include all users',
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

			// ==================== ADDITIONAL PARAMS ====================
			{
				displayName: 'Parâmetros Adicionais',
				name: 'additionalParams',
				type: 'collection',
				placeholder: 'Adicionar Parâmetro',
				default: {},
				options: [
					{
						displayName: 'Parâmetros De Query',
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

				switch (operation) {
					case 'getAll': {
						method = 'GET';
						endpoint = config.endpoint;

						// Calendário tem campos obrigatórios separados
						if (resource === 'calendar') {
							const year = this.getNodeParameter('year', itemIndex) as number;
							const month = this.getNodeParameter('month', itemIndex) as number;
							qs.year = year;
							qs.month = month;

							const calendarOptions = this.getNodeParameter('calendarOptions', itemIndex, {}) as IDataObject;
							Object.keys(calendarOptions).forEach(key => {
								if (calendarOptions[key] !== '' && calendarOptions[key] !== undefined && calendarOptions[key] !== null && calendarOptions[key] !== 0) {
									qs[key] = calendarOptions[key];
								}
							});
						} else {
							// Opções gerais
							const options = this.getNodeParameter('options', itemIndex, {}) as IDataObject;
							if (options.cursor) qs.cursor = options.cursor;
							if (options.search_text) qs.search_text = options.search_text;
							if (options.start_at) qs.start_at = options.start_at;
							if (options.end_at) qs.end_at = options.end_at;
							if (options.limit) qs.limit = options.limit;
						}

						// Opções específicas por recurso
						const resourceOptionsMap: { [key: string]: string } = {
							contact: 'contactOptions',
							property: 'propertyOptions',
							lease: 'leaseOptions',
							deal: 'dealOptions',
							financialTransaction: 'transactionOptions',
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
						method = 'POST';
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
					response.forEach((item: IDataObject) => {
						returnData.push({ json: item, pairedItem: itemIndex });
					});
				} else if (operation === 'delete') {
					returnData.push({
						json: { success: true, message: 'Registro excluído com sucesso' },
						pairedItem: itemIndex,
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
