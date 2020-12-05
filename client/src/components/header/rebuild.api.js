import { apiRequest } from "utils/request";

export const rebuildFrontendApi = () => {
  return apiRequest({
    path: `/admin/frontend/rebuild`,
  });
};
