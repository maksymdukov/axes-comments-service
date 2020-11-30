import { apiRequest } from "utils/request";

export const updateOrderStatusApi = (id, data) => {
  return apiRequest({
    method: "PATCH",
    path: `/admin/comments/${id}`,
    data,
  });
};
