# 📋 MAPEAMENTO COMPLETO DA API IMOBZI

**Data:** 2025-12-11T13:51:52.300Z
**Total de Testes:** 101
**Sucesso:** 77
**Erro:** 24

---

## 📂 USERS

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/users` | ✅ 200 | array | - | - |

### Detalhes

#### Listar Usuários
- **Endpoint:** `/v1/users`
- **Tipo:** array
- **Chaves:** database, db_id, fullname, function, profile_image_url, active, email, phones

**Exemplo de Resposta:**
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
    "db_id": "Vbp4IUWMP9T
... (truncado)
```

---

## 📂 CONTACTS

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/contacts?limit=3` | ✅ 200 | object | contacts | cursor |
| `/v1/contacts/search?limit=3` | ✅ 200 | object | contacts | cursor |
| `/v1/contacts?contact_type=person&limit=3` | ✅ 200 | object | contacts | cursor |
| `/v1/contacts?contact_type=organization&limit=3` | ✅ 200 | object | contacts | cursor |
| `/v1/contacts?contact_type=lead&limit=3` | ✅ 200 | object | contacts | cursor |
| `/v1/contacts?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&` | ✅ 200 | object | contacts | cursor |
| `/v1/contacts?manager_id=P1ibK4GFPqZYKIx9e55RpQobt7` | ✅ 200 | object | contacts | cursor |
| `/v1/contacts?smart_list=owners&limit=3` | ❌ 422 | - | - | - |
| `/v1/contacts?tags=contact&limit=3` | ✅ 200 | object | contacts | cursor |
| `/v1/contact/exists?email=teste%40teste.com` | ✅ 200 | object | - | - |
| `/v1/contact/exists?cpf=12345678900` | ✅ 200 | object | - | - |
| `/v1/contact/exists?phone_number=67999999999` | ✅ 200 | object | - | - |
| `/v1/contact/exists?cnpj=12345678000100` | ✅ 200 | object | - | - |
| `/v1/person/5352720932798464` | ✅ 200 | object | emails | - |
| `/v1/person/code/10063` | ✅ 200 | object | emails | - |
| `/v1/contacts/tags` | ✅ 200 | object | tags | - |
| `/v1/media-sources` | ✅ 200 | array | - | - |
| `/v1/media-sources-report` | ✅ 200 | object | month | - |

### Detalhes

#### Listar Contatos
- **Endpoint:** `/v1/contacts?limit=3`
- **Tipo:** object
- **DataKey:** `contacts`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** contacts, cursor, count, count_pending
- **Chaves dos dados:** age, database, emails, email, phones, birthday, contact_id, code, contact_type, favorite...

**Exemplo de Resposta:**
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
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASB
... (truncado)
```

#### Contatos - search
- **Endpoint:** `/v1/contacts/search?limit=3`
- **Tipo:** object
- **DataKey:** `contacts`
- **Registros:** 20
- **Paginação:** cursor
- **Chaves:** contacts, cursor, count
- **Chaves dos dados:** age, database, emails, email, phones, birthday, contact_id, code, contact_type, favorite...

**Exemplo de Resposta:**
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
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASB
... (truncado)
```

#### Contatos - com filtro contact_type=person
- **Endpoint:** `/v1/contacts?contact_type=person&limit=3`
- **Tipo:** object
- **DataKey:** `contacts`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** contacts, cursor, count, count_pending
- **Chaves dos dados:** age, database, emails, email, phones, birthday, contact_id, code, contact_type, favorite...

**Exemplo de Resposta:**
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
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASB
... (truncado)
```

#### Contatos - com filtro contact_type=organization
- **Endpoint:** `/v1/contacts?contact_type=organization&limit=3`
- **Tipo:** object
- **DataKey:** `contacts`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** contacts, cursor, count, count_pending
- **Chaves dos dados:** age, database, emails, email, phones, birthday, contact_id, code, contact_type, favorite...

**Exemplo de Resposta:**
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
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASB
... (truncado)
```

#### Contatos - com filtro contact_type=lead
- **Endpoint:** `/v1/contacts?contact_type=lead&limit=3`
- **Tipo:** object
- **DataKey:** `contacts`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** contacts, cursor, count, count_pending
- **Chaves dos dados:** age, database, emails, email, phones, birthday, contact_id, code, contact_type, favorite...

**Exemplo de Resposta:**
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
    
... (truncado)
```

#### Contatos - com user_id
- **Endpoint:** `/v1/contacts?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&limit=3`
- **Tipo:** object
- **DataKey:** `contacts`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** contacts, cursor, count, count_pending
- **Chaves dos dados:** age, database, emails, email, phones, birthday, contact_id, code, contact_type, favorite...

**Exemplo de Resposta:**
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
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASB
... (truncado)
```

#### Contatos - com manager_id
- **Endpoint:** `/v1/contacts?manager_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&limit=3`
- **Tipo:** object
- **DataKey:** `contacts`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** contacts, cursor, count, count_pending
- **Chaves dos dados:** age, database, emails, email, phones, birthday, contact_id, code, contact_type, favorite...

**Exemplo de Resposta:**
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
      "favorite": 
... (truncado)
```

#### Contatos - com tags
- **Endpoint:** `/v1/contacts?tags=contact&limit=3`
- **Tipo:** object
- **DataKey:** `contacts`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** contacts, cursor, count, count_pending
- **Chaves dos dados:** age, database, emails, email, phones, birthday, contact_id, code, contact_type, favorite...

**Exemplo de Resposta:**
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
      "profile_image_url": "https://pps.whatsapp.net/v/t61.24694-24/415744269_754698382668994_275630337835282800_n.jpg?ccb=11-4&oh=01_ASB
... (truncado)
```

#### Contato - Verificar existência por email
- **Endpoint:** `/v1/contact/exists?email=teste%40teste.com`
- **Tipo:** object
- **Chaves:** contact, has_permission

**Exemplo de Resposta:**
```json
{
  "contact": {
    "db_id": 5929500930473984,
    "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEwsSBlBlcnNvbhiAgKClmJvECgyiARBhYy1kZnp2MjQxMTdhaGtu",
    "code": "14794",
    "active": true,
    "favorite": false,
    "emails": [
      "teste@teste.com"
    ],
    "email": "teste@teste.com",
    "phone": {
      "alpha2Code": null,
      "country_code": null,
      "number": "11948784512",
      "sector": null,
      "type": "mobile"
    },
    "social_network": [],
    "cellphone": {
      "alpha2Code": null,
      "country_code": null,
      "number": "11948784512",
      "sector": null,
      "type": "mobile"
    },
    "private": false,
    "tags": [
      "contact"
    ],
    "network_group_member_shared": false,
    "location": "-15.77972, -47.92972",
    "manager": {
      "db_id": 6509665649688576,
      "id": "liGnEe9aOea2t0sc0ZkrSa8iXF62",
      "type": "owner",
      "user": {
        "profile_image_url": "https://firebasestorage.googleapis.com/v0/b/imobzi-app-production.appspot.com/o/users%2FliGnEe9aOea2t0sc0ZkrSa8iXF62%2Fprofile-photo?alt=media&token=53fa0881-86f3-40ec-b21c-36c2f5e3c107",
        "fullname": "Lidiane Rocha",
        "email": "contato@corretoraideal.com.br",
        "db_id": "liGnEe9aOea2t0sc0ZkrSa8iXF62"
      }
    },
    "managers_shared": [],
    "profile_image_url": null,
    "media_source": "Site",
    "media_sources": [
      {
        "name": "Site",
        "date": "2025-07-16T13:52:06.201443Z"
      }
    ],
    "bank_data": [],

... (truncado)
```

#### Contato - Verificar existência por cpf
- **Endpoint:** `/v1/contact/exists?cpf=12345678900`
- **Tipo:** object
- **Chaves:** contact, has_permission

**Exemplo de Resposta:**
```json
{
  "contact": null,
  "has_permission": false
}
```

#### Contato - Verificar existência por phone_number
- **Endpoint:** `/v1/contact/exists?phone_number=67999999999`
- **Tipo:** object
- **Chaves:** contact, has_permission

**Exemplo de Resposta:**
```json
{
  "contact": {
    "db_id": 5458490536493056,
    "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEwsSBlBlcnNvbhiAgMDr_Y7ZCQyiARBhYy1kZnp2MjQxMTdhaGtu",
    "code": "7691",
    "active": true,
    "favorite": false,
    "emails": [
      "otavioteste2@gmail.com",
      "teste1234@redeuno.com.br"
    ],
    "email": "otavioteste2@gmail.com",
    "phone": {
      "alpha2Code": null,
      "country_code": null,
      "number": "67999999999",
      "sector": null,
      "type": "mobile"
    },
    "social_network": [],
    "cellphone": {
      "alpha2Code": null,
      "country_code": null,
      "number": "67999999999",
      "sector": null,
      "type": "mobile"
    },
    "private": false,
    "tags": [
      "contact"
    ],
    "network_group_member_shared": false,
    "location": "-15.77972, -47.92972",
    "manager": {
      "db_id": 5735098509950976,
      "id": "qLIwracS5yUk1UIvNmMCjtYgAf62",
      "type": "owner",
      "user": {
        "profile_image_url": null,
        "fullname": "Campo Grande MS",
        "email": "campogrande@redeuno.com.br",
        "db_id": "qLIwracS5yUk1UIvNmMCjtYgAf62"
      }
    },
    "managers_shared": [],
    "profile_image_url": null,
    "media_source": "Site",
    "media_sources": [
      {
        "name": "Uno Rede Imobiliária",
        "date": "2024-08-11T13:45:37.152629Z"
      },
      {
        "name": "Site",
        "date": "2024-05-07T21:33:21.882244Z"
      }
    ],
    "bank_data": [],
    "fields": {
      "group_addre
... (truncado)
```

#### Contato - Verificar existência por cnpj
- **Endpoint:** `/v1/contact/exists?cnpj=12345678000100`
- **Tipo:** object
- **Chaves:** contact, has_permission

**Exemplo de Resposta:**
```json
{
  "contact": null,
  "has_permission": false
}
```

#### Pessoa por ID
- **Endpoint:** `/v1/person/5352720932798464`
- **Tipo:** object
- **DataKey:** `emails`
- **Registros:** 1
- **Chaves:** db_id, db_key, code, active, favorite, emails, email, phone, social_network, cellphone...
- **Chaves dos dados:** 

**Exemplo de Resposta:**
```json
{
  "db_id": 5352720932798464,
  "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEwsSBlBlcnNvbhiAgKCu14jBCQyiARBhYy1kZnp2MjQxMTdhaGtu",
  "code": "10063",
  "active": true,
  "favorite": true,
  "emails": [
    ""
  ],
  "email": "",
  "phone": {
    "alpha2Code": "br",
    "country_code": null,
    "number": "(67) 9984-7530",
    "sector": null,
    "type": "mobile"
  },
  "social_network": [],
  "cellphone": {
    "alpha2Code": "br",
    "country_code": null,
    "number": "(67) 9984-7530",
    "sector": null,
    "type": "mobile"
  },
  "private": false,
  "tags": [
    "contact",
    "1 Milhão à 2 Milhões"
  ],
  "network_group_member_shared": false,
  "location": "-14.235004, -51.92528",
  "manager": {
    "db_id": 5783357764403200,
    "id": "o2dk6UuXiIMKdPsvx1fxADhd8L12",
    "type": "owner",
    "user": {
      "profile_image_url": null,
      "fullname": "Euclides Rebouças",
      "email": "ereboucasfilho@gmail.com",
      "db_id": "o2dk6UuXiIMKdPsvx1fxADhd8L12"
    }
  },
  "managers_shared": [],
  "profile_image_url": null,
  "media_source": "Nenhum",
  "media_sources": [
    {
      "name": "Nenhum",
      "date": "2025-03-13T16:49:46.405009Z"
    }
  ],
  "bank_data": [],
  "fields": {
    "group_address": [
      [
        {
          "field_id": "address",
          "name": "Endereço",
          "active": true,
          "group_name": "group_address",
          "group_position": 3,
          "value": null,
          "configuration": {
            "link": nul
... (truncado)
```

#### Pessoa por Código
- **Endpoint:** `/v1/person/code/10063`
- **Tipo:** object
- **DataKey:** `emails`
- **Registros:** 1
- **Chaves:** db_id, db_key, code, active, favorite, emails, email, phone, social_network, cellphone...
- **Chaves dos dados:** 

**Exemplo de Resposta:**
```json
{
  "db_id": 5352720932798464,
  "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEwsSBlBlcnNvbhiAgKCu14jBCQyiARBhYy1kZnp2MjQxMTdhaGtu",
  "code": "10063",
  "active": true,
  "favorite": true,
  "emails": [
    ""
  ],
  "email": "",
  "phone": {
    "alpha2Code": "br",
    "country_code": null,
    "number": "(67) 9984-7530",
    "sector": null,
    "type": "mobile"
  },
  "social_network": [],
  "cellphone": {
    "alpha2Code": "br",
    "country_code": null,
    "number": "(67) 9984-7530",
    "sector": null,
    "type": "mobile"
  },
  "private": false,
  "tags": [
    "contact",
    "1 Milhão à 2 Milhões"
  ],
  "network_group_member_shared": false,
  "location": "-14.235004, -51.92528",
  "manager": {
    "db_id": 5783357764403200,
    "id": "o2dk6UuXiIMKdPsvx1fxADhd8L12",
    "type": "owner",
    "user": {
      "profile_image_url": null,
      "fullname": "Euclides Rebouças",
      "email": "ereboucasfilho@gmail.com",
      "db_id": "o2dk6UuXiIMKdPsvx1fxADhd8L12"
    }
  },
  "managers_shared": [],
  "profile_image_url": null,
  "media_source": "Nenhum",
  "media_sources": [
    {
      "name": "Nenhum",
      "date": "2025-03-13T16:49:46.405009Z"
    }
  ],
  "bank_data": [],
  "fields": {
    "group_address": [
      [
        {
          "field_id": "address",
          "name": "Endereço",
          "active": true,
          "group_name": "group_address",
          "group_position": 3,
          "value": null,
          "configuration": {
            "link": nul
... (truncado)
```

#### Tags de Contato - Listar
- **Endpoint:** `/v1/contacts/tags`
- **Tipo:** object
- **DataKey:** `tags`
- **Registros:** 57
- **Chaves:** tags
- **Chaves dos dados:** name, label, db_id, default

**Exemplo de Resposta:**
```json
{
  "tags": [
    {
      "name": "+ 5 Milhões",
      "label": "+ 5 Milhões",
      "db_id": "5470230766682112",
      "default": false
    },
    {
      "name": "- 100K",
      "label": "- 100K",
      "db_id": "6563293232627712",
      "default": false
    },
    {
      "name": "1 Milhão à 2 Milhões",
      "label": "1 Milhão À 2 Milhões",
      "db_id": "5396157948755968",
      "default": false
    },
    {
      "name": "1 Quarto",
      "label": "1 Quarto",
      "db_id": "5230205915365376",
      "default": false
    },
    {
      "name": "100K à 200K",
      "label": "100K À 200K",
      "db_id": "6247156527661056",
      "default": false
    },
    {
      "name": "2 Milhões à 3 Milhões",
      "label": "2 Milhões À 3 Milhões",
      "db_id": "4535245310263296",
      "default": false
    },
    {
      "name": "2 Quartos",
      "label": "2 Quartos",
      "db_id": "6707949543096320",
      "default": false
    },
    {
      "name": "200K à 300K",
      "label": "200K À 300K",
      "db_id": "6415910825885696",
      "default": false
    },
    {
      "name": "3 Milhões à 4 Milhões",
      "label": "3 Milhões À 4 Milhões",
      "db_id": "4878185295511552",
      "default": false
    },
    {
      "name": "3 Quartos",
      "label": "3 Quartos",
      "db_id": "6642585039798272",
      "default": false
    },
    {
      "name": "300K à 400K",
      "label": "300K À 400K",
      "db_id": "6535874161410048",
      "default": false
    },
    {
      "name": "4
... (truncado)
```

#### Media Sources - Listar
- **Endpoint:** `/v1/media-sources`
- **Tipo:** array
- **Chaves:** name, type, active, default, settings, db_id, created_at, updated_at

**Exemplo de Resposta:**
```json
[
  {
    "name": "Site",
    "type": "system",
    "active": true,
    "default": true,
    "settings": {},
    "db_id": "5399738943799296",
    "created_at": "2025-10-29T13:03:28.827818",
    "updated_at": "2025-10-29T13:03:28.827828"
  },
  {
    "name": "Amigos e Parentes",
    "active": true,
    "default": false,
    "db_id": "5486685860134912",
    "type": null,
    "settings": null,
    "created_at": "2025-10-30T13:09:08.551692",
    "updated_at": "2025-10-30T13:09:08.551705"
  },
  {
    "name": "Avaliador",
    "active": true,
    "default": false,
    "db_id": "5569664264962048",
    "type": null,
    "settings": null,
    "created_at": "2025-10-30T13:09:08.585362",
    "updated_at": "2025-10-30T13:09:08.585371"
  },
  {
    "name": "Ação Externa ",
    "active": true,
    "default": false,
    "db_id": "5850818429845504",
    "type": null,
    "settings": null,
    "created_at": "2025-10-30T13:09:08.619746",
    "updated_at": "2025-10-30T13:09:08.619755"
  },
  {
    "name": "By Brokers",
    "active": true,
    "default": false,
    "db_id": "6698872645615616",
    "type": null,
    "settings": null,
    "created_at": "2025-10-30T13:09:08.653449",
    "updated_at": "2025-10-30T13:09:08.653457"
  },
  {
    "name": "Campo Grande News",
    "active": true,
    "default": false,
    "db_id": "6024207681978368",
    "type": null,
    "settings": null,
    "created_at": "2025-10-30T13:09:08.684383",
    "updated_at": "2025-10-30T13:09:08.684392"
  },
  {
    "name": "
... (truncado)
```

#### Media Sources - Report
- **Endpoint:** `/v1/media-sources-report`
- **Tipo:** object
- **DataKey:** `month`
- **Registros:** 9
- **Chaves:** month, year, general
- **Chaves dos dados:** media_source, count, percentage

**Exemplo de Resposta:**
```json
{
  "month": [
    {
      "media_source": "By Brokers",
      "count": 45,
      "percentage": 51
    },
    {
      "media_source": "Instagram",
      "count": 17,
      "percentage": 19
    },
    {
      "media_source": "VivaReal",
      "count": 8,
      "percentage": 9
    },
    {
      "media_source": "Chaves na Mão",
      "count": 7,
      "percentage": 7
    },
    {
      "media_source": "Nenhum",
      "count": 5,
      "percentage": 5
    },
    {
      "media_source": "Infoimoveis",
      "count": 2,
      "percentage": 2
    },
    {
      "media_source": "WhatsApp",
      "count": 2,
      "percentage": 2
    },
    {
      "media_source": "Placa",
      "count": 1,
      "percentage": 1
    },
    {
      "media_source": "Site",
      "count": 1,
      "percentage": 1
    }
  ],
  "year": [
    {
      "media_source": "WhatsApp MKT",
      "count": 4181,
      "percentage": 61
    },
    {
      "media_source": "Instagram",
      "count": 1290,
      "percentage": 19
    },
    {
      "media_source": "VivaReal",
      "count": 278,
      "percentage": 4
    },
    {
      "media_source": "WhatsApp",
      "count": 209,
      "percentage": 3
    },
    {
      "media_source": "Nenhum",
      "count": 183,
      "percentage": 2
    },
    {
      "media_source": "Ação Externa ",
      "count": 159,
      "percentage": 2
    },
    {
      "media_source": "Site",
      "count": 107,
      "percentage": 1
    },
    {
      "media_source": "Placa",
      "count
... (truncado)
```

### Endpoints com Erro

- `/v1/contacts?smart_list=owners&limit=3` → 422: {"detail":[{"type":"literal_error","loc":["query","smart_list"],"msg":"Input should be 'all', 'my_co

---

## 📂 PROPERTIES

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/properties?limit=3` | ✅ 200 | object | properties | cursor |
| `/v1/properties?smart_list=available&limit=3` | ✅ 200 | object | properties | cursor |
| `/v1/properties?smart_list=rent&limit=3` | ✅ 200 | object | properties | cursor |
| `/v1/properties?smart_list=sale&limit=3` | ✅ 200 | object | properties | cursor |
| `/v1/properties?smart_list=site_publish&limit=3` | ✅ 200 | object | properties | cursor |
| `/v1/properties?finality=residential&limit=3` | ✅ 200 | object | properties | cursor |
| `/v1/properties?finality=commercial&limit=3` | ✅ 200 | object | properties | cursor |
| `/v1/properties?status=available&limit=3` | ✅ 200 | object | properties | cursor |
| `/v1/properties?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J` | ✅ 200 | object | properties | cursor |
| `/v1/property/search?limit=3` | ❌ 422 | - | - | - |
| `/v1/property/exists?code=326` | ✅ 200 | object | - | - |
| `/v1/property/neighborhoods` | ❌ 401 | - | - | - |
| `/v1/property/range-values` | ❌ 422 | - | - | - |
| `/v1/property/range-areas` | ❌ 422 | - | - | - |
| `/v1/property/4550464861896704` | ✅ 200 | object | multimidias | - |
| `/v1/property/4550464861896704/statistics` | ✅ 200 | object | contacts | - |
| `/v1/property/4550464861896704/views` | ❌ 405 | - | - | - |
| `/v1/property/4550464861896704/calendar-items` | ❌ 401 | - | - | - |
| `/v1/property/4550464861896704/deals-match` | ✅ 200 | object | - | - |
| `/v1/property/code/326` | ✅ 200 | object | multimidias | - |
| `/v1/property-types` | ✅ 200 | array | - | - |
| `/v1/property-features` | ✅ 200 | object | Imóvel | - |
| `/v1/property-adverts?limit=5` | ✅ 200 | object | adverts | - |
| `/v1/property-buildings/search?search_text=edificio` | ✅ 200 | array | - | - |

### Detalhes

#### Listar Imóveis
- **Endpoint:** `/v1/properties?limit=3`
- **Tipo:** object
- **DataKey:** `properties`
- **Registros:** 3
- **Paginação:** cursor
- **Chaves:** database, cursor, count, count_without_location, properties, count_pending, count_review
- **Chaves dos dados:** db_id, latitude, longitude, deal_stage, building_parameters, listing_brokers, address, address_complement, rental_value, sale_value...

**Exemplo de Resposta:**
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
      "property_id": "4550464861896
... (truncado)
```

#### Imóveis - smart_list=available
- **Endpoint:** `/v1/properties?smart_list=available&limit=3`
- **Tipo:** object
- **DataKey:** `properties`
- **Registros:** 3
- **Paginação:** cursor
- **Chaves:** database, cursor, count, count_without_location, properties, count_pending, count_review
- **Chaves dos dados:** db_id, latitude, longitude, deal_stage, building_parameters, listing_brokers, address, address_complement, rental_value, sale_value...

**Exemplo de Resposta:**
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
      "property_id": "4550464861896
... (truncado)
```

#### Imóveis - smart_list=rent
- **Endpoint:** `/v1/properties?smart_list=rent&limit=3`
- **Tipo:** object
- **DataKey:** `properties`
- **Registros:** 3
- **Paginação:** cursor
- **Chaves:** database, cursor, count, count_without_location, properties, count_pending, count_review
- **Chaves dos dados:** db_id, latitude, longitude, deal_stage, building_parameters, listing_brokers, address, address_complement, rental_value, sale_value...

**Exemplo de Resposta:**
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
     
... (truncado)
```

#### Imóveis - smart_list=sale
- **Endpoint:** `/v1/properties?smart_list=sale&limit=3`
- **Tipo:** object
- **DataKey:** `properties`
- **Registros:** 3
- **Paginação:** cursor
- **Chaves:** database, cursor, count, count_without_location, properties, count_pending, count_review
- **Chaves dos dados:** db_id, latitude, longitude, deal_stage, building_parameters, listing_brokers, address, address_complement, rental_value, sale_value...

**Exemplo de Resposta:**
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
      "property_id": "4550464861896
... (truncado)
```

#### Imóveis - smart_list=site_publish
- **Endpoint:** `/v1/properties?smart_list=site_publish&limit=3`
- **Tipo:** object
- **DataKey:** `properties`
- **Registros:** 3
- **Paginação:** cursor
- **Chaves:** database, cursor, count, count_without_location, properties, count_pending, count_review
- **Chaves dos dados:** db_id, latitude, longitude, deal_stage, building_parameters, listing_brokers, address, address_complement, rental_value, sale_value...

**Exemplo de Resposta:**
```json
{
  "database": "ac-dfzv24117ahkn",
  "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJzb3JfcGFnZSI6MX0.bALkKwBM3zPxmHPAybWiY13rXNysono4gd_qc_fTpsg",
  "count": 158,
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
      "property_id": "4550464861896
... (truncado)
```

#### Imóveis - finality=residential
- **Endpoint:** `/v1/properties?finality=residential&limit=3`
- **Tipo:** object
- **DataKey:** `properties`
- **Registros:** 3
- **Paginação:** cursor
- **Chaves:** database, cursor, count, count_without_location, properties, count_pending, count_review
- **Chaves dos dados:** db_id, latitude, longitude, deal_stage, building_parameters, listing_brokers, address, address_complement, rental_value, sale_value...

**Exemplo de Resposta:**
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
      "property_id": "4550464861896
... (truncado)
```

#### Imóveis - finality=commercial
- **Endpoint:** `/v1/properties?finality=commercial&limit=3`
- **Tipo:** object
- **DataKey:** `properties`
- **Registros:** 3
- **Paginação:** cursor
- **Chaves:** database, cursor, count, count_without_location, properties, count_pending, count_review
- **Chaves dos dados:** db_id, latitude, longitude, deal_stage, building_parameters, listing_brokers, address, address_complement, rental_value, sale_value...

**Exemplo de Resposta:**
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
      "property_id": "4550464861896
... (truncado)
```

#### Imóveis - status=available
- **Endpoint:** `/v1/properties?status=available&limit=3`
- **Tipo:** object
- **DataKey:** `properties`
- **Registros:** 3
- **Paginação:** cursor
- **Chaves:** database, cursor, count, count_without_location, properties, count_pending, count_review
- **Chaves dos dados:** db_id, latitude, longitude, deal_stage, building_parameters, listing_brokers, address, address_complement, rental_value, sale_value...

**Exemplo de Resposta:**
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
      "property_id": "4550464861896
... (truncado)
```

#### Imóveis - com user_id
- **Endpoint:** `/v1/properties?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&limit=3`
- **Tipo:** object
- **DataKey:** `properties`
- **Registros:** 3
- **Paginação:** cursor
- **Chaves:** database, cursor, count, count_without_location, properties, count_pending, count_review
- **Chaves dos dados:** db_id, latitude, longitude, deal_stage, building_parameters, listing_brokers, address, address_complement, rental_value, sale_value...

**Exemplo de Resposta:**
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
      "property_id": "4550464861896
... (truncado)
```

#### Imóvel - Verificar existência
- **Endpoint:** `/v1/property/exists?code=326`
- **Tipo:** object
- **Chaves:** property, has_permission

**Exemplo de Resposta:**
```json
{
  "property": {
    "created_at": "2024-06-20T13:47:02.313074Z",
    "db_id": 4866099379175424,
    "latitude": -20.4944026,
    "longitude": -54.59545139999999,
    "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAwOeQttIIDKIBEGFjLWRmenYyNDExN2Foa24",
    "updated_at": "2024-06-27T19:30:43.741169Z",
    "cover_photo": {
      "db_id": 5957875334643712,
      "url": "https://lh3.googleusercontent.com/fHj7Q5WWB-Ny8dhWYyEEdqMJ7A_soysUdK83CFkk-VxibcD-HS5H8cJuF6AJZ0gd4iJNa1jJj1MoqcD85r2MCfCcMIZUaJPq8UM57Q5P3CnlIAMqXAO2rQ=s0"
    },
    "cover_photo_private": {
      "db_id": 0,
      "url": ""
    },
    "database": null,
    "member_register_code": null,
    "features": {
      "Outros": [
        {
          "db_id": 6647492228677632,
          "name": "Facebook Ads",
          "active": true
        },
        {
          "db_id": 6378656904511488,
          "name": "Google Ads",
          "active": true
        }
      ]
    },
    "fields": {
      "guarantee": [
        [
          {
            "field_id": "guarantor",
            "name": "Fiador",
            "active": true,
            "group_name": "guarantee",
            "group_position": 1,
            "value": null,
            "configuration": {
              "description": "",
              "inactive": false,
              "link": null,
              "mask": "",
              "multiple": false,
              "read_only": false,
              "require_value": null,
              "showingroup
... (truncado)
```

#### Imóvel por ID
- **Endpoint:** `/v1/property/4550464861896704`
- **Tipo:** object
- **DataKey:** `multimidias`
- **Registros:** 0
- **Chaves:** created_at, db_id, latitude, longitude, key_id, updated_at, cover_photo, cover_photo_private, database, member_register_code...

**Exemplo de Resposta:**
```json
{
  "created_at": "2025-08-18T14:36:31.525472Z",
  "db_id": 4550464861896704,
  "latitude": -20.4749802,
  "longitude": -54.59968569999999,
  "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoM3604oIDKIBEGFjLWRmenYyNDExN2Foa24",
  "updated_at": "2025-12-09T20:14:06.913908Z",
  "cover_photo": {
    "db_id": 4713665851293696,
    "url": "https://lh3.googleusercontent.com/BoD0sdOlqEMDcmVTNPORRlEwKauPdyr6eYH9QnH_su2r6zhtFGpb2tfegxI2B8n3iAIwJld_ux2Bxj0EAG-pP77ThPOLhXOs7Uc8RfDafTCD_l_R1vEUl1pb=s0"
  },
  "cover_photo_private": {
    "db_id": 0,
    "url": ""
  },
  "database": null,
  "member_register_code": null,
  "features": {},
  "fields": {
    "guarantee": [
      [
        {
          "field_id": "guarantor",
          "name": "Fiador",
          "active": true,
          "group_name": "guarantee",
          "group_position": 1,
          "value": null,
          "configuration": {
            "description": "",
            "inactive": false,
            "link": null,
            "mask": "",
            "multiple": false,
            "read_only": false,
            "require_value": null,
            "showingroup": true,
            "type": "Checkbox",
            "typebox": false,
            "typecommercial": false,
            "typelandlot": false,
            "typeresidential": false,
            "typerural": false,
            "typevalue": "guarantor",
            "url": null,
            "validate": "",
            "values": [
              ""
    
... (truncado)
```

#### Imóvel - Estatísticas
- **Endpoint:** `/v1/property/4550464861896704/statistics`
- **Tipo:** object
- **DataKey:** `contacts`
- **Registros:** 0
- **Chaves:** property_visits, contacts, graph, likes, reserves

**Exemplo de Resposta:**
```json
{
  "property_visits": 0,
  "contacts": [],
  "graph": {
    "months": [
      [
        "AUG",
        "2025"
      ],
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ],
    "site_views": [
      3,
      831,
      1146,
      63,
      109
    ],
    "advert_views": [
      0,
      0,
      1,
      0,
      0
    ],
    "site_contacts": 0
  },
  "likes": 0,
  "reserves": []
}
```

#### Imóvel - Deals Match
- **Endpoint:** `/v1/property/4550464861896704/deals-match`
- **Tipo:** object
- **Chaves:** count

**Exemplo de Resposta:**
```json
{
  "count": 0
}
```

#### Imóvel por Código
- **Endpoint:** `/v1/property/code/326`
- **Tipo:** object
- **DataKey:** `multimidias`
- **Registros:** 0
- **Chaves:** created_at, db_id, latitude, longitude, key_id, updated_at, cover_photo, cover_photo_private, database, member_register_code...

**Exemplo de Resposta:**
```json
{
  "created_at": "2025-08-18T14:36:31.525472Z",
  "db_id": 4550464861896704,
  "latitude": -20.4749802,
  "longitude": -54.59968569999999,
  "key_id": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyFQsSCFByb3BlcnR5GICAoM3604oIDKIBEGFjLWRmenYyNDExN2Foa24",
  "updated_at": "2025-12-09T20:14:06.913908Z",
  "cover_photo": {
    "db_id": 4713665851293696,
    "url": "https://lh3.googleusercontent.com/BoD0sdOlqEMDcmVTNPORRlEwKauPdyr6eYH9QnH_su2r6zhtFGpb2tfegxI2B8n3iAIwJld_ux2Bxj0EAG-pP77ThPOLhXOs7Uc8RfDafTCD_l_R1vEUl1pb=s0"
  },
  "cover_photo_private": {
    "db_id": 0,
    "url": ""
  },
  "database": null,
  "member_register_code": null,
  "features": {},
  "fields": {
    "guarantee": [
      [
        {
          "field_id": "guarantor",
          "name": "Fiador",
          "active": true,
          "group_name": "guarantee",
          "group_position": 1,
          "value": null,
          "configuration": {
            "description": "",
            "inactive": false,
            "link": null,
            "mask": "",
            "multiple": false,
            "read_only": false,
            "require_value": null,
            "showingroup": true,
            "type": "Checkbox",
            "typebox": false,
            "typecommercial": false,
            "typelandlot": false,
            "typeresidential": false,
            "typerural": false,
            "typevalue": "guarantor",
            "url": null,
            "validate": "",
            "values": [
              ""
    
... (truncado)
```

#### Tipos de Imóvel
- **Endpoint:** `/v1/property-types`
- **Tipo:** array
- **Chaves:** type, finality, active, db_id, db_key, created_at, updated_at

**Exemplo de Resposta:**
```json
[
  {
    "type": "Prédio Inteiro",
    "finality": "commercial",
    "active": true,
    "db_id": "4567443539230720",
    "db_key": "YWMtZGZ6djI0MTE3YWhrbi9Qcm9wZXJ0eVR5cGVzLzQ1Njc0NDM1MzkyMzA3MjA=",
    "created_at": "2025-11-04T15:15:41.436060",
    "updated_at": "2025-11-04T15:15:41.436060"
  },
  {
    "type": "Conjunto / Sala",
    "finality": "commercial",
    "active": true,
    "db_id": "4892067904880640",
    "db_key": "YWMtZGZ6djI0MTE3YWhrbi9Qcm9wZXJ0eVR5cGVzLzQ4OTIwNjc5MDQ4ODA2NDA=",
    "created_at": "2025-11-04T15:15:40.903574",
    "updated_at": "2025-11-04T15:15:40.903574"
  },
  {
    "type": "Loja / Salão",
    "finality": "commercial",
    "active": true,
    "db_id": "5073455329312768",
    "db_key": "YWMtZGZ6djI0MTE3YWhrbi9Qcm9wZXJ0eVR5cGVzLzUwNzM0NTUzMjkzMTI3Njg=",
    "created_at": "2025-11-04T15:15:41.236718",
    "updated_at": "2025-11-04T15:15:41.236718"
  },
  {
    "type": "Hotel",
    "finality": "commercial",
    "active": true,
    "db_id": "5085887430918144",
    "db_key": "YWMtZGZ6djI0MTE3YWhrbi9Qcm9wZXJ0eVR5cGVzLzUwODU4ODc0MzA5MTgxNDQ=",
    "created_at": "2025-11-04T15:15:41.097074",
    "updated_at": "2025-11-04T15:15:41.097074"
  },
  {
    "type": "Galpão / Depósito / Armazém",
    "finality": "commercial",
    "active": true,
    "db_id": "5122984002977792",
    "db_key": "YWMtZGZ6djI0MTE3YWhrbi9Qcm9wZXJ0eVR5cGVzLzUxMjI5ODQwMDI5Nzc3OTI=",
    "created_at": "2025-11-04T15:15:41.021740",
    "updated_at": "2025-11-04T15:15:41.021740"
  },

... (truncado)
```

#### Property Features - Listar
- **Endpoint:** `/v1/property-features`
- **Tipo:** object
- **DataKey:** `Imóvel`
- **Registros:** 51
- **Chaves:** Imóvel, Áreas Comuns, Outros
- **Chaves dos dados:** db_id, active, checked, name, type_residential, type_commercial, type_rural

**Exemplo de Resposta:**
```json
{
  "Imóvel": [
    {
      "db_id": 5054788512251904,
      "active": true,
      "checked": false,
      "name": "Almoxarifado",
      "type_residential": false,
      "type_commercial": true,
      "type_rural": false
    },
    {
      "db_id": 6229548587810816,
      "active": true,
      "checked": false,
      "name": "Area Constr. Total:",
      "type_residential": false,
      "type_commercial": true,
      "type_rural": false
    },
    {
      "db_id": 5068159970181120,
      "active": true,
      "checked": false,
      "name": "Área de Serviço",
      "type_residential": true,
      "type_commercial": false,
      "type_rural": true
    },
    {
      "db_id": 6031285649670144,
      "active": true,
      "checked": false,
      "name": "Área Operaional",
      "type_residential": false,
      "type_commercial": true,
      "type_rural": false
    },
    {
      "db_id": 4974653901635584,
      "active": true,
      "checked": false,
      "name": "Áreas",
      "type_residential": false,
      "type_commercial": true,
      "type_rural": false
    },
    {
      "db_id": 4769324869877760,
      "active": true,
      "checked": false,
      "name": "Áreas Suporte",
      "type_residential": false,
      "type_commercial": true,
      "type_rural": false
    },
    {
      "db_id": 5099377654759424,
      "active": true,
      "checked": false,
      "name": "Armário",
      "type_residential": true,
      "type_commercial": false,
      "type_rural": true
    },

... (truncado)
```

#### Property Adverts - Listar
- **Endpoint:** `/v1/property-adverts?limit=5`
- **Tipo:** object
- **DataKey:** `adverts`
- **Registros:** 11
- **Chaves:** adverts
- **Chaves dos dados:** namespace, db_key, db_id, type, created_at, updated_at, active, all_properties, media_source_key, settings...

**Exemplo de Resposta:**
```json
{
  "adverts": [
    {
      "namespace": "ac-dfzv24117ahkn",
      "db_key": "YWMtZGZ6djI0MTE3YWhrbi9BZHZlcnRzL3NVZk1YOG94aUtwRE44OWR3ZzR1",
      "db_id": "sUfMX8oxiKpDN89dwg4u",
      "type": "Adverts",
      "created_at": "2025-10-20T19:44:34.297723",
      "updated_at": "2025-11-09T00:00:21.569723",
      "active": true,
      "all_properties": true,
      "media_source_key": "L01lZGlhU291cmNlcy81ODk2MTczMzMzMjUwMDQ4",
      "settings": {
        "fields": [
          {
            "pattern": "[a-zA-Z0-9]",
            "name": "Código do cliente",
            "type": "string",
            "value": "47833891",
            "required": true
          },
          {
            "name": "Divulgar endereço",
            "options": [
              "Não",
              "Sim",
              "Aproximado"
            ],
            "type": "select",
            "value": "Sim",
            "required": true
          },
          {
            "name": "Exibir a localização do imóvel no mapa",
            "type": "boolean",
            "value": true,
            "required": false
          }
        ],
        "filters": {
          "status": "all"
        },
        "integration_schema_type": "xml",
        "open_navent_xml": true,
        "lead_integration_active": true
      },
      "unlimited_plan": true,
      "description": "",
      "status": "active",
      "media_source_id": "5896173333250048",
      "name": "Casa Mineira - OpenNavent",
      "media_source_settings": {
     
... (truncado)
```

#### Property Buildings - Search
- **Endpoint:** `/v1/property-buildings/search?search_text=edificio`
- **Tipo:** array
- **Chaves:** db_id, code, name, search

**Exemplo de Resposta:**
```json
[
  {
    "db_id": "6117314293399552",
    "code": "39",
    "name": "Edifício Gibran",
    "search": "Edifício Gibran"
  }
]
```

### Endpoints com Erro

- `/v1/property/search?limit=3` → 422: {"detail":[{"type":"int_parsing","loc":["path","property_id"],"msg":"Input should be a valid integer
- `/v1/property/neighborhoods` → 401: Not authorized
- `/v1/property/range-values` → 422: {"detail":[{"type":"int_parsing","loc":["path","property_id"],"msg":"Input should be a valid integer
- `/v1/property/range-areas` → 422: {"detail":[{"type":"int_parsing","loc":["path","property_id"],"msg":"Input should be a valid integer
- `/v1/property/4550464861896704/views` → 405: The current request is matched to the defined url template "/v1/property/{property_id}/views" but its http method is not allowed
- `/v1/property/4550464861896704/calendar-items` → 401: Not authorized

---

## 📂 LEASES

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/leases?limit=3` | ✅ 200 | object | leases | - |
| `/v1/leases?smart_list=active&limit=3` | ✅ 200 | object | leases | - |
| `/v1/leases?smart_list=inactive&limit=3` | ✅ 200 | object | leases | - |
| `/v1/lease/5987740112388096` | ✅ 200 | object | agreements | - |
| `/v1/lease/code/15` | ✅ 200 | object | agreements | - |

### Detalhes

#### Listar Locações
- **Endpoint:** `/v1/leases?limit=3`
- **Tipo:** object
- **DataKey:** `leases`
- **Registros:** 12
- **Chaves:** leases, cursor, count, count_lease_digital_real_estate, count_lease_with_invoices_not_generated, value_total, management_fee_total
- **Chaves dos dados:** db_id, key, code, lease_type, value, irrf, property, status, start_at, end_at...

**Exemplo de Resposta:**
```json
{
  "leases": [
    {
      "db_id": 5987740112388096,
      "key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEgsSBUxlYXNlGICAoJOWutEKDKIBEGFjLWRmenYyNDExN2Foa24",
      "code": "15",
      "lease_type": "residential",
      "value": 6313.51,
      "irrf": false,
      "property": {
        "address": "Rua Alagoas, 921",
        "address_complement": "Parte térrea ",
        "city": "Campo Grande",
        "code": "113",
        "db_id": 5064445616193536,
        "neighborhood": "Centro",
        "state": "MS",
        "zipcode": "79020-121",
        "owners": [
          {
            "firstname": "Edina",
            "code": null,
            "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEwsSBlBlcnNvbhiAgMCr_svuCAyiARBhYy1kZnp2MjQxMTdhaGtu",
            "type": "person",
            "lastname": "Aparecida",
            "emails": [
              "direitoedina@gmail.com"
            ],
            "db_id": 4989995638063104,
            "rate": null,
            "percentage": 50,
            "cpf": "562.821.171-00",
            "landlord_account_id": "a0d9ff35438911efb249cf71192a57ff",
            "fullname": "Edina Aparecida Rodrigues",
            "email": "direitoedina@gmail.com",
            "phone": {
              "country_code": "+55",
              "number": "(67) 99904-7232",
              "alpha2Code": "br",
              "type": "mobile",
              "number_plain": "67999047232"
            }
          },
          {
            "firstname": "Melchiades",
   
... (truncado)
```

#### Locações - smart_list=active
- **Endpoint:** `/v1/leases?smart_list=active&limit=3`
- **Tipo:** object
- **DataKey:** `leases`
- **Registros:** 15
- **Chaves:** leases, cursor, count, count_lease_digital_real_estate, count_lease_with_invoices_not_generated, value_total, management_fee_total
- **Chaves dos dados:** db_id, key, code, lease_type, value, irrf, property, status, start_at, end_at...

**Exemplo de Resposta:**
```json
{
  "leases": [
    {
      "db_id": 5987740112388096,
      "key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEgsSBUxlYXNlGICAoJOWutEKDKIBEGFjLWRmenYyNDExN2Foa24",
      "code": "15",
      "lease_type": "residential",
      "value": 6313.51,
      "irrf": false,
      "property": {
        "address": "Rua Alagoas, 921",
        "address_complement": "Parte térrea ",
        "city": "Campo Grande",
        "code": "113",
        "db_id": 5064445616193536,
        "neighborhood": "Centro",
        "state": "MS",
        "zipcode": "79020-121",
        "owners": [
          {
            "firstname": "Edina",
            "code": null,
            "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEwsSBlBlcnNvbhiAgMCr_svuCAyiARBhYy1kZnp2MjQxMTdhaGtu",
            "type": "person",
            "lastname": "Aparecida",
            "emails": [
              "direitoedina@gmail.com"
            ],
            "db_id": 4989995638063104,
            "rate": null,
            "percentage": 50,
            "cpf": "562.821.171-00",
            "landlord_account_id": "a0d9ff35438911efb249cf71192a57ff",
            "fullname": "Edina Aparecida Rodrigues",
            "email": "direitoedina@gmail.com",
            "phone": {
              "country_code": "+55",
              "number": "(67) 99904-7232",
              "alpha2Code": "br",
              "type": "mobile",
              "number_plain": "67999047232"
            }
          },
          {
            "firstname": "Melchiades",
   
... (truncado)
```

#### Locações - smart_list=inactive
- **Endpoint:** `/v1/leases?smart_list=inactive&limit=3`
- **Tipo:** object
- **DataKey:** `leases`
- **Registros:** 15
- **Chaves:** leases, cursor, count, count_lease_digital_real_estate, count_lease_with_invoices_not_generated, value_total, management_fee_total
- **Chaves dos dados:** db_id, key, code, lease_type, value, irrf, property, status, start_at, end_at...

**Exemplo de Resposta:**
```json
{
  "leases": [
    {
      "db_id": 5987740112388096,
      "key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEgsSBUxlYXNlGICAoJOWutEKDKIBEGFjLWRmenYyNDExN2Foa24",
      "code": "15",
      "lease_type": "residential",
      "value": 6313.51,
      "irrf": false,
      "property": {
        "address": "Rua Alagoas, 921",
        "address_complement": "Parte térrea ",
        "city": "Campo Grande",
        "code": "113",
        "db_id": 5064445616193536,
        "neighborhood": "Centro",
        "state": "MS",
        "zipcode": "79020-121",
        "owners": [
          {
            "firstname": "Edina",
            "code": null,
            "db_key": "ahtwfmltb2J6aS1hcHAtcHJvZHVjdGlvbi1hcGlyEwsSBlBlcnNvbhiAgMCr_svuCAyiARBhYy1kZnp2MjQxMTdhaGtu",
            "type": "person",
            "lastname": "Aparecida",
            "emails": [
              "direitoedina@gmail.com"
            ],
            "db_id": 4989995638063104,
            "rate": null,
            "percentage": 50,
            "cpf": "562.821.171-00",
            "landlord_account_id": "a0d9ff35438911efb249cf71192a57ff",
            "fullname": "Edina Aparecida Rodrigues",
            "email": "direitoedina@gmail.com",
            "phone": {
              "country_code": "+55",
              "number": "(67) 99904-7232",
              "alpha2Code": "br",
              "type": "mobile",
              "number_plain": "67999047232"
            }
          },
          {
            "firstname": "Melchiades",
   
... (truncado)
```

#### Locação por ID
- **Endpoint:** `/v1/lease/5987740112388096`
- **Tipo:** object
- **DataKey:** `agreements`
- **Registros:** 0
- **Chaves:** additional_guests, additional_value_guest, agreements, annual_readjustment, beneficiaries, billing_mode, category, checklist, code, create_onlending_item...

**Exemplo de Resposta:**
```json
{
  "additional_guests": null,
  "additional_value_guest": null,
  "agreements": [],
  "annual_readjustment": {
    "name": "IGP-M",
    "db_id": "4602751199739904"
  },
  "beneficiaries": [
    {
      "bank_data_key": null,
      "active": true,
      "birthday": "1955-02-11",
      "code": "4078",
      "created_at": "2024-04-24",
      "crisp_people_id": null,
      "db_id": 4989995638063104,
      "email": "direitoedina@gmail.com",
      "favorite": false,
      "firstname": "Edina",
      "has_deal": false,
      "ignore_reassign_manager": false,
      "integrations": [],
      "lastname": "Aparecida",
      "media_source": "Cold Call By Brokers",
      "network_group_member_shared": false,
      "password": null,
      "phone": [
        {
          "alpha2Code": "br",
          "country_code": "+55",
          "number": "(67) 99904-7232",
          "sector": null,
          "type": "mobile"
        },
        {
          "alpha2Code": "br",
          "country_code": "+55",
          "number": "(67) 99617-8669",
          "sector": null,
          "type": "mobile"
        },
        {
          "alpha2Code": "br",
          "country_code": "+55",
          "number": "(67) 99955-0650",
          "sector": null,
          "type": "mobile"
        }
      ],
      "pix": [
        {
          "default": true,
          "pix_key": "562.821.171-00",
          "pix_key_type": "cpf_cnpj"
        }
      ],
      "private": false,
      "profile_image_key": null,
      "profil
... (truncado)
```

#### Locação por Código
- **Endpoint:** `/v1/lease/code/15`
- **Tipo:** object
- **DataKey:** `agreements`
- **Registros:** 0
- **Chaves:** additional_guests, additional_value_guest, agreements, annual_readjustment, beneficiaries, billing_mode, category, checklist, code, create_onlending_item...

**Exemplo de Resposta:**
```json
{
  "additional_guests": null,
  "additional_value_guest": null,
  "agreements": [],
  "annual_readjustment": {
    "name": "IGP-M",
    "db_id": "4602751199739904"
  },
  "beneficiaries": [
    {
      "bank_data_key": null,
      "active": true,
      "birthday": "1955-02-11",
      "code": "4078",
      "created_at": "2024-04-24",
      "crisp_people_id": null,
      "db_id": 4989995638063104,
      "email": "direitoedina@gmail.com",
      "favorite": false,
      "firstname": "Edina",
      "has_deal": false,
      "ignore_reassign_manager": false,
      "integrations": [],
      "lastname": "Aparecida",
      "media_source": "Cold Call By Brokers",
      "network_group_member_shared": false,
      "password": null,
      "phone": [
        {
          "alpha2Code": "br",
          "country_code": "+55",
          "number": "(67) 99904-7232",
          "sector": null,
          "type": "mobile"
        },
        {
          "alpha2Code": "br",
          "country_code": "+55",
          "number": "(67) 99617-8669",
          "sector": null,
          "type": "mobile"
        },
        {
          "alpha2Code": "br",
          "country_code": "+55",
          "number": "(67) 99955-0650",
          "sector": null,
          "type": "mobile"
        }
      ],
      "pix": [
        {
          "default": true,
          "pix_key": "562.821.171-00",
          "pix_key_type": "cpf_cnpj"
        }
      ],
      "private": false,
      "profile_image_key": null,
      "profil
... (truncado)
```

---

## 📂 INVOICES

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/invoices?limit=3` | ✅ 200 | object | invoices | next_page |
| `/v1/invoices?status=paid&limit=3` | ✅ 200 | object | invoices | next_page |
| `/v1/invoices?status=pending&limit=3` | ✅ 200 | object | invoices | next_page |
| `/v1/invoices?status=overdue&limit=3` | ✅ 200 | object | invoices | next_page |
| `/v1/invoice/536edb56c6cb11f0822842004e494300` | ✅ 200 | object | items | - |

### Detalhes

#### Listar Faturas
- **Endpoint:** `/v1/invoices?limit=3`
- **Tipo:** object
- **DataKey:** `invoices`
- **Registros:** 9
- **Paginação:** next_page
- **Chaves:** invoices, count, next_page, total, total_paid, total_pending, total_overdue
- **Chaves dos dados:** total_value, invoice_id, status, due_date, description, charge_fee_value, payment_method, paid_at, payment_methods_available, payment_maximum_installments...

**Exemplo de Resposta:**
```json
{
  "invoices": [
    {
      "total_value": 5263.09,
      "invoice_id": "536edb56c6cb11f0822842004e494300",
      "status": "paid",
      "due_date": "2025-12-01",
      "description": "Aluguel ref. 01/11/2025 a 30/11/2025",
      "charge_fee_value": 3.5,
      "payment_method": "bank_slip",
      "paid_at": "2025-12-01",
      "payment_methods_available": "all",
      "payment_maximum_installments": 1,
      "interest_value": 0,
      "difference_value": 0,
      "invoice_url": "https://fatura.imobzi.com/ac-dfzv24117ahkn/536edb56c6cb11f0822842004e494300-29b9",
      "contact": {
        "db_id": 5629360611000320,
        "type": "person",
        "name": "Igor Anderson Gomes Araújo",
        "code": "9649",
        "email": [
          "gaacademia22@gmail.com"
        ],
        "cpf": "362.820.018-03",
        "cnpj": null,
        "phone": [
          "(67) 9715-3951"
        ]
      },
      "info_contract": null,
      "property": {
        "db_id": 6387196591341568,
        "address": "Avenida Bom Pastor, 939",
        "address_complement": "",
        "neighborhood": "Vila Vilas Boas",
        "city": "Campo Grande",
        "state": "MS",
        "code": "125",
        "zipcode": "79051-220",
        "cover_photo": {
          "db_id": 5552685051281408,
          "url": "https://lh3.googleusercontent.com/144lFGYa9VqERlhh6eAi2g6nlmzmi9JhL0Ryb34QUKRL3_Fq2PHA5tMMf3siCdSlbwJMcB-0Mtri-wHJmUB0VwNhKtfGqcPqZu0roTNaAO7lUSppuukx94o=s0"
        },
        "owners": [
         
... (truncado)
```

#### Faturas - status=paid
- **Endpoint:** `/v1/invoices?status=paid&limit=3`
- **Tipo:** object
- **DataKey:** `invoices`
- **Registros:** 7
- **Paginação:** next_page
- **Chaves:** invoices, count, next_page, total, total_paid, total_pending, total_overdue
- **Chaves dos dados:** total_value, invoice_id, status, due_date, description, charge_fee_value, payment_method, paid_at, payment_methods_available, payment_maximum_installments...

**Exemplo de Resposta:**
```json
{
  "invoices": [
    {
      "total_value": 5263.09,
      "invoice_id": "536edb56c6cb11f0822842004e494300",
      "status": "paid",
      "due_date": "2025-12-01",
      "description": "Aluguel ref. 01/11/2025 a 30/11/2025",
      "charge_fee_value": 3.5,
      "payment_method": "bank_slip",
      "paid_at": "2025-12-01",
      "payment_methods_available": "all",
      "payment_maximum_installments": 1,
      "interest_value": 0,
      "difference_value": 0,
      "invoice_url": "https://fatura.imobzi.com/ac-dfzv24117ahkn/536edb56c6cb11f0822842004e494300-29b9",
      "contact": {
        "db_id": 5629360611000320,
        "type": "person",
        "name": "Igor Anderson Gomes Araújo",
        "code": "9649",
        "email": [
          "gaacademia22@gmail.com"
        ],
        "cpf": "362.820.018-03",
        "cnpj": null,
        "phone": [
          "(67) 9715-3951"
        ]
      },
      "info_contract": null,
      "property": {
        "db_id": 6387196591341568,
        "address": "Avenida Bom Pastor, 939",
        "address_complement": "",
        "neighborhood": "Vila Vilas Boas",
        "city": "Campo Grande",
        "state": "MS",
        "code": "125",
        "zipcode": "79051-220",
        "cover_photo": {
          "db_id": 5552685051281408,
          "url": "https://lh3.googleusercontent.com/144lFGYa9VqERlhh6eAi2g6nlmzmi9JhL0Ryb34QUKRL3_Fq2PHA5tMMf3siCdSlbwJMcB-0Mtri-wHJmUB0VwNhKtfGqcPqZu0roTNaAO7lUSppuukx94o=s0"
        },
        "owners": [
         
... (truncado)
```

#### Faturas - status=pending
- **Endpoint:** `/v1/invoices?status=pending&limit=3`
- **Tipo:** object
- **DataKey:** `invoices`
- **Registros:** 2
- **Paginação:** next_page
- **Chaves:** invoices, count, next_page, total, total_paid, total_pending, total_overdue
- **Chaves dos dados:** total_value, invoice_id, status, due_date, description, charge_fee_value, payment_method, paid_at, payment_methods_available, payment_maximum_installments...

**Exemplo de Resposta:**
```json
{
  "invoices": [
    {
      "total_value": 8886.84,
      "invoice_id": "9243cee0d1cf11f0bf9c42004e494300",
      "status": "pending",
      "due_date": "2025-12-15",
      "description": "Aluguel ref. 15/11/2025 a 14/12/2025",
      "charge_fee_value": 0,
      "payment_method": null,
      "paid_at": null,
      "payment_methods_available": "all",
      "payment_maximum_installments": 1,
      "interest_value": 0,
      "difference_value": 0,
      "invoice_url": "https://fatura.imobzi.com/ac-dfzv24117ahkn/9243cee0d1cf11f0bf9c42004e494300-802b",
      "contact": {
        "db_id": 4543732836204544,
        "type": "person",
        "name": "Bruna Jakiely Carvalho da Silva",
        "code": "15904",
        "email": [
          "moisesduartef@hotmail.com"
        ],
        "cpf": "010.346.112-40",
        "cnpj": null,
        "phone": [
          "(51) 9434-3939"
        ]
      },
      "info_contract": null,
      "property": {
        "db_id": 4734780111847424,
        "address": "Rua das Garças, 1532",
        "address_complement": "",
        "neighborhood": "Vila Célia",
        "city": "Campo Grande",
        "state": "MS",
        "code": "318",
        "zipcode": "79020-180",
        "cover_photo": {
          "db_id": 5155974837436416,
          "url": "https://lh3.googleusercontent.com/H3FGLIS436xf7AuT7rjNXLEh_FWJhcnUabkL80FFy9IznOgXS0Cm6OtMarrpvRvMwmJMPbPkbbhGaL-pVminMO3EUMOmkgByjn88L2-rSM5E0p_UrZf3zaE=s0"
        },
        "owners": [
          {
          
... (truncado)
```

#### Faturas - status=overdue
- **Endpoint:** `/v1/invoices?status=overdue&limit=3`
- **Tipo:** object
- **DataKey:** `invoices`
- **Registros:** 0
- **Paginação:** next_page
- **Chaves:** invoices, count, next_page, total, total_paid, total_pending, total_overdue

**Exemplo de Resposta:**
```json
{
  "invoices": [],
  "count": 0,
  "next_page": null,
  "total": 0,
  "total_paid": 47865.3,
  "total_pending": 13407.14,
  "total_overdue": 0
}
```

#### Fatura por ID
- **Endpoint:** `/v1/invoice/536edb56c6cb11f0822842004e494300`
- **Tipo:** object
- **DataKey:** `items`
- **Registros:** 4
- **Chaves:** invoice_id, category, subcategory, due_date, paid_at, payment_authentication, status, invoice_url, send_overdue_notification, payment_method...
- **Chaves dos dados:** contact, description, invoice_item_id, value, include_in_dimob, until_due_date, behavior, charge_management_fee, item_type, landlords

**Exemplo de Resposta:**
```json
{
  "invoice_id": "536edb56c6cb11f0822842004e494300",
  "category": "Terceiros (Administração)",
  "subcategory": "Recebimento de Aluguel",
  "due_date": "2025-12-01",
  "paid_at": "2025-12-01",
  "payment_authentication": null,
  "status": "paid",
  "invoice_url": "https://fatura.imobzi.com/ac-dfzv24117ahkn/536edb56c6cb11f0822842004e494300-29b9",
  "send_overdue_notification": true,
  "payment_method": "bank_slip",
  "payment_methods_available": "all",
  "payment_maximum_installments": 1,
  "charge_fee_value": 3.5,
  "difference_value": 0,
  "interest_value": 0,
  "installments": null,
  "value": 5263.09,
  "total_value": 5263.09,
  "bank_slip_id": "500859857",
  "bank_slip_url": "https://api.pjbank.com.br/boletos/f555c20f6f1961de542f70f79fc8241eb966e616",
  "bank_type": "pjbank",
  "reference_start_at": "2025-11-01",
  "reference_end_at": "2025-11-30",
  "contact": {
    "db_id": 5629360611000320,
    "type": "person",
    "name": "Igor Anderson Gomes Araújo",
    "code": "9649",
    "email": [
      "gaacademia22@gmail.com"
    ],
    "cpf": "362.820.018-03",
    "cnpj": null,
    "phone": [
      "(67) 9715-3951"
    ]
  },
  "property": {
    "db_id": 6387196591341568,
    "address": "Avenida Bom Pastor, 939",
    "address_complement": "",
    "neighborhood": "Vila Vilas Boas",
    "city": "Campo Grande",
    "state": "MS",
    "code": "125",
    "zipcode": "79051-220",
    "cover_photo": {
      "db_id": 5552685051281408,
      "url": "https://lh3.googleusercontent.com/
... (truncado)
```

---

## 📂 DEALS

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/pipeline-groups` | ✅ 200 | array | - | - |
| `/v1/pipelines` | ✅ 200 | array | - | - |
| `/v1/deals` | ✅ 200 | object | - | - |
| `/v1/deals?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2` | ✅ 200 | object | - | - |
| `/v1/deals?pipeline_group_id=5675099632959488` | ✅ 200 | object | - | - |
| `/v1/deals?deal_status=all` | ✅ 200 | object | - | - |
| `/v1/deals?deal_status=in%20progress` | ✅ 200 | object | - | - |
| `/v1/deals?deal_status=win` | ✅ 200 | object | - | - |
| `/v1/deals?deal_status=lost` | ✅ 200 | object | - | - |
| `/v1/deals?deal_status=stagnant` | ✅ 200 | object | - | - |
| `/v1/deals?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&dea` | ✅ 200 | object | - | - |
| `/v1/deals/search?limit=5` | ✅ 200 | object | deals | cursor |
| `/v1/deals/search?user_id=P1ibK4GFPqZYKIx9e55RpQobt` | ✅ 200 | object | deals | cursor |
| `/v1/deals/search?pipeline_id=4584666827849728&limi` | ✅ 200 | object | deals | cursor |
| `/v1/deals/search?deal_status=in%20progress&limit=5` | ✅ 200 | object | deals | cursor |
| `/v1/deals/search?show_activities=true&limit=3` | ✅ 200 | object | deals | cursor |
| `/v1/deal-fields` | ✅ 200 | object | - | - |
| `/v1/deal/lost-reason` | ✅ 200 | object | deals_lost_reasons | - |

### Detalhes

#### Pipeline Groups
- **Endpoint:** `/v1/pipeline-groups`
- **Tipo:** array
- **Chaves:** code, deal_cards_info, default, description_key, name, pipeline_type, range_value, db_id, pipelines

**Exemplo de Resposta:**
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
        "field_id": "
... (truncado)
```

#### Pipelines (Estágios)
- **Endpoint:** `/v1/pipelines`
- **Tipo:** array
- **Chaves:** db_id, description, digital_real_estate_allow_lease_create, digital_real_estate_visits, name, network_sync, not_expires_reserves, position, radar_enabled, site_reserves...

**Exemplo de Resposta:**
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
    "digital_real_estate_allow_lease_create"
... (truncado)
```

#### Deals - Sem parâmetros
- **Endpoint:** `/v1/deals`
- **Tipo:** object
- **Chaves:** 4584666827849728, 6005926736691200, 5381346821144576, 5944296774565888, 6481696604553216, 6507246727987200, 4677659379367936, cursor_all_stages, total_pages, total_values...

**Exemplo de Resposta:**
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

#### Deals - Com user_id
- **Endpoint:** `/v1/deals?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2`
- **Tipo:** object
- **Chaves:** 4584666827849728, 6005926736691200, 5381346821144576, 5944296774565888, 6481696604553216, 6507246727987200, 4677659379367936, cursor_all_stages, total_pages, total_values...

**Exemplo de Resposta:**
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
        "description": "Analise da conversa:\n\n## Relatório Executivo – Análise da Jornada do Cliente Mirian Goncalves\n\n### 1. Perfil e Interesses do Cliente\nMirian Goncalves demonstrou interesse elevado em apartamentos de padrão premium, especificamente no pré-lançamento Jooy Lúmen, localizado no bairro Vilas Boas, Campo Grande/MS. Não há histórico anterior, sendo esta a primeira sequência de interações registrada. O cliente buscou informações detalhadas sobre localização, diferenciais do empreendimento, condições de pagamento, previsão de entrega e características do imóvel, como área de lazer, varanda gourmet, churrasqueira, piscina, academia e playground. A busca é por um apartamento novo, bem localizado, com lazer completo e acabamento de alto padrão, evidencia
... (truncado)
```

#### Deals - Com pipeline_group_id
- **Endpoint:** `/v1/deals?pipeline_group_id=5675099632959488`
- **Tipo:** object
- **Chaves:** 4584666827849728, 6005926736691200, 5381346821144576, 5944296774565888, 6481696604553216, 6507246727987200, 4677659379367936, cursor_all_stages, total_pages, total_values...

**Exemplo de Resposta:**
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

#### Deals - deal_status=all
- **Endpoint:** `/v1/deals?deal_status=all`
- **Tipo:** object
- **Chaves:** 4584666827849728, 6005926736691200, 5381346821144576, 5944296774565888, 6481696604553216, 6507246727987200, 4677659379367936, cursor_all_stages, total_pages, total_values...

**Exemplo de Resposta:**
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

#### Deals - deal_status=in progress
- **Endpoint:** `/v1/deals?deal_status=in%20progress`
- **Tipo:** object
- **Chaves:** 4584666827849728, 6005926736691200, 5381346821144576, 5944296774565888, 6481696604553216, 6507246727987200, 4677659379367936, cursor_all_stages, total_pages, total_values...

**Exemplo de Resposta:**
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

#### Deals - deal_status=win
- **Endpoint:** `/v1/deals?deal_status=win`
- **Tipo:** object
- **Chaves:** 4584666827849728, 6005926736691200, 5381346821144576, 5944296774565888, 6481696604553216, 6507246727987200, 4677659379367936, cursor_all_stages, total_pages, total_values...

**Exemplo de Resposta:**
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

#### Deals - deal_status=lost
- **Endpoint:** `/v1/deals?deal_status=lost`
- **Tipo:** object
- **Chaves:** 4584666827849728, 6005926736691200, 5381346821144576, 5944296774565888, 6481696604553216, 6507246727987200, 4677659379367936, cursor_all_stages, total_pages, total_values...

**Exemplo de Resposta:**
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

#### Deals - deal_status=stagnant
- **Endpoint:** `/v1/deals?deal_status=stagnant`
- **Tipo:** object
- **Chaves:** 4584666827849728, 6005926736691200, 5381346821144576, 5944296774565888, 6481696604553216, 6507246727987200, 4677659379367936, cursor_all_stages, total_pages, total_values...

**Exemplo de Resposta:**
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

#### Deals - user_id + deal_status
- **Endpoint:** `/v1/deals?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&deal_status=all`
- **Tipo:** object
- **Chaves:** 4584666827849728, 6005926736691200, 5381346821144576, 5944296774565888, 6481696604553216, 6507246727987200, 4677659379367936, cursor_all_stages, total_pages, total_values...

**Exemplo de Resposta:**
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
        "description": "Analise da conversa:\n\n## Relatório Executivo – Análise da Jornada do Cliente Mirian Goncalves\n\n### 1. Perfil e Interesses do Cliente\nMirian Goncalves demonstrou interesse elevado em apartamentos de padrão premium, especificamente no pré-lançamento Jooy Lúmen, localizado no bairro Vilas Boas, Campo Grande/MS. Não há histórico anterior, sendo esta a primeira sequência de interações registrada. O cliente buscou informações detalhadas sobre localização, diferenciais do empreendimento, condições de pagamento, previsão de entrega e características do imóvel, como área de lazer, varanda gourmet, churrasqueira, piscina, academia e playground. A busca é por um apartamento novo, bem localizado, com lazer completo e acabamento de alto padrão, evidencia
... (truncado)
```

#### Deals Search - Sem parâmetros
- **Endpoint:** `/v1/deals/search?limit=5`
- **Tipo:** object
- **DataKey:** `deals`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** name, database, cursor, count, deals
- **Chaves dos dados:** db_id, flag, db_key, status, commission, code, deal_codes, title, value, description...

**Exemplo de Resposta:**
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
          "sec
... (truncado)
```

#### Deals Search - Com user_id
- **Endpoint:** `/v1/deals/search?user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2&limit=5`
- **Tipo:** object
- **DataKey:** `deals`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** name, database, cursor, count, deals
- **Chaves dos dados:** db_id, flag, db_key, status, commission, code, deal_codes, title, value, description...

**Exemplo de Resposta:**
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
          "sec
... (truncado)
```

#### Deals Search - Com pipeline_id
- **Endpoint:** `/v1/deals/search?pipeline_id=4584666827849728&limit=5`
- **Tipo:** object
- **DataKey:** `deals`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** name, database, cursor, count, deals
- **Chaves dos dados:** db_id, flag, db_key, status, commission, code, deal_codes, title, value, description...

**Exemplo de Resposta:**
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
          "sec
... (truncado)
```

#### Deals Search - deal_status=in progress
- **Endpoint:** `/v1/deals/search?deal_status=in%20progress&limit=5`
- **Tipo:** object
- **DataKey:** `deals`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** name, database, cursor, count, deals
- **Chaves dos dados:** db_id, flag, db_key, status, commission, code, deal_codes, title, value, description...

**Exemplo de Resposta:**
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
          "sec
... (truncado)
```

#### Deals Search - show_activities=true
- **Endpoint:** `/v1/deals/search?show_activities=true&limit=3`
- **Tipo:** object
- **DataKey:** `deals`
- **Registros:** 50
- **Paginação:** cursor
- **Chaves:** name, database, cursor, count, deals
- **Chaves dos dados:** db_id, flag, db_key, status, commission, code, deal_codes, title, value, description...

**Exemplo de Resposta:**
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
          "sec
... (truncado)
```

#### Deal Fields
- **Endpoint:** `/v1/deal-fields`
- **Tipo:** object
- **Chaves:** 

**Exemplo de Resposta:**
```json
{}
```

#### Motivos de Perda
- **Endpoint:** `/v1/deal/lost-reason`
- **Tipo:** object
- **DataKey:** `deals_lost_reasons`
- **Registros:** 6
- **Chaves:** deals_lost_reasons
- **Chaves dos dados:** name, active, types, db_id, created_at, updated_at

**Exemplo de Resposta:**
```json
{
  "deals_lost_reasons": [
    {
      "name": "Dados de contato inválido",
      "active": true,
      "types": [],
      "db_id": "5081176791318528",
      "created_at": "2024-01-17T16:11:43.432699Z",
      "updated_at": "2025-11-04T18:08:22.482924Z"
    },
    {
      "name": "Esgotado 5 tentativas de contato",
      "active": true,
      "types": [],
      "db_id": "4651242864246784",
      "created_at": "2024-01-17T16:11:43.620391Z",
      "updated_at": "2025-11-04T18:08:22.518670Z"
    },
    {
      "name": "Fechou com o concorrente",
      "active": true,
      "types": [],
      "db_id": "4799701814607872",
      "created_at": "2024-01-17T16:11:43.641394Z",
      "updated_at": "2025-11-04T18:08:22.552482Z"
    },
    {
      "name": "Fora de Perfil",
      "active": true,
      "types": [],
      "db_id": "6580917765144576",
      "created_at": "2024-01-17T16:11:43.661181Z",
      "updated_at": "2025-11-04T18:08:22.588770Z"
    },
    {
      "name": "Negócio duplicado",
      "active": true,
      "types": [],
      "db_id": "6701068669943808",
      "created_at": "2024-01-17T16:11:43.728154Z",
      "updated_at": "2025-11-04T18:08:22.621594Z"
    },
    {
      "name": "Não foi aprovada a garantia de locação",
      "active": true,
      "types": [],
      "db_id": "4645947505115136",
      "created_at": "2024-01-17T16:11:43.265954Z",
      "updated_at": "2025-11-04T18:08:22.449022Z"
    }
  ]
}
```

---

## 📂 TRANSACTIONS

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/financial/transactions?limit=5` | ✅ 200 | object | transactions | next_page |
| `/v1/transactions?limit=5` | ❌ 400 | - | - | - |
| `/v1/financial-transactions?limit=5` | ❌ 400 | - | - | - |

### Detalhes

#### Transações - /v1/financial/transactions
- **Endpoint:** `/v1/financial/transactions?limit=5`
- **Tipo:** object
- **DataKey:** `transactions`
- **Registros:** 55
- **Paginação:** next_page
- **Chaves:** transactions, next_page, total, previous_balance, incomes, coming_incomes, expenses, coming_expenses, transaction_type_rule, user_has_conciliation_permission
- **Chaves dos dados:** account, account_credit, value, total_value, description, subcategory, due_date, invoice_onlending_split, group_id, paid...

**Exemplo de Resposta:**
```json
{
  "transactions": [
    {
      "account": {
        "name": "PJBank",
        "db_id": 5374237794631680
      },
      "account_credit": null,
      "value": -6078.7,
      "total_value": -6078.7,
      "description": "Aluguel Rede Uno - DDA",
      "subcategory": "Aluguel",
      "due_date": "2025-12-05",
      "invoice_onlending_split": null,
      "group_id": "a121a794db1011eebbda837306c406a7",
      "paid": true,
      "paid_at": "2025-12-05",
      "repeat_type": "recurrent",
      "sum_type": null,
      "repeat_frequency": "monthly",
      "pix_key_type": null,
      "pix_key": null,
      "qrcode": null,
      "tags": [],
      "transaction_type": "expense",
      "financial_conciliation_transaction_id": 1477,
      "transaction_id": "a1285d14db1011eeb2e1837306c406a7",
      "invoice_id": null,
      "bank_slip_id": null,
      "lease_item_index": null,
      "lease_item_description": null,
      "contact": {
        "db_id": "5112672726024192",
        "type": "organization",
        "name": "HENAUTH  MIGUEL FRANCO FILHO"
      },
      "landlord_account_id": null,
      "landlord_transaction_id": null,
      "landlord_transaction_type": null,
      "operation_id": "1000024868886",
      "status": null,
      "day_last_item": false
    },
    {
      "account": {
        "name": "PJBank",
        "db_id": 5374237794631680
      },
      "account_credit": {
        "name": "Itaú Unibanco  S.A",
        "db_id": 5525073287446528
      },
      "value": -5975.72,
   
... (truncado)
```

### Endpoints com Erro

- `/v1/transactions?limit=5` → 400: Invoice not found, or invalid token: transactions
- `/v1/financial-transactions?limit=5` → 400: Invoice not found, or invalid token: financial-transactions

---

## 📂 CALENDAR

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/calendar?year=2025&month=12` | ✅ 200 | object | calendar_items | - |
| `/v1/calendar?year=2025&month=12&user_id=P1ibK4GFPq` | ✅ 200 | object | calendar_items | - |
| `/v1/calendar?year=2025&month=12&item_type=visit` | ✅ 200 | object | calendar_items | - |
| `/v1/calendar?year=2025&month=12&item_type=task` | ✅ 200 | object | calendar_items | - |
| `/v1/calendar?year=2025&month=12&item_type=whatsapp` | ✅ 200 | object | calendar_items | - |
| `/v1/calendar?year=2025&month=12&item_type=call` | ✅ 200 | object | calendar_items | - |
| `/v1/calendar?year=2025&month=12&item_type=event` | ❌ 422 | - | - | - |

### Detalhes

#### Calendário - 2025/12
- **Endpoint:** `/v1/calendar?year=2025&month=12`
- **Tipo:** object
- **DataKey:** `calendar_items`
- **Registros:** 0
- **Chaves:** calendar_items, holidays, cursor_fw, cursor_rw, google_authorize_url

**Exemplo de Resposta:**
```json
{
  "calendar_items": [],
  "holidays": [],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "https://api.imobzi.app/v1/google/oauth/events?user_id=0&database=ac-dfzv24117ahkn"
}
```

#### Calendário - Com user_id
- **Endpoint:** `/v1/calendar?year=2025&month=12&user_id=P1ibK4GFPqZYKIx9e55RpQobt7J2`
- **Tipo:** object
- **DataKey:** `calendar_items`
- **Registros:** 222
- **Chaves:** calendar_items, holidays, cursor_fw, cursor_rw, google_authorize_url
- **Chaves dos dados:** db_id, all_day, description, done, google_calendar_event_id, guests, final_date, initial_date, item_type, notification...

**Exemplo de Resposta:**
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
      "db_
... (truncado)
```

#### Calendário - item_type=visit
- **Endpoint:** `/v1/calendar?year=2025&month=12&item_type=visit`
- **Tipo:** object
- **DataKey:** `calendar_items`
- **Registros:** 0
- **Chaves:** calendar_items, holidays, cursor_fw, cursor_rw, google_authorize_url

**Exemplo de Resposta:**
```json
{
  "calendar_items": [],
  "holidays": [],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "https://api.imobzi.app/v1/google/oauth/events?user_id=0&database=ac-dfzv24117ahkn"
}
```

#### Calendário - item_type=task
- **Endpoint:** `/v1/calendar?year=2025&month=12&item_type=task`
- **Tipo:** object
- **DataKey:** `calendar_items`
- **Registros:** 0
- **Chaves:** calendar_items, holidays, cursor_fw, cursor_rw, google_authorize_url

**Exemplo de Resposta:**
```json
{
  "calendar_items": [],
  "holidays": [],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "https://api.imobzi.app/v1/google/oauth/events?user_id=0&database=ac-dfzv24117ahkn"
}
```

#### Calendário - item_type=whatsapp
- **Endpoint:** `/v1/calendar?year=2025&month=12&item_type=whatsapp`
- **Tipo:** object
- **DataKey:** `calendar_items`
- **Registros:** 0
- **Chaves:** calendar_items, holidays, cursor_fw, cursor_rw, google_authorize_url

**Exemplo de Resposta:**
```json
{
  "calendar_items": [],
  "holidays": [],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "https://api.imobzi.app/v1/google/oauth/events?user_id=0&database=ac-dfzv24117ahkn"
}
```

#### Calendário - item_type=call
- **Endpoint:** `/v1/calendar?year=2025&month=12&item_type=call`
- **Tipo:** object
- **DataKey:** `calendar_items`
- **Registros:** 0
- **Chaves:** calendar_items, holidays, cursor_fw, cursor_rw, google_authorize_url

**Exemplo de Resposta:**
```json
{
  "calendar_items": [],
  "holidays": [],
  "cursor_fw": null,
  "cursor_rw": null,
  "google_authorize_url": "https://api.imobzi.app/v1/google/oauth/events?user_id=0&database=ac-dfzv24117ahkn"
}
```

### Endpoints com Erro

- `/v1/calendar?year=2025&month=12&item_type=event` → 422: {"detail":[{"type":"literal_error","loc":["query","item_type"],"msg":"Input should be 'task', 'visit

---

## 📂 TIMELINE

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/timeline?limit=5` | ❌ 500 | - | - | - |
| `/v1/timeline?contact_id=5352720932798464&limit=5` | ❌ 500 | - | - | - |
| `/v1/timeline?property_id=4550464861896704&limit=5` | ❌ 500 | - | - | - |
| `/v1/timeline?deal_id=123&limit=5` | ❌ 500 | - | - | - |

### Detalhes

### Endpoints com Erro

- `/v1/timeline?limit=5` → 500: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'
- `/v1/timeline?contact_id=5352720932798464&limit=5` → 500: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'
- `/v1/timeline?property_id=4550464861896704&limit=5` → 500: int() argument must be a string, a bytes-like object or a real number, not 'NoneType'
- `/v1/timeline?deal_id=123&limit=5` → 500: Wrong wire type in tag.

---

## 📂 DOCUMENTS

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/documents?limit=5` | ✅ 200 | object | documents | - |
| `/v1/documents?contact_id=5352720932798464&limit=5` | ✅ 200 | object | documents | - |
| `/v1/documents?property_id=4550464861896704&limit=5` | ✅ 200 | object | documents | - |

### Detalhes

#### Documentos - Listar
- **Endpoint:** `/v1/documents?limit=5`
- **Tipo:** object
- **DataKey:** `documents`
- **Registros:** 10
- **Chaves:** cursor, documents, count
- **Chaves dos dados:** status, source, db_id, d4sign_uuid, name, document_type, created_at, updated_at, shared, digital_inspection...

**Exemplo de Resposta:**
```json
{
  "cursor": null,
  "documents": [
    {
      "status": "waiting_signature",
      "source": "imobzi",
      "db_id": "x4DGKdEkYPuVG3IcP638",
      "d4sign_uuid": "56bc0936-8240-42cb-ad4f-3c61d3bc8941",
      "name": "Termo de Autorização de Venda de Imóvel | Delcides Mariano",
      "document_type": "electronic_signature",
      "created_at": "2025-12-08T15:56:30.264413",
      "updated_at": "2025-12-08T15:57:00.789084",
      "shared": null,
      "digital_inspection": null,
      "files": [
        {
          "path": "/imobzi/accounts/ac-dfzv24117ahkn/documents/x4DGKdEkYPuVG3IcP638/AutorizaodevendaSemExclusividade.pdf",
          "blob_key": "AMIfv95v6_DzxeAnqbhuOJK7p4BP2Rr8D7gguSu_NQqmE-Rtxn2PvOmUStzW_J1nZChU9nZsSuJ5yUl84ExNy9FWyUCbj6Ggzr-YK4hxlBtiM4obSYt4uHBzVZTMsynVjk_Gyue48hXRl6UzsxsRceFbEjwVOPKyXuruQExQXMI9GsGn4jkj22OmuRHR3VYqhhbTVBz7C7d0m8WnboE9EK1OM7abgQk_yhnVebjAvVDgqdEBHpTBrrkI4XzE9Ao8no0h9eLHtyuI",
          "size": "3.6 KB",
          "document_size": 3686.4,
          "file_type": "application/pdf",
          "name": "AutorizaodevendaSemExclusividade.pdf",
          "url": "https://imobz.in/g8HkdV0uVn",
          "cript_sha256": null,
          "short_key": "hR8crValP1"
        }
      ],
      "has_permission": true
    },
    {
      "status": "waiting_signature",
      "source": "imobzi",
      "db_id": "ueBhaa0pWnC6seCggUuq",
      "d4sign_uuid": "509e899a-e23b-4b08-8366-f855721ee0e6",
      "name": "Termo Aditivo - Avenida Bom Pastor, nº 903",
      "d
... (truncado)
```

#### Documentos - Por contact_id
- **Endpoint:** `/v1/documents?contact_id=5352720932798464&limit=5`
- **Tipo:** object
- **DataKey:** `documents`
- **Registros:** 10
- **Chaves:** cursor, documents, count
- **Chaves dos dados:** status, source, db_id, d4sign_uuid, name, document_type, created_at, updated_at, shared, digital_inspection...

**Exemplo de Resposta:**
```json
{
  "cursor": null,
  "documents": [
    {
      "status": "waiting_signature",
      "source": "imobzi",
      "db_id": "x4DGKdEkYPuVG3IcP638",
      "d4sign_uuid": "56bc0936-8240-42cb-ad4f-3c61d3bc8941",
      "name": "Termo de Autorização de Venda de Imóvel | Delcides Mariano",
      "document_type": "electronic_signature",
      "created_at": "2025-12-08T15:56:30.264413",
      "updated_at": "2025-12-08T15:57:00.789084",
      "shared": null,
      "digital_inspection": null,
      "files": [
        {
          "path": "/imobzi/accounts/ac-dfzv24117ahkn/documents/x4DGKdEkYPuVG3IcP638/AutorizaodevendaSemExclusividade.pdf",
          "blob_key": "AMIfv95v6_DzxeAnqbhuOJK7p4BP2Rr8D7gguSu_NQqmE-Rtxn2PvOmUStzW_J1nZChU9nZsSuJ5yUl84ExNy9FWyUCbj6Ggzr-YK4hxlBtiM4obSYt4uHBzVZTMsynVjk_Gyue48hXRl6UzsxsRceFbEjwVOPKyXuruQExQXMI9GsGn4jkj22OmuRHR3VYqhhbTVBz7C7d0m8WnboE9EK1OM7abgQk_yhnVebjAvVDgqdEBHpTBrrkI4XzE9Ao8no0h9eLHtyuI",
          "size": "3.6 KB",
          "document_size": 3686.4,
          "file_type": "application/pdf",
          "name": "AutorizaodevendaSemExclusividade.pdf",
          "url": "https://imobz.in/g8HkdV0uVn",
          "cript_sha256": null,
          "short_key": "hR8crValP1"
        }
      ],
      "has_permission": true
    },
    {
      "status": "waiting_signature",
      "source": "imobzi",
      "db_id": "ueBhaa0pWnC6seCggUuq",
      "d4sign_uuid": "509e899a-e23b-4b08-8366-f855721ee0e6",
      "name": "Termo Aditivo - Avenida Bom Pastor, nº 903",
      "d
... (truncado)
```

#### Documentos - Por property_id
- **Endpoint:** `/v1/documents?property_id=4550464861896704&limit=5`
- **Tipo:** object
- **DataKey:** `documents`
- **Registros:** 2
- **Chaves:** cursor, documents, count
- **Chaves dos dados:** status, source, db_id, d4sign_uuid, name, document_type, created_at, updated_at, shared, digital_inspection...

**Exemplo de Resposta:**
```json
{
  "cursor": null,
  "documents": [
    {
      "status": "signed",
      "source": "imobzi",
      "db_id": "5270742235611136",
      "d4sign_uuid": "497f3d3d-dfd9-4c24-a302-323322b941d6",
      "name": "Opção do imóvel Rua Santos, 66 - Jardim Sao Bento",
      "document_type": "electronic_signature",
      "created_at": "2025-08-22T14:24:33.808029",
      "updated_at": "2025-09-12T17:07:00.584047",
      "shared": false,
      "digital_inspection": false,
      "files": [
        {
          "name": "Exclusividade.pdf",
          "url": "https://imobzi.storage.googleapis.com/accounts/ac-dfzv24117ahkn/documents/5270742235611136/Exclusividade.pdf?Expires=2070368674&GoogleAccessId=imobzi-app-production-api%40appspot.gserviceaccount.com&Signature=TMl5XR2KFdVuHTBp64OQ4ZtGmNrlfeLEfNEJw7ro2jl4qcQh2%2BGf%2F5fOCrd%2B5kCzO%2Bn1VSN50cymREfc0cx1Nl85V5eEOp7EVsM1ndYaeD5JT2eIduzIx58m0hu%2FqXIVHcXun6%2BcZm8Q3sSQIX7DJv7SbXis8V7WpuPZ%2BBTr9L7ZZMEDOrPL3zOVKNxd%2FZWKqV5v0ZklzNl0l27OExqJfeixpOxHjAd5jGSW4a93%2F1NnGyDIY1pJw2Ogbdp8pyW5YRH5%2FlJ0PBo8o8KoVHpMmPk3e8zfFBHDXGp%2FBhBpipblqMXVC%2F7yB8kXvP1%2BceZPev%2Bg1%2B%2Fi1ii9ByxKPL4q%2BQ%3D%3D",
          "file_type": "application/pdf",
          "size": "23.9 KB",
          "path": "/imobzi/accounts/ac-dfzv24117ahkn/documents/5270742235611136/Exclusividade.pdf",
          "blob_key": "AMIfv95W2ZeCg1UCTeGw5vosKbTBqX5NRGg7FCGGyudu_XxatxQNv2V0JG7GH9OZA5WepY77u5pF1GUeeIUZ5UMMZWwzcw7PTpXgyoLkwGPps2VBuetQ6zcUqLCXK7QCcDSe0vRLicFMCWBMm8NvEIfqni8BDd7A2kCbe
... (truncado)
```

---

## 📂 OTHERS

| Endpoint | Status | Tipo | DataKey | Paginação |
|----------|--------|------|---------|----------|
| `/v1/accounts` | ❌ 400 | - | - | - |
| `/v1/banks` | ✅ 200 | array | - | - |
| `/v1/teams` | ❌ 400 | - | - | - |
| `/v1/calendar-types` | ❌ 401 | - | - | - |
| `/v1/readjustments` | ❌ 400 | - | - | - |
| `/v1/categories` | ❌ 400 | - | - | - |
| `/v1/subcategories` | ❌ 400 | - | - | - |
| `/v1/guarantee-types` | ❌ 400 | - | - | - |
| `/v1/site-settings` | ❌ 400 | - | - | - |
| `/v1/site/statistics` | ❌ 404 | - | - | - |
| `/v1/notifications` | ✅ 200 | object | notifications | - |
| `/v1/custom-fields` | ❌ 400 | - | - | - |
| `/v1/webhooks` | ✅ 200 | array | - | - |

### Detalhes

#### Bancos
- **Endpoint:** `/v1/banks`
- **Tipo:** array
- **Chaves:** code, db_id, logo_url, name

**Exemplo de Resposta:**
```json
[
  {
    "code": "332",
    "db_id": 5138139170471936,
    "logo_url": null,
    "name": "Acesso Soluções de Pagamento S.A."
  },
  {
    "code": "117",
    "db_id": 5922617898827776,
    "logo_url": null,
    "name": "Advanced Corretora de Câmbio Ltda"
  },
  {
    "code": "172",
    "db_id": 5806794710450176,
    "logo_url": null,
    "name": "Albatross Corretora de Câmbio e Valores S.A"
  },
  {
    "code": "188",
    "db_id": 6538441584017408,
    "logo_url": null,
    "name": "Ativa Investimentos S.A. Corretora de Títulos Câmbio e Valores"
  },
  {
    "code": "280",
    "db_id": 6231703609671680,
    "logo_url": null,
    "name": "Avista S.A. Crédito, Financiamento e Investimento"
  },
  {
    "code": "081",
    "db_id": 5078192968695808,
    "logo_url": null,
    "name": "BBN Banco Brasileiro de Negocios S.A"
  },
  {
    "code": "250",
    "db_id": 4793298124275712,
    "logo_url": null,
    "name": "BCV - Banco de Crédito e Varejo S/A"
  },
  {
    "code": "134",
    "db_id": 5943804704063488,
    "logo_url": null,
    "name": "BGC Liquidez Distribuidora de Títulos e Valores Mobiliários Ltda"
  },
  {
    "code": "017",
    "db_id": 4853965342638080,
    "logo_url": null,
    "name": "BNY Mellon Banco S.A"
  },
  {
    "code": "301",
    "db_id": 5762824273920000,
    "logo_url": null,
    "name": "BPP Instituição de Pagamentos S/A"
  },
  {
    "code": "126",
    "db_id": 6603218549211136,
    "logo_url": null,
    "name": "BR Partners Banco de Investimento S.A"
  
... (truncado)
```

#### Notifications
- **Endpoint:** `/v1/notifications`
- **Tipo:** object
- **DataKey:** `notifications`
- **Registros:** 0
- **Chaves:** emails_count, notifications, next_cursor, categories_count

**Exemplo de Resposta:**
```json
{
  "emails_count": 0,
  "notifications": [],
  "next_cursor": null,
  "categories_count": {}
}
```

#### Webhooks
- **Endpoint:** `/v1/webhooks`
- **Tipo:** array
- **Chaves:** db_id, active, authorization, created_at, events, updated_at, url, name

**Exemplo de Resposta:**
```json
[
  {
    "db_id": 5010140246835200,
    "active": true,
    "authorization": "",
    "created_at": "2024-02-05T22:23:03.526121",
    "events": [
      "lead_created",
      "contact_created"
    ],
    "updated_at": "2024-02-05T22:23:03.526137",
    "url": "https://hook.us1.make.com/e8dyqu2iy9k26gd3r1vf2dozyi5bkq34",
    "name": ""
  },
  {
    "db_id": 5466644078919680,
    "active": true,
    "authorization": "",
    "created_at": "2024-03-27T13:43:10.399338",
    "events": [
      "property_created"
    ],
    "updated_at": "2024-03-27T13:43:10.399408",
    "url": "https://hook.us1.make.com/embeysd097scylechf6kr1n7my8qdf16",
    "name": ""
  },
  {
    "db_id": 6286996517945344,
    "active": true,
    "authorization": "",
    "created_at": "2025-04-25T12:03:57.471469",
    "events": [
      "property_match"
    ],
    "updated_at": "2025-06-26T20:07:54.465536",
    "url": "https://hook.us1.make.com/gj9o6hdfhz2v69o8biieo59lkr1xouvw",
    "name": "Radar de Negócios | N8N"
  },
  {
    "db_id": 6590417322639360,
    "active": false,
    "authorization": "",
    "created_at": "2024-05-31T19:09:25.571585",
    "events": [
      "deal_created",
      "deal_updated",
      "deal_deleted"
    ],
    "updated_at": "2025-09-04T14:13:03.095583",
    "url": "https://hook.us1.make.com/ex7mx8olda9gs66qvyirv7md2fx72iuu",
    "name": ""
  }
]
```

### Endpoints com Erro

- `/v1/accounts` → 400: Invoice not found, or invalid token: accounts
- `/v1/teams` → 400: Invoice not found, or invalid token: teams
- `/v1/calendar-types` → 401: Not authorized
- `/v1/readjustments` → 400: Invoice not found, or invalid token: readjustments
- `/v1/categories` → 400: Invoice not found, or invalid token: categories
- `/v1/subcategories` → 400: Invoice not found, or invalid token: subcategories
- `/v1/guarantee-types` → 400: Invoice not found, or invalid token: guarantee-types
- `/v1/site-settings` → 400: Invoice not found, or invalid token: site-settings
- `/v1/site/statistics` → 404: The current request is not defined by this API.
- `/v1/custom-fields` → 400: Invoice not found, or invalid token: custom-fields

---

## 📊 RESUMO GERAL

### Endpoints que Funcionam (para o Node)

| Recurso | Listar | Por ID | Por Código | DataKey | Paginação |
|---------|--------|--------|------------|---------|----------|
| contacts | ✅ | ✅ | ✅ | contacts | cursor |
| properties | ✅ | ✅ | ✅ | properties | cursor |
| leases | ✅ | ✅ | ✅ | leases | - |
| invoices | ✅ | ✅ | ❌ | invoices | next_page |
| deals | ❌ | ❌ | ❌ | - | - |
| transactions | ❌ | ❌ | ❌ | - | - |
| calendar | ❌ | ❌ | ❌ | - | - |
