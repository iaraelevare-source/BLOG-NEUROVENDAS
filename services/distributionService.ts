/**
 * Distribution Service
 * 
 * Multi-channel content distribution system
 * Adapts content for different platforms: Blog, Pinterest, LinkedIn, Instagram Stories
 */

import type { Article, ArticleType } from '../types';

export interface PlatformConfig {
  id: string;
  name: string;
  enabled: boolean;
  icon: string;
  maxTitleLength: number;
  maxDescriptionLength: number;
  imageRequired: boolean;
  hashtags: boolean;
}

export interface AdaptedContent {
  platform: string;
  title: string;
  description: string;
  hashtags?: string[];
  imageUrl?: string;
  ctaText?: string;
  formatted: string;
}

export interface DistributionResult {
  success: boolean;
  platform: string;
  publishedUrl?: string;
  error?: string;
}

class DistributionService {
  private static instance: DistributionService;

  private platforms: Record<string, PlatformConfig> = {
    blog: {
      id: 'blog',
      name: 'Blog/WordPress',
      enabled: true,
      icon: '📝',
      maxTitleLength: 120,
      maxDescriptionLength: 5000,
      imageRequired: false,
      hashtags: false,
    },
    pinterest: {
      id: 'pinterest',
      name: 'Pinterest',
      enabled: false,
      icon: '📌',
      maxTitleLength: 100,
      maxDescriptionLength: 500,
      imageRequired: true,
      hashtags: true,
    },
    linkedin: {
      id: 'linkedin',
      name: 'LinkedIn',
      enabled: false,
      icon: '💼',
      maxTitleLength: 150,
      maxDescriptionLength: 3000,
      imageRequired: false,
      hashtags: true,
    },
    stories: {
      id: 'stories',
      name: 'Instagram Stories',
      enabled: false,
      icon: '📸',
      maxTitleLength: 40,
      maxDescriptionLength: 200,
      imageRequired: true,
      hashtags: true,
    },
  };

  private constructor() {}

  static getInstance(): DistributionService {
    if (!DistributionService.instance) {
      DistributionService.instance = new DistributionService();
    }
    return DistributionService.instance;
  }

  /**
   * Get all platform configurations
   */
  getPlatforms(): PlatformConfig[] {
    return Object.values(this.platforms);
  }

  /**
   * Get enabled platforms
   */
  getEnabledPlatforms(): PlatformConfig[] {
    return Object.values(this.platforms).filter(p => p.enabled);
  }

  /**
   * Update platform status
   */
  updatePlatformStatus(platformId: string, enabled: boolean): void {
    if (this.platforms[platformId]) {
      this.platforms[platformId].enabled = enabled;
    }
  }

  /**
   * Adapt content for specific platform
   */
  adaptContent(article: Partial<Article>, platformId: string): AdaptedContent {
    const platform = this.platforms[platformId];
    if (!platform) {
      throw new Error(`Platform ${platformId} not found`);
    }

    const title = this.truncateText(article.title || '', platform.maxTitleLength);
    const description = this.truncateText(
      article.content || '', 
      platform.maxDescriptionLength
    );

    const hashtags = platform.hashtags 
      ? this.generateHashtags(article)
      : undefined;

    const formatted = this.formatForPlatform(platformId, {
      title,
      description,
      hashtags,
      pillar: article.pillar,
      type: article.type,
    });

    return {
      platform: platform.name,
      title,
      description,
      hashtags,
      formatted,
    };
  }

  /**
   * Adapt content for all enabled platforms
   */
  adaptForAllPlatforms(article: Partial<Article>): AdaptedContent[] {
    const enabledPlatforms = this.getEnabledPlatforms();
    return enabledPlatforms.map(platform => 
      this.adaptContent(article, platform.id)
    );
  }

  /**
   * Simulate distribution to platform
   * In production, would integrate with actual APIs
   */
  async distributeToPlatform(
    article: Partial<Article>,
    platformId: string
  ): Promise<DistributionResult> {
    const platform = this.platforms[platformId];
    if (!platform) {
      return {
        success: false,
        platform: platformId,
        error: 'Platform not found',
      };
    }

    if (!platform.enabled) {
      return {
        success: false,
        platform: platform.name,
        error: 'Platform not enabled',
      };
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful publication
    const mockUrls: Record<string, string> = {
      blog: `https://exemplo.com.br/blog/${this.slugify(article.title || '')}`,
      pinterest: `https://pinterest.com/pin/${Math.random().toString(36).substr(2, 9)}`,
      linkedin: `https://linkedin.com/posts/${Math.random().toString(36).substr(2, 9)}`,
      stories: `https://instagram.com/stories/${Math.random().toString(36).substr(2, 9)}`,
    };

    return {
      success: true,
      platform: platform.name,
      publishedUrl: mockUrls[platformId],
    };
  }

  /**
   * Distribute to all enabled platforms
   */
  async distributeToAll(article: Partial<Article>): Promise<DistributionResult[]> {
    const enabledPlatforms = this.getEnabledPlatforms();
    const results = await Promise.all(
      enabledPlatforms.map(platform => 
        this.distributeToPlatform(article, platform.id)
      )
    );
    return results;
  }

  /**
   * Generate platform-specific hashtags
   */
  private generateHashtags(article: Partial<Article>): string[] {
    const baseHashtags = [
      'EstéticaFacial',
      'BelezaNatural',
      'Harmonização',
    ];

    // Add pillar-specific hashtags
    if (article.pillar) {
      const pillarTag = article.pillar.replace(/\s+/g, '');
      baseHashtags.push(pillarTag);
    }

    // Add type-specific hashtags
    const typeHashtags: Record<ArticleType, string[]> = {
      'autoridade-clinica': ['AutoridadeMédica', 'Especialista'],
      'educacao-paciente': ['EducaçãoSaúde', 'Informação'],
      'caso-sucesso': ['AntesDepois', 'Resultados'],
      'procedimento-guia': ['GuiaCompleto', 'Procedimentos'],
      'tendencia': ['Tendências', 'Novidades'],
      'faq': ['Perguntas', 'Dúvidas'],
    };

    if (article.type && typeHashtags[article.type]) {
      baseHashtags.push(...typeHashtags[article.type]);
    }

    return baseHashtags.slice(0, 5); // Max 5 hashtags
  }

  /**
   * Format content for specific platform
   */
  private formatForPlatform(
    platformId: string,
    data: {
      title: string;
      description: string;
      hashtags?: string[];
      pillar?: string;
      type?: ArticleType;
    }
  ): string {
    switch (platformId) {
      case 'blog':
        return this.formatBlog(data);
      case 'pinterest':
        return this.formatPinterest(data);
      case 'linkedin':
        return this.formatLinkedIn(data);
      case 'stories':
        return this.formatStories(data);
      default:
        return data.description;
    }
  }

  private formatBlog(data: any): string {
    return `# ${data.title}\n\n${data.description}`;
  }

  private formatPinterest(data: any): string {
    const hashtags = data.hashtags?.map((h: string) => `#${h}`).join(' ') || '';
    return `${data.title}\n\n${data.description}\n\n${hashtags}`;
  }

  private formatLinkedIn(data: any): string {
    const emoji = this.getEmojiForType(data.type);
    const hashtags = data.hashtags?.map((h: string) => `#${h}`).join(' ') || '';
    return `${emoji} ${data.title}\n\n${data.description}\n\n${hashtags}`;
  }

  private formatStories(data: any): string {
    // Stories are visual, so we format as overlay text
    const hashtags = data.hashtags?.slice(0, 3).map((h: string) => `#${h}`).join(' ') || '';
    return `${data.title}\n\n${hashtags}`;
  }

  private getEmojiForType(type?: ArticleType): string {
    const emojiMap: Record<ArticleType, string> = {
      'autoridade-clinica': '👨‍⚕️',
      'educacao-paciente': '📚',
      'caso-sucesso': '✨',
      'procedimento-guia': '📖',
      'tendencia': '🔥',
      'faq': '💡',
    };
    return type ? emojiMap[type] : '✨';
  }

  /**
   * Truncate text to fit platform limits
   */
  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }

  /**
   * Convert title to URL slug
   */
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  /**
   * Get distribution statistics
   */
  getDistributionStats(): {
    totalPlatforms: number;
    enabledPlatforms: number;
    disabledPlatforms: number;
  } {
    const all = Object.values(this.platforms);
    const enabled = all.filter(p => p.enabled);
    return {
      totalPlatforms: all.length,
      enabledPlatforms: enabled.length,
      disabledPlatforms: all.length - enabled.length,
    };
  }
}

export default DistributionService.getInstance();
