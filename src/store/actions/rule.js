import { call } from '../../services/api'
import { serverErrorMessage } from '../../uitls/messages'
import {
  ADD_ERROR,
  DELETE_RULE,
  REMOVE_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  SHOW_RULE,
  SHOW_RULES,
} from '../type'

export const getRules = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await call('get', 'rules')
      const result = response.data

      const transfromResult = result.map((data) => {
        return {
          ...data,
          key: data.id,
        }
      })
      dispatch({
        type: SHOW_RULES,
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

export const getRule = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await call('get', `rules/${id}`)
      const result = response.data

      dispatch({
        type: SHOW_RULE,
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

export const createRule = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      await call('post', 'rules', data)

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

export const editRule = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      await call('post', `rules/${id}?_method=PUT`, data)

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

export const deleteRule = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false })
    dispatch({ type: SET_LOADING })
    try {
      await call('delete', `rules/${id}`)

      dispatch({ type: SET_SUCCESS, payload: true })
      dispatch({ type: DELETE_RULE, payload: id })
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
