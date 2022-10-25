import { SET_DELETE, SET_LOADING, SET_SUCCESS, CLEAR_ALERT } from "../type";

const initialState = {
  loading: false,
  success: false,
  delete: false
};

const status = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case SET_DELETE:
      return {
        ...state,
        delete: action.payload
      };
    case CLEAR_ALERT:
      return {
        ...state,
        success: false,
        
      };
    default:
      return state;
  }
};

export default status;
