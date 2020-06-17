import React from "react";
import Filters from "./filters";
import { orderStatus } from "constants/order-status";

const statusOptions = [
  { label: "Все", status: "" },
  { label: "Новые", status: orderStatus.NEW },
  { label: "В ообработке", status: orderStatus.PROCESSING },
  { label: "Закрытые", status: orderStatus.COMPLETED },
];

const OrderFilters = ({ pageSizeProps, statusFilterProps }) => {
  return (
    <Filters
      pageSizeProps={{ ...pageSizeProps, options: [2, 5, 10, 20] }}
      statusFilterProps={{ ...statusFilterProps, options: statusOptions }}
    />
  );
};

export default OrderFilters;
