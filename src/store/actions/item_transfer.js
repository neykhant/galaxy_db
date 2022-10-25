import {
  SHOW_ITEMS_TRANSFER,
  SHOW_TRANSFER,
  CREATE_ITEMS_TRANSFER,
  FILTER_ITEMS_TRANSFER,
  UPDATE_ITEMS_TRANSFER,
  ERROR_TRANSFERS,
  CLEAR_ALERT,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import axios from "axios";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";


export const showItemTransfers = (itemTransfers) => ({
  type: SHOW_ITEMS_TRANSFER,
  itemTransfers: itemTransfers
});

export const showItemTransfer = (itemTransfer) => ({
  type: SHOW_TRANSFER,
  itemTransfer: itemTransfer
});

export const createItemTransfers = (itemTransfer) => ({
  type: CREATE_ITEMS_TRANSFER,
  itemTransfer
});

export const updateItemTransfers = (data) => ({
  type: UPDATE_ITEMS_TRANSFER,
  data
});

export const filterItemTransfers = (id) => ({
  type: FILTER_ITEMS_TRANSFER,
  id
});

export const setTransferErrors = (error) => ({
  type: ERROR_TRANSFERS,
  error
});

export const getItemTransfers = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${apiUrl}item-transfers`);
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showItemTransfers(result));
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

export const getItemTransfer = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(`${apiUrl}item-transfers/${id}`);
      const result = response.data.data;
      console.log(result);
      if (response.status === 200) {
        dispatch(showItemTransfer(result));
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

export const saveItemTransfers = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(
        `${apiUrl}item-transfers/batchInsert`,
        data
      );
      dispatch({ type: SET_SUCCESS, payload: true });
      dispatch({
        type: REMOVE_ERROR
      });
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

export const editItemTransfers = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}items/${id}?_method=put`,
        data
      );
      console.log(response);
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      // console.log(result);
      if (response.status === 204) {
        dispatch(updateItemTransfers(result));
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

export const deleteItemTransfers = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}item-transfers/${id}`);
      console.log(response);
      if (response.status === 204) {
        dispatch(filterItemTransfers(id));
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
