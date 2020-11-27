import { Button, DialogActions } from "@material-ui/core";
import LoadableButton from "components/buttons/loadable-button";
import React from "react";

const ConfirmationActions = ({
  onClose,
  confirmLabel,
  cancelLabel,
  confirmBtnProps,
}) => {
  return (
    <DialogActions>
      <Button color="primary" onClick={onClose}>
        {cancelLabel}
      </Button>
      <LoadableButton color="primary" variant="contained" {...confirmBtnProps}>
        {confirmLabel}
      </LoadableButton>
    </DialogActions>
  );
};

export default ConfirmationActions;
