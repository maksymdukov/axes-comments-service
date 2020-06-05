import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateInput } from '../../middlewares/validate-input';
import { Comment } from '../../models/comments/comment';

const router = Router();

router.post(
  '/comments',
  [
    body('slug').isLength({ min: 3 }).withMessage('slug is required'),
    body('email').isEmail().withMessage('email is required'),
    body('name').isLength({ min: 3 }).withMessage('name is required'),
    body('message').isLength({ min: 3 }).withMessage('message is required'),
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('rating should be between 1 and 5'),
  ],
  validateInput,
  async (req: Request, res: Response) => {
    const { slug, name, message, rating, email } = req.body;
    const comment = Comment.build({
      author: { name, email },
      message,
      slug,
      rating,
    });
    await comment.save();
    res.json(comment);
  }
);

export { router as createCommentRouter };
