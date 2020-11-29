import { createSlice } from "@reduxjs/toolkit";
import {
  paginationState,
  paginationReducer,
  makePaginationSelector,
} from "utils/redux/pagination/pagination";
import { fetchReducers, fetchState } from "utils/redux/fetch/fetch";
import { fetchSlidesApi } from "../apis/get-slides.api";

export const slidesSlice = createSlice({
  name: "slides",
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
  updatePagination: updateSlidesPagination,
} = slidesSlice.actions;

export const getSlidesLoading = (state) => state.slides.loading;
export const getSlidesPagination = makePaginationSelector("slides");
export const getSlides = (state) => state.slides.items;

export const fetchSlides = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { page, size } = getSlidesPagination(state);
    dispatch(fetchStart());
    const { data } = await fetchSlidesApi({ page, size });
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

export const slidesReducer = slidesSlice.reducer;
