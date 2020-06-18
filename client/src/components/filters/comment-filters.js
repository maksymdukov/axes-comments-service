import React from "react";
import Filters from "./filters";

const statusOptions = [
  { label: "Все", status: "" },
  { label: "Ожидающие", status: "pending" },
  { label: "Одобренные", status: "approved" },
];

const CommentFilters = ({ pageSizeProps, statusFilterProps = {} }) => {
  return (
    <Filters
      pageSizeProps={{ ...pageSizeProps, options: [5, 10, 20] }}
      statusFilterProps={{ ...statusFilterProps, options: statusOptions }}
    />
  );
};

export default CommentFilters;
