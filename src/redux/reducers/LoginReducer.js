import axios from "axios";

const initialState = {
  user: {}
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_LOGIN":
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};

export default LoginReducer;
