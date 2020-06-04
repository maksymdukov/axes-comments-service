import React from "react";
import { TablePagination } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

const defaultSizeOptions = [5, 10, 25, 50];

const TablePaginator = ({
  getSize,
  getTotal,
  getPage,
  sizeOptions = defaultSizeOptions,
  updatePagination,
  ...rest
}) => {
  const dispatch = useDispatch();
  const size = useSelector(getSize);
  const total = useSelector(getTotal);
  const page = useSelector(getPage);

  const handleChangePage = (e, page) => {
    dispatch(updatePagination({ page }));
  };

  const handleChangeRowsPerPage = (event) => {
    const size = parseInt(event.target.value, 10);
    dispatch(updatePagination({ size }));
  };

  return (
    <TablePagination
      rowsPerPageOptions={sizeOptions}
      count={total || -1}
      rowsPerPage={size}
      page={page - 1}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      {...rest}
    />
  );
};

export default TablePaginator;