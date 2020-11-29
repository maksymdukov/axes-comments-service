import React, { useMemo } from "react";
import Entities from "components/entity/entities";
import {
  fetchSlides,
  getSlides,
  getSlidesLoading,
  getSlidesPagination,
  updateSlidesPagination,
} from "./redux/slides-slice";
import { deleteSlideApi } from "./apis/delete-slides.api";
import SlidesForm from "./components/slides-form";
import { getSlidesColumns } from "./utils/slides.utils";
import { slidesValidation } from "./utils/create-slide.validation";

export const useInitialValues = ({ entity }) => {
  return useMemo(
    () => ({
      name: (entity && entity.name) || "",
      bigImage: (entity && entity.bigImage && [entity.bigImage]) || [],
      smallImage: (entity && entity.smallImage && [entity.smallImage]) || [],
    }),
    [entity]
  );
};

const Slides = () => {
  const entityOptions = useMemo(
    () => ({
      getPagination: getSlidesPagination,
      getEntities: getSlides,
      getEntitiesLoading: getSlidesLoading,
      fetchEntities: fetchSlides,
      updatePagination: updateSlidesPagination,
      deleteEntityApi: deleteSlideApi,
    }),
    []
  );

  const modalOptions = useMemo(
    () => ({
      useInitialValues,
      validationSchema: slidesValidation,
      EntityForm: SlidesForm,
    }),
    []
  );

  return (
    <Entities
      title="Слайды"
      getEntitiesColumns={getSlidesColumns}
      entityOptions={entityOptions}
      modalOptions={modalOptions}
    ></Entities>
  );
};

export default Slides;
