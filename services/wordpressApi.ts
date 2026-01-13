/**
 * WordPress REST API Integration Service
 * Handles authentication and API calls to WordPress
 */

export interface WordPressConfig {
  siteUrl: string;
  username: string;
  applicationPassword: string;
}

export interface WordPressPost {
  title: string;
  content: string;
  slug: string;
  status: 'draft' | 'publish' | 'future';
  categories: number[];
  date?: string; // ISO 8601 format for scheduled posts
  excerpt?: string;
  meta?: {
    [key: string]: any;
  };
}

export interface WordPressPostResponse {
  id: number;
  link: string;
  status: string;
  date: string;
}

export class WordPressApiService {
  private config: WordPressConfig;
  private baseUrl: string;

  constructor(config: WordPressConfig) {
    this.config = config;
    this.baseUrl = `${config.siteUrl}/wp-json/wp/v2`;
  }

  /**
   * Get Basic Authentication header
   */
  private getAuthHeader(): string {
    // Validate credentials don't contain invalid characters
    if (this.config.username.includes(':')) {
      throw new Error('Username cannot contain colon character');
    }
    if (this.config.applicationPassword.includes('\n') || this.config.applicationPassword.includes('\r')) {
      throw new Error('Application password contains invalid characters');
    }
    
    const credentials = `${this.config.username}:${this.config.applicationPassword}`;
    return `Basic ${btoa(credentials)}`;
  }

  /**
   * Create a new WordPress post
   */
  async createPost(post: WordPressPost): Promise<WordPressPostResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthHeader(),
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`WordPress API Error: ${error.message || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to create WordPress post: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get available categories
   */
  async getCategories(): Promise<Array<{ id: number; name: string; slug: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/categories?per_page=100`, {
        headers: {
          'Authorization': this.getAuthHeader(),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch WordPress categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Find or create a category by name
   */
  async findOrCreateCategory(categoryName: string): Promise<number> {
    try {
      // First, try to find existing category
      const categories = await this.getCategories();
      const existing = categories.find(
        cat => cat.name.toLowerCase() === categoryName.toLowerCase()
      );

      if (existing) {
        return existing.id;
      }

      // Create new category if not found
      const response = await fetch(`${this.baseUrl}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthHeader(),
        },
        body: JSON.stringify({
          name: categoryName,
          slug: this.generateSlug(categoryName),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create category: ${response.statusText}`);
      }

      const newCategory = await response.json();
      return newCategory.id;
    } catch (error) {
      throw new Error(`Failed to find or create category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate a URL-friendly slug from text
   */
  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }

  /**
   * Verify connection to WordPress site
   */
  async verifyConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/posts?per_page=1`, {
        headers: {
          'Authorization': this.getAuthHeader(),
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}
