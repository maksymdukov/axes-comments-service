import { Router, Response, Request } from 'express';
import { Comment } from '../../models/comments/comment';
import { requireAuth } from '../../middlewares/requireAuth';
import {
  checkArrayOfIds,
  checkCommentStatus,
} from '../../utils/custom-validators';
import { validateInput } from '../../middlewares/validate-input';
import { body } from 'express-validator';
import { CommentStatus } from '../../models/comments/status';

const router = Router();

// PATCH change status of one or many comments
router.patch(
  '/comments',
  requireAuth,
  body('comments').custom(checkArrayOfIds),
  body('status').custom(checkCommentStatus),
  validateInput,
  async (req: Request, res: Response) => {
    const {
      comments,
      status,
    }: { comments: string[]; status: CommentStatus } = req.body;
    const response = await Comment.updateMany(
      { _id: { $in: comments } },
      { status }
    );
    res.json({ nModified: response.nModified });
  }
);

export { router as changeCommentStatus };
