import { Router } from 'express';
import { getCommentsBySlug } from './comments-get';
import { createCommentRouter } from './comments-new';
import { createOrder } from './new-order';

const router = Router();

router.use(getCommentsBySlug);
router.use(createCommentRouter);
router.use(createOrder);

export { router as userRoutes };
