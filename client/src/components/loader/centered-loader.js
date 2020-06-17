import React from "react";
import { CircularProgress, Box } from "@material-ui/core";

const CenteredLoader = ({ loading }) => {
  return (
    loading && (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    )
  );
};

export default CenteredLoader;
