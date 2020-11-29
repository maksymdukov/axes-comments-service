import { apiRequest } from "utils/request";

export const deleteSlideApi = (id) =>
  apiRequest({
    method: "DELETE",
    path: `/admin/slides/${id}`,
  });
