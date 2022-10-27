import axios from "axios";
import {
  SHOW_MERCHANTS,
  SHOW_MERCHANT,
  CREATE_MERCHANTS,
  UPDATE_MERCHANTS,
  FILTER_MERCHANTS,
  ERROR_MERCHANT,
  IS_SUCCESS_MERCHANT,
  CLEAR_ALERT,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";

export const showMerchants = (merchants) => ({
  type: SHOW_MERCHANTS,
  merchants
});

export const showMerchant = (merchant) => ({
  type: SHOW_MERCHANT,
  merchant
});

export const createMerchants = (merchant) => ({
  type: CREATE_MERCHANTS,
  merchant
});

export const filterMerchants = (id) => ({
  type: FILTER_MERCHANTS,
  id
});

export const updateMerchants = (data) => ({
  type: UPDATE_MERCHANTS,
  data
});

export const setMerchantError = (error) => ({
  type: ERROR_MERCHANT,
  error
});

export const clearAlertMerchant = () => ({
  type: CLEAR_ALERT
});

export const merchantSuccess = (isSuccess) => ({
  type: IS_SUCCESS_MERCHANT,
  isSuccess
});

export const getMerchants = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(`${apiUrl}merchants`);
      const result = response.data.data.map((merchant) => {
        return {
          ...merchant,
          key: merchant.id
        };
      });
      if (response.status === 200) {
        dispatch(showMerchants(result));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setMerchantError("There was an error during Creating....!"));
      } else {
        dispatch(setMerchantError("There was an error during Creating....!"));
      }
    }
    dispatch({ type: SET_LOADING });
  };
};

export const getMerchant = (id) => {
  return async (dispatch) => {
    try {
      // console.log(id);
      const response = await axios.get(`${apiUrl}merchants/${id}`);
      const result = response.data.data;
      // console.log(result);
      if (response.status === 200) {
        dispatch(showMerchant(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setMerchantError(error));
      } else {
        dispatch(setMerchantError(error));
      }
    }
  };
};

export const saveMerchants = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(`${apiUrl}merchants`, data);
      // console.log(response)
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createMerchants(result));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        dispatch({
          type: ADD_ERROR,
          payload: "The code has already been taken."
        });
      }else if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }else if (status >= 400) {
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

export const deleteMerchants = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}merchants/${id}`);
      if (response.status === 204) {
        dispatch(filterMerchants(id));
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

export const editMerchants = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}merchants/${id}?_method=put`,
        data
      );
    
      const result = response.data.data;
      const resultMerchant = {
        ...result,
        key: result.id
      };
     
      if (response.status === 201) {
        dispatch(updateMerchants(resultMerchant));
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
