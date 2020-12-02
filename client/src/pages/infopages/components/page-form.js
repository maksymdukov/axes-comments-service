import EntityForm from "components/form/entity-form";
import GutteredField from "components/form/guttered-field";
import WYSIWYGField from "components/form/wysiwyg/wysiwyg-filed";
import { editorStateToHtml } from "components/wysiwyg/sysiwyg.utils";
import { TextField } from "formik-material-ui";
import React, { useCallback } from "react";
import { createPageApi } from "../apis/create-page.api";
import { updatePageApi } from "../apis/update-page.api";

const PageForm = (props) => {
  const api = useCallback(async (values, page) => {
    const formatedValues = {
      ...values,
      ruContent: editorStateToHtml(values.ruContent),
      ukContent: editorStateToHtml(values.ukContent),
    };
    if (page) {
      // editing page
      return updatePageApi(page.id, formatedValues);
    } else {
      // creating new page
      return createPageApi(formatedValues);
    }
  }, []);
  return (
    <EntityForm {...props} api={api}>
      <GutteredField component={TextField} name="name" label="Название" />
      <GutteredField
        component={WYSIWYGField}
        name="ruContent"
        label="Текст (рус)"
      />
      <GutteredField
        component={WYSIWYGField}
        name="ukContent"
        label="Текст (укр)"
      />
    </EntityForm>
  );
};

export default PageForm;
