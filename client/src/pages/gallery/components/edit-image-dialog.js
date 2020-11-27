import ConfirmationDialog from "components/dialogs/confirmation-dialog";
import { Formik } from "formik";
import React, { useMemo } from "react";
import { getLanguagesMap } from "utils/languages";
import EditImageForm from "./edit-image-form";

const EditImageDialog = ({ open, image, onClose, onSuccessfulSubmit }) => {
  const lngMap = useMemo(
    () => getLanguagesMap((image && image.languages) || []),
    [image]
  );
  const initialValues = {
    titleUk: (lngMap && lngMap.uk && lngMap.uk.title) || "",
    titleRu: (lngMap && lngMap.ru && lngMap.ru.title) || "",
  };

  return (
    <ConfirmationDialog
      title="Редактировать"
      open={open}
      onClose={onClose}
      actions={false}
      content={false}
    >
      <Formik initialValues={initialValues}>
        {(props) => (
          <EditImageForm
            {...props}
            closeModal={onClose}
            onSuccessfulSubmit={onSuccessfulSubmit}
            image={image}
          />
        )}
      </Formik>
    </ConfirmationDialog>
  );
};

export default EditImageDialog;
