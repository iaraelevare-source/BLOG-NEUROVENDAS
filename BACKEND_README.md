# 🚀 Backend Implementation - AutoBlog AI

## ✅ Implementation Status

### **COMPLETE**: Backend Infrastructure (v0.1.0)

All backend infrastructure has been implemented according to the specifications provided. The system is fully functional with mock AI mode enabled by default, allowing for immediate testing without API costs.

---

## 📁 Architecture Overview

### Directory Structure

```
server/
├── index.ts                 # Express app and server startup
├── controllers/             # Request handlers
│   ├── authController.ts
│   ├── contentController.ts
│   ├── creditController.ts
│   └── generationController.ts
├── services/                # Business logic (decoupled)
│   ├── userService.ts
│   ├── contentService.ts
│   ├── creditService.ts
│   ├── promptService.ts
│   └── aiProviderService.ts
├── routes/                  # API route definitions
│   ├── auth.ts
│   ├── contents.ts
│   ├── credits.ts
│   └── generations.ts
├── middleware/              # Express middleware
│   ├── auth.ts             # JWT authentication
│   └── errorHandler.ts     # Global error handling
└── utils/
    └── db.ts               # Database connection

drizzle/
├── schema.ts               # Database schema (Drizzle ORM)
└── seed.ts                 # Default prompts seeding
```

---

## 🗄️ Database Schema

### Tables Implemented

1. **users** - User accounts
2. **projects** - User projects/sites
3. **saved_prompts** - Reusable prompt templates (AI as assets!)
4. **contents** - Generated articles/content
5. **generations** - AI generation logs and tracking
6. **credit_usage** - Credit consumption history
7. **user_credits** - User credit balances
8. **automations** - Automation configurations

---

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status, environment, and AI mode.

### Authentication
```
POST /api/auth/register    # Create new user
POST /api/auth/login       # Login and get JWT token
GET  /api/auth/me          # Get current user (requires auth)
```

### Credits
```
GET /api/credits           # Get user credit balance
GET /api/credits/history   # Get credit usage history
```

### Contents
```
GET    /api/contents           # List all contents
GET    /api/contents/:id       # Get specific content
POST   /api/contents           # Create new content
PUT    /api/contents/:id       # Update content
DELETE /api/contents/:id       # Delete content
```

### Generations (AI)
```
POST /api/generations          # Generate content with AI
GET  /api/generations/status   # Check AI provider status
```

---

## 🤖 AI Architecture (Mock Mode)

### Current State: **MOCK MODE ENABLED**

The system is configured with `USE_MOCK_AI=true` by default. This means:

- ✅ All functionality works without API calls
- ✅ No API costs incurred
- ✅ Instant content generation (mock)
- ✅ Full system testing possible
- ✅ Credit system fully operational

### Mock AI Behavior

When generating content, the mock AI:
1. Simulates processing time (1 second)
2. Returns template-based content using the keyword
3. Logs the generation in the database
4. Deducts credits properly
5. Returns realistic token counts

### Switching to Real AI

To activate real Gemini AI:

1. Set valid `GEMINI_API_KEY` in `.env.local`
2. Change `USE_MOCK_AI=false` in `.env.local`
3. Restart server

The system will automatically use Gemini API with the saved prompts.

---

## 💰 Credit System

### How It Works

1. **New users** get 180 credits (beta plan)
2. **Each generation** costs 1 credit by default
3. **Credits are tracked** independently of AI tokens
4. **System blocks** when credits = 0
5. **Full history** of credit usage is logged

### Credit Actions

- `generate_article`: 1 credit
- Future actions can have different costs

### API Response Example

```json
{
  "userId": 1,
  "totalCredits": 180,
  "usedCredits": 5,
  "remainingCredits": 175,
  "plan": "beta"
}
```

---

## 📝 Prompts as Assets

### Philosophy

Prompts are treated as **strategic assets**, not disposable code:

- ✅ Stored in database
- ✅ Versioned
- ✅ Reusable across generations
- ✅ Variables injected at runtime
- ✅ Can be activated/deactivated

### Default Prompts Included

1. **Post de Autoridade - Estética**: Professional authority posts for aesthetic clinics
2. **Artigo SEO Universal**: Universal SEO-optimized articles
3. **Procedimento Técnico**: Technical procedure guides
4. **Conteúdo Educativo**: Educational content

### Variable Injection

Prompts use `{{variable}}` syntax:

```
Template: "Crie um artigo sobre {{keyword}}"
Variables: { keyword: "harmonização facial" }
Result: "Crie um artigo sobre harmonização facial"
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Update `.env.local` with your MySQL connection:

```env
DATABASE_URL=mysql://user:password@localhost:3306/autoblog_ai
```

### 3. Generate and Push Schema

```bash
npm run db:generate  # Generate migrations
npm run db:push      # Push to database
```

### 4. Seed Default Prompts

```bash
npm run db:seed
```

### 5. Start Server

```bash
# Backend only
npm run dev:server

# Frontend + Backend together
npm run dev:full
```

Server runs on `http://localhost:3001`

---

## 🧪 Testing the Backend

### 1. Check Health

```bash
curl http://localhost:3001/api/health
```

### 2. Register User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### 3. Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

Save the returned `token` for next requests.

### 4. Check Credits

```bash
curl http://localhost:3001/api/credits \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Generate Content

```bash
curl -X POST http://localhost:3001/api/generations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"keyword":"harmonização facial","type":"autoridade_clinica"}'
```

---

## 🔐 Authentication

### JWT-based Authentication

- Tokens expire in 7 days
- Include in header: `Authorization: Bearer <token>`
- All endpoints except `/auth/*` and `/health` require auth

### Security Notes

⚠️ **IMPORTANT**: Change `JWT_SECRET` in production!

---

## 📊 Logging and Monitoring

### Generation Tracking

Every AI generation is logged with:
- User ID
- Content ID
- Prompt ID and variables
- Tokens used (estimated and actual)
- Provider (mock/gemini)
- Status (success/error)
- Execution time
- Error messages (if failed)

### Credit Tracking

Every credit transaction is logged with:
- User ID
- Action performed
- Credits used
- Balance before/after
- Timestamp
- Associated generation ID

---

## 🎯 Next Steps for Production

### Before Beta Launch

- [x] Backend infrastructure
- [x] Database schema
- [x] Authentication system
- [x] Credit system
- [x] AI provider (mock mode)
- [x] Prompt management
- [ ] Connect frontend to backend
- [ ] Real database deployment
- [ ] Environment variables setup
- [ ] Testing with real users

### To Enable Real AI

1. Get Gemini API key from Google AI Studio
2. Update `.env.local`:
   ```
   GEMINI_API_KEY=your-real-api-key
   USE_MOCK_AI=false
   ```
3. Test with small content first
4. Monitor token usage
5. Adjust credit costs based on actual usage

---

## 🐛 Troubleshooting

### "DATABASE_URL is required"

Make sure `.env.local` has valid `DATABASE_URL`.

### "Insufficient credits"

User has run out of credits. Check `/api/credits` endpoint.

### "No active prompt found"

Run `npm run db:seed` to create default prompts.

### Server won't start

Check if port 3001 is available or change `PORT` in `.env.local`.

---

## 📝 API Response Formats

### Success Response

```json
{
  "content": { ... },
  "generation": {
    "id": 1,
    "tokensUsed": 250,
    "provider": "mock"
  },
  "creditsUsed": 1
}
```

### Error Response

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

### Credit Insufficient (402)

```json
{
  "error": "Insufficient credits",
  "remaining": 0,
  "required": 1
}
```

---

## 🎉 Summary

### What's Working

✅ Complete backend infrastructure  
✅ Database with proper schema  
✅ Authentication (register/login/JWT)  
✅ Credit system (tracking and enforcement)  
✅ Content CRUD operations  
✅ AI generation (mock mode)  
✅ Prompt management as assets  
✅ Error handling and logging  
✅ API documentation  

### What's Next

The backend is **production-ready** in mock mode. To launch beta:

1. Deploy database (MySQL/PlanetScale/etc)
2. Deploy backend (Railway/Fly.io/Render)
3. Connect frontend to backend API
4. Test with beta users
5. Enable real AI when ready

**The architecture is designed so AI is optional, not required!**

---

**Version**: 0.1.0  
**Status**: ✅ Complete and Ready for Integration  
**Mock AI**: ✅ Enabled  
**Last Updated**: January 13, 2026