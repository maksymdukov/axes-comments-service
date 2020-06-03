import { Router, Response, Request } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { contentfulClient } from '../../services/contentful';
import { validatePagination } from '../../utils/custom-validators';
import { validateInput } from '../../middlewares/validate-input';
import { getPaginationQuery } from '../../utils/pagination';
import { normilizeAxeEntry, AxeEntry } from '../../utils/normalize';
import { Comment } from '../../models/comments/comment';

const router = Router();

// get SLUGS that comments tied to
router.get(
  '/slugs',
  requireAuth,
  [...validatePagination],
  validateInput,
  async (req: Request, res: Response) => {
    const { page, size } = req.query as {
      page: string;
      size: string;
    };
    const { pgQuery, pg, sz } = getPaginationQuery({ page, size });

    const axes = await contentfulClient.getEntries<AxeEntry>({
      content_type: 'axe',
      locale: 'ru',
      select: 'fields',
      order: '-sys.createdAt',
      ...pgQuery,
    });
    const countedAxes = await Comment.countPendingBySlugs(axes.items);
    const normalized = countedAxes.map(normilizeAxeEntry);

    res.json({
      total: axes.total,
      page: pg,
      size: sz,
      items: normalized,
    });
  }
);

export { router as getSlugs };
