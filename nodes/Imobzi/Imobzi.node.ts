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
 * n8n-nodes-imobzi-latest v2.13.0
 * Configuração dos recursos da API Imobzi
 * Baseado em +250 testes reais da API - 14/12/2025
 *
 * FASE 1 COMPLETA + FASE 2 (v2.13.0):
 *
 * FASE 1 - CRUD Completo:
 * - TRANSAÇÃO: Get Many, Get by ID, Create, Update, Delete
 * - CALENDÁRIO: Get Many, Create, Update, Delete
 * - LOCAÇÃO: Get Many, Get by ID, Create, Update, Delete
 * - FATURA: Get Many, Get by ID, Create, Update
 *
 * FASE 2 - Novos Recursos:
 * - TIMELINE: Histórico do contato (notas, chamadas, visitas)
 * - PROPOSTA: Propostas de deals
 * - RESERVA DE IMÓVEL: Reservas vinculadas a deals
 * - MATCH DE IMÓVEIS: Imóveis compatíveis com perfil do cliente
 *
 * Correções v2.12.0 mantidas:
 * - DEALS: Status win, stagnant, property_radar, out_of_date
 * - DEALS: deal_type=rent
 * - CALENDÁRIO: item_type task, whatsapp, visit, call
 * - FATURAS: status=canceled (1 L)
 *
 * Descobertas da API (14/12/2025):
 * - Contatos: 16.064 | Deals: 2.434
 * - Tags: 57 | Media Sources: 38
 * - Pipeline Groups: 5 | Pipelines: 7
 *
 * Comportamento da API:
 * - /v1/deals REQUER user_id (all ou específico)
 * - /v1/calendar REQUER search_all=true OU user_id específico
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
		endpoint: '/v1/deals',
		dataKey: 'deals', // Será extraído da estrutura kanban
		paginationType: 'none', // /v1/deals não pagina, retorna tudo
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
	financialAccount: {
		endpoint: '/v1/financial/accounts',
		dataKey: 'accounts',
		paginationType: 'none',
	},
	// ==================== FASE 2: NOVOS RECURSOS ====================
	timeline: {
		endpoint: '/v1/timeline',
		dataKey: 'timeline',
		paginationType: 'cursor',
	},
	proposal: {
		endpoint: '/v1/proposal',
		singularEndpoint: '/v1/proposal',
		dataKey: 'proposals',
		paginationType: 'none',
	},
	propertyReserve: {
		endpoint: '/v1/property-reserves',
		singularEndpoint: '/v1/property-reserve',
		dataKey: 'reserves',
		paginationType: 'none',
	},
	propertyMatch: {
		endpoint: '/v1/deal',
		dataKey: 'properties',
		paginationType: 'cursor',
	},
};

export class Imobzi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi',
		name: 'imobzi',
		icon: 'file:imobzi.svg',
		group: ['transform'],
		version: 16, // v2.13.0
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integração com a API da Imobzi v2.13.0 - Fase 1 + Fase 2 Completas',
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
					{ name: 'Conta Financeira', value: 'financialAccount' },
					{ name: 'Contato', value: 'contact' },
					{ name: 'Documento', value: 'document' },
					{ name: 'Estágio (Pipeline)', value: 'pipeline' },
					{ name: 'Fatura', value: 'invoice' },
					{ name: 'Funil (Deal)', value: 'deal' },
					{ name: 'Funil Por Estágio', value: 'dealByStage' },
					{ name: 'Grupo De Funil', value: 'pipelineGroup' },
					{ name: 'Histórico (Timeline)', value: 'timeline' },
					{ name: 'Imóvel', value: 'property' },
					{ name: 'Locação', value: 'lease' },
					{ name: 'Match De Imóvei', value: 'propertyMatch' },
					{ name: 'Motivo De Perda', value: 'lostReason' },
					{ name: 'Origem (Media Source)', value: 'mediaSource' },
					{ name: 'Proposta', value: 'proposal' },
					{ name: 'Reserva De Imóvel', value: 'propertyReserve' },
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
					{ name: 'Atualizar', value: 'update', action: 'Atualizar contato' },
					{ name: 'Buscar Por Código', value: 'getByCode', action: 'Buscar contato por c digo' },
					{ name: 'Criar', value: 'create', action: 'Criar contato' },
					{ name: 'Deletar', value: 'delete', action: 'Deletar contato' },
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
					{ name: 'Deletar', value: 'delete', action: 'Deletar im vel' },
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
					{ name: 'Atualizar', value: 'update', action: 'Atualizar loca o' },
					{ name: 'Criar', value: 'create', action: 'Criar loca o' },
					{ name: 'Deletar', value: 'delete', action: 'Deletar loca o' },
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
					{ name: 'Atualizar', value: 'update', action: 'Atualizar fatura' },
					{ name: 'Criar', value: 'create', action: 'Criar fatura' },
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
					{ name: 'Atualizar', value: 'update', action: 'Atualizar deal' },
					{ name: 'Criar', value: 'create', action: 'Criar deal' },
					{ name: 'Get Many', value: 'getAll', action: 'Buscar deals lista plana' },
					{ name: '⚠️ Obter Por ID (Bug API)', value: 'get', action: 'Obter deal por ID bug na api' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - TRANSACTION ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['transaction'],
					},
				},
				options: [
					{ name: 'Atualizar', value: 'update', action: 'Atualizar transa o' },
					{ name: 'Criar', value: 'create', action: 'Criar transa o' },
					{ name: 'Deletar', value: 'delete', action: 'Deletar transa o' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar transa es' },
					{ name: 'Obter Por ID', value: 'get', action: 'Obter transa o por id' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - CALENDAR ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['calendar'],
					},
				},
				options: [
					{ name: 'Atualizar', value: 'update', action: 'Atualizar atividade' },
					{ name: 'Criar', value: 'create', action: 'Criar atividade' },
					{ name: 'Deletar', value: 'delete', action: 'Deletar atividade' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar atividades' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - TIMELINE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
		displayOptions: {
			show: {
						resource: ['timeline'],
					},
				},
				options: [
					{ name: 'Criar Nota', value: 'create', action: 'Criar nota no hist rico' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar hist rico' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - PROPOSAL ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['proposal'],
					},
				},
				options: [
					{ name: 'Atualizar', value: 'update', action: 'Atualizar proposta' },
					{ name: 'Criar', value: 'create', action: 'Criar proposta' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar propostas' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - PROPERTY RESERVE ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['propertyReserve'],
					},
				},
				options: [
					{ name: 'Cancelar', value: 'delete', action: 'Cancelar reserva' },
					{ name: 'Criar', value: 'create', action: 'Criar reserva' },
					{ name: 'Get Many', value: 'getAll', action: 'Listar reservas' },
				],
				default: 'getAll',
			},

			// ==================== OPERATIONS - PROPERTY MATCH ====================
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['propertyMatch'],
					},
				},
				options: [
					{ name: 'Get Many', value: 'getAll', action: 'Listar im veis compat veis' },
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
						resource: ['document', 'user', 'pipeline', 'pipelineGroup', 'propertyType', 'mediaSource', 'contactTag', 'lostReason', 'bank', 'dealByStage', 'financialAccount'],
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
						operation: ['get', 'statistics', 'update', 'delete'],
					},
					hide: {
						resource: ['contact'],
					},
				},
			},

			// ==================== CONTACT - TYPE FOR OPERATIONS ====================
			{
				displayName: 'Tipo De Contato',
				name: 'contactType',
				type: 'options',
				required: true,
				default: 'person',
				options: [
					{ name: '⚠️ Lead (Buscar Por Código Não Funciona)', value: 'lead' },
					{ name: '⚠️ Organização (Buscar Por Código Não Funciona)', value: 'organization' },
					{ name: 'Pessoa', value: 'person' },
				],
				description: 'Tipo do contato. ⚠️ ATENÇÃO: "Buscar Por Código" só funciona para tipo "Pessoa".',
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['get', 'create', 'getByCode', 'update', 'delete'],
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
						operation: ['get', 'update', 'delete'],
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
				description: 'Código do registro (ex: 326). ⚠️ Para contatos, só funciona com tipo "Pessoa". Lead e Organização retornam 404.',
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
				description: '⚠️ ATENÇÃO: Este endpoint pode retornar resultados incorretos. Use "Buscar Por Código" para verificação confiável.',
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

			// ==================== TIMELINE REQUIRED FIELDS ====================
			{
				displayName: 'ID Do Contato',
				name: 'timelineContactId',
				type: 'string',
				required: true,
				default: '',
				description: 'ID do contato para buscar o histórico',
				displayOptions: {
					show: {
						resource: ['timeline'],
						operation: ['getAll', 'create'],
					},
				},
			},
			{
				displayName: 'Tipo De Contato',
				name: 'timelineContactType',
				type: 'options',
				default: 'person',
				options: [
					{ name: 'Lead', value: 'lead' },
					{ name: 'Organização', value: 'organization' },
					{ name: 'Pessoa', value: 'person' },
				],
				displayOptions: {
					show: {
						resource: ['timeline'],
						operation: ['getAll', 'create'],
					},
				},
			},
			{
				displayName: 'ID Do Deal (Opcional)',
				name: 'timelineDealId',
				type: 'string',
				default: '',
				description: 'ID do deal para filtrar histórico (opcional)',
				displayOptions: {
					show: {
						resource: ['timeline'],
						operation: ['getAll'],
					},
				},
			},

			// ==================== PROPOSAL REQUIRED FIELDS ====================
			{
				displayName: 'ID Do Deal',
				name: 'proposalDealId',
				type: 'string',
				required: true,
				default: '',
				description: 'ID do deal para buscar/criar propostas',
				displayOptions: {
					show: {
						resource: ['proposal'],
					},
				},
			},

			// ==================== PROPERTY RESERVE REQUIRED FIELDS ====================
			{
				displayName: 'ID Do Deal',
				name: 'reserveDealId',
				type: 'string',
				required: true,
				default: '',
				description: 'ID do deal para buscar/criar reservas',
				displayOptions: {
					show: {
						resource: ['propertyReserve'],
					},
				},
			},

			// ==================== PROPERTY MATCH REQUIRED FIELDS ====================
			{
				displayName: 'ID Do Deal',
				name: 'matchDealId',
				type: 'string',
				required: true,
				default: '',
				description: 'ID do deal para buscar imóveis compatíveis',
				displayOptions: {
					show: {
						resource: ['propertyMatch'],
					},
				},
			},
			{
				displayName: 'ID Do Perfil (Opcional)',
				name: 'matchProfileId',
				type: 'string',
				default: '',
				description: 'ID do perfil do cliente para match (opcional)',
				displayOptions: {
					show: {
						resource: ['propertyMatch'],
					},
				},
			},

			// ==================== TRANSACTION ID FIELD ====================
			{
				displayName: 'ID Da Transação',
				name: 'transactionId',
				type: 'string',
				required: true,
				default: '',
				description: 'ID da transação financeira',
				displayOptions: {
					show: {
						resource: ['transaction'],
						operation: ['get', 'update', 'delete'],
					},
				},
			},

			// ==================== CALENDAR ID FIELD ====================
			{
				displayName: 'ID Da Atividade',
				name: 'calendarItemId',
				type: 'string',
				required: true,
				default: '',
				description: 'ID da atividade do calendário',
				displayOptions: {
					show: {
						resource: ['calendar'],
						operation: ['update', 'delete'],
					},
				},
			},

			// ==================== LEASE ID FIELD ====================
			{
				displayName: 'ID Da Locação',
				name: 'leaseId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['lease'],
						operation: ['update', 'delete'],
					},
				},
			},

			// ==================== INVOICE ID FIELD ====================
			{
				displayName: 'ID Da Fatura',
				name: 'invoiceId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['update'],
					},
				},
			},

			// ==================== RESERVE ID FIELD ====================
			{
				displayName: 'ID Da Reserva',
				name: 'reserveId',
				type: 'string',
				required: true,
				default: '',
				description: 'ID da reserva para cancelar',
				displayOptions: {
					show: {
						resource: ['propertyReserve'],
						operation: ['delete'],
					},
				},
			},

			// ==================== PROPOSAL ID FIELD ====================
			{
				displayName: 'ID Da Proposta',
				name: 'proposalId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['proposal'],
						operation: ['update'],
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
					displayName: '⚠️ Usuário Responsável (Não Funciona)',
					name: 'user_id',
								type: 'options',
								default: '',
								options: [
						{ name: 'Antonio Carlos', value: 'P1ibK4GFPqZYKIx9e55RpQobt7J2' },
						{ name: 'Bruno Mantovani', value: 'SYkMqS5aInfpP1p9m9MV0AufW0p1' },
						{ name: 'Campo Grande MS', value: 'qLIwracS5yUk1UIvNmMCjtYgAf62' },
						{ name: 'Cleilson Nantes Nogueira', value: 'Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3' },
						{ name: 'Daiana Ferrarezi', value: 'ofIHYjFl8NeToYGDXMonzIbRRlB2' },
						{ name: 'Débora Fonseca Mendonça', value: 'LowszB3ZUhQqfG8ZZWTBKJIFojs1' },
						{ name: 'Euclides Rebouças', value: 'o2dk6UuXiIMKdPsvx1fxADhd8L12' },
						{ name: 'Fernando Abreu', value: '9luRJzY8rIOvvok5NHXppiOnYC13' },
						{ name: 'Julia Sardim', value: 'W92lLWUuymdsoN5KZjXHzv32uPs1' },
						{ name: 'Leandro Velasco', value: 'd5exMkdlYDYBGCnLRV76F0OhOCi2' },
						{ name: 'Lidiane Rocha', value: 'liGnEe9aOea2t0sc0ZkrSa8iXF62' },
						{ name: 'Mariana Cabriotti', value: 'QTEm89uOqdavsUDZpALJdNJKgws1' },
						{ name: 'Mario Otavio', value: 'PBuvhWtM1pZD3ONzKsAiJ14BdHF3' },
						{ name: 'Nilson Silva', value: 'B97MLMQ5hTPhPCiwu20RZtu8mpI3' },
						{ name: 'Sthéfano Ferro', value: 'pMhjLYu0zYXV02SLtUqeUMx5pwh2' },
						{ name: 'Todos Os Usuários', value: '' },
						{ name: 'Yan Caliel', value: 'inijJ4kWVtfU6R4oN4nP5odF6SE3' },
					],
					description: '⚠️ Este filtro NÃO funciona na API /contacts - sempre retorna todos os contatos',
				},
				{
					displayName: 'Busca',
					name: 'search_text',
								type: 'string',
								default: '',
					description: 'Buscar por nome, email ou telefone',
				},
				{
					displayName: 'Origem',
					name: 'media_source',
								type: 'options',
								default: '',
					options: [
						{ name: 'Ação Externa', value: 'Ação Externa ' },
						{ name: 'Amigos E Parentes', value: 'Amigos e Parentes' },
						{ name: 'Avaliador', value: 'Avaliador' },
						{ name: 'By Brokers', value: 'By Brokers' },
						{ name: 'Campo Grande News', value: 'Campo Grande News' },
						{ name: 'Casa Mineira - OpenNavent', value: 'Casa Mineira - OpenNavent' },
						{ name: 'Chatbot', value: 'Chatbot' },
						{ name: 'Chaves Na Mão', value: 'Chaves na Mão' },
						{ name: 'Cold Call 20K+', value: 'Cold Call 20K+' },
						{ name: 'Cold Call By Brokers', value: 'Cold Call By Brokers' },
						{ name: 'Damha Urbanizadora', value: 'Damha Urbanizadora' },
						{ name: 'DFimoveis', value: 'DFimoveis' },
						{ name: 'Folder', value: 'Folder' },
						{ name: 'Folheto', value: 'Folheto' },
						{ name: 'Google', value: 'Google' },
						{ name: 'Imovelweb', value: 'Imovelweb' },
						{ name: 'Indicação', value: 'Indicação' },
						{ name: 'Infoimoveis', value: 'Infoimoveis' },
						{ name: 'Instagram', value: 'Instagram' },
						{ name: 'Lista VIP', value: 'Lista VIP' },
						{ name: 'Live', value: 'Live' },
						{ name: 'OLX', value: 'OLX' },
						{ name: 'Órulo', value: 'Órulo' },
						{ name: 'Palestras E Eventos', value: 'Palestras e Eventos' },
						{ name: 'Placa', value: 'Placa' },
						{ name: 'Portais Imobiliários', value: 'Portais Imobiliários' },
						{ name: 'Portal De Notícias', value: 'Portal de Notícias' },
						{ name: 'Realiza Construtora', value: 'Realiza Construtora' },
						{ name: 'SDR', value: 'SDR' },
						{ name: 'Site', value: 'Site' },
						{ name: 'SMS', value: 'SMS' },
						{ name: 'Todas As Origens', value: '' },
						{ name: 'Vaga Corretor', value: 'Vaga Corretor' },
						{ name: 'VivaReal', value: 'VivaReal' },
						{ name: 'WhatsApp', value: 'WhatsApp' },
						{ name: 'WhatsApp MKT', value: 'WhatsApp MKT' },
						{ name: 'ZAP', value: 'ZAP' },
					],
					description: 'Origem do contato (38 opções)',
				},
				{
					displayName: 'Smart List',
					name: 'smart_list',
								type: 'options',
					default: 'with_deals',
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
						{ name: 'Todos Os Contatos', value: 'all' },
					],
				},
				{
					displayName: 'Tags',
					name: 'tags',
					type: 'options',
								default: '',
					options: [
						{ name: '- 100K', value: '- 100K' },
						{ name: '+ 5 Milhões', value: '+ 5 Milhões' },
						{ name: '1 Milhão À 2 Milhões', value: '1 Milhão à 2 Milhões' },
						{ name: '1 Quarto', value: '1 Quarto' },
						{ name: '100K À 200K', value: '100K à 200K' },
						{ name: '2 Milhões À 3 Milhões', value: '2 Milhões à 3 Milhões' },
						{ name: '2 Quartos', value: '2 Quartos' },
						{ name: '200K À 300K', value: '200K à 300K' },
						{ name: '3 Milhões À 4 Milhões', value: '3 Milhões à 4 Milhões' },
						{ name: '3 Quartos', value: '3 Quartos' },
						{ name: '300K À 400K', value: '300K à 400K' },
						{ name: '4 Milhões À 5 Milhões', value: '4 Milhões à 5 Milhões' },
						{ name: '4 Quartos +', value: '4 Quartos +' },
						{ name: '400k À 500k', value: '400k à 500k' },
						{ name: '600k À 700k', value: '600k à 700k' },
						{ name: '800k À 900k', value: '800k à 900k' },
						{ name: 'Apartamento', value: 'Apartamento' },
						{ name: 'Arbo', value: 'Arbo' },
						{ name: 'Casa', value: 'Casa' },
						{ name: 'Casa Em Condomínio', value: 'Casa em Condomínio' },
						{ name: 'Client (Sistema)', value: 'client' },
						{ name: 'Condo Manager (Sistema)', value: 'condo manager' },
						{ name: 'Construtor', value: 'Construtor' },
						{ name: 'Contact (Sistema)', value: 'contact' },
						{ name: 'Corretor Parceiro', value: 'Corretor Parceiro' },
						{ name: 'Customer (Sistema)', value: 'customer' },
						{ name: 'GHC', value: 'GHC' },
						{ name: 'Guarantor (Sistema)', value: 'guarantor' },
						{ name: 'HVM', value: 'HVM' },
						{ name: 'Imóvel Comercial', value: 'Imóvel comercial' },
						{ name: 'Indicator (Sistema)', value: 'indicator' },
						{ name: 'Investimento', value: 'Investimento' },
						{ name: 'Janitor (Sistema)', value: 'janitor' },
						{ name: 'Jooy', value: 'Jooy' },
						{ name: 'Lead (Sistema)', value: 'lead' },
						{ name: 'Listing Broker (Sistema)', value: 'listing broker' },
						{ name: 'Locação', value: 'Locação' },
						{ name: 'Militar', value: 'Militar' },
						{ name: 'Moradia', value: 'Moradia' },
						{ name: 'MRV', value: 'MRV' },
						{ name: 'Photographer (Sistema)', value: 'photographer' },
						{ name: 'Plaenge', value: 'Plaenge' },
						{ name: 'Probabilidade De Fechar | Alta', value: 'Probabilidade de Fechar | Alta' },
						{ name: 'Probabilidade De Fechar | Baixa', value: 'Probabilidade de Fechar | Baixa' },
						{ name: 'Property Inspector (Sistema)', value: 'property inspector' },
						{ name: 'Property-Owner (Sistema)', value: 'property-owner' },
						{ name: 'Provider (Sistema)', value: 'provider' },
						{ name: 'Realiza', value: 'Realiza' },
						{ name: 'Realtor (Sistema)', value: 'realtor' },
						{ name: 'Receita Potencial | Alta', value: 'Receita Potencial | Alta' },
						{ name: 'Receita Potencial | Baixa', value: 'Receita Potencial | Baixa' },
						{ name: 'Renter (Sistema)', value: 'renter' },
						{ name: 'Santa Rita Do Pardo', value: 'Santa Rita do Pardo' },
						{ name: 'Seller (Sistema)', value: 'seller' },
						{ name: 'Terreno Em Condomínio', value: 'Terreno em Condomínio' },
						{ name: 'Todas As Tags', value: '' },
						{ name: 'Vanguard', value: 'Vanguard' },
						{ name: 'Viva Haus', value: 'Viva Haus' },
					],
					description: 'Tag do contato (57 opções - sistema e personalizadas)',
				},
				{
					displayName: 'Tipo De Contato',
					name: 'contact_type',
					type: 'options',
					default: '',
					description: '⚠️ Este filtro pode não funcionar corretamente na API',
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
						displayName: 'Corretor',
						name: 'user_id',
								type: 'options',
								default: '',
						options: [
							{ name: 'Antonio Carlos', value: 'P1ibK4GFPqZYKIx9e55RpQobt7J2' },
							{ name: 'Bruno Mantovani', value: 'SYkMqS5aInfpP1p9m9MV0AufW0p1' },
							{ name: 'Campo Grande MS', value: 'qLIwracS5yUk1UIvNmMCjtYgAf62' },
							{ name: 'Cleilson Nantes Nogueira', value: 'Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3' },
							{ name: 'Daiana Ferrarezi', value: 'ofIHYjFl8NeToYGDXMonzIbRRlB2' },
							{ name: 'Débora Fonseca Mendonça', value: 'LowszB3ZUhQqfG8ZZWTBKJIFojs1' },
							{ name: 'Euclides Rebouças', value: 'o2dk6UuXiIMKdPsvx1fxADhd8L12' },
							{ name: 'Fernando Abreu', value: '9luRJzY8rIOvvok5NHXppiOnYC13' },
							{ name: 'Julia Sardim', value: 'W92lLWUuymdsoN5KZjXHzv32uPs1' },
							{ name: 'Leandro Velasco', value: 'd5exMkdlYDYBGCnLRV76F0OhOCi2' },
							{ name: 'Lidiane Rocha', value: 'liGnEe9aOea2t0sc0ZkrSa8iXF62' },
							{ name: 'Mariana Cabriotti', value: 'QTEm89uOqdavsUDZpALJdNJKgws1' },
							{ name: 'Mario Otavio', value: 'PBuvhWtM1pZD3ONzKsAiJ14BdHF3' },
							{ name: 'Nilson Silva', value: 'B97MLMQ5hTPhPCiwu20RZtu8mpI3' },
							{ name: 'Sthéfano Ferro', value: 'pMhjLYu0zYXV02SLtUqeUMx5pwh2' },
							{ name: 'Todos Os Corretores', value: '' },
							{ name: 'Yan Caliel', value: 'inijJ4kWVtfU6R4oN4nP5odF6SE3' },
						],
						description: 'Filtrar por corretor responsável. ✅ Funciona.',
					},
					{
						displayName: '⚠️ Finalidade (Não Confirmado)',
						name: 'finality',
								type: 'options',
						default: '',
						description: '⚠️ Este filtro NÃO foi confirmado - sempre retorna 50 itens',
								options: [
							{ name: 'Comercial', value: 'commercial' },
							{ name: 'Residencial', value: 'residential' },
							{ name: 'Rural', value: 'rural' },
							{ name: 'Todos', value: '' },
						],
					},
					{
						displayName: 'Smart List',
						name: 'smart_list',
						type: 'options',
								default: '',
						description: '✅ Este filtro funciona corretamente',
						options: [
							{ name: 'Atualizados', value: 'updated' },
							{ name: 'Atualizados Pelo Proprietário', value: 'updated_by_owner' },
							{ name: 'Compartilhados Com Outros', value: 'shared_with_others' },
							{ name: 'Compartilhados Comigo', value: 'shared_with_me' },
							{ name: 'Desatualizados (60 Dias)', value: 'outdated' },
							{ name: 'Disponíveis', value: 'available' },
							{ name: 'Inativos', value: 'inactives' },
							{ name: 'Locação', value: 'rent' },
							{ name: 'Meus Imóveis', value: 'my_properties' },
							{ name: 'Novos (7 Dias)', value: 'new_properties' },
							{ name: 'Publicados No Site', value: 'site_publish' },
							{ name: 'Reservados', value: 'reserved' },
							{ name: 'Sem Fotos', value: 'without_photos' },
							{ name: 'Sem Localização', value: 'without_location' },
							{ name: 'Todos', value: '' },
							{ name: 'Venda', value: 'sale' },
						],
					},
					{
						displayName: '⚠️ Status (Não Confirmado)',
						name: 'status',
						type: 'options',
						default: '',
						description: '⚠️ Este filtro NÃO foi confirmado - sempre retorna 50 itens',
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
								default: 'active',
								options: [
							{ name: 'Ativos', value: 'active' },
							{ name: 'Em Andamento', value: 'in_progress' },
							{ name: 'Expirados', value: 'expired' },
							{ name: 'Finalizados', value: 'finished' },
							{ name: 'Inativos', value: 'inactive' },
							{ name: 'Pendentes', value: 'pending' },
							{ name: 'Próximos A Vencer', value: 'expiring' },
							{ name: 'Renovados', value: 'renewed' },
							{ name: 'Todas As Locações', value: 'all' },
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
						displayName: 'Data Fim',
						name: 'end_at',
						type: 'dateTime',
						default: '',
						description: 'Data final do período (formato: YYYY-MM-DD)',
					},
					{
						displayName: 'Data Início',
						name: 'start_at',
						type: 'dateTime',
						default: '',
						description: 'Data inicial do período (formato: YYYY-MM-DD)',
					},
					{
						displayName: 'Método De Pagamento',
						name: 'payment_method',
								type: 'options',
								default: '',
						options: [
							{ name: 'Boleto', value: 'bank_slip' },
							{ name: 'Cartão De Crédito', value: 'credit_card' },
							{ name: 'PIX', value: 'pix' },
							{ name: 'Todos', value: '' },
						],
						description: 'Filtrar por método de pagamento',
					},
					{
						displayName: 'Ordem',
						name: 'sort_by',
								type: 'options',
						default: 'desc',
								options: [
							{ name: 'Crescente', value: 'asc' },
							{ name: 'Decrescente', value: 'desc' },
						],
						description: 'Ordem de classificação',
					},
					{
						displayName: 'Ordenar Por',
						name: 'order_by',
						type: 'options',
						default: 'date',
						options: [
							{ name: 'Data', value: 'date' },
						],
						description: 'Campo para ordenação',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						default: 'all',
						options: [
							{ name: 'Atrasado', value: 'overdue' },
							{ name: 'Cancelado', value: 'canceled' },
							{ name: 'Deletado', value: 'deleted' },
							{ name: 'Expirado', value: 'expired' },
							{ name: 'Pago', value: 'paid' },
							{ name: 'Parcialmente Pago', value: 'partially_paid' },
							{ name: 'Pendente', value: 'pending' },
							{ name: 'Todos', value: 'all' },
						],
						description: 'Filtrar por status da fatura',
					},
				],
			},

			// ==================== DEAL FILTERS ====================
			// v2.10.0: Agora usa /v1/deals com filtros completos
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
				description: 'Filtros para buscar deals. O resultado será uma lista plana de todos os deals.',
				options: [
					{
						displayName: 'Corretor',
						name: 'user_id',
								type: 'options',
						default: 'all',
						description: 'Filtrar por corretor responsável. IMPORTANTE: user_id é obrigatório para a API retornar deals.',
								options: [
							{ name: 'Antonio Carlos', value: 'P1ibK4GFPqZYKIx9e55RpQobt7J2' },
							{ name: 'Bruno Mantovani', value: 'SYkMqS5aInfpP1p9m9MV0AufW0p1' },
							{ name: 'Campo Grande MS', value: 'qLIwracS5yUk1UIvNmMCjtYgAf62' },
							{ name: 'Cleilson Nantes Nogueira', value: 'Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3' },
							{ name: 'Daiana Ferrarezi', value: 'ofIHYjFl8NeToYGDXMonzIbRRlB2' },
							{ name: 'Débora Fonseca Mendonça', value: 'LowszB3ZUhQqfG8ZZWTBKJIFojs1' },
							{ name: 'Euclides Rebouças', value: 'o2dk6UuXiIMKdPsvx1fxADhd8L12' },
							{ name: 'Fernando Abreu', value: '9luRJzY8rIOvvok5NHXppiOnYC13' },
							{ name: 'Julia Sardim', value: 'W92lLWUuymdsoN5KZjXHzv32uPs1' },
							{ name: 'Leandro Velasco', value: 'd5exMkdlYDYBGCnLRV76F0OhOCi2' },
							{ name: 'Lidiane Rocha', value: 'liGnEe9aOea2t0sc0ZkrSa8iXF62' },
							{ name: 'Mariana Cabriotti', value: 'QTEm89uOqdavsUDZpALJdNJKgws1' },
							{ name: 'Mario Otavio', value: 'PBuvhWtM1pZD3ONzKsAiJ14BdHF3' },
							{ name: 'Nilson Silva', value: 'B97MLMQ5hTPhPCiwu20RZtu8mpI3' },
							{ name: 'Sthéfano Ferro', value: 'pMhjLYu0zYXV02SLtUqeUMx5pwh2' },
							{ name: 'Todos Os Corretores', value: 'all' },
							{ name: 'Yan Caliel', value: 'inijJ4kWVtfU6R4oN4nP5odF6SE3' },
						],
					},
					{
						displayName: 'Etapa',
						name: 'pipeline_id',
						type: 'options',
								default: '',
						description: 'Filtrar por etapa do funil. ⚠️ Este filtro pode não funcionar na API.',
						options: [
							{ name: 'Em Atendimento', value: '6481696604553216' },
							{ name: 'Fechamento', value: '4677659379367936' },
							{ name: 'Follow UP', value: '5944296774565888' },
							{ name: 'Negociação', value: '6507246727987200' },
							{ name: 'Oportunidades', value: '4584666827849728' },
							{ name: 'Qualificação E Interesse', value: '6005926736691200' },
							{ name: 'Todas As Etapas', value: '' },
							{ name: 'Visita / Apresentação', value: '5381346821144576' },
						],
					},
					{
						displayName: 'Grupo De Funil',
						name: 'pipeline_group_id',
								type: 'options',
								default: '',
						description: 'Filtrar por grupo de funil. ⚠️ Este filtro pode não funcionar na API.',
						options: [
							{ name: 'Captação De Imóveis', value: '5370013421666304' },
							{ name: 'Comissões', value: '6405034089644032' },
							{ name: 'Geral De Negócios', value: '5675099632959488' },
							{ name: 'Gestão De Solicitações', value: '6419593693233152' },
							{ name: 'Gestão De Tarefas', value: '6594235603091456' },
							{ name: 'Todos Os Grupos', value: '' },
						],
					},
					{
						displayName: 'Status Do Deal',
						name: 'deal_status',
								type: 'options',
						default: 'all',
						description: 'Filtrar por status do deal. Testado: all (233), win (19), lost (220), stagnant (229), property_radar (100), out_of_date (201).',
								options: [
							{ name: '+3 Meses (Desatualizado)', value: 'out_of_date' },
							{ name: 'Estagnado', value: 'stagnant' },
							{ name: 'Ganho', value: 'win' },
							{ name: 'Perdido', value: 'lost' },
							{ name: 'Radar De Imóveis', value: 'property_radar' },
							{ name: 'Todos', value: 'all' },
						],
					},
					{
						displayName: 'Tipo De Negócio',
						name: 'deal_type',
						type: 'options',
						default: 'all',
						description: 'Filtrar por tipo de negócio. Testado: all (233), rent (138).',
						options: [
							{ name: 'Locação', value: 'rent' },
							{ name: 'Todos', value: 'all' },
						],
					},
				],
			},

			// ==================== DEAL BY STAGE FILTERS ====================
			// v2.10.0: Adicionado filtro de Etapa (pipeline_id)
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
				description: 'Filtros para visão Kanban. Retorna deals agrupados por estágio.',
				options: [
					{
						displayName: 'Corretor',
						name: 'user_id',
								type: 'options',
						default: 'all',
						description: 'Filtrar por corretor responsável. IMPORTANTE: user_id é obrigatório para a API retornar deals.',
								options: [
							{ name: 'Antonio Carlos', value: 'P1ibK4GFPqZYKIx9e55RpQobt7J2' },
							{ name: 'Bruno Mantovani', value: 'SYkMqS5aInfpP1p9m9MV0AufW0p1' },
							{ name: 'Campo Grande MS', value: 'qLIwracS5yUk1UIvNmMCjtYgAf62' },
							{ name: 'Cleilson Nantes Nogueira', value: 'Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3' },
							{ name: 'Daiana Ferrarezi', value: 'ofIHYjFl8NeToYGDXMonzIbRRlB2' },
							{ name: 'Débora Fonseca Mendonça', value: 'LowszB3ZUhQqfG8ZZWTBKJIFojs1' },
							{ name: 'Euclides Rebouças', value: 'o2dk6UuXiIMKdPsvx1fxADhd8L12' },
							{ name: 'Fernando Abreu', value: '9luRJzY8rIOvvok5NHXppiOnYC13' },
							{ name: 'Julia Sardim', value: 'W92lLWUuymdsoN5KZjXHzv32uPs1' },
							{ name: 'Leandro Velasco', value: 'd5exMkdlYDYBGCnLRV76F0OhOCi2' },
							{ name: 'Lidiane Rocha', value: 'liGnEe9aOea2t0sc0ZkrSa8iXF62' },
							{ name: 'Mariana Cabriotti', value: 'QTEm89uOqdavsUDZpALJdNJKgws1' },
							{ name: 'Mario Otavio', value: 'PBuvhWtM1pZD3ONzKsAiJ14BdHF3' },
							{ name: 'Nilson Silva', value: 'B97MLMQ5hTPhPCiwu20RZtu8mpI3' },
							{ name: 'Sthéfano Ferro', value: 'pMhjLYu0zYXV02SLtUqeUMx5pwh2' },
							{ name: 'Todos Os Corretores', value: 'all' },
							{ name: 'Yan Caliel', value: 'inijJ4kWVtfU6R4oN4nP5odF6SE3' },
						],
					},
					{
						displayName: 'Etapa',
						name: 'pipeline_id',
						type: 'options',
								default: '',
						description: 'Filtrar por etapa específica do funil. ⚠️ Este filtro pode não funcionar na API.',
						options: [
							{ name: 'Em Atendimento', value: '6481696604553216' },
							{ name: 'Fechamento', value: '4677659379367936' },
							{ name: 'Follow UP', value: '5944296774565888' },
							{ name: 'Negociação', value: '6507246727987200' },
							{ name: 'Oportunidades', value: '4584666827849728' },
							{ name: 'Qualificação E Interesse', value: '6005926736691200' },
							{ name: 'Todas As Etapas', value: '' },
							{ name: 'Visita / Apresentação', value: '5381346821144576' },
						],
					},
					{
						displayName: 'Grupo De Funil',
						name: 'pipeline_group_id',
								type: 'options',
								default: '',
						description: 'Filtrar por grupo de funil. ⚠️ Este filtro pode não funcionar na API.',
						options: [
							{ name: 'Captação De Imóveis', value: '5370013421666304' },
							{ name: 'Comissões', value: '6405034089644032' },
							{ name: 'Geral De Negócios', value: '5675099632959488' },
							{ name: 'Gestão De Solicitações', value: '6419593693233152' },
							{ name: 'Gestão De Tarefas', value: '6594235603091456' },
							{ name: 'Todos Os Grupos', value: '' },
						],
					},
					{
						displayName: 'Status Do Deal',
						name: 'deal_status',
								type: 'options',
						default: 'all',
						description: 'Filtrar por status do deal. Testado: all (233), win (19), lost (220), stagnant (229), property_radar (100), out_of_date (201).',
								options: [
							{ name: '+3 Meses (Desatualizado)', value: 'out_of_date' },
							{ name: 'Estagnado', value: 'stagnant' },
							{ name: 'Ganho', value: 'win' },
							{ name: 'Perdido', value: 'lost' },
							{ name: 'Radar De Imóveis', value: 'property_radar' },
							{ name: 'Todos', value: 'all' },
						],
					},
					{
						displayName: 'Tipo De Negócio',
						name: 'deal_type',
						type: 'options',
						default: 'all',
						description: 'Filtrar por tipo de negócio. Testado: all (233), rent (138).',
						options: [
							{ name: 'Locação', value: 'rent' },
							{ name: 'Todos', value: 'all' },
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
						displayName: 'Exibir Feriados',
						name: 'show_holidays',
						type: 'boolean',
						default: true,
						description: 'Whether to include holidays in the response',
					},
					{
						displayName: 'Tipo De Item',
						name: 'item_type',
								type: 'options',
								default: '',
						description: 'Tipo de atividade. Testado: task (461 itens), whatsapp (326 itens), visit, call.',
						options: [
							{ name: 'Chamada', value: 'call' },
							{ name: 'Tarefa', value: 'task' },
							{ name: 'Todas Atividades', value: '' },
							{ name: 'Visita', value: 'visit' },
							{ name: 'WhatsApp', value: 'whatsapp' },
						],
					},
					{
						displayName: 'Usuário',
						name: 'user_filter',
								type: 'options',
						default: 'all',
						description: 'Filtrar por usuário',
								options: [
							{ name: 'Antonio Carlos', value: 'P1ibK4GFPqZYKIx9e55RpQobt7J2' },
							{ name: 'Bruno Mantovani', value: 'SYkMqS5aInfpP1p9m9MV0AufW0p1' },
							{ name: 'Campo Grande MS', value: 'qLIwracS5yUk1UIvNmMCjtYgAf62' },
							{ name: 'Cleilson Nantes Nogueira', value: 'Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3' },
							{ name: 'Daiana Ferrarezi', value: 'ofIHYjFl8NeToYGDXMonzIbRRlB2' },
							{ name: 'Débora Fonseca Mendonça', value: 'LowszB3ZUhQqfG8ZZWTBKJIFojs1' },
							{ name: 'Euclides Rebouças', value: 'o2dk6UuXiIMKdPsvx1fxADhd8L12' },
							{ name: 'Fernando Abreu', value: '9luRJzY8rIOvvok5NHXppiOnYC13' },
							{ name: 'Julia Sardim', value: 'W92lLWUuymdsoN5KZjXHzv32uPs1' },
							{ name: 'Leandro Velasco', value: 'd5exMkdlYDYBGCnLRV76F0OhOCi2' },
							{ name: 'Lidiane Rocha', value: 'liGnEe9aOea2t0sc0ZkrSa8iXF62' },
							{ name: 'Mariana Cabriotti', value: 'QTEm89uOqdavsUDZpALJdNJKgws1' },
							{ name: 'Mario Otavio', value: 'PBuvhWtM1pZD3ONzKsAiJ14BdHF3' },
							{ name: 'Nilson Silva', value: 'B97MLMQ5hTPhPCiwu20RZtu8mpI3' },
							{ name: 'Sthéfano Ferro', value: 'pMhjLYu0zYXV02SLtUqeUMx5pwh2' },
							{ name: 'Todos Os Usuários', value: 'all' },
							{ name: 'Yan Caliel', value: 'inijJ4kWVtfU6R4oN4nP5odF6SE3' },
						],
					},
				],
				description: 'Filtros do calendário. Por padrão busca todos os usuários.',
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
						resource: ['transaction'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Conta Financeira',
						name: 'account_id',
								type: 'options',
								default: '',
						description: 'Filtrar por conta financeira',
								options: [
							{ name: 'Caixa Economica', value: '6467636073332736' },
							{ name: 'Dinheiro', value: '6317241432276992' },
							{ name: 'Mercado Pago', value: '6487354834419712' },
							{ name: 'PJBank', value: '5374237794631680' },
							{ name: 'PJBank - Cartão De Crédito', value: '5713727725764608' },
							{ name: 'Todas As Contas', value: '' },
						],
					},
					{
						displayName: 'Data Fim',
						name: 'end_at',
						type: 'dateTime',
								default: '',
						description: 'Data final do período (formato: YYYY-MM-DD)',
					},
					{
						displayName: 'Data Início',
						name: 'start_at',
						type: 'dateTime',
						default: '',
						description: 'Data inicial do período (formato: YYYY-MM-DD)',
					},
					{
						displayName: 'Ordem',
						name: 'sort_by',
								type: 'options',
						default: 'desc',
						options: [
							{ name: 'Crescente', value: 'asc' },
							{ name: 'Decrescente', value: 'desc' },
						],
						description: 'Ordem de classificação',
					},
					{
						displayName: 'Ordenar Por',
						name: 'order_by',
								type: 'options',
						default: 'due_date',
								options: [
							{ name: 'Data De Vencimento', value: 'due_date' },
						],
						description: 'Campo para ordenação',
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
						name: 'filter_type',
						type: 'options',
				default: '',
						description: 'Filtrar por tipo de transação',
						options: [
							{ name: 'Despesa', value: 'expense' },
							{ name: 'Receita', value: 'income' },
							{ name: 'Todos', value: '' },
							{ name: 'Transferência', value: 'transference' },
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

				// ==================== BUILD REQUEST ====================
				switch (operation) {
				case 'checkExists': {
					endpoint = '/v1/contact/exists';
					const checkBy = this.getNodeParameter('checkExistsBy', itemIndex) as string;
					const checkValue = this.getNodeParameter('checkExistsValue', itemIndex) as string;
					// API aceita CPF/CNPJ COM formatação (pontos, traços)
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
						} else if (resource === 'transaction') {
							const transactionId = this.getNodeParameter('transactionId', itemIndex) as string;
							endpoint = `/v1/financial/transaction/${transactionId}`;
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
						} else if (resource === 'property') {
							endpoint = '/v1/properties';
						} else if (resource === 'deal') {
							endpoint = '/v1/deals';
						} else if (resource === 'transaction') {
							endpoint = '/v1/financial/transaction';
						} else if (resource === 'calendar') {
							endpoint = '/v1/calendar/item';
						} else if (resource === 'lease') {
							endpoint = '/v1/leases';
						} else if (resource === 'invoice') {
							endpoint = '/v1/invoices';
						} else if (resource === 'timeline') {
							const contactId = this.getNodeParameter('timelineContactId', itemIndex) as string;
							const contactType = this.getNodeParameter('timelineContactType', itemIndex) as string;
							endpoint = `/v1/${contactType}/${contactId}/notes`;
						} else if (resource === 'proposal') {
							const dealId = this.getNodeParameter('proposalDealId', itemIndex) as string;
							endpoint = `/v1/proposal/deal/${dealId}`;
						} else if (resource === 'propertyReserve') {
							endpoint = '/v1/property-reserves';
						}
						const bodyJson = this.getNodeParameter('body', itemIndex) as string;
						body = JSON.parse(bodyJson);
						break;
					}

					case 'update': {
						method = 'POST'; // API Imobzi usa POST para update (não PATCH)
						if (resource === 'contact') {
							const contactType = this.getNodeParameter('contactType', itemIndex) as string;
							const contactId = this.getNodeParameter('contactId', itemIndex) as string;
							endpoint = `/v1/${contactType}/${contactId}`;
						} else if (resource === 'property') {
							const propId = this.getNodeParameter('id', itemIndex) as string;
							endpoint = `/v1/property/${propId}`;
						} else if (resource === 'deal') {
							const dealId = this.getNodeParameter('id', itemIndex) as string;
							endpoint = `/v1/deal/${dealId}`;
						} else if (resource === 'transaction') {
							const transactionId = this.getNodeParameter('transactionId', itemIndex) as string;
							endpoint = `/v1/financial/transaction/${transactionId}`;
						} else if (resource === 'calendar') {
							const calendarItemId = this.getNodeParameter('calendarItemId', itemIndex) as string;
							endpoint = `/v1/calendar/item/${calendarItemId}`;
						} else if (resource === 'lease') {
							const leaseId = this.getNodeParameter('leaseId', itemIndex) as string;
							endpoint = `/v1/lease/${leaseId}`;
						} else if (resource === 'invoice') {
							const invoiceId = this.getNodeParameter('invoiceId', itemIndex) as string;
							endpoint = `/v1/invoice/${invoiceId}`;
						} else if (resource === 'proposal') {
							const proposalId = this.getNodeParameter('proposalId', itemIndex) as string;
							endpoint = `/v1/proposal/${proposalId}`;
						}
						const updateBodyJson = this.getNodeParameter('body', itemIndex) as string;
						body = JSON.parse(updateBodyJson);
						break;
					}

					case 'delete': {
						method = 'DELETE';
						if (resource === 'contact') {
							const contactType = this.getNodeParameter('contactType', itemIndex) as string;
							const contactId = this.getNodeParameter('contactId', itemIndex) as string;
							endpoint = `/v1/${contactType}/${contactId}`;
						} else if (resource === 'property') {
							const propId = this.getNodeParameter('id', itemIndex) as string;
							endpoint = `/v1/property/${propId}`;
						} else if (resource === 'transaction') {
							const transactionId = this.getNodeParameter('transactionId', itemIndex) as string;
							endpoint = `/v1/financial/transaction/${transactionId}`;
						} else if (resource === 'calendar') {
							const calendarItemId = this.getNodeParameter('calendarItemId', itemIndex) as string;
							endpoint = `/v1/calendar/item/${calendarItemId}`;
						} else if (resource === 'lease') {
							const leaseId = this.getNodeParameter('leaseId', itemIndex) as string;
							endpoint = `/v1/lease/${leaseId}`;
						} else if (resource === 'propertyReserve') {
							const reserveId = this.getNodeParameter('reserveId', itemIndex) as string;
							endpoint = `/v1/property-reserve/${reserveId}`;
						}
						break;
					}

					case 'getAll': {
						// Calendário: campos obrigatórios + novos parâmetros
						if (resource === 'calendar') {
							const year = this.getNodeParameter('year', itemIndex) as number;
							const month = this.getNodeParameter('month', itemIndex) as number;
							qs.year = year;
							qs.month = month;
							qs.calendar_type = 'normal';

							// Processar filtros do calendário
							const calFilters = this.getNodeParameter('calendarFilters', itemIndex, {}) as IDataObject;

							// Usuário: todos ou específico
							if (calFilters.user_filter === 'all' || !calFilters.user_filter) {
								qs.search_all = 'true';
							} else {
								qs.user_id = calFilters.user_filter;
							}

							// Feriados
							if (calFilters.show_holidays !== false) {
								qs.holiday_year = year;
							}

							// Tipo de item
							if (calFilters.item_type && calFilters.item_type !== '') {
								qs.item_type = calFilters.item_type;
							}
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
							transaction: 'transactionFilters',
						};

						const filtersKey = filtersMap[resource];
						if (filtersKey) {
							const filters = this.getNodeParameter(filtersKey, itemIndex, {}) as IDataObject;

							// Processar período de faturas
							if (resource === 'invoice' && filters.periodo) {
								const hoje = new Date();
								const hojeStr = hoje.toISOString().split('T')[0];

								if (filters.periodo === 'custom') {
									// Usar datas personalizadas
									if (filters.start_at) {
										const startDate = new Date(filters.start_at as string);
										if (!isNaN(startDate.getTime())) {
											qs.start_at = startDate.toISOString().split('T')[0];
										}
									}
									if (filters.end_at) {
										const endDate = new Date(filters.end_at as string);
										if (!isNaN(endDate.getTime())) {
											qs.end_at = endDate.toISOString().split('T')[0];
										}
									}
								} else if (filters.periodo !== '') {
									// Calcular período automático
									const dias = parseInt(filters.periodo as string, 10);
									const dataInicio = new Date(hoje.getTime() - dias * 24 * 60 * 60 * 1000);
									qs.start_at = dataInicio.toISOString().split('T')[0];
									qs.end_at = hojeStr;
								}
								// Remover campos de período do qs
								delete filters.periodo;
								delete filters.start_at;
								delete filters.end_at;
							}

							for (const [key, value] of Object.entries(filters)) {
								if (value !== '' && value !== undefined && value !== null && key !== 'periodo') {
									// Formatar datas para YYYY-MM-DD
									if ((key === 'start_at' || key === 'end_at') && typeof value === 'string') {
										const date = new Date(value);
										if (!isNaN(date.getTime())) {
											qs[key] = date.toISOString().split('T')[0];
										} else {
											qs[key] = value;
										}
									} else {
										qs[key] = value;
									}
								}
							}

							// ==================== LÓGICA ESPECIAL POR RECURSO ====================

							// DEALS: user_id é OBRIGATÓRIO para retornar dados
							// Se não foi especificado, usar 'all' como padrão
							if ((resource === 'deal' || resource === 'dealByStage') && !qs.user_id) {
								qs.user_id = 'all';
							}

							// CALENDÁRIO: Para "todos os usuários", usar search_all=true
							// Não enviar user_id=all (causa erro 500)
							if (resource === 'calendar') {
								if (filters.user_filter === 'all' || !filters.user_filter) {
									qs.search_all = 'true';
									delete qs.user_filter;
									delete qs.user_id;
								} else if (filters.user_filter) {
									qs.user_id = filters.user_filter;
									delete qs.user_filter;
								}
								// Adicionar ano e mês obrigatórios
								const now = new Date();
								if (!qs.year) qs.year = now.getFullYear();
								if (!qs.month) qs.month = now.getMonth() + 1;
								if (!qs.calendar_type) qs.calendar_type = 'normal';
							}
						}

						// ==================== NOVOS RECURSOS FASE 2 ====================

						// TIMELINE: Buscar histórico do contato
						if (resource === 'timeline') {
							const contactId = this.getNodeParameter('timelineContactId', itemIndex) as string;
							const contactType = this.getNodeParameter('timelineContactType', itemIndex) as string;
							const dealId = this.getNodeParameter('timelineDealId', itemIndex, '') as string;
							qs.parent_id = contactId;
							qs.parent_type = contactType;
							qs.type = 'all';
							if (dealId) {
								qs.deal_id = dealId;
							}
							endpoint = '/v1/timeline';
						}

						// PROPOSAL: Buscar propostas do deal
						if (resource === 'proposal') {
							const dealId = this.getNodeParameter('proposalDealId', itemIndex) as string;
							endpoint = `/v1/proposal/deal/${dealId}`;
						}

						// PROPERTY RESERVE: Buscar reservas do deal
						if (resource === 'propertyReserve') {
							const dealId = this.getNodeParameter('reserveDealId', itemIndex) as string;
							qs.deal_id = dealId;
							endpoint = '/v1/property-reserves';
						}

						// PROPERTY MATCH: Buscar imóveis compatíveis com o deal
						if (resource === 'propertyMatch') {
							const dealId = this.getNodeParameter('matchDealId', itemIndex) as string;
							const profileId = this.getNodeParameter('matchProfileId', itemIndex, '') as string;
							endpoint = `/v1/deal/${dealId}/properties-match`;
							if (profileId) {
								qs.profile_id = profileId;
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
					} else if (resource === 'deal') {
						// v2.10.0: Deal (Lista) - Extrair deals de todos os estágios em lista plana
						const allDeals: IDataObject[] = [];
						for (const key of Object.keys(response)) {
							// Ignorar campos de metadados (total_deals, total_values, etc)
							if (key === 'total_deals' || key === 'total_values' || key === 'total_pages' || key === 'cursor_all_stages') {
								continue;
							}
							const stageData = response[key] as IDataObject;
							if (stageData && stageData.deals && Array.isArray(stageData.deals)) {
								// Adicionar informação do estágio em cada deal
								for (const deal of stageData.deals as IDataObject[]) {
									deal.stage_id = key;
									deal.stage_name = stageData.stage_name || 'N/A';
									allDeals.push(deal);
								}
							}
						}
						// Retornar lista plana de deals
						for (const item of allDeals) {
							returnData.push({ json: item, pairedItem: itemIndex });
						}
						continue;
					} else if (resource === 'dealByStage') {
						// dealByStage retorna estrutura Kanban (objeto com estágios)
						returnData.push({ json: response, pairedItem: itemIndex });
						continue;
					} else {
						// Outro objeto especial
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
