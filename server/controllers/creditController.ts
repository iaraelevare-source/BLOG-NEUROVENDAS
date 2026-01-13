import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { CreditService } from '../services/creditService';

export class CreditController {
  static async getCredits(req: AuthRequest, res: Response) {
    try {
      const credits = await CreditService.getUserCredits(req.userId!);
      res.json(credits);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getHistory(req: AuthRequest, res: Response) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const history = await CreditService.getCreditHistory(req.userId!, limit);
      res.json({ history });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
