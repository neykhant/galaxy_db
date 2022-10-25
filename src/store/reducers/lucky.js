import {
  SHOW_LUCKYS,
  SHOW_LUCKY,
  CREATE_LUCKY,
  UPDATE_LUCKY,
  FILTER_LUCKY,
  ERROR_ITEM
} from "../type";

const initialState = {
  luckys: [],
  lucky: {},
  error: {}
};

const lucky = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LUCKY:
      return {
        ...state,
        luckys: [action.member, ...state.luckys]
      };
    case SHOW_LUCKYS:
      return {
        ...state,
        luckys: action.members
      };
    case SHOW_LUCKY:
      return {
        ...state,
        member: action.member
      };
    case FILTER_LUCKY:
      const filterShop = state.luckys.filter(
        (member) => member.id !== action.id
      );
      return {
        ...state,
        luckys: filterShop
      };
    case UPDATE_LUCKY:
      const index = state.members.findIndex(
        (member) => member.id === action.data.id
      );
      state.members[index] = action.data;
      return {
        ...state
      };
    case ERROR_ITEM:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default lucky;
