import { Router } from 'express';
import { createCommentRouter } from './user/comments-new';
import { getCommentsBySlug } from './user/comments-get';
import { adminRoutes } from './admin';

const router = Router();

router.use(createCommentRouter);
router.use(getCommentsBySlug);

router.use('/admin', adminRoutes);

export { router };
