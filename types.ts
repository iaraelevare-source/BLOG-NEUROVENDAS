
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
