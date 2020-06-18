import { apiRequest } from "utils/request";

/**
 *
 * @param {string} orderId
 * @param {{status: string}} data
 */
export const changeOrderStatusApi = (orderId, data) => {
  return apiRequest({
    method: "PATCH",
    path: `/admin/orders/${orderId}`,
    data,
  });
};
