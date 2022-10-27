import {
  SHOW_SHOPS,
  SHOW_SHOP,
  CREATE_SHOPS,
  UPDATE_SHOPS,
  FILTER_SHOPS,
  ERROR_SHOP,
  IS_SUCCESS_SHOP,
  CLEAR_ALERT
} from "../type";


const initialState = {
  shops: [],
  shop: {},
  error: [],
  isSuccess: false
};

const shop = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SHOPS:
      return {
        ...state,
        shops: [action.shop, ...state.shops],
        error: [],
        isSuccess: true
      };
    case SHOW_SHOPS:
      return {
        ...state,
        shops: action.shops,
        error: [],
      };
    case SHOW_SHOP:
      return {
        ...state,
        shop: action.shop,
        error: []
      };
    case FILTER_SHOPS:
      const filterShop = state.shops.filter((shop) => shop.id !== action.id);
      return {
        ...state,
        shops: filterShop,
        error: [],
        isSuccess: true
      };
    case UPDATE_SHOPS:
      const updateShop = state.shops.map((shop) =>
        shop.id === action.data.id ? action.data : shop
      );
      return {
        ...state,
        shops: updateShop,
        error: []
      };
    case ERROR_SHOP:
      return {
        ...state,
        error: action.error,
        isSuccess: false
      };
    case IS_SUCCESS_SHOP:
      return {
        ...state,
        isSuccess: action.isSuccess
      };
    case CLEAR_ALERT:
      return {
        ...state,
        error: [],
        isSuccess: false
      };
    default:
      return state;
  }
};

export default shop;
