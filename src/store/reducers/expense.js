import {
  SHOW_EXPENSES,
  SHOW_EXPENSE,
  CREATE_EXPENSES,
  UPDATE_EXPENSES,
  FILTER_EXPENSES,
  ERROR_EXPENSE
} from "../type";

const initialState = {
  expenses: [],
  expense: {},
  error: {}
};

const expense = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EXPENSES:
      return {
        expenses: [...state.expenses, action.expense]
      };
    case SHOW_EXPENSES:
      return {
        ...state,
        expenses: action.expenses
      };
    case SHOW_EXPENSE:
      return {
        ...state,
        expense: action.expense
      };
    case FILTER_EXPENSES:
      const filterExpense = state.expenses.filter(
        (expense) => expense.id !== action.id
      );
      return {
        ...state,
        expenses: filterExpense
      };
    case UPDATE_EXPENSES:
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.data.id
      );
      state.expenses[index] = action.data;
      return {
        ...state
      };
    case ERROR_EXPENSE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default expense;
