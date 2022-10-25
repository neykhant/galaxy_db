import axios from 'axios'
import {
  SHOW_STOCKS,
  SET_LOADING,
  ERROR_STOCKS,
  ADD_ERROR,
  SET_SUCCESS,
  REMOVE_ERROR,
  UPDATE_STOCKS,
  DELETE_STOCKS,
} from '../type'
import { apiUrl } from '../../constants/url'
import { serverErrorMessage } from '../../uitls/messages'

export const showStocks = (stocks) => ({
  type: SHOW_STOCKS,
  stocks,
})

export const setStockError = (error) => ({
  type: ERROR_STOCKS,
  error,
})

export const updateStocks = (data) => ({
  type: UPDATE_STOCKS,
  data,
})

export const filterStocks = (data) => ({
  type: DELETE_STOCKS,
  data
})

export const getStocks = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.get(`${apiUrl}stocks`)
      const result = response.data.data.map((stock) => {
        return {
          ...stock,
          key: stock.id,
        }
      })
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showStocks(result))
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setStockError(error.response.data.data))
      } else {
        dispatch(setStockError(error.response.data))
      }
    }
    dispatch({ type: SET_LOADING })
  }
}

export const getOutStocks = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.get(`${apiUrl}stocks`)
      const result = response.data.data.map((stock) => {
        return {
          ...stock,
          key: stock.id,
        }
      })
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showStocks(result))
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setStockError(error.response.data.data))
      } else {
        dispatch(setStockError(error.response.data))
      }
    }
    dispatch({ type: SET_LOADING })
  }
}

// export const savePurchases = (data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/batchInsert",
//         data
//       );
//       // console.log(response);
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setPurchaseErrors(error.response.data.data));
//       } else {
//         dispatch(setPurchaseErrors(error.response.data));
//       }
//     }
//   };
// };

// export const deletePurchases = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}`
//       );
//       // console.log(response)
//       if (response.status === 204) {
//         dispatch(filterPurchases(id));
//       }
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setPurchaseErrors(error.response.data.data));
//       } else {
//         dispatch(setPurchaseErrors(error.response.data));
//       }
//     }
//   };
// };

// export const editPurchases = (id, data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}?_method=put`,
//         data
//       );
//       // console.log(response);
//       const result = response.data.data;
//       if (response.status === 204) {
//         dispatch(updatePurchases(result));
//       }
//     } catch (error) {
//       console.log(error);
//       // if (error) {
//       //   dispatch(setItemErrors(error.response.data.data));
//       // } else {
//       //   dispatch(setItemErrors(error.response.data));
//       // }
//     }
//   };
// };

export const editStocks = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.post(
        `${apiUrl}stocks/${id}?_method=put`,
        data,
      )
      const result = {
        ...response.data.data,
        key: response.data.data.id,
      }
      if (response.status === 201) {
        dispatch(updateStocks(result))
        dispatch({ type: SET_SUCCESS, payload: true })
        dispatch({
          type: REMOVE_ERROR,
        })
      }
    } catch (error) {
      const { status, data } = error.response

      if (status === 401) {
        localStorage.removeItem('jwtToken')
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        })
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        })
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
  }
}

export const deleteStocks = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.post(
        `${apiUrl}del-stocks/${id}?_method=put`,
        data,
      )
      const result = {
        ...response.data.data,
        key: response.data.data.id,
      }
      if (response.status === 201) {
        dispatch(updateStocks(result))
        dispatch({ type: SET_SUCCESS, payload: true })
        dispatch({
          type: REMOVE_ERROR,
        })
      }
    } catch (error) {
      const { status, data } = error.response

      if (status === 401) {
        localStorage.removeItem('jwtToken')
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        })
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        })
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
  }
}

export const destroyStocks = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(`${apiUrl}stocks/${id}`);
      if (response.status === 204) {
        dispatch(filterStocks(id));
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