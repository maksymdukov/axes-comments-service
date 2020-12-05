import EntityForm from "components/form/entity-form";
import ImagesField from "components/form/gallery/images-field";
import GutteredField from "components/form/guttered-field";
import { TextField } from "formik-material-ui";
import React, { useCallback } from "react";
import { createSlideApi } from "../apis/create-slide.api";
import { updateSlideApi } from "../apis/update-slides.api";

const SlidesForm = (props) => {
  const api = useCallback(async (values, slide) => {
    const data = {
      ...values,
      bigImageId: values.bigImage[0].id,
      smallImageId: values.smallImage[0].id,
    };
    if (slide) {
      // editing
      return updateSlideApi(slide.id, data);
    } else {
      // creating new
      return createSlideApi(data);
    }
  }, []);

  return (
    <EntityForm {...props} api={api}>
      <GutteredField name="name" label="Имя" component={TextField} />
      <GutteredField
        isSingle
        component={ImagesField}
        name="bigImage"
        label="Большое изображение (1920x664)"
      />
      <GutteredField
        isSingle
        component={ImagesField}
        name="smallImage"
        label="Маленькое изображение (600x450)"
      />
    </EntityForm>
  );
};

export default SlidesForm;
