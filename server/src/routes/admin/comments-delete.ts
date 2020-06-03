import { Router, Response, Request } from 'express';
import { Comment } from '../../models/comments/comment';
import { requireAuth } from '../../middlewares/requireAuth';
import { checkArrayOfIds } from '../../utils/custom-validators';
import { validateInput } from '../../middlewares/validate-input';
import { body } from 'express-validator';

const router = Router();

// DELETE one or many comments
router.delete(
  '/comments',
  requireAuth,
  body('comments').custom(checkArrayOfIds),
  validateInput,
  async (req: Request, res: Response) => {
    await Comment.deleteMany({ _id: { $in: req.body.comments } });
    res.json({});
  }
);

export { router as deleteComments };
