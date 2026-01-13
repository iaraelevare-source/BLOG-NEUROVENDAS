import { Router } from 'express';
import { ContentController } from '../controllers/contentController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', ContentController.list);
router.get('/:id', ContentController.get);
router.post('/', ContentController.create);
router.put('/:id', ContentController.update);
router.delete('/:id', ContentController.delete);

export default router;
