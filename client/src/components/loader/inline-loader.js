import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

const InlineLoader = ({ loading, ...rest }) => {
  return (
    <Box display="inline-block" mx={2} {...rest}>
      {loading && <CircularProgress size={20} />}
    </Box>
  );
};
export default InlineLoader;
