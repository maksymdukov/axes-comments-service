import { Router, Response, Request } from 'express';
import { requireAuth } from '../../../middlewares/requireAuth';
import { validatePagination } from '../../../utils/custom-validators';
import { validateInput } from '../../../middlewares/validate-input';
import { validateOrderStatus } from '../../../utils/custom-validators';
import { OrderStatus } from '../../../models/orders/status';
import { Order } from '../../../models/orders/order';

const router = Router();

// GET all orders with possible query '?status and pagination'
router.get(
  '/orders',
  requireAuth,
  [validateOrderStatus, ...validatePagination],
  validateInput,
  async (req: Request, res: Response) => {
    const { page, size, status } = req.query as {
      page: string;
      size: string;
      status: OrderStatus;
    };
    const orders = await Order.findAllPaginated({ page, size, status });
    res.json(orders);
  }
);

export { router as getAdminOrders };
