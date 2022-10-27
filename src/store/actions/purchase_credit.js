import axios from "axios";
import {
  CREATE_PURCHASE_CREDITS,
  FILTER_PURCHASE_CREDITS,
  ERROR_PURCHASE_CREDITS,
  IS_SUCCESS_PURCHASE_CREDITS,

  CLEAR_ALERT,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";


export const createPurchaseCredits = (purchase_credit) => ({
  type: CREATE_PURCHASE_CREDITS,
  purchase_credit
});

export const filterPurchaseCredits = (id) => ({
  type: FILTER_PURCHASE_CREDITS,
  id
});

export const setPurchaseCreditErrors = (error) => ({
  type: ERROR_PURCHASE_CREDITS,
  error
});

export const purchaseCreditSuccess = (isSuccess) => ({
  type: IS_SUCCESS_PURCHASE_CREDITS,
  isSuccess
});

export const savePurchaseCredits = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}purchase-credits`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      //   console.log(result)
      if (response.status === 201) {
        dispatch(createPurchaseCredits(result));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(
          setPurchaseCreditErrors("There was an error during Creating....!")
        );
      }
    }
  };
};

export const deletePurchaseCredits = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(
        `${apiUrl}purchase-credits/${id}`
      );
      console.log(response)
      if (response.status === 204) {
        dispatch(filterPurchaseCredits(id));
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
