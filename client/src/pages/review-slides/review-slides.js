import React, { useMemo } from "react";
import Entities from "components/entity/entities";
import {
  fetchReviewSlides,
  getReviewSlides,
  getReviewSlidesLoading,
  getReviewSlidesPagination,
  updateReviewSlidesPagination,
} from "./redux/review-slides-slice";
import { deleteReviewSlideApi } from "./apis/delete-review-slides.api";
import { getSlidesColumns } from "./utils/slides.utils";
import { reviewSlidesValidation } from "./utils/create-review-slide.validation";
import ReviewSlidesForm from "./components/review-slides-form";

export const useInitialValues = ({ entity }) => {
  return useMemo(
    () => ({
      name: (entity && entity.name) || "",
      image: (entity && entity.image && [entity.image]) || [],
    }),
    [entity]
  );
};

const ReviewSlides = () => {
  const entityOptions = useMemo(
    () => ({
      getPagination: getReviewSlidesPagination,
      getEntities: getReviewSlides,
      getEntitiesLoading: getReviewSlidesLoading,
      fetchEntities: fetchReviewSlides,
      updatePagination: updateReviewSlidesPagination,
      deleteEntityApi: deleteReviewSlideApi,
    }),
    []
  );

  const modalOptions = useMemo(
    () => ({
      useInitialValues,
      validationSchema: reviewSlidesValidation,
      EntityForm: ReviewSlidesForm,
    }),
    []
  );

  return (
    <Entities
      title="Слайды обзоров"
      getEntitiesColumns={getSlidesColumns}
      entityOptions={entityOptions}
      modalOptions={modalOptions}
    ></Entities>
  );
};

export default ReviewSlides;
