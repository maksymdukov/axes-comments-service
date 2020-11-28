import { Box } from "@material-ui/core";
import { Field } from "formik";
import React from "react";

const GutteredField = ({ mb = 2, fullWidth = true, ...rest }) => {
  return (
    <Box mb={mb}>
      <Field fullWidth={fullWidth} {...rest} />
    </Box>
  );
};

export default GutteredField;
