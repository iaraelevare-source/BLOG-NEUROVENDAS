import { getDb } from '../utils/db';
import { generations } from '../../drizzle/schema';

// Flag to control AI usage
const USE_MOCK_AI = process.env.USE_MOCK_AI !== 'false';

export interface GenerationRequest {
  userId: number;
  contentId?: number;
  promptId: number;
  variables: Record<string, string>;
}

export interface GenerationResult {
  id: number;
  content: string;
  tokensUsed: number;
  provider: string;
}

export class AIProviderService {
  static async generate(request: GenerationRequest): Promise<GenerationResult> {
    const startTime = Date.now();
    const db = getDb();

    try {
      let content: string;
      let tokensUsed: number;
      let provider: string;

      if (USE_MOCK_AI) {
        // Mock AI response
        const result = await this.generateMock(request);
        content = result.content;
        tokensUsed = result.tokensUsed;
        provider = 'mock';
      } else {
        // Real AI generation (to be implemented when USE_MOCK_AI = false)
        const result = await this.generateWithGemini(request);
        content = result.content;
        tokensUsed = result.tokensUsed;
        provider = 'gemini';
      }

      const executionTime = Date.now() - startTime;

      // Log generation
      const [genResult] = await db.insert(generations).values({
        userId: request.userId,
        contentId: request.contentId,
        promptId: request.promptId,
        promptVariables: JSON.stringify(request.variables),
        tokensEstimated: Math.floor(tokensUsed * 0.9), // Estimate
        tokensUsed,
        provider,
        status: 'success',
        executionTime,
      });

      return {
        id: genResult.insertId,
        content,
        tokensUsed,
        provider,
      };
    } catch (error: any) {
      const executionTime = Date.now() - startTime;

      // Log failed generation
      await db.insert(generations).values({
        userId: request.userId,
        contentId: request.contentId,
        promptId: request.promptId,
        promptVariables: JSON.stringify(request.variables),
        provider: USE_MOCK_AI ? 'mock' : 'gemini',
        status: 'error',
        errorMessage: error.message,
        executionTime,
      });

      throw error;
    }
  }

  private static async generateMock(request: GenerationRequest): Promise<{ content: string; tokensUsed: number }> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const keyword = request.variables.keyword || 'procedimento estético';
    const type = request.variables.type || 'artigo';

    const content = `
# ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}: Guia Completo

## Introdução

Este é um artigo gerado automaticamente sobre **${keyword}**. 

## O que é ${keyword}?

${keyword} é um tema relevante no mercado de estética e beleza. Este conteúdo foi criado para demonstrar a funcionalidade do sistema.

## Benefícios

1. **Resultado Natural**: Técnicas modernas garantem aparência harmoniosa
2. **Procedimento Seguro**: Realizado por profissionais qualificados
3. **Recuperação Rápida**: Processo minimamente invasivo

## Conclusão

Para mais informações sobre ${keyword}, consulte um profissional especializado.

---

*Artigo gerado em modo MOCK para desenvolvimento. Configure USE_MOCK_AI=false para usar IA real.*
    `.trim();

    // Simulate token usage (approximate)
    const tokensUsed = Math.floor(content.length / 4);

    return { content, tokensUsed };
  }

  private static async generateWithGemini(request: GenerationRequest): Promise<{ content: string; tokensUsed: number }> {
    // Real Gemini API integration
    // This will be activated when USE_MOCK_AI = false
    
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
      throw new Error('GEMINI_API_KEY not configured. Set USE_MOCK_AI=true or provide valid API key.');
    }

    // TODO: Implement using the new @google/genai SDK
    // The SDK has changed significantly. When ready to implement:
    // 1. Import GoogleGenAI
    // 2. Use ai.models.generateContent() or similar
    // 3. Update model name to current supported model
    
    throw new Error('Real Gemini API not yet implemented. Please use USE_MOCK_AI=true for now.');
  }

  static isUsingMockAI(): boolean {
    return USE_MOCK_AI;
  }
}
