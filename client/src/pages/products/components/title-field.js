import React from "react";
import { TextField } from "formik-material-ui";
import slugify from "slugify";

const TitleField = ({ form, field, ...rest }) => {
  const onChange = (e) => {
    field.onChange(e);
    form.setFieldValue(
      "slug",
      slugify(e.target.value, {
        strict: true,
        lower: true,
      }),
      true
    );
  };
  return <TextField {...rest} field={{ ...field, onChange }} form={form} />;
};

export default TitleField;
