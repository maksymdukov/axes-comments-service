import { apiRequest } from "utils/request";

export const deleteImagesApi = (ids) =>
  apiRequest({
    method: "DELETE",
    path: `/admin/images`,
    data: { ids },
  });
