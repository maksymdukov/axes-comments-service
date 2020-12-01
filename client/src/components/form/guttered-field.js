import { Box } from "@material-ui/core";
import { Field } from "formik";
import React from "react";

const GutteredFieldPure = ({ mb = 2, fullWidth = true, ...rest }) => {
  return (
    <Box mb={mb}>
      <Field fullWidth={fullWidth} {...rest} />
    </Box>
  );
};

const GutteredField = React.memo(GutteredFieldPure);

export default GutteredField;
