import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(({ palette }) => ({
  box: {
    position: "relative",
    border: `1px solid ${palette.grey[400]}`,
    padding: "1rem",
  },
  mb: {
    marginBottom: "1.5rem",
  },
  label: {
    position: "absolute",
    top: 0,
    left: 10,
    transform: "translateY(-50%)",
    padding: "0 .3rem",
    background: palette.common.white,
  },
}));

const Group = ({ label, gutterBottom = true, children }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.box, gutterBottom && classes.mb)}>
      <Typography variant="h5" className={classes.label} component="h2">
        {label}
      </Typography>
      {children}
    </div>
  );
};

export default Group;
