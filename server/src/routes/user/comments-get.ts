import { Router, Request, Response } from 'express';
import { Comment } from '../../models/comments/comment';
import { validatePagination } from '../../utils/custom-validators';
import { validateInput } from '../../middlewares/validate-input';

const router = Router();

router.get(
  '/comments/:slug',
  validatePagination,
  validateInput,
  async (req: Request, res: Response) => {
    const { page, size } = req.query as {
      page: string;
      size: string;
    };
    const comments = await Comment.findApprovedBySlug({
      slug: req.params.slug,
      page,
      size,
    });
    res.json(comments);
  }
);

export { router as getCommentsBySlug };
