# 🤖 Sistema de Publicação Automática WordPress

Sistema completo para publicação automatizada de posts no WordPress com otimização SEO, validação de calendário editorial e controle de identidade de marca.

## 📋 Características

### ✅ Funcionalidades Implementadas

1. **Criação de Posts WordPress**
   - Títulos otimizados para SEO
   - Texto formatado automaticamente (H2, H3, listas)
   - Slugs amigáveis e limpos
   - Categorias automáticas
   - Excerpts (resumos) gerados automaticamente

2. **Agendamento de Publicações**
   - Publicação imediata ou agendada
   - Validação de calendário editorial
   - Controle de limite de posts por dia/semana

3. **CTA (Call-to-Action)**
   - Inserção automática de CTA ao final
   - Suporte para CTA personalizado

4. **Linguagem Profissional**
   - Validação de tom profissional
   - Checagem de palavras proibidas
   - Manutenção de identidade de marca

5. **SEO Otimizado**
   - Score SEO automático (0-100)
   - Análise de densidade de palavras-chave
   - Otimização de títulos e meta descrições
   - Feedback detalhado para melhorias

## 🚀 Como Usar

### 1. Configuração Inicial

Crie um arquivo `.env.local` na raiz do projeto com suas credenciais WordPress:

```env
WORDPRESS_SITE_URL=https://seusite.com.br
WORDPRESS_USERNAME=seu_usuario
WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

**Como gerar Application Password no WordPress:**
1. Vá para Usuários > Perfil
2. Role até "Senhas de Aplicativo"
3. Digite um nome (ex: "AutoBlog AI")
4. Clique em "Adicionar Nova Senha de Aplicativo"
5. Copie a senha gerada (formato: xxxx xxxx xxxx xxxx)

### 2. Uso Básico (Código)

```typescript
import { WordPressPublisher } from './services/wordpressPublisher';
import { defaultEditorialCalendar, defaultBrandGuidelines } from './config/publisherConfig';

// Configurar o publisher
const publisher = new WordPressPublisher({
  wordpress: {
    siteUrl: 'https://seusite.com.br',
    username: 'seu_usuario',
    applicationPassword: 'xxxx xxxx xxxx xxxx',
  },
  calendar: defaultEditorialCalendar,
  brandGuidelines: defaultBrandGuidelines,
});

// Publicar um post
const result = await publisher.publishPost({
  theme: 'Benefícios da Criomodelagem para Redução de Medidas',
  mainKeyword: 'criomodelagem',
  content: `
## O que é Criomodelagem?

A criomodelagem é um tratamento estético não invasivo que utiliza o frio para reduzir medidas e melhorar o contorno corporal.

## Principais Benefícios

* Redução de gordura localizada
* Melhora da circulação sanguínea
* Tonificação da pele
* Resultados visíveis em poucas sessões

### Como Funciona

O procedimento aplica temperaturas baixas controladas nas áreas de tratamento, estimulando a lipólise (quebra de gordura) e melhorando a aparência da pele.

## Resultados Esperados

Com um protocolo adequado de sessões, é possível observar redução de medidas significativa e melhora na textura da pele.
  `,
  publishDate: '2026-01-20T10:00:00',
  category: 'Estética Corporal',
});

if (result.success) {
  console.log('Post publicado:', result.postUrl);
  console.log('SEO Score:', result.seoScore);
} else {
  console.error('Erro:', result.errors);
}
```

### 3. Uso via Interface (React)

```typescript
import WordPressPublisherPage from './pages/WordPressPublisher';
import { defaultEditorialCalendar, defaultBrandGuidelines } from './config/publisherConfig';

function App() {
  const config = {
    wordpress: {
      siteUrl: process.env.WORDPRESS_SITE_URL!,
      username: process.env.WORDPRESS_USERNAME!,
      applicationPassword: process.env.WORDPRESS_APP_PASSWORD!,
    },
    calendar: defaultEditorialCalendar,
    brandGuidelines: defaultBrandGuidelines,
  };

  return <WordPressPublisherPage config={config} />;
}
```

## 📝 Formato do Conteúdo

O sistema suporta formatação tipo Markdown que é convertida automaticamente para HTML:

### Títulos
```
## Título H2
### Título H3
#### Título H4
```

### Listas
```
* Item 1
* Item 2
- Item 3
- Item 4

1. Item numerado 1
2. Item numerado 2
```

### Ênfases
```
**texto em negrito**
*texto em itálico*
```

## 🎯 Validações Implementadas

### Entrada Obrigatória
- ✅ Tema (3-200 caracteres)
- ✅ Palavra-chave principal (2-100 caracteres)
- ✅ Texto do post (mínimo 50 palavras)
- ✅ Data de publicação (formato ISO 8601)

### Calendário Editorial
- ✅ Data não pode estar no passado
- ✅ Data não pode estar em blacklist
- ✅ Verifica limite de posts por dia
- ✅ Verifica limite de posts por semana
- ✅ Opcionalmente verifica whitelist de datas aprovadas

### Identidade de Marca
- ✅ Bloqueia palavras proibidas
- ✅ Valida tom profissional
- ✅ Evita linguagem casual
- ✅ Previne menções a concorrentes

### SEO
- ✅ Título otimizado (30-60 caracteres)
- ✅ Palavra-chave no título
- ✅ Palavra-chave no slug
- ✅ Densidade de palavra-chave adequada (0.5-2.5%)
- ✅ Uso de headings (H2, H3)
- ✅ Conteúdo com mínimo de 300 palavras

## 🔒 Segurança

### ⚠️ AVISO IMPORTANTE DE SEGURANÇA

**A sanitização de HTML implementada é BÁSICA e adequada apenas para ambientes controlados.**

Para uso em PRODUÇÃO com conteúdo não confiável, você DEVE substituir a função `sanitizeHtml` por uma biblioteca robusta como:

```bash
npm install dompurify
npm install @types/dompurify --save-dev
```

```typescript
import DOMPurify from 'dompurify';

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href', 'class', 'id'],
  });
}
```

**Por que DOMPurify é necessário:**
- Protege contra mXSS (mutation XSS)
- Lida com Unicode tricks e HTML entities
- Detecta contextos perigosos automaticamente
- Mantido ativamente com atualizações de segurança
- Testado contra milhares de vetores XSS conhecidos

### Sanitização Atual (Básica)
- ✅ Remoção de scripts maliciosos
- ✅ Bloqueio de event handlers
- ✅ Remoção de iframes não autorizados
- ✅ Proteção básica contra XSS
- ⚠️ NÃO protege contra todos os vetores XSS avançados

### Autenticação
- ✅ Usa WordPress Application Passwords (OAuth 2.0)
- ✅ Não armazena senhas em texto plano
- ✅ Credenciais via variáveis de ambiente
- ✅ Validação de formato de credenciais

## 📊 Score SEO

O sistema calcula automaticamente um score de 0-100 baseado em:

| Critério | Peso | Descrição |
|----------|------|-----------|
| Título otimizado | 15 | Tamanho e keyword |
| Slug otimizado | 10 | Keyword no slug |
| Conteúdo suficiente | 20 | Mínimo 300 palavras |
| Densidade de keyword | 15 | 0.5-2.5% ideal |
| Uso de headings | 10 | Estrutura H2/H3 |
| Outros | 30 | Metadados, links, etc |

### Interpretação do Score
- 🟢 **80-100**: Excelente - Pronto para publicar
- 🟡 **60-79**: Bom - Pequenos ajustes recomendados
- 🔴 **0-59**: Precisa melhorias - Revisar conteúdo

## 🛠️ Personalização

### Calendário Editorial

Edite `config/publisherConfig.ts`:

```typescript
export const defaultEditorialCalendar: EditorialCalendar = {
  approvedDates: [
    '2026-01-15',
    '2026-01-20',
    '2026-01-25',
  ],
  blacklistDates: [
    '2026-12-25', // Natal
    '2026-01-01', // Ano Novo
  ],
  maxPostsPerDay: 3,
  maxPostsPerWeek: 15,
};
```

### Diretrizes de Marca

```typescript
export const defaultBrandGuidelines: BrandGuidelines = {
  allowedTones: ['professional', 'educational', 'persuasive'],
  forbiddenWords: [
    'milagre',
    'garantido',
    'certeza absoluta',
  ],
  brandVoice: {
    formal: true,
    technical: true,
    friendly: true,
  },
};
```

### CTA Personalizado

```typescript
const customCTA = `
<div class="meu-cta">
  <h3>Agende sua consulta!</h3>
  <a href="/contato">Entrar em contato</a>
</div>
`;

await publisher.publishPost({
  ...postData,
  cta: customCTA,
});
```

## 🧪 Pré-visualização (Dry Run)

Antes de publicar, você pode validar e visualizar:

```typescript
const preview = await publisher.previewPost({
  theme: 'Meu Título',
  mainKeyword: 'keyword',
  content: 'Conteúdo...',
  publishDate: '2026-01-20T10:00:00',
});

console.log('Título:', preview.title);
console.log('Slug:', preview.slug);
console.log('SEO Score:', preview.seoScore);
console.log('Erros:', preview.validationErrors);
```

## 📦 Estrutura de Arquivos

```
.
├── services/
│   ├── wordpressApi.ts         # Cliente WordPress REST API
│   └── wordpressPublisher.ts   # Serviço principal de publicação
├── utils/
│   ├── seoUtils.ts              # Funções de otimização SEO
│   └── validationUtils.ts       # Validadores e regras
├── config/
│   └── publisherConfig.ts       # Configurações padrão
├── pages/
│   └── WordPressPublisher.tsx   # Interface React
└── WORDPRESS_PUBLISHER.md       # Este arquivo
```

## 🔍 Troubleshooting

### Erro: "WordPress API Error: Forbidden"
- Verifique se o Application Password está correto
- Confirme que o usuário tem permissão de publicação

### Erro: "Data não está no calendário editorial aprovado"
- Adicione a data em `approvedDates` ou deixe vazio para permitir todas

### Score SEO baixo
- Aumente o tamanho do conteúdo (mínimo 300 palavras)
- Use a palavra-chave naturalmente no texto
- Adicione headings (H2, H3)
- Otimize o título (30-60 caracteres)

## 📚 Referências

- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Application Passwords](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)
- [SEO Best Practices](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

## 🤝 Contribuindo

Para adicionar novas funcionalidades:

1. **Novos validadores**: Adicione em `utils/validationUtils.ts`
2. **Novas otimizações SEO**: Adicione em `utils/seoUtils.ts`
3. **Novos endpoints WordPress**: Estenda `services/wordpressApi.ts`

## 📄 Licença

Este projeto faz parte do sistema AutoBlog AI - NeuroVendas.
