import { Router, Response, Request } from 'express';
import { Comment } from '../../models/comments/comment';
import { requireAuth } from '../../middlewares/requireAuth';
import { CommentStatus } from '../../models/comments/status';
import {
  validateCommentStatus,
  validatePagination,
} from '../../utils/custom-validators';
import { validateInput } from '../../middlewares/validate-input';
import { param } from 'express-validator';
import { contentfulClient } from '../../services/contentful';
import {
  AxeEntry,
  normilizeAxeEntry,
  NormilizedAxe,
} from '../../utils/normalize';
import { arrayToHash } from '../../utils/array-to-hash';

const router = Router();

// GET all comments with possible query '?status'
router.get(
  '/comments',
  requireAuth,
  [validateCommentStatus, ...validatePagination],
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

    // Retrieve axes from contentful
    const slugs = comments.items.map((comment) => comment.slug).join(',');
    const axes = await contentfulClient.getEntries<AxeEntry>({
      content_type: 'axe',
      locale: 'ru',
      select: 'fields',
      'fields.slug[in]': slugs,
    });
    const normalizedAxes = axes.items.map(normilizeAxeEntry);

    // Create hash of axes to join easily
    const axesHash = arrayToHash(normalizedAxes, 'slug');

    // Join axes with comments
    const commentsWithAxes = comments.items.map((comment) => {
      const combined = comment.toJSON();
      combined.axe = axesHash[comment.slug];
      return combined;
    });

    res.json({
      total: comments.total,
      size: comments.size,
      page: comments.page,
      items: commentsWithAxes,
    });
  }
);

// GET all comments by slug with possible query '?status'
router.get(
  '/comments/:slug',
  requireAuth,
  [validateCommentStatus, param('slug').isString(), ...validatePagination],
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

    const axes = await contentfulClient.getEntries<AxeEntry>({
      content_type: 'axe',
      locale: 'ru',
      select: 'fields',
      'fields.slug': req.params.slug,
    });
    let axe: NormilizedAxe | undefined;
    if (axes.items.length) {
      axe = normilizeAxeEntry(axes.items[0]);
    }
    res.json({
      ...comments,
      ...(axe && { axe }),
    });
  }
);

export { router as getAdminComments };
