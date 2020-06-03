import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateInput } from '../../middlewares/validate-input';
import jsonwebtoken from 'jsonwebtoken';
import { getDecodedGoogleToken } from '../../services/google';
import { AuthorizationError } from '../../errors/authorization-error';
import { config } from '../../config/config';

const router = Router();

// TODO move to DB
const adminEmails = [config.ADMIN_EMAIL];

router.post(
  '/login',
  body('code').isString().withMessage('Code should be a string'),
  validateInput,
  async (req: Request, res: Response) => {
    const { code }: { code: string } = req.body;
    const decodedGoogleToken = await getDecodedGoogleToken(code);
    if (adminEmails.includes(decodedGoogleToken.email)) {
      const ownToken = jsonwebtoken.sign(
        { email: decodedGoogleToken.email },
        config.JWT_KEY,
        {
          expiresIn: '2 days',
        }
      );
      return res.json(ownToken);
    }
    throw new AuthorizationError();
  }
);

export { router as loginRouter };
