import { Router, Response, Request } from 'express';
import { Comment } from '../../models/comments/comment';
import { requireAuth } from '../../middlewares/requireAuth';
import { CommentStatus } from '../../models/comments/status';
import {
  validateStatusQuery,
  validatePagination,
} from '../../utils/custom-validators';
import { validateInput } from '../../middlewares/validate-input';
import { param } from 'express-validator';

const router = Router();

// GET all comments with possible query '?status'
router.get(
  '/comments',
  requireAuth,
  [validateStatusQuery, ...validatePagination],
  validateInput,
  async (req: Request, res: Response) => {
    const { page, size, status } = req.query as {
      page: string;
      size: string;
      status: CommentStatus;
    };
    const comments = await Comment.findByStatusAndSlug({
      page,
      size,
      status,
    });
    res.json(comments);
  }
);

// GET all comments by slug with possible query '?status'
router.get(
  '/comments/:slug',
  requireAuth,
  [validateStatusQuery, param('slug').isString(), ...validatePagination],
  validateInput,
  async (req: Request, res: Response) => {
    const { page, size, status } = req.query as {
      page: string;
      size: string;
      status: CommentStatus;
    };
    const comments = await Comment.findByStatusAndSlug({
      page,
      size,
      status,
      slug: req.params.slug,
    });
    res.json(comments);
  }
);

export { router as getAdminComments };
