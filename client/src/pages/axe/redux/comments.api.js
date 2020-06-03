import { apiRequest } from "utils/request";

export const fetchCommentsApi = ({ page, size, slug }) => {
  return apiRequest({
    path: `/admin/comments/${slug}?page=${page}&size=${size}`,
  });
};
