import { SHOW_SUPPLIERS, CREATE_SUPPLIERS } from "../type";

const initialState = {
  suppliers: [],
  supplier: {}
};

const supplier = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SUPPLIERS:
      return {
        ...state,
        suppliers: [action.supplier, ...state.suppliers],
      };
    case SHOW_SUPPLIERS:
      return {
        ...state,
        suppliers: action.suppliers,
      };
    default:
      return state;
  }
};

export default supplier;
