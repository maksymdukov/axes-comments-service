import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const PageSize = ({ options, updatePagination, getPaginationState }) => {
  const dispatch = useDispatch();
  const { size } = useSelector(getPaginationState);
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={size}
      onChange={(e) => dispatch(updatePagination({ size: e.target.value }))}
    >
      {options.map((size) => (
        <MenuItem key={String(size)} value={size}>
          {size}
        </MenuItem>
      ))}
    </Select>
  );
};

export default PageSize;
