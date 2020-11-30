import { createSlice } from "@reduxjs/toolkit";
import {
  paginationState,
  paginationReducer,
  makePaginationSelector,
} from "utils/redux/pagination/pagination";
import { fetchState, fetchReducers } from "utils/redux/fetch/fetch";
import { fetchAllOrdersApi } from "../apis/get-orders.api";

export const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: {
    statusFilter: "",
    ...fetchState(),
    ...paginationState,
  },
  reducers: {
    changeStatusFilter: (state, { payload }) => {
      state.statusFilter = payload.value;
    },
    changeOrder: (state, { payload }) => {
      state.items = state.items.map((order) => {
        if (order.id === payload.id) {
          return { ...order, ...payload.updatedOrder };
        }
        return order;
      });
    },
    ...paginationReducer,
    ...fetchReducers,
  },
});

export const {
  fetchFail,
  fetchStart,
  fetchSuccess,
  updatePagination: updateAllOrdersPagination,
  changeOrder: changeOrderAll,
  changeStatusFilter: changeStatusFilterAllOrders,
} = allOrdersSlice.actions;

export const getAllOrdersLoading = (state) => state.allOrders.loading;
export const getAllOrdersPagination = makePaginationSelector("allOrders");
export const getAllOrders = (state) => state.allOrders.items;
export const getAllOrdersStatusFilter = (state) => state.allOrders.statusFilter;

export const fetchAllOrders = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { page, size } = getAllOrdersPagination(state);
    const status = getAllOrdersStatusFilter(state);
    dispatch(fetchStart());
    const { data } = await fetchAllOrdersApi({ page, size, status });
    dispatch(fetchSuccess({ items: data.items, total: data.total }));
  } catch (error) {
    console.log(error);

    dispatch(fetchFail({}));
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const allOrdersReducer = allOrdersSlice.reducer;
