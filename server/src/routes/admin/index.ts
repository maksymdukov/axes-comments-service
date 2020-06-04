import { Router } from 'express';
import { loginRouter } from './login';
import { getAdminComments } from './comments-get';
import { deleteComments } from './comments-delete';
import { changeCommentStatus } from './comments-change-status';
import { getSlugs } from './slugs-get';

const router = Router();

router.use(loginRouter);
router.use(getAdminComments);
router.use(deleteComments);
router.use(changeCommentStatus);
router.use(getSlugs);

export { router as adminRoutes };