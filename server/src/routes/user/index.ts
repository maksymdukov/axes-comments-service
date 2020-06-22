import { Router } from 'express';
import { getCommentsBySlug } from './comments-get';
import { createCommentRouter } from './comments-new';
import { createOrder } from './new-order';
import { createCustomOrder } from './new-custom-order';
import { sendPersonalMessage } from './send-pm';

const router = Router();

router.use(getCommentsBySlug);
router.use(createCommentRouter);
router.use(createOrder);
router.use(createCustomOrder);
router.use(sendPersonalMessage);

export { router as userRoutes };
