import {
    SHOW_EXPENSENAMES,
    SHOW_EXPENSENAME,
    CREATE_EXPENSENAMES,
    UPDATE_EXPENSENAMES,
    FILTER_EXPENSENAMES,
    ERROR_ITEM
  } from "../type";
  
  const initialState = {
    expense_names: [],
    expense_name: [],
    error: {}
  };
  
  const member = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_EXPENSENAMES:
        return {
          ...state,
          shops: [action.expenseName, ...state.expense_names]
        };
      case SHOW_EXPENSENAMES:
        return {
          ...state,
          expense_names: action.expenseNames
        };
      case SHOW_EXPENSENAME:
        return {
          ...state,
          expense_name: action.expenseName
        };
      case FILTER_EXPENSENAMES:
        const filterShop = state.expense_names.filter(
          (expenseName) => expenseName.id !== action.id
        );
        return {
          ...state,
          expense_names: filterShop
        };
      case UPDATE_EXPENSENAMES:
        // const updateShop = state.members.map(member => member.id === action.data.id ? action.data : member);
        const index = state.expense_names.findIndex(
          (name) => name.id === action.data.id
        );
        state.expense_names[index] = action.data;
        return {
          ...state
        };
      case ERROR_ITEM:
        return {
          ...state,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default member;
  