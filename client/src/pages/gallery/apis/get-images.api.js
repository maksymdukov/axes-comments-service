import { apiRequest } from "utils/request";

export const fetchImagesApi = ({ page, size }) => {
  return apiRequest({
    path: `/admin/images/?page=${page}&size=${size}`,
  });
};
