import { createSlice } from "@reduxjs/toolkit";
import {
  paginationState,
  paginationReducer,
  makePaginationSelector,
} from "utils/redux/pagination/pagination";
import { fetchReducers, fetchState } from "utils/redux/fetch/fetch";
import { fetchProductsApi } from "../apis/get-products.api";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    ...paginationState,
    ...fetchState(),
  },
  reducers: {
    ...fetchReducers,
    ...paginationReducer,
  },
});

export const {
  fetchFail,
  fetchStart,
  fetchSuccess,
  updatePagination: updateProductsPagination,
} = productsSlice.actions;

export const getProductsLoading = (state) => state.products.loading;
export const getProductsPagination = makePaginationSelector("products");
export const getProducts = (state) => state.products.items;

export const fetchProducts = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { page, size } = getProductsPagination(state);
    dispatch(fetchStart());
    const { data } = await fetchProductsApi({ page, size });
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

export const productsReducer = productsSlice.reducer;
