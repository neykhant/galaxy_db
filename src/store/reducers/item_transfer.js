import {
  SHOW_ITEMS_TRANSFER,
  SHOW_TRANSFER,
  CREATE_ITEMS_TRANSFER,
  FILTER_ITEMS_TRANSFER,
  UPDATE_ITEMS_TRANSFER,
  ERROR_TRANSFERS
} from "../type";

const initialState = {
  itemTransfers: [],
  itemTransfer: {},
  error: {}
};

const item_transfer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEMS_TRANSFER:
      return {
        ...state,
        itemTransfers: [action.itemTransfer, ...state.itemTransfers]
      };
    case SHOW_ITEMS_TRANSFER:
      return {
        ...state,
        itemTransfers: action.itemTransfers
      };
      case SHOW_TRANSFER:
      return {
        ...state,
        itemTransfer: action.itemTransfer
      };
    case FILTER_ITEMS_TRANSFER:
      const filterItemTransfers = state.itemTransfers.filter((item) => item.id !== action.id);
      return {
        ...state,
        itemTransfers: filterItemTransfers
      };
    default:
      return state;
  }
};

export default item_transfer;
