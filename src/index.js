import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// import { Model } from 'falcor';
// import { FalcorProvider } from 'redux-falcor';
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import AppContainer from "./AppContainer";
import { Router, Route } from "react-router";
// import { retrievePath } from "redux-falcor";
import reducer from "./reducer";

// Create Store
const store = createStore(
	reducer,
	applyMiddleware(thunk)
);

// Render App
render(
  <Provider store={ store }>
    <AppContainer />
  </Provider>
, document.getElementById("app"));
