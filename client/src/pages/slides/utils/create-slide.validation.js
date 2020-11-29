import { object, bool, string, number, array } from "yup";

export const slidesValidation = object().shape({
  name: string().required(),
  bigImage: array().min(1).required(),
  smallImage: array().min(1).required(),
});
