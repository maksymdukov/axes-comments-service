import { object, string, array } from "yup";

export const reviewSlidesValidation = object().shape({
  name: string().required(),
  image: array().min(1).required(),
});
