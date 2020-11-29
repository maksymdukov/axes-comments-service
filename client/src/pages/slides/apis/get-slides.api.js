import { apiRequest } from "utils/request";

export const fetchSlidesApi = ({ page, size, active }) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("size", size);
  if (active) {
    params.append("isActive", active);
  }
  return apiRequest({
    method: "GET",
    path: `/admin/slides/?${params.toString()}`,
  });
};
