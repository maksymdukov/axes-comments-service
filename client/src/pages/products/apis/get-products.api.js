import { apiRequest } from "utils/request";

export const fetchProductsApi = ({ page, size, active, featured }) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("size", size);
  if (active) {
    params.append("isActive", active);
  }
  if (featured) {
    params.append("isFeatured", featured);
  }
  return apiRequest({
    method: "GET",
    path: `/admin/products/?${params.toString()}`,
  });
};
