import { validateDraftjs } from "components/form/wysiwyg/validator";
import { object, bool, string, number, array, mixed } from "yup";

export const productFormValidation = object().shape({
  isActive: bool().required(),
  isFeatured: bool().required(),
  ruTitle: string().required(),
  ruDescription: string().required(),
  ruLongDescription: mixed()
    .required()
    .test(...validateDraftjs()),
  ukTitle: string().required(),
  ukDescription: string().required(),
  ukLongDescription: mixed()
    .required()
    .test(...validateDraftjs()),
  price: number().required(),
  slug: string().required(),
  mainImage: array().required().min(1),
  images: array().required().min(1),
});
