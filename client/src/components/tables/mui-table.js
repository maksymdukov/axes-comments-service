import React, { useMemo } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";
import CenteredLoader from "components/loader/centered-loader";

const MuiTable = ({ columns, data, options, pagination, loading }) => {
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
      textLabels: {
        body: {
          noMatch: loading ? (
            <CenteredLoader key={loading} loading={loading} />
          ) : (
            "Нет записей"
          ),
        },
      },
      ...options,
      ...paginat,
    }),
    [options, paginat, loading]
  );
  return <MUIDataTable options={opts} columns={columns} data={data} />;
};

export default MuiTable;
