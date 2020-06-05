import { Router, Response, Request } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import axios from 'axios';
import { config } from '../../config/config';

const router = Router();

// DELETE one or many comments
router.get('/rebuild', requireAuth, async (req: Request, res: Response) => {
  const response = await axios.get(config.BUILD_FRONTEND_WEBHOOK);
  res.json(response.data);
});

export { router as rebuildFrontend };
