import {
  SHOW_BADITEMS,
  SHOW_BADITEM,
  CREATE_BADITEMS,
  UPDATE_BADITEMS,
  FILTER_BADITEMS,
  ERROR_BADITEMS,
  CLEAR_ALERT,
  IS_SUCCESS_ERROR_BADITEMS
} from "../type";

const initialState = {
  bad_items: [],
  bad_item: {},
  error: "",
  isSuccess: false,
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BADITEMS:
      return {
        // bad_items: [...state.bad_items, action.baditem],
        isSuccess: true,
        error: ""
      };
    case SHOW_BADITEMS:
      return {
        ...state,
        bad_items: action.baditems,
      };
    case SHOW_BADITEM:
      return {
        ...state,
        bad_item: action.baditem,
      };
    case FILTER_BADITEMS:
      const filterBadItems = state.bad_items.filter(
        (item) => item.id !== action.id
      );
      return {
        ...state,
        bad_items: filterBadItems,
      };
    case UPDATE_BADITEMS:
      const index = state.bad_items.findIndex((item) => item.id === action.data.id);
      state.bad_items[index] = action.data;
      return {
        ...state,
      };
    case ERROR_BADITEMS:
      return {
        ...state,
        error: action.error,
        isSuccess: false,
      };
    case IS_SUCCESS_ERROR_BADITEMS:
      return {
        ...state,
        isSuccess: action.isSuccess,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        error: "",
        isSuccess: false,
      };
    default:
      return state;
  }
};

export default item;
