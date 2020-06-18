import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsBySlug,
  getCommentsBySlug,
  updateCommentPagination,
  changeComment,
  getAxeStatusFilter,
  changeStatusFilterAxe,
  getAxeOnComments,
  getCommentsLoading,
  getCommentsPagination,
} from "./redux/commentsSlice";
import { Typography, Box, CircularProgress } from "@material-ui/core";
import Paginator from "components/pagination/pagination";
import AxeTitle from "./components/axe-title";
import CommentFilters from "components/filters/comment-filters";
import CommentCard from "components/cards/comment-card";

const Axe = ({
  match: {
    params: { slug },
  },
}) => {
  const dispatch = useDispatch();
  const comments = useSelector(getCommentsBySlug);
  const { page, size } = useSelector(getCommentsPagination);
  const axe = useSelector(getAxeOnComments);
  const loading = useSelector(getCommentsLoading);
  const statusFilter = useSelector(getAxeStatusFilter);

  useEffect(() => {
    dispatch(fetchCommentsBySlug(slug));
  }, [page, size, statusFilter, dispatch, slug]);

  const onApproveSuccess = (comment) => () => {
    dispatch(
      changeComment({ id: comment.id, updatedComment: { status: "approved" } })
    );
  };

  const onSuspendSuccess = (comment) => () => {
    dispatch(
      changeComment({ id: comment.id, updatedComment: { status: "pending" } })
    );
  };

  const onDeleteSuccess = () => {
    dispatch(fetchCommentsBySlug(slug));
  };

  return (
    <div>
      <AxeTitle axe={axe} />
      <Typography align="center" variant="h4">
        Комментарии:
      </Typography>
      <CommentFilters
        pageSizeProps={{
          updatePagination: updateCommentPagination,
          getPaginationState: getCommentsPagination,
        }}
        statusFilterProps={{
          getStatusFilter: getAxeStatusFilter,
          updateStatusFilter: changeStatusFilterAxe,
        }}
      />
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onApproveSuccess={onApproveSuccess(comment)}
          onDeleteSuccess={onDeleteSuccess}
          onSuspendSuccess={onSuspendSuccess(comment)}
        />
      ))}
      {!comments.length && !loading && (
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
        getPaginationState={getCommentsPagination}
        updatePagination={updateCommentPagination}
      />
    </div>
  );
};

export default Axe;
