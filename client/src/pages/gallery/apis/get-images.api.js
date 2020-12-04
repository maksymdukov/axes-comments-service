import { apiRequest } from "utils/request";

export const fetchImagesApi = ({ page, size, isAdmin }) => {
  const isAdminQuery = isAdmin ? `&isAdmin=${isAdmin}` : "";
  return apiRequest({
    path: `/admin/images/?page=${page}&size=${size}${isAdminQuery}`,
  });
};
