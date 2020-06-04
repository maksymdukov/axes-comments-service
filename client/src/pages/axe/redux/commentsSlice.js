import { createSlice } from "@reduxjs/toolkit";
import { fetchCommentsApi } from "./fetchComments.api";
import { paginationState, paginationReducer } from "utils/pagination/reducer";

export const commentsSlice = createSlice({
  name: "axe",
  initialState: {
    axe: null,
    items: [],
    loading: false,
    error: null,
    statusFilter: "",
    ...paginationState,
  },
  reducers: {
    fetchStart: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.loading = true;
      state.items = [];
      state.axe = null;
    },
    fetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.items = payload.items;
      state.total = payload.total;
      state.axe = payload.axe;
    },
    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.items = [];
      state.error = payload.error || "error";
      state.axe = null;
    },
    changeStatusFilter: (state, { payload }) => {
      state.statusFilter = payload.statusFilter;
    },
    changeComment: (state, { payload }) => {
      state.items = state.items.map((comment) => {
        if (comment.id === payload.id) {
          return { ...comment, ...payload.updatedComment };
        }
        return comment;
      });
    },
    ...paginationReducer,
  },
});

export const {
  fetchFail,
  fetchStart,
  fetchSuccess,
  updatePagination: updateCommentPagination,
  changeComment,
  changeStatusFilter: changeStatusFilterAxe,
} = commentsSlice.actions;

export const getCommentsLoading = (state) => state.axe.loading;
export const getCommentsPage = (state) => state.axe.page;
export const getCommentsSize = (state) => state.axe.size;
export const getCommentsTotal = (state) => state.axe.total;
export const getCommentsBySlug = (state) => state.axe.items;
export const getAxeOnComments = (state) => state.axe.axe;
export const getAxeStatusFilter = (state) => state.axe.statusFilter;

export const fetchCommentsBySlug = (slug) => async (dispatch, getState) => {
  try {
    const state = getState();
    const page = getCommentsPage(state);
    const size = getCommentsSize(state);
    const statusFilter = getAxeStatusFilter(state);
    dispatch(fetchStart());
    const { data } = await fetchCommentsApi({ page, size, slug, statusFilter });
    dispatch(
      fetchSuccess({ items: data.items, total: data.total, axe: data.axe })
    );
  } catch (error) {
    dispatch(fetchFail({ error }));
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const commentsReducer = commentsSlice.reducer;
