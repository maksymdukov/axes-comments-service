import { apiRequest } from "utils/request";

export const cancelBuild = ({ id }) =>
  apiRequest({
    method: "PATCH",
    path: `/admin/frontend/build/${id}`,
  });
