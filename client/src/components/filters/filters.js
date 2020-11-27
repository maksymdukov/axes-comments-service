import React from "react";
import { Box } from "@material-ui/core";
import PageSize from "components/filters/page-size";
import StatusFilter from "components/filters/status-filter";

const Filters = ({ pageSizeProps, statusFilterProps }) => {
  return (
    <Box mb={1}>
      <PageSize {...pageSizeProps} />
      {statusFilterProps && (
        <>
          Статус:
          <Box display="inline-block" ml={1} mr={2}>
            <StatusFilter {...statusFilterProps} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Filters;
