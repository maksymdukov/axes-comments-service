import { apiRequest } from "utils/request";

export const fetchCommentsApi = ({ page, size, slug, statusFilter }) => {
  const statusFilterQuery = statusFilter ? `&status=${statusFilter}` : "";
  return apiRequest({
    path: `/admin/comments/${slug}?page=${page}&size=${size}${statusFilterQuery}`,
  });
};
