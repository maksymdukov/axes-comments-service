import React from 'react';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, IconButton } from '@material-ui/core';

export const actionsColumn = ({onEditClick,onDeleteClick}) => ({
  name: "actions",
  label: "Действия",
  options: {
    customBodyRender: function ActionsCellWrapper(val, { rowIndex }) {
      return (
        <Box>
          <IconButton onClick={() => onEditClick(rowIndex)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDeleteClick(rowIndex)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      );
    },
  },
},)