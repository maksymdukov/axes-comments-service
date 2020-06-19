import { ValidationSchema } from 'express-validator';
import { Delivery } from '../models/orders/delivery';

const deliveryOpts = Object.values(Delivery);

export const orderCredsSchema: ValidationSchema = {
  email: {
    isEmail: true,
  },
  name: {
    isLength: { options: { min: 3, max: 255 } },
  },
  surname: {
    isLength: { options: { min: 3, max: 255 } },
  },
  phone: {
    isMobilePhone: { options: 'any' },
  },
  comments: {
    isLength: { options: { min: 0, max: 1000 } },
    optional: true,
  },
  delivery: {
    matches: {
      options: new RegExp(deliveryOpts.join('|')),
      errorMessage: `Must be ${deliveryOpts.join(' or ')}`,
    },
  },
  npSettlement: {
    isLength: { options: { min: 0, max: 1000 } },
    optional: true,
  },
  npNumber: {
    isInt: { options: { min: 1 } },
    optional: true,
  },
  ukrAddress: {
    isString: true,
    isLength: { options: { min: 0, max: 255 } },
    optional: true,
  },
};
