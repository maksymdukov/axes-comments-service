import React, { useState } from "react";
import { DialogContent, makeStyles } from "@material-ui/core";
import AlertError from "components/alerts/alert-error";
import ConfirmationActions from "components/dialogs/confirmation-actions";
import GutteredField from "components/form/guttered-field";
import { Form } from "formik";
import { TextField } from "formik-material-ui";
import GutteredCheckbox from "components/form/guttered-checkbox";
import TitleField from "./title-field";
import ImagesField from "./images-field";
import { createProductApi } from "../apis/create-product.api";
import { updateProductApi } from "../apis/update-product.api";

const useStyles = makeStyles(({ palette }) => ({
  greyBG: {
    backgroundColor: palette.grey[400],
  },
}));

const ProductForm = ({
  values,
  handleSubmit,
  submitForm,
  onClose,
  product,
  onCreateSuccess,
  onEditSuccess,
  validateForm,
}) => {
  const classes = useStyles();
  const [error, setError] = useState("");

  const handleSaveClick = async () => {
    const errors = await validateForm();
    if (Object.keys(errors).length) {
      submitForm();
      throw new Error("canceled");
    }
    setError("");
    const formatedValues = {
      ...values,
      mainImageId: values.mainImage.map((img) => img.id)[0],
      imageIds: values.images.map((img) => img.id),
    };
    if (product) {
      // editing product
      return updateProductApi(product.id, formatedValues);
    } else {
      // creating new product
      return createProductApi(formatedValues);
    }
  };
  const onSuccess = (res) => {
    if (product) {
      onEditSuccess(res);
    } else {
      onCreateSuccess(res);
    }
  };

  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <AlertError error={error} />
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
            component={TextField}
            multiline
            rows={4}
            name="ruLongDescription"
            label="Длинное описание (рус)"
          />
          <GutteredField
            component={TextField}
            multiline
            rows={4}
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
        </Form>
      </DialogContent>
      <ConfirmationActions
        className={classes.greyBG}
        onClose={onClose}
        cancelLabel="Отмена"
        confirmLabel="Сохранить"
        confirmBtnProps={{
          fetcher: handleSaveClick,
          onSuccess,
          setError,
        }}
      />
    </>
  );
};

export default ProductForm;
