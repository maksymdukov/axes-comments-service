import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validateInput } from '../../middlewares/validate-input';
import { Comment } from '../../models/comments/comment';

const router = Router();

router.post(
  '/comments',
  [
    body('slug').isLength({ min: 3 }).withMessage('slug is required'),
    body('name').isLength({ min: 3 }).withMessage('name is required'),
    body('message').isLength({ min: 3 }).withMessage('message is required'),
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('rating should be between 1 and 5'),
  ],
  validateInput,
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug, name, message, rating } = req.body;
    const comment = Comment.build({
      author: { name },
      message,
      slug,
      rating,
    });
    await comment.save();
    res.json(comment);
  }
);

export { router as createCommentRouter };
