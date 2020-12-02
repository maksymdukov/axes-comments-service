import { apiRequest } from "utils/request";

export const fetchPagesApi = ({ page, size }) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("size", size);
  return apiRequest({
    method: "GET",
    path: `/admin/pages/?${params.toString()}`,
  });
};
