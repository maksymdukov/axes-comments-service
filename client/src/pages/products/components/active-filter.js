import React from "react";
import SelectFilter from "components/filters/select-filter";
import {
  getProductsActiveStatus,
  updateProductsActiveStatus,
} from "../redux/products-slide";

const options = [
  { label: "Все", value: "" },
  { label: "Активные", value: "true" },
  { label: "Неактивные", value: "false" },
];

const ActiveProductFilter = () => {
  return (
    <SelectFilter
      label="Активные:"
      options={options}
      getFilterStatus={getProductsActiveStatus}
      updateFilterStatus={updateProductsActiveStatus}
    />
  );
};

export default ActiveProductFilter;
