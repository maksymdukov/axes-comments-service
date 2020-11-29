import React, { useMemo } from "react";
import ConfirmationDialog from "components/dialogs/confirmation-dialog";
import { getLanguagesMap } from "utils/languages";
import { Formik } from "formik";
import ProductForm from "./product-form";
import { makeStyles } from "@material-ui/core";
import { productFormValidation } from "./product-form-validation";

const useStyles = makeStyles(({ palette }) => ({
  greyBG: {
    backgroundColor: palette.grey[400],
  },
}));

const CreateEditProductModal = ({
  open,
  onClose,
  product,
  onCreateSuccess,
  onEditSuccess,
}) => {
  const classes = useStyles();
  const lngMap = useMemo(
    () => getLanguagesMap((product && product.languages) || []),
    [product]
  );

  const initValues = {
    isActive:
      product && typeof product.isActive === "boolean"
        ? product.isActive
        : true,
    isFeatured:
      product && typeof product.isFeatured === "boolean"
        ? product.isFeatured
        : false,
    ruTitle: (lngMap.ru && lngMap.ru.title) || "",
    ruDescription: (lngMap.ru && lngMap.ru.description) || "",
    ruLongDescription: (lngMap.ru && lngMap.ru.longDescription) || "",
    ukTitle: (lngMap.uk && lngMap.uk.title) || "",
    ukDescription: (lngMap.uk && lngMap.uk.description) || "",
    ukLongDescription: (lngMap.uk && lngMap.uk.longDescription) || "",
    price: (product && product.price) || 0,
    slug: (product && product.slug) || "",
    mainImage: (product && product.mainImage && [product.mainImage]) || [],
    images: (product && product.images) || [],
  };
  return (
    <ConfirmationDialog
      fullScreen
      open={open}
      title={product ? "Редактировать" : "Создать"}
      onClose={onClose}
      actions={false}
      content={false}
      titleClassname={classes.greyBG}
      closeIcon
    >
      <Formik
        initialValues={initValues}
        validationSchema={productFormValidation}
        enableReinitialize={true}
        validateOnMount={!!product}
      >
        {(props) => (
          <ProductForm
            {...props}
            product={product}
            onClose={onClose}
            onCreateSuccess={onCreateSuccess}
            onEditSuccess={onEditSuccess}
          />
        )}
      </Formik>
    </ConfirmationDialog>
  );
};

export default CreateEditProductModal;
