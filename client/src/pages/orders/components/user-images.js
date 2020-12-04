import React from "react";
import { Box, makeStyles, Backdrop } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  img: {
    width: 150,
    height: "auto",
  },
  imgContainer: {
    margin: ".5rem",
    fontSize: 0,
    cursor: "pointer",
  },
  imgBackdrop: {
    display: "none",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: "rgba(0,0,0,0.5)",
    "$imgContainer:hover &": {
      display: "block",
    },
  },
  backdrop: {
    zIndex: "10000",
    backgroundColor: "rgba(0,0,0,0.8)",
    cursor: "pointer",
  },
  fullScreenImg: {
    width: "auto",
    height: "auto",
    maxWidth: "90%",
    maxHeight: "90%",
    // border: "1px solid white",
  },
});

const getImageUrl = (image) => (image && image.url) || "";

const UserImages = ({ custom: images = [] }) => {
  const classes = useStyles();
  const [fullscreenImg, setFullscreenImg] = useState(null);

  const closeBackdrop = () => setFullscreenImg(null);
  const openBackdrop = (img) => () => setFullscreenImg(img);

  return (
    <>
      <Box display="flex" flexWrap="wrap" alignItems="center">
        {images.map(({ image, id }) => (
          <Box
            key={id}
            position="relative"
            className={classes.imgContainer}
            onClick={openBackdrop(image)}
          >
            <img
              className={classes.img}
              src={getImageUrl(image)}
              alt="user axe pic"
            />
            <div className={classes.imgBackdrop} />
          </Box>
        ))}
      </Box>
      <Backdrop
        open={!!fullscreenImg}
        onClick={closeBackdrop}
        className={classes.backdrop}
        unmountOnExit={true}
        mountOnEnter={true}
      >
        {fullscreenImg && (
          <img
            className={classes.fullScreenImg}
            src={getImageUrl(fullscreenImg)}
            alt="user axe pic"
          />
        )}
      </Backdrop>
    </>
  );
};

export default UserImages;
