/**
 * Analytics Service - Fase 5
 * 
 * Serviço de métricas e análise de performance para dashboard em tempo real.
 * Calcula autoridade, progresso, engajamento e fornece alertas estratégicos.
 */

// Tipos de métricas
export interface ArticleMetrics {
  id: string;
  title: string;
  pillar: string;
  publishedDate: Date;
  views: number;
  engagement: number; // 0-100
  seoScore: number; // 0-100
  authorityContribution: number; // Quanto contribui para autoridade geral
}

export interface PillarMetrics {
  name: string;
  articlesCount: number;
  totalViews: number;
  avgEngagement: number;
  authorityScore: number; // 0-100
  trend: 'ascending' | 'stable' | 'descending';
  lastArticleDate: Date | null;
  recommendedFrequency: 'semanal' | 'quinzenal' | 'mensal';
}

export interface DashboardMetrics {
  overview: {
    totalArticles: number;
    totalViews: number;
    avgEngagement: number;
    authorityRate: number; // 0-100
    growthRate: number; // % change último período
  };
  pillars: PillarMetrics[];
  articles: ArticleMetrics[];
  alerts: StrategyAlert[];
  recommendations: string[];
}

export interface StrategyAlert {
  id: string;
  type: 'warning' | 'success' | 'info' | 'urgent';
  title: string;
  description: string;
  action: string;
  priority: 'alta' | 'média' | 'baixa';
  createdAt: Date;
}

/**
 * Singleton Analytics Service
 */
class AnalyticsService {
  private static instance: AnalyticsService;
  
  // Mock data storage (em produção seria banco de dados)
  private articles: ArticleMetrics[] = [];
  
  private constructor() {
    // Initialize with mock data for demonstration
    this.initializeMockData();
  }
  
  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }
  
  /**
   * Initialize com dados de demonstração
   */
  private initializeMockData(): void {
    // Simula artigos já publicados para demonstração
    const mockPillars = [
      'Harmonização Facial',
      'Tratamentos Corporais',
      'Saúde da Pele'
    ];
    
    const now = new Date();
    const daysAgo = (days: number) => {
      const date = new Date(now);
      date.setDate(date.getDate() - days);
      return date;
    };
    
    this.articles = [
      {
        id: '1',
        title: 'Guia Completo de Harmonização Facial Natural',
        pillar: mockPillars[0],
        publishedDate: daysAgo(21),
        views: 1250,
        engagement: 68,
        seoScore: 85,
        authorityContribution: 15
      },
      {
        id: '2',
        title: 'Antes e Depois: Resultados Reais de Harmonização',
        pillar: mockPillars[0],
        publishedDate: daysAgo(14),
        views: 890,
        engagement: 72,
        seoScore: 78,
        authorityContribution: 12
      },
      {
        id: '3',
        title: 'Tratamento Corporal: Qual é o Ideal para Você?',
        pillar: mockPillars[1],
        publishedDate: daysAgo(10),
        views: 560,
        engagement: 55,
        seoScore: 72,
        authorityContribution: 8
      },
      {
        id: '4',
        title: 'Rotina de Skincare Profissional para Clínicas',
        pillar: mockPillars[2],
        publishedDate: daysAgo(5),
        views: 320,
        engagement: 48,
        seoScore: 80,
        authorityContribution: 6
      },
      {
        id: '5',
        title: 'Segurança em Procedimentos Estéticos: O que Pacientes Devem Saber',
        pillar: mockPillars[0],
        publishedDate: daysAgo(3),
        views: 180,
        engagement: 52,
        seoScore: 88,
        authorityContribution: 4
      }
    ];
  }
  
  /**
   * Adiciona novo artigo (chamado após publicação)
   */
  public trackArticle(article: Omit<ArticleMetrics, 'id' | 'views' | 'engagement'>): void {
    this.articles.push({
      ...article,
      id: Date.now().toString(),
      views: 0,
      engagement: 0
    });
  }
  
  /**
   * Calcula métricas de um pilar específico
   */
  public calculatePillarMetrics(pillarName: string): PillarMetrics | null {
    const pillarArticles = this.articles.filter(a => a.pillar === pillarName);
    
    if (pillarArticles.length === 0) {
      return {
        name: pillarName,
        articlesCount: 0,
        totalViews: 0,
        avgEngagement: 0,
        authorityScore: 0,
        trend: 'stable',
        lastArticleDate: null,
        recommendedFrequency: 'semanal'
      };
    }
    
    const totalViews = pillarArticles.reduce((sum, a) => sum + a.views, 0);
    const avgEngagement = pillarArticles.reduce((sum, a) => sum + a.engagement, 0) / pillarArticles.length;
    const avgSEO = pillarArticles.reduce((sum, a) => sum + a.seoScore, 0) / pillarArticles.length;
    
    // Authority score combina: quantidade artigos, engajamento, SEO
    const authorityScore = Math.min(100, 
      (pillarArticles.length * 15) + // Max 5 artigos = 75 pontos
      (avgEngagement * 0.15) + // Max engagement contribui 15 pontos
      (avgSEO * 0.1) // Max SEO contribui 10 pontos
    );
    
    // Determina trend baseado em artigos recentes
    const recentArticles = pillarArticles.filter(a => {
      const daysSince = (Date.now() - a.publishedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 14;
    });
    
    const trend = recentArticles.length >= 2 ? 'ascending' : 
                  recentArticles.length === 1 ? 'stable' : 'descending';
    
    const sortedByDate = [...pillarArticles].sort((a, b) => 
      b.publishedDate.getTime() - a.publishedDate.getTime()
    );
    
    return {
      name: pillarName,
      articlesCount: pillarArticles.length,
      totalViews,
      avgEngagement: Math.round(avgEngagement),
      authorityScore: Math.round(authorityScore),
      trend,
      lastArticleDate: sortedByDate[0]?.publishedDate || null,
      recommendedFrequency: pillarArticles.length < 3 ? 'semanal' : 'quinzenal'
    };
  }
  
  /**
   * Calcula taxa de autoridade geral
   */
  public calculateAuthorityRate(pillars: string[]): number {
    if (pillars.length === 0) return 0;
    
    const pillarMetrics = pillars.map(p => this.calculatePillarMetrics(p)).filter(Boolean) as PillarMetrics[];
    
    if (pillarMetrics.length === 0) return 0;
    
    const avgPillarScore = pillarMetrics.reduce((sum, p) => sum + p.authorityScore, 0) / pillarMetrics.length;
    const pillarCoverage = (pillars.length / 5) * 100; // 5 pilares é ideal
    const articlesPerPillar = this.articles.length / pillars.length;
    
    // Fórmula: 50% score pilares + 30% cobertura + 20% densidade
    const authority = (
      (avgPillarScore * 0.5) +
      (pillarCoverage * 0.3) +
      (Math.min(100, articlesPerPillar * 20) * 0.2)
    );
    
    return Math.round(authority);
  }
  
  /**
   * Gera alertas estratégicos baseados em métricas
   */
  public generateAlerts(pillars: string[]): StrategyAlert[] {
    const alerts: StrategyAlert[] = [];
    const now = new Date();
    
    // Alert 1: Pilares sem artigos recentes
    pillars.forEach(pillarName => {
      const metrics = this.calculatePillarMetrics(pillarName);
      if (metrics && metrics.lastArticleDate) {
        const daysSince = (now.getTime() - metrics.lastArticleDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (daysSince > 21) {
          alerts.push({
            id: `inactive-${pillarName}`,
            type: 'warning',
            title: `Pilar "${pillarName}" está inativo`,
            description: `Último artigo publicado há ${Math.round(daysSince)} dias. Pilares inativos perdem autoridade.`,
            action: 'Criar novo artigo para este pilar',
            priority: 'alta',
            createdAt: now
          });
        }
      } else if (metrics && metrics.articlesCount === 0) {
        alerts.push({
          id: `empty-${pillarName}`,
          type: 'urgent',
          title: `Pilar "${pillarName}" sem conteúdo`,
          description: 'Este pilar foi definido mas ainda não tem nenhum artigo publicado.',
          action: 'Publicar primeiro artigo de autoridade',
          priority: 'alta',
          createdAt: now
        });
      }
    });
    
    // Alert 2: Taxa de autoridade baixa
    const authorityRate = this.calculateAuthorityRate(pillars);
    if (authorityRate < 40 && this.articles.length >= 3) {
      alerts.push({
        id: 'low-authority',
        type: 'info',
        title: 'Taxa de autoridade pode melhorar',
        description: `Sua taxa está em ${authorityRate}%. Para crescer, foque em aumentar engajamento e SEO.`,
        action: 'Revisar estratégia de conteúdo',
        priority: 'média',
        createdAt: now
      });
    }
    
    // Alert 3: Sucesso quando autoridade > 60%
    if (authorityRate >= 60) {
      alerts.push({
        id: 'good-authority',
        type: 'success',
        title: '🎉 Excelente taxa de autoridade!',
        description: `Você está com ${authorityRate}% de autoridade. Continue publicando consistentemente.`,
        action: 'Manter cadência de publicação',
        priority: 'baixa',
        createdAt: now
      });
    }
    
    // Alert 4: Artigos recentes com bom engajamento
    const recentHighEngagement = this.articles.filter(a => {
      const daysSince = (now.getTime() - a.publishedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 7 && a.engagement > 65;
    });
    
    if (recentHighEngagement.length > 0) {
      alerts.push({
        id: 'high-engagement',
        type: 'success',
        title: `${recentHighEngagement.length} artigo(s) com alto engajamento`,
        description: 'Artigos recentes estão performando bem. Analise o que funcionou e replique.',
        action: 'Analisar padrões de sucesso',
        priority: 'baixa',
        createdAt: now
      });
    }
    
    return alerts.sort((a, b) => {
      const priorityOrder = { alta: 3, média: 2, baixa: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
  
  /**
   * Gera recomendações estratégicas Lucresia
   */
  public generateRecommendations(pillars: string[]): string[] {
    const recommendations: string[] = [];
    const authorityRate = this.calculateAuthorityRate(pillars);
    
    if (pillars.length < 3) {
      recommendations.push('📊 Complete seus pilares de autoridade (mínimo 3) para uma base estratégica sólida.');
    }
    
    if (this.articles.length === 0) {
      recommendations.push('✍️ Publique seu primeiro artigo de autoridade para começar a construir presença digital.');
    } else if (this.articles.length < pillars.length * 2) {
      recommendations.push(`📈 Crie pelo menos 2 artigos por pilar (atualmente: ${(this.articles.length / pillars.length).toFixed(1)} artigos/pilar).`);
    }
    
    if (authorityRate < 50) {
      recommendations.push('🎯 Foque em melhorar SEO e engajamento dos artigos existentes para aumentar autoridade.');
    }
    
    pillars.forEach(pillarName => {
      const metrics = this.calculatePillarMetrics(pillarName);
      if (metrics && metrics.trend === 'descending' && metrics.articlesCount > 0) {
        recommendations.push(`⚠️ Pilar "${pillarName}" está em declínio. Publique novo conteúdo para reativar.`);
      }
    });
    
    if (this.articles.length >= 5 && authorityRate >= 50) {
      recommendations.push('🚀 Sua estratégia está amadurecendo. Consider expandir para multi-canal (Pinterest, LinkedIn).');
    }
    
    return recommendations.slice(0, 5); // Máximo 5 recomendações
  }
  
  /**
   * Retorna dashboard completo
   */
  public getDashboardMetrics(pillars: string[]): DashboardMetrics {
    const totalViews = this.articles.reduce((sum, a) => sum + a.views, 0);
    const avgEngagement = this.articles.length > 0 
      ? this.articles.reduce((sum, a) => sum + a.engagement, 0) / this.articles.length 
      : 0;
    
    // Calcula crescimento (comparado a período anterior)
    const now = Date.now();
    const recentArticles = this.articles.filter(a => {
      const daysSince = (now - a.publishedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 30;
    });
    const oldArticles = this.articles.filter(a => {
      const daysSince = (now - a.publishedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince > 30 && daysSince <= 60;
    });
    
    const recentViews = recentArticles.reduce((sum, a) => sum + a.views, 0);
    const oldViews = oldArticles.reduce((sum, a) => sum + a.views, 0);
    const growthRate = oldViews > 0 ? ((recentViews - oldViews) / oldViews) * 100 : 0;
    
    return {
      overview: {
        totalArticles: this.articles.length,
        totalViews,
        avgEngagement: Math.round(avgEngagement),
        authorityRate: this.calculateAuthorityRate(pillars),
        growthRate: Math.round(growthRate)
      },
      pillars: pillars.map(p => this.calculatePillarMetrics(p)).filter(Boolean) as PillarMetrics[],
      articles: this.articles.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()),
      alerts: this.generateAlerts(pillars),
      recommendations: this.generateRecommendations(pillars)
    };
  }
  
  /**
   * Simula aumento de views/engagement (para demonstração)
   */
  public simulateGrowth(): void {
    this.articles.forEach(article => {
      article.views += Math.floor(Math.random() * 50);
      article.engagement = Math.min(100, article.engagement + Math.floor(Math.random() * 5));
    });
  }
}

export default AnalyticsService.getInstance();
