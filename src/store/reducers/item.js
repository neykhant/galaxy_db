import {
  SHOW_ITEMS,
  SHOW_ITEM,
  CREATE_ITEMS,
  UPDATE_ITEMS,
  FILTER_ITEMS,
  ERROR_ITEM,
  SHOW_PRICE_TRACK_ITEMS,
  PAGINATE_BESTITEMS,
} from '../type'

const initialState = {
  items: [],
  item: {},
  error: {},
  priceTracks: [],
  bestItems: [],
  total: 0,
  grand_total: 0,
}

const item = (state = initialState, action) => {
  switch (action.type) {
    case PAGINATE_BESTITEMS:
      return {
        ...state,
        bestItems: action.payload.data.map((item) => {
          return {
            ...item,
            key: Math.random() * 100,
          }
        }),
        total: action.payload.total,
        grand_total: action.payload.grand_total,
      }
    case CREATE_ITEMS:
      return {
        items: [...state.items, action.item],
      }
    case SHOW_ITEMS:
      return {
        ...state,
        items: action.items,
      }
    case SHOW_ITEM:
      return {
        ...state,
        item: action.item,
      }
    case SHOW_PRICE_TRACK_ITEMS:
      return {
        ...state,
        priceTracks: action.payload,
      }
    case FILTER_ITEMS:
      const filterItems = state.items.filter((item) => item.id !== action.id)
      return {
        ...state,
        items: filterItems,
      }
    case UPDATE_ITEMS:
      const index = state.items.findIndex((item) => item.id === action.data.id)
      state.items[index] = action.data
      return {
        ...state,
      }
    case ERROR_ITEM:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default item
