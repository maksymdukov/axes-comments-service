import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import CenteredLoader from "./centered-loader";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.54)",
    justifyContent: "center",
    alignItems: "center",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    zIndex: "99999",
  },
});

const FullscreenLoader = ({ loading }) => {
  const classes = useStyles();
  return (
    loading && (
      <Box className={classes.container}>
        <CenteredLoader loading={true} />
      </Box>
    )
  );
};

export default FullscreenLoader;
