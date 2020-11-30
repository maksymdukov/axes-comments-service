import Entities from "components/entity/entities";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { deleteCommentApi } from "./apis/delete-comment.api";
import { getCommentsColumns } from "./comments.utils";
import getCustomSelectBar from "./components/custom-select-bar";
import CommentStatusFilter from "./components/status-filter";
import ViewComment from "./components/view-comment";
import {
  getAllCommentsPagination,
  getAllComments,
  getAllCommentsLoading,
  fetchAllComments,
  updateAllCommentsPagination,
  getAllCommentsStatusFilter,
} from "./redux/all-comments-slice";

const Comments = () => {
  const status = useSelector(getAllCommentsStatusFilter);
  const entityOptions = useMemo(
    () => ({
      getPagination: getAllCommentsPagination,
      getEntities: getAllComments,
      getEntitiesLoading: getAllCommentsLoading,
      fetchEntities: fetchAllComments,
      updatePagination: updateAllCommentsPagination,
      deleteEntityApi: deleteCommentApi,
      fetchDeps: [status],
    }),
    [status]
  );

  const editModalOptions = useMemo(
    () => ({
      useInitialValues: () => {},
      EntityForm: function EntityForm() {
        return null;
      },
    }),
    []
  );

  const tableOptions = useMemo(
    () => ({
      customToolbarSelect: getCustomSelectBar,
    }),
    []
  );

  const viewModalOptions = useMemo(
    () => ({
      View: ViewComment,
      fullWidth: true,
      maxWidth: "sm",
      getTitle: (title) => `Комментарий ID ${title.id}`,
    }),
    []
  );

  return (
    <>
      <CommentStatusFilter />
      <Entities
        title="Комментарии"
        createBtn={false}
        view={true}
        edit={false}
        getEntitiesColumns={getCommentsColumns}
        entityOptions={entityOptions}
        editModalOptions={editModalOptions}
        tableOptions={tableOptions}
        viewModalOptions={viewModalOptions}
      />
    </>
  );
};

export default Comments;
