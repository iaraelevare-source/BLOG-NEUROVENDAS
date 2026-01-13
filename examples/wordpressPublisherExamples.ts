/**
 * Example usage of WordPress Publisher
 * This demonstrates how to use the automated publishing system
 */

import { WordPressPublisher } from '../services/wordpressPublisher';
import { PostInput } from '../utils/validationUtils';
import { defaultEditorialCalendar, defaultBrandGuidelines } from '../config/publisherConfig';

// Example: Initialize the publisher
export function initializePublisher() {
  const publisher = new WordPressPublisher({
    wordpress: {
      siteUrl: 'https://seusite.com.br',
      username: 'seu_usuario',
      applicationPassword: 'xxxx xxxx xxxx xxxx xxxx xxxx',
    },
    calendar: defaultEditorialCalendar,
    brandGuidelines: defaultBrandGuidelines,
  });

  return publisher;
}

// Example 1: Simple post publishing
export async function example1_SimplePost() {
  const publisher = initializePublisher();

  const postInput: PostInput = {
    theme: 'Benefícios da Criomodelagem',
    mainKeyword: 'criomodelagem',
    content: `
## O que é Criomodelagem?

A criomodelagem é um procedimento estético avançado que utiliza o frio controlado para tratamento corporal.

## Principais Benefícios

* Redução de gordura localizada
* Melhora da circulação sanguínea
* Tonificação da pele
* Resultados visíveis rapidamente

### Como Funciona

O equipamento aplica temperaturas controladas que estimulam a quebra de gordura e melhoram a aparência da pele.
    `,
    publishDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    category: 'Estética Corporal',
  };

  const result = await publisher.publishPost(postInput);
  
  console.log('Result:', result);
  return result;
}

// Example 2: Scheduled post with custom CTA
export async function example2_ScheduledPostWithCTA() {
  const publisher = initializePublisher();

  const customCTA = `
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; color: white; text-align: center;">
  <h3 style="color: white; margin-bottom: 1rem;">🌟 Agende sua Avaliação Gratuita</h3>
  <p style="margin-bottom: 1.5rem;">Descubra como a criomodelagem pode transformar seu corpo!</p>
  <a href="/contato" style="display: inline-block; background: white; color: #667eea; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
    Quero agendar agora
  </a>
</div>
  `;

  const postInput: PostInput = {
    theme: 'Tratamentos Faciais para Rejuvenescimento',
    mainKeyword: 'tratamentos faciais',
    content: `
## Rejuvenescimento Facial: As Melhores Técnicas

O rejuvenescimento facial envolve diversos tratamentos que ajudam a manter a pele jovem e saudável.

### Técnicas Mais Eficazes

1. Limpeza de pele profunda
2. Peeling químico
3. Radiofrequência
4. Microagulhamento

## Benefícios dos Tratamentos

Os tratamentos faciais oferecem diversos benefícios para a saúde da pele:

* Redução de rugas e linhas de expressão
* Melhora da textura da pele
* Uniformização do tom
* Estímulo da produção de colágeno

### Cuidados Pós-Tratamento

É importante seguir as orientações do profissional para garantir os melhores resultados.
    `,
    publishDate: '2026-01-25T14:00:00',
    category: 'Estética Facial',
    cta: customCTA,
  };

  const result = await publisher.publishPost(postInput);
  
  console.log('Result:', result);
  return result;
}

// Example 3: Preview before publishing
export async function example3_PreviewFirst() {
  const publisher = initializePublisher();

  const postInput: PostInput = {
    theme: 'Drenagem Linfática: Indicações e Benefícios',
    mainKeyword: 'drenagem linfática',
    content: `
## Drenagem Linfática Manual

A drenagem linfática é uma técnica de massagem suave que estimula o sistema linfático.

### Principais Indicações

* Retenção de líquidos
* Pós-operatório de cirurgias plásticas
* Celulite
* Inchaço nas pernas

## Como é Feita

O procedimento utiliza movimentos específicos que seguem o fluxo da linfa no corpo.

### Contraindicações

É importante consultar um profissional antes de realizar o procedimento, especialmente em casos de:

- Infecções agudas
- Trombose
- Problemas cardíacos graves
    `,
    publishDate: '2026-01-22T09:00:00',
    category: 'Procedimentos',
  };

  // First, preview the post
  console.log('=== PREVIEW ===');
  const preview = await publisher.previewPost(postInput);
  
  console.log('Title:', preview.title);
  console.log('Slug:', preview.slug);
  console.log('SEO Score:', preview.seoScore);
  console.log('SEO Feedback:', preview.seoFeedback);
  console.log('Validation Errors:', preview.validationErrors);

  // If preview looks good and no validation errors, publish
  if (preview.validationErrors.length === 0) {
    console.log('\n=== PUBLISHING ===');
    const result = await publisher.publishPost(postInput);
    console.log('Result:', result);
    return result;
  } else {
    console.log('\n❌ Cannot publish - validation errors found');
    return { success: false, errors: preview.validationErrors };
  }
}

// Example 4: Verify connection before publishing
export async function example4_VerifyConnection() {
  const publisher = initializePublisher();

  console.log('Checking WordPress connection...');
  const isConnected = await publisher.verifyConnection();

  if (isConnected) {
    console.log('✅ Successfully connected to WordPress');
    
    // Get available categories
    const categories = await publisher.getCategories();
    console.log('Available categories:', categories.map(c => c.name));
    
    return true;
  } else {
    console.log('❌ Failed to connect to WordPress');
    console.log('Please check your credentials in .env.local');
    return false;
  }
}

// Example 5: Bulk publishing with validation
export async function example5_BulkPublish() {
  const publisher = initializePublisher();

  const posts: PostInput[] = [
    {
      theme: 'Microagulhamento: Técnica e Resultados',
      mainKeyword: 'microagulhamento',
      content: '## Microagulhamento\n\nTécnica que estimula produção de colágeno...',
      publishDate: '2026-01-20T10:00:00',
      category: 'Procedimentos',
    },
    {
      theme: 'Peeling Químico: Tipos e Indicações',
      mainKeyword: 'peeling químico',
      content: '## Peeling Químico\n\nRenova a pele através de ácidos...',
      publishDate: '2026-01-21T10:00:00',
      category: 'Procedimentos',
    },
    {
      theme: 'Radiofrequência Facial: Como Funciona',
      mainKeyword: 'radiofrequência facial',
      content: '## Radiofrequência\n\nTrata flacidez usando ondas eletromagnéticas...',
      publishDate: '2026-01-22T10:00:00',
      category: 'Estética Facial',
    },
  ];

  const results = [];

  for (const post of posts) {
    console.log(`\nPublishing: ${post.theme}`);
    
    // Dry run first to validate
    const dryRunResult = await publisher.publishPost(post, { dryRun: true });
    
    if (dryRunResult.success && dryRunResult.seoScore && dryRunResult.seoScore >= 60) {
      // SEO score is good, proceed with actual publishing
      const result = await publisher.publishPost(post);
      results.push(result);
      console.log(`✅ Published: ${result.postUrl}`);
    } else {
      console.log(`⚠️ Skipped (SEO score too low): ${dryRunResult.seoScore}/100`);
      results.push(dryRunResult);
    }

    // Wait a bit between posts to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return results;
}
