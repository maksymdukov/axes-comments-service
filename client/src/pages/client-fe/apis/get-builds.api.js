import { apiRequest } from "utils/request";

export const fetchBuilds = () =>
  apiRequest({
    path: "/admin/frontend/build",
  });
