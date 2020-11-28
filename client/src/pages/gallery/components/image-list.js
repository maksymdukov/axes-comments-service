import { makeStyles } from "@material-ui/core";
import React, { useCallback, useMemo, useState } from "react";
import EditImageDialog from "./edit-image-dialog";
import MuiTable from "components/tables/mui-table";
import { getGalleryColumns } from "../gallery.utils";
import { deleteImagesApi } from "../apis/delete-images.api";

const useStyles = makeStyles(() => ({
  gallery: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      width: "100%",
    },
  },
  galleryItem: {
    width: "25%",
    padding: 5,
  },
}));

const ImageList = ({
  images,
  page,
  size,
  total,
  paginationUpdated,
  onDelete,
  onUpdate,
  onRowSelectionChange,
  rowsSelected = [],
  bulkActions,
}) => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const classes = useStyles();

  const onEditClick = useCallback(
    (rowIdx) => {
      // open form to edit titles of an image
      setImage(images[rowIdx]);
      setModal(true);
    },
    [setImage, setModal, images]
  );
  const closeDialog = useCallback(() => {
    setModal(false);
  }, [setModal]);

  const onSuccessfulSubmit = useCallback(
    (res) => {
      onUpdate(image, res.data);
    },
    [onUpdate, image]
  );

  const onDeleteClick = useCallback(
    async (rowIdx) => {
      const answer = confirm("Действительно хотите удалить?");
      if (!answer) return;
      await deleteImagesApi([images[rowIdx].id]);
      onDelete([images[rowIdx]]);
    },
    [onDelete, images]
  );

  const onBulkDelete = useCallback(
    ({ data }) => {
      const answer = confirm("Действительно хотите удалить?");
      if (!answer) return false;
      (async () => {
        const ids = data.map((dt) => images[dt.dataIndex].id);
        await deleteImagesApi(ids);
        onDelete(ids);
      })();
    },
    [onDelete, images]
  );

  const columns = useMemo(
    () => getGalleryColumns({ onEditClick, onDeleteClick, images }),
    [onEditClick, onDeleteClick, images]
  );

  const options = useMemo(
    () => ({
      onRowsDelete: onBulkDelete,
      onRowSelectionChange,
      rowsSelected,
      customToolbarSelect: bulkActions ? undefined : () => null,
    }),
    [onRowSelectionChange, onBulkDelete, rowsSelected]
  );

  const pagination = useMemo(() => {
    if (!paginationUpdated) return;
    return {
      total,
      size,
      page,
      paginationUpdated,
    };
  }, [total, size, page, paginationUpdated]);
  return (
    <>
      <section className={classes.gallery}>
        <MuiTable
          pagination={pagination}
          options={options}
          columns={columns}
          data={images || []}
        />
        <EditImageDialog
          open={modal}
          image={image}
          onClose={closeDialog}
          onSuccessfulSubmit={onSuccessfulSubmit}
        />
      </section>
    </>
  );
};

export default ImageList;
