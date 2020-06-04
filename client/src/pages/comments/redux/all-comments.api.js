import { apiRequest } from "utils/request";

export const fetchAllCommentsApi = ({ page, size, statusFilter }) => {
  const statusFilterQuery = statusFilter ? `&status=${statusFilter}` : "";
  return apiRequest({
    path: `/admin/comments/?page=${page}&size=${size}${statusFilterQuery}`,
  });
};
