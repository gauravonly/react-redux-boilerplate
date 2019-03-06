import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { apiMiddleware } from "redux-api-middleware";

import reducer from "./reducers";

const middleware = applyMiddleware(apiMiddleware, promise(), thunk, logger());
// NOTE : Used if need for persisted Storage
// const persistedState = sessionStorage.getItem("reduxState")
//   ? JSON.parse(sessionStorage.getItem("reduxState"))
//   : {};

const persistedState = {};

export default createStore(reducer, persistedState, middleware);
