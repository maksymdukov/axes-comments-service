import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsBySlug,
  getCommentsBySlug,
  getCommentsPage,
  getCommentsSize,
  getCommentsTotal,
  updateCommentPagination,
  changeComment,
  getAxeStatusFilter,
  changeStatusFilterAxe,
  getAxeOnComments,
} from "./redux/commentsSlice";
import { Typography, makeStyles } from "@material-ui/core";
import Paginator from "components/pagination/pagination";
import AxeTitle from "./components/axe-title";
import Filters from "components/layout/filters";
import CommentCard from "components/cards/comment-card";

const Axe = ({
  match: {
    params: { slug },
  },
}) => {
  const dispatch = useDispatch();
  const comments = useSelector(getCommentsBySlug);
  const page = useSelector(getCommentsPage);
  const size = useSelector(getCommentsSize);
  const axe = useSelector(getAxeOnComments);
  const statusFilter = useSelector(getAxeStatusFilter);

  useEffect(() => {
    dispatch(fetchCommentsBySlug(slug));
  }, [page, size, statusFilter]);

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
      <Filters
        pageSizeProps={{
          options: [5, 10, 20],
          updatePagination: updateCommentPagination,
          getSize: getCommentsSize,
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
      {!comments.length && (
        <Typography align="center" variant="h6">
          Не данных
        </Typography>
      )}
      <Paginator
        getPage={getCommentsPage}
        getSize={getCommentsSize}
        getTotal={getCommentsTotal}
        updatePagination={updateCommentPagination}
      />
    </div>
  );
};

export default Axe;
