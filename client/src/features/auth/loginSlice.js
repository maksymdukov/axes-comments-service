import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { history } from "index";

const authRaw = localStorage.getItem("auth");
const initialState = {
  authenticated: false,
  loading: false,
  email: null,
  token: null,
};
if (authRaw) {
  const auth = JSON.parse(authRaw);
  if (auth.exp * 1000 > Date.now()) {
    initialState.authenticated = true;
    initialState.email = auth.email;
    initialState.token = auth.token;
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.authenticated = true;
      state.loading = false;
      state.email = payload.email;
      state.token = payload.token;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginFail: (state) => {
      state.loading = false;
      state.authenticated = false;
    },
    logout: (state) => {
      state.authenticated = false;
      state.email = null;
    },
  },
});

export const {
  loginSuccess,
  loginStart,
  loginFail,
  logout,
} = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const login = (token) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const decoded = jwtDecode(token);
    localStorage.setItem(
      "auth",
      JSON.stringify({
        token,
        exp: decoded.exp,
      })
    );
    dispatch(loginSuccess({ token, email: decoded.email }));
    dispatch(setExpTimeout({ token, email: decoded.email, exp: decoded.exp }));
    history.push("/");
  } catch (e) {
    dispatch(loginFail());
  }
};

export const setExpTimeout = ({ token, email, exp }) => (dispatch) => {
  localStorage.setItem(
    "auth",
    JSON.stringify({
      token,
      email,
      exp,
    })
  );
  const delay = exp * 1000 - Date.now();
  setTimeout(() => {
    dispatch(doLogout());
  }, delay);
};

export const doLogout = () => (dispatch) => {
  dispatch(logout());
  localStorage.removeItem("auth");
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getIsAuthenticated = (state) => state.auth.authenticated;

export const authReducer = authSlice.reducer;
