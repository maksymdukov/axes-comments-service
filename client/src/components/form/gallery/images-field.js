import { Box, Button, FormHelperText, makeStyles } from "@material-ui/core";
import Gallery from "pages/gallery/gallery";
import React, { useCallback, useState } from "react";
import uniqBy from "lodash/uniqBy";
import ImagesFieldList from "./images-field-list";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: "0.75rem",
    color: "rgba(0,0,0,0.54)",
  },
}));

const ImagesField = ({ isSingle, field, form, label }) => {
  const classes = useStyles();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { value, name } = field;
  const { setFieldValue, touched } = form;

  const error = form.errors[name];
  const fieldTouched = touched[name];

  const toggleGallery = () => {
    setGalleryOpen(!galleryOpen);
  };

  const onRowSelectionChange = useCallback(
    (images, allSelected) => {
      if (isSingle && allSelected.length) {
        setFieldValue(name, [images[allSelected[0].dataIndex]]);
      } else {
        const newImages = allSelected.map((img) => images[img.dataIndex]);
        const updatedValue = value.concat(newImages);
        const uniqueValue = uniqBy(updatedValue, (img) => img.id).filter(
          (img) =>
            allSelected.find((row) => images[row.dataIndex].id === img.id) ||
            !images.find((image) => image.id === img.id)
        );
        setFieldValue(name, uniqueValue);
      }
    },
    [isSingle, setFieldValue, value]
  );

  const onImageDelete = useCallback(
    (image) => {
      setFieldValue(
        name,
        value.filter((img) => img.id !== image.id)
      );
    },
    [setFieldValue, value]
  );
  const getSelectedRows = useCallback(
    (images) => {
      const selectedImages = [];
      images.forEach((img, idx) => {
        if (value.find((val) => val.id === img.id)) {
          selectedImages.push(idx);
        }
      });
      return selectedImages;
    },
    [value]
  );
  return (
    <div>
      <label className={classes.label}>{label}</label>
      <div>
        {!value.length && "Не выбрано"}
        {!!value.length && (
          <ImagesFieldList images={value} onImageDelete={onImageDelete} />
        )}
        {!!error && fieldTouched && (
          <FormHelperText error>{error}</FormHelperText>
        )}
        <Box mb={2}>
          <Button variant="outlined" color="primary" onClick={toggleGallery}>
            Выбрать
          </Button>
        </Box>
        {galleryOpen && (
          <Gallery
            filters={false}
            header={false}
            onRowSelectionChange={onRowSelectionChange}
            getSelectedRows={getSelectedRows}
            bulkActions={false}
          />
        )}
      </div>
    </div>
  );
};

export default ImagesField;
