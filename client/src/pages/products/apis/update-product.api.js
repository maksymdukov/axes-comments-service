import { apiRequest } from "utils/request";

export const updateProductApi = (id, data) =>
  apiRequest({
    method: "PATCH",
    path: `/admin/products/${id}`,
    data,
  });
