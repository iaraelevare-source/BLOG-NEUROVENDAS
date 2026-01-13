import { Router } from 'express';
import { GenerationController } from '../controllers/generationController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', GenerationController.generate);
router.get('/status', GenerationController.getStatus);

export default router;
