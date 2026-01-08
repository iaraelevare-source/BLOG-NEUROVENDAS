# 🏗️ Mapa de Arquitetura - Elevare Editorial AI

## Visão Geral: Real vs Prometido

```
┌───────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                      │
│                        (REACT FRONTEND)                        │
│                          ✅ 100% REAL                          │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Landing  │  │Dashboard │  │Generator │  │   Hub    │     │
│  │   Page   │  │          │  │          │  │ Central  │     │
│  │    ✅    │  │    ⚠️    │  │    ✅    │  │    ⚠️    │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
│                                                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │Autopilot │  │ YouTube  │  │   Web    │  │ Examples │     │
│  │          │  │Converter │  │ Stories  │  │          │     │
│  │    ⚠️    │  │    ⚠️    │  │    ⚠️    │  │    ⚠️    │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
│                                                                │
└───────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              ▼
┌───────────────────────────────────────────────────────────────┐
│                       CAMADA DE IA                             │
│                    (GOOGLE GEMINI API)                         │
│                          ✅ INTEGRADO                          │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  • Modelo: gemini-pro                                         │
│  • Função: Geração de artigos                                 │
│  • Status: Código implementado                                │
│  • Requer: GEMINI_API_KEY configurada                         │
│                                                                │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                    CAMADA DE BACKEND                           │
│                       ❌ NÃO EXISTE                            │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ❌ API REST                                                   │
│  ❌ Autenticação                                               │
│  ❌ CRUD de Artigos                                            │
│  ❌ Gerenciamento de Usuários                                  │
│  ❌ Lógica de Negócio                                          │
│                                                                │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                   CAMADA DE PERSISTÊNCIA                       │
│                       ❌ NÃO EXISTE                            │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ❌ Banco de Dados (MongoDB/PostgreSQL)                       │
│  ❌ Tabela de Artigos                                          │
│  ❌ Tabela de Usuários                                         │
│  ❌ Histórico de Gerações                                      │
│                                                                │
└───────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                   CAMADA DE INTEGRAÇÕES                        │
│                       ❌ NÃO EXISTE                            │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ❌ WordPress REST API                                         │
│  ❌ Wix API                                                    │
│  ❌ Google Sheets API                                          │
│  ❌ n8n Webhooks                                               │
│  ❌ YouTube Transcript API                                     │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

---

## Fluxo Real vs Esperado

### 1. Geração de Artigo (✅ FUNCIONA)

```
Usuário
   │
   │ 1. Preenche formulário
   ▼
[ArticleGenerator.tsx]
   │
   │ 2. handleSubmit()
   ▼
[GoogleGenerativeAI]
   │
   │ 3. model.generateContent(prompt)
   ▼
[Gemini API]
   │
   │ 4. Retorna artigo
   ▼
[ArticleGenerator.tsx]
   │
   │ 5. setGeneratedArticle()
   ▼
[Preview Component]
   │
   │ 6. Exibe resultado
   ▼
Usuário copia texto
```

**Status**: ✅ **FUNCIONA** (requer API key)

---

### 2. Salvar Artigo (❌ NÃO FUNCIONA)

```
Usuário clica "Salvar"
   │
   │ ❌ Sem botão salvar
   ▼
[ArticleGenerator.tsx]
   │
   │ ❌ Sem função de save
   ▼
[Backend API]
   │
   │ ❌ Não existe
   ▼
[Banco de Dados]
   │
   │ ❌ Não existe
   ▼
❌ FALHA
```

**Status**: ❌ **NÃO IMPLEMENTADO**

---

### 3. Publicar em WordPress (❌ NÃO FUNCIONA)

```
Usuário configura WordPress
   │
   │ ⚠️ Botão "Conectar" existe
   ▼
[AutomationConfig.tsx]
   │
   │ ❌ onClick sem ação
   ▼
[Backend API]
   │
   │ ❌ Não existe
   ▼
[WordPress REST API]
   │
   │ ❌ Sem integração
   ▼
❌ FALHA
```

**Status**: ❌ **NÃO IMPLEMENTADO**

---

## Componentes por Status

### ✅ Totalmente Funcionais
```typescript
components/Layout.tsx          // ✅ Navegação funciona
pages/LandingPage.tsx         // ✅ Exibe corretamente
pages/ArticleGenerator.tsx    // ✅ Gera com IA real
```

### ⚠️ Parcialmente Funcionais (UI sem Backend)
```typescript
pages/Dashboard.tsx           // ⚠️ Métricas hardcoded
pages/HubView.tsx            // ⚠️ Tabela com dados mock
pages/AutomationConfig.tsx   // ⚠️ Toggle local only
pages/YoutubeConverter.tsx   // ⚠️ Conversão fake
pages/WebStoriesView.tsx     // ⚠️ Stories estáticos
pages/ExploreExamples.tsx    // ⚠️ Exemplos hardcoded
```

### ❌ Não Existem
```
backend/
  api/
    routes/       // ❌
    controllers/  // ❌
    middleware/   // ❌
  db/
    models/       // ❌
    migrations/   // ❌
  services/
    wordpress.ts  // ❌
    wix.ts        // ❌
    sheets.ts     // ❌
```

---

## Stack Real vs Prometido

### ✅ Implementado
- React 19
- TypeScript
- Vite 6
- Tailwind CSS (CDN)
- Lucide Icons
- Google Gemini API (client-side)

### ❌ Não Implementado
- Node.js/Express (backend)
- MongoDB/PostgreSQL (database)
- JWT Auth
- WordPress SDK
- Wix SDK
- Google Sheets API
- n8n integration
- Cron jobs
- Redis cache
- Nginx/deployment

---

## Dados: Real vs Mock

### ✅ Dados Reais
- **Artigo gerado**: Vem do Gemini API
- **Formulário**: Inputs funcionam

### ⚠️ Dados Mock (Hardcoded)
```typescript
// Dashboard.tsx
const stats = [
  { value: '42', label: 'Artigos Gerados' }  // FAKE
];

// HubView.tsx
const articles = [
  { id: '1', keyword: 'Criomodelagem', ... }  // FAKE
];

// AutomationConfig.tsx
const platforms = {
  wordpress: { connected: true }  // FAKE
};
```

### ❌ Dados que Deveriam Existir
- Artigos salvos no DB
- Histórico de gerações
- Usuários cadastrados
- Métricas reais de analytics
- Status real de conexões

---

## Integração por Feature

| Feature | Frontend | IA | Backend | DB | Externa |
|---------|----------|----|---------|----|---------|
| **Gerar Artigo** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **Salvar Artigo** | ⚠️ | - | ❌ | ❌ | - |
| **Hub Central** | ✅ | - | ❌ | ❌ | - |
| **Publicar WP** | ⚠️ | - | ❌ | ❌ | ❌ |
| **Autopilot** | ✅ | - | ❌ | ❌ | ❌ |
| **YouTube→Artigo** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Web Stories** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Analytics** | ⚠️ | - | ❌ | ❌ | ❌ |

**Legenda:**
- ✅ = Implementado e funcional
- ⚠️ = UI existe mas sem lógica
- ❌ = Não existe

---

## Estimativa de Completude

```
Frontend:        █████████░ 90%  ✅
IA Integration:  ██░░░░░░░░ 20%  ⚠️
Backend API:     ░░░░░░░░░░  0%  ❌
Database:        ░░░░░░░░░░  0%  ❌
Integrações:     ░░░░░░░░░░  0%  ❌
DevOps:          ░░░░░░░░░░  0%  ❌
────────────────────────────────
TOTAL:           ███░░░░░░░ 28%
```

### MVP Atual
- **Gerador de Artigos IA**: 100% funcional
- **Interface Completa**: 90% polida
- **Sistema Completo**: 28% implementado

---

## Próximos Passos Objetivos

### Para 50% (4-6 semanas)
```bash
✅ Frontend (já feito)
⬜ Backend API básico
⬜ MongoDB setup
⬜ CRUD de artigos
⬜ Autenticação simples
```

### Para 75% (8-12 semanas)
```bash
⬜ WordPress integration
⬜ Wix integration
⬜ SEO score real
⬜ Agendamento básico
```

### Para 100% (16-20 semanas)
```bash
⬜ YouTube transcription
⬜ Analytics dashboard
⬜ Multi-tenant
⬜ Payment integration
⬜ Mobile app
```

---

**Resumo**: Você tem um **frontend excelente** e **1 feature funcional** (geração IA). Precisa de **backend completo** para tornar o resto operacional.
