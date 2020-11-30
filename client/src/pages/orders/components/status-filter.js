import React from "react";
import SelectFilter from "components/filters/select-filter";
import { orderStatus } from "../orders.constants";
import {
  changeStatusFilterAllOrders,
  getAllOrdersStatusFilter,
} from "../redux/all-orders-slice";

const options = [
  { label: "Все", value: "" },
  { label: "Новые", value: orderStatus.NEW },
  { label: "В обработке", value: orderStatus.PROCESSING },
  { label: "Заавершенные", value: orderStatus.COMPLETED },
  { label: "Отмененные", value: orderStatus.CANCELED },
];

const OrderStatusFilter = () => {
  return (
    <SelectFilter
      label="Статус:"
      options={options}
      getFilterStatus={getAllOrdersStatusFilter}
      updateFilterStatus={changeStatusFilterAllOrders}
    />
  );
};

export default OrderStatusFilter;
