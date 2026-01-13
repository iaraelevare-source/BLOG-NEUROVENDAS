import { getDb } from '../server/utils/db';
import { savedPrompts } from './schema';

const defaultPrompts = [
  {
    name: 'Post de Autoridade - Estética',
    description: 'Prompt otimizado para criar posts de autoridade sobre procedimentos estéticos',
    promptTemplate: `Você é um especialista em marketing de conteúdo para clínicas de estética e beleza.

Crie um artigo completo, profissional e otimizado para SEO sobre: {{keyword}}

REQUISITOS:
- Título atraente e otimizado para SEO
- Introdução envolvente que desperte interesse
- Conteúdo estruturado em seções com subtítulos (H2, H3)
- Linguagem profissional mas acessível
- Foco em benefícios e resultados
- Incluir informações técnicas relevantes
- Seção sobre "O que esperar do procedimento"
- Seção sobre "Cuidados pós-procedimento"
- Conclusão com call-to-action
- Mínimo de 800 palavras

ESTILO:
- Tom: Profissional, confiável, educativo
- Perspectiva: Clínica especializada
- Objetivo: Educar e converter leitores em leads qualificados

Tipo de conteúdo: {{type}}

Crie o artigo completo em formato Markdown.`,
    type: 'autoridade_clinica',
    version: 1,
  },
  {
    name: 'Artigo SEO Universal',
    description: 'Prompt universal para artigos otimizados para SEO',
    promptTemplate: `Crie um artigo completo e otimizado para SEO sobre: {{keyword}}

ESTRUTURA:
1. Título principal (H1) - incluir palavra-chave
2. Introdução (2-3 parágrafos)
3. Corpo do artigo:
   - Mínimo 4 seções com H2
   - Cada seção com 2-3 parágrafos
   - Usar H3 para sub-tópicos quando necessário
4. Conclusão (2 parágrafos + CTA)

OTIMIZAÇÃO SEO:
- Usar palavra-chave naturalmente no texto
- Incluir variações da palavra-chave
- Parágrafos curtos e escaneáveis
- Listas quando apropriado
- Linguagem clara e objetiva

FORMATO: Markdown

Tamanho mínimo: 1000 palavras`,
    type: 'artigo',
    version: 1,
  },
  {
    name: 'Procedimento Técnico',
    description: 'Artigo técnico detalhado sobre procedimentos estéticos',
    promptTemplate: `Como especialista em {{keyword}}, crie um guia técnico completo.

TÓPICOS OBRIGATÓRIOS:
1. O que é {{keyword}}
2. Indicações e contraindicações
3. Como funciona o procedimento
4. Técnicas utilizadas
5. Resultados esperados e duração
6. Cuidados pré e pós-procedimento
7. Possíveis efeitos colaterais
8. Perguntas frequentes

ESTILO:
- Linguagem técnica mas compreensível
- Dados científicos quando relevante
- Foco em segurança e eficácia
- Tom profissional e confiável

Formato: Markdown
Tamanho: 1200-1500 palavras`,
    type: 'procedimento',
    version: 1,
  },
  {
    name: 'Conteúdo Educativo',
    description: 'Artigo educativo para engajamento e autoridade',
    promptTemplate: `Crie um conteúdo educativo envolvente sobre: {{keyword}}

OBJETIVO: Educar o público sobre o tema de forma acessível

ESTRUTURA:
- Introdução que contextualize o tema
- Explicação clara e didática
- Exemplos práticos
- Dicas acionáveis
- Mitos vs. Verdades (se aplicável)
- Conclusão motivadora

CARACTERÍSTICAS:
- Tom conversacional mas profissional
- Evitar jargões técnicos excessivos
- Incluir analogias quando útil
- Foco em empoderar o leitor com conhecimento

Formato: Markdown
Tamanho: 800-1000 palavras`,
    type: 'educativo',
    version: 1,
  },
];

export async function seedPrompts() {
  const db = getDb();

  console.log('🌱 Seeding default prompts...');

  for (const prompt of defaultPrompts) {
    try {
      await db.insert(savedPrompts).values(prompt);
      console.log(`✅ Created prompt: ${prompt.name}`);
    } catch (error) {
      console.log(`⚠️  Prompt may already exist: ${prompt.name}`);
    }
  }

  console.log('✨ Prompts seeding completed!');
}

// Run if called directly
if (require.main === module) {
  seedPrompts()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error seeding prompts:', error);
      process.exit(1);
    });
}
