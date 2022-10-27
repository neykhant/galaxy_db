import axios from 'axios'
import {
  SHOW_ITEMS,
  SHOW_ITEM,
  CREATE_ITEMS,
  UPDATE_ITEMS,
  FILTER_ITEMS,
  ERROR_ITEM,
  CLEAR_ALERT,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR,
  SHOW_PRICE_TRACK_ITEMS,
  PAGINATE_BESTITEMS,
} from '../type'
import { apiUrl } from '../../constants/url'
import { serverErrorMessage } from '../../uitls/messages'
import { call } from '../../services/api'

export const showItems = (items) => ({
  type: SHOW_ITEMS,
  items,
})

export const showItem = (item) => ({
  type: SHOW_ITEM,
  item,
})

export const createItems = (item) => ({
  type: CREATE_ITEMS,
  item,
})

export const filterItems = (id) => ({
  type: FILTER_ITEMS,
  id,
})

export const updateItems = (data) => ({
  type: UPDATE_ITEMS,
  data,
})

export const setItemErrors = (error) => ({
  type: ERROR_ITEM,
  error,
})

export const clearAlertItems = () => ({
  type: CLEAR_ALERT,
})

export const getItems = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.get(`${apiUrl}items`)
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id,
        }
      })
      if (response.status === 200) {
        dispatch(showItems(result))
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
    dispatch({ type: SET_LOADING })
  }
}

export const getItem = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.get(`${apiUrl}items/${id}`)
      const result = response.data.data
      if (response.status === 200) {
        dispatch(showItem(result))
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
    dispatch({ type: SET_LOADING })
  }
}

export const getPriceTrackItems = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.get(`${apiUrl}price-tracks`)
      const result = response.data.data

      const transfromResult = result.map((data) => {
        return {
          ...data,
          key: data.id,
        }
      })
      dispatch({
        type: SHOW_PRICE_TRACK_ITEMS,
        payload: transfromResult,
      })
      dispatch({
        type: REMOVE_ERROR,
      })
    } catch (error) {
      const { status, data } = error.response

      if (status === 401) {
        localStorage.removeItem('jwtToken')
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        })
      }

      if (status === 500) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        })
      }
    }
    dispatch({ type: SET_LOADING })
  }
}

export const saveItems = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    dispatch({ type: SET_SUCCESS, payload: false })
    try {
      const response = await axios.post(`${apiUrl}items/batchInsert`, data)
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id,
        }
      })

      dispatch(createItems(result))
      dispatch({ type: SET_SUCCESS, payload: true })
      dispatch({
        type: REMOVE_ERROR,
      })
    } catch (error) {
      const { status, data } = error.response

      if (status === 400) {
        dispatch({
          type: ADD_ERROR,
          payload: data.data[Object.keys(data.data)],
        })
      } else if (status === 401) {
        localStorage.removeItem('jwtToken')
        dispatch({
          type: ADD_ERROR,
          payload: data.message,
        })
      } else if (status >= 402) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage,
        })
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    dispatch({
      type: REMOVE_ERROR,
    })
  }
}

export const deleteItems = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.delete(`${apiUrl}items/${id}`)
      if (response.status === 204) {
        dispatch(filterItems(id))
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

export const editItems = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.post(
        `${apiUrl}items/${id}?_method=put`,
        data,
      )
      const result = {
        ...response.data.data,
        key: response.data.data.id,
      }
      if (response.status === 201) {
        dispatch(updateItems(result))
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

export const getBestItem = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}items/bestItem?${new URLSearchParams(query).toString()}`,
      )
      // console.log("qq",response);
      if (query.best) {
        const result = response.data.data.map((item) => {
          return {
            ...item,
            key: Math.random() * 100,
          }
        })
        dispatch(showItems(result))
      } else {
        const result = response.data.data.map((item) => {
          return {
            ...item,
            key: Math.random() * 100,
          }
        })
        dispatch(showItems(result))
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setItemErrors(error.response.data.data))
      }
    }
  }
}

export const getPaginateBestItems = (query) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const result = await call(
        'get',
        `paginate-best-items?${new URLSearchParams(query).toString()}`,
      )

      dispatch({
        type: PAGINATE_BESTITEMS,
        payload: result,
      })
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
    dispatch({ type: SET_LOADING })
  }
}
