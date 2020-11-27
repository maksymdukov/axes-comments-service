import { apiRequest } from "utils/request";

export const updateImagesApi = (images) => {
  return apiRequest({
    method: "PATCH",
    path: `/admin/images`,
    data: images,
  });
};
