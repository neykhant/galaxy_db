import {
  SHOW_PURCHASES,
  SHOW_PURCHASE,
  SHOW_PURCHASE_REPORT,
  CREATE_PURCHASES,
  UPDATE_PURCHASES,
  FILTER_PURCHASES,
  ERROR_PURCHASES
  } from "../type";
  
  const initialState = {
    purchases: [],
    purchase: {},
    purchaseReport: [],
    error: {}
  };
  
  
  const item = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PURCHASES:
        return {
            purchases: [...state.purchases, action.purchase]
        };
      case SHOW_PURCHASES:
        return {
          ...state,
          purchases: action.purchases
        };
      case SHOW_PURCHASE_REPORT:
        return {
          ...state,
          purchaseReport: action.purchaseReport
        };
      case SHOW_PURCHASE:
        return {
          ...state,
          purchase: action.purchase
        };
      case FILTER_PURCHASES:
        const filterPurchases = state.purchases.filter((purchase) => purchase.id !== action.id);
        return {
          ...state,
          purchases: filterPurchases
        };
      case UPDATE_PURCHASES:
        const index = state.items.findIndex((item) => item.id === action.data.id);
        state.items[index] = action.data;
        return {
          ...state
        };
      case ERROR_PURCHASES:
        return {
          ...state,
          error: action.error
        };
      default:
        return state;
    }
  };

  
  export default item;
  