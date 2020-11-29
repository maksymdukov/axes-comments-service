import { apiRequest } from "utils/request";

export const createSlideApi = (data) =>
  apiRequest({
    method: "POST",
    path: `/admin/slides`,
    data,
  });
