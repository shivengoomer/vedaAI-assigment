import { Router } from 'express';
import { requireAuth, syncUserMiddleware } from '../middlewares/auth.middleware';
import { getProfile, updateProfile, upgradePlan } from '../controllers/user.controller';

const router = Router();

// Secure all user routes
router.use(requireAuth());
router.use(syncUserMiddleware);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/billing/upgrade', upgradePlan);

export default router;
