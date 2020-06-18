import { Router } from 'express';
import { adminRoutes } from './admin';
import { userRoutes } from './user';

const router = Router();

router.use(userRoutes);
router.use('/admin', adminRoutes);

export { router };
