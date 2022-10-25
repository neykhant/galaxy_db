import {
    CREATE_PURCHASE_CREDITS,
    FILTER_PURCHASE_CREDITS,
    ERROR_PURCHASE_CREDITS,
    IS_SUCCESS_PURCHASE_CREDITS,
  } from "../type";

  
  const initialState = {
    purchase_credits: [],
    purchase_credit: {},
    error: [],
    isSuccess: false
  };
  
  const shop = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PURCHASE_CREDITS:
        return {
          ...state,
          purchase_credits: [action.purchase_credit, ...state.purchase_credits],
          error: [],
          isSuccess: true
        };
      case FILTER_PURCHASE_CREDITS:
        const filterCredit = state.purchase_credits.filter((credit) => credit.id !== action.id);
        return {
          ...state,
          purchase_credits: filterCredit,
          error: [],
          isSuccess: true
        };
      case ERROR_PURCHASE_CREDITS:
        return {
          ...state,
          error: action.error,
          isSuccess: false
        };
      case IS_SUCCESS_PURCHASE_CREDITS:
        return {
          ...state,
          isSuccess: action.isSuccess
        }
      default:
        return state;
    }
  };
  
  export default shop;
  