/**
 * Article Generation Service
 * 
 * Handles REAL article generation using Google Gemini API.
 * Generates SEO-optimized content with strategic structure.
 */

import { GoogleGenAI } from '@google/genai';
import type { ArticleType } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export interface GeneratedArticle {
  title: string;
  content: string;
  wordCount: number;
  seoScore: number;
  keywords: string[];
  generatedAt: Date;
}

export interface ArticleGenerationOptions {
  topic: string;
  pillar: string;
  articleType: ArticleType | string;
  specialty?: string;
  targetWordCount?: number;
}

class ArticleGenerationService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (GEMINI_API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    }
  }

  /**
   * Generates a professional, SEO-optimized article
   */
  async generateArticle(options: ArticleGenerationOptions): Promise<GeneratedArticle> {
    if (!this.ai) {
      throw new Error('Serviço de geração não configurado. Adicione sua chave API no arquivo .env.local');
    }

    const { topic, pillar, articleType, specialty = 'estética', targetWordCount = 1000 } = options;

    const prompt = this.buildPrompt(topic, pillar, articleType, specialty, targetWordCount);

    try {
      const result = await this.ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
      });

      const text = result.text || '';

      // Extract content and metadata
      const content = this.cleanMarkdown(text);
      const wordCount = this.countWords(content);
      const keywords = this.extractKeywords(content, pillar, topic);
      const seoScore = this.calculateSEOScore(content, keywords);

      return {
        title: this.extractTitle(content) || topic,
        content,
        wordCount,
        seoScore,
        keywords,
        generatedAt: new Date()
      };
    } catch (error: any) {
      console.error('Erro ao gerar artigo:', error);
      throw new Error(`Falha na geração: ${error.message || 'Erro desconhecido'}`);
    }
  }

  /**
   * Builds the generation prompt based on article type and context
   */
  private buildPrompt(
    topic: string, 
    pillar: string, 
    articleType: ArticleType | string, 
    specialty: string,
    targetWordCount: number
  ): string {
    const articleTypeGuidelines = this.getArticleTypeGuidelines(articleType);

    return `Você é um escritor especializado em conteúdo de autoridade para o setor de ${specialty}.

Escreva um artigo completo e profissional com as seguintes especificações:

**TEMA:** ${topic}
**PILAR ESTRATÉGICO:** ${pillar}
**TIPO DE ARTIGO:** ${articleType}
**EXTENSÃO ALVO:** ${targetWordCount} palavras

**ESTRUTURA OBRIGATÓRIA:**

# ${topic}

## Introdução
[2 parágrafos introdutórios claros e objetivos que contextualizam o tema e prendem a atenção do leitor]

## [Seção 1 - H2 relevante]
[Conteúdo denso e informativo com 2-3 parágrafos]

## [Seção 2 - H2 relevante]
[Conteúdo denso e informativo com 2-3 parágrafos]

## [Seção 3 - H2 relevante]
[Conteúdo denso e informativo com 2-3 parágrafos]

## [Seção 4 - H2 relevante - opcional]
[Conteúdo adicional se necessário para alcançar a extensão alvo]

## Conclusão
[1-2 parágrafos que resumem os pontos principais e incluem um CTA sutil e profissional]

**DIRETRIZES DE CONTEÚDO:**

${articleTypeGuidelines}

**DIRETRIZES DE ESTILO:**
- Tom profissional, educativo e acessível
- Linguagem clara, evitando jargões desnecessários
- Informações precisas e baseadas em evidências
- Parágrafos curtos (2-4 linhas) para facilitar leitura
- Uso estratégico de listas quando apropriado
- Sem promessas exageradas ou linguagem sensacionalista
- Foco em educar e construir autoridade, não em vender

**OTIMIZAÇÃO SEO:**
- Inclua variações naturais do termo "${topic}" ao longo do texto
- Use sinônimos e termos relacionados
- Estrutura clara com headings (H2, H3)
- Meta descrição implícita nos primeiros 2 parágrafos

Gere APENAS o conteúdo do artigo em Markdown. Não inclua metadados ou comentários adicionais.`;
  }

  /**
   * Returns specific guidelines based on article type
   */
  private getArticleTypeGuidelines(articleType: ArticleType | string): string {
    const guidelines: Record<string, string> = {
      'procedimento': `- Explique detalhadamente o procedimento, passo a passo
- Inclua indicações, contraindicações e cuidados
- Mencione tempo de recuperação e resultados esperados
- Use linguagem técnica mas acessível`,

      'autoridade_clinica': `- Demonstre expertise e conhecimento profundo
- Cite estudos ou evidências quando relevante (sem referências explícitas)
- Posicione a clínica como autoridade no tema
- Foco em educação de alto nível`,

      'educativo': `- Linguagem didática e acessível
- Desmistifique conceitos complexos
- Use exemplos práticos
- Inclua perguntas e respostas comuns`,

      'gestao_estetica': `- Foco em gestão, negócios ou aspectos práticos
- Dicas acionáveis para profissionais
- Tendências e melhores práticas do setor
- Tom consultivo e profissional`,

      'tendencia_beleza': `- Explore tendências atuais e emergentes
- Contextualize historicamente se relevante
- Mencione o que está em alta e por quê
- Tom atual e dinâmico`,

      'resenha_produto': `- Análise honesta e equilibrada
- Pontos fortes e limitações
- Para quem é indicado
- Comparação contextual (sem mencionar marcas específicas concorrentes)`
    };

    return guidelines[articleType] || guidelines['educativo'];
  }

  /**
   * Cleans and formats the generated markdown
   */
  private cleanMarkdown(text: string): string {
    // Remove markdown code blocks if present
    let cleaned = text.replace(/```markdown\n?/g, '').replace(/```\n?/g, '');
    
    // Ensure proper spacing
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    
    // Trim
    cleaned = cleaned.trim();
    
    return cleaned;
  }

  /**
   * Extracts title from content (first H1)
   */
  private extractTitle(content: string): string | null {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : null;
  }

  /**
   * Counts words in content
   */
  private countWords(content: string): number {
    // Remove markdown syntax
    const plainText = content
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/`/g, '');
    
    const words = plainText
      .split(/\s+/)
      .filter(word => word.length > 0);
    
    return words.length;
  }

  /**
   * Extracts relevant keywords from content
   */
  private extractKeywords(content: string, pillar: string, topic: string): string[] {
    const keywords: string[] = [];
    
    // Add pillar and topic as primary keywords
    keywords.push(pillar.toLowerCase());
    keywords.push(topic.toLowerCase());
    
    // Extract H2 headings as keywords
    const h2Matches = content.match(/^##\s+(.+)$/gm);
    if (h2Matches) {
      h2Matches.forEach(match => {
        const keyword = match.replace(/^##\s+/, '').trim().toLowerCase();
        if (keyword && !keywords.includes(keyword)) {
          keywords.push(keyword);
        }
      });
    }
    
    // Limit to 5-7 most relevant keywords
    return keywords.slice(0, 7);
  }

  /**
   * Calculates SEO score based on content quality indicators
   */
  private calculateSEOScore(content: string, keywords: string[]): number {
    let score = 50; // Base score
    
    // Check word count (optimal 800-1500 words)
    const wordCount = this.countWords(content);
    if (wordCount >= 800 && wordCount <= 1500) {
      score += 15;
    } else if (wordCount >= 600 && wordCount <= 2000) {
      score += 10;
    } else if (wordCount >= 400) {
      score += 5;
    }
    
    // Check heading structure
    const h1Count = (content.match(/^#\s/gm) || []).length;
    const h2Count = (content.match(/^##\s/gm) || []).length;
    if (h1Count === 1 && h2Count >= 3 && h2Count <= 6) {
      score += 15;
    } else if (h1Count === 1 && h2Count >= 2) {
      score += 10;
    }
    
    // Check keyword presence
    const contentLower = content.toLowerCase();
    const keywordMatches = keywords.filter(kw => 
      contentLower.includes(kw.toLowerCase())
    ).length;
    score += Math.min(keywordMatches * 3, 15);
    
    // Check readability (paragraph count)
    const paragraphCount = content.split(/\n\n+/).length;
    if (paragraphCount >= 8 && paragraphCount <= 20) {
      score += 5;
    }
    
    return Math.min(score, 100);
  }

  /**
   * Checks if API is configured and ready
   */
  isConfigured(): boolean {
    return this.ai !== null;
  }

  /**
   * Gets configuration status message
   */
  getConfigStatus(): { configured: boolean; message: string } {
    if (this.isConfigured()) {
      return {
        configured: true,
        message: 'Serviço de geração configurado e pronto para uso'
      };
    }
    
    return {
      configured: false,
      message: 'Configure sua chave API do Google Gemini no arquivo .env.local para gerar artigos reais'
    };
  }
}

// Export singleton instance
const articleGenerationService = new ArticleGenerationService();
export default articleGenerationService;
