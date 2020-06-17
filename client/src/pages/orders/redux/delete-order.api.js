import { apiRequest } from "utils/request";

/**
 *
 * @param {string} orderId
 */
export const deleteOrderApi = (orderId) => {
  return apiRequest({
    method: "DELETE",
    path: `/admin/orders/${orderId}`,
  });
};
