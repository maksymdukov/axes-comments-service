import { createSlice } from "@reduxjs/toolkit";
import {
  paginationState,
  paginationReducer,
  makePaginationSelector,
} from "utils/redux/pagination/pagination";
import { fetchReducers, fetchState } from "utils/redux/fetch/fetch";
import { commentStatus } from "../comments.constants";
import { fetchAllCommentsApi } from "../apis/get-all-comments.api";

export const allCommentsSlice = createSlice({
  name: "allComments",
  initialState: {
    status: commentStatus.PENDING,
    ...paginationState,
    ...fetchState(),
  },
  reducers: {
    changeStatusFilter: (state, { payload }) => {
      state.status = payload.value;
    },
    changeComment: (state, { payload }) => {
      state.items = state.items.map((comment) => {
        if (comment.id === payload.id) {
          return { ...comment, ...payload.updatedComment };
        }
        return comment;
      });
    },
    ...fetchReducers,
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
export const getAllCommentsPagination = makePaginationSelector("allComments");
export const getAllComments = (state) => state.allComments.items;
export const getAllCommentsStatusFilter = (state) => state.allComments.status;

export const fetchAllComments = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { page, size } = getAllCommentsPagination(state);
    const status = getAllCommentsStatusFilter(state);
    dispatch(fetchStart());
    const { data } = await fetchAllCommentsApi({ page, size, status });
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
