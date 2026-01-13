/**
 * Validation utilities for WordPress post publishing
 */

export interface PostInput {
  theme: string;
  mainKeyword: string;
  content: string;
  publishDate: string; // ISO 8601 format
  category?: string;
  cta?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate required post inputs
 */
export function validatePostInput(input: PostInput): ValidationResult {
  const errors: string[] = [];

  // Validate theme
  if (!input.theme || input.theme.trim().length === 0) {
    errors.push('Tema é obrigatório');
  } else if (input.theme.length < 3) {
    errors.push('Tema deve ter pelo menos 3 caracteres');
  } else if (input.theme.length > 200) {
    errors.push('Tema muito longo (máximo: 200 caracteres)');
  }

  // Validate main keyword
  if (!input.mainKeyword || input.mainKeyword.trim().length === 0) {
    errors.push('Palavra-chave principal é obrigatória');
  } else if (input.mainKeyword.length < 2) {
    errors.push('Palavra-chave muito curta');
  } else if (input.mainKeyword.length > 100) {
    errors.push('Palavra-chave muito longa (máximo: 100 caracteres)');
  }

  // Validate content
  if (!input.content || input.content.trim().length === 0) {
    errors.push('Texto do post é obrigatório');
  } else if (input.content.length < 100) {
    errors.push('Texto muito curto (mínimo: 100 caracteres)');
  } else if (input.content.split(/\s+/).length < 50) {
    errors.push('Conteúdo deve ter pelo menos 50 palavras');
  }

  // Validate publish date
  if (!input.publishDate || input.publishDate.trim().length === 0) {
    errors.push('Data de publicação é obrigatória');
  } else {
    try {
      const date = new Date(input.publishDate);
      if (isNaN(date.getTime())) {
        errors.push('Data de publicação inválida');
      }
    } catch {
      errors.push('Formato de data inválido (use ISO 8601: YYYY-MM-DDTHH:mm:ss)');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Editorial calendar - approved dates for publishing
 * In production, this would be loaded from a database or config file
 */
export interface EditorialCalendar {
  approvedDates: string[]; // ISO date strings
  blacklistDates: string[]; // Dates when publishing is forbidden
  maxPostsPerDay: number;
  maxPostsPerWeek: number;
}

/**
 * Validate if a date is within approved editorial calendar
 */
export function validatePublishDate(
  publishDate: string,
  calendar: EditorialCalendar,
  existingPostsOnDate: number = 0
): ValidationResult {
  const errors: string[] = [];
  
  try {
    const date = new Date(publishDate);
    const dateString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD
    const now = new Date();

    // Check if date is in the past
    if (date < now) {
      errors.push('Data de publicação não pode estar no passado');
    }

    // Check if date is in blacklist
    if (calendar.blacklistDates.includes(dateString)) {
      errors.push('Esta data está bloqueada para publicação');
    }

    // Check if date is approved (if approval list is not empty)
    if (calendar.approvedDates.length > 0 && !calendar.approvedDates.includes(dateString)) {
      errors.push('Esta data não está no calendário editorial aprovado');
    }

    // Check max posts per day
    if (existingPostsOnDate >= calendar.maxPostsPerDay) {
      errors.push(`Limite de posts por dia atingido (máximo: ${calendar.maxPostsPerDay})`);
    }

  } catch (error) {
    errors.push('Erro ao validar data de publicação');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Brand identity guidelines
 * Ensures content maintains brand consistency
 */
export interface BrandGuidelines {
  allowedTones: string[]; // e.g., ['professional', 'educational', 'persuasive']
  forbiddenWords: string[];
  requiredDisclaimer?: string;
  brandVoice: {
    formal: boolean;
    technical: boolean;
    friendly: boolean;
  };
}

/**
 * Validate content against brand guidelines
 */
export function validateBrandIdentity(
  content: string,
  title: string,
  guidelines: BrandGuidelines
): ValidationResult {
  const errors: string[] = [];
  const lowerContent = (content + ' ' + title).toLowerCase();

  // Check for forbidden words
  guidelines.forbiddenWords.forEach(word => {
    if (lowerContent.includes(word.toLowerCase())) {
      errors.push(`Palavra proibida detectada: "${word}" (viola identidade da marca)`);
    }
  });

  // Check for competitor mentions
  const competitorPatterns = [
    /concorren(te|cia)/i,
    /outros?\s+(empresa|negócio|clínica)/i,
  ];

  competitorPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      errors.push('Evite mencionar concorrentes diretamente');
    }
  });

  // Check for overly promotional language (if brand voice is educational)
  if (guidelines.brandVoice.formal || !guidelines.allowedTones.includes('promotional')) {
    const promotionalPhrases = [
      'compre agora', 'oferta imperdível', 'último dia', 'promoção',
      'garanta já', 'não perca', 'desconto especial'
    ];

    promotionalPhrases.forEach(phrase => {
      if (lowerContent.includes(phrase)) {
        errors.push(`Linguagem muito promocional: "${phrase}" (não alinhada com tom da marca)`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Comprehensive validation for post publishing
 */
export function validateForPublishing(
  input: PostInput,
  calendar: EditorialCalendar,
  guidelines: BrandGuidelines,
  existingPostsOnDate: number = 0
): ValidationResult {
  const errors: string[] = [];

  // Validate basic input
  const inputValidation = validatePostInput(input);
  if (!inputValidation.isValid) {
    errors.push(...inputValidation.errors);
  }

  // Validate publish date against calendar
  const dateValidation = validatePublishDate(input.publishDate, calendar, existingPostsOnDate);
  if (!dateValidation.isValid) {
    errors.push(...dateValidation.errors);
  }

  // Validate brand identity
  const brandValidation = validateBrandIdentity(input.content, input.theme, guidelines);
  if (!brandValidation.isValid) {
    errors.push(...brandValidation.errors);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize input to prevent XSS and injection attacks
 */
export function sanitizeInput(input: PostInput): PostInput {
  return {
    theme: sanitizeString(input.theme),
    mainKeyword: sanitizeString(input.mainKeyword),
    content: sanitizeHtml(input.content),
    publishDate: input.publishDate, // Already validated
    category: input.category ? sanitizeString(input.category) : undefined,
    cta: input.cta ? sanitizeHtml(input.cta) : undefined,
  };
}

/**
 * Sanitize plain text strings
 */
function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

/**
 * Sanitize HTML content with comprehensive XSS protection
 * 
 * **SECURITY WARNING**: This is basic regex-based sanitization that has known limitations.
 * It provides defense-in-depth but is NOT sufficient for production use with untrusted content.
 * 
 * **For production, you MUST use a proven HTML sanitization library like:**
 * - DOMPurify (recommended): https://github.com/cure53/DOMPurify
 * - sanitize-html: https://github.com/apostrophecms/sanitize-html
 * - isomorphic-dompurify: For Node.js environments
 * 
 * These libraries handle complex edge cases like:
 * - Malformed HTML and Unicode tricks
 * - mXSS (mutation XSS) attacks
 * - Context-specific escaping
 * - HTML entity encoding issues
 * 
 * This function provides basic protection only and should be considered
 * the LAST line of defense, not the primary security measure.
 */
function sanitizeHtml(html: string): string {
  let sanitized = html;
  
  // Remove dangerous protocols (case-insensitive, with whitespace variations)
  // Note: Multiple passes needed as replacements can expose new patterns
  for (let i = 0; i < 3; i++) {
    const dangerousProtocols = ['javascript', 'data', 'vbscript', 'file'];
    dangerousProtocols.forEach(protocol => {
      const regex = new RegExp(`${protocol}\\s*:`, 'gi');
      sanitized = sanitized.replace(regex, '');
    });
  }
  
  // Remove script tags with all variations
  // Multiple passes to handle nested or malformed tags
  for (let i = 0; i < 3; i++) {
    sanitized = sanitized.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '');
    sanitized = sanitized.replace(/<script\b[^>]*>/gi, ''); // Remove opening tags without closing
  }
  
  // Remove iframe tags with all variations
  for (let i = 0; i < 3; i++) {
    sanitized = sanitized.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe\s*>/gi, '');
    sanitized = sanitized.replace(/<iframe\b[^>]*>/gi, '');
  }
  
  // Remove event handlers (all on* attributes)
  // Multiple passes to handle cases where removal exposes new handlers
  for (let i = 0; i < 3; i++) {
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');
  }
  
  // Remove style attributes that could contain dangerous content
  sanitized = sanitized.replace(/style\s*=\s*["'][^"']*["']/gi, '');
  
  // Remove object and embed tags
  sanitized = sanitized.replace(/<object\b[^>]*>[\s\S]*?<\/object\s*>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^>]*>/gi, '');
  
  // Remove form tags (potential for CSRF)
  sanitized = sanitized.replace(/<form\b[^>]*>[\s\S]*?<\/form\s*>/gi, '');
  
  return sanitized;
}
