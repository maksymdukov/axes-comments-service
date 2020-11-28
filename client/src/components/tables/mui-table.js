import React, { useMemo } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";

const MuiTable = ({ columns, data, options, pagination }) => {
  const dispatch = useDispatch();
  const paginat = useMemo(() => {
    if (pagination) {
      const { total, size = 10, page = 1, paginationUpdated } = pagination;
      return {
        pagination: true,
        serverSide: true,
        count: total,
        rowsPerPage: size,
        page: page - 1,
        onChangePage: (page) => {
          console.log("page", page);
          dispatch(paginationUpdated({ page: page + 1 }));
        },
        onChangeRowsPerPage: (size) => dispatch(paginationUpdated({ size })),
      };
    }
    return { pagination: false };
  }, [pagination]);
  const opts = useMemo(
    () => ({
      sort: false,
      download: false,
      filter: false,
      print: false,
      search: false,
      viewColumns: false,
      rowsPerPageOptions: [5, 10, 20, 30],
      ...options,
      ...paginat,
    }),
    [options, paginat]
  );
  return <MUIDataTable options={opts} columns={columns} data={data} />;
};

export default MuiTable;
