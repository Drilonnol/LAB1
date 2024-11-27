import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";

import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const inialState ={}
const middleWare = thunk;

let store;
const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

store=createStore(rootReducer, inialState , composeEnhancer(applyMiddleware(middleWare)));

export default store;
