import React, { useState } from "react";
import { Form } from "formik";
import { TextField } from "formik-material-ui";
import GutteredField from "components/form/guttered-field";
import { DialogContent, makeStyles } from "@material-ui/core";
import ConfirmationActions from "components/dialogs/confirmation-actions";
import { updateImagesApi } from "../apis/update-images.api";
import AlertError from "components/alerts/alert-error";
import FieldLike from "components/form/field-like";

const useStyles = makeStyles({
  form: {
    minWidth: 200,
    fontWeight: "400",
    letterSpacing: "0.00938em",
  },
});

const EditImageForm = ({
  values,
  handleSubmit,
  closeModal,
  isValid,
  onSuccessfulSubmit,
  image,
}) => {
  const classes = useStyles();
  const [error, setError] = useState("");

  const handleSaveClick = async () => {
    setError("");
    const images = [
      { id: image.id, language: "uk", title: values.titleUk },
      { id: image.id, language: "ru", title: values.titleRu },
    ];
    return updateImagesApi({ images });
  };

  const onSuccess = (resp) => {
    closeModal();
    onSuccessfulSubmit && onSuccessfulSubmit(resp);
  };

  const onFail = (err) => {
    console.dir(err);
    setError(
      (err.response && err.response.data && err.response.data.message) ||
        "Что-то пошло не так"
    );
  };
  return (
    <>
      <DialogContent>
        <Form onSubmit={handleSubmit} className={classes.form}>
          <AlertError error={error} />
          <GutteredField
            fullWidth
            component={TextField}
            label="Название (укр)"
            name="titleUk"
          />
          <GutteredField
            fullWidth
            component={TextField}
            label="Название (рус)"
            name="titleRu"
          />
          <FieldLike label="Width" value={image.width} />
          <FieldLike label="Height" value={image.height} />
        </Form>
      </DialogContent>
      <ConfirmationActions
        cancelLabel="Отмена"
        confirmLabel="Сохранить"
        confirmBtnProps={{
          disabled: !isValid,
          fetcher: handleSaveClick,
          onSuccess,
          onFail,
        }}
        onClose={closeModal}
      />
    </>
  );
};

export default EditImageForm;
