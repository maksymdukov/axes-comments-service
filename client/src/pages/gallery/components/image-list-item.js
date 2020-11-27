import { makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(({ shadows }) => ({
  image: {
    width: "100%",
  },
  paper: {
    width: "100%",
    "&:hover": {
      boxShadow: shadows[9],
    },
    cursor: "pointer",
  },
}));

const ImageListItem = ({ image, onClick }) => {
  const classes = useStyles();
  return (
    <Paper
      key={image.id}
      className={classes.paper}
      onClick={() => onClick(image)}
    >
      <img className={classes.image} src={image.url} alt="gallery image" />
    </Paper>
  );
};

export default ImageListItem;
