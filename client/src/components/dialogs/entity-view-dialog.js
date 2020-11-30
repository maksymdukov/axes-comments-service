import React from "react";
import ConfirmationDialog from "./confirmation-dialog";

const EntityViewModal = ({ entity, onClose, open, modalOptions }) => {
  const { View, fullWidth, maxWidth, getTitle = () => "" } = modalOptions;
  return (
    <ConfirmationDialog
      closeIcon
      content
      title={entity && getTitle(entity)}
      onClose={onClose}
      open={open}
      actions={false}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <View entity={entity} />
    </ConfirmationDialog>
  );
};

export default EntityViewModal;
