import { Router } from 'express';
import { CreditController } from '../controllers/creditController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', CreditController.getCredits);
router.get('/history', CreditController.getHistory);

export default router;
