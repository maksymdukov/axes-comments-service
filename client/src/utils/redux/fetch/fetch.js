export const fetchReducers = {
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
};

export const fetchState = () => ({
  items: [],
  loading: false,
  error: null,
});
