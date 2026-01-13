import { Router } from 'express';
import { GenerationController } from '../controllers/generationController';
import { authMiddleware } from '../middleware/auth';
import { generationLimiter } from '../middleware/rateLimiter';

const router = Router();

router.use(authMiddleware);

router.post('/', generationLimiter, GenerationController.generate);
router.get('/status', GenerationController.getStatus);

export default router;
