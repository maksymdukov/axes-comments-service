import { apiRequest } from "utils/request";

export const updateReviewSlideApi = (id, data) =>
  apiRequest({
    method: "PATCH",
    path: `/admin/review-slides/${id}`,
    data,
  });
