import { Router, Request, Response } from 'express';
import { ValidationSchema, checkSchema } from 'express-validator';
import { validateInput } from '../../middlewares/validate-input';
import { Delivery } from '../../models/orders/delivery';
import { OrderAttrs, Order } from '../../models/orders/order';
import { getAxeEntriesById } from '../../services/contentful';
import { RequestValidationError } from '../../errors/request-validation-error';
import { normilizeAxeEntry } from '../../utils/normalize';
import { arrayToHash } from '../../utils/array-to-hash';

const deliveryOpts = Object.values(Delivery);

const router = Router();

const validationSchema: ValidationSchema = {
  email: {
    isEmail: true,
  },
  name: {
    isLength: { options: { min: 3 } },
  },
  surname: {
    isLength: { options: { min: 3 } },
  },
  phone: {
    isMobilePhone: { options: 'any' },
  },
  delivery: {
    matches: {
      options: new RegExp(deliveryOpts.join('|')),
      errorMessage: `Must be ${deliveryOpts.join(' or ')}`,
    },
  },
  npNumber: {
    isInt: { options: { min: 1 } },
    optional: true,
  },
  ukrAddress: {
    isString: true,
    isLength: { options: { min: 3, max: 255 } },
    optional: true,
  },
  items: {
    isArray: { options: { min: 1 } },
  },
  'items.*.id': {
    isString: true,
    isLength: { options: { min: 3 } },
  },
  'items.*.slug': {
    isSlug: true,
  },
  'items.*.count': {
    isInt: { options: { min: 1, max: 999 } },
  },
};

router.post(
  '/order',
  checkSchema(validationSchema, ['body']),
  validateInput,
  async (req: Request, res: Response) => {
    const {
      email,
      name,
      surname,
      phone,
      delivery,
      npNumber,
      ukrAddress,
      items,
    } = req.body as OrderAttrs;

    // check axes for existence in contentful db;
    const ids = items.map((axe) => axe.id);
    const axes = await getAxeEntriesById(ids);
    if (axes.total !== ids.length) {
      throw new RequestValidationError([
        {
          param: 'items.id',
          msg: 'Non-existent item',
          location: 'body',
          value: '',
        },
      ]);
    }

    const normalizedAxes = axes.items.map(normilizeAxeEntry);

    // Create hash of axes to join easily
    const axesHash = arrayToHash(normalizedAxes, 'id');

    const populatedItems = items.map((item) => ({
      ...item,
      title: axesHash[item.id].title,
      price: axesHash[item.id].price,
      image: axesHash[item.id].image,
    }));

    const order = Order.build({
      email,
      name,
      surname,
      phone,
      delivery,
      npNumber,
      ukrAddress,
      items: populatedItems,
    });

    await order.save();
    res.json(order);
  }
);

export { router as createOrder };
