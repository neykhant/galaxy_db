import {
    SHOW_OWNERS,
    SHOW_OWNER,
    CREATE_OWNERS,
    UPDATE_OWNERS,
    FILTER_OWNERS,
    ERROR_OWNER
  } from "../type";
  
  const initialState = {
    owners: [],
    owner: {},
    error: {}
  };
  
  const owner = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_OWNERS:
        return {
          owners: [...state.owners, action.owner]
        };
      case SHOW_OWNERS:
        return {
          ...state,
          owners: action.owners
        };
        case SHOW_OWNER:
        return {
          ...state,
          owner: action.owner
        };
      case FILTER_OWNERS:
        const filterOwners = state.owners.filter(
          (owner) => owner.id !== action.id
        );
        return {
          ...state,
          owners: filterOwners
         
        };
        
      case UPDATE_OWNERS:
        const index = state.owners.findIndex(
          (owner) => owner.id === action.data.id
        );
        state.owners[index] = action.data;
        return {
          ...state
        };
      case ERROR_OWNER:
        return {
          ...state,
          error: action.error
        };
      default:
        return state;
    }
  };
  
  export default owner;
  