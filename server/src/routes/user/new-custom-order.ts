import { Router, Request, Response } from 'express';
import { File } from 'formidable';
import { parseCustomOrder } from '../../utils/parse-custom-order';
import { checkSchema, ValidationSchema } from 'express-validator';
import { orderCredsSchema } from '../../utils/validation-schemas';
import { validateInput } from '../../middlewares/validate-input';
import { uploadFile } from '../../services/firebase';
import { OrderAttrs, Order } from '../../models/orders/order';
import { randomBytes } from 'crypto';
import {
  renderTemplate,
  transporter,
} from '../../services/nodemailer/nodemailer';
import { config } from '../../config/config';

const router = Router();

const maxFileSize = 1024 * 1024 * 10; // 10 Mb

const validationSchema: ValidationSchema = {
  ...orderCredsSchema,
  files: {
    custom: {
      options: (files) => {
        const fileKeys = Object.keys(files);
        if (!fileKeys.length) {
          return true;
        }
        fileKeys.forEach((fileName) => {
          if (files[fileName].size > maxFileSize) {
            throw new Error('Files are too big');
          }
          if (!/image\/.*/i.test(files[fileName].type)) {
            throw new Error('Incorrect file format');
          }
        });
        return true;
      },
    },
  },
};

router.post(
  '/custom-order',
  parseCustomOrder,
  checkSchema(validationSchema, ['body']),
  validateInput,
  async (req: Request, res: Response) => {
    const {
      files,
      name,
      surname,
      delivery,
      email,
      npNumber,
      phone,
      ukrAddress,
      comments,
    } = req.body as Omit<OrderAttrs, 'items' | 'customImages'> & {
      files: { [k: string]: File };
    };

    // Upload images to firebase storage
    const uploadPromises: ReturnType<typeof uploadFile>[] = [];
    Object.values(files).forEach(({ path, name, type }) => {
      uploadPromises.push(
        uploadFile({
          path,
          name: `${randomBytes(4).toString('hex')}-${name}`,
          type,
          folder: 'custom-order/',
        })
      );
    });
    const results = await Promise.all(uploadPromises);

    const customImages: string[] = [];
    results.forEach(([, apiResponse]) => {
      customImages.push(apiResponse.name);
    });

    const buildAttrs = {
      name,
      delivery,
      email,
      npNumber,
      phone,
      surname,
      ukrAddress,
      comments,
      customImages,
    };

    const customOrder = Order.build(buildAttrs);

    const newOrder = await customOrder.save();

    // Send Email to admin
    const html = await renderTemplate('new-custom-order-admin.ejs', buildAttrs);
    await transporter.sendMail({
      from: config.MAIL_USER, // sender address
      to: config.MAIL_USER, // list of receivers
      subject: '[AXES] Новый индивидуальный заказ', // Subject line
      html,
      attachments: Object.keys(files).map((fileKey) => ({
        filename: files[fileKey].name,
        path: files[fileKey].path,
        contentType: files[fileKey].type,
      })),
    });

    res.send(newOrder);
  }
);

export { router as createCustomOrder };
