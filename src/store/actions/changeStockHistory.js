import axios from 'axios'
import { SET_LOADING, ADD_ERROR, SHOW_CHANGE_STOCKS } from '../type'
import { apiUrl } from '../../constants/url'
import { serverErrorMessage } from '../../uitls/messages'

export const showChangeStockHistories = (changeStockHistories) => ({
  type: SHOW_CHANGE_STOCKS,
  changeStockHistories,
})

export const getChangeStockHistories = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.get(`${apiUrl}change-stock-histories`)
      const result = response.data.data.map((changeStock) => {
        return {
          ...changeStock,
          key: changeStock.id,
        }
      })
      if (response.status === 200) {
        dispatch(showChangeStockHistories(result))
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
