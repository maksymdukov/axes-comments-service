import { apiRequest } from "utils/request";

export const deleteCommentApi = (id) => {
  return apiRequest({
    method: "DELETE",
    path: `/admin/comments/${id}`,
  });
};
