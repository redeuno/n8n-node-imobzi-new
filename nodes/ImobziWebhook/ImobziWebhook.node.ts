import type {
	IWebhookFunctions,
	IWebhookResponseData,
	INodeType,
	INodeTypeDescription,
	IHookFunctions,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class ImobziWebhook implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Imobzi Trigger',
		name: 'imobziWebhook',
		icon: 'file:imobzi.svg',
		group: ['trigger'],
		version: 2,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Recebe eventos da API Imobzi via Webhook em tempo real',
		defaults: {
			name: 'Imobzi Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'imobziApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Eventos',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				description: 'Selecione os eventos que irão disparar este trigger',
				options: [
					// Lead Events
					{
						name: 'Lead Criado',
						value: 'lead_created',
						description: 'Quando um novo lead é criado',
					},
					{
						name: 'Lead Atualizado',
						value: 'lead_updated',
						description: 'Quando um lead é atualizado',
					},
					// Contact Events
					{
						name: 'Contato Criado',
						value: 'contact_created',
						description: 'Quando um novo contato é criado',
					},
					{
						name: 'Contato Atualizado',
						value: 'contact_updated',
						description: 'Quando um contato é atualizado',
					},
					// Property Events
					{
						name: 'Imóvel Criado',
						value: 'property_created',
						description: 'Quando um novo imóvel é criado',
					},
					{
						name: 'Imóvel Atualizado',
						value: 'property_updated',
						description: 'Quando um imóvel é atualizado',
					},
					// Deal Events
					{
						name: 'Negócio Criado',
						value: 'deal_created',
						description: 'Quando um novo negócio é criado',
					},
					{
						name: 'Negócio Atualizado',
						value: 'deal_updated',
						description: 'Quando um negócio é atualizado',
					},
					{
						name: 'Negócio Movido',
						value: 'deal_moved',
						description: 'Quando um negócio muda de estágio no funil',
					},
					{
						name: 'Negócio Ganho',
						value: 'deal_won',
						description: 'Quando um negócio é marcado como ganho',
					},
					{
						name: 'Negócio Perdido',
						value: 'deal_lost',
						description: 'Quando um negócio é marcado como perdido',
					},
					// Lease Events
					{
						name: 'Locação Criada',
						value: 'lease_created',
						description: 'Quando uma nova locação é criada',
					},
					{
						name: 'Locação Atualizada',
						value: 'lease_updated',
						description: 'Quando uma locação é atualizada',
					},
					// Contract Events
					{
						name: 'Contrato Criado',
						value: 'contract_created',
						description: 'Quando um novo contrato é criado',
					},
					{
						name: 'Contrato Atualizado',
						value: 'contract_updated',
						description: 'Quando um contrato é atualizado',
					},
					// Invoice Events
					{
						name: 'Fatura Criada',
						value: 'invoice_created',
						description: 'Quando uma nova fatura é criada',
					},
					{
						name: 'Fatura Paga',
						value: 'invoice_paid',
						description: 'Quando uma fatura é paga',
					},
					{
						name: 'Fatura Atrasada',
						value: 'invoice_overdue',
						description: 'Quando uma fatura fica em atraso',
					},
					// Document Events
					{
						name: 'Documento Criado',
						value: 'document_created',
						description: 'Quando um documento é criado',
					},
					{
						name: 'Documento Assinado',
						value: 'document_signed',
						description: 'Quando um documento é assinado',
					},
					// Visit/Calendar Events
					{
						name: 'Visita Agendada',
						value: 'visit_scheduled',
						description: 'Quando uma visita é agendada',
					},
					{
						name: 'Visita Realizada',
						value: 'visit_completed',
						description: 'Quando uma visita é realizada',
					},
					{
						name: 'Visita Cancelada',
						value: 'visit_cancelled',
						description: 'Quando uma visita é cancelada',
					},
					// Task Events
					{
						name: 'Tarefa Criada',
						value: 'task_created',
						description: 'Quando uma tarefa é criada',
					},
					{
						name: 'Tarefa Concluída',
						value: 'task_completed',
						description: 'Quando uma tarefa é concluída',
					},
					// User Events
					{
						name: 'Usuário Criado',
						value: 'user_created',
						description: 'Quando um novo usuário é criado',
					},
				],
			},
			{
				displayName: 'Opções',
				name: 'options',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				options: [
					{
						displayName: 'Registrar Webhook Automaticamente',
						name: 'autoRegister',
						type: 'boolean',
						default: true,
						description: 'Whether to automatically register the webhook URL in the Imobzi API when the workflow is activated',
					},
					{
						displayName: 'Nome do Webhook',
						name: 'webhookName',
						type: 'string',
						default: 'n8n Webhook',
						description: 'Nome para identificar o webhook no painel da Imobzi',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const options = this.getNodeParameter('options', {}) as IDataObject;
				
				if (!options.autoRegister) {
					return true;
				}

				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'GET',
							url: '/v1/webhooks',
							baseURL: 'https://api.imobzi.app',
							json: true,
						},
					);

					// Verificar se já existe um webhook com a mesma URL
					if (Array.isArray(response)) {
						const existingWebhook = response.find(
							(webhook: IDataObject) => webhook.url === webhookUrl
						);
						
						if (existingWebhook) {
							// Salvar o ID do webhook para poder deletar depois
							const webhookData = this.getWorkflowStaticData('node');
							webhookData.webhookId = existingWebhook.db_id;
							return true;
						}
					}

					return false;
				} catch {
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const events = this.getNodeParameter('events', []) as string[];
				const options = this.getNodeParameter('options', {}) as IDataObject;
				
				if (!options.autoRegister) {
					return true;
				}

				try {
					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'POST',
							url: '/v1/webhooks',
							baseURL: 'https://api.imobzi.app',
							body: {
								url: webhookUrl,
								events: events,
								active: true,
								name: options.webhookName || 'n8n Webhook',
							},
							json: true,
						},
					);

					if (response && response.db_id) {
						const webhookData = this.getWorkflowStaticData('node');
						webhookData.webhookId = response.db_id;
						return true;
					}

					return false;
				} catch {
					// Se falhar, ainda permitir a criação manual
					return true;
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookId = webhookData.webhookId;
				const options = this.getNodeParameter('options', {}) as IDataObject;
				
				if (!options.autoRegister || !webhookId) {
					return true;
				}

				try {
					await this.helpers.requestWithAuthentication.call(
						this,
						'imobziApi',
						{
							method: 'DELETE',
							url: `/v1/webhook/${webhookId}`,
							baseURL: 'https://api.imobzi.app',
							json: true,
						},
					);

					delete webhookData.webhookId;
					return true;
				} catch {
					// Ignorar erro na remoção
					return true;
				}
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const headerData = this.getHeaderData();
		const events = this.getNodeParameter('events', []) as string[];

		// Extrair informações do payload
		const eventType = (bodyData.event || bodyData.type || bodyData.event_type || '') as string;
		const timestamp = bodyData.timestamp || bodyData.created_at || new Date().toISOString();
		const data = bodyData.data || bodyData.payload || bodyData;

		// Se eventos específicos foram selecionados, filtrar
		if (events.length > 0 && eventType) {
			// Normalizar o nome do evento (converter lead.created para lead_created)
			const normalizedEvent = eventType.replace(/\./g, '_').toLowerCase();
			
			if (!events.includes(normalizedEvent) && !events.includes(eventType)) {
				// Evento não está na lista de eventos selecionados
				return {
					noWebhookResponse: true,
				};
			}
		}

		// Retornar os dados do webhook
		return {
			workflowData: [
				this.helpers.returnJsonArray({
					event: eventType,
					timestamp: timestamp,
					data: data,
					headers: headerData,
					raw: bodyData,
				}),
			],
		};
	}
}
