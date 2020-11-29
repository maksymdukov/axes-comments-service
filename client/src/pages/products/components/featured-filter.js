import React from "react";
import SelectFilter from "components/filters/select-filter";
import {
  getProductsFeaturedStatus,
  updateProductsFeaturedStatus,
} from "../redux/products-slide";

const options = [
  { label: "Все", value: "" },
  { label: "Лучшие", value: "true" },
  { label: "Обычные", value: "false" },
];

const FeaturedProductFilter = () => {
  return (
    <SelectFilter
      label="Лучшие:"
      options={options}
      getFilterStatus={getProductsFeaturedStatus}
      updateFilterStatus={updateProductsFeaturedStatus}
    />
  );
};

export default FeaturedProductFilter;
