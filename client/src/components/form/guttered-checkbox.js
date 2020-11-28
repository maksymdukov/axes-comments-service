import { Box, FormControlLabel } from "@material-ui/core";
import { Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import React from "react";

const GutteredCheckbox = ({ mb = 2, label, ...rest }) => {
  return (
    <Box mb={mb}>
      <Field
        type="checkbox"
        component={CheckboxWithLabel}
        Label={{ label }}
        {...rest}
      />
    </Box>
  );
};

export default GutteredCheckbox;
