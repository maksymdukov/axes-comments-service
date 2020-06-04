import { apiRequest } from "utils/request";

/**
 *
 * @param {{ comments: string[]}} data
 */
export const deleteCommentsApi = (data) => {
  return apiRequest({
    method: "DELETE",
    path: `/admin/comments`,
    data,
  });
};
