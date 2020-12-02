import { apiRequest } from "utils/request";

export const updatePageApi = (id, data) =>
  apiRequest({
    method: "PATCH",
    path: `/admin/pages/${id}`,
    data,
  });
