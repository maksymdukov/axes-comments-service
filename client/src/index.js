import React from "react";
import ReactDOM from "react-dom";
import store from "./app/store";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
