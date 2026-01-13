/**
 * Unit tests for WordPress Publisher utilities
 */

import { describe, it, expect } from 'vitest';
import {
  optimizeSeoTitle,
  generateSlug,
  formatContentForWordPress,
  insertCTA,
  generateExcerpt,
  calculateSeoScore,
  validateProfessionalTone,
} from '../utils/seoUtils';

describe('SEO Utils', () => {
  describe('optimizeSeoTitle', () => {
    it('should include keyword in title', () => {
      const title = 'Benefícios da Estética';
      const keyword = 'criomodelagem';
      const result = optimizeSeoTitle(title, keyword);
      expect(result.toLowerCase()).toContain(keyword.toLowerCase());
    });

    it('should keep title under 60 characters', () => {
      const title = 'Este é um título muito longo que precisa ser truncado para não exceder o limite';
      const keyword = 'teste';
      const result = optimizeSeoTitle(title, keyword);
      expect(result.length).toBeLessThanOrEqual(60);
    });

    it('should preserve title if already contains keyword and is short', () => {
      const title = 'Criomodelagem: Guia Completo';
      const keyword = 'criomodelagem';
      const result = optimizeSeoTitle(title, keyword);
      expect(result).toBe(title);
    });
  });

  describe('generateSlug', () => {
    it('should convert to lowercase', () => {
      const result = generateSlug('TÍTULO EM MAIÚSCULAS');
      expect(result).toBe('titulo-em-maiusculas');
    });

    it('should remove special characters', () => {
      const result = generateSlug('Título com @#$% caracteres!');
      expect(result).toBe('titulo-com-caracteres');
    });

    it('should remove diacritics', () => {
      const result = generateSlug('Título com áçêntõs');
      expect(result).toBe('titulo-com-acentos');
    });

    it('should replace spaces with hyphens', () => {
      const result = generateSlug('título com espaços');
      expect(result).toBe('titulo-com-espacos');
    });

    it('should remove multiple consecutive hyphens', () => {
      const result = generateSlug('título   com   muitos   espaços');
      expect(result).toBe('titulo-com-muitos-espacos');
    });
  });

  describe('formatContentForWordPress', () => {
    it('should convert ## to H2', () => {
      const content = '## Título de Seção';
      const result = formatContentForWordPress(content);
      expect(result).toContain('<h2>Título de Seção</h2>');
    });

    it('should convert ### to H3', () => {
      const content = '### Subtítulo';
      const result = formatContentForWordPress(content);
      expect(result).toContain('<h3>Subtítulo</h3>');
    });

    it('should convert lists with *', () => {
      const content = '* Item 1\n* Item 2';
      const result = formatContentForWordPress(content);
      expect(result).toContain('<li>Item 1</li>');
      expect(result).toContain('<li>Item 2</li>');
    });

    it('should convert bold text', () => {
      const content = 'Texto **em negrito** aqui';
      const result = formatContentForWordPress(content);
      expect(result).toContain('<strong>em negrito</strong>');
    });

    it('should convert italic text', () => {
      const content = 'Texto *em itálico* aqui';
      const result = formatContentForWordPress(content);
      expect(result).toContain('<em>em itálico</em>');
    });
  });

  describe('insertCTA', () => {
    it('should append CTA to content', () => {
      const content = 'Conteúdo do post';
      const result = insertCTA(content);
      expect(result).toContain('Conteúdo do post');
      expect(result).toContain('cta-box');
    });

    it('should use custom CTA when provided', () => {
      const content = 'Conteúdo do post';
      const customCTA = '<div class="custom-cta">Custom CTA</div>';
      const result = insertCTA(content, customCTA);
      expect(result).toContain('custom-cta');
    });
  });

  describe('generateExcerpt', () => {
    it('should truncate content to max length', () => {
      const content = 'Este é um texto muito longo que precisa ser truncado para criar um excerpt adequado para SEO e meta descrições no WordPress.';
      const result = generateExcerpt(content, 'teste', 155);
      expect(result.length).toBeLessThanOrEqual(155);
    });

    it('should remove HTML tags', () => {
      const content = '<p>Texto com <strong>HTML</strong> tags</p>';
      const result = generateExcerpt(content, 'teste');
      expect(result).not.toContain('<p>');
      expect(result).not.toContain('<strong>');
    });

    it('should try to cut at sentence boundary', () => {
      const content = 'Primeira frase. Segunda frase. Terceira frase muito longa que continua e continua e continua.';
      const result = generateExcerpt(content, 'teste', 50);
      expect(result).toMatch(/\.$/); // Should end with period
    });
  });

  describe('calculateSeoScore', () => {
    it('should return high score for well-optimized content', () => {
      const title = 'Criomodelagem: Guia Completo para Redução de Medidas';
      const content = `
        <h2>O que é Criomodelagem</h2>
        <p>A criomodelagem é um procedimento estético avançado que utiliza o frio controlado para tratamento corporal. Este tratamento de criomodelagem oferece resultados excepcionais.</p>
        <h3>Benefícios</h3>
        <ul>
          <li>Redução de gordura localizada</li>
          <li>Melhora da circulação</li>
          <li>Tonificação da pele</li>
        </ul>
        <p>O procedimento de criomodelagem é seguro e eficaz. A criomodelagem tem se mostrado uma excelente opção para quem busca resultados.</p>
        <p>Muitos profissionais recomendam a criomodelagem como primeira escolha. A técnica de criomodelagem é minimamente invasiva.</p>
      `.repeat(3);
      const keyword = 'criomodelagem';
      const slug = 'criomodelagem-guia-completo';

      const { score, feedback } = calculateSeoScore(title, content, keyword, slug);
      expect(score).toBeGreaterThan(60);
    });

    it('should penalize missing keyword in title', () => {
      const title = 'Guia Completo de Tratamentos Estéticos';
      const content = '<p>Conteúdo sobre criomodelagem</p>'.repeat(50);
      const keyword = 'criomodelagem';
      const slug = 'guia-tratamentos';

      const { score, feedback } = calculateSeoScore(title, content, keyword, slug);
      expect(feedback.some(f => f.includes('Palavra-chave não encontrada no título'))).toBe(true);
    });

    it('should penalize short content', () => {
      const title = 'Criomodelagem';
      const content = '<p>Pequeno texto sobre criomodelagem.</p>';
      const keyword = 'criomodelagem';
      const slug = 'criomodelagem';

      const { score, feedback } = calculateSeoScore(title, content, keyword, slug);
      expect(feedback.some(f => f.includes('curto'))).toBe(true);
    });
  });

  describe('validateProfessionalTone', () => {
    it('should detect casual language', () => {
      const content = 'Cara, este tratamento é muito bom, tá ligado?';
      const issues = validateProfessionalTone(content);
      expect(issues.length).toBeGreaterThan(0);
      expect(issues.some(i => i.includes('casual'))).toBe(true);
    });

    it('should detect excessive exclamation marks', () => {
      const content = 'Este tratamento é incrível!!! Você vai amar!!!';
      const issues = validateProfessionalTone(content);
      expect(issues.some(i => i.includes('exclamação'))).toBe(true);
    });

    it('should not flag professional content', () => {
      const content = 'A criomodelagem é um procedimento estético avançado que oferece resultados significativos na redução de medidas.';
      const issues = validateProfessionalTone(content);
      expect(issues.length).toBe(0);
    });
  });
});
