import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import LoadableButton from "components/buttons/loadable-button";
import React from "react";
import ConfirmationActions from "./confirmation-actions";

const ConfirmationDialog = ({
  onClose,
  open,
  title,
  actions = true,
  content = true,
  cancelLabel,
  confirmLabel,
  confirmBtnProps,
  children,
}) => {
  const Wrapper = content ? DialogContent : React.Fragment;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <Wrapper>{children}</Wrapper>
      {actions && (
        <ConfirmationActions
          cancelLabel={cancelLabel}
          confirmBtnProps={confirmBtnProps}
          confirmLabel={confirmLabel}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
};

export default ConfirmationDialog;
