/**
 * Lucresia Service Layer
 * 
 * Abstração para o sistema de decisão editorial estratégica Lucresia.
 * Atualmente usa Google Gemini como engine, mas preparado para
 * migração futura para API Lucresia dedicada.
 */

import { GoogleGenerativeAI } from '@google/genai';
import type { 
  NicheAnalysis, 
  EditorialRecommendation, 
  PillarSuggestion,
  CalendarSuggestion,
  ArticleIdea 
} from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

class LucresiaService {
  private ai: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    if (GEMINI_API_KEY) {
      this.ai = new GoogleGenerativeAI(GEMINI_API_KEY);
      this.model = this.ai.getGenerativeModel({ model: 'gemini-pro' });
    }
  }

  /**
   * Analisa o nicho da clínica e identifica oportunidades de autoridade
   */
  async analyzeNiche(clinicName: string, specialty: string): Promise<NicheAnalysis> {
    if (!this.model) {
      return this.getMockNicheAnalysis(specialty);
    }

    const prompt = `Você é Lucresia, um sistema de decisão editorial estratégica especializado em clínicas estéticas.

Analise o nicho de: ${clinicName} - Especialidade: ${specialty}

Forneça uma análise estratégica no seguinte formato JSON:

{
  "nicheInsights": {
    "mainOpportunities": ["oportunidade 1", "oportunidade 2", "oportunidade 3"],
    "competitiveLandscape": "análise breve da concorrência",
    "targetAudience": "descrição do público-alvo",
    "seasonalTrends": ["tendência 1", "tendência 2"]
  },
  "authorityScore": número de 0-100,
  "growthPotential": "alto" | "médio" | "baixo",
  "recommendedPillars": [
    {
      "name": "nome do pilar",
      "rationale": "por que este pilar é importante",
      "expectedImpact": "alto" | "médio" | "baixo",
      "keywords": ["palavra 1", "palavra 2", "palavra 3"]
    }
  ]
}

Seja estratégico e focado em construir autoridade, não volume.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON da resposta
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return this.getMockNicheAnalysis(specialty);
    } catch (error) {
      console.error('Erro ao analisar nicho:', error);
      return this.getMockNicheAnalysis(specialty);
    }
  }

  /**
   * Gera recomendações contextuais baseadas no estado atual
   */
  async getRecommendations(
    pillars: string[],
    articlesCount: number,
    specialty: string
  ): Promise<EditorialRecommendation[]> {
    if (!this.model) {
      return this.getMockRecommendations(pillars.length);
    }

    const prompt = `Você é Lucresia, sistema de decisão editorial estratégica.

Estado atual:
- Pilares definidos: ${pillars.length} (${pillars.join(', ')})
- Artigos criados: ${articlesCount}
- Especialidade: ${specialty}

Forneça 3 recomendações estratégicas no formato JSON:

{
  "recommendations": [
    {
      "id": "rec1",
      "priority": "alta" | "média" | "baixa",
      "category": "pilares" | "conteúdo" | "distribuição" | "otimização",
      "title": "título breve",
      "description": "descrição da recomendação",
      "actionable": true,
      "estimatedImpact": "descrição do impacto"
    }
  ]
}

Seja estratégico e focado em autoridade, não volume.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        return data.recommendations || [];
      }
      
      return this.getMockRecommendations(pillars.length);
    } catch (error) {
      console.error('Erro ao gerar recomendações:', error);
      return this.getMockRecommendations(pillars.length);
    }
  }

  /**
   * Sugere pilares de autoridade para o nicho
   */
  async suggestPillars(specialty: string, existingPillars: string[] = []): Promise<PillarSuggestion[]> {
    const specialtyPillars: Record<string, PillarSuggestion[]> = {
      'harmonização facial': [
        {
          name: 'Rejuvenescimento Natural',
          description: 'Técnicas modernas para resultados sutis e naturais',
          keywords: ['harmonização facial', 'preenchimento', 'botox'],
          expectedImpact: 'alto' as const
        },
        {
          name: 'Segurança em Procedimentos',
          description: 'Protocolos, certificações e cuidados pós-procedimento',
          keywords: ['segurança', 'protocolos', 'qualificação'],
          expectedImpact: 'alto' as const
        },
        {
          name: 'Saúde da Pele',
          description: 'Cuidados preventivos e tratamentos dermatológicos',
          keywords: ['skincare', 'tratamento', 'prevenção'],
          expectedImpact: 'médio' as const
        },
      ],
      'tratamentos corporais': [
        {
          name: 'Tecnologias Não-Invasivas',
          description: 'Equipamentos modernos para remodelagem corporal',
          keywords: ['criolipólise', 'radiofrequência', 'tecnologia'],
          expectedImpact: 'alto' as const
        },
        {
          name: 'Resultados Comprovados',
          description: 'Estudos de caso e transformações reais',
          keywords: ['antes e depois', 'resultados', 'casos reais'],
          expectedImpact: 'alto' as const
        },
      ],
      'dermatologia estética': [
        {
          name: 'Ciência da Pele',
          description: 'Base científica dos tratamentos dermatológicos',
          keywords: ['dermatologia', 'ciência', 'pesquisa'],
          expectedImpact: 'alto' as const
        },
        {
          name: 'Tratamentos Personalizados',
          description: 'Protocolos individualizados para cada tipo de pele',
          keywords: ['personalização', 'diagnóstico', 'individualizado'],
          expectedImpact: 'médio' as const
        },
      ],
    };

    const suggestions = specialtyPillars[specialty] || specialtyPillars['harmonização facial'];
    
    // Filtrar pilares já existentes
    return suggestions.filter(
      s => !existingPillars.some(
        p => p.toLowerCase().includes(s.name.toLowerCase()) || 
             s.name.toLowerCase().includes(p.toLowerCase())
      )
    );
  }

  /**
   * Gera sugestões de calendário editorial baseado nos pilares
   */
  async generateEditorialCalendar(
    pillars: string[],
    specialty: string,
    weeksAhead: number = 4
  ): Promise<CalendarSuggestion[]> {
    if (!this.model) {
      return this.getMockCalendarSuggestions(pillars, weeksAhead);
    }

    const prompt = `Você é Lucresia, sistema de decisão editorial estratégica.

Crie um calendário editorial estratégico para:
- Especialidade: ${specialty}
- Pilares: ${pillars.join(', ')}
- Período: ${weeksAhead} semanas

Forneça ${weeksAhead * 2} sugestões de artigos no formato JSON:

{
  "suggestions": [
    {
      "id": "cal1",
      "pillar": "nome do pilar",
      "title": "título do artigo",
      "type": "procedimento" | "autoridade_clinica" | "educativo" | "gestao_estetica" | "tendencia_beleza" | "resenha_produto",
      "priority": "alta" | "média" | "baixa",
      "estimatedWeek": número da semana (1-${weeksAhead}),
      "rationale": "por que este artigo é estratégico",
      "keywords": ["palavra 1", "palavra 2", "palavra 3"]
    }
  ]
}

Distribua artigos equilibradamente entre os pilares e semanas.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        return data.suggestions || [];
      }
      
      return this.getMockCalendarSuggestions(pillars, weeksAhead);
    } catch (error) {
      console.error('Erro ao gerar calendário:', error);
      return this.getMockCalendarSuggestions(pillars, weeksAhead);
    }
  }

  /**
   * Gera ideias de artigos para um pilar específico
   */
  async generateArticleIdeas(pillar: string, specialty: string, count: number = 5): Promise<ArticleIdea[]> {
    if (!this.model) {
      return this.getMockArticleIdeas(pillar, count);
    }

    const prompt = `Você é Lucresia, sistema de decisão editorial estratégica.

Gere ${count} ideias de artigos de autoridade para:
- Pilar: ${pillar}
- Especialidade: ${specialty}

Formato JSON:

{
  "ideas": [
    {
      "title": "título do artigo",
      "type": "procedimento" | "autoridade_clinica" | "educativo" | "gestao_estetica" | "tendencia_beleza" | "resenha_produto",
      "description": "breve descrição do artigo",
      "keywords": ["palavra 1", "palavra 2", "palavra 3"],
      "estimatedImpact": "alto" | "médio" | "baixo",
      "difficulty": "fácil" | "médio" | "avançado"
    }
  ]
}

Foque em conteúdo que constrói autoridade, não volume.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        return data.ideas || [];
      }
      
      return this.getMockArticleIdeas(pillar, count);
    } catch (error) {
      console.error('Erro ao gerar ideias:', error);
      return this.getMockArticleIdeas(pillar, count);
    }
  }

  // Mock methods para quando API não está disponível
  private getMockNicheAnalysis(specialty: string): NicheAnalysis {
    return {
      nicheInsights: {
        mainOpportunities: [
          `Crescente demanda por ${specialty} com foco em resultados naturais`,
          'Público busca profissionais qualificados e transparentes',
          'Oportunidade de educar sobre segurança e qualidade'
        ],
        competitiveLandscape: 'Mercado competitivo mas com espaço para diferenciação via autoridade e educação',
        targetAudience: 'Mulheres 28-45 anos, classe A/B, buscam procedimentos seguros e naturais',
        seasonalTrends: ['Aumento de interesse antes do verão', 'Picos em eventos sociais']
      },
      authorityScore: 0,
      growthPotential: 'alto',
      recommendedPillars: [
        {
          name: 'Segurança em Procedimentos',
          rationale: 'Diferencial competitivo e preocupação #1 do público',
          expectedImpact: 'alto',
          keywords: ['segurança', 'protocolos', 'qualificação']
        },
        {
          name: 'Resultados Naturais',
          rationale: 'Tendência principal do mercado atual',
          expectedImpact: 'alto',
          keywords: ['natural', 'harmonização', 'sutil']
        },
        {
          name: 'Educação do Paciente',
          rationale: 'Constrói confiança e autoridade',
          expectedImpact: 'médio',
          keywords: ['educação', 'informação', 'transparência']
        }
      ]
    };
  }

  private getMockRecommendations(pillarCount: number): EditorialRecommendation[] {
    if (pillarCount === 0) {
      return [
        {
          id: 'rec1',
          priority: 'alta',
          category: 'pilares',
          title: 'Configure seus pilares de autoridade',
          description: 'Defina 3-5 pilares estratégicos no Hub Central para começar sua estratégia editorial',
          actionable: true,
          estimatedImpact: 'Permite criar conteúdo estratégico e focado'
        }
      ];
    }

    if (pillarCount < 3) {
      return [
        {
          id: 'rec2',
          priority: 'alta',
          category: 'pilares',
          title: `Adicione mais ${3 - pillarCount} pilares`,
          description: 'Complete sua base estratégica com 3-5 pilares para cobrir os principais temas do seu nicho',
          actionable: true,
          estimatedImpact: 'Base editorial robusta e diversificada'
        }
      ];
    }

    return [
      {
        id: 'rec3',
        priority: 'alta',
        category: 'conteúdo',
        title: 'Crie seu primeiro artigo de autoridade',
        description: 'Comece com um artigo educativo em seu pilar mais forte para estabelecer credibilidade',
        actionable: true,
        estimatedImpact: 'Primeiras visualizações e engajamento orgânico'
      },
      {
        id: 'rec4',
        priority: 'média',
        category: 'distribuição',
        title: 'Configure distribuição multi-canal',
        description: 'Adapte seu conteúdo para Pinterest e LinkedIn para ampliar alcance',
        actionable: true,
        estimatedImpact: 'Aumento de 3-5x no alcance orgânico'
      }
    ];
  }

  private getMockCalendarSuggestions(pillars: string[], weeks: number): CalendarSuggestion[] {
    const suggestions: CalendarSuggestion[] = [];
    let id = 1;

    pillars.forEach((pillar, index) => {
      const articlesPerPillar = Math.ceil((weeks * 2) / pillars.length);
      
      for (let i = 0; i < articlesPerPillar && id <= weeks * 2; i++) {
        suggestions.push({
          id: `cal${id}`,
          pillar,
          title: `${pillar}: Artigo estratégico ${i + 1}`,
          type: i % 2 === 0 ? 'autoridade_clinica' : 'educativo',
          priority: i === 0 ? 'alta' : 'média',
          estimatedWeek: Math.ceil(id / 2),
          rationale: `Conteúdo fundamental para estabelecer autoridade em ${pillar}`,
          keywords: [`${pillar.toLowerCase()}`, 'autoridade', 'expertise']
        });
        id++;
      }
    });

    return suggestions.slice(0, weeks * 2);
  }

  private getMockArticleIdeas(pillar: string, count: number): ArticleIdea[] {
    const ideas: ArticleIdea[] = [];
    
    for (let i = 1; i <= count; i++) {
      ideas.push({
        title: `${pillar}: Guia Completo ${i}`,
        type: i % 3 === 0 ? 'procedimento' : i % 3 === 1 ? 'autoridade_clinica' : 'educativo',
        description: `Artigo estratégico sobre ${pillar} focado em educar e construir autoridade`,
        keywords: [pillar.toLowerCase(), 'guia', 'expertise'],
        estimatedImpact: i <= 2 ? 'alto' : 'médio',
        difficulty: i === 1 ? 'fácil' : i <= 3 ? 'médio' : 'avançado'
      });
    }

    return ideas;
  }
}

// Singleton instance
export const lucresiaService = new LucresiaService();
export default lucresiaService;
