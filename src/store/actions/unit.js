import { call } from '../../services/api'
import { serverErrorMessage } from '../../uitls/messages'
import {
  ADD_ERROR,
  DELETE_UNIT,
  REMOVE_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  SHOW_UNIT,
  SHOW_UNITS,
} from '../type'

export const getUnits = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await call('get', 'units')
      const result = response.data

      const transfromResult = result.map((data) => {
        return {
          ...data,
          key: data.id,
        }
      })
      dispatch({
        type: SHOW_UNITS,
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

export const getUnit = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await call('get', `units/${id}`)
      const result = response.data

      dispatch({
        type: SHOW_UNIT,
        payload: result,
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

export const createUnit = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      await call('post', 'units', data)

      dispatch({ type: SET_SUCCESS, payload: true })
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
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
  }
}

export const editUnit = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      await call('post', `units/${id}?_method=PUT`, data)

      dispatch({ type: SET_SUCCESS, payload: true })
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
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
  }
}

export const deleteUnit = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      await call('delete', `units/${id}`)

      dispatch({ type: SET_SUCCESS, payload: true })
      dispatch({ type: DELETE_UNIT, payload: id })
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
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
  }
}
