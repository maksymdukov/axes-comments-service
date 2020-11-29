import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const SelectFilter = ({ getFilterStatus, updateFilterStatus, options }) => {
  const statusFilter = useSelector(getFilterStatus);
  const dispatch = useDispatch();
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={statusFilter}
      displayEmpty
      onChange={(e) =>
        dispatch(updateFilterStatus({ statusFilter: e.target.value }))
      }
    >
      {options.map(({ label, status }) => (
        <MenuItem key={String(label)} value={status}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectFilter;
