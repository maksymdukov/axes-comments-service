import React, { useEffect } from "react";
import CommentFilters from "components/filters/comment-filters";
import {
  updateAllCommentsPagination,
  getAllCommentsStatusFilter,
  changeStatusFilterAllComments,
  fetchAllComments,
  changeCommentAll,
  getAllComments,
  getAllCommentsLoading,
  getAllCommentsPagination,
} from "./redux/all-comments-slice";
import CommentCard from "components/cards/comment-card";
import Paginator from "components/pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { commentStatus } from "constants/comment-status";
import renderAxeInfo from "./components/render-axe-info";
import MainHeader from "components/typography/main-header";
import CenteredLoader from "components/loader/centered-loader";
import NoData from "components/typography/no-data";

const Comments = () => {
  const dispatch = useDispatch();
  const allComments = useSelector(getAllComments);
  const { size, page } = useSelector(getAllCommentsPagination);
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
      <MainHeader>Все комментарии:</MainHeader>
      <CommentFilters
        pageSizeProps={{
          updatePagination: updateAllCommentsPagination,
          getPaginationState: getAllCommentsPagination,
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
      {!allComments.length && !loading && <NoData />}
      <CenteredLoader loading={loading} />
      <Paginator
        getPaginationState={getAllCommentsPagination}
        updatePagination={updateAllCommentsPagination}
      />
    </div>
  );
};

export default Comments;
