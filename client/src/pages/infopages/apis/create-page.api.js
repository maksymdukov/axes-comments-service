import { apiRequest } from "utils/request";

export const createPageApi = (data) =>
  apiRequest({
    method: "POST",
    path: `/admin/pages`,
    data,
  });
