import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import LoadableButton from "components/buttons/loadable-button";
import React from "react";
import ConfirmationActions from "./confirmation-actions";
import CloseIcon from "@material-ui/icons/Close";

const ConfirmationDialog = ({
  onClose,
  open,
  title,
  actions = true,
  content = true,
  closeIcon = false,
  cancelLabel,
  confirmLabel,
  confirmBtnProps,
  children,
  fullScreen,
  titleClassname,
}) => {
  const Wrapper = content ? DialogContent : React.Fragment;
  return (
    <Dialog onClose={onClose} open={open} fullScreen={fullScreen}>
      <DialogTitle className={titleClassname}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {title}
          {closeIcon && (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
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
