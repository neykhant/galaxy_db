import axios from "axios";
import {
  SHOW_LUCKYS,
  SHOW_LUCKY,
  CREATE_LUCKY,
  UPDATE_LUCKY,
  FILTER_LUCKY,
  ERROR_ITEM,
  CLEAR_ALERT,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";
import { apiUrl } from "../../constants/url";
import { serverErrorMessage } from "../../uitls/messages";

export const showLuckys = (members) => ({
  type: SHOW_LUCKYS,
  members
});

export const showLucky = (member) => ({
  type: SHOW_LUCKY,
  member
});

export const createLucky = (member) => ({
  type: CREATE_LUCKY,
  member
});

export const filterLucky = (id) => ({
  type: FILTER_LUCKY,
  id
});

export const updateLucky = (data) => ({
  type: UPDATE_LUCKY,
  data
});

export const setLuckyError = (error) => ({
  type: ERROR_ITEM,
  error
});

export const getLuckys = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.get(`${apiUrl}change-price-and-luckies`);
      const result = response.data.data.map((member) => {
        return {
          ...member,
          key: member.id
        };
      });
    //   console.log(response.status);
      if (response.status === 200) {
        dispatch(showLuckys(result));
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

// export const getLucky = (id) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADING });

//     try {
//       const response = await axios.get(`${apiUrl}members/${id}`);
//       const result = response.data.data;
//       if (response.status === 200) {
//         dispatch(showMember(result));
//         dispatch({
//           type: REMOVE_ERROR
//         });
//       }
//     } catch (error) {
//       const { status, data } = error.response;

//       if (status === 401) {
//         localStorage.removeItem("jwtToken");
//         dispatch({
//           type: ADD_ERROR,
//           payload: data.message
//         });
//       }

//       if (status >= 400) {
//         dispatch({
//           type: ADD_ERROR,
//           payload: serverErrorMessage
//         });
//       }
//     }
//     dispatch({ type: SET_LOADING });
//   };
// };

export const saveLucky = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_SUCCESS, payload: false });
    try {
      const response = await axios.post(
        `${apiUrl}change-price-and-luckies`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createLucky(result));
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

export const deleteLucky = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}change-price-and-luckies/${id}`);
      if (response.status === 204) {
        dispatch(filterLucky(id));
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

// export const editLucky = (id, data) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_SUCCESS, payload: false });
//     dispatch({ type: SET_LOADING });
//     try {
//       const response = await axios.post(
//         `${apiUrl}members/${id}?_method=put`,
//         data
//       );
//       const result = response.data.data;
//       if (response.status === 201) {
//         dispatch(updateMembers(result));
//         dispatch({ type: SET_SUCCESS, payload: true });
//         dispatch({
//           type: REMOVE_ERROR
//         });
//       }
//     } catch (error) {
//       const { status, data } = error.response;

//       if (status === 401) {
//         localStorage.removeItem("jwtToken");
//         dispatch({
//           type: ADD_ERROR,
//           payload: data.message
//         });
//       }

//       if (status >= 400) {
//         dispatch({
//           type: ADD_ERROR,
//           payload: serverErrorMessage
//         });
//       }
//     }
//     dispatch({ type: SET_SUCCESS, payload: false });
//     dispatch({ type: SET_LOADING });
//   };
// };
