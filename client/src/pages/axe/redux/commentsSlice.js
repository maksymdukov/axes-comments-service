import { createSlice } from "@reduxjs/toolkit";
import { fetchCommentsApi } from "./comments.api";

export const commentsSlice = createSlice({
  name: "axe",
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

export const { fetchFail, fetchStart, fetchSuccess } = commentsSlice.actions;

export const getCommentsPage = (state) => state.axe.page;
export const getCommentsSize = (state) => state.axe.size;
export const getCommentsBySlug = (state) => state.axe.items;

export const fetchCommentsBySlug = (slug) => async (dispatch, getState) => {
  try {
    const state = getState();
    const page = getCommentsPage(state);
    const size = getCommentsSize(state);
    dispatch(fetchStart());
    const { data } = await fetchCommentsApi({ page, size, slug });
    dispatch(fetchSuccess({ items: data.items, total: data.total }));
  } catch (error) {
    dispatch(fetchFail({ error }));
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const commentsReducer = commentsSlice.reducer;
