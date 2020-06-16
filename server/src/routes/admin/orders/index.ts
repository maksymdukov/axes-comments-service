import { Router } from 'express';
import { getAdminOrders } from './get-orders';
import { changeOrderStatus } from './change-status';
import { deleteOrder } from './delete-order';

const router = Router();

router.use(getAdminOrders);
router.use(changeOrderStatus);
router.use(deleteOrder);

export { router as adminOrderRoutes };
