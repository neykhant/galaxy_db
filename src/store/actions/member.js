import axios from "axios";
import {
  SHOW_MEMBERS,
  SHOW_MEMBER,
  CREATE_MEMBERS,
  UPDATE_MEMBERS,
  FILTER_MEMBERS,
  ERROR_ITEM,
  CLEAR_ALERT,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";

export const showMembers = (members) => ({
  type: SHOW_MEMBERS,
  members
});

export const showMember = (member) => ({
  type: SHOW_MEMBER,
  member
});

export const createMembers = (member) => ({
  type: CREATE_MEMBERS,
  member
});

export const filterMembers = (id) => ({
  type: FILTER_MEMBERS,
  id
});

export const updateMembers = (data) => ({
  type: UPDATE_MEMBERS,
  data
});

export const setItemError = (error) => ({
  type: ERROR_ITEM,
  error
});

export const getMembers = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${apiUrl}members`);
      const result = response.data.data.map((member) => {
        return {
          ...member,
          key: member.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showMembers(result));
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

export const getMember = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(`${apiUrl}members/${id}`);
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showMember(result));
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

export const saveMembers = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(`${apiUrl}members`, data);
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createMembers(result));
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

export const deleteMembers = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}members/${id}`);
      if (response.status === 204) {
        dispatch(filterMembers(id));
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

export const editMembers = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}members/${id}?_method=put`,
        data
      );
      const result = response.data.data;
      if (response.status === 201) {
        dispatch(updateMembers(result));
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
