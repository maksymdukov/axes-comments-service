import { createSlice } from "@reduxjs/toolkit";
import {
  paginationState,
  paginationReducer,
  makePaginationSelector,
} from "utils/redux/pagination/pagination";
import { fetchReducers, fetchState } from "utils/redux/fetch/fetch";
import { fetchPagesApi } from "../apis/get-pages.api";

export const pagesSlice = createSlice({
  name: "pages",
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
  updatePagination: updatePagesPagination,
} = pagesSlice.actions;

export const getPagesLoading = (state) => state.pages.loading;
export const getPagesPagination = makePaginationSelector("pages");
export const getPages = (state) => state.pages.items;

export const fetchPages = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { page, size } = getPagesPagination(state);
    dispatch(fetchStart());
    const { data } = await fetchPagesApi({ page, size });
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

export const pagesReducer = pagesSlice.reducer;
