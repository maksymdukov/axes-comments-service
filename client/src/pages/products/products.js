import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button } from "@material-ui/core";
import MainHeader from "components/typography/main-header";
import AddIcon from "@material-ui/icons/Add";
import CreateEditProductModal from "./components/create-edit-product-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  getProductsPagination,
  updateProductsPagination,
  getProducts,
  getProductsLoading,
} from "./redux/products-slide";
import MuiTable from "components/tables/mui-table";
import { getProductsColumns } from "./products.utils";
import { deleteProductApi } from "./apis/delete-product.api";
import { deleteImagesApi } from "pages/gallery/apis/delete-images.api";

const Products = () => {
  const dispatch = useDispatch();
  const { page, size, total } = useSelector(getProductsPagination);
  const products = useSelector(getProducts);
  const [modalOpened, setModalOpened] = useState(false);
  const [productToEdit, setProductToEdit] = useState(undefined);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [page, size]);

  const openModal = useCallback(() => {
    setModalOpened(true);
  }, [setModalOpened]);

  const closeModal = useCallback(() => {
    setModalOpened(false);
  }, [setModalOpened]);

  const onCreateProductClick = useCallback(() => {
    setProductToEdit(undefined);
    setModalOpened(true);
  }, [setModalOpened, setProductToEdit]);

  const onCreateEditSuccess = () => {
    closeModal();
    // refetch
    dispatch(fetchProducts());
  };

  // Table

  const loading = useSelector(getProductsLoading);

  const pagination = useMemo(() => {
    return {
      total,
      size,
      page,
      paginationUpdated: updateProductsPagination,
    };
  }, [total, size, page]);

  const onEditProductClick = useCallback(
    (rowIdx) => {
      setProductToEdit(products[rowIdx]);
      openModal();
    },
    [openModal, setProductToEdit, products]
  );

  const onDeleteProductClick = useCallback(
    async (rowIdx) => {
      const answer = confirm("Действительно хотите удалить?");
      if (!answer) return;
      await deleteProductApi(products[rowIdx].id);
      dispatch(fetchProducts());
    },
    [products, dispatch]
  );

  const onProductBulkDelete = useCallback(
    ({ data }) => {
      const answer = confirm("Действительно хотите удалить?");
      if (!answer) return false;
      (async () => {
        const ids = data.map((dt) => products[dt.dataIndex].id);
        await Promise.all(ids.map(deleteImagesApi));
        dispatch(fetchProducts());
      })();
    },
    [products, dispatch]
  );

  const columns = useMemo(
    () =>
      getProductsColumns({
        products,
        onDeleteClick: onDeleteProductClick,
        onEditClick: onEditProductClick,
      }),
    [products]
  );

  return (
    <div>
      <MainHeader>Товары:</MainHeader>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={onCreateProductClick}
        >
          <AddIcon /> Создать
        </Button>
      </Box>
      <section>
        <MuiTable
          loading={loading}
          options={{
            onRowsDelete: onProductBulkDelete,
          }}
          columns={columns}
          data={products || []}
          pagination={pagination}
        />
      </section>
      <CreateEditProductModal
        open={modalOpened}
        onClose={closeModal}
        product={productToEdit}
        onCreateSuccess={onCreateEditSuccess}
        onEditSuccess={onCreateEditSuccess}
      />
    </div>
  );
};

export default Products;
