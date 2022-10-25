import { SHOW_CHANGE_SHOPS } from '../type'

const initialState = {
  change_shop_histories: [],
  error: {},
}

const changeShopHistory = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CHANGE_SHOPS:
      return {
        ...state,
        change_shop_histories: action.changeShopHistories,
      }
    default:
      return state
  }
}

export default changeShopHistory
