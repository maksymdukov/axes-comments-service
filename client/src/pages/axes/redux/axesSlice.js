import { createSlice } from "@reduxjs/toolkit";
import { fetchAxesApi } from "./fetchAxes.api";
import {
  paginationState,
  paginationReducer,
  makePaginationSelector,
} from "utils/redux/pagination/pagination";
import { fetchReducers, fetchState } from "utils/redux/fetch/fetch";

export const axesSlice = createSlice({
  name: "axes",
  initialState: {
    ...fetchState(),
    ...paginationState,
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
  updatePagination: updateAxesPagination,
} = axesSlice.actions;

export const getAxesPagination = makePaginationSelector("axes");
export const getAxes = (state) => state.axes.items;
export const getAxesLoading = (state) => state.axes.loading;

export const fetchAxes = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { page, size } = getAxesPagination(state);
    dispatch(fetchStart());
    const { data } = await fetchAxesApi({ page, size });
    dispatch(fetchSuccess({ items: data.items, total: data.total }));
  } catch (error) {
    dispatch(fetchFail({ error }));
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const axesReducer = axesSlice.reducer;
