import React from "react";
import { Typography } from "@material-ui/core";

const MainHeader = ({ children }) => {
  return (
    <Typography align="center" variant="h4">
      {children}
    </Typography>
  );
};

export default MainHeader;
