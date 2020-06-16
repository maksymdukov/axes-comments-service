import { Router, Response, Request } from 'express';
import { requireAuth } from '../../../middlewares/requireAuth';
import { checkStatus } from '../../../utils/custom-validators';
import { validateInput } from '../../../middlewares/validate-input';
import { OrderStatus } from '../../../models/orders/status';
import { Order } from '../../../models/orders/order';
import { param, body } from 'express-validator';

const router = Router();

router.patch(
  '/orders/:orderId',
  requireAuth,
  [
    param('orderId').isString().isMongoId(),
    body('status').custom(checkStatus(OrderStatus)),
  ],
  validateInput,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const status = req.body.status as OrderStatus;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    // TODO
    // if (status === OrderStatus.processing) {
    //   // email user that Order is being processed
    // }
    // TODO
    // if (status === OrderStatus.completed) {
    //   // email user and ask for review
    // }
    order.status = status;
    await order.save();
    res.json(order);
  }
);

export { router as changeOrderStatus };
