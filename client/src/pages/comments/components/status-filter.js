import React from "react";
import SelectFilter from "components/filters/select-filter";
import { commentStatus } from "../comments.constants";
import {
  changeStatusFilterAllComments,
  getAllCommentsStatusFilter,
} from "../redux/all-comments-slice";

const options = [
  { label: "Все", value: "" },
  { label: "Ожидающие", value: commentStatus.PENDING },
  { label: "Одобренные", value: commentStatus.APPROVED },
  { label: "Неодобренные", value: commentStatus.CANCELLED },
];

const CommentStatusFilter = () => {
  return (
    <SelectFilter
      label="Статус:"
      options={options}
      getFilterStatus={getAllCommentsStatusFilter}
      updateFilterStatus={changeStatusFilterAllComments}
    />
  );
};

export default CommentStatusFilter;
