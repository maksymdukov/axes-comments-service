import React, { useMemo } from "react";
import Entities from "components/entity/entities";
import { getLanguagesMap } from "utils/languages";
import {
  fetchProducts,
  getProducts,
  getProductsLoading,
  getProductsPagination,
  updateProductsPagination,
} from "./redux/products-slide";
import { deleteProductApi } from "./apis/delete-product.api";
import { productFormValidation } from "./components/product-form-validation";
import ProductsForm from "./components/products-form";
import { getProductsColumns } from "./products.utils";

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
      ruLongDescription: (lngMap.ru && lngMap.ru.longDescription) || "",
      ukTitle: (lngMap.uk && lngMap.uk.title) || "",
      ukDescription: (lngMap.uk && lngMap.uk.description) || "",
      ukLongDescription: (lngMap.uk && lngMap.uk.longDescription) || "",
      price: (entity && entity.price) || 0,
      slug: (entity && entity.slug) || "",
      mainImage: (entity && entity.mainImage && [entity.mainImage]) || [],
      images: (entity && entity.images) || [],
    }),
    [entity]
  );
};

const Products = () => {
  const entityOptions = useMemo(
    () => ({
      getPagination: getProductsPagination,
      getEntities: getProducts,
      getEntitiesLoading: getProductsLoading,
      fetchEntities: fetchProducts,
      updatePagination: updateProductsPagination,
      deleteEntityApi: deleteProductApi,
    }),
    []
  );

  const modalOptions = useMemo(
    () => ({
      useInitialValues,
      validationSchema: productFormValidation,
      EntityForm: ProductsForm,
    }),
    []
  );

  return (
    <Entities
      title="Продукты"
      getEntitiesColumns={getProductsColumns}
      entityOptions={entityOptions}
      modalOptions={modalOptions}
    ></Entities>
  );
};

export default Products;
