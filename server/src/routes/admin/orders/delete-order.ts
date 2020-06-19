import { Router, Response, Request } from 'express';
import { requireAuth } from '../../../middlewares/requireAuth';
import { validateInput } from '../../../middlewares/validate-input';
import { Order } from '../../../models/orders/order';
import { param } from 'express-validator';
import { RequestValidationError } from '../../../errors/request-validation-error';

const router = Router();

router.delete(
  '/orders/:orderId',
  requireAuth,
  [param('orderId').isString().isMongoId()],
  validateInput,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new RequestValidationError([
        { param: 'orderId', msg: 'Not found' },
      ]);
    }
    await order.remove();
    res.json({});
  }
);

export { router as deleteOrder };
