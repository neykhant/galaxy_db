import axios from "axios";
import {
  SHOW_STAFFS,
  SHOW_STAFF,
  CREATE_STAFFS,
  UPDATE_STAFFS,
  FILTER_STAFFS,
  ERROR_STAFFS,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";

export const showStaffs = (staffs) => ({
  type: SHOW_STAFFS,
  staffs
});

export const showStaff = (staff) => ({
  type: SHOW_STAFF,
  staff
});

export const createStaffs = (staff) => ({
  type: CREATE_STAFFS,
  staff
});

export const filterStaffs = (id) => ({
  type: FILTER_STAFFS,
  id
});

export const updateStaffs = (data) => ({
  type: UPDATE_STAFFS,
  data
});

export const setStaffErrors = (error) => ({
  type: ERROR_STAFFS,
  error
});

export const getStaffs = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(`${apiUrl}staffs`);
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id
        };
      });
      // console.log(result)
      if (response.status === 200) {
        dispatch(showStaffs(result));
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

export const getStaff = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${apiUrl}staffs/${id}`);
      const result = response.data.data;

      if (response.status === 200) {
        dispatch(showStaff(result));
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

export const saveStaffs = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(`${apiUrl}staffs`, data);
      const result = { ...response.data.data, key: response.data.data.id };

      if (response.status === 201) {
        dispatch(createStaffs(result));
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
      } else if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      } else if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    dispatch({
      type: REMOVE_ERROR
    });
  };
};

export const deleteStaffs = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}staffs/${id}`);
      if (response.status === 204) {
        dispatch(filterStaffs(id));
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

export const editStaffs = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}staffs/${id}?_method=put`,
        data
      );
      // const result = response.data.data;
      const result = { ...response.data.data, key: response.data.data.id };
      // console.log(result);

      if (response.status === 201) {
        dispatch(updateStaffs(result));
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

export const getStaffReport = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}staffReport?${new URLSearchParams(query).toString()}`
      );
      const result = response.data.map((report) => {
        return {
          ...report,
          key: report.id
        };
      });

      if (response.status === 200) {
        dispatch(showStaffs(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setStaffErrors(error.response.data.data));
      } else {
        dispatch(setStaffErrors(error.response.data));
      }
    }
  };
};
