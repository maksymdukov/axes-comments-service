import { apiRequest } from "utils/request";

export const updateCommentStatusApi = (id, data) => {
  return apiRequest({
    method: "PATCH",
    path: `/admin/comments/${id}`,
    data,
  });
};
