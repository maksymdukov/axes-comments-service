import EntityForm from "components/form/entity-form";
import ImagesField from "components/form/gallery/images-field";
import GutteredCheckbox from "components/form/guttered-checkbox";
import GutteredField from "components/form/guttered-field";
import WYSIWYGField from "components/form/wysiwyg/wysiwyg-filed";
import { editorStateToHtml } from "components/wysiwyg/sysiwyg.utils";
import { TextField } from "formik-material-ui";
import React, { useCallback } from "react";
import { createProductApi } from "../apis/create-product.api";
import { updateProductApi } from "../apis/update-product.api";
import TitleField from "./title-field";

const ProductsForm = (props) => {
  const api = useCallback(async (values, product) => {
    const formatedValues = {
      ...values,
      mainImageId: values.mainImage.map((img) => img.id)[0],
      imageIds: values.images.map((img) => img.id),
      ruLongDescription: editorStateToHtml(values.ruLongDescription),
      ukLongDescription: editorStateToHtml(values.ukLongDescription),
    };
    if (product) {
      // editing product
      return updateProductApi(product.id, formatedValues);
    } else {
      // creating new product
      return createProductApi(formatedValues);
    }
  }, []);
  return (
    <EntityForm {...props} api={api}>
      <GutteredCheckbox label="Активный" name="isActive" />
      <GutteredField
        component={TitleField}
        name="ruTitle"
        label="Название (рус)"
      />
      <GutteredField
        component={TextField}
        name="ukTitle"
        label="Название (укр)"
      />
      <GutteredField
        component={TextField}
        multiline
        rows={3}
        name="ruDescription"
        label="Короткое описание (рус)"
      />
      <GutteredField
        component={TextField}
        multiline
        rows={3}
        name="ukDescription"
        label="Короткое описание (укр)"
      />
      <GutteredField
        component={WYSIWYGField}
        name="ruLongDescription"
        label="Длинное описание (рус)"
      />
      <GutteredField
        component={WYSIWYGField}
        name="ukLongDescription"
        label="Длинное описание (укр)"
      />
      <GutteredField
        type="number"
        component={TextField}
        name="price"
        label="Цена"
      />
      <GutteredField component={TextField} name="slug" label="урл" />
      <GutteredField
        isSingle
        component={ImagesField}
        name="mainImage"
        label="Главное изображение"
      />
      <GutteredField
        component={ImagesField}
        name="images"
        label="Изображения"
      />
      <GutteredCheckbox label="Лучший" name="isFeatured" />
    </EntityForm>
  );
};

export default ProductsForm;
