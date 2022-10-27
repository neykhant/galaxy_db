import axios from "axios";
import {
  SHOW_EXPENSES,
  SHOW_EXPENSE,
  CREATE_EXPENSES,
  UPDATE_EXPENSES,
  FILTER_EXPENSES,
  ERROR_EXPENSE,
  CLEAR_ALERT,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";

export const showExpenses = (expenses) => ({
  type: SHOW_EXPENSES,
  expenses
});

export const showExpense = (expense) => ({
  type: SHOW_EXPENSE,
  expense
});

export const createExpenses = (expense) => ({
  type: CREATE_EXPENSES,
  expense
});

export const filterExpenses = (id) => ({
  type: FILTER_EXPENSES,
  id
});

export const updateExpenses = (data) => ({
  type: UPDATE_EXPENSES,
  data
});

export const setExpenseError = (error) => ({
  type: ERROR_EXPENSE,
  error
});

export const getExpenses = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${apiUrl}expenses`);
      const result = response.data.data.map((expense) => {
        return {
          ...expense,
          key: expense.id
        };
      });

      if (response.status === 200) {
        dispatch(showExpenses(result));
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

export const getExpense = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${apiUrl}expenses/${id}`);
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showExpense(result));
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

export const saveExpenses = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(`${apiUrl}expenses/batchInsert`, data);
      const result = response.data.data.map((expense) => {
        return {
          ...expense,
          key: expense.id
        };
      });
      // console.log(result);

      if (response.status === 201) {
        dispatch(createExpenses(result));
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

export const deleteExpenses = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}expenses/${id}`);
      if (response.status === 204) {
        dispatch(filterExpenses(id));
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

export const editExpenses = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}expenses/${id}?_method=put`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      // console.log(result)
      if (response.status === 201) {
        dispatch(updateExpenses(result));
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
