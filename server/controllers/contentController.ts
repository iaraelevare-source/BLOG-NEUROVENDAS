import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ContentService } from '../services/contentService';
import { AIProviderService } from '../services/aiProviderService';
import { PromptService } from '../services/promptService';
import { CreditService } from '../services/creditService';

export class ContentController {
  static async list(req: AuthRequest, res: Response) {
    try {
      const projectId = req.query.projectId && typeof req.query.projectId === 'string' 
        ? parseInt(req.query.projectId) 
        : undefined;
      const contents = await ContentService.listContents(req.userId!, projectId);
      
      res.json({ contents });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async get(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
      const content = await ContentService.getContentById(id, req.userId!);

      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }

      res.json(content);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req: AuthRequest, res: Response) {
    try {
      const { projectId, title, keyword, type } = req.body;

      const content = await ContentService.createContent({
        userId: req.userId!,
        projectId,
        title,
        keyword,
        type,
        status: 'pending',
      });

      res.status(201).json(content);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
      const updates = req.body;

      const content = await ContentService.updateContent(id, req.userId!, updates);

      if (!content) {
        return res.status(404).json({ error: 'Content not found' });
      }

      res.json(content);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
      await ContentService.deleteContent(id, req.userId!);

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
