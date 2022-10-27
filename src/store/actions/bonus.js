import axios from "axios";
import {
  SHOW_BONUS,
  SHOW_BONU,
  CREATE_BONUS,
  UPDATE_BONUS,
  FILTER_BONUS,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";

export const showBonus = (bonus) => ({
  type: SHOW_BONUS,
  bonus
});

export const showBonu = (bonu) => ({
  type: SHOW_BONU,
  bonu
});

export const createBonus = (bonus) => ({
  type: CREATE_BONUS,
  bonus
});

export const filterBonus = (id) => ({
  type: FILTER_BONUS,
  id
});

export const updateBonus = (data) => ({
  type: UPDATE_BONUS,
  data
});

// export const setItemError = (error) => ({
//   type: ERROR_BONU,
//   error
// });

export const getBonus = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${apiUrl}bonus`);
      const result = response.data.data.map((member) => {
        return {
          ...member,
          key: member.id
        };
      });
    //   console.log(response.data.data);
      if (response.status === 200) {
        dispatch(showBonus(result));
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

export const getBonu = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(`${apiUrl}bonus/${id}`);
      const result = response.data.data;
    //   console.log(result)
      if (response.status === 200) {
        dispatch(showBonu(result));
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

export const saveBonus = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(`${apiUrl}bonus`, data);
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createBonus(result));
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

export const deleteBonus = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}bonus/${id}`);
    //   console.log(response.status)

      if (response.status === 204) {
        dispatch(filterBonus(id));
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

export const editBonus = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}bonus/${id}?_method=put`,
        data
      );
      
      const result = response.data.data;
      if (response.status === 201) {
        dispatch(updateBonus(result));
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
