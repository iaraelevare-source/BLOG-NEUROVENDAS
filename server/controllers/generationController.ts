import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { AIProviderService } from '../services/aiProviderService';
import { PromptService } from '../services/promptService';
import { ContentService } from '../services/contentService';
import { CreditService } from '../services/creditService';

const CREDITS_PER_GENERATION = 1; // Cost per article generation

export class GenerationController {
  static async generate(req: AuthRequest, res: Response) {
    try {
      const { keyword, type, promptId, variables } = req.body;

      if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
      }

      // Check if user has enough credits
      const credits = await CreditService.getUserCredits(req.userId!);
      if ((credits.remainingCredits || 0) < CREDITS_PER_GENERATION) {
        return res.status(402).json({ 
          error: 'Insufficient credits',
          remaining: credits.remainingCredits || 0,
          required: CREDITS_PER_GENERATION
        });
      }

      // Create content record
      const content = await ContentService.createContent({
        userId: req.userId!,
        keyword,
        type: type || 'procedimento',
        status: 'generating',
      });

      // Determine prompt to use
      let finalPromptId = promptId;
      if (!finalPromptId) {
        // Get default prompt for this type
        const prompts = await PromptService.getActivePromptsByType(type || 'artigo');
        if (prompts.length === 0) {
          return res.status(400).json({ error: 'No active prompt found for this type' });
        }
        finalPromptId = prompts[0].id;
      }

      // Prepare variables
      const promptVariables = {
        keyword,
        type: type || 'procedimento',
        ...variables,
      };

      // Generate content using AI
      const generation = await AIProviderService.generate({
        userId: req.userId!,
        contentId: content.id,
        promptId: finalPromptId,
        variables: promptVariables,
      });

      // Update content with generated text
      await ContentService.updateContent(content.id, req.userId!, {
        content: generation.content,
        status: 'generated',
        generationId: generation.id,
      });

      // Deduct credits
      await CreditService.deductCredits(
        req.userId!,
        'generate_article',
        CREDITS_PER_GENERATION,
        generation.id
      );

      // Get updated content
      const updatedContent = await ContentService.getContentById(content.id, req.userId!);

      res.json({
        content: updatedContent,
        generation: {
          id: generation.id,
          tokensUsed: generation.tokensUsed,
          provider: generation.provider,
        },
        creditsUsed: CREDITS_PER_GENERATION,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStatus(req: AuthRequest, res: Response) {
    try {
      res.json({
        useMockAI: AIProviderService.isUsingMockAI(),
        provider: AIProviderService.isUsingMockAI() ? 'mock' : 'gemini',
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
