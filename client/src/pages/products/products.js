import React, { useMemo } from "react";
import Entities from "components/entity/entities";
import { getLanguagesMap } from "utils/languages";
import {
  fetchProducts,
  getProducts,
  getProductsActiveStatus,
  getProductsFeaturedStatus,
  getProductsLoading,
  getProductsPagination,
  updateProductsPagination,
} from "./redux/products-slide";
import { deleteProductApi } from "./apis/delete-product.api";
import { productFormValidation } from "./components/product-form-validation";
import ProductsForm from "./components/products-form";
import { getProductsColumns } from "./products.utils";
import { useSelector } from "react-redux";
import ActiveProductFilter from "./components/active-filter";
import FeaturedProductFilter from "./components/featured-filter";
import { EditorState } from "draft-js";
import { createEditorState } from "components/wysiwyg/sysiwyg.utils";

const useInitialValues = ({ entity }) => {
  const lngMap = useMemo(
    () => getLanguagesMap((entity && entity.languages) || []),
    [entity]
  );

  return useMemo(
    () => ({
      isActive:
        entity && typeof entity.isActive === "boolean" ? entity.isActive : true,
      isFeatured:
        entity && typeof entity.isFeatured === "boolean"
          ? entity.isFeatured
          : false,
      ruTitle: (lngMap.ru && lngMap.ru.title) || "",
      ruDescription: (lngMap.ru && lngMap.ru.description) || "",
      ruLongDescription:
        createEditorState(lngMap.ru && lngMap.ru.longDescription) ||
        EditorState.createEmpty(),
      ukTitle: (lngMap.uk && lngMap.uk.title) || "",
      ukDescription: (lngMap.uk && lngMap.uk.description) || "",
      ukLongDescription:
        createEditorState(lngMap.uk && lngMap.uk.longDescription) ||
        EditorState.createEmpty(),
      price: (entity && entity.price) || 0,
      slug: (entity && entity.slug) || "",
      mainImage: (entity && entity.mainImage && [entity.mainImage]) || [],
      images: (entity && entity.images) || [],
    }),
    [entity]
  );
};

const Products = () => {
  const active = useSelector(getProductsActiveStatus);
  const featured = useSelector(getProductsFeaturedStatus);
  const entityOptions = useMemo(
    () => ({
      getPagination: getProductsPagination,
      getEntities: getProducts,
      getEntitiesLoading: getProductsLoading,
      fetchEntities: fetchProducts,
      updatePagination: updateProductsPagination,
      deleteEntityApi: deleteProductApi,
      fetchDeps: [active, featured],
    }),
    [active, featured]
  );

  const editModalOptions = useMemo(
    () => ({
      useInitialValues,
      validationSchema: productFormValidation,
      EntityForm: ProductsForm,
    }),
    []
  );

  return (
    <>
      <ActiveProductFilter />
      <FeaturedProductFilter />
      <Entities
        title="Продукты"
        getEntitiesColumns={getProductsColumns}
        entityOptions={entityOptions}
        editModalOptions={editModalOptions}
      ></Entities>
    </>
  );
};

export default Products;
