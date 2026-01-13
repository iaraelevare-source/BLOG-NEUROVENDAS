/**
 * Default configuration for WordPress Publisher
 * 
 * This file contains the default settings for:
 * - Editorial calendar
 * - Brand guidelines
 * - Publishing rules
 */

import { EditorialCalendar, BrandGuidelines } from '../utils/validationUtils';

/**
 * Default Editorial Calendar
 * Configure approved dates and publishing limits
 */
export const defaultEditorialCalendar: EditorialCalendar = {
  // List of approved dates (empty means all dates allowed)
  approvedDates: [],
  
  // Dates when publishing is forbidden (holidays, maintenance, etc)
  blacklistDates: [
    // Add blocked dates here, e.g.:
    // '2026-12-25', // Christmas
    // '2026-01-01', // New Year
  ],
  
  // Maximum posts per day
  maxPostsPerDay: 3,
  
  // Maximum posts per week
  maxPostsPerWeek: 15,
};

/**
 * Default Brand Guidelines
 * Configure brand voice and content rules
 */
export const defaultBrandGuidelines: BrandGuidelines = {
  // Allowed content tones
  allowedTones: ['professional', 'educational', 'persuasive'],
  
  // Words that should never appear in content
  forbiddenWords: [
    'milagre',
    'garantido',
    'certeza absoluta',
    'sem esforço',
    'instantâneo',
    // Add more forbidden words here
  ],
  
  // Optional disclaimer to add to all posts
  requiredDisclaimer: undefined,
  
  // Brand voice characteristics
  brandVoice: {
    formal: true,      // Use formal language
    technical: true,   // Allow technical terms
    friendly: true,    // Maintain friendly tone
  },
};

/**
 * Environment variables for WordPress connection
 * These should be set in .env.local file
 */
export interface EnvironmentConfig {
  WORDPRESS_SITE_URL: string;
  WORDPRESS_USERNAME: string;
  WORDPRESS_APP_PASSWORD: string;
}

/**
 * Get WordPress configuration from environment variables
 */
export function getWordPressConfigFromEnv(): EnvironmentConfig {
  return {
    WORDPRESS_SITE_URL: process.env.WORDPRESS_SITE_URL || '',
    WORDPRESS_USERNAME: process.env.WORDPRESS_USERNAME || '',
    WORDPRESS_APP_PASSWORD: process.env.WORDPRESS_APP_PASSWORD || '',
  };
}

/**
 * Validate that all required environment variables are set
 */
export function validateEnvironmentConfig(config: EnvironmentConfig): string[] {
  const errors: string[] = [];

  if (!config.WORDPRESS_SITE_URL) {
    errors.push('WORDPRESS_SITE_URL não configurado');
  }

  if (!config.WORDPRESS_USERNAME) {
    errors.push('WORDPRESS_USERNAME não configurado');
  }

  if (!config.WORDPRESS_APP_PASSWORD) {
    errors.push('WORDPRESS_APP_PASSWORD não configurado');
  }

  return errors;
}
