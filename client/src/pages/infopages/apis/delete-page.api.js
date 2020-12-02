import { apiRequest } from "utils/request";

export const deletePageApi = (id) =>
  apiRequest({
    method: "DELETE",
    path: `/admin/pages/${id}`,
  });
