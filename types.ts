
export enum ArticleType {
  PROCEDURE = 'procedimento',
  AUTHORITY = 'autoridade_clinica',
  EDUCATIONAL = 'educativo',
  MANAGEMENT = 'gestao_estetica',
  NEWS = 'tendencia_beleza',
  REVIEW = 'resenha_produto'
}

export enum PlatformType {
  WORDPRESS = 'WordPress',
  WIX = 'Wix'
}

export interface Project {
  id: string;
  name: string;
  platform: PlatformType;
  language: string;
  niche: string;
  mainKeyword: string;
}

export interface AutomationStatus {
  sheetConnected: boolean;
  lastSync: string;
  activeTriggers: number;
  frequency: 'daily' | 'weekly' | 'custom';
  postsPerWeek: number;
  autoPublish: boolean;
}

export interface WebStorySlide {
  imagePrompt: string;
  title: string;
  description: string;
}

export interface WebStory {
  id: string;
  articleId: string;
  title: string;
  slides: WebStorySlide[];
}

export interface HubRow {
  id: string;
  keyword: string;
  topic: string;
  type: ArticleType;
  status: 'Pendente' | 'Gerado' | 'Otimizado' | 'Publicado' | 'Erro' | 'Agendado';
  seoScore: number;
  channels: {
    blog: boolean;
    pinterest: boolean;
    linkedin: boolean;
    audio: boolean;
  };
}

// Lucresia Service Types (Phase 3)

export interface NicheInsights {
  mainOpportunities: string[];
  competitiveLandscape: string;
  targetAudience: string;
  seasonalTrends: string[];
}

export interface PillarSuggestion {
  name: string;
  description: string;
  keywords: string[];
  expectedImpact: 'alto' | 'médio' | 'baixo';
  rationale?: string;
}

export interface NicheAnalysis {
  nicheInsights: NicheInsights;
  authorityScore: number;
  growthPotential: 'alto' | 'médio' | 'baixo';
  recommendedPillars: PillarSuggestion[];
}

export interface EditorialRecommendation {
  id: string;
  priority: 'alta' | 'média' | 'baixa';
  category: 'pilares' | 'conteúdo' | 'distribuição' | 'otimização';
  title: string;
  description: string;
  actionable: boolean;
  estimatedImpact: string;
}

export interface CalendarSuggestion {
  id: string;
  pillar: string;
  title: string;
  type: ArticleType | string;
  priority: 'alta' | 'média' | 'baixa';
  estimatedWeek: number;
  rationale: string;
  keywords: string[];
}

export interface ArticleIdea {
  title: string;
  type: ArticleType | string;
  description: string;
  keywords: string[];
  estimatedImpact: 'alto' | 'médio' | 'baixo';
  difficulty: 'fácil' | 'médio' | 'avançado';
}
