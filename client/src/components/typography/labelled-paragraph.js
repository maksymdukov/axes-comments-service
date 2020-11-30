import { Box, Typography } from "@material-ui/core";
import React from "react";

const LabelledParagraph = ({ label, content }) => {
  return (
    <Box mb={1}>
      <Typography variant="subtitle2">{label}</Typography>
      <Typography variant="body2">{content}</Typography>
    </Box>
  );
};

export default LabelledParagraph;
