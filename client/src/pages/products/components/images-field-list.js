import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  list: {
    listStyle: "none",
    padding: 0,
    margin: "10px 0",
  },
  listItem: {
    display: "inline-block",
    position: "relative",
    width: 80,
    marginRight: 10,
    "&:hover $imageOverlay": {
      opacity: 1,
    },
  },
  image: {
    width: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  close: {
    color: "red",
    cursor: 'pointer'
  },
}));

const ImagesFieldList = ({ images, onImageDelete }) => {
  const classes = useStyles();
  return (
    <ul className={classes.list}>
      {images.map((image) => (
        <li key={image.id} className={classes.listItem}>
          <img className={classes.image} src={image.url} alt="icon" />
          <div className={classes.imageOverlay}>
            <button
              className={classes.close}
              onClick={() => onImageDelete(image)}
            >
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImagesFieldList;
