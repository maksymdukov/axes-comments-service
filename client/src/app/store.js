import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "features/counter/counterSlice";
import { axesReducer } from "pages/axes/redux/axesSlice";
import { authReducer } from "features/auth/loginSlice";
import { commentsReducer } from "pages/axe/redux/commentsSlice";
import { allCommentsReducer } from "pages/comments/redux/all-comments-slice";
import { allOrdersReducer } from "pages/orders/redux/all-orders-slice";
import { galleryReducer } from "pages/gallery/redux/gallery-slice";
import { productsReducer } from "pages/products/redux/products-slide";

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    axes: axesReducer,
    axe: commentsReducer,
    allComments: allCommentsReducer,
    allOrders: allOrdersReducer,
    gallery: galleryReducer,
    products: productsReducer,
  },
});
