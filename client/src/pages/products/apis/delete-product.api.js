import { apiRequest } from "utils/request";

export const deleteProductApi = (id) =>
  apiRequest({
    method: "DELETE",
    path: `/admin/products/${id}`,
  });
