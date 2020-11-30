import React from "react";
import {
  updateAllOrdersPagination,
  getAllOrdersStatusFilter,
  getAllOrders,
  fetchAllOrders,
  getAllOrdersPagination,
  getAllOrdersLoading,
} from "./redux/all-orders-slice";
import { useSelector } from "react-redux";
import Entities from "components/entity/entities";
import { getOrderColumns } from "./orders.utils";
import { deleteOrderApi } from "./apis/delete-order.api";
import OrderStatusFilter from "./components/status-filter";
import OrderCard from "./components/order-card";
import getCustomSelectBar from "./components/custom-select-bar";

const Orders = () => {
  const status = useSelector(getAllOrdersStatusFilter);
  const entityOptions = {
    getPagination: getAllOrdersPagination,
    getEntities: getAllOrders,
    getEntitiesLoading: getAllOrdersLoading,
    fetchEntities: fetchAllOrders,
    updatePagination: updateAllOrdersPagination,
    deleteEntityApi: deleteOrderApi,
    fetchDeps: [status],
  };

  const editModalOptions = {
    useInitialValues: () => {},
    EntityForm: function EntityForm() {
      return null;
    },
  };

  const tableOptions = {
    customToolbarSelect: getCustomSelectBar,
  };

  const viewModalOptions = {
    View: OrderCard,
    fullWidth: true,
    maxWidth: "md",
    getTitle: (title) => `Заказ ID ${title.id}`,
  };

  return (
    <>
      <OrderStatusFilter />
      <Entities
        title="Заказы"
        createBtn={false}
        view={true}
        edit={false}
        getEntitiesColumns={getOrderColumns}
        entityOptions={entityOptions}
        editModalOptions={editModalOptions}
        tableOptions={tableOptions}
        viewModalOptions={viewModalOptions}
      />
    </>
  );
};

export default Orders;
