import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import decode from "jwt-decode";
import { setCurrentUser, addError, setToken, getUser } from "./store/actions";
import 'react-toastify/dist/ReactToastify.css';


const token = localStorage.getItem("jwtToken");

if (token) {
  setToken(token);
  try {
    store.dispatch(setCurrentUser(decode(token)));
    store.dispatch(getUser());
  } catch (error) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(error));
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
