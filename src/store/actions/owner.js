import axios from "axios";
import {
  SHOW_OWNERS,
  SHOW_OWNER,
  CREATE_OWNERS,
  UPDATE_OWNERS,
  FILTER_OWNERS,
  ERROR_OWNER,
  CLEAR_ALERT,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";

export const showOwners = (owners) => ({
  type: SHOW_OWNERS,
  owners
});

export const showOwner = (owner) => ({
  type: SHOW_OWNER,
  owner
});

export const createOwners = (owner) => ({
  type: CREATE_OWNERS,
  owner
});

export const filterOwners = (id) => ({
  type: FILTER_OWNERS,
  id
});

export const updateOwners = (data) => ({
  type: UPDATE_OWNERS,
  data
});

export const setOwnerError = (error) => ({
  type: ERROR_OWNER,
  error
});

export const getOwners = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}owner-used-items`);
      const result = response.data.data.map((owner) => {
        return {
          ...owner,
          key: owner.id
        };
      });
      if (response.status === 200) {
        dispatch(showOwners(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setOwnerError(error.response.data.data));
      } else {
        dispatch(setOwnerError(error.response.data));
      }
    }
  };
};

export const getOwner = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      // console.log(id);
      const response = await axios.get(`${apiUrl}owner-used-items/${id}`);
      const result = response.data.data;

      if (response.status === 200) {
        dispatch(showOwner(result));
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_LOADING });

  };
};

export const saveOwners = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(`${apiUrl}owner-used-items`, data);
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createOwners(result));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;
      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const deleteOwners = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}owner-used-items/${id}`);
      //   console.log(response)
      if (response.status === 204) {
        dispatch(filterOwners(id));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const editOwners = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}owner-used-items/${id}?_method=put`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(updateOwners(result));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};
