import React, { useCallback, useEffect, useMemo, useState } from "react";
import MainHeader from "components/typography/main-header";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGallery,
  getGalleryImages,
  getGalleryLoading,
  getGalleryOwnerFilter,
  getGalleryPagination,
  updateGalleryPagination,
  updateImage,
} from "./redux/gallery-slice";
import { Box, Button } from "@material-ui/core";
import FileUploadDialog from "./components/file-upload-dialog";
import ImageList from "./components/image-list";
import PublishIcon from "@material-ui/icons/Publish";
import OwnerFilter from "./components/owner-filter";

const Gallery = ({
  header = true,
  filters = true,
  onRowSelectionChange,
  getSelectedRows = () => [],
  bulkActions = true,
}) => {
  const dispatch = useDispatch();
  const images = useSelector(getGalleryImages);
  const loading = useSelector(getGalleryLoading);
  const isAdminFilter = useSelector(getGalleryOwnerFilter);
  const { page, size, total } = useSelector(getGalleryPagination);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [page, size, isAdminFilter]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, [setIsDialogOpen]);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, [setIsDialogOpen]);

  const onUpload = useCallback(() => {
    dispatch(fetchGallery());
  }, []);

  const onSuccessfulUpdate = (image, updatedImage) => {
    dispatch(updateImage({ id: image.id, updatedImage }));
  };

  const onImageDelete = () => {
    dispatch(fetchGallery());
  };

  const onRowsSelected = useCallback(
    (selected, allSelected, dataSelected) => {
      onRowSelectionChange(images, allSelected, selected, dataSelected);
    },
    [onRowSelectionChange, images]
  );

  const selectedRows = useMemo(() => getSelectedRows(images), [
    images,
    getSelectedRows,
  ]);
  return (
    <div>
      {header && <MainHeader>Галлерея:</MainHeader>}
      {filters && <OwnerFilter />}
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={openDialog}
        >
          <PublishIcon /> Загрузить
        </Button>
      </Box>
      <ImageList
        loading={loading}
        images={images}
        page={page}
        size={size}
        total={total}
        paginationUpdated={updateGalleryPagination}
        onUpdate={onSuccessfulUpdate}
        onDelete={onImageDelete}
        onRowSelectionChange={onRowSelectionChange ? onRowsSelected : undefined}
        rowsSelected={selectedRows}
        bulkActions={bulkActions}
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
