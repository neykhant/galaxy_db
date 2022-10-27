import {
    SHOW_DAILY_STAFFS,
    SHOW_DAILY_STAFF,
    CREATE_DAILY_STAFFS,
    UPDATE_DAILY_STAFFS,
    FILTER_DAILY_STAFFS,
    ERROR_DAILY_STAFFS
  } from "../type";
  
  const initialState = {
    dailys: [],
    daily: null,
    error: {}
  };
  
  const daily = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_DAILY_STAFFS:
        return {
          dailys: [...state.dailys, action.staff]
        };
      case SHOW_DAILY_STAFFS:
        return {
          ...state,
          dailys: action.staffs
        };
      case SHOW_DAILY_STAFF:
        return {
          ...state,
          daily:  action.staff
        };
      case FILTER_DAILY_STAFFS:
        const filterStaffs = state.dailys.filter(
          (staff) => staff.id !== action.id
        );
        return {
          ...state,
          dailys: filterStaffs
        };
      case UPDATE_DAILY_STAFFS:
        const index = state.dailys.findIndex(
          (staff) => staff.id === action.data.id
        );
        state.dailys[index] = action.data;
        return {
          ...state
        };
      case ERROR_DAILY_STAFFS:
        return {
          ...state,
          error: action.error
        };
      default:
        return state;
    }
  };
  
  export default daily;
  