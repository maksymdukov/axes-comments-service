import React from "react";
import MainHeader from "components/typography/main-header";
import {
  updateAllOrdersPagination,
  getAllOrdersStatusFilter,
  getAllOrders,
  fetchAllOrders,
  getAllOrdersPagination,
} from "./redux/all-orders-slice";
import { useSelector } from "react-redux";
import Entities from "components/entity/entities";
import { getOrderColumns } from "./orders.utils";
import { deleteOrderApi } from "./apis/delete-order.api";
import getCustomSelectBar from "./components/custom-select-bar";
import ViewOrder from "./components/view-order";
import OrderStatusFilter from "./components/status-filter";

const Orders = () => {
  const status = useSelector(getAllOrdersStatusFilter);
  const entityOptions = {
    getPagination: getAllOrdersPagination,
    getEntities: getAllOrders,
    getEntitiesLoading: getAllOrdersPagination,
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
    View: ViewOrder,
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
