import React from "react";
import ConfirmationDialog from "components/dialogs/confirmation-dialog";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  greyBG: {
    backgroundColor: palette.grey[400],
  },
}));

const EntityEditModal = ({
  open,
  onClose,
  entity,
  onCreateSuccess,
  onEditSuccess,
  modalOptions,
}) => {
  const { useInitialValues, validationSchema, EntityForm } = modalOptions;
  const classes = useStyles();
  const initValues = useInitialValues({ entity });
  return (
    <ConfirmationDialog
      fullScreen
      open={open}
      title={entity ? "Редактировать" : "Создать"}
      onClose={onClose}
      actions={false}
      content={false}
      titleClassname={classes.greyBG}
      closeIcon
    >
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        validateOnMount={!!entity}
      >
        {(props) => (
          <EntityForm
            {...props}
            entity={entity}
            onClose={onClose}
            onCreateSuccess={onCreateSuccess}
            onEditSuccess={onEditSuccess}
          />
        )}
      </Formik>
    </ConfirmationDialog>
  );
};

export default EntityEditModal;
