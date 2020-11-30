import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button } from "@material-ui/core";
import MainHeader from "components/typography/main-header";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import MuiTable from "components/tables/mui-table";
import EntityEditModal from "components/dialogs/entity-edit-dialog";
import EntityViewModal from "components/dialogs/entity-view-dialog";

const Entities = ({
  title,
  getEntitiesColumns,
  editModalOptions,
  viewModalOptions = {},
  entityOptions,
  tableOptions = {},
  createBtn = true,
  view = false,
  edit = true,
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

  const { customToolbarSelect } = tableOptions;
  const dispatch = useDispatch();
  const { page, size, total } = useSelector(getPagination);
  const entities = useSelector(getEntities);
  const [modalOpened, setModalOpened] = useState(false);
  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [entity, setEntity] = useState(undefined);

  useEffect(() => {
    dispatch(fetchEntities());
  }, [page, size, ...fetchDeps]);

  const openModal = useCallback(() => {
    setModalOpened(true);
  }, [setModalOpened]);

  const closeModal = useCallback(() => {
    setModalOpened(false);
  }, [setModalOpened]);

  const closeViewModal = useCallback(() => {
    setViewModalOpened(false);
  }, [setViewModalOpened]);

  const onCreateEntityClick = useCallback(() => {
    setEntity(undefined);
    setModalOpened(true);
  }, [setModalOpened, setEntity]);

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
      setEntity(entities[rowIdx]);
      openModal();
    },
    [openModal, setEntity, entities]
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

  const onEntityViewClick = useCallback(async (rowData, { dataIndex }) => {
    setEntity(entities[dataIndex]);
    setViewModalOpened(true);
  });

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
        edit,
        entities,
        onDeleteClick: onDeleteEntityClick,
        onEditClick: onEditEntityClick,
      }),
    [
      entities,
      onDeleteEntityClick,
      onEditEntityClick,
      getEntitiesColumns,
      fetchEntities,
      dispatch,
    ]
  );

  const tableOpts = useMemo(
    () => ({
      onRowsDelete: onEntityBulkDelete,
      onRowClick: view ? onEntityViewClick : undefined,
      customToolbarSelect: customToolbarSelect
        ? customToolbarSelect({
            entities,
            onEntityBulkDelete,
            refetchEntities: () => dispatch(fetchEntities()),
          })
        : undefined,
    }),
    [
      entities,
      onEntityBulkDelete,
      view,
      onEntityViewClick,
      customToolbarSelect,
      dispatch,
      fetchEntities,
    ]
  );

  return (
    <div>
      <MainHeader>{title}</MainHeader>
      {createBtn && (
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
      )}
      <section>
        <MuiTable
          loading={loading}
          options={tableOpts}
          columns={columns}
          data={entities || []}
          pagination={pagination}
        />
      </section>
      {edit && (
        <EntityEditModal
          entity={entity}
          modalOptions={editModalOptions}
          open={modalOpened}
          onClose={closeModal}
          onCreateSuccess={onCreateEditSuccess}
          onEditSuccess={onCreateEditSuccess}
        />
      )}
      {view && (
        <EntityViewModal
          modalOptions={viewModalOptions}
          entity={entity}
          onClose={closeViewModal}
          open={viewModalOpened}
        />
      )}
    </div>
  );
};

export default Entities;
