import { apiRequest } from "utils/request";

export const deleteReviewSlideApi = (id) =>
  apiRequest({
    method: "DELETE",
    path: `/admin/review-slides/${id}`,
  });
