import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button } from "@material-ui/core";
import MainHeader from "components/typography/main-header";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import MuiTable from "components/tables/mui-table";
import EntityModal from "components/dialogs/entity-dialog";

const Entities = ({
  title,
  getEntitiesColumns,
  modalOptions,
  entityOptions,
}) => {
  const {
    getPagination,
    getEntities,
    getEntitiesLoading,
    fetchEntities,
    updatePagination,
    deleteEntityApi,
    fetchDeps = [],
  } = entityOptions;
  const dispatch = useDispatch();
  const { page, size, total } = useSelector(getPagination);
  const entities = useSelector(getEntities);
  const [modalOpened, setModalOpened] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState(undefined);

  useEffect(() => {
    dispatch(fetchEntities());
  }, [page, size, ...fetchDeps]);

  const openModal = useCallback(() => {
    setModalOpened(true);
  }, [setModalOpened]);

  const closeModal = useCallback(() => {
    setModalOpened(false);
  }, [setModalOpened]);

  const onCreateEntityClick = useCallback(() => {
    setEntityToEdit(undefined);
    setModalOpened(true);
  }, [setModalOpened, setEntityToEdit]);

  const onCreateEditSuccess = () => {
    closeModal();
    // refetch
    dispatch(fetchEntities());
  };

  // Table

  const loading = useSelector(getEntitiesLoading);

  const pagination = useMemo(() => {
    return {
      total,
      size,
      page,
      paginationUpdated: updatePagination,
    };
  }, [total, size, page]);

  const onEditEntityClick = useCallback(
    (rowIdx) => {
      setEntityToEdit(entities[rowIdx]);
      openModal();
    },
    [openModal, setEntityToEdit, entities]
  );

  const onDeleteEntityClick = useCallback(
    async (rowIdx) => {
      const answer = confirm("Действительно хотите удалить?");
      if (!answer) return;
      await deleteEntityApi(entities[rowIdx].id);
      dispatch(fetchEntities());
    },
    [entities, dispatch]
  );

  const onEntityBulkDelete = useCallback(
    ({ data }) => {
      const answer = confirm("Действительно хотите удалить?");
      if (!answer) return false;
      (async () => {
        const ids = data.map((dt) => entities[dt.dataIndex].id);
        await Promise.all(ids.map(deleteEntityApi));
        dispatch(fetchEntities());
      })();
    },
    [entities, dispatch]
  );

  const columns = useMemo(
    () =>
      getEntitiesColumns({
        entities,
        onDeleteClick: onDeleteEntityClick,
        onEditClick: onEditEntityClick,
      }),
    [entities, onDeleteEntityClick, onEditEntityClick, getEntitiesColumns]
  );

  return (
    <div>
      <MainHeader>{title}</MainHeader>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={onCreateEntityClick}
        >
          <AddIcon /> Создать
        </Button>
      </Box>
      <section>
        <MuiTable
          loading={loading}
          options={{
            onRowsDelete: onEntityBulkDelete,
          }}
          columns={columns}
          data={entities || []}
          pagination={pagination}
        />
      </section>
      <EntityModal
        entity={entityToEdit}
        modalOptions={modalOptions}
        open={modalOpened}
        onClose={closeModal}
        product={entityToEdit}
        onCreateSuccess={onCreateEditSuccess}
        onEditSuccess={onCreateEditSuccess}
      />
    </div>
  );
};

export default Entities;
