import { apiRequest } from "utils/request";

export const fetchAllOrdersApi = ({ page, size, statusFilter }) => {
  const statusFilterQuery = statusFilter ? `&status=${statusFilter}` : "";
  return apiRequest({
    path: `/admin/orders/?page=${page}&size=${size}${statusFilterQuery}`,
  });
};
