import { apiRequest } from "utils/request";

export const uploadImagesApi = (formData) => {
  return apiRequest({
    method: "POST",
    path: `/admin/images/upload`,
    data: formData,
  });
};
