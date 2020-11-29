import { DialogContent, makeStyles } from "@material-ui/core";
import AlertError from "components/alerts/alert-error";
import ConfirmationActions from "components/dialogs/confirmation-actions";
import { Form } from "formik";
import React, { useState } from "react";

const useStyles = makeStyles(({ palette }) => ({
  greyBG: {
    backgroundColor: palette.grey[400],
  },
}));

const EntityForm = ({
  values,
  handleSubmit,
  submitForm,
  onClose,
  entity,
  onCreateSuccess,
  onEditSuccess,
  validateForm,
  api,
  children,
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
    return api(values, entity);
  };

  const onSuccess = (res) => {
    if (entity) {
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
          {children}
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

export default EntityForm;
