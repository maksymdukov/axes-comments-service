import { createSlice } from "@reduxjs/toolkit";
import { fetchAxesApi } from "./fetchAxes.api";

export const axesSlice = createSlice({
  name: "axes",
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    size: 10,
    total: null,
  },
  reducers: {
    fetchStart: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.loading = true;
      state.items = [];
    },
    fetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.items = payload.items;
      state.total = payload.total;
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.items = [];
      state.error = payload.error || "error";
    },
  },
});

export const { fetchFail, fetchStart, fetchSuccess } = axesSlice.actions;

export const getAxesPage = (state) => state.axes.page;
export const getAxesSize = (state) => state.axes.size;
export const getAxes = (state) => state.axes.items;

export const fetchAxes = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const page = getAxesPage(state);
    const size = getAxesSize(state);
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
