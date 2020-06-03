import { Router } from 'express';
import { Comment } from '../../models/comments/comment';

const router = Router();

router.get('/comments/:slug', async (req, res) => {
  const comments = await Comment.findApprovedBySlug(req.params.slug);
  res.json(comments);
});

export { router as getCommentsBySlug };
