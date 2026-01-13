/**
 * SEO Utilities for WordPress Post Optimization
 */

/**
 * Generate SEO-optimized title
 * - Keep under 60 characters
 * - Include main keyword naturally
 * - Make it compelling and clickable
 */
export function optimizeSeoTitle(title: string, keyword: string): string {
  const maxLength = 60;
  
  // If title already contains keyword and is under limit, return as is
  if (title.toLowerCase().includes(keyword.toLowerCase()) && title.length <= maxLength) {
    return title;
  }

  // If title doesn't contain keyword, try to add it
  if (!title.toLowerCase().includes(keyword.toLowerCase())) {
    const titleWithKeyword = `${keyword}: ${title}`;
    if (titleWithKeyword.length <= maxLength) {
      return titleWithKeyword;
    }
  }

  // Truncate if too long while preserving keyword
  if (title.length > maxLength) {
    return title.substring(0, maxLength - 3) + '...';
  }

  return title;
}

/**
 * Generate URL-friendly slug from text
 * - Lowercase
 * - Remove special characters
 * - Replace spaces with hyphens
 * - Remove diacritics
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose combined characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();
}

/**
 * Format content with proper HTML structure
 * - Converts markdown-like syntax to HTML
 * - Adds proper heading hierarchy (H2, H3)
 * - Formats lists
 * - Adds paragraphs
 */
export function formatContentForWordPress(content: string): string {
  let formatted = content;

  // Convert ## to H2
  formatted = formatted.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  
  // Convert ### to H3
  formatted = formatted.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  
  // Convert #### to H4
  formatted = formatted.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

  // Convert ordered lists (numbered)
  formatted = formatted.replace(/^\d+\. (.+)$/gm, '<li class="ordered">$1</li>');
  
  // Convert unordered lists (bullets)
  formatted = formatted.replace(/^\* (.+)$/gm, '<li class="unordered">$1</li>');
  formatted = formatted.replace(/^- (.+)$/gm, '<li class="unordered">$1</li>');
  
  // Wrap consecutive ordered list items in <ol>
  formatted = formatted.replace(/(<li class="ordered">.*?<\/li>\n?)+/g, (match) => {
    const cleaned = match.replace(/ class="ordered"/g, '');
    return `<ol>\n${cleaned}</ol>\n`;
  });
  
  // Wrap consecutive unordered list items in <ul>
  formatted = formatted.replace(/(<li class="unordered">.*?<\/li>\n?)+/g, (match) => {
    const cleaned = match.replace(/ class="unordered"/g, '');
    return `<ul>\n${cleaned}</ul>\n`;
  });

  // Convert bold **text** or __text__
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Convert italic *text* or _text_
  formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
  formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>');

  // Add paragraph tags to regular text (lines that don't start with HTML tags)
  const lines = formatted.split('\n');
  const withParagraphs = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<') || trimmed.endsWith('>')) return line;
    return `<p>${trimmed}</p>`;
  });

  return withParagraphs.join('\n').trim();
}

/**
 * Insert CTA (Call-to-Action) at the end of content
 */
export function insertCTA(content: string, ctaText?: string): string {
  const defaultCTA = `
<div class="cta-box" style="background: #f8f9fa; padding: 2rem; border-radius: 8px; margin: 2rem 0; text-align: center;">
  <h3 style="margin-bottom: 1rem;">Gostou deste conteúdo?</h3>
  <p style="margin-bottom: 1.5rem;">Inscreva-se para receber mais dicas exclusivas diretamente no seu e-mail!</p>
  <a href="#newsletter" class="cta-button" style="display: inline-block; background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Quero receber as dicas</a>
</div>
`;

  const cta = ctaText || defaultCTA;
  return `${content}\n\n${cta}`;
}

/**
 * Generate SEO-friendly excerpt from content
 * - Extract first 155 characters
 * - Include keyword if possible
 * - End at complete sentence
 */
export function generateExcerpt(content: string, keyword: string, maxLength: number = 155): string {
  // Remove HTML tags for excerpt
  const textOnly = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (textOnly.length <= maxLength) {
    return textOnly;
  }

  // Try to cut at sentence boundary
  let excerpt = textOnly.substring(0, maxLength);
  const lastPeriod = excerpt.lastIndexOf('.');
  const lastQuestion = excerpt.lastIndexOf('?');
  const lastExclamation = excerpt.lastIndexOf('!');
  
  const lastSentenceEnd = Math.max(lastPeriod, lastQuestion, lastExclamation);
  
  if (lastSentenceEnd > maxLength * 0.6) { // If we have at least 60% of text
    excerpt = excerpt.substring(0, lastSentenceEnd + 1);
  } else {
    excerpt = excerpt.substring(0, maxLength - 3) + '...';
  }

  return excerpt.trim();
}

/**
 * Validate that content maintains professional tone
 * Returns array of potential issues
 */
export function validateProfessionalTone(content: string): string[] {
  const issues: string[] = [];
  const lowerContent = content.toLowerCase();

  // Check for overly casual language (Brazilian Portuguese)
  const casualPhrases = [
    'cara', 'mano', 'véi', 'brother', 'parça',
    'tipo assim', 'né', 'tá ligado'
  ];

  casualPhrases.forEach(phrase => {
    if (lowerContent.includes(phrase)) {
      issues.push(`Linguagem muito casual detectada: "${phrase}"`);
    }
  });

  // Check for excessive punctuation
  if (/[!]{2,}/.test(content)) {
    issues.push('Uso excessivo de pontos de exclamação');
  }

  // Check for all caps (excluding headings)
  const textWithoutHeadings = content.replace(/<h[1-6]>.*?<\/h[1-6]>/gi, '');
  if (/[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]{10,}/.test(textWithoutHeadings)) {
    issues.push('Texto em caixa alta detectado (pode parecer agressivo)');
  }

  return issues;
}

/**
 * Calculate basic SEO score for content
 */
export function calculateSeoScore(
  title: string,
  content: string,
  keyword: string,
  slug: string
): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 100;

  // Check title length
  if (title.length > 60) {
    score -= 10;
    feedback.push('Título muito longo (ideal: até 60 caracteres)');
  } else if (title.length < 30) {
    score -= 5;
    feedback.push('Título muito curto (ideal: 30-60 caracteres)');
  }

  // Check keyword in title
  if (!title.toLowerCase().includes(keyword.toLowerCase())) {
    score -= 15;
    feedback.push('Palavra-chave não encontrada no título');
  }

  // Check keyword in slug
  if (!slug.includes(generateSlug(keyword))) {
    score -= 10;
    feedback.push('Palavra-chave não encontrada no slug');
  }

  // Check content length
  const wordCount = content.split(/\s+/).length;
  if (wordCount < 300) {
    score -= 20;
    feedback.push('Conteúdo muito curto (ideal: mínimo 300 palavras)');
  } else if (wordCount < 600) {
    score -= 10;
    feedback.push('Conteúdo poderia ser mais completo (ideal: 600+ palavras)');
  }

  // Check keyword density
  const keywordOccurrences = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
  const keywordDensity = (keywordOccurrences / wordCount) * 100;
  
  if (keywordDensity < 0.5) {
    score -= 15;
    feedback.push('Palavra-chave pouco usada no conteúdo (ideal: 0.5-2.5%)');
  } else if (keywordDensity > 3) {
    score -= 15;
    feedback.push('Palavra-chave usada demais (parece spam)');
  }

  // Check for headings
  const hasH2 = /<h2>/i.test(content);
  if (!hasH2) {
    score -= 10;
    feedback.push('Adicione subtítulos (H2) para melhor estrutura');
  }

  if (score < 0) score = 0;
  if (feedback.length === 0) {
    feedback.push('Excelente! Conteúdo bem otimizado para SEO.');
  }

  return { score, feedback };
}
