import CenteredLoader from "components/loader/centered-loader";
import Paginator from "components/pagination/pagination";
import MainHeader from "components/typography/main-header";
import NoData from "components/typography/no-data";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGallery,
  getGalleryImages,
  getGalleryLoading,
  getGalleryPagination,
  updateGalleryPagination,
} from "./redux/gallery-slice";
import PageSize from "components/filters/page-size";
import { Box, Button } from "@material-ui/core";
import FileUploadDialog from "./components/file-upload-dialog";
import ImageList from "./components/image-list";
import PublishIcon from "@material-ui/icons/Publish";

const Gallery = () => {
  const dispatch = useDispatch();
  const images = useSelector(getGalleryImages);
  const loading = useSelector(getGalleryLoading);
  const { page, size } = useSelector(getGalleryPagination);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [page, size]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, [setIsDialogOpen]);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, [setIsDialogOpen]);

  const onUpload = useCallback(() => {
    dispatch(fetchGallery());
  }, []);
  return (
    <div>
      <MainHeader>Галлерея:</MainHeader>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <PageSize
          getPaginationState={getGalleryPagination}
          updatePagination={updateGalleryPagination}
        />
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={openDialog}
        >
          <PublishIcon /> Загрузить
        </Button>
      </Box>
      <ImageList images={images} />
      {!images.length && !loading && <NoData />}
      <CenteredLoader loading={loading} />
      <Paginator
        getPaginationState={getGalleryPagination}
        updatePagination={updateGalleryPagination}
      />
      <FileUploadDialog
        isOpened={isDialogOpen}
        handleClose={closeDialog}
        onUpload={onUpload}
      />
    </div>
  );
};

export default Gallery;
