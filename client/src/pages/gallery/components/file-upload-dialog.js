import AlertError from "components/alerts/alert-error";
import ConfirmationDialog from "components/dialogs/confirmation-dialog";
import React, { useCallback, useState } from "react";
import { uploadImagesApi } from "../apis/upload-images.api";
import FilePicker from "./file-picker";

const FileUploadDialog = ({ isOpened, handleClose, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const onUploadClick = useCallback(async () => {
    setError("");
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });
    return uploadImagesApi(formData);
  }, [files, setFiles, setError]);

  const onUploadSuccess = useCallback(
    (response) => {
      onUpload && onUpload(response.data);
      handleClose();
    },
    [handleClose]
  );

  const onUploadFail = useCallback(
    (error) => {
      setError(error.message || "Что-то пошло не так");
    },
    [handleClose]
  );

  return (
    <ConfirmationDialog
      title="Загрузить изображения"
      cancelLabel="Отмена"
      confirmLabel="Загрузить"
      onClose={handleClose}
      open={isOpened}
      confirmBtnProps={{
        onSuccess: onUploadSuccess,
        onFail: onUploadFail,
        disabled: !files.length,
        fetcher: onUploadClick,
      }}
    >
      <AlertError error={error} />
      <FilePicker onDrop={onDrop} />
    </ConfirmationDialog>
  );
};

export default FileUploadDialog;
