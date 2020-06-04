import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const statusOptions = [
  { label: "Все", status: "" },
  { label: "Ожидающие", status: "pending" },
  { label: "Одобренные", status: "approved" },
];

const StatusFilter = ({ getStatusFilter, updateStatusFilter }) => {
  const statusFilter = useSelector(getStatusFilter);
  const dispatch = useDispatch();
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={statusFilter}
      displayEmpty
      onChange={(e) =>
        dispatch(updateStatusFilter({ statusFilter: e.target.value }))
      }
    >
      {statusOptions.map(({ label, status }) => (
        <MenuItem key={String(label)} value={status}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default StatusFilter;
