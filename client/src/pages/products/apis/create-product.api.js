import { apiRequest } from "utils/request";

export const createProductApi = (data) =>
  apiRequest({
    method: "POST",
    path: `/admin/products`,
    data,
  });
