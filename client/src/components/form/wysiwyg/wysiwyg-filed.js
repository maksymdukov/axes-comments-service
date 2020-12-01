import { FormHelperText, InputLabel, makeStyles } from "@material-ui/core";
import WYSIWYG from "components/wysiwyg/wysiwyg";
import React from "react";

const useStyles = makeStyles({
  label: {
    marginBottom: 20,
  },
});

const WYSIWYGField = ({ field, form, label }) => {
  const classes = useStyles();
  const { value, name } = field;
  const { setFieldValue, setFieldTouched, touched } = form;

  const error = form.errors[name];
  const fieldTouched = touched[name];
  return (
    <div>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <WYSIWYG
        initEditorState={value}
        onBlur={(e, eState) => {
          setFieldValue(name, eState);
          setFieldTouched(name, true);
        }}
      />
      {!!error && fieldTouched && (
        <FormHelperText error>{error}</FormHelperText>
      )}
    </div>
  );
};

export default WYSIWYGField;
