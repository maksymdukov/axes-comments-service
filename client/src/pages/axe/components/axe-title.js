import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    minHeight: 100,
  },
  image: {
    width: 100,
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

const AxeTitle = ({ axe, titleProps }) => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      {axe && (
        <>
          <Typography variant="h5" {...titleProps}>
            {axe.title}
          </Typography>
          <div className={classes.image}>
            <img className={classes.img} src={axe.image.url} alt="axe" />
          </div>
        </>
      )}
    </div>
  );
};

export default AxeTitle;
