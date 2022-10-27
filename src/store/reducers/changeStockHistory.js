import { SHOW_CHANGE_STOCKS } from '../type'

const initialState = {
  change_stock_histories: [],
  error: {},
}

const changeStockHistory = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CHANGE_STOCKS:
      return {
        ...state,
        change_stock_histories: action.changeStockHistories,
      }
    default:
      return state
  }
}

export default changeStockHistory
