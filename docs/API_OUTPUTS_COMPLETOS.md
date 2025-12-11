# 📋 OUTPUTS COMPLETOS DA API IMOBZI

**Data dos testes:** 2025-12-11T13:41:36.944Z

---

## Listar Usuários

**Endpoint:** `/v1/users`
**Status:** 200

**Resposta:**
```json
[
  {
    "database": "ac-dfzv24117ahkn",
    "db_id": "P1ibK4GFPqZYKIx9e55RpQobt7J2",
    "fullname": "Antonio Carlos",
    "function": "",
    "profile_image_url": null,
    "active": true,
    "email": "militaoa@gmail.com",
    "phones": [
      {
        "country_code": "+55",
        "number": "(67) 99874-7553",
        "alpha2Code": "br",
        "type": "mobile",
        "sector": null
      }
    ]
  },
  {
    "database": "ac-dfzv24117ahkn",
    "db_id": "SYkMqS5aInfpP1p9m9MV0AufW0p1",
    "fullname": "Bruno Mantovani",
    "function": "",
    "profile_image_url": "https://firebasestorage.googleapis.com/v0/b/imobzi-app-production.appspot.com/o/users%2FSYkMqS5aInfpP1p9m9MV0AufW0p1%2Fprofile-photo?alt=media&token=16fed125-a4c9-4c7d-b988-728ba877c24a",
    "active": true,
    "email": "bruno@imantovani.com.br",
    "phones": [
      {
        "country_code": "+55",
        "number": "(67) 4042-100",
        "alpha2Code": "br",
        "type": "work",
        "sector": null
      }
    ]
  },
  {
    "database": "ac-dfzv24117ahkn",
    "db_id": "qLIwracS5yUk1UIvNmMCjtYgAf62",
    "fullname": "Campo Grande MS",
    "function": "",
    "profile_image_url": null,
    "active": true,
    "email": "campogrande@redeuno.com.br",
    "phones": [
      {
        "country_code": "+55",
        "number": "(22) 98809-9969",
        "alpha2Code": "br",
        "type": "mobile",
        "sector": null
      }
    ]
  },
  {
    "database": "ac-dfzv24117ahkn",
    "db_id": "Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3",
    "fullname": "Cleilson Nantes Nogueira",
    "function": "corretor de imóveis",
    "profile_image_url": "https://firebasestorage.googleapis.com/v0/b/imobzi-app-production.appspot.com/o/users%2FVbp4IUWMP9Tz4AjjbTmv5hlP1yD3%2Fprofile-photo?alt=media&token=96ad4035-9b54-4171-8b63-5cb1037b36b2",
    "active": true,
    "email": "cleilson_nantes@hotmail.com",
    "phones": [
      {
        "country_code": "+55",
        "number": "(67) 99168-6879",
        "alpha2Code": "br",
        "type": "",
        "sector": null
      }
    ]
  },
  {
    "database": "ac-dfzv24117ahkn",
    "db_id": "ofIHYjFl8NeToYGDXMonzIbRRlB2",
    "fullname": "Daiana Ferrarezi",
    "function": "Corretora",
    "profile_image_url": "https://firebasestorage.googleapis.com/v0/b/imobzi-app-production.appspot.com/o/users%2FofIHYjFl8NeToYGDXMonzIbRRlB2%2Fprofile-photo?alt=media&token=b61837cf-d9d2-4c97-a278-c7bbf8b12c69",
    "active": true,
    "email": "daygui2323@gmail.com",
    "phones": [
      {
        "country_code": "+55",
        "number": "(67) 98176-0937",
        "alpha2Code": "br",
        "type": "",
        "sector": null
      }
    ]
  },
  {
    "database": "ac-dfzv24117ahkn",
    "db_id": "LowszB3ZUhQqfG8ZZWTBKJIFojs1",
    "fullname": "Débora Fonseca Mendonça",
    "function": "Assistente",
    "profile_image_url": "https://firebasestorage.googleapis.com/v0/b/imobzi-app-production.appspot.com/o/users%2FLowszB3ZUhQqfG8ZZWTBKJIFojs1%2Fprofile-photo?alt=media&token=e
```

---

## Listar Pipeline Groups

**Endpoint:** `/v1/pipeline-groups`
**Status:** 200

**Resposta:**
```json
[
  {
    "code": 648,
    "deal_cards_info": [
      {
        "field_id": "date_close",
        "name": "date_close",
        "position": 0
      },
      {
        "field_id": "created_at",
        "name": "creation_date",
        "position": 1
      },
      {
        "field_id": "updated_at",
        "name": "updated_date",
        "position": 2
      }
    ],
    "default": false,
    "description_key": "CDI",
    "name": "Captação de Imóveis",
    "pipeline_type": "cards",
    "range_value": {
      "rent_max": 5,
      "rent_min": 10,
      "sale_max": 5,
      "sale_min": 10
    },
    "db_id": 5370013421666304,
    "pipelines": []
  },
  {
    "code": 2,
    "deal_cards_info": [],
    "default": false,
    "description_key": "COM",
    "name": "Comissões",
    "pipeline_type": "cards",
    "range_value": {
      "rent_max": 5,
      "rent_min": 10,
      "sale_max": 5,
      "sale_min": 10
    },
    "db_id": 6405034089644032,
    "pipelines": []
  },
  {
    "code": 4755,
    "deal_cards_info": [
      {
        "field_id": "commission",
        "name": "commission",
        "position": 4
      },
      {
        "field_id": "commission_percent",
        "name": "commission_percent",
        "position": 5
      },
      {
        "field_id": "entry_value",
        "name": "entry_value",
        "position": 6
      },
      {
        "field_id": "vacation_date_range",
        "name": "vacation_date_range",
        "position": 7
      },
      {
        "field_id": "date_close",
        "name": "date_close",
        "position": 8
      },
      {
        "field_id": "created_at",
        "name": "creation_date",
        "position": 9
      },
      {
        "field_id": "updated_at",
        "name": "updated_date",
        "position": 10
      }
    ],
    "default": true,
    "description_key": "GDN",
    "name": "Geral de Negócios",
    "pipeline_type": "default",
    "range_value": {
      "rent_max": 5,
      "rent_min": 10,
      "sale_max": 5,
      "sale_min": 10
    },
    "db_id": 5675099632959488,
    "pipelines": []
  },
  {
    "code": 1,
    "deal_cards_info": [],
    "default": false,
    "description_key": "GS",
    "name": "Gestão de Solicitações",
    "pipeline_type": "cards",
    "range_value": null,
    "db_id": 6419593693233152,
    "pipelines": []
  },
  {
    "code": 10,
    "deal_cards_info": [],
    "default": false,
    "description_key": "GT",
    "name": "Gestão de Tarefas",
    "pipeline_type": "cards",
    "range_value": null,
    "db_id": 6594235603091456,
    "pipelines": []
  }
]
```

---

## Listar Pipelines

**Endpoint:** `/v1/pipelines`
**Status:** 200

**Resposta:**
```json
[
  {
    "db_id": 4584666827849728,
    "description": "",
    "digital_real_estate_allow_lease_create": false,
    "digital_real_estate_visits": false,
    "name": "Oportunidades",
    "network_sync": false,
    "not_expires_reserves": false,
    "position": 1,
    "radar_enabled": false,
    "site_reserves": false,
    "stagnant_days": 1
  },
  {
    "db_id": 6005926736691200,
    "description": "",
    "digital_real_estate_allow_lease_create": false,
    "digital_real_estate_visits": false,
    "name": "Qualificação e Interesse",
    "network_sync": true,
    "not_expires_reserves": false,
    "position": 2,
    "radar_enabled": true,
    "site_reserves": false,
    "stagnant_days": 14
  },
  {
    "db_id": 5381346821144576,
    "description": "",
    "digital_real_estate_allow_lease_create": false,
    "digital_real_estate_visits": true,
    "name": "Visita / Apresentação",
    "network_sync": false,
    "not_expires_reserves": false,
    "position": 3,
    "radar_enabled": false,
    "site_reserves": false,
    "stagnant_days": 7
  },
  {
    "db_id": 5944296774565888,
    "description": "",
    "digital_real_estate_allow_lease_create": false,
    "digital_real_estate_visits": false,
    "name": "Follow UP",
    "network_sync": true,
    "not_expires_reserves": false,
    "position": 4,
    "radar_enabled": true,
    "site_reserves": false,
    "stagnant_days": 21
  },
  {
    "db_id": 6481696604553216,
    "description": "",
    "digital_real_estate_allow_lease_create": false,
    "digital_real_estate_visits": false,
    "name": "Em Atendimento",
    "network_sync": false,
    "not_expires_reserves": false,
    "position": 5,
    "radar_enabled": false,
    "site_reserves": false,
    "stagnant_days": 5
  },
  {
    "db_id": 6507246727987200,
    "description": "",
    "digital_real_estate_allow_lease_create": false,
    "digital_real_estate_visits": false,
    "name": "Negociação",
    "network_sync": false,
    "not_expires_reserves": true,
    "position": 6,
    "radar_enabled": false,
    "site_reserves": false,
    "stagnant_days": 7
  },
  {
    "db_id": 4677659379367936,
    "description": "",
    "digital_real_estate_allow_lease_create": false,
    "digital_real_estate_visits": false,
    "name": "Fechamento",
    "network_sync": false,
    "not_expires_reserves": true,
    "position": 7,
    "radar_enabled": false,
    "site_reserves": false,
    "stagnant_days": 7
  }
]
```

---

## Deals - Sem parâmetros

**Endpoint:** `/v1/deals`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5381346821144576": {
    "stage_name": "Visita / Apresentação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5944296774565888": {
    "stage_name": "Follow UP",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6481696604553216": {
    "stage_name": "Em Atendimento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6507246727987200": {
    "stage_name": "Negociação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "4677659379367936": {
    "stage_name": "Fechamento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "cursor_all_stages": "++++++",
  "total_pages": 0,
  "total_values": 0,
  "total_deals": 0
}
```

---

## Deals - Com user_id

**Endpoint:** `/v1/deals?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [
      {
        "db_id": 6609519923167232,
        "flag": [],
        "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICguazq3gsMogEQYWMtZGZ6djI0MTE3YWhrbg",
        "status": "in progress",
        "commission": 0,
        "code": "2688",
        "deal_codes": [
          {
            "code": "2688",
            "pipeline_group": 5675099632959488
          }
        ],
        "title": "Interesse Ativo: Apartamento Premium Jooy Lúmen – Agendar Visita",
        "value": 500000,
        "description": "Analise da conversa:\n\n## Relatório Executivo – Análise da Jornada do Cliente Mirian Goncalves\n\n### 1. Perfil e Interesses do Cliente\nMirian Goncalves demonstrou interesse elevado em apartamentos de padrão premium, especificamente no pré-lançamento Jooy Lúmen, localizado no bairro Vilas Boas, Campo Grande/MS. Não há histórico anterior, sendo esta a primeira sequência de interações registrada. O cliente buscou informações detalhadas sobre localização, diferenciais do empreendimento, condições de pagamento, previsão de entrega e características do imóvel, como área de lazer, varanda gourmet, churrasqueira, piscina, academia e playground. A busca é por um apartamento novo, bem localizado, com lazer completo e acabamento de alto padrão, evidenciando perfil exigente e orientado a qualidade. O estágio da jornada é claramente \"decisão\", pois o cliente já avalia detalhes práticos e demonstra disposição para agendar visita. A categoria do cliente é \"ativo\", pois há engajamento, respostas rápidas e solicitações objetivas de informações e visita.\n\n### 2. Potencial de Fechamento de Negócio\nA probabilidade de fechamento é alta. Mirian respondeu prontamente às abordagens, pediu detalhes específicos, confirmou interesse em visita e não apresentou objeções impeditivas. O interesse evoluiu rapidamente de uma exposição inicial à proposta para a solicitação de visita presencial. O score de sentimento (0.71) e o nível de engajamento (alto) reforçam a propensão à conversão. O prazo estimado para fechamento é de curto prazo, pois a cliente está pronta para avançar para a etapa de visita e possível negociação nas próximas 48 horas.\n\n### 3. Objeções e Pontos de Atenção\nAs principais objeções identificadas foram relacionadas ao preço considerado alto e à preferência por imóveis novos (menção negativa a \"velho\"). Essas objeções foram abordadas pelo corretor ao enfatizar os diferenciais do empreendimento, condições especiais de pré-lançamento e previsão de entrega. Entretanto, recomenda-se reforçar argumentos de valorização, condições de pagamento e benefícios exclusivos para superar a sensibilidade ao preço. Não há objeções recorrentes ou impeditivas, mas o ponto do valor deve ser monitorado até o fechamento.\n\n### 4. Análise
```

---

## Deals - Com pipeline_group_id

**Endpoint:** `/v1/deals?pipeline_group_id=5675099632959488`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5381346821144576": {
    "stage_name": "Visita / Apresentação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5944296774565888": {
    "stage_name": "Follow UP",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6481696604553216": {
    "stage_name": "Em Atendimento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6507246727987200": {
    "stage_name": "Negociação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "4677659379367936": {
    "stage_name": "Fechamento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "cursor_all_stages": "++++++",
  "total_pages": 0,
  "total_values": 0,
  "total_deals": 0
}
```

---

## Deals - user_id + pipeline_group_id

**Endpoint:** `/v1/deals?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&pipeline_group_id=5675099632959488`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [
      {
        "db_id": 6609519923167232,
        "flag": [],
        "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICguazq3gsMogEQYWMtZGZ6djI0MTE3YWhrbg",
        "status": "in progress",
        "commission": 0,
        "code": "2688",
        "deal_codes": [
          {
            "code": "2688",
            "pipeline_group": 5675099632959488
          }
        ],
        "title": "Interesse Ativo: Apartamento Premium Jooy Lúmen – Agendar Visita",
        "value": 500000,
        "description": "Analise da conversa:\n\n## Relatório Executivo – Análise da Jornada do Cliente Mirian Goncalves\n\n### 1. Perfil e Interesses do Cliente\nMirian Goncalves demonstrou interesse elevado em apartamentos de padrão premium, especificamente no pré-lançamento Jooy Lúmen, localizado no bairro Vilas Boas, Campo Grande/MS. Não há histórico anterior, sendo esta a primeira sequência de interações registrada. O cliente buscou informações detalhadas sobre localização, diferenciais do empreendimento, condições de pagamento, previsão de entrega e características do imóvel, como área de lazer, varanda gourmet, churrasqueira, piscina, academia e playground. A busca é por um apartamento novo, bem localizado, com lazer completo e acabamento de alto padrão, evidenciando perfil exigente e orientado a qualidade. O estágio da jornada é claramente \"decisão\", pois o cliente já avalia detalhes práticos e demonstra disposição para agendar visita. A categoria do cliente é \"ativo\", pois há engajamento, respostas rápidas e solicitações objetivas de informações e visita.\n\n### 2. Potencial de Fechamento de Negócio\nA probabilidade de fechamento é alta. Mirian respondeu prontamente às abordagens, pediu detalhes específicos, confirmou interesse em visita e não apresentou objeções impeditivas. O interesse evoluiu rapidamente de uma exposição inicial à proposta para a solicitação de visita presencial. O score de sentimento (0.71) e o nível de engajamento (alto) reforçam a propensão à conversão. O prazo estimado para fechamento é de curto prazo, pois a cliente está pronta para avançar para a etapa de visita e possível negociação nas próximas 48 horas.\n\n### 3. Objeções e Pontos de Atenção\nAs principais objeções identificadas foram relacionadas ao preço considerado alto e à preferência por imóveis novos (menção negativa a \"velho\"). Essas objeções foram abordadas pelo corretor ao enfatizar os diferenciais do empreendimento, condições especiais de pré-lançamento e previsão de entrega. Entretanto, recomenda-se reforçar argumentos de valorização, condições de pagamento e benefícios exclusivos para superar a sensibilidade ao preço. Não há objeções recorrentes ou impeditivas, mas o ponto do valor deve ser monitorado até o fechamento.\n\n### 4. Análise
```

---

## Deals - deal_status=all

**Endpoint:** `/v1/deals?deal_status=all`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5381346821144576": {
    "stage_name": "Visita / Apresentação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5944296774565888": {
    "stage_name": "Follow UP",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6481696604553216": {
    "stage_name": "Em Atendimento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6507246727987200": {
    "stage_name": "Negociação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "4677659379367936": {
    "stage_name": "Fechamento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "cursor_all_stages": "++++++",
  "total_pages": 0,
  "total_values": 0,
  "total_deals": 0
}
```

---

## Deals - deal_status=in progress

**Endpoint:** `/v1/deals?deal_status=in%20progress`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5381346821144576": {
    "stage_name": "Visita / Apresentação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5944296774565888": {
    "stage_name": "Follow UP",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6481696604553216": {
    "stage_name": "Em Atendimento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6507246727987200": {
    "stage_name": "Negociação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "4677659379367936": {
    "stage_name": "Fechamento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "cursor_all_stages": "++++++",
  "total_pages": 0,
  "total_values": 0,
  "total_deals": 0
}
```

---

## Deals - deal_status=win

**Endpoint:** `/v1/deals?deal_status=win`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5381346821144576": {
    "stage_name": "Visita / Apresentação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5944296774565888": {
    "stage_name": "Follow UP",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6481696604553216": {
    "stage_name": "Em Atendimento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6507246727987200": {
    "stage_name": "Negociação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "4677659379367936": {
    "stage_name": "Fechamento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "cursor_all_stages": "++++++",
  "total_pages": 0,
  "total_values": 0,
  "total_deals": 0
}
```

---

## Deals - deal_status=lost

**Endpoint:** `/v1/deals?deal_status=lost`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5381346821144576": {
    "stage_name": "Visita / Apresentação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "5944296774565888": {
    "stage_name": "Follow UP",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6481696604553216": {
    "stage_name": "Em Atendimento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6507246727987200": {
    "stage_name": "Negociação",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "4677659379367936": {
    "stage_name": "Fechamento",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "cursor_all_stages": "++++++",
  "total_pages": 0,
  "total_values": 0,
  "total_deals": 0
}
```

---

## Deals - user_id + deal_status=all

**Endpoint:** `/v1/deals?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&deal_status=all`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [
      {
        "db_id": 6609519923167232,
        "flag": [],
        "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICguazq3gsMogEQYWMtZGZ6djI0MTE3YWhrbg",
        "status": "in progress",
        "commission": 0,
        "code": "2688",
        "deal_codes": [
          {
            "code": "2688",
            "pipeline_group": 5675099632959488
          }
        ],
        "title": "Interesse Ativo: Apartamento Premium Jooy Lúmen – Agendar Visita",
        "value": 500000,
        "description": "Analise da conversa:\n\n## Relatório Executivo – Análise da Jornada do Cliente Mirian Goncalves\n\n### 1. Perfil e Interesses do Cliente\nMirian Goncalves demonstrou interesse elevado em apartamentos de padrão premium, especificamente no pré-lançamento Jooy Lúmen, localizado no bairro Vilas Boas, Campo Grande/MS. Não há histórico anterior, sendo esta a primeira sequência de interações registrada. O cliente buscou informações detalhadas sobre localização, diferenciais do empreendimento, condições de pagamento, previsão de entrega e características do imóvel, como área de lazer, varanda gourmet, churrasqueira, piscina, academia e playground. A busca é por um apartamento novo, bem localizado, com lazer completo e acabamento de alto padrão, evidenciando perfil exigente e orientado a qualidade. O estágio da jornada é claramente \"decisão\", pois o cliente já avalia detalhes práticos e demonstra disposição para agendar visita. A categoria do cliente é \"ativo\", pois há engajamento, respostas rápidas e solicitações objetivas de informações e visita.\n\n### 2. Potencial de Fechamento de Negócio\nA probabilidade de fechamento é alta. Mirian respondeu prontamente às abordagens, pediu detalhes específicos, confirmou interesse em visita e não apresentou objeções impeditivas. O interesse evoluiu rapidamente de uma exposição inicial à proposta para a solicitação de visita presencial. O score de sentimento (0.71) e o nível de engajamento (alto) reforçam a propensão à conversão. O prazo estimado para fechamento é de curto prazo, pois a cliente está pronta para avançar para a etapa de visita e possível negociação nas próximas 48 horas.\n\n### 3. Objeções e Pontos de Atenção\nAs principais objeções identificadas foram relacionadas ao preço considerado alto e à preferência por imóveis novos (menção negativa a \"velho\"). Essas objeções foram abordadas pelo corretor ao enfatizar os diferenciais do empreendimento, condições especiais de pré-lançamento e previsão de entrega. Entretanto, recomenda-se reforçar argumentos de valorização, condições de pagamento e benefícios exclusivos para superar a sensibilidade ao preço. Não há objeções recorrentes ou impeditivas, mas o ponto do valor deve ser monitorado até o fechamento.\n\n### 4. Análise
```

---

## Deals - user_id + deal_status=in progress

**Endpoint:** `/v1/deals?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&deal_status=in%20progress`
**Status:** 200

**Resposta:**
```json
{
  "4584666827849728": {
    "stage_name": "Oportunidades",
    "deals": [],
    "cursor": null,
    "count": 0,
    "total": 0
  },
  "6005926736691200": {
    "stage_name": "Qualificação e Interesse",
    "deals": [
      {
        "db_id": 6609519923167232,
        "flag": [],
        "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICguazq3gsMogEQYWMtZGZ6djI0MTE3YWhrbg",
        "status": "in progress",
        "commission": 0,
        "code": "2688",
        "deal_codes": [
          {
            "code": "2688",
            "pipeline_group": 5675099632959488
          }
        ],
        "title": "Interesse Ativo: Apartamento Premium Jooy Lúmen – Agendar Visita",
        "value": 500000,
        "description": "Analise da conversa:\n\n## Relatório Executivo – Análise da Jornada do Cliente Mirian Goncalves\n\n### 1. Perfil e Interesses do Cliente\nMirian Goncalves demonstrou interesse elevado em apartamentos de padrão premium, especificamente no pré-lançamento Jooy Lúmen, localizado no bairro Vilas Boas, Campo Grande/MS. Não há histórico anterior, sendo esta a primeira sequência de interações registrada. O cliente buscou informações detalhadas sobre localização, diferenciais do empreendimento, condições de pagamento, previsão de entrega e características do imóvel, como área de lazer, varanda gourmet, churrasqueira, piscina, academia e playground. A busca é por um apartamento novo, bem localizado, com lazer completo e acabamento de alto padrão, evidenciando perfil exigente e orientado a qualidade. O estágio da jornada é claramente \"decisão\", pois o cliente já avalia detalhes práticos e demonstra disposição para agendar visita. A categoria do cliente é \"ativo\", pois há engajamento, respostas rápidas e solicitações objetivas de informações e visita.\n\n### 2. Potencial de Fechamento de Negócio\nA probabilidade de fechamento é alta. Mirian respondeu prontamente às abordagens, pediu detalhes específicos, confirmou interesse em visita e não apresentou objeções impeditivas. O interesse evoluiu rapidamente de uma exposição inicial à proposta para a solicitação de visita presencial. O score de sentimento (0.71) e o nível de engajamento (alto) reforçam a propensão à conversão. O prazo estimado para fechamento é de curto prazo, pois a cliente está pronta para avançar para a etapa de visita e possível negociação nas próximas 48 horas.\n\n### 3. Objeções e Pontos de Atenção\nAs principais objeções identificadas foram relacionadas ao preço considerado alto e à preferência por imóveis novos (menção negativa a \"velho\"). Essas objeções foram abordadas pelo corretor ao enfatizar os diferenciais do empreendimento, condições especiais de pré-lançamento e previsão de entrega. Entretanto, recomenda-se reforçar argumentos de valorização, condições de pagamento e benefícios exclusivos para superar a sensibilidade ao preço. Não há objeções recorrentes ou impeditivas, mas o ponto do valor deve ser monitorado até o fechamento.\n\n### 4. Análise
```

---

## Deals Search - Sem parâmetros

**Endpoint:** `/v1/deals/search?limit=5`
**Status:** 200

**Resposta:**
```json
{
  "name": "",
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 2418,
  "deals": [
    {
      "db_id": 5979731189563392,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgy4rRzwoMogEQYWMtZGZ6djI0MTE3YWhrbg",
      "status": "in progress",
      "commission": 0,
      "code": "4754",
      "deal_codes": [
        {
          "code": "4754",
          "pipeline_group": 5675099632959488
        }
      ],
      "title": "Código 399",
      "value": 1500000,
      "description": "Cliente através do whatsapp em busca do imóvel de cód 399, prosseguir com o atendimento\n",
      "stagnant": false,
      "stage_date": "2025-12-11T09:14:21.843461",
      "send_property_match": true,
      "send_property_match_by_whatsapp": false,
      "favorite": false,
      "date_close": null,
      "stage_name": "Oportunidades",
      "stage_position": 1,
      "stage_count": 7,
      "interest": "buy",
      "pipeline_group_name": "Geral de Negócios",
      "pipeline_group_key": "GDN",
      "pipeline_group_type": "default",
      "participants": [],
      "without_activities": false,
      "contact": {
        "contact_type": "person",
        "db_id": 5059834909556736,
        "name": "Jefferson Jefferson",
        "phone": {
          "alpha2Code": "br",
          "country_code": null,
          "number": "(67) 9989-5909",
          "sector": null,
          "type": "mobile",
          "number_plain": "6799895909"
        },
        "phones": [
          {
            "alpha2Code": "br",
            "country_code": null,
            "number": "(67) 9989-5909",
            "sector": null,
            "type": "mobile",
            "number_plain": "6799895909"
          }
        ],
        "email": [],
        "image_url": null,
        "code": "16363"
      },
      "user": {
        "name": "Mariana Cabriotti",
        "email": "marianacabriotti@gmail.com",
        "image_url": "https://lh3.googleusercontent.com/RDp-ARbf2-xyHUc960zA7atHBkX4jqRYGLH7zQqp_YrTMAZYr59M0CKGFGmLCIkK1yjlUg8Uu1Zo6Cyh4jnag98uhqvQrWzi7gUZdKevjxpTTuzLbHUV0AQ",
        "db_id": "QTEm89uOqdavsUDZpALJdNJKgws1"
      },
      "card_info": [
        {
          "name": "creation_date",
          "value": "2025-12-10T20:55:47.553250",
          "type": "string",
          "position": 9,
          "field_id": "created_at"
        },
        {
          "name": "updated_date",
          "value": "2025-12-11T09:14:22.736336",
          "type": "string",
          "position": 10,
          "field_id": "updated_at"
        }
      ],
      "created_at": "2025-12-10T20:55:47.553250Z",
      "reserves_expired": 0,
      "activities_scheduled": 0,
      "activities_overdue": 0,
      "today_activities": 0
    },
    {
      "db_id": 4991122730909696,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgi-Xs7ggMog
```

---

## Deals Search - Com user_id

**Endpoint:** `/v1/deals/search?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&limit=5`
**Status:** 200

**Resposta:**
```json
{
  "name": "",
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 2418,
  "deals": [
    {
      "db_id": 5979731189563392,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgy4rRzwoMogEQYWMtZGZ6djI0MTE3YWhrbg",
      "status": "in progress",
      "commission": 0,
      "code": "4754",
      "deal_codes": [
        {
          "code": "4754",
          "pipeline_group": 5675099632959488
        }
      ],
      "title": "Código 399",
      "value": 1500000,
      "description": "Cliente através do whatsapp em busca do imóvel de cód 399, prosseguir com o atendimento\n",
      "stagnant": false,
      "stage_date": "2025-12-11T09:14:21.843461",
      "send_property_match": true,
      "send_property_match_by_whatsapp": false,
      "favorite": false,
      "date_close": null,
      "stage_name": "Oportunidades",
      "stage_position": 1,
      "stage_count": 7,
      "interest": "buy",
      "pipeline_group_name": "Geral de Negócios",
      "pipeline_group_key": "GDN",
      "pipeline_group_type": "default",
      "participants": [],
      "without_activities": false,
      "contact": {
        "contact_type": "person",
        "db_id": 5059834909556736,
        "name": "Jefferson Jefferson",
        "phone": {
          "alpha2Code": "br",
          "country_code": null,
          "number": "(67) 9989-5909",
          "sector": null,
          "type": "mobile",
          "number_plain": "6799895909"
        },
        "phones": [
          {
            "alpha2Code": "br",
            "country_code": null,
            "number": "(67) 9989-5909",
            "sector": null,
            "type": "mobile",
            "number_plain": "6799895909"
          }
        ],
        "email": [],
        "image_url": null,
        "code": "16363"
      },
      "user": {
        "name": "Mariana Cabriotti",
        "email": "marianacabriotti@gmail.com",
        "image_url": "https://lh3.googleusercontent.com/RDp-ARbf2-xyHUc960zA7atHBkX4jqRYGLH7zQqp_YrTMAZYr59M0CKGFGmLCIkK1yjlUg8Uu1Zo6Cyh4jnag98uhqvQrWzi7gUZdKevjxpTTuzLbHUV0AQ",
        "db_id": "QTEm89uOqdavsUDZpALJdNJKgws1"
      },
      "card_info": [
        {
          "name": "creation_date",
          "value": "2025-12-10T20:55:47.553250",
          "type": "string",
          "position": 9,
          "field_id": "created_at"
        },
        {
          "name": "updated_date",
          "value": "2025-12-11T09:14:22.736336",
          "type": "string",
          "position": 10,
          "field_id": "updated_at"
        }
      ],
      "created_at": "2025-12-10T20:55:47.553250Z",
      "reserves_expired": 0,
      "activities_scheduled": 0,
      "activities_overdue": 0,
      "today_activities": 0
    },
    {
      "db_id": 4991122730909696,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgi-Xs7ggMog
```

---

## Deals Search - deal_status=all

**Endpoint:** `/v1/deals/search?deal_status=all&limit=5`
**Status:** 200

**Resposta:**
```json
{
  "name": "",
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 2418,
  "deals": [
    {
      "db_id": 5979731189563392,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgy4rRzwoMogEQYWMtZGZ6djI0MTE3YWhrbg",
      "status": "in progress",
      "commission": 0,
      "code": "4754",
      "deal_codes": [
        {
          "code": "4754",
          "pipeline_group": 5675099632959488
        }
      ],
      "title": "Código 399",
      "value": 1500000,
      "description": "Cliente através do whatsapp em busca do imóvel de cód 399, prosseguir com o atendimento\n",
      "stagnant": false,
      "stage_date": "2025-12-11T09:14:21.843461",
      "send_property_match": true,
      "send_property_match_by_whatsapp": false,
      "favorite": false,
      "date_close": null,
      "stage_name": "Oportunidades",
      "stage_position": 1,
      "stage_count": 7,
      "interest": "buy",
      "pipeline_group_name": "Geral de Negócios",
      "pipeline_group_key": "GDN",
      "pipeline_group_type": "default",
      "participants": [],
      "without_activities": false,
      "contact": {
        "contact_type": "person",
        "db_id": 5059834909556736,
        "name": "Jefferson Jefferson",
        "phone": {
          "alpha2Code": "br",
          "country_code": null,
          "number": "(67) 9989-5909",
          "sector": null,
          "type": "mobile",
          "number_plain": "6799895909"
        },
        "phones": [
          {
            "alpha2Code": "br",
            "country_code": null,
            "number": "(67) 9989-5909",
            "sector": null,
            "type": "mobile",
            "number_plain": "6799895909"
          }
        ],
        "email": [],
        "image_url": null,
        "code": "16363"
      },
      "user": {
        "name": "Mariana Cabriotti",
        "email": "marianacabriotti@gmail.com",
        "image_url": "https://lh3.googleusercontent.com/RDp-ARbf2-xyHUc960zA7atHBkX4jqRYGLH7zQqp_YrTMAZYr59M0CKGFGmLCIkK1yjlUg8Uu1Zo6Cyh4jnag98uhqvQrWzi7gUZdKevjxpTTuzLbHUV0AQ",
        "db_id": "QTEm89uOqdavsUDZpALJdNJKgws1"
      },
      "card_info": [
        {
          "name": "creation_date",
          "value": "2025-12-10T20:55:47.553250",
          "type": "string",
          "position": 9,
          "field_id": "created_at"
        },
        {
          "name": "updated_date",
          "value": "2025-12-11T09:14:22.736336",
          "type": "string",
          "position": 10,
          "field_id": "updated_at"
        }
      ],
      "created_at": "2025-12-10T20:55:47.553250Z",
      "reserves_expired": 0,
      "activities_scheduled": 0,
      "activities_overdue": 0,
      "today_activities": 0
    },
    {
      "db_id": 4991122730909696,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgi-Xs7ggMog
```

---

## Deals Search - deal_status=in progress

**Endpoint:** `/v1/deals/search?deal_status=in%20progress&limit=5`
**Status:** 200

**Resposta:**
```json
{
  "name": "",
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 2418,
  "deals": [
    {
      "db_id": 5979731189563392,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgy4rRzwoMogEQYWMtZGZ6djI0MTE3YWhrbg",
      "status": "in progress",
      "commission": 0,
      "code": "4754",
      "deal_codes": [
        {
          "code": "4754",
          "pipeline_group": 5675099632959488
        }
      ],
      "title": "Código 399",
      "value": 1500000,
      "description": "Cliente através do whatsapp em busca do imóvel de cód 399, prosseguir com o atendimento\n",
      "stagnant": false,
      "stage_date": "2025-12-11T09:14:21.843461",
      "send_property_match": true,
      "send_property_match_by_whatsapp": false,
      "favorite": false,
      "date_close": null,
      "stage_name": "Oportunidades",
      "stage_position": 1,
      "stage_count": 7,
      "interest": "buy",
      "pipeline_group_name": "Geral de Negócios",
      "pipeline_group_key": "GDN",
      "pipeline_group_type": "default",
      "participants": [],
      "without_activities": false,
      "contact": {
        "contact_type": "person",
        "db_id": 5059834909556736,
        "name": "Jefferson Jefferson",
        "phone": {
          "alpha2Code": "br",
          "country_code": null,
          "number": "(67) 9989-5909",
          "sector": null,
          "type": "mobile",
          "number_plain": "6799895909"
        },
        "phones": [
          {
            "alpha2Code": "br",
            "country_code": null,
            "number": "(67) 9989-5909",
            "sector": null,
            "type": "mobile",
            "number_plain": "6799895909"
          }
        ],
        "email": [],
        "image_url": null,
        "code": "16363"
      },
      "user": {
        "name": "Mariana Cabriotti",
        "email": "marianacabriotti@gmail.com",
        "image_url": "https://lh3.googleusercontent.com/RDp-ARbf2-xyHUc960zA7atHBkX4jqRYGLH7zQqp_YrTMAZYr59M0CKGFGmLCIkK1yjlUg8Uu1Zo6Cyh4jnag98uhqvQrWzi7gUZdKevjxpTTuzLbHUV0AQ",
        "db_id": "QTEm89uOqdavsUDZpALJdNJKgws1"
      },
      "card_info": [
        {
          "name": "creation_date",
          "value": "2025-12-10T20:55:47.553250",
          "type": "string",
          "position": 9,
          "field_id": "created_at"
        },
        {
          "name": "updated_date",
          "value": "2025-12-11T09:14:22.736336",
          "type": "string",
          "position": 10,
          "field_id": "updated_at"
        }
      ],
      "created_at": "2025-12-10T20:55:47.553250Z",
      "reserves_expired": 0,
      "activities_scheduled": 0,
      "activities_overdue": 0,
      "today_activities": 0
    },
    {
      "db_id": 4991122730909696,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgi-Xs7ggMog
```

---

## Deals Search - user_id + deal_status=in progress

**Endpoint:** `/v1/deals/search?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&deal_status=in%20progress&limit=5`
**Status:** 200

**Resposta:**
```json
{
  "name": "",
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 2418,
  "deals": [
    {
      "db_id": 5979731189563392,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgy4rRzwoMogEQYWMtZGZ6djI0MTE3YWhrbg",
      "status": "in progress",
      "commission": 0,
      "code": "4754",
      "deal_codes": [
        {
          "code": "4754",
          "pipeline_group": 5675099632959488
        }
      ],
      "title": "Código 399",
      "value": 1500000,
      "description": "Cliente através do whatsapp em busca do imóvel de cód 399, prosseguir com o atendimento\n",
      "stagnant": false,
      "stage_date": "2025-12-11T09:14:21.843461",
      "send_property_match": true,
      "send_property_match_by_whatsapp": false,
      "favorite": false,
      "date_close": null,
      "stage_name": "Oportunidades",
      "stage_position": 1,
      "stage_count": 7,
      "interest": "buy",
      "pipeline_group_name": "Geral de Negócios",
      "pipeline_group_key": "GDN",
      "pipeline_group_type": "default",
      "participants": [],
      "without_activities": false,
      "contact": {
        "contact_type": "person",
        "db_id": 5059834909556736,
        "name": "Jefferson Jefferson",
        "phone": {
          "alpha2Code": "br",
          "country_code": null,
          "number": "(67) 9989-5909",
          "sector": null,
          "type": "mobile",
          "number_plain": "6799895909"
        },
        "phones": [
          {
            "alpha2Code": "br",
            "country_code": null,
            "number": "(67) 9989-5909",
            "sector": null,
            "type": "mobile",
            "number_plain": "6799895909"
          }
        ],
        "email": [],
        "image_url": null,
        "code": "16363"
      },
      "user": {
        "name": "Mariana Cabriotti",
        "email": "marianacabriotti@gmail.com",
        "image_url": "https://lh3.googleusercontent.com/RDp-ARbf2-xyHUc960zA7atHBkX4jqRYGLH7zQqp_YrTMAZYr59M0CKGFGmLCIkK1yjlUg8Uu1Zo6Cyh4jnag98uhqvQrWzi7gUZdKevjxpTTuzLbHUV0AQ",
        "db_id": "QTEm89uOqdavsUDZpALJdNJKgws1"
      },
      "card_info": [
        {
          "name": "creation_date",
          "value": "2025-12-10T20:55:47.553250",
          "type": "string",
          "position": 9,
          "field_id": "created_at"
        },
        {
          "name": "updated_date",
          "value": "2025-12-11T09:14:22.736336",
          "type": "string",
          "position": 10,
          "field_id": "updated_at"
        }
      ],
      "created_at": "2025-12-10T20:55:47.553250Z",
      "reserves_expired": 0,
      "activities_scheduled": 0,
      "activities_overdue": 0,
      "today_activities": 0
    },
    {
      "db_id": 4991122730909696,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgi-Xs7ggMog
```

---

## Deals Search - show_activities=true

**Endpoint:** `/v1/deals/search?show_activities=true&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "name": "",
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 2418,
  "deals": [
    {
      "db_id": 5979731189563392,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgy4rRzwoMogEQYWMtZGZ6djI0MTE3YWhrbg",
      "status": "in progress",
      "commission": 0,
      "code": "4754",
      "deal_codes": [
        {
          "code": "4754",
          "pipeline_group": 5675099632959488
        }
      ],
      "title": "Código 399",
      "value": 1500000,
      "description": "Cliente através do whatsapp em busca do imóvel de cód 399, prosseguir com o atendimento\n",
      "stagnant": false,
      "stage_date": "2025-12-11T09:14:21.843461",
      "send_property_match": true,
      "send_property_match_by_whatsapp": false,
      "favorite": false,
      "date_close": null,
      "stage_name": "Oportunidades",
      "stage_position": 1,
      "stage_count": 7,
      "interest": "buy",
      "pipeline_group_name": "Geral de Negócios",
      "pipeline_group_key": "GDN",
      "pipeline_group_type": "default",
      "participants": [],
      "without_activities": false,
      "contact": {
        "contact_type": "person",
        "db_id": 5059834909556736,
        "name": "Jefferson Jefferson",
        "phone": {
          "alpha2Code": "br",
          "country_code": null,
          "number": "(67) 9989-5909",
          "sector": null,
          "type": "mobile",
          "number_plain": "6799895909"
        },
        "phones": [
          {
            "alpha2Code": "br",
            "country_code": null,
            "number": "(67) 9989-5909",
            "sector": null,
            "type": "mobile",
            "number_plain": "6799895909"
          }
        ],
        "email": [],
        "image_url": null,
        "code": "16363"
      },
      "user": {
        "name": "Mariana Cabriotti",
        "email": "marianacabriotti@gmail.com",
        "image_url": "https://lh3.googleusercontent.com/RDp-ARbf2-xyHUc960zA7atHBkX4jqRYGLH7zQqp_YrTMAZYr59M0CKGFGmLCIkK1yjlUg8Uu1Zo6Cyh4jnag98uhqvQrWzi7gUZdKevjxpTTuzLbHUV0AQ",
        "db_id": "QTEm89uOqdavsUDZpALJdNJKgws1"
      },
      "card_info": [
        {
          "name": "creation_date",
          "value": "2025-12-10T20:55:47.553250",
          "type": "string",
          "position": 9,
          "field_id": "created_at"
        },
        {
          "name": "updated_date",
          "value": "2025-12-11T09:14:22.736336",
          "type": "string",
          "position": 10,
          "field_id": "updated_at"
        }
      ],
      "created_at": "2025-12-10T20:55:47.553250Z",
      "reserves_expired": 0,
      "activities_scheduled": 0,
      "activities_overdue": 0,
      "today_activities": 0
    },
    {
      "db_id": 4991122730909696,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgi-Xs7ggMog
```

---

## Deals Search - Com pipeline_id

**Endpoint:** `/v1/deals/search?pipeline_id=4584666827849728&limit=5`
**Status:** 200

**Resposta:**
```json
{
  "name": "",
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 2418,
  "deals": [
    {
      "db_id": 5979731189563392,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgy4rRzwoMogEQYWMtZGZ6djI0MTE3YWhrbg",
      "status": "in progress",
      "commission": 0,
      "code": "4754",
      "deal_codes": [
        {
          "code": "4754",
          "pipeline_group": 5675099632959488
        }
      ],
      "title": "Código 399",
      "value": 1500000,
      "description": "Cliente através do whatsapp em busca do imóvel de cód 399, prosseguir com o atendimento\n",
      "stagnant": false,
      "stage_date": "2025-12-11T09:14:21.843461",
      "send_property_match": true,
      "send_property_match_by_whatsapp": false,
      "favorite": false,
      "date_close": null,
      "stage_name": "Oportunidades",
      "stage_position": 1,
      "stage_count": 7,
      "interest": "buy",
      "pipeline_group_name": "Geral de Negócios",
      "pipeline_group_key": "GDN",
      "pipeline_group_type": "default",
      "participants": [],
      "without_activities": false,
      "contact": {
        "contact_type": "person",
        "db_id": 5059834909556736,
        "name": "Jefferson Jefferson",
        "phone": {
          "alpha2Code": "br",
          "country_code": null,
          "number": "(67) 9989-5909",
          "sector": null,
          "type": "mobile",
          "number_plain": "6799895909"
        },
        "phones": [
          {
            "alpha2Code": "br",
            "country_code": null,
            "number": "(67) 9989-5909",
            "sector": null,
            "type": "mobile",
            "number_plain": "6799895909"
          }
        ],
        "email": [],
        "image_url": null,
        "code": "16363"
      },
      "user": {
        "name": "Mariana Cabriotti",
        "email": "marianacabriotti@gmail.com",
        "image_url": "https://lh3.googleusercontent.com/RDp-ARbf2-xyHUc960zA7atHBkX4jqRYGLH7zQqp_YrTMAZYr59M0CKGFGmLCIkK1yjlUg8Uu1Zo6Cyh4jnag98uhqvQrWzi7gUZdKevjxpTTuzLbHUV0AQ",
        "db_id": "QTEm89uOqdavsUDZpALJdNJKgws1"
      },
      "card_info": [
        {
          "name": "creation_date",
          "value": "2025-12-10T20:55:47.553250",
          "type": "string",
          "position": 9,
          "field_id": "created_at"
        },
        {
          "name": "updated_date",
          "value": "2025-12-11T09:14:22.736336",
          "type": "string",
          "position": 10,
          "field_id": "updated_at"
        }
      ],
      "created_at": "2025-12-10T20:55:47.553250Z",
      "reserves_expired": 0,
      "activities_scheduled": 0,
      "activities_overdue": 0,
      "today_activities": 0
    },
    {
      "db_id": 4991122730909696,
      "flag": [],
      "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEQsSBERlYWwYgICgi-Xs7ggMog
```

---

## Contatos - Sem filtros

**Endpoint:** `/v1/contacts?limit=3`
**Status:** 200

**Resposta:**
```json
{
  "contacts": [
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 9984-7530",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6799847530",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "5352720932798464",
      "code": "10063",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Nenhum",
      "name": "Alexandre Rezende",
      "fullname": "Alexandre Rezende",
      "tags": [
        "contact",
        "1 Milhão à 2 Milhões"
      ],
      "created_at": "2025-03-13T16:49:46.213252",
      "updated_at": "2025-04-17T20:32:26.955575",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": "+55",
          "number": "6796639223",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6796639223"
        }
      ],
      "birthday": false,
      "contact_id": "6355670164045824",
      "code": "1483",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASBsed0f75ekG4FSUKxgMO56mLhAXR-l_V20ygPsW-5fSg&oe=661A55D3&_nc_sid=e6ed6c&_nc_cat=111",
      "media_source": "WhatsApp",
      "name": "Arquitetura Aline",
      "fullname": "Arquitetura Aline Picetti",
      "tags": [
        "contact"
      ],
      "created_at": "2024-04-03T13:26:01.096357",
      "updated_at": "2024-07-02T22:08:49.392863",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": 27,
      "database": "ac-dfzv24117ahkn",
      "emails": [
        "higornicolas894@gmail.com"
      ],
      "email": "higornicolas894@gmail.com",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99316-4816",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "67993164816"
        }
      ],
      "birthday": false,
      "contact_id": "5198170540212224",
      "code": "9134",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": "Fernando Silva",
      "fullname": "Fernando Higor Nascimento Silva",
      "tags": [
        "contact"
      ],
      "created_at": "2024-10-16T14:52:29.683315",
      "updated_at": "2024-11-05T18:13:11.099187",
      "cpf": "073.405.561-76",
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99925-2438",
        
```

---

## Contatos - contact_type=person

**Endpoint:** `/v1/contacts?contact_type=person&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "contacts": [
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 9984-7530",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6799847530",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "5352720932798464",
      "code": "10063",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Nenhum",
      "name": "Alexandre Rezende",
      "fullname": "Alexandre Rezende",
      "tags": [
        "contact",
        "1 Milhão à 2 Milhões"
      ],
      "created_at": "2025-03-13T16:49:46.213252",
      "updated_at": "2025-04-17T20:32:26.955575",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": "+55",
          "number": "6796639223",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6796639223"
        }
      ],
      "birthday": false,
      "contact_id": "6355670164045824",
      "code": "1483",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASBsed0f75ekG4FSUKxgMO56mLhAXR-l_V20ygPsW-5fSg&oe=661A55D3&_nc_sid=e6ed6c&_nc_cat=111",
      "media_source": "WhatsApp",
      "name": "Arquitetura Aline",
      "fullname": "Arquitetura Aline Picetti",
      "tags": [
        "contact"
      ],
      "created_at": "2024-04-03T13:26:01.096357",
      "updated_at": "2024-07-02T22:08:49.392863",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": 27,
      "database": "ac-dfzv24117ahkn",
      "emails": [
        "higornicolas894@gmail.com"
      ],
      "email": "higornicolas894@gmail.com",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99316-4816",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "67993164816"
        }
      ],
      "birthday": false,
      "contact_id": "5198170540212224",
      "code": "9134",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": "Fernando Silva",
      "fullname": "Fernando Higor Nascimento Silva",
      "tags": [
        "contact"
      ],
      "created_at": "2024-10-16T14:52:29.683315",
      "updated_at": "2024-11-05T18:13:11.099187",
      "cpf": "073.405.561-76",
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99925-2438",
        
```

---

## Contatos - contact_type=organization

**Endpoint:** `/v1/contacts?contact_type=organization&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "contacts": [
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 9984-7530",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6799847530",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "5352720932798464",
      "code": "10063",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Nenhum",
      "name": "Alexandre Rezende",
      "fullname": "Alexandre Rezende",
      "tags": [
        "contact",
        "1 Milhão à 2 Milhões"
      ],
      "created_at": "2025-03-13T16:49:46.213252",
      "updated_at": "2025-04-17T20:32:26.955575",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": "+55",
          "number": "6796639223",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6796639223"
        }
      ],
      "birthday": false,
      "contact_id": "6355670164045824",
      "code": "1483",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASBsed0f75ekG4FSUKxgMO56mLhAXR-l_V20ygPsW-5fSg&oe=661A55D3&_nc_sid=e6ed6c&_nc_cat=111",
      "media_source": "WhatsApp",
      "name": "Arquitetura Aline",
      "fullname": "Arquitetura Aline Picetti",
      "tags": [
        "contact"
      ],
      "created_at": "2024-04-03T13:26:01.096357",
      "updated_at": "2024-07-02T22:08:49.392863",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": 27,
      "database": "ac-dfzv24117ahkn",
      "emails": [
        "higornicolas894@gmail.com"
      ],
      "email": "higornicolas894@gmail.com",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99316-4816",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "67993164816"
        }
      ],
      "birthday": false,
      "contact_id": "5198170540212224",
      "code": "9134",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": "Fernando Silva",
      "fullname": "Fernando Higor Nascimento Silva",
      "tags": [
        "contact"
      ],
      "created_at": "2024-10-16T14:52:29.683315",
      "updated_at": "2024-11-05T18:13:11.099187",
      "cpf": "073.405.561-76",
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99925-2438",
        
```

---

## Contatos - contact_type=lead

**Endpoint:** `/v1/contacts?contact_type=lead&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "contacts": [
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "6792386180\n",
          "alpha2Code": null,
          "type": "mobile",
          "number_plain": "6792386180",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "6050493783080960",
      "code": "286",
      "contact_type": "person",
      "favorite": false,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": " Naoinformado",
      "fullname": " Naoinformado",
      "tags": [
        "lead"
      ],
      "created_at": "2025-07-14T12:06:04.722784",
      "updated_at": "2025-07-17T14:22:26.572272",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "alpha2Code": null,
          "country_code": null,
          "number": "6798205296\n",
          "sector": null,
          "type": "mobile",
          "number_plain": "6798205296"
        }
      ],
      "birthday": false,
      "contact_id": "5775160005623808",
      "code": "259",
      "contact_type": "person",
      "favorite": false,
      "active": true,
      "profile_image_url": null,
      "media_source": "WhatsApp",
      "name": " Naoinformado",
      "fullname": " Naoinformado",
      "tags": [
        "lead"
      ],
      "created_at": "2025-07-10T10:26:14.394940",
      "updated_at": "2025-07-10T10:26:14.394940",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "3299366211\n",
          "alpha2Code": null,
          "type": "mobile",
          "number_plain": "3299366211",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "4856474923171840",
      "code": "853",
      "contact_type": "person",
      "favorite": false,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": " Naoinformado",
      "fullname": " Naoinformado",
      "tags": [
        "lead"
      ],
      "created_at": "2025-08-18T13:29:51.691437",
      "updated_at": "2025-08-18T13:36:03.193400",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "6798439126\n",
          "alpha2Code": null,
          "type": "mobile",
          "number_plain": "6798439126",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "4990105616384000",
      "code": "204",
      "contact_type": "person",
      "favorite": false,
      "active": true,
      
```

---

## Contatos - active=true

**Endpoint:** `/v1/contacts?active=true&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "contacts": [
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 9984-7530",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6799847530",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "5352720932798464",
      "code": "10063",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Nenhum",
      "name": "Alexandre Rezende",
      "fullname": "Alexandre Rezende",
      "tags": [
        "contact",
        "1 Milhão à 2 Milhões"
      ],
      "created_at": "2025-03-13T16:49:46.213252",
      "updated_at": "2025-04-17T20:32:26.955575",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": "+55",
          "number": "6796639223",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6796639223"
        }
      ],
      "birthday": false,
      "contact_id": "6355670164045824",
      "code": "1483",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASBsed0f75ekG4FSUKxgMO56mLhAXR-l_V20ygPsW-5fSg&oe=661A55D3&_nc_sid=e6ed6c&_nc_cat=111",
      "media_source": "WhatsApp",
      "name": "Arquitetura Aline",
      "fullname": "Arquitetura Aline Picetti",
      "tags": [
        "contact"
      ],
      "created_at": "2024-04-03T13:26:01.096357",
      "updated_at": "2024-07-02T22:08:49.392863",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": 27,
      "database": "ac-dfzv24117ahkn",
      "emails": [
        "higornicolas894@gmail.com"
      ],
      "email": "higornicolas894@gmail.com",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99316-4816",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "67993164816"
        }
      ],
      "birthday": false,
      "contact_id": "5198170540212224",
      "code": "9134",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": "Fernando Silva",
      "fullname": "Fernando Higor Nascimento Silva",
      "tags": [
        "contact"
      ],
      "created_at": "2024-10-16T14:52:29.683315",
      "updated_at": "2024-11-05T18:13:11.099187",
      "cpf": "073.405.561-76",
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99925-2438",
        
```

---

## Contatos - favorite=true

**Endpoint:** `/v1/contacts?favorite=true&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "contacts": [
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 9984-7530",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6799847530",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "5352720932798464",
      "code": "10063",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Nenhum",
      "name": "Alexandre Rezende",
      "fullname": "Alexandre Rezende",
      "tags": [
        "contact",
        "1 Milhão à 2 Milhões"
      ],
      "created_at": "2025-03-13T16:49:46.213252",
      "updated_at": "2025-04-17T20:32:26.955575",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": "+55",
          "number": "6796639223",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6796639223"
        }
      ],
      "birthday": false,
      "contact_id": "6355670164045824",
      "code": "1483",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASBsed0f75ekG4FSUKxgMO56mLhAXR-l_V20ygPsW-5fSg&oe=661A55D3&_nc_sid=e6ed6c&_nc_cat=111",
      "media_source": "WhatsApp",
      "name": "Arquitetura Aline",
      "fullname": "Arquitetura Aline Picetti",
      "tags": [
        "contact"
      ],
      "created_at": "2024-04-03T13:26:01.096357",
      "updated_at": "2024-07-02T22:08:49.392863",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": 27,
      "database": "ac-dfzv24117ahkn",
      "emails": [
        "higornicolas894@gmail.com"
      ],
      "email": "higornicolas894@gmail.com",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99316-4816",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "67993164816"
        }
      ],
      "birthday": false,
      "contact_id": "5198170540212224",
      "code": "9134",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": "Fernando Silva",
      "fullname": "Fernando Higor Nascimento Silva",
      "tags": [
        "contact"
      ],
      "created_at": "2024-10-16T14:52:29.683315",
      "updated_at": "2024-11-05T18:13:11.099187",
      "cpf": "073.405.561-76",
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99925-2438",
        
```

---

## Contatos - Com user_id

**Endpoint:** `/v1/contacts?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "contacts": [
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 9984-7530",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6799847530",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "5352720932798464",
      "code": "10063",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Nenhum",
      "name": "Alexandre Rezende",
      "fullname": "Alexandre Rezende",
      "tags": [
        "contact",
        "1 Milhão à 2 Milhões"
      ],
      "created_at": "2025-03-13T16:49:46.213252",
      "updated_at": "2025-04-17T20:32:26.955575",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": "+55",
          "number": "6796639223",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6796639223"
        }
      ],
      "birthday": false,
      "contact_id": "6355670164045824",
      "code": "1483",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASBsed0f75ekG4FSUKxgMO56mLhAXR-l_V20ygPsW-5fSg&oe=661A55D3&_nc_sid=e6ed6c&_nc_cat=111",
      "media_source": "WhatsApp",
      "name": "Arquitetura Aline",
      "fullname": "Arquitetura Aline Picetti",
      "tags": [
        "contact"
      ],
      "created_at": "2024-04-03T13:26:01.096357",
      "updated_at": "2024-07-02T22:08:49.392863",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": 27,
      "database": "ac-dfzv24117ahkn",
      "emails": [
        "higornicolas894@gmail.com"
      ],
      "email": "higornicolas894@gmail.com",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99316-4816",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "67993164816"
        }
      ],
      "birthday": false,
      "contact_id": "5198170540212224",
      "code": "9134",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": "Fernando Silva",
      "fullname": "Fernando Higor Nascimento Silva",
      "tags": [
        "contact"
      ],
      "created_at": "2024-10-16T14:52:29.683315",
      "updated_at": "2024-11-05T18:13:11.099187",
      "cpf": "073.405.561-76",
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "(67) 99925-2438",
        
```

---

## Contatos - Com manager_id

**Endpoint:** `/v1/contacts?manager_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "contacts": [
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": "+55",
          "number": "6796639223",
          "alpha2Code": "br",
          "type": "mobile",
          "number_plain": "6796639223"
        }
      ],
      "birthday": false,
      "contact_id": "6355670164045824",
      "code": "1483",
      "contact_type": "person",
      "favorite": true,
      "active": true,
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASBsed0f75ekG4FSUKxgMO56mLhAXR-l_V20ygPsW-5fSg&oe=661A55D3&_nc_sid=e6ed6c&_nc_cat=111",
      "media_source": "WhatsApp",
      "name": "Arquitetura Aline",
      "fullname": "Arquitetura Aline Picetti",
      "tags": [
        "contact"
      ],
      "created_at": "2024-04-03T13:26:01.096357",
      "updated_at": "2024-07-02T22:08:49.392863",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "6798584006\n",
          "alpha2Code": null,
          "type": "mobile",
          "number_plain": "6798584006",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "5951563640602624",
      "code": "14919",
      "contact_type": "person",
      "favorite": false,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": " Naoinformado",
      "fullname": " Naoinformado",
      "tags": [
        "contact"
      ],
      "created_at": "2025-07-22T14:56:23.256538",
      "updated_at": "2025-07-22T16:47:46.532815",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "6796410987\n",
          "alpha2Code": null,
          "type": "mobile",
          "number_plain": "6796410987",
          "sector": null
        }
      ],
      "birthday": false,
      "contact_id": "5506866820415488",
      "code": "14963",
      "contact_type": "person",
      "favorite": false,
      "active": true,
      "profile_image_url": null,
      "media_source": "Instagram",
      "name": " Naoinformado",
      "fullname": " Naoinformado",
      "tags": [
        "contact"
      ],
      "created_at": "2025-07-23T14:48:02.580380",
      "updated_at": "2025-07-25T17:19:08.896387",
      "cpf": null,
      "cnpj": null
    },
    {
      "age": null,
      "database": "ac-dfzv24117ahkn",
      "emails": [],
      "email": "",
      "phones": [
        {
          "country_code": null,
          "number": "6784212014\n",
          "alpha2Code": null,
          "type": "mobile",
          "number_plain": "6784212014",
          "sector": null
```

---

## Imóveis - Sem filtros

**Endpoint:** `/v1/properties?limit=3`
**Status:** 200

**Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 166,
  "count_without_location": 0,
  "properties": [
    {
      "db_id": "4550464861896704",
      "latitude": -20.4749802,
      "longitude": -54.59968569999999,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "PBuvhWtM1pZD3ONzKsAiJ14BdHF3"
        }
      ],
      "address": "Rua Santos, 66",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 6200000,
      "area": 766,
      "useful_area": 766,
      "lot_area": 1080,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Sao Bento",
      "active": true,
      "suite": 5,
      "stage": "",
      "state": "MS",
      "code": "326",
      "alternative_code": "",
      "property_type": "Sobrado",
      "property_situation": null,
      "bathroom": 8,
      "bedroom": 5,
      "cover_photo": {
        "db_id": 4713665851293696,
        "url": "https://lh3.googleusercontent.com/BoD0sdOlqEMDcmVTNPORRlEwKauPdyr6eYH9QnH_su2r6zhtFGpb2tfegxI2B8n3iAIwJld_ux2Bxj0EAG-pP77ThPOLhXOs7Uc8RfDafTCD_l_R1vEUl1pb"
      },
      "cover_photo_private": {
        "db_id": 0,
        "url": ""
      },
      "geo_location": {
        "lon": -54.59968569999999,
        "lat": -20.4749802
      },
      "building_name": "",
      "property_id": "4550464861896704",
      "links": [
        {
          "link_type": "listing broker",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFBCdXZoV3RNMXBaRDNPTnpLc0FpSjE0QmRIRjMM",
          "type": "user"
        },
        {
          "link_type": "photographer",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFc5MmxMV1V1eW1kc29ONUtaalhIenYzMnVQczEM",
          "type": "user"
        }
      ],
      "building": false,
      "plus_code": "",
      "created_at": "2025-08-18T14:36:31.525472",
      "garage": 4,
      "site_publish": true,
      "site_url": "/imovel/sobrado-de-alto-luxo-em-campo-grande-ms-code-326",
      "updated_at": "2025-12-09T20:14:06.913908",
      "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoM3604oIDKIBEGFjLWRmenYyNDExN2Foa24",
      "zipcode": "79004-670",
      "country": "Brasil",
      "finality": "residential"
    },
    {
      "db_id": "5546689887207424",
      "latitude": -20.40767,
      "longitude": -54.559015,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3"
        }
      ],
      "address": "Alphaville Campo Grande 2",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 2795000,
      "area": 266.25,
      "useful_area": 266.25,
      "lot_area": 377.7,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Novos Estados",
    
```

---

## Imóveis - smart_list=available

**Endpoint:** `/v1/properties?smart_list=available&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 166,
  "count_without_location": 0,
  "properties": [
    {
      "db_id": "4550464861896704",
      "latitude": -20.4749802,
      "longitude": -54.59968569999999,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "PBuvhWtM1pZD3ONzKsAiJ14BdHF3"
        }
      ],
      "address": "Rua Santos, 66",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 6200000,
      "area": 766,
      "useful_area": 766,
      "lot_area": 1080,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Sao Bento",
      "active": true,
      "suite": 5,
      "stage": "",
      "state": "MS",
      "code": "326",
      "alternative_code": "",
      "property_type": "Sobrado",
      "property_situation": null,
      "bathroom": 8,
      "bedroom": 5,
      "cover_photo": {
        "db_id": 4713665851293696,
        "url": "https://lh3.googleusercontent.com/BoD0sdOlqEMDcmVTNPORRlEwKauPdyr6eYH9QnH_su2r6zhtFGpb2tfegxI2B8n3iAIwJld_ux2Bxj0EAG-pP77ThPOLhXOs7Uc8RfDafTCD_l_R1vEUl1pb"
      },
      "cover_photo_private": {
        "db_id": 0,
        "url": ""
      },
      "geo_location": {
        "lon": -54.59968569999999,
        "lat": -20.4749802
      },
      "building_name": "",
      "property_id": "4550464861896704",
      "links": [
        {
          "link_type": "listing broker",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFBCdXZoV3RNMXBaRDNPTnpLc0FpSjE0QmRIRjMM",
          "type": "user"
        },
        {
          "link_type": "photographer",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFc5MmxMV1V1eW1kc29ONUtaalhIenYzMnVQczEM",
          "type": "user"
        }
      ],
      "building": false,
      "plus_code": "",
      "created_at": "2025-08-18T14:36:31.525472",
      "garage": 4,
      "site_publish": true,
      "site_url": "/imovel/sobrado-de-alto-luxo-em-campo-grande-ms-code-326",
      "updated_at": "2025-12-09T20:14:06.913908",
      "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoM3604oIDKIBEGFjLWRmenYyNDExN2Foa24",
      "zipcode": "79004-670",
      "country": "Brasil",
      "finality": "residential"
    },
    {
      "db_id": "5546689887207424",
      "latitude": -20.40767,
      "longitude": -54.559015,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3"
        }
      ],
      "address": "Alphaville Campo Grande 2",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 2795000,
      "area": 266.25,
      "useful_area": 266.25,
      "lot_area": 377.7,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Novos Estados",
    
```

---

## Imóveis - smart_list=rent

**Endpoint:** `/v1/properties?smart_list=rent&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 12,
  "count_without_location": 0,
  "properties": [
    {
      "db_id": "6745715491995648",
      "latitude": -20.4870168,
      "longitude": -54.7341966,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "PBuvhWtM1pZD3ONzKsAiJ14BdHF3"
        }
      ],
      "address": "Rua Moscovita",
      "address_complement": "",
      "rental_value": 3000,
      "sale_value": 400000,
      "area": 0,
      "useful_area": 0,
      "lot_area": 1000,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Inapolis",
      "active": true,
      "suite": 0,
      "stage": "",
      "state": "MS",
      "code": "345",
      "alternative_code": "",
      "property_type": "Lote / Terreno",
      "property_situation": null,
      "bathroom": 0,
      "bedroom": 0,
      "cover_photo": {
        "db_id": 6045280548421632,
        "url": "https://lh3.googleusercontent.com/ucfwvR2VREE3HSXjJ9V7xChxHqkUbMT6FHdPM0SFHr1Cj9rgv35oO8CZjaPQS-8Gl48JYQBwzRcSIIRVkt-rOccVnnmJ39CA-vIg9dLueV2uZ5jzK5Gjdw=s0"
      },
      "cover_photo_private": {
        "db_id": 0,
        "url": ""
      },
      "geo_location": {
        "lon": -54.7341966,
        "lat": -20.4870168
      },
      "building_name": "",
      "property_id": "6745715491995648",
      "links": [
        {
          "link_type": "listing broker",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFBCdXZoV3RNMXBaRDNPTnpLc0FpSjE0QmRIRjMM",
          "type": "user"
        }
      ],
      "building": false,
      "plus_code": "",
      "created_at": "2025-10-02T16:11:08.439171",
      "garage": 0,
      "site_publish": true,
      "site_url": "/imovel/lote-terreno-jardim-inapolis-campo-grande-code-345",
      "updated_at": "2025-11-24T19:53:38.382167",
      "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoL2U5v0LDKIBEGFjLWRmenYyNDExN2Foa24",
      "zipcode": "79108-293",
      "country": "Brasil",
      "finality": "residential"
    },
    {
      "db_id": "5117793774075904",
      "latitude": -20.5019223,
      "longitude": -54.6858386,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "P1ibK4GFPqZYKIx9e55RpQobt7J2"
        }
      ],
      "address": "Rua Santa Bertilia, 1329",
      "address_complement": "",
      "rental_value": 4700,
      "sale_value": 1300000,
      "area": 400,
      "useful_area": 400,
      "lot_area": 2400,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim São Conrado",
      "active": true,
      "suite": 0,
      "stage": "",
      "state": "MS",
      "code": "124",
      "alternative_code": "",
      "property_type": "Galpão / Depósito / Armazém",
      "property_situation": null,
```

---

## Imóveis - smart_list=sale

**Endpoint:** `/v1/properties?smart_list=sale&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 154,
  "count_without_location": 0,
  "properties": [
    {
      "db_id": "4550464861896704",
      "latitude": -20.4749802,
      "longitude": -54.59968569999999,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "PBuvhWtM1pZD3ONzKsAiJ14BdHF3"
        }
      ],
      "address": "Rua Santos, 66",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 6200000,
      "area": 766,
      "useful_area": 766,
      "lot_area": 1080,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Sao Bento",
      "active": true,
      "suite": 5,
      "stage": "",
      "state": "MS",
      "code": "326",
      "alternative_code": "",
      "property_type": "Sobrado",
      "property_situation": null,
      "bathroom": 8,
      "bedroom": 5,
      "cover_photo": {
        "db_id": 4713665851293696,
        "url": "https://lh3.googleusercontent.com/BoD0sdOlqEMDcmVTNPORRlEwKauPdyr6eYH9QnH_su2r6zhtFGpb2tfegxI2B8n3iAIwJld_ux2Bxj0EAG-pP77ThPOLhXOs7Uc8RfDafTCD_l_R1vEUl1pb"
      },
      "cover_photo_private": {
        "db_id": 0,
        "url": ""
      },
      "geo_location": {
        "lon": -54.59968569999999,
        "lat": -20.4749802
      },
      "building_name": "",
      "property_id": "4550464861896704",
      "links": [
        {
          "link_type": "listing broker",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFBCdXZoV3RNMXBaRDNPTnpLc0FpSjE0QmRIRjMM",
          "type": "user"
        },
        {
          "link_type": "photographer",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFc5MmxMV1V1eW1kc29ONUtaalhIenYzMnVQczEM",
          "type": "user"
        }
      ],
      "building": false,
      "plus_code": "",
      "created_at": "2025-08-18T14:36:31.525472",
      "garage": 4,
      "site_publish": true,
      "site_url": "/imovel/sobrado-de-alto-luxo-em-campo-grande-ms-code-326",
      "updated_at": "2025-12-09T20:14:06.913908",
      "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoM3604oIDKIBEGFjLWRmenYyNDExN2Foa24",
      "zipcode": "79004-670",
      "country": "Brasil",
      "finality": "residential"
    },
    {
      "db_id": "5546689887207424",
      "latitude": -20.40767,
      "longitude": -54.559015,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3"
        }
      ],
      "address": "Alphaville Campo Grande 2",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 2795000,
      "area": 266.25,
      "useful_area": 266.25,
      "lot_area": 377.7,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Novos Estados",
    
```

---

## Imóveis - Com user_id (listing_broker)

**Endpoint:** `/v1/properties?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 166,
  "count_without_location": 0,
  "properties": [
    {
      "db_id": "4550464861896704",
      "latitude": -20.4749802,
      "longitude": -54.59968569999999,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "PBuvhWtM1pZD3ONzKsAiJ14BdHF3"
        }
      ],
      "address": "Rua Santos, 66",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 6200000,
      "area": 766,
      "useful_area": 766,
      "lot_area": 1080,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Sao Bento",
      "active": true,
      "suite": 5,
      "stage": "",
      "state": "MS",
      "code": "326",
      "alternative_code": "",
      "property_type": "Sobrado",
      "property_situation": null,
      "bathroom": 8,
      "bedroom": 5,
      "cover_photo": {
        "db_id": 4713665851293696,
        "url": "https://lh3.googleusercontent.com/BoD0sdOlqEMDcmVTNPORRlEwKauPdyr6eYH9QnH_su2r6zhtFGpb2tfegxI2B8n3iAIwJld_ux2Bxj0EAG-pP77ThPOLhXOs7Uc8RfDafTCD_l_R1vEUl1pb"
      },
      "cover_photo_private": {
        "db_id": 0,
        "url": ""
      },
      "geo_location": {
        "lon": -54.59968569999999,
        "lat": -20.4749802
      },
      "building_name": "",
      "property_id": "4550464861896704",
      "links": [
        {
          "link_type": "listing broker",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFBCdXZoV3RNMXBaRDNPTnpLc0FpSjE0QmRIRjMM",
          "type": "user"
        },
        {
          "link_type": "photographer",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFc5MmxMV1V1eW1kc29ONUtaalhIenYzMnVQczEM",
          "type": "user"
        }
      ],
      "building": false,
      "plus_code": "",
      "created_at": "2025-08-18T14:36:31.525472",
      "garage": 4,
      "site_publish": true,
      "site_url": "/imovel/sobrado-de-alto-luxo-em-campo-grande-ms-code-326",
      "updated_at": "2025-12-09T20:14:06.913908",
      "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoM3604oIDKIBEGFjLWRmenYyNDExN2Foa24",
      "zipcode": "79004-670",
      "country": "Brasil",
      "finality": "residential"
    },
    {
      "db_id": "5546689887207424",
      "latitude": -20.40767,
      "longitude": -54.559015,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3"
        }
      ],
      "address": "Alphaville Campo Grande 2",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 2795000,
      "area": 266.25,
      "useful_area": 266.25,
      "lot_area": 377.7,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Novos Estados",
    
```

---

## Imóveis - finality=residential

**Endpoint:** `/v1/properties?finality=residential&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 166,
  "count_without_location": 0,
  "properties": [
    {
      "db_id": "4550464861896704",
      "latitude": -20.4749802,
      "longitude": -54.59968569999999,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "PBuvhWtM1pZD3ONzKsAiJ14BdHF3"
        }
      ],
      "address": "Rua Santos, 66",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 6200000,
      "area": 766,
      "useful_area": 766,
      "lot_area": 1080,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Sao Bento",
      "active": true,
      "suite": 5,
      "stage": "",
      "state": "MS",
      "code": "326",
      "alternative_code": "",
      "property_type": "Sobrado",
      "property_situation": null,
      "bathroom": 8,
      "bedroom": 5,
      "cover_photo": {
        "db_id": 4713665851293696,
        "url": "https://lh3.googleusercontent.com/BoD0sdOlqEMDcmVTNPORRlEwKauPdyr6eYH9QnH_su2r6zhtFGpb2tfegxI2B8n3iAIwJld_ux2Bxj0EAG-pP77ThPOLhXOs7Uc8RfDafTCD_l_R1vEUl1pb"
      },
      "cover_photo_private": {
        "db_id": 0,
        "url": ""
      },
      "geo_location": {
        "lon": -54.59968569999999,
        "lat": -20.4749802
      },
      "building_name": "",
      "property_id": "4550464861896704",
      "links": [
        {
          "link_type": "listing broker",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFBCdXZoV3RNMXBaRDNPTnpLc0FpSjE0QmRIRjMM",
          "type": "user"
        },
        {
          "link_type": "photographer",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFc5MmxMV1V1eW1kc29ONUtaalhIenYzMnVQczEM",
          "type": "user"
        }
      ],
      "building": false,
      "plus_code": "",
      "created_at": "2025-08-18T14:36:31.525472",
      "garage": 4,
      "site_publish": true,
      "site_url": "/imovel/sobrado-de-alto-luxo-em-campo-grande-ms-code-326",
      "updated_at": "2025-12-09T20:14:06.913908",
      "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoM3604oIDKIBEGFjLWRmenYyNDExN2Foa24",
      "zipcode": "79004-670",
      "country": "Brasil",
      "finality": "residential"
    },
    {
      "db_id": "5546689887207424",
      "latitude": -20.40767,
      "longitude": -54.559015,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3"
        }
      ],
      "address": "Alphaville Campo Grande 2",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 2795000,
      "area": 266.25,
      "useful_area": 266.25,
      "lot_area": 377.7,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Novos Estados",
    
```

---

## Imóveis - finality=commercial

**Endpoint:** `/v1/properties?finality=commercial&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 166,
  "count_without_location": 0,
  "properties": [
    {
      "db_id": "4550464861896704",
      "latitude": -20.4749802,
      "longitude": -54.59968569999999,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "PBuvhWtM1pZD3ONzKsAiJ14BdHF3"
        }
      ],
      "address": "Rua Santos, 66",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 6200000,
      "area": 766,
      "useful_area": 766,
      "lot_area": 1080,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Sao Bento",
      "active": true,
      "suite": 5,
      "stage": "",
      "state": "MS",
      "code": "326",
      "alternative_code": "",
      "property_type": "Sobrado",
      "property_situation": null,
      "bathroom": 8,
      "bedroom": 5,
      "cover_photo": {
        "db_id": 4713665851293696,
        "url": "https://lh3.googleusercontent.com/BoD0sdOlqEMDcmVTNPORRlEwKauPdyr6eYH9QnH_su2r6zhtFGpb2tfegxI2B8n3iAIwJld_ux2Bxj0EAG-pP77ThPOLhXOs7Uc8RfDafTCD_l_R1vEUl1pb"
      },
      "cover_photo_private": {
        "db_id": 0,
        "url": ""
      },
      "geo_location": {
        "lon": -54.59968569999999,
        "lat": -20.4749802
      },
      "building_name": "",
      "property_id": "4550464861896704",
      "links": [
        {
          "link_type": "listing broker",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFBCdXZoV3RNMXBaRDNPTnpLc0FpSjE0QmRIRjMM",
          "type": "user"
        },
        {
          "link_type": "photographer",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFc5MmxMV1V1eW1kc29ONUtaalhIenYzMnVQczEM",
          "type": "user"
        }
      ],
      "building": false,
      "plus_code": "",
      "created_at": "2025-08-18T14:36:31.525472",
      "garage": 4,
      "site_publish": true,
      "site_url": "/imovel/sobrado-de-alto-luxo-em-campo-grande-ms-code-326",
      "updated_at": "2025-12-09T20:14:06.913908",
      "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoM3604oIDKIBEGFjLWRmenYyNDExN2Foa24",
      "zipcode": "79004-670",
      "country": "Brasil",
      "finality": "residential"
    },
    {
      "db_id": "5546689887207424",
      "latitude": -20.40767,
      "longitude": -54.559015,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3"
        }
      ],
      "address": "Alphaville Campo Grande 2",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 2795000,
      "area": 266.25,
      "useful_area": 266.25,
      "lot_area": 377.7,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Novos Estados",
    
```

---

## Imóveis - status=available

**Endpoint:** `/v1/properties?status=available&limit=3`
**Status:** 200

**Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 166,
  "count_without_location": 0,
  "properties": [
    {
      "db_id": "4550464861896704",
      "latitude": -20.4749802,
      "longitude": -54.59968569999999,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "PBuvhWtM1pZD3ONzKsAiJ14BdHF3"
        }
      ],
      "address": "Rua Santos, 66",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 6200000,
      "area": 766,
      "useful_area": 766,
      "lot_area": 1080,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Sao Bento",
      "active": true,
      "suite": 5,
      "stage": "",
      "state": "MS",
      "code": "326",
      "alternative_code": "",
      "property_type": "Sobrado",
      "property_situation": null,
      "bathroom": 8,
      "bedroom": 5,
      "cover_photo": {
        "db_id": 4713665851293696,
        "url": "https://lh3.googleusercontent.com/BoD0sdOlqEMDcmVTNPORRlEwKauPdyr6eYH9QnH_su2r6zhtFGpb2tfegxI2B8n3iAIwJld_ux2Bxj0EAG-pP77ThPOLhXOs7Uc8RfDafTCD_l_R1vEUl1pb"
      },
      "cover_photo_private": {
        "db_id": 0,
        "url": ""
      },
      "geo_location": {
        "lon": -54.59968569999999,
        "lat": -20.4749802
      },
      "building_name": "",
      "property_id": "4550464861896704",
      "links": [
        {
          "link_type": "listing broker",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFBCdXZoV3RNMXBaRDNPTnpLc0FpSjE0QmRIRjMM",
          "type": "user"
        },
        {
          "link_type": "photographer",
          "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyJgsSBFVzZXIiHFc5MmxMV1V1eW1kc29ONUtaalhIenYzMnVQczEM",
          "type": "user"
        }
      ],
      "building": false,
      "plus_code": "",
      "created_at": "2025-08-18T14:36:31.525472",
      "garage": 4,
      "site_publish": true,
      "site_url": "/imovel/sobrado-de-alto-luxo-em-campo-grande-ms-code-326",
      "updated_at": "2025-12-09T20:14:06.913908",
      "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoM3604oIDKIBEGFjLWRmenYyNDExN2Foa24",
      "zipcode": "79004-670",
      "country": "Brasil",
      "finality": "residential"
    },
    {
      "db_id": "5546689887207424",
      "latitude": -20.40767,
      "longitude": -54.559015,
      "deal_stage": "",
      "building_parameters": {},
      "listing_brokers": [
        {
          "db_id": "Vbp4IUWMP9Tz4AjjbTmv5hlP1yD3"
        }
      ],
      "address": "Alphaville Campo Grande 2",
      "address_complement": "",
      "rental_value": 0,
      "sale_value": 2795000,
      "area": 266.25,
      "useful_area": 266.25,
      "lot_area": 377.7,
      "city": "Campo Grande",
      "status": "available",
      "neighborhood": "Jardim Novos Estados",
    
```

---

## Calendário - Apenas year/month

**Endpoint:** `/v1/calendar?year=2025&month=12`
**Status:** 200

**Resposta:**
```json
{
  "calendar_items": [],
  "holidays": [],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "https://api.imobzi.app/v1/google/oauth/events?user_id=0&database=ac-dfzv24117ahkn"
}
```

---

## Calendário - Com user_id

**Endpoint:** `/v1/calendar?year=2025&month=12&user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2`
**Status:** 200

**Resposta:**
```json
{
  "calendar_items": [
    {
      "db_id": 6198330030292992,
      "all_day": false,
      "description": "",
      "done": false,
      "google_calendar_event_id": null,
      "guests": [],
      "final_date": "2026-01-16T15:33:26.362000Z",
      "initial_date": "2026-01-16T15:18:26.362000Z",
      "item_type": "task",
      "notification": null,
      "notification_by": [],
      "show_observations": false,
      "status": "active",
      "title": "Retornar/Reaquecer cliente",
      "type": "task",
      "user": {
        "db_id": "P1ibK4GFPqZYKIx9e55RpQobt7J2",
        "profile_image_url": null,
        "fullname": "Antonio Carlos",
        "email": "militaoa@gmail.com"
      },
      "recurring_details": {},
      "properties": []
    },
    {
      "db_id": 6691834737197056,
      "all_day": false,
      "description": "",
      "done": false,
      "google_calendar_event_id": null,
      "guests": [],
      "final_date": "2026-01-16T15:32:52.195000Z",
      "initial_date": "2026-01-16T15:17:52.195000Z",
      "item_type": "task",
      "notification": null,
      "notification_by": [],
      "show_observations": false,
      "status": "active",
      "title": "Retornar/Reaquecer cliente",
      "type": "task",
      "user": {
        "db_id": "P1ibK4GFPqZYKIx9e55RpQobt7J2",
        "profile_image_url": null,
        "fullname": "Antonio Carlos",
        "email": "militaoa@gmail.com"
      },
      "recurring_details": {},
      "properties": []
    },
    {
      "db_id": 6503554901082112,
      "all_day": false,
      "description": "",
      "done": false,
      "google_calendar_event_id": null,
      "guests": [],
      "final_date": "2026-01-16T15:32:22.428000Z",
      "initial_date": "2026-01-16T15:17:22.428000Z",
      "item_type": "task",
      "notification": null,
      "notification_by": [],
      "show_observations": false,
      "status": "active",
      "title": "Retornar/Reaquecer cliente",
      "type": "task",
      "user": {
        "db_id": "P1ibK4GFPqZYKIx9e55RpQobt7J2",
        "profile_image_url": null,
        "fullname": "Antonio Carlos",
        "email": "militaoa@gmail.com"
      },
      "recurring_details": {},
      "properties": []
    },
    {
      "db_id": 5173617673895936,
      "all_day": false,
      "description": "",
      "done": false,
      "google_calendar_event_id": null,
      "guests": [],
      "final_date": "2026-01-16T15:32:01.048000Z",
      "initial_date": "2026-01-16T15:17:01.048000Z",
      "item_type": "task",
      "notification": null,
      "notification_by": [],
      "show_observations": false,
      "status": "active",
      "title": "Retornar/Reaquecer cliente",
      "type": "task",
      "user": {
        "db_id": "P1ibK4GFPqZYKIx9e55RpQobt7J2",
        "profile_image_url": null,
        "fullname": "Antonio Carlos",
        "email": "militaoa@gmail.com"
      },
      "recurring_details": {},
      "properties": []
    },
    {
      "db_id": 5099434193453056,
      "all_day": 
```

---

## Calendário - item_type=visit

**Endpoint:** `/v1/calendar?year=2025&month=12&item_type=visit`
**Status:** 200

**Resposta:**
```json
{
  "calendar_items": [],
  "holidays": [],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "https://api.imobzi.app/v1/google/oauth/events?user_id=0&database=ac-dfzv24117ahkn"
}
```

---

## Calendário - item_type=task

**Endpoint:** `/v1/calendar?year=2025&month=12&item_type=task`
**Status:** 200

**Resposta:**
```json
{
  "calendar_items": [],
  "holidays": [],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "https://api.imobzi.app/v1/google/oauth/events?user_id=0&database=ac-dfzv24117ahkn"
}
```

---

## Calendário - item_type=event

**Endpoint:** `/v1/calendar?year=2025&month=12&item_type=event`
**Status:** 422

**Erro:**
```json
{
  "detail": [
    {
      "type": "literal_error",
      "loc": [
        "query",
        "item_type"
      ],
      "msg": "Input should be 'task', 'visit', 'whatsapp', 'call' or None",
      "input": "event",
      "ctx": {
        "expected": "'task', 'visit', 'whatsapp', 'call' or None"
      },
      "url": "https://errors.pydantic.dev/2.12/v/literal_error"
    }
  ]
}
```

---

## Calendário - user_id + item_type

**Endpoint:** `/v1/calendar?year=2025&month=12&user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&item_type=visit`
**Status:** 200

**Resposta:**
```json
{
  "calendar_items": [],
  "holidays": [],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "https://api.imobzi.app/v1/google/oauth/events?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&database=ac-dfzv24117ahkn"
}
```

---

