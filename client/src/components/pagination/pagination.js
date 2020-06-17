import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector, useDispatch } from "react-redux";

const Paginator = ({ getPaginationState, updatePagination }) => {
  const dispatch = useDispatch();
  const { page, size, total } = useSelector(getPaginationState);
  const onChange = (e, page) => {
    dispatch(updatePagination({ page }));
  };
  const count = total ? Math.ceil(total / size) : 1;
  return (
    <div>
      <Pagination page={page} count={count} onChange={onChange} />
    </div>
  );
};

export default Paginator;
