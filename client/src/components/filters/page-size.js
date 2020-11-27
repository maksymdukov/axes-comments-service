import React from "react";
import { Select, MenuItem, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const PageSize = ({
  options = [10, 20, 30],
  updatePagination,
  getPaginationState,
}) => {
  const dispatch = useDispatch();
  const { size } = useSelector(getPaginationState);
  return (
    <Box display="inline-block">
      Количетсво записей на странице:
      <Box display="inline-block" ml={1} mr={2}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          onChange={(e) =>
            dispatch(updatePagination({ size: e.target.value, page: 1 }))
          }
        >
          {options.map((size) => (
            <MenuItem key={String(size)} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default PageSize;
