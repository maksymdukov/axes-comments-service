const DEFAULT_SIZE = 10;
const DEFAULT_PAGE = 1;

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
  page: DEFAULT_PAGE,
  size: DEFAULT_SIZE,
  total: null,
};

export const makePaginationSelector = (path) => (state) => ({
  page: state[path].page,
  size: state[path].size,
  total: state[path].total,
});
