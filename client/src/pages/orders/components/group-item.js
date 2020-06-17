import React from "react";
import { Typography, Box } from "@material-ui/core";

const GroupItem = ({ label, boxProps, children }) => {
  return (
    <div>
      <Box mr={1} display="inline-block" {...boxProps}>
        <Typography variant="subtitle2" component="span">
          {label}:
        </Typography>
      </Box>
      <Typography variant="body1" component="span">
        {children}
      </Typography>
    </div>
  );
};

export default GroupItem;
