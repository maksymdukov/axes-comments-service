import { config } from "config";

export const paginationReducer = {
  updatePagination: (state, { payload }) => {
    if (payload.page) {
      state.page = payload.page;
    }
    if (payload.size) {
      state.size = payload.size;
    }
    if (payload.total) {
      state.size = payload.total;
    }
  },
};

export const paginationState = {
  page: config.DEFAULT_PAGE,
  size: config.DEFAULT_SIZE,
  total: null,
};

export const makePaginationSelector = (path) => (state) => ({
  page: state[path].page,
  size: state[path].size,
  total: state[path].total,
});
