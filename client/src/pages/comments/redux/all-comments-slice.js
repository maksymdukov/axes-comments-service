import { createSlice } from "@reduxjs/toolkit";
import { paginationState, paginationReducer } from "utils/pagination/reducer";
import { fetchAllCommentsApi } from "./all-comments.api";
import { commentStatus } from "constants/comment-status";

export const allCommentsSlice = createSlice({
  name: "allComments",
  initialState: {
    items: [],
    loading: false,
    error: null,
    statusFilter: commentStatus.PENDING,
    ...paginationState,
  },
  reducers: {
    fetchStart: (state) => {
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
  updatePagination: updateAllCommentsPagination,
  changeComment: changeCommentAll,
  changeStatusFilter: changeStatusFilterAllComments,
} = allCommentsSlice.actions;

export const getAllCommentsLoading = (state) => state.allComments.loading;
export const getAllCommentsPage = (state) => state.allComments.page;
export const getAllCommentsSize = (state) => state.allComments.size;
export const getAllCommentsTotal = (state) => state.allComments.total;
export const getAllComments = (state) => state.allComments.items;
export const getAllCommentsStatusFilter = (state) =>
  state.allComments.statusFilter;

export const fetchAllComments = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const page = getAllCommentsPage(state);
    const size = getAllCommentsSize(state);
    const statusFilter = getAllCommentsStatusFilter(state);
    dispatch(fetchStart());
    const { data } = await fetchAllCommentsApi({ page, size, statusFilter });
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

export const allCommentsReducer = allCommentsSlice.reducer;
