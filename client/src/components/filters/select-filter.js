import React from "react";
import {
  Select,
  MenuItem,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  label: {
    marginRight: 5,
  },
}));

const SelectFilter = ({
  getFilterStatus,
  updateFilterStatus,
  options,
  label,
  mb = 0,
}) => {
  const classes = useStyles();
  const statusFilter = useSelector(getFilterStatus);
  const dispatch = useDispatch();
  return (
    <Box display="inline-flex" alignItems="center" mr={1} mb={mb}>
      <Typography className={classes.label}>{label}</Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={statusFilter}
        displayEmpty
        onChange={(e) =>
          dispatch(updateFilterStatus({ value: e.target.value }))
        }
      >
        {options.map(({ label, value }) => (
          <MenuItem key={String(label)} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SelectFilter;
