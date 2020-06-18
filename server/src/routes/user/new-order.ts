import { Router, Request, Response } from 'express';
import { ValidationSchema, checkSchema } from 'express-validator';
import { validateInput } from '../../middlewares/validate-input';
import { OrderAttrs, Order } from '../../models/orders/order';
import { getAxeEntriesById } from '../../services/contentful';
import { RequestValidationError } from '../../errors/request-validation-error';
import { normilizeAxeEntry } from '../../utils/normalize';
import { arrayToHash } from '../../utils/array-to-hash';
import {
  renderTemplate,
  transporter,
} from '../../services/nodemailer/nodemailer';
import { config } from '../../config/config';
import { orderCredsSchema } from '../../utils/validation-schemas';

const router = Router();

const validationSchema: ValidationSchema = {
  ...orderCredsSchema,
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
      comments,
    } = req.body as Omit<OrderAttrs, 'customImages'>;

    // check axes for existence in contentful db;
    const ids = items!.map((axe) => axe.id);
    const axes = await getAxeEntriesById(ids);
    if (axes.total !== ids.length) {
      throw new RequestValidationError([
        {
          param: 'items.id',
          msg: 'Non-existent item',
        },
      ]);
    }

    const normalizedAxes = axes.items.map(normilizeAxeEntry);

    // Create hash of axes to join easily
    const axesHash = arrayToHash(normalizedAxes, 'id');

    const populatedItems = items!.map((item) => ({
      ...item,
      title: axesHash[item.id].title,
      price: axesHash[item.id].price,
      image: axesHash[item.id].image,
    }));

    const buildAttrs = {
      email,
      name,
      surname,
      phone,
      comments,
      delivery,
      npNumber,
      ukrAddress,
      items: populatedItems,
    };

    const order = Order.build(buildAttrs);
    await order.save();

    // Send Email to admin
    const html = await renderTemplate('new-order-admin.ejs', buildAttrs);
    await transporter.sendMail({
      from: config.MAIL_USER, // sender address
      to: config.MAIL_USER, // list of receivers
      subject: '[AXES] Новый заказ', // Subject line
      html,
    });
    // TODO
    // Send email to client

    res.json(order);
  }
);

export { router as createOrder };
