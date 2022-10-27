import {
  SHOW_BONUS,
  SHOW_BONU,
  CREATE_BONUS,
  UPDATE_BONUS,
  FILTER_BONUS,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR
} from "../type";

const initialState = {
  bonus: [],
  bonu: {},
  error: {}
  // member: {},
};

const bonus = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BONUS:
      return {
        ...state,
        bonus: [action.bonus, ...state.bonus]
      };

    case SHOW_BONUS:
      return {
        ...state,
        bonus: action.bonus
      };
    case SHOW_BONU:
      return {
        ...state,
        bonu: action.bonu
      };
    case FILTER_BONUS:
      const filterBonus = state.bonus.filter(
        (b) => b.id !== action.id
      );
      return {
        ...state,
        bonus: filterBonus
      };
    // case UPDATE_MEMBERS:
    //   const index = state.members.findIndex(
    //     (member) => member.id === action.data.id
    //   );
    //   state.members[index] = action.data;
    //   return {
    //     ...state
    //   };
    // case ERROR_ITEM:
    //   return {
    //     ...state,
    //     error: action.error
    //   };
    default:
      return state;
  }
};

export default bonus;
