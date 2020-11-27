import { Box } from "@material-ui/core";
import { Field } from "formik";
import React from "react";

const GutteredField = ({ ...rest }) => {
  return (
    <Box mb={2}>
      <Field fullWidth {...rest} />
    </Box>
  );
};

export default GutteredField;
