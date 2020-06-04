import { apiRequest } from "utils/request";

/**
 *
 * @param {{status: string; comments: string[]}} data
 */
export const approveCommentsApi = (data) => {
  return apiRequest({
    method: "PATCH",
    path: `/admin/comments`,
    data,
  });
};
