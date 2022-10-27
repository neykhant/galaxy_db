import {
  SHOW_MERCHANTS,
  SHOW_MERCHANT,
  CREATE_MERCHANTS,
  UPDATE_MERCHANTS,
  FILTER_MERCHANTS,
  ERROR_MERCHANT,
  CLEAR_ALERT,
  IS_SUCCESS_MERCHANT
} from "../type";

const initialState = {
  merchants: [],
  merchant: {},
  error: [],
  isSuccess: false
};

const merchant = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MERCHANTS:
      return {
        ...state,
        merchants: [action.merchant, ...state.merchants],
        isSuccess: true,
        error: []
      };
    case SHOW_MERCHANTS:
      return {
        ...state,
        merchants: action.merchants,
        error: []
      };

    case SHOW_MERCHANT:
      return {
        ...state,
        merchant: action.merchant,
        error: []
      };
    case FILTER_MERCHANTS:
      const filterMerchant = state.merchants.filter(
        (merchant) => merchant.id !== action.id
      );
      return {
        ...state,
        merchants: filterMerchant,
        error: [],
        isSuccess: true
      };
    case UPDATE_MERCHANTS:
      const index = state.merchants.findIndex(
        (merchant) => merchant.id === action.data.id
      );
      state.merchants[index] = action.data;
      return {
        ...state,
        isSuccess: true,
        error: []
      };
    case ERROR_MERCHANT:
      return {
        ...state,
        error: action.error,
        isSuccess: false
      };
    case CLEAR_ALERT:
      return {
        ...state,
        error: [],
        isSuccess: false
      };
    case IS_SUCCESS_MERCHANT:
      return {
        ...state,
        isSuccess: action.isSuccess
      };
    default:
      return state;
  }
};

export default merchant;
