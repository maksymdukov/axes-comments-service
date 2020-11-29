import { apiRequest } from "utils/request";

export const createReviewSlideApi = (data) =>
  apiRequest({
    method: "POST",
    path: `/admin/review-slides`,
    data,
  });
