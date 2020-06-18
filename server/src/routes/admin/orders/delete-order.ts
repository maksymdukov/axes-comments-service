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
    const result = await Order.deleteOne({ _id: orderId });
    if (!result.deletedCount) {
      throw new RequestValidationError([
        { param: 'orderId', msg: 'Not found' },
      ]);
    }
    // TODO delete custom-order/images from google bucket
    res.json(result);
  }
);

export { router as deleteOrder };
