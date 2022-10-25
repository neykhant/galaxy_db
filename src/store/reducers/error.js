
import { ADD_ERROR, REMOVE_ERROR } from "../type";

const initialState = {
  message: null,
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        message: action.payload,
      };

    case REMOVE_ERROR:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default error;

