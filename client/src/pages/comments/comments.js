import React, { useEffect } from "react";
import { Typography, CircularProgress, Box } from "@material-ui/core";
import Filters from "components/layout/filters";
import {
  updateAllCommentsPagination,
  getAllCommentsSize,
  getAllCommentsStatusFilter,
  changeStatusFilterAllComments,
  getAllCommentsPage,
  getAllCommentsTotal,
  fetchAllComments,
  changeCommentAll,
  getAllComments,
  getAllCommentsLoading,
} from "./redux/all-comments-slice";
import CommentCard from "components/cards/comment-card";
import Paginator from "components/pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { commentStatus } from "constants/comment-status";
import renderAxeInfo from "./components/render-axe-info";

const Comments = () => {
  const dispatch = useDispatch();
  const allComments = useSelector(getAllComments);
  const page = useSelector(getAllCommentsPage);
  const size = useSelector(getAllCommentsSize);
  const loading = useSelector(getAllCommentsLoading);
  const statusFilter = useSelector(getAllCommentsStatusFilter);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [page, size, statusFilter, dispatch]);

  const onApproveSuccess = (comment) => () => {
    if (statusFilter === "") {
      dispatch(
        changeCommentAll({
          id: comment.id,
          updatedComment: { status: commentStatus.APPROVED },
        })
      );
    } else {
      dispatch(fetchAllComments());
    }
  };

  const onSuspendSuccess = (comment) => () => {
    if (statusFilter === "") {
      dispatch(
        changeCommentAll({
          id: comment.id,
          updatedComment: { status: commentStatus.PENDING },
        })
      );
    } else {
      dispatch(fetchAllComments());
    }
  };

  const onDeleteSuccess = () => {
    dispatch(fetchAllComments());
  };
  return (
    <div>
      <Typography align="center" variant="h4">
        Все комментарии:
      </Typography>
      <Filters
        pageSizeProps={{
          options: [5, 10, 20],
          updatePagination: updateAllCommentsPagination,
          getSize: getAllCommentsSize,
        }}
        statusFilterProps={{
          getStatusFilter: getAllCommentsStatusFilter,
          updateStatusFilter: changeStatusFilterAllComments,
        }}
      />
      {allComments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onApproveSuccess={onApproveSuccess(comment)}
          onDeleteSuccess={onDeleteSuccess}
          onSuspendSuccess={onSuspendSuccess(comment)}
          renderAxeInfo={renderAxeInfo}
        />
      ))}
      {!allComments.length && !loading && (
        <Typography align="center" variant="h6">
          Не данных
        </Typography>
      )}
      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      <Paginator
        getPage={getAllCommentsPage}
        getSize={getAllCommentsSize}
        getTotal={getAllCommentsTotal}
        updatePagination={updateAllCommentsPagination}
      />
    </div>
  );
};

export default Comments;
