import { Box, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: "0.75rem",
    color: "rgba(0,0,0,0.54)",
  },
}));

const FieldLike = ({ label, value }) => {
  const classes = useStyles();
  return (
    <Box mb={2}>
      <label className={classes.label}>{label}</label>
      <div>{value}</div>
    </Box>
  );
};

export default FieldLike;
