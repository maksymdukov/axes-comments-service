import { Router } from 'express';
import { getAdminOrders } from './get-orders';

const router = Router();

router.use(getAdminOrders);

export { router as adminOrderRoutes };
