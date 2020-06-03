import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "features/counter/counterSlice";
import { axesReducer } from "pages/axes/redux/axesSlice";
import { authReducer } from "features/auth/loginSlice";
import { commentsReducer } from "pages/axe/redux/commentsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    axes: axesReducer,
    axe: commentsReducer,
  },
});
