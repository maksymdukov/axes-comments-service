import { createSlice } from "@reduxjs/toolkit";
import {
  paginationState,
  paginationReducer,
  makePaginationSelector,
} from "utils/redux/pagination/pagination";
import { fetchReducers, fetchState } from "utils/redux/fetch/fetch";
import { fetchReviewSlidesApi } from "../apis/get--reviewslides.api";

export const reviewSlidesSlice = createSlice({
  name: "reviewslides",
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
  updatePagination: updateReviewSlidesPagination,
} = reviewSlidesSlice.actions;

export const getReviewSlidesLoading = (state) => state.reviewslides.loading;
export const getReviewSlidesPagination = makePaginationSelector("reviewslides");
export const getReviewSlides = (state) => state.reviewslides.items;

export const fetchReviewSlides = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { page, size } = getReviewSlidesPagination(state);
    dispatch(fetchStart());
    const { data } = await fetchReviewSlidesApi({ page, size });
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

export const reviewSlidesReducer = reviewSlidesSlice.reducer;
