import axios from "axios";
import {
  SHOW_PURCHASES,
  SHOW_PURCHASE,
  SHOW_PURCHASE_REPORT,
  CREATE_PURCHASES,
  UPDATE_PURCHASES,
  FILTER_PURCHASES,
  ERROR_PURCHASES,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";

export const showPurchases = (purchases) => ({
  type: SHOW_PURCHASES,
  purchases
});

export const showPurchase = (purchase) => ({
  type: SHOW_PURCHASE,
  purchase
});

export const showPurchaseReport = (purchaseReport) => ({
  type: SHOW_PURCHASE_REPORT,
  purchaseReport
});

export const createPurchases = (purchase) => ({
  type: CREATE_PURCHASES,
  purchase
});

export const filterPurchases = (id) => ({
  type: FILTER_PURCHASES,
  id
});

export const updatePurchases = (data) => ({
  type: UPDATE_PURCHASES,
  data
});

export const setPurchaseErrors = (error) => ({
  type: ERROR_PURCHASES,
  error
});

export const getBestPurchase = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}purchaseReport?${new URLSearchParams(query).toString()}`
      );
      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
          key: Math.random() * 100
        };
      });
      // console.log("a",result)
      // dispatch(showPurchases(result));
      dispatch(showPurchaseReport(result));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      }
    }
  };
};

export const getPurchase = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}purchases/${id}`);
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showPurchase(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      }
    }
  };
};

export const getPurchases = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}purchases`);
      // console.log('ss',response);

      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
          key: purchase.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showPurchases(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      } else {
        dispatch(setPurchaseErrors(error.response.data));
      }
    }
  };
};

export const savePurchases = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(`${apiUrl}purchases`, data);
      // dispatch(createItems(result));
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

export const deletePurchases = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}purchases/${id}`);
      if (response.status === 204) {
        dispatch(filterPurchases(id));
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

export const editPurchases = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}items/${id}?_method=put`,
        data
      );
      // console.log(response);
      const result = response.data.data;
      if (response.status === 204) {
        dispatch(updatePurchases(result));
      }
    } catch (error) {
      console.log(error);
      // if (error) {
      //   dispatch(setItemErrors(error.response.data.data));
      // } else {
      //   dispatch(setItemErrors(error.response.data));
      // }
    }
  };
};

export const getPurchaseReport = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${apiUrl}purchaseReport`);
      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
          key: purchase.merchant_id
        };
      });
      console.log("rrr",response)

      if (response.status === 201) {
        dispatch(showPurchaseReport(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      }
    }
  };
};
