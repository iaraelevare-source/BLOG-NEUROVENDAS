<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 Elevare Editorial AI - AutoBlog Generator

**A máquina de autoridade para clínicas estéticas**

Uma plataforma SaaS completa para criação, otimização e publicação automatizada de artigos para blogs usando Inteligência Artificial de ponta (Google Gemini).

![Landing Page](https://github.com/user-attachments/assets/35e350f8-39a2-4884-86ea-77b0557100c2)

## ✨ Funcionalidades

### 🤖 Gerador de Artigos IA
- Geração automática de artigos otimizados para SEO
- Powered by Google Gemini AI
- Múltiplos tipos de artigos (Procedimento, Autoridade, Educativo, Gestão, Tendência, Resenha)
- Personalização de tom e tamanho do artigo
- Preview em tempo real com formatação Markdown

![Article Generator](https://github.com/user-attachments/assets/0ac04e11-0037-4e59-9184-3d4d46ac4031)

### 📊 Hub Central
- Gerenciamento completo de artigos
- Visualização de status (Pendente, Gerado, Otimizado, Agendado, Publicado)
- SEO Score para cada artigo
- Filtros e busca avançada
- Gestão multi-canal (Blog, Pinterest, LinkedIn, Audio)

![Hub Central](https://github.com/user-attachments/assets/65c5b711-40a8-4566-8757-dc413fe5b301)

### ⚡ Autopilot
- Publicação automática em WordPress e Wix
- Integração com Google Sheets para controle
- Webhooks n8n para automação avançada
- Agendamento de posts (diário, semanal ou personalizado)
- Status de sincronização em tempo real

![Autopilot Configuration](https://github.com/user-attachments/assets/6f7d4468-ef05-45e4-adf3-dfce08a33a0c)

### 📈 Dashboard
- Estatísticas de performance
- Artigos recentes
- Métricas de engajamento
- Tempo economizado
- Taxa de conversão

### 🎬 Conversor YouTube
- Transforme vídeos do YouTube em artigos
- Extração automática de conteúdo
- Formatação otimizada para SEO

### 📱 Web Stories
- Crie Web Stories a partir dos artigos
- Visual atrativo para redes sociais
- Formato otimizado para mobile

### 💡 Exemplos de Sucesso
- Galeria de artigos de alto desempenho
- Dicas e melhores práticas
- Inspiração para novos conteúdos

## 🛠️ Tecnologias

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **IA**: Google Gemini API
- **Icons**: Lucide React
- **Charts**: Recharts

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou pnpm
- Gemini API Key (obtenha em [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🚀 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/iaraelevare-source/BLOG-NEUROVENDAS.git
cd BLOG-NEUROVENDAS
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Edite o arquivo `.env.local` e adicione sua chave da API Gemini:
```env
GEMINI_API_KEY=sua-chave-api-aqui
VITE_GEMINI_API_KEY=sua-chave-api-aqui
```

### 4. Execute em modo de desenvolvimento
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### 5. Build para produção
```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

## 📁 Estrutura do Projeto

```
BLOG-NEUROVENDAS/
├── components/           # Componentes React reutilizáveis
│   └── Layout.tsx       # Layout principal com navegação
├── pages/               # Páginas da aplicação
│   ├── LandingPage.tsx     # Página inicial
│   ├── Dashboard.tsx       # Dashboard principal
│   ├── ArticleGenerator.tsx # Gerador de artigos IA
│   ├── HubView.tsx         # Hub central de artigos
│   ├── AutomationConfig.tsx # Configurações de autopilot
│   ├── YoutubeConverter.tsx # Conversor YouTube
│   ├── WebStoriesView.tsx  # Visualizador de Web Stories
│   └── ExploreExamples.tsx # Exemplos de sucesso
├── App.tsx              # Componente raiz
├── types.ts             # Definições TypeScript
├── constants.tsx        # Constantes da aplicação
├── index.css           # Estilos globais
├── index.tsx           # Entry point
└── vite.config.ts      # Configuração Vite
```

## 🔧 Configuração de Integrações

### WordPress
1. Instale o plugin REST API
2. Configure credenciais no Autopilot
3. Ative a publicação automática

### n8n (Automação)
1. Importe o workflow do arquivo `n8n-workflow.json`
2. Configure as credenciais (MongoDB, Google Sheets, OpenAI)
3. Ative os triggers automáticos

### Google Sheets
1. Crie uma planilha para logs
2. Compartilhe com a conta de serviço
3. Configure o ID no Autopilot

## 🎯 Tipos de Artigos Suportados

- **Procedimento**: Artigos sobre procedimentos estéticos específicos
- **Autoridade Clínica**: Conteúdo que estabelece expertise
- **Educativo**: Guias e tutoriais informativos
- **Gestão Estética**: Dicas de gestão de clínicas
- **Tendência de Beleza**: Novidades e tendências do mercado
- **Resenha de Produto**: Análises de produtos e equipamentos

## 📊 SEO e Otimização

O sistema automaticamente:
- Otimiza títulos e meta descriptions
- Adiciona palavras-chave estrategicamente
- Estrutura conteúdo com H2, H3
- Cria CTAs efetivos
- Calcula SEO Score

## 🔐 Segurança

- API Keys armazenadas em variáveis de ambiente
- Não commit de credenciais no repositório
- Validação de inputs do usuário
- Sanitização de conteúdo gerado

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é privado e proprietário.

## 📞 Suporte

Para questões e suporte:
- Email: iara.elevare@gmail.com
- Issues: [GitHub Issues](https://github.com/iaraelevare-source/BLOG-NEUROVENDAS/issues)

## 🎉 Funcionalidades Futuras

- [ ] Integração com mais plataformas (Shopify, Squarespace)
- [ ] Editor visual WYSIWYG
- [ ] Análise de concorrentes
- [ ] Sugestões automáticas de palavras-chave
- [ ] Geração de imagens com IA
- [ ] Tradução automática multi-idioma
- [ ] API pública para integrações
- [ ] App mobile (iOS/Android)

---

**Desenvolvido com ❤️ por Elevare Editorial AI**

*Transforme sua estratégia de conteúdo com o poder da IA*
