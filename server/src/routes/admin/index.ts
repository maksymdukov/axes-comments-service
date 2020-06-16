import { Router } from 'express';
import { loginRouter } from './login';
import { getAdminComments } from './comments-get';
import { deleteComments } from './comments-delete';
import { changeCommentStatus } from './comments-change-status';
import { getSlugs } from './slugs-get';
import { rebuildFrontend } from './rebuild-frontend';
import { adminOrderRoutes } from './orders';

const router = Router();

router.use(loginRouter);
router.use(getAdminComments);
router.use(deleteComments);
router.use(changeCommentStatus);
router.use(getSlugs);
router.use(rebuildFrontend);

router.use(adminOrderRoutes);

export { router as adminRoutes };
