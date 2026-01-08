# 🎯 PLANO DE AÇÃO IMEDIATO - BLOG-NEUROVENDAS

**Prioridade:** CRÍTICA  
**Objetivo:** Tornar o código funcional e definir identidade clara  
**Prazo:** 1-2 semanas

---

## ✅ CHECKLIST DE DECISÕES URGENTES

### Decisões Estratégicas (Stakeholders)

- [ ] **Confirmar identidade única do produto**
  - Nome: Elevare Editorial AI ✅
  - Eliminar: AutoBlog AI, NeuroVendas SEO, AI Studio App ❌
  - Atualizar todos os arquivos de documentação

- [ ] **Definir integração de IA**
  - [ ] Opção A: Lucresia como abstração (RECOMENDADO)
  - [ ] Opção B: Gemini direto (mais simples, menos diferenciação)

- [ ] **Definir banco de dados**
  - [ ] Opção A: PostgreSQL via Drizzle (RECOMENDADO - dados relacionais)
  - [ ] Opção B: MongoDB (workflow n8n usa, mas não ideal)

- [ ] **Aprovar escopo Fase 1**
  - Criar estrutura básica de pastas e componentes
  - Código funcional mínimo (sem funcionalidades avançadas)
  - Budget: 1-2 semanas de desenvolvimento

---

## 🛠️ TAREFAS TÉCNICAS IMEDIATAS

### 1. Limpar Identidade (2-3 horas)

```bash
# Arquivos para atualizar:
- metadata.json → nome: "Elevare Editorial AI"
- package.json → nome correto
- index.html → título correto
- README.md → reescrever do zero
```

**Ações:**
- [ ] Atualizar `metadata.json`
- [ ] Atualizar `package.json` 
- [ ] Atualizar `index.html`
- [ ] Reescrever `README.md` focado em Elevare
- [ ] Remover ou mover `INTEGRATION_GUIDE.md` (produto diferente)

---

### 2. Criar Estrutura de Pastas (1 hora)

```bash
mkdir -p src/components/{ui,features,layout}
mkdir -p src/pages
mkdir -p src/services
mkdir -p src/lib
mkdir -p src/hooks

# Mover arquivos existentes
mv App.tsx src/
mv types.ts src/types/
mv constants.tsx src/constants/
mv index.tsx src/
```

**Ações:**
- [ ] Criar estrutura de diretórios
- [ ] Mover arquivos existentes para `src/`
- [ ] Atualizar imports no `index.html`
- [ ] Atualizar paths no `vite.config.ts`

---

### 3. Criar Componentes Mínimos (2-3 dias)

#### Layout (1-2 horas)
**src/components/layout/Layout.tsx**
```tsx
// Shell do app com navegação lateral
// Recebe: activeTab, setActiveTab, credits
// Renderiza: Menu lateral + área de conteúdo
```

- [ ] Criar `Layout.tsx` básico
- [ ] Menu com 4-5 itens principais
- [ ] Header com créditos e perfil

#### Páginas Básicas (4-6 horas)
**src/pages/**
```
- LandingPage.tsx    → Tela inicial com onStart
- Dashboard.tsx      → Overview com cards de resumo
- HubView.tsx        → Planejamento editorial (tabela simples)
- ArticleGenerator.tsx → Form para gerar artigo
```

- [ ] Criar `LandingPage.tsx` (botão de início)
- [ ] Criar `Dashboard.tsx` (cards vazios por enquanto)
- [ ] Criar `HubView.tsx` (tabela mockada)
- [ ] Criar `ArticleGenerator.tsx` (form básico)

#### Componentes Placeholder (2-3 horas)
**src/pages/**
```
- ExploreExamples.tsx → Placeholder "Em desenvolvimento"
- AutomationConfig.tsx → Placeholder "Em desenvolvimento"
- YoutubeConverter.tsx → Placeholder "Em desenvolvimento"
- WebStoriesView.tsx → Placeholder "Em desenvolvimento"
```

- [ ] Criar 4 placeholders com mensagem "Em desenvolvimento"
- [ ] Usar componente reutilizável `ComingSoon.tsx`

---

### 4. Configurar Stack Escolhido (2-4 horas)

#### Se escolher Lucresia + PostgreSQL:
```bash
# Instalar dependências
pnpm add @lucresia/sdk  # (se existir SDK)
pnpm add drizzle-orm @neondatabase/serverless
pnpm add -D drizzle-kit

# Criar schemas básicos
src/db/schema.ts → Definir tabelas iniciais
```

- [ ] Instalar dependências do stack escolhido
- [ ] Criar arquivo de configuração (`.env.local`)
- [ ] Criar schemas/models básicos
- [ ] Remover arquivos do stack não escolhido

#### Limpar stack não escolhido:
- [ ] Remover `drizzle.config.ts` SE escolher MongoDB
- [ ] Remover referências MongoDB SE escolher PostgreSQL
- [ ] Atualizar `vite.config.ts` com variáveis corretas

---

### 5. Testar Execução (30 min)

```bash
# Instalar dependências
pnpm install

# Rodar dev server
pnpm run dev

# Abrir http://localhost:3000
# Verificar que não há erros de import
```

- [ ] Executar `pnpm install`
- [ ] Executar `pnpm run dev`
- [ ] Verificar que app abre sem erros
- [ ] Testar navegação entre páginas
- [ ] Confirmar que todos imports resolvem

---

## 📋 ORDEM DE EXECUÇÃO RECOMENDADA

**Dia 1: Decisões + Limpeza**
1. ✅ Reunião stakeholders: Decidir IA e DB
2. ✅ Atualizar identidade nos arquivos
3. ✅ Criar estrutura de pastas
4. ✅ Mover arquivos existentes

**Dia 2-3: Componentes Core**
5. ✅ Criar Layout.tsx
6. ✅ Criar LandingPage.tsx
7. ✅ Criar Dashboard.tsx
8. ✅ Criar HubView.tsx

**Dia 4: Componentes Secundários**
9. ✅ Criar ArticleGenerator.tsx
10. ✅ Criar 4 placeholders
11. ✅ Configurar stack escolhido

**Dia 5: Testes e Ajustes**
12. ✅ Testar execução completa
13. ✅ Corrigir bugs de import/path
14. ✅ Documentar decisões tomadas
15. ✅ Commit e deploy

---

## 🚫 O QUE NÃO FAZER AGORA

**Não implementar ainda:**
- ❌ Integração real com Lucresia (Fase 3)
- ❌ Lógica de geração de artigos (Fase 2-3)
- ❌ Integração com n8n (Fase 4)
- ❌ Multi-canal (Fase 4)
- ❌ Dashboard com dados reais (Fase 5)
- ❌ Autenticação/multi-tenant (Fase 2+)
- ❌ Testes unitários (após código funcionar)

**Foco Fase 1:**
✅ Apenas tornar código funcional  
✅ Estrutura limpa e escalável  
✅ Identidade única clara  
✅ Stack definido  

---

## 📞 PONTOS DE BLOQUEIO

**Se decisões não forem tomadas:**
- ⚠️ Não posso escolher entre Lucresia vs Gemini
- ⚠️ Não posso escolher entre PostgreSQL vs MongoDB
- ⚠️ Não posso remover INTEGRATION_GUIDE.md (confirmar que é produto diferente)

**Se surgirem dúvidas técnicas:**
- 💬 Lucresia tem SDK público? Qual endpoint?
- 💬 Qual o schema de dados ideal para calendário editorial?
- 💬 Manter workflow n8n ou integrar diferente?

---

## ✅ CRITÉRIO DE SUCESSO - FASE 1

**Código Funcional:**
- [ ] `pnpm run dev` executa sem erros
- [ ] App abre no navegador
- [ ] Navegação entre páginas funciona
- [ ] Nenhum erro de "Cannot find module"

**Identidade Clara:**
- [ ] metadata.json = Elevare Editorial AI
- [ ] README.md descreve produto correto
- [ ] Nenhuma menção a AutoBlog, NeuroVendas, AI Studio

**Estrutura Escalável:**
- [ ] Pastas organizadas (`src/`, `/components`, `/pages`)
- [ ] Imports relativos corretos
- [ ] Types centralizados

**Stack Definido:**
- [ ] IA escolhida (Lucresia ou Gemini)
- [ ] DB escolhido (PostgreSQL ou MongoDB)
- [ ] Arquivos do stack não escolhido removidos

---

## 📄 DOCUMENTAÇÃO RELACIONADA

- [AUDITORIA_COMPLETA.md](./AUDITORIA_COMPLETA.md) - Análise detalhada
- [RESUMO_EXECUTIVO.md](./RESUMO_EXECUTIVO.md) - Visão geral stakeholders
- Este arquivo: Ações imediatas

---

**Próxima revisão:** Após conclusão da Fase 1  
**Responsável:** Time de Desenvolvimento Elevare
