import { SHOW_ITEMS_IMPORTS, CREATE_ITEMS_IMPORTS } from "../type";

const initialState = {
  itemImports: [],
  itemImport: {}
};

const item_import = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEMS_IMPORTS:
      return {
        ...state,
        itemImports: [action.itemImport, ...state.itemImports]
      };
    case SHOW_ITEMS_IMPORTS:
      return {
        ...state,
        itemImports: action.itemImports
      };
    default:
      return state;
  }
};

export default item_import;
