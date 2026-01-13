/**
 * Unit tests for validation utilities
 */

import { describe, it, expect } from 'vitest';
import {
  validatePostInput,
  validatePublishDate,
  validateBrandIdentity,
  validateForPublishing,
  sanitizeInput,
  PostInput,
  EditorialCalendar,
  BrandGuidelines,
} from '../utils/validationUtils';

describe('Validation Utils', () => {
  describe('validatePostInput', () => {
    it('should accept valid input', () => {
      const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      const input: PostInput = {
        theme: 'Benefícios da Criomodelagem',
        mainKeyword: 'criomodelagem',
        content: `Este é um conteúdo válido e extenso que descreve os benefícios da criomodelagem para redução de medidas e melhora do contorno corporal através de técnicas avançadas de estética. A criomodelagem utiliza o frio controlado para estimular a quebra de gordura localizada. Este tratamento é seguro e eficaz quando realizado por profissionais qualificados. Os resultados podem ser observados após algumas sessões.`,
        publishDate: futureDate,
      };

      const result = validatePostInput(input);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject empty theme', () => {
      const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      const input: PostInput = {
        theme: '',
        mainKeyword: 'criomodelagem',
        content: 'Conteúdo válido'.repeat(10),
        publishDate: futureDate,
      };

      const result = validatePostInput(input);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Tema'))).toBe(true);
    });

    it('should reject short content', () => {
      const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      const input: PostInput = {
        theme: 'Título válido',
        mainKeyword: 'criomodelagem',
        content: 'Muito curto',
        publishDate: futureDate,
      };

      const result = validatePostInput(input);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('curto') || e.includes('palavras'))).toBe(true);
    });

    it('should reject invalid date', () => {
      const input: PostInput = {
        theme: 'Título válido',
        mainKeyword: 'criomodelagem',
        content: 'Conteúdo válido'.repeat(10),
        publishDate: 'data-invalida',
      };

      const result = validatePostInput(input);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('data') || e.includes('Data'))).toBe(true);
    });
  });

  describe('validatePublishDate', () => {
    // Use dates that are definitely in the future
    const futureDate1 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const futureDate2 = new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const futureDate3 = new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const calendar: EditorialCalendar = {
      approvedDates: [futureDate1, futureDate2, futureDate3],
      blacklistDates: ['2026-12-25', '2026-01-01'],
      maxPostsPerDay: 3,
      maxPostsPerWeek: 15,
    };

    it('should accept approved date', () => {
      const result = validatePublishDate(`${futureDate1}T10:00:00`, calendar, 0);
      expect(result.isValid).toBe(true);
    });

    it('should reject date in past', () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const result = validatePublishDate(pastDate, calendar, 0);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('passado'))).toBe(true);
    });

    it('should reject blacklisted date', () => {
      const result = validatePublishDate('2026-12-25T10:00:00', calendar, 0);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('bloqueada'))).toBe(true);
    });

    it('should reject unapproved date when approval list exists', () => {
      const unapprovedFutureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      const result = validatePublishDate(unapprovedFutureDate, calendar, 0);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('calendário'))).toBe(true);
    });

    it('should accept any date when approval list is empty', () => {
      const flexibleCalendar: EditorialCalendar = {
        ...calendar,
        approvedDates: [],
      };
      const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
      const result = validatePublishDate(futureDate, flexibleCalendar, 0);
      expect(result.isValid).toBe(true);
    });

    it('should reject when max posts per day is reached', () => {
      const result = validatePublishDate(`${futureDate1}T10:00:00`, calendar, 3);
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('Limite'))).toBe(true);
    });
  });

  describe('validateBrandIdentity', () => {
    const guidelines: BrandGuidelines = {
      allowedTones: ['professional', 'educational'],
      forbiddenWords: ['milagre', 'garantido', 'instantâneo'],
      brandVoice: {
        formal: true,
        technical: true,
        friendly: true,
      },
    };

    it('should accept content without forbidden words', () => {
      const content = 'A criomodelagem é um procedimento estético que oferece resultados significativos.';
      const title = 'Criomodelagem: Guia Completo';
      const result = validateBrandIdentity(content, title, guidelines);
      expect(result.isValid).toBe(true);
    });

    it('should reject content with forbidden words', () => {
      const content = 'Este tratamento milagre garante resultados instantâneos!';
      const title = 'Tratamento Garantido';
      const result = validateBrandIdentity(content, title, guidelines);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should detect overly promotional language', () => {
      const content = 'Compre agora! Oferta imperdível! Último dia!';
      const title = 'Promoção Especial';
      const result = validateBrandIdentity(content, title, guidelines);
      expect(result.isValid).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove script tags from content', () => {
      const input: PostInput = {
        theme: 'Título',
        mainKeyword: 'keyword',
        content: '<script>alert("XSS")</script>Conteúdo seguro',
        publishDate: '2026-01-20T10:00:00',
      };

      const result = sanitizeInput(input);
      expect(result.content).not.toContain('<script>');
    });

    it('should remove javascript: protocol', () => {
      const input: PostInput = {
        theme: 'Título',
        mainKeyword: 'keyword',
        content: '<a href="javascript:alert(\'XSS\')">Link</a>',
        publishDate: '2026-01-20T10:00:00',
      };

      const result = sanitizeInput(input);
      expect(result.content).not.toContain('javascript:');
    });

    it('should remove event handlers', () => {
      const input: PostInput = {
        theme: 'Título',
        mainKeyword: 'keyword',
        content: '<div onclick="alert(\'XSS\')">Conteúdo</div>',
        publishDate: '2026-01-20T10:00:00',
      };

      const result = sanitizeInput(input);
      expect(result.content).not.toContain('onclick=');
    });

    it('should remove angle brackets from plain text fields', () => {
      const input: PostInput = {
        theme: 'Título <script>',
        mainKeyword: 'keyword<>',
        content: 'Conteúdo',
        publishDate: '2026-01-20T10:00:00',
      };

      const result = sanitizeInput(input);
      expect(result.theme).not.toContain('<');
      expect(result.theme).not.toContain('>');
      expect(result.mainKeyword).not.toContain('<');
      expect(result.mainKeyword).not.toContain('>');
    });
  });

  describe('validateForPublishing', () => {
    const calendar: EditorialCalendar = {
      approvedDates: [],
      blacklistDates: [],
      maxPostsPerDay: 3,
      maxPostsPerWeek: 15,
    };

    const guidelines: BrandGuidelines = {
      allowedTones: ['professional', 'educational'],
      forbiddenWords: ['milagre'],
      brandVoice: {
        formal: true,
        technical: true,
        friendly: true,
      },
    };

    it('should accept completely valid input', () => {
      const input: PostInput = {
        theme: 'Benefícios da Criomodelagem para Estética Corporal',
        mainKeyword: 'criomodelagem',
        content: `A criomodelagem é um procedimento estético avançado que utiliza o frio controlado para redução de medidas e melhora do contorno corporal. Este tratamento oferece resultados significativos através de técnicas cientificamente comprovadas. A tecnologia utilizada é segura e eficaz. Os profissionais qualificados garantem a aplicação correta do procedimento. Os pacientes relatam satisfação com os resultados obtidos após o tratamento completo.`,
        publishDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const result = validateForPublishing(input, calendar, guidelines, 0);
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should accumulate all validation errors', () => {
      const input: PostInput = {
        theme: '',
        mainKeyword: 'x',
        content: 'Curto',
        publishDate: 'invalid',
      };

      const result = validateForPublishing(input, calendar, guidelines, 0);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(2);
    });
  });
});
