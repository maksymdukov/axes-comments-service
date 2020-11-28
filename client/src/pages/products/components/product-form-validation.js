import { object, bool, string, number, array } from "yup";

export const productFormValidation = object().shape({
  isActive: bool().required(),
  isFeatured: bool().required(),
  ruTitle: string().required(),
  ruDescription: string().required(),
  ruLongDescription: string().required(),
  ukTitle: string().required(),
  ukDescription: string().required(),
  ukLongDescription: string().required(),
  price: number().required(),
  slug: string().required(),
  mainImage: array().required().min(1),
  images: array().required().min(1),
});
