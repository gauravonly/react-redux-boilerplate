import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/Presentational/App";
import store from "./store";
import "./assets/styles/index.scss";

const app = document.getElementById("app");


// Used if we need persistedStorage
// store.subscribe(() => {
//   sessionStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router>
        <App />
      </Router>
    </div>
  </Provider>,
  app
);
