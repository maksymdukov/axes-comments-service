import React from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
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
  fullWidth,
  maxWidth,
}) => {
  const Wrapper = content ? DialogContent : React.Fragment;
  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
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
