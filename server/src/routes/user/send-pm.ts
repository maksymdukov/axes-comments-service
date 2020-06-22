import { Router, Request, Response } from 'express';
import { ValidationSchema, checkSchema } from 'express-validator';
import { validateInput } from '../../middlewares/validate-input';
import {
  renderTemplate,
  transporter,
} from '../../services/nodemailer/nodemailer';
import { config } from '../../config/config';

const router = Router();

const schema: ValidationSchema = {
  name: {
    isLength: { options: { min: 3, max: 255 } },
  },
  email: {
    isEmail: true,
  },
  phone: {
    optional: true,
    isMobilePhone: { options: 'any' },
  },
  message: {
    isLength: { options: { min: 3, max: 5000 } },
  },
};

router.post(
  '/send-pm',
  checkSchema(schema, ['body']),
  validateInput,
  async (req: Request, res: Response) => {
    const { name, email, phone, message } = req.body as {
      name: string;
      email: string;
      phone: string;
      message: string;
    };

    // Send Email to admin
    const html = await renderTemplate('personal-message.ejs', {
      name,
      email,
      phone,
      message,
    });

    await transporter.sendMail({
      from: config.MAIL_USER, // sender address
      to: config.MAIL_USER, // list of receivers
      subject: '[AXES] Сообщение через сайт', // Subject line
      html,
    });

    res.json({});
  }
);

export { router as sendPersonalMessage };
