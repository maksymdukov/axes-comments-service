import { apiRequest } from "utils/request";

export const fetchAxesApi = ({ page, size }) => {
  return apiRequest({ path: `/admin/slugs?page=${page}&size=${size}` });
};
