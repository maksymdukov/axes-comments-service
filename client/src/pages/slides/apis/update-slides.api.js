import { apiRequest } from "utils/request";

export const updateSlideApi = (id, data) =>
  apiRequest({
    method: "PATCH",
    path: `/admin/slides/${id}`,
    data,
  });
