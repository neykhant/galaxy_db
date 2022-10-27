import {
  SHOW_STAFFS,
  SHOW_STAFF,
  CREATE_STAFFS,
  UPDATE_STAFFS,
  FILTER_STAFFS,
  ERROR_STAFFS
} from "../type";

const initialState = {
  staffs: [],
  staff: {},
  error: {}
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STAFFS:
      return {
        staffs: [...state.staffs, action.staff]
      };
    case SHOW_STAFFS:
      return {
        ...state,
        staffs: action.staffs
      };
    case SHOW_STAFF:
      return {
        ...state,
        staff: action.staff
      };
    case FILTER_STAFFS:
      const filterStaffs = state.staffs.filter(
        (staff) => staff.id !== action.id
      );
      return {
        ...state,
        staffs: filterStaffs
      };
    case UPDATE_STAFFS:
      const index = state.staffs.findIndex(
        (staff) => staff.id === action.data.id
      );
      state.staffs[index] = action.data;
      return {
        ...state
      };
    case ERROR_STAFFS:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default item;
