import React, { useEffect } from "react";
import MainHeader from "components/typography/main-header";
import OrderFilters from "components/filters/order-filters";
import {
  updateAllOrdersPagination,
  getAllOrdersStatusFilter,
  changeStatusFilterAllOrders,
  getAllOrders,
  getAllOrdersLoading,
  fetchAllOrders,
  getAllOrdersPagination,
} from "./redux/all-orders-slice";
import Paginator from "components/pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import ExpansionItem from "./components/expansion-item";
import CenteredLoader from "components/loader/centered-loader";
import NoData from "components/typography/no-data";

const Orders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(getAllOrders);
  const { size, page } = useSelector(getAllOrdersPagination);
  const loading = useSelector(getAllOrdersLoading);
  const statusFilter = useSelector(getAllOrdersStatusFilter);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [page, size, statusFilter, dispatch]);

  return (
    <div>
      <MainHeader>Заказы:</MainHeader>
      <OrderFilters
        pageSizeProps={{
          updatePagination: updateAllOrdersPagination,
          getPaginationState: getAllOrdersPagination,
        }}
        statusFilterProps={{
          getStatusFilter: getAllOrdersStatusFilter,
          updateStatusFilter: changeStatusFilterAllOrders,
        }}
      />
      {allOrders.map((order) => (
        <ExpansionItem key={order.id} order={order} />
      ))}
      {!allOrders.length && !loading && <NoData />}
      <CenteredLoader loading={loading} />
      <Paginator
        getPaginationState={getAllOrdersPagination}
        updatePagination={updateAllOrdersPagination}
      />
    </div>
  );
};

export default Orders;
