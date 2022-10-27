import axios from 'axios'
import { SET_LOADING, ADD_ERROR, SHOW_CHANGE_SHOPS } from '../type'
import { apiUrl } from '../../constants/url'
import { serverErrorMessage } from '../../uitls/messages'

export const showChangeShopHistories = (changeShopHistories) => ({
  type: SHOW_CHANGE_SHOPS,
  changeShopHistories,
})

export const getChangeShopHistories = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await axios.get(`${apiUrl}change-shop-histories`)
      const result = response.data.data.map((changeShop) => {
        return {
          ...changeShop,
          key: changeShop.id,
        }
      })
      if (response.status === 200) {
        dispatch(showChangeShopHistories(result))
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
