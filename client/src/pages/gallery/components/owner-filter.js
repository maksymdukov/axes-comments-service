import SelectFilter from "components/filters/select-filter";
import React from "react";
import {
  getGalleryOwnerFilter,
  updateImageOwnerFilter,
} from "../redux/gallery-slice";

const options = [
  { label: "Все", value: "" },
  { label: "Админ", value: "true" },
  { label: "Юзер", value: "false" },
];

const OwnerFilter = () => {
  return (
    <SelectFilter
      label="Владелец"
      options={options}
      getFilterStatus={getGalleryOwnerFilter}
      updateFilterStatus={updateImageOwnerFilter}
      mb={2}
    ></SelectFilter>
  );
};

export default OwnerFilter;
