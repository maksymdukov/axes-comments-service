import React, { useMemo } from "react";
import Entities from "components/entity/entities";
import {
  getPages,
  getPagesLoading,
  getPagesPagination,
  fetchPages,
  updatePagesPagination,
} from "./redux/infopage-slice";
import { deletePageApi } from "./apis/delete-page.api";
import { getPagesColumns, pageFormValidation } from "./infopages.utils";
import { getLanguagesMap } from "utils/languages";
import { EditorState } from "draft-js";
import { createEditorState } from "components/wysiwyg/sysiwyg.utils";
import PageForm from "./components/page-form";

export const useInitialValues = ({ entity }) => {
  const lngMap = useMemo(
    () => getLanguagesMap((entity && entity.languages) || []),
    [entity]
  );

  return useMemo(
    () => ({
      name: (entity && entity.name) || "",
      ruContent:
        createEditorState(lngMap.ru && lngMap.ru.content) ||
        EditorState.createEmpty(),
      ukContent:
        createEditorState(lngMap.uk && lngMap.uk.content) ||
        EditorState.createEmpty(),
    }),
    [entity]
  );
};

const Infopages = () => {
  const entityOptions = useMemo(
    () => ({
      getPagination: getPagesPagination,
      getEntities: getPages,
      getEntitiesLoading: getPagesLoading,
      fetchEntities: fetchPages,
      updatePagination: updatePagesPagination,
      deleteEntityApi: deletePageApi,
    }),
    []
  );

  const editModalOptions = useMemo(
    () => ({
      useInitialValues,
      validationSchema: pageFormValidation,
      EntityForm: PageForm,
    }),
    []
  );

  return (
    <Entities
      title="Страницы"
      getEntitiesColumns={getPagesColumns}
      entityOptions={entityOptions}
      editModalOptions={editModalOptions}
    />
  );
};

export default Infopages;
