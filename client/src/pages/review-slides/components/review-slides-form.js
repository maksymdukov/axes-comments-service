import EntityForm from "components/form/entity-form";
import ImagesField from "components/form/gallery/images-field";
import GutteredField from "components/form/guttered-field";
import { TextField } from "formik-material-ui";
import React, { useCallback } from "react";
import { createReviewSlideApi } from "../apis/create-review-slide.api";
import { updateReviewSlideApi } from "../apis/update-review-slides.api";

const ReviewSlidesForm = (props) => {
  const api = useCallback(async (values, slide) => {
    const data = {
      ...values,
      imageId: values.image[0].id,
    };
    if (slide) {
      // editing
      return updateReviewSlideApi(slide.id, data);
    } else {
      // creating new
      return createReviewSlideApi(data);
    }
  }, []);

  return (
    <EntityForm {...props} api={api}>
      <GutteredField name="name" label="Имя" component={TextField} />
      <GutteredField
        isSingle
        component={ImagesField}
        name="image"
        label="Изображение"
      />
    </EntityForm>
  );
};

export default ReviewSlidesForm;
