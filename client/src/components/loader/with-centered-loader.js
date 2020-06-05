import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  loaderContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  loader: {
    verticalAlign: "middle",
  },
});

const WithCenteredLoader = ({ children, size = 30, wrapperClass, loading }) => {
  const classes = useStyles();
  return (
    <Box display="inline-block" position="relative" className={wrapperClass}>
      {children}
      {loading && (
        <div className={classes.loaderContainer}>
          <CircularProgress size={size} className={classes.loader} />
        </div>
      )}
    </Box>
  );
};

export default WithCenteredLoader;
