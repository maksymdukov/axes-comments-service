import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateImage } from "../redux/gallery-slice";
import EditImageDialog from "./edit-image-dialog";
import ImageListItem from "./image-list-item";

const useStyles = makeStyles(() => ({
  gallery: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
  galleryItem: {
    width: "25%",
    padding: 5,
  },
}));

const ImageList = ({ images }) => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const onImageClick = (image) => {
    // open form to edit titles of an image
    setImage(image);
    setModal(true);
  };
  const closeDialog = () => {
    setModal(false);
  };

  const onSuccessfulSubmit = (res) => {
    dispatch(updateImage({ id: image.id, updatedImage: res.data }));
  };
  return (
    <section className={classes.gallery}>
      {images.map((image) => (
        <div key={image.id} className={classes.galleryItem}>
          <ImageListItem image={image} onClick={onImageClick} />
        </div>
      ))}
      <EditImageDialog
        open={modal}
        image={image}
        onClose={closeDialog}
        onSuccessfulSubmit={onSuccessfulSubmit}
      />
    </section>
  );
};

export default ImageList;
