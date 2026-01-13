/**
 * WordPress Post Publisher Service
 * Main service that orchestrates post creation, validation, and publishing
 */

import { WordPressApiService, WordPressConfig, WordPressPost } from './wordpressApi';
import {
  optimizeSeoTitle,
  generateSlug,
  formatContentForWordPress,
  insertCTA,
  generateExcerpt,
  calculateSeoScore,
  validateProfessionalTone,
} from '../utils/seoUtils';
import {
  PostInput,
  EditorialCalendar,
  BrandGuidelines,
  validateForPublishing,
  sanitizeInput,
} from '../utils/validationUtils';

export interface PublishResult {
  success: boolean;
  postId?: number;
  postUrl?: string;
  message: string;
  errors?: string[];
  seoScore?: number;
  seoFeedback?: string[];
}

export interface PublisherConfig {
  wordpress: WordPressConfig;
  calendar: EditorialCalendar;
  brandGuidelines: BrandGuidelines;
}

/**
 * Main WordPress Publisher Service
 */
export class WordPressPublisher {
  private wordpressApi: WordPressApiService;
  private config: PublisherConfig;

  constructor(config: PublisherConfig) {
    this.config = config;
    this.wordpressApi = new WordPressApiService(config.wordpress);
  }

  /**
   * Publish a post to WordPress
   * This is the main entry point for the automated publishing system
   */
  async publishPost(
    input: PostInput,
    options: {
      existingPostsOnDate?: number;
      skipValidation?: boolean;
      dryRun?: boolean; // If true, only validate without publishing
    } = {}
  ): Promise<PublishResult> {
    try {
      // Step 1: Sanitize input
      const sanitizedInput = sanitizeInput(input);

      // Step 2: Validate input
      if (!options.skipValidation) {
        const validation = validateForPublishing(
          sanitizedInput,
          this.config.calendar,
          this.config.brandGuidelines,
          options.existingPostsOnDate || 0
        );

        if (!validation.isValid) {
          return {
            success: false,
            message: 'Falha na validação do post',
            errors: validation.errors,
          };
        }
      }

      // Step 3: Check professional tone
      const toneIssues = validateProfessionalTone(sanitizedInput.content);
      if (toneIssues.length > 0) {
        console.warn('Avisos de tom:', toneIssues);
        // Not blocking, just warning
      }

      // Step 4: Generate SEO-optimized title
      const optimizedTitle = optimizeSeoTitle(sanitizedInput.theme, sanitizedInput.mainKeyword);

      // Step 5: Generate slug
      const slug = generateSlug(sanitizedInput.theme);

      // Step 6: Format content
      let formattedContent = formatContentForWordPress(sanitizedInput.content);

      // Step 7: Insert CTA
      formattedContent = insertCTA(formattedContent, sanitizedInput.cta);

      // Step 8: Generate excerpt
      const excerpt = generateExcerpt(formattedContent, sanitizedInput.mainKeyword);

      // Step 9: Calculate SEO score
      const { score, feedback } = calculateSeoScore(
        optimizedTitle,
        formattedContent,
        sanitizedInput.mainKeyword,
        slug
      );

      // If dry run, return validation results without publishing
      if (options.dryRun) {
        return {
          success: true,
          message: 'Validação concluída com sucesso (dry run)',
          seoScore: score,
          seoFeedback: feedback,
        };
      }

      // Step 10: Find or create category
      let categoryId: number | undefined;
      if (sanitizedInput.category) {
        try {
          categoryId = await this.wordpressApi.findOrCreateCategory(sanitizedInput.category);
        } catch (error) {
          console.error('Erro ao criar categoria:', error);
          // Continue without category rather than failing
        }
      }

      // Step 11: Determine post status
      const publishDate = new Date(sanitizedInput.publishDate);
      const now = new Date();
      const isScheduled = publishDate > now;

      // Step 12: Prepare WordPress post
      const wordPressPost: WordPressPost = {
        title: optimizedTitle,
        content: formattedContent,
        slug,
        status: isScheduled ? 'future' : 'publish',
        categories: categoryId ? [categoryId] : [],
        excerpt,
        date: isScheduled ? sanitizedInput.publishDate : undefined,
        meta: {
          _keyword: sanitizedInput.mainKeyword,
          _seo_score: score.toString(),
        },
      };

      // Step 13: Publish to WordPress
      const response = await this.wordpressApi.createPost(wordPressPost);

      // Step 14: Return success result
      return {
        success: true,
        postId: response.id,
        postUrl: response.link,
        message: isScheduled
          ? `Post agendado com sucesso para ${publishDate.toLocaleString('pt-BR')}`
          : 'Post publicado com sucesso',
        seoScore: score,
        seoFeedback: feedback,
      };

    } catch (error) {
      return {
        success: false,
        message: 'Erro ao publicar post',
        errors: [error instanceof Error ? error.message : 'Erro desconhecido'],
      };
    }
  }

  /**
   * Verify WordPress connection
   */
  async verifyConnection(): Promise<boolean> {
    return await this.wordpressApi.verifyConnection();
  }

  /**
   * Get available categories from WordPress
   */
  async getCategories() {
    return await this.wordpressApi.getCategories();
  }

  /**
   * Preview post before publishing (dry run with full formatting)
   */
  async previewPost(input: PostInput): Promise<{
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    seoScore: number;
    seoFeedback: string[];
    validationErrors: string[];
  }> {
    const sanitizedInput = sanitizeInput(input);

    // Validate
    const validation = validateForPublishing(
      sanitizedInput,
      this.config.calendar,
      this.config.brandGuidelines,
      0
    );

    // Format
    const optimizedTitle = optimizeSeoTitle(sanitizedInput.theme, sanitizedInput.mainKeyword);
    const slug = generateSlug(sanitizedInput.theme);
    let formattedContent = formatContentForWordPress(sanitizedInput.content);
    formattedContent = insertCTA(formattedContent, sanitizedInput.cta);
    const excerpt = generateExcerpt(formattedContent, sanitizedInput.mainKeyword);

    // Calculate SEO
    const { score, feedback } = calculateSeoScore(
      optimizedTitle,
      formattedContent,
      sanitizedInput.mainKeyword,
      slug
    );

    return {
      title: optimizedTitle,
      slug,
      content: formattedContent,
      excerpt,
      seoScore: score,
      seoFeedback: feedback,
      validationErrors: validation.errors,
    };
  }
}
