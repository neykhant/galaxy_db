import axios from "axios";
import {
  SHOW_BADITEMS,
  SHOW_BADITEM,
  CREATE_BADITEMS,
  UPDATE_BADITEMS,
  FILTER_BADITEMS,
  ERROR_BADITEMS,
  IS_SUCCESS_ERROR_BADITEMS,

  CLEAR_ALERT,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";


export const showBadItems = (baditems) => ({
  type: SHOW_BADITEMS,
  baditems
});

export const showBadItem = (baditem) => ({
  type: SHOW_BADITEM,
  baditem
});


export const createBadItems = (baditem) => ({
  type: CREATE_BADITEMS,
  baditem
});

export const filterBadItems = (id) => ({
  type: FILTER_BADITEMS,
  id
});

export const updateBadItems = (data) => ({
  type: UPDATE_BADITEMS,
  data
});

export const setBadItemErrors = (error) => ({
  type: ERROR_BADITEMS,
  error
});


export const badItemSuccess = (isSuccess) => ({
  type: IS_SUCCESS_ERROR_BADITEMS,
  isSuccess
});


export const getBadItems = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(
        `${apiUrl}damage-items`
      );
      const result = response.data.data.map((baditem) => {
        return {
          ...baditem,
          key: baditem.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showBadItems(result));
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

export const getBadItem = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}damage-items/${id}`
      );
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showBadItem(result));
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

export const saveBadItems = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(
        `${apiUrl}damage-items/batchInsert`,
        data
      );
      const result = response.data.data;
      if(response.status === 201){
        dispatch(createBadItems(result));
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

export const deleteBadItems = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(
        `${apiUrl}damage-items/${id}`
      );
      if (response.status === 204) {
      dispatch(filterBadItems(id));
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

export const editBadItems = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}damage-items/${id}?_method=put`,
        data
      );
      const result = response.data.data;
      if (response.status === 201) {
        dispatch(updateBadItems(result));
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
