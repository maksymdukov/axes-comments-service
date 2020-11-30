import { apiRequest } from "utils/request";

export const fetchAllCommentsApi = ({ page, size, status }) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("size", size);
  if (status) {
    params.append("status", status);
  }
  return apiRequest({
    path: `/admin/comments/?${params.toString()}`,
  });
};
