import { SET_CURRENT_USER } from "../type";
import { addError, removeError } from "./error";
import { setLoading } from "./loading";
import { setAccessToken } from "../../services/api.js";
import { call } from "../../services/api.js";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const setToken = (token) => setAccessToken(token);

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAccessToken(null);
    dispatch(setCurrentUser({}));
    dispatch(removeError());
  };
};

export const authUser = (path, data) => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await call("post", `${path}`, data);
      const { name, phone, position, access_token, shop } = response.data;

      localStorage.setItem("jwtToken", access_token);
      setAccessToken(access_token);
      dispatch(setCurrentUser({ name, phone, position, shop }));
      dispatch(removeError());
    } catch (error) {
      alert("Login Failed");
      // if (error.response.status === 401) {
      //   dispatch(addError(error.response.data.data.message));
      // } else {
      //   dispatch(addError(error.response.data.message));
      // }
      localStorage.removeItem("jwtToken");
      dispatch(setCurrentUser({}));
    }
    dispatch(setLoading());
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const response = await call("get", "user");
      const { name, phone, position, shop } = response.data;

      dispatch(setCurrentUser({ name, phone, position, shop }));
      dispatch(removeError());
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(setCurrentUser({}));
        localStorage.removeItem("jwtToken");
        dispatch(addError(error.response.data.data));
      } else {
        dispatch(addError(error.response.data.message));
      }
    }
    dispatch(setLoading());
  };
};
