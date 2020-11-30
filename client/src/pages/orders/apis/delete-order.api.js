import { apiRequest } from "utils/request";

export const deleteOrderApi = (id) => {
  return apiRequest({
    method: "DELETE",
    path: `/admin/orders/${id}`,
  });
};
